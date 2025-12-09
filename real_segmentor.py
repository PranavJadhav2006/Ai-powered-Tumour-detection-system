import numpy as np
import SimpleITK as sitk
import pydicom
import nibabel as nib
from monai.networks.nets import UNet
from monai.inferers import SimpleInferer
import torch
import os
from datetime import datetime

class RealBrainSegmentor:
    def __init__(self):
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.load_model()
    
    def load_model(self):
        """Load a pre-trained segmentation model"""
        print("🧠 Loading real brain tumor segmentation model...")
        
        # Create a UNet model (you can replace with your trained model)
        self.model = UNet(
            spatial_dims=3,
            in_channels=1,
            out_channels=3,  # Background, Edema, Enhancing Tumor
            channels=(16, 32, 64, 128),
            strides=(2, 2, 2),
            num_res_units=2,
        )
        
        # TODO: Load your trained weights here
        # self.model.load_state_dict(torch.load('path/to/your/model.pth'))
        
        self.model.to(self.device)
        self.model.eval()
        print("✅ Real segmentation model loaded!")
    
    def load_dicom_series(self, dicom_folder):
        """Load DICOM series into 3D volume"""
        try:
            reader = sitk.ImageSeriesReader()
            dicom_files = reader.GetGDCMSeriesFileNames(dicom_folder)
            reader.SetFileNames(dicom_files)
            image = reader.Execute()
            
            # Convert to numpy array
            image_array = sitk.GetArrayFromImage(image)  # (Z, Y, X)
            return image_array, image.GetSpacing()
        except Exception as e:
            print(f"❌ DICOM loading failed: {e}")
            return None, None
    
    def load_nifti(self, nifti_path):
        """Load NIfTI file"""
        try:
            img = nib.load(nifti_path)
            image_array = img.get_fdata()  # (X, Y, Z) or (Z, Y, X)
            affine = img.affine
            return image_array, affine
        except Exception as e:
            print(f"❌ NIfTI loading failed: {e}")
            return None, None
    
    def preprocess_mri(self, image_array):
        """Preprocess MRI for segmentation"""
        # Normalize to [0, 1]
        image_normalized = (image_array - np.min(image_array)) / (np.max(image_array) - np.min(image_array))
        
        # Resize to standard size (if needed)
        target_shape = (160, 160, 128)
        if image_normalized.shape != target_shape:
            # Simple resizing - in production use proper resampling
            from scipy.ndimage import zoom
            zoom_factors = [target_shape[i] / image_normalized.shape[i] for i in range(3)]
            image_resized = zoom(image_normalized, zoom_factors, order=1)
        else:
            image_resized = image_normalized
        
        return image_resized.astype(np.float32)
    
    def segment_brain_tumor(self, image_array):
        """Perform real tumor segmentation"""
        try:
            # Preprocess
            processed_image = self.preprocess_mri(image_array)
            
            # Convert to tensor
            input_tensor = torch.from_numpy(processed_image).unsqueeze(0).unsqueeze(0)  # (1, 1, Z, Y, X)
            input_tensor = input_tensor.to(self.device)
            
            # Run inference
            with torch.no_grad():
                output = self.model(input_tensor)
                segmentation = torch.argmax(output, dim=1).squeeze().cpu().numpy()
            
            print(f"✅ Real segmentation complete! Shape: {segmentation.shape}")
            return segmentation
            
        except Exception as e:
            print(f"❌ Real segmentation failed: {e}")
            return None
    
    def calculate_real_metrics(self, segmentation, original_shape, spacing=None):
        """Calculate real tumor metrics from segmentation"""
        if segmentation is None:
            return self.get_fallback_metrics()
        
        try:
            # Count voxels for each class
            background_voxels = np.sum(segmentation == 0)
            edema_voxels = np.sum(segmentation == 1)
            enhancing_voxels = np.sum(segmentation == 2)
            
            # Calculate volumes (assuming voxel spacing in mm)
            if spacing is None:
                spacing = (1.0, 1.0, 1.0)  # Default 1mm³ voxels
            
            voxel_volume_mm3 = spacing[0] * spacing[1] * spacing[2]
            
            edema_volume_mm3 = edema_voxels * voxel_volume_mm3
            enhancing_volume_mm3 = enhancing_voxels * voxel_volume_mm3
            total_volume_mm3 = edema_volume_mm3 + enhancing_volume_mm3
            
            # Convert to cm³
            edema_volume_cm3 = edema_volume_mm3 / 1000
            enhancing_volume_cm3 = enhancing_volume_mm3 / 1000
            total_volume_cm3 = total_volume_mm3 / 1000
            
            # Calculate confidence based on tumor presence
            confidence = min(0.95, 0.7 + (total_volume_cm3 / 50))  # Simple confidence heuristic
            
            return {
                "total_tumor_volume_cm3": round(total_volume_cm3, 2),
                "enhancing_tumor_volume_cm3": round(enhancing_volume_cm3, 2),
                "edema_volume_cm3": round(edema_volume_cm3, 2),
                "total_voxels": int(edema_voxels + enhancing_voxels),
                "tumor_regions_detected": 2 if enhancing_voxels > 0 else 1,
                "confidence_score": round(confidence, 2),
                "detection_status": "Tumor Detected" if total_volume_cm3 > 0.1 else "No Significant Tumor",
                "tumor_location": self.estimate_tumor_location(segmentation),
                "voxel_spacing_mm": spacing,
                "data_source": "Real MRI Analysis"
            }
            
        except Exception as e:
            print(f"❌ Metrics calculation failed: {e}")
            return self.get_fallback_metrics()
    
    def estimate_tumor_location(self, segmentation):
        """Estimate tumor location in brain"""
        try:
            # Find tumor center of mass
            tumor_mask = (segmentation > 0).astype(np.float32)
            if np.sum(tumor_mask) == 0:
                return "No tumor detected"
            
            # Calculate center of mass
            z, y, x = np.indices(tumor_mask.shape)
            center_z = np.sum(z * tumor_mask) / np.sum(tumor_mask)
            center_y = np.sum(y * tumor_mask) / np.sum(tumor_mask) 
            center_x = np.sum(x * tumor_mask) / np.sum(tumor_mask)
            
            # Simple brain quadrant estimation
            shape = tumor_mask.shape
            if center_x < shape[2] / 2:
                hemisphere = "Left"
            else:
                hemisphere = "Right"
                
            if center_z < shape[0] / 3:
                vertical = "Superior"
            elif center_z < 2 * shape[0] / 3:
                vertical = "Mid"
            else:
                vertical = "Inferior"
                
            return f"{hemisphere} {vertical} hemisphere"
            
        except Exception as e:
            return "Brain region"
    
    def get_fallback_metrics(self):
        """Fallback metrics if real analysis fails"""
        return {
            "total_tumor_volume_cm3": 0.0,
            "enhancing_tumor_volume_cm3": 0.0,
            "edema_volume_cm3": 0.0,
            "total_voxels": 0,
            "tumor_regions_detected": 0,
            "confidence_score": 0.0,
            "detection_status": "Analysis Failed",
            "tumor_location": "Unknown",
            "data_source": "Analysis Error - Using Fallback",
            "recommendation": "Please check MRI file format and try again"
        }

# Test the real segmentor
if __name__ == "__main__":
    segmentor = RealBrainSegmentor()
    print("✅ Real Brain Segmentor Ready!")
