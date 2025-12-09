import React from 'react';
import './ResearchPage.css';
import '../pages/HomePage.css';

const ResearchPage = () => {
  return (
    <section className="homepage-bg">
      <div className="homepage-video-wrapper">
        <video autoPlay muted loop playsInline className="homepage-bg-video">
          <source src="/video/homepage-bg2.mp4" type="video/mp4" />
          {/* Fallback if video doesn't load */}
          <img src="/conny-schneider-xuTJZ7uD7PI-unsplash.jpg" alt="Background fallback" />
        </video>
      </div>
      
      {/* Your homepage content here */}
      <div className="content">
      <div className="hero-banner">
        <div className="hero-text">
          <h1>Clinically validated AI for Brain Tumor Segmentation — Transparent, Explainable, Reproducible.</h1>
          <p>Our deep-learning model has been trained on public benchmarks (BraTS 2021–2023) and fine-tuned with anonymized institutional data to ensure reliability across modalities.</p>
          <div className="hero-ctas">
            <button className="action-btn">📄 Download Validation Report (PDF)</button>
            <button className="action-btn">🧪 View Dataset Protocol</button>
          </div>
        </div>
        <div className="hero-chart-animation">
          {/* Placeholder for chart animation */}
          <img src="https://via.placeholder.com/300x200?text=Chart+Animation" alt="Chart Animation" />
        </div>
      </div>

      <div className="benchmark-results-dashboard">
        <h2>Benchmark Results Dashboard</h2>
        <p className="section-tagline">Transparent performance metrics that clinicians can trust.</p>

        <div className="dice-score-benchmarks">
          <h3>Dice Score Benchmarks</h3>
          <div className="chart-placeholder">
            {/* Bar chart comparing Dice Coefficient */}
            <img src="https://via.placeholder.com/600x300?text=Dice+Score+Bar+Chart" alt="Dice Score Bar Chart" />
          </div>
          <div className="toggle-container">
            <label>
              <input type="checkbox" /> Show Baseline vs Our Model
            </label>
          </div>

          <table className="metrics-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Dice</th>
                <th>Hausdorff (mm)</th>
                <th>Precision</th>
                <th>Recall</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Whole Tumor</td>
                <td>0.92</td>
                <td>3.1</td>
                <td>0.93</td>
                <td>0.91</td>
              </tr>
              <tr>
                <td>Tumor Core</td>
                <td>0.87</td>
                <td>4.2</td>
                <td>0.88</td>
                <td>0.85</td>
              </tr>
              <tr>
                <td>Enhancing Tumor</td>
                <td>0.84</td>
                <td>5.0</td>
                <td>0.82</td>
                <td>0.86</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="roc-curves">
          <h3>ROC / Precision-Recall Curves</h3>
          <div className="chart-placeholder">
            {/* ROC curve chart */}
            <img src="https://via.placeholder.com/600x300?text=ROC+Curve+Chart" alt="ROC Curve Chart" />
          </div>
          <p>AUC = 0.98 (95% CI: 0.97-0.99)</p>
          <p className="tooltip-explanation">
            <span className="info-icon">ℹ</span>
            <span className="tooltip-text">The ROC curve shows the diagnostic ability of a binary classifier system as its discrimination threshold is varied. AUC (Area Under the Curve) measures the entire 2-D area underneath the entire ROC curve.</span>
          </p>
        </div>

        

        

      </div>

      <div className="papers-references-section">
        <h2>Papers, Preprints & References</h2>
        <p className="section-tagline">Our approach is built on strong academic foundations.</p>
        <div className="papers-list">
          <div className="paper-item">
            <h4><a href="#">Attention U-Net: Learning Where to Look for the Pancreas</a></h4>
            <p>O. Oktay, et al. | MIDL | 2018</p>
            <p>Describes the attention mechanism that inspired our model's architecture.</p>
          </div>
          <div className="paper-item">
            <h4><a href="#">BraTS: The Multimodal Brain Tumor Segmentation Benchmark</a></h4>
            <p>B. H. Menze, et al. | IEEE TMI | 2015</p>
            <p>The foundational dataset and benchmark for our model evaluation.</p>
          </div>
          <div className="paper-item">
            <h4><a href="#">Explainable Deep Learning for Medical Image Segmentation</a></h4>
            <p>R. R. Selvaraju, et al. | MICCAI | 2017</p>
            <p>The basis for our Grad-CAM based interpretability features.</p>
          </div>
        </div>
      </div>

      <div className="validation-protocol-section">
        <h2>Validation Protocol & Test Dataset</h2>
        <p className="section-tagline">Our evaluation process follows medical-grade validation standards.</p>
        <table className="dataset-summary-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Cases</th>
              <th>Modalities</th>
              <th>Annotation type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BraTS 2023</td>
              <td>1,250</td>
              <td>T1, T2, FLAIR, T1ce</td>
              <td>Expert annotated</td>
            </tr>
            <tr>
              <td>Internal hospital</td>
              <td>100</td>
              <td>T1, T2</td>
              <td>Radiologist verified</td>
            </tr>
          </tbody>
        </table>
        <div className="protocol-description">
          <ul>
            <li><strong>Data split:</strong> 70% train, 15% validation, 15% test (no patient overlap).</li>
            <li><strong>Normalization:</strong> z-score across slices.</li>
            <li><strong>Augmentation:</strong> flip, rotation, noise, gamma correction.</li>
            <li><strong>Metrics:</strong> Dice, Hausdorff, precision, recall.</li>
            <li><strong>Cross-validation:</strong> 5-fold to ensure stability.</li>
            <li><strong>Statistical tests:</strong> Paired t-test for metric differences.</li>
          </ul>
          <p className="compliance-note">All clinical data was anonymized before processing and used under institutional ethics approval.</p>
        </div>
      </div>

      

      <div className="explainability-trust-layer">
        <h2>Explainability & Trust Layer</h2>
        <p className="section-tagline">AI decisions are transparent and interpretable.</p>
        <div className="explainability-visuals">
          <div className="visual-comparison">
            <img src="https://via.placeholder.com/200x200?text=MRI" alt="MRI" />
            <p>MRI</p>
          </div>
          <div className="visual-comparison">
            <img src="https://via.placeholder.com/200x200?text=Segmentation" alt="Segmentation" />
            <p>Segmentation</p>
          </div>
          <div className="visual-comparison">
            <img src="https://via.placeholder.com/200x200?text=Grad-CAM" alt="Grad-CAM" />
            <p>Grad-CAM Heatmap</p>
          </div>
          <div className="visual-comparison">
            <img src="https://via.placeholder.com/200x200?text=Confidence+Overlay" alt="Confidence Overlay" />
            <p>Confidence Overlay</p>
          </div>
        </div>
        <p>Grad-CAM visualizations highlight the model’s focus regions, ensuring transparency for radiologists reviewing segmentation results.</p>
      </div>

      <div className="model-card-summary">
        <div className="model-card-content">
          <h2>Model Card Summary</h2>
          <div className="model-card-row">
            <div className="model-card-field">Model Name</div>
            <div className="model-card-value">BrainVision v3.0</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Type</div>
            <div className="model-card-value">3D Attention U-Net (ensemble)</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Task</div>
            <div className="model-card-value">Brain Tumor Segmentation</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Datasets</div>
            <div className="model-card-value">BraTS 2021–2023, internal 100 cases</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Metrics</div>
            <div className="model-card-value">Dice 0.92 (WT), AUC 0.98</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Framework</div>
            <div className="model-card-value">PyTorch</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Explainability</div>
            <div className="model-card-value">Grad-CAM & Uncertainty maps</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Last Updated</div>
            <div className="model-card-value">Oct 2024</div>
          </div>
          <div className="model-card-row">
            <div className="model-card-field">Developed by</div>
            <div className="model-card-value">[Your Team Name]</div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};


export default ResearchPage;