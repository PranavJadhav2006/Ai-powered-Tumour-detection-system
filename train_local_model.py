import torch
import torch.nn as nn
from monai.networks.nets import UNet
import numpy as np
import os

print("🚀 Training Local Brain Tumor Model...")

class LocalModelTrainer:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"✅ Training on: {self.device}")
        
        # Create the same UNet architecture
        self.model = UNet(
            spatial_dims=3,
            in_channels=1,
            out_channels=2,  # Tumor vs Background
            channels=(16, 32, 64, 128),
            strides=(2, 2, 2),
            num_res_units=2,
        )
        self.model.to(self.device)
        
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=1e-4)
        self.loss_fn = nn.CrossEntropyLoss()
    
    def create_training_data(self, num_samples=100):
        """Create realistic synthetic training data"""
        print("Generating training data...")
        
        training_data = []
        for i in range(num_samples):
            # Create synthetic MRI
            mri = self.create_realistic_mri()
            
            # Create corresponding segmentation
            seg = self.create_realistic_segmentation(mri.shape)
            
            training_data.append({
                'image': torch.from_numpy(mri).float(),
                'label': torch.from_numpy(seg).long()
            })
        
        print(f"Created {len(training_data)} training samples")
        return training_data

    def create_realistic_mri(self, shape=(128, 128, 64)):
        """Create realistic synthetic MRI"""
        # Base brain structure
        mri = np.random.normal(0.5, 0.15, shape)
        
        # Add anatomical structures
        center = [s//2 for s in shape]
        z, y, x = np.ogrid[:shape[0], :shape[1], :shape[2]]
        
        # Ventricles (darker)
        ventricles = ((z - center[0])/25)**2 + ((y - center[1])/20)**2 + ((x - center[2])/15)**2 <= 1
        mri[ventricles] -= 0.2
        
        # White matter (brighter)
        white_matter = ((z - center[0])/40)**2 + ((y - center[1])/35)**2 + ((x - center[2])/30)**2 <= 1
        mri[white_matter] += 0.1
        
        return np.clip(mri, 0, 1).astype(np.float32)
    
    def create_realistic_segmentation(self, shape):
        """Create realistic tumor segmentation"""
        seg = np.zeros(shape, dtype=np.int64)
        center = [s//2 for s in shape]
        
        z, y, x = np.ogrid[:shape[0], :shape[1], :shape[2]]
        
        # Create different tumor types
        tumor_center = ((z - center[0])/(shape[0]*0.1))**2 + \
                      ((y - center[1])/(shape[1]*0.08))**2 + \
                      ((x - center[2])/(shape[2]*0.06))**2 <= 1
        
        tumor_outer = ((z - center[0])/(shape[0]*0.15))**2 + \
                     ((y - center[1])/(shape[1]*0.12))**2 + \
                     ((x - center[2])/(shape[2]*0.09))**2 <= 1
        
        # Assign labels: 0=background, 1=tumor
        seg[tumor_outer] = 1
        
        return seg
    
    def train(self, epochs=15):
        """Train the model locally"""
        print("Starting local training...")
        
        training_data = self.create_training_data()
        
        for epoch in range(epochs):
            self.model.train()
            total_loss = 0
            
            for sample in training_data:
                inputs = sample['image'].unsqueeze(0).unsqueeze(0).to(self.device)  # (1, 1, D, H, W)
                labels = sample['label'].unsqueeze(0).to(self.device)  # (1, D, H, W)
                
                self.optimizer.zero_grad()
                outputs = self.model(inputs)
                loss = self.loss_fn(outputs, labels)
                loss.backward()
                self.optimizer.step()
                
                total_loss += loss.item()
            
            avg_loss = total_loss / len(training_data)
            print(f"Epoch {epoch+1}/{epochs}, Average Loss: {avg_loss:.4f}")
            
            # Save checkpoint every 5 epochs
            if (epoch + 1) % 5 == 0:
                self.save_model(f"model_epoch_{epoch+1}.pth")
        
        # Save final model
        self.save_model("trained_brain_model.pth")
        print("Local training completed!")
    
    def save_model(self, filename):
        """Save trained model"""
        os.makedirs("models", exist_ok=True)
        model_path = f"models/{filename}"
        torch.save(self.model.state_dict(), model_path)
        print(f"💾 Model saved: {model_path}")

if __name__ == "__main__":
    trainer = LocalModelTrainer()
    trainer.train(epochs=15)