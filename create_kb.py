# --- 0. Setup and Imports ---
from dotenv import load_dotenv
import os
import sys 
from pydantic import BaseModel # Used for stability
from io import BytesIO # Useful for in-memory handling if needed, though not strictly required here

# RAG & LLM Imports
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

# Voice Imports
import speech_recognition as sr
import pyttsx3 

import argparse

# --- 1. Configuration ---
CHUNK_SIZE = 1500
CHUNK_OVERLAP = 200

# --- Knowledge Base Content Functions ---
def get_normal_knowledge():
    """Returns the comprehensive knowledge for the normal mode."""
    return """
          Brain tumors represent abnormal cell growth within the brain or central spinal canal. These growths can be categorized as primary tumors originating in the brain itself, or secondary metastatic tumors that spread from cancers elsewhere in the body. The medical community classifies brain tumors based on their cellular origin, growth rate, and potential for invasion into surrounding tissues.
        Primary brain tumors develop from various brain components including glial cells, neurons, meningeal layers, pituitary gland, and pineal gland. Gliomas represent the most prevalent category of malignant primary brain tumors in adults, arising from glial cells that support neuronal function. Meningiomas typically grow from the meninges, the protective membranes enveloping the brain and spinal cord, and are generally benign with slow growth characteristics.
        TUMOR TYPES AND CHARACTERISTICS
        Gliomas encompass several subtypes including astrocytomas, oligodendrogliomas, and ependymomas. Astrocytomas range from low-grade pilocytic astrocytomas to highly aggressive glioblastomas. Oligodendrogliomas often demonstrate better treatment response due to specific genetic markers. Ependymomas develop from ependymal cells lining the ventricular system.
        Meningiomas account for approximately 30% of all primary brain tumors. Most meningiomas are grade I benign tumors, though atypical and anaplastic meningiomas exhibit more aggressive behavior. Pituitary adenomas develop in the pituitary gland and can disrupt hormonal balance, leading to various endocrine disorders. Acoustic neuromas, properly termed vestibular schwannomas, grow on the vestibulocochlear nerve and typically cause hearing loss and balance issues.
        SYMPTOMOLOGY AND CLINICAL PRESENTATION
        Brain tumor symptoms manifest based on tumor location, size, and growth rate. Common neurological symptoms include persistent headaches that often intensify in the morning or during sleep, seizures of various types, progressive nausea and vomiting, visual disturbances like blurred vision or double vision, and balance coordination difficulties.
        Focal symptoms correlate with specific brain regions affected. Frontal lobe tumors may cause personality changes, judgment impairment, and movement difficulties. Temporal lobe involvement can lead to memory problems, language difficulties, and olfactory or auditory hallucinations. Parietal lobe tumors often produce sensory processing issues, while occipital lobe tumors typically affect visual perception.
        DIAGNOSTIC METHODS AND IMAGING TECHNIQUES
        Neurological examination forms the initial assessment, evaluating vision, hearing, balance, coordination, strength, and reflexes. Imaging studies provide detailed visualization of brain structures. Magnetic Resonance Imaging (MRI) offers superior soft tissue contrast using magnetic fields and radio waves, often enhanced with gadolinium contrast to highlight abnormal areas.
        Computed Tomography (CT) scans utilize X-rays to create cross-sectional brain images, particularly useful for detecting bleeding, bone abnormalities, and emergency assessments. Advanced MRI techniques including diffusion-weighted imaging, perfusion imaging, and magnetic resonance spectroscopy provide additional information about tumor cellularity, blood flow, and metabolic activity.
        Positron Emission Tomography (PET) scans measure metabolic activity by tracking radioactive tracer distribution. Biopsy procedures obtain tissue samples for histopathological examination, either through stereotactic needle biopsy or during surgical resection. Molecular profiling analyzes genetic markers that influence treatment response and prognosis.
        TREATMENT MODALITIES AND MANAGEMENT APPROACHES
        Treatment strategies depend on multiple factors including tumor type, location, size, molecular characteristics, and patient overall health. Surgical intervention aims for maximal safe resection while preserving neurological function. Advanced techniques include neuronavigation, intraoperative MRI, awake craniotomy with brain mapping, and fluorescent-guided surgery using 5-ALA.
        Radiation therapy employs high-energy radiation to destroy tumor cells. External beam radiation includes conventional fractionated radiation, stereotactic radiosurgery (Gamma Knife, CyberKnife), and proton beam therapy. Brachytherapy involves temporary placement of radioactive sources near the tumor site. Radiation may be administered as primary treatment, adjuvant therapy following surgery, or for palliative purposes.
        Chemotherapy utilizes cytotoxic drugs to kill rapidly dividing cells. Temozolomide represents the standard for glioblastoma treatment, while PCV regimen (procarbazine, lomustine, vincristine) benefits some glioma subtypes. Targeted therapies focus on specific molecular pathways; examples include bevacizumab for angiogenesis inhibition and various kinase inhibitors.
        Immunotherapy approaches harness the immune system against tumors, including checkpoint inhibitors, cancer vaccines, and CAR-T cell therapy. Tumor-treating fields deliver low-intensity alternating electric fields to disrupt cancer cell division, used for glioblastoma management.
        ARTIFICIAL INTELLIGENCE IN NEURO-ONCOLOGY
        Machine learning algorithms analyze medical images to detect tumors, classify types, and predict molecular features from MRI scans. Deep learning models, particularly convolutional neural networks, can segment tumor boundaries, differentiate tumor subtypes, and distinguish progression from treatment-related changes.
        Natural language processing extracts clinical information from medical records, pathology reports, and radiology descriptions. Predictive modeling integrates multimodal data to forecast treatment response, survival outcomes, and recurrence patterns. AI-assisted surgical planning helps identify optimal resection margins while avoiding critical functional areas.
        Radiomics analysis quantifies radiographic features that correlate with underlying tumor biology. Generative AI models can simulate tumor growth patterns and treatment effects. These computational approaches serve as decision support tools, enhancing but not replacing clinical expertise and judgment.
        PATIENT SUPPORT AND LIFESTYLE CONSIDERATIONS
        Comprehensive care addresses physical, emotional, and practical needs throughout the treatment journey. Nutritional support focuses on maintaining adequate calorie and protein intake, managing treatment side effects, and addressing specific dietary requirements. Physical therapy helps maintain mobility, strength, and balance, while occupational therapy assists with adaptive strategies for daily activities.
        Neuropsychological evaluation identifies cognitive strengths and challenges, guiding rehabilitation efforts. Speech therapy addresses communication and swallowing difficulties. Palliative care specialists manage symptoms, alleviate suffering, and improve quality of life regardless of treatment stage. Support groups provide emotional connection, practical advice, and reduced isolation.
        Integrative approaches including mindfulness, meditation, art therapy, and gentle exercise may complement conventional treatments. Advance care planning ensures patient preferences guide medical decisions throughout the disease course. Survivorship care addresses long-term effects and monitoring for recurrence or late complications.
        RESEARCH ADVANCEMENTS AND FUTURE DIRECTIONS
        Molecular profiling continues to refine tumor classification beyond histological appearance. The WHO CNS5 classification incorporates molecular markers that influence prognosis and treatment selection. Liquid biopsy techniques detect tumor-derived DNA in blood or cerebrospinal fluid, enabling non-invasive monitoring and early detection of recurrence.
        Novel drug delivery strategies aim to overcome the blood-brain barrier, including convection-enhanced delivery, nanoparticle carriers, and focused ultrasound disruption. Immunotherapy combinations seek to overcome the immunosuppressive tumor microenvironment. Gene therapy approaches investigate viral vectors and CRISPR-based technologies for targeted interventions.
        Connectome preservation during surgery maps functional and structural brain networks to maximize resection while minimizing neurological consequences. Multi-omics integration combines genomic, transcriptomic, proteomic, and metabolomic data for comprehensive tumor characterization. Digital health technologies enable remote monitoring, symptom tracking, and virtual care delivery.
    """

def get_eli5_knowledge():
    """Returns simplified knowledge for the ELI5 mode."""
    return """
        Imagine your brain is like a super important control center for your whole body. A brain tumor is like a little lump or a "bad spot" that grows inside this control center.
        Sometimes these lumps are "friendly" (benign) and don't cause too much trouble, growing slowly. Other times, they are "unfriendly" (malignant) and can grow fast and cause big problems.
        Doctors use special cameras, like an MRI (which is like a super detailed photo machine for your brain), to find these lumps.
        If they find one, they might do a "tiny peek" (biopsy) to see what kind of lump it is.
        To make the lump go away, doctors have different plans:
        - "Fix-it surgery": They try to take the lump out.
        - "Special light treatment": They use strong light beams to zap the bad cells.
        - "Special medicine": You take medicine that fights the bad cells.
        The goal is always to help your brain control center work perfectly again!
    """

def get_student_knowledge():
    """Returns detailed educational knowledge for the student mode."""
    return """
        Brain tumors are complex neoplasms arising from uncontrolled cell division within the brain parenchyma or its surrounding structures. They are broadly classified into primary (originating in the brain) and secondary (metastatic, spreading from other sites). Histopathological grading, typically using the WHO classification system, is crucial for prognosis and treatment planning, ranging from Grade I (least aggressive) to Grade IV (most aggressive, e.g., Glioblastoma).

        Key tumor types include:
        -   **Gliomas:** Derived from glial cells (astrocytes, oligodendrocytes, ependymal cells). Glioblastoma is the most common and aggressive adult primary brain tumor.
        -   **Meningiomas:** Arise from the meninges. Often benign, but can be atypical or anaplastic.
        -   **Pituitary Adenomas:** Grow in the pituitary gland, causing endocrine dysfunction.
        -   **Vestibular Schwannomas (Acoustic Neuromas):** Benign tumors on the vestibulocochlear nerve, leading to hearing loss and balance issues.

        **Diagnostic Modalities:**
        -   **Neurological Examination:** Assesses cranial nerve function, motor skills, sensory perception, and reflexes.
        -   **Neuroimaging:**
            -   **MRI (Magnetic Resonance Imaging):** Gold standard for soft tissue visualization, often with contrast enhancement (Gadolinium). Advanced sequences include DWI, PWI, and MRS.
            -   **CT (Computed Tomography):** Rapid imaging for acute hemorrhage, calcifications, and bone involvement.
            -   **PET (Positron Emission Tomography):** Evaluates metabolic activity, useful for differentiating tumor recurrence from radiation necrosis.
            -   **Biopsy:** Stereotactic or open surgical biopsy for definitive histopathological and molecular diagnosis.

        **Treatment Strategies:**
        -   **Neurosurgery:** Maximal safe resection is the primary goal. Techniques include neuronavigation, intraoperative MRI, awake craniotomy with brain mapping, and fluorescence-guided surgery (e.g., 5-ALA).
        -   **Radiation Therapy:** Uses high-energy beams to damage tumor DNA. Modalities include external beam radiation (IMRT, proton therapy), stereotactic radiosurgery (SRS, e.g., Gamma Knife, CyberKnife), and brachytherapy.
        -   **Chemotherapy:** Systemic agents targeting rapidly dividing cells. Temozolomide is standard for glioblastoma.
        -   **Targeted Therapy:** Drugs that interfere with specific molecular pathways involved in tumor growth (e.g., Bevacizumab for angiogenesis).
        -   **Immunotherapy:** Harnesses the patient's immune system to fight cancer (e.g., checkpoint inhibitors).
        -   **Tumor-Treating Fields (TTFields):** Low-intensity electric fields disrupting cell division.

        **Molecular Profiling:** Essential for personalized medicine, identifying genetic mutations (e.g., IDH1/2, 1p/19q co-deletion, MGMT methylation) that guide prognosis and treatment selection.
    """

# --- 2. KB CREATION FUNCTION ---
def build_knowledge_base(knowledge_text, index_path):
    """Loads text, chunks it, creates embeddings, and saves the FAISS vector store."""
    print(f"Starting Knowledge Base creation for mode with index path: {index_path}")

    try:
        # Initialize Embeddings Model
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

        # Split Text into Chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=["\n\n", "\n", ". ", "!", "?", " ", ""],
        )
        chunks = text_splitter.split_text(knowledge_text)
        documents = [Document(page_content=chunk) for chunk in chunks]
        print(f"Combined document split into {len(documents)} text chunks.")

        # Create the Vector Store
        print("Creating and saving FAISS vector store (this may take a few minutes)... ")
        vector_store = FAISS.from_documents(
            documents=documents,
            embedding=embeddings
        )

        # Save the Vector Store
        vector_store.save_local(index_path)
        print(f"\n✅ Knowledge Base successfully saved to: {index_path}")

    except Exception as e:
        print(f"\nAn error occurred during KB creation: {e}")

# --- EXECUTE KB CREATION ---
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create a knowledge base for a specific mode.")
    parser.add_argument("--mode", type=str, default="normal", choices=["normal", "eli5", "student"], help="The mode to create the knowledge base for.")
    args = parser.parse_args()

    mode_config = {
        "normal": {"knowledge_func": get_normal_knowledge, "index_path": "faiss_index_local"},
        "eli5": {"knowledge_func": get_eli5_knowledge, "index_path": "faiss_index_eli5"},
        "student": {"knowledge_func": get_student_knowledge, "index_path": "faiss_index_student"}
    }

    selected_mode = mode_config[args.mode]
    knowledge_text = selected_mode["knowledge_func"]()
    index_path = selected_mode["index_path"]

    build_knowledge_base(knowledge_text, index_path)