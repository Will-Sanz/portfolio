/**
 * PDF Viewer Module
 * Handles displaying PDF documents in a modal overlay
 */

class PDFViewer {
  constructor() {
    this.pdfPath = '/Users/willsanz/Desktop/Academic Documents/William Sanz Resume.pdf';
    this.isOpen = false;
    this.modal = null;
    
    this.init();
  }

  init() {
    this.createModal();
    this.setupEventListeners();
  }

  createModal() {
    // Create modal HTML structure
    this.modal = document.createElement('div');
    this.modal.className = 'pdf-modal';
    this.modal.innerHTML = `
      <div class="pdf-modal-overlay">
        <div class="pdf-modal-content">
          <div class="pdf-modal-header">
            <h3>Resume - Will Sanz</h3>
            <button class="pdf-close-btn" aria-label="Close PDF viewer">×</button>
          </div>
          <div class="pdf-viewer-container">
            <iframe 
              id="pdf-iframe" 
              src="" 
              width="100%" 
              height="100%" 
              frameborder="0">
              <p>Your browser does not support PDFs. Please download the PDF to view it.</p>
            </iframe>
          </div>
          <div class="pdf-modal-footer">
            <button class="btn btn-primary" id="close-pdf-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    // Add modal styles
    this.addModalStyles();
    
    // Append to body
    document.body.appendChild(this.modal);
  }

  addModalStyles() {
    if (document.getElementById('pdf-modal-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'pdf-modal-styles';
    styles.textContent = `
      .pdf-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
      }

      .pdf-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pdf-modal-overlay {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .pdf-modal-content {
        background: var(--bg-light);
        border-radius: 12px;
        width: 95%;
        max-width: 1100px;
        height: 95%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      body.dark-theme .pdf-modal-content {
        background: var(--bg-dark);
      }

      .pdf-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--border-light);
        background: var(--bg-light-secondary);
      }

      body.dark-theme .pdf-modal-header {
        border-bottom-color: var(--border-dark);
        background: var(--bg-dark-secondary);
      }

      .pdf-modal-header h3 {
        margin: 0;
        color: var(--primary);
        font-size: 1.3rem;
      }

      .pdf-close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--text-dark);
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
      }

      body.dark-theme .pdf-close-btn {
        color: var(--text-light);
      }

      .pdf-close-btn:hover {
        background: var(--primary);
        color: white;
      }

      .pdf-viewer-container {
        flex: 1;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 0;
      }

      .pdf-viewer-container iframe {
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .custom-resume {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 2rem 3rem;
        background: #ffffff;
        border-radius: 0;
        font-family: 'Times New Roman', serif;
        line-height: 1.4;
        color: #000000;
        font-size: 12pt;
        margin: 0 auto;
      }

      body.dark-theme .custom-resume {
        background: #1a1a1a;
        color: #ffffff;
      }

      .resume-header-section {
        text-align: center;
        margin-bottom: 1.5rem;
        border-bottom: none;
        padding-bottom: 0;
      }

      .resume-name {
        font-size: 20pt;
        font-weight: bold;
        color: #000000;
        margin-bottom: 0.3rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      body.dark-theme .resume-name {
        color: #ffffff;
      }

      .resume-contact {
        font-size: 11pt;
        color: #000000;
        line-height: 1.4;
      }

      body.dark-theme .resume-contact {
        color: #ffffff;
      }

      .resume-contact div {
        margin-bottom: 0.2rem;
      }

      .resume-section {
        margin-bottom: 1.5rem;
      }

      .resume-section-title {
        font-size: 14pt;
        font-weight: bold;
        color: #000000;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 0.8rem;
        border-bottom: 2px solid #000000;
        padding-bottom: 0.2rem;
      }

      body.dark-theme .resume-section-title {
        color: #ffffff;
        border-bottom-color: #ffffff;
      }

      .resume-item {
        margin-bottom: 1.2rem;
      }

      .resume-item-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.2rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .resume-item-header strong {
        font-weight: bold;
        font-size: 12pt;
        color: #000000;
      }

      body.dark-theme .resume-item-header strong {
        color: #ffffff;
      }

      .resume-item-subheader {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.4rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .resume-location {
        font-style: italic;
        color: #000000;
        font-size: 12pt;
        font-weight: normal;
      }

      body.dark-theme .resume-location {
        color: #ffffff;
      }

      .resume-date {
        font-style: italic;
        color: #000000;
        font-size: 12pt;
        font-weight: normal;
      }

      body.dark-theme .resume-date {
        color: #ffffff;
      }

      .resume-item-subtitle {
        font-style: italic;
        color: #000000;
        margin-bottom: 0.3rem;
        font-size: 12pt;
      }

      body.dark-theme .resume-item-subtitle {
        color: #ffffff;
      }

      .resume-tech-stack {
        font-style: italic;
        color: #333333;
        margin-bottom: 0.4rem;
        font-size: 11pt;
      }

      body.dark-theme .resume-tech-stack {
        color: #cccccc;
      }

      .resume-item-details {
        margin-left: 0;
      }

      .resume-item-details ul {
        margin: 0.3rem 0;
        padding-left: 1.2rem;
      }

      .resume-item-details li {
        margin-bottom: 0.3rem;
        font-size: 12pt;
        line-height: 1.4;
        text-align: justify;
      }

      .resume-item-details p {
        margin-bottom: 0.3rem;
        font-size: 12pt;
        line-height: 1.4;
        text-align: justify;
      }

      .resume-item-details strong {
        font-weight: bold;
      }

      /* Custom scrollbar styling */
      .custom-resume::-webkit-scrollbar {
        width: 8px;
      }

      .custom-resume::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
      }

      body.dark-theme .custom-resume::-webkit-scrollbar-track {
        background: #333333;
      }

      .custom-resume::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }

      body.dark-theme .custom-resume::-webkit-scrollbar-thumb {
        background: #666666;
      }

      .custom-resume::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      body.dark-theme .custom-resume::-webkit-scrollbar-thumb:hover {
        background: #888888;
      }

      @media (max-width: 768px) {
        .pdf-modal-overlay {
          padding: 0.5rem;
        }

        .pdf-modal-content {
          width: 98%;
          height: 98%;
        }

        .custom-resume {
          padding: 1rem;
          font-size: 11pt;
        }

        .resume-name {
          font-size: 18pt;
        }

        .resume-contact {
          font-size: 10pt;
        }

        .resume-section-title {
          font-size: 13pt;
        }

        .resume-item-header {
          flex-direction: column;
          align-items: flex-start;
        }

        .resume-item-subheader {
          flex-direction: column;
          align-items: flex-start;
        }

        .resume-location,
        .resume-date {
          font-size: 11pt;
        }
      }

      .pdf-modal-footer {
        display: flex;
        gap: 1rem;
        padding: 1.5rem 2rem;
        border-top: 1px solid var(--border-light);
        background: var(--bg-light-secondary);
        justify-content: center;
      }

      body.dark-theme .pdf-modal-footer {
        border-top-color: var(--border-dark);
        background: var(--bg-dark-secondary);
      }

      .pdf-error-message {
        text-align: center;
        padding: 2rem;
        color: var(--text-dark);
      }

      body.dark-theme .pdf-error-message {
        color: var(--text-light);
      }

      @media (max-width: 768px) {
        .pdf-modal-overlay {
          padding: 1rem;
        }

        .pdf-modal-content {
          width: 95%;
          height: 95%;
        }

        .pdf-modal-header,
        .pdf-modal-footer {
          padding: 1rem;
        }

        .pdf-modal-footer {
          flex-direction: column;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  setupEventListeners() {
    // Close button in header
    this.modal.querySelector('.pdf-close-btn').addEventListener('click', () => {
      this.close();
    });

    // Close button in footer
    this.modal.querySelector('#close-pdf-btn').addEventListener('click', () => {
      this.close();
    });


    // Close on overlay click
    this.modal.querySelector('.pdf-modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Try to load the PDF
    this.loadPDF();

    // Emit event
    Utils.eventEmitter.emit('pdf:opened');
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear iframe source
    const iframe = this.modal.querySelector('#pdf-iframe');
    iframe.src = '';

    // Emit event
    Utils.eventEmitter.emit('pdf:closed');
  }

  loadPDF() {
    const container = this.modal.querySelector('.pdf-viewer-container');
    this.showCustomResume(container);
  }

  showCustomResume(container) {
    container.innerHTML = `
      <div class="custom-resume">
        <div class="resume-header-section">
          <h1 class="resume-name">William David Sanz</h1>
          <div class="resume-contact">
            <div>willsanz23@gmail.com | (914) 719-2382 | 15 Sullivan Road, Goldens Bridge, NY</div>
            <div>https://github.com/Will-Sanz | linkedin.com/in/williamsanz</div>
          </div>
        </div>

        <div class="resume-section">
          <h2 class="resume-section-title">EDUCATION</h2>
          <div class="resume-item">
            <div class="resume-item-header">
              <strong>University of Pennsylvania - SEAS</strong>
              <span class="resume-location">Philadelphia, PA</span>
            </div>
            <div class="resume-item-subheader">
              <span class="resume-item-subtitle">Computer Science BSE Concentrating in Artificial Intelligence</span>
              <span class="resume-date">May 2027</span>
            </div>
            <div class="resume-item-details">
              <p><strong>GPA:</strong> 3.62 / 4</p>
              <p><strong>Courses:</strong> Operating Systems, Computer Hardware Design, Machine Learning, Data Structure and Algorithms</p>
              <p>Pursuing minors in Data Science, Mathematics, and Engineering Entrepreneurship</p>
            </div>
          </div>
          <div class="resume-item">
            <div class="resume-item-header">
              <strong>John Jay High School</strong>
              <span class="resume-location">Cross River, NY</span>
            </div>
            <div class="resume-item-subheader">
              <span class="resume-item-subtitle">High School Diploma</span>
              <span class="resume-date">September 2019–June 2023</span>
            </div>
            <div class="resume-item-details">
              <p><strong>ACT Score:</strong> 35</p>
              <p>AP Scholar with Distinction; National Hispanic Recognition Program Scholar; Brown University Book Award Recipient; National Honor Society</p>
            </div>
          </div>
        </div>

        <div class="resume-section">
          <h2 class="resume-section-title">PROJECTS</h2>
          <div class="resume-item">
            <div class="resume-item-header">
              <strong>Freelance Career Launch Platform</strong>
              <span class="resume-date">November 2024–Present</span>
            </div>
            <div class="resume-tech-stack">Python, JavaScript, HTML, CSS, Django, Bootstrap, jQuery, AWS</div>
            <div class="resume-item-details">
              <ul>
                <li>Developed a Django-based web application to empower users to launch freelance careers, featuring user authentication and an AI-driven journey system for tailored career guidance</li>
                <li>Integrated OpenAI's GPT-4 API along with Django Channels and WebSockets to enable real-time chat functionality, personalized document review, and career path recommendations</li>
                <li>Expanded functionality to assist users in creating professional documents, such as resumes and niche-specific project templates, with seamless storage on AWS for accessibility and security</li>
                <li>Designed and implemented responsive user interfaces using JavaScript, HTML, CSS, and frontend frameworks like Bootstrap and jQuery to ensure consistent and visually appealing layouts</li>
              </ul>
            </div>
          </div>
          
          <div class="resume-item">
            <div class="resume-item-header">
              <strong>PennOS</strong>
              <span class="resume-date">January 2025–May 2025</span>
            </div>
            <div class="resume-tech-stack">C</div>
            <div class="resume-item-details">
              <ul>
                <li>Implemented FAT file system and integrated shell commands and redesigned file descriptor tables</li>
                <li>Built and stabilized process management stack, developed fork, wait, and exec system calls, and authored a round-robin scheduler</li>
              </ul>
            </div>
          </div>

          <div class="resume-item">
            <div class="resume-item-header">
              <strong>JCompiler</strong>
              <span class="resume-date">August 2024–December 2024</span>
            </div>
            <div class="resume-tech-stack">C, RISC-V</div>
            <div class="resume-item-details">
              <ul>
                <li>Developed a typechecked compiler pipeline for J, a stack-oriented language, into RISC-V assembly</li>
                <li>Implemented token parsing, ASM generation for literals, arithmetic operations, bitwise operations, control structures, and function definitions</li>
                <li>Created a modular codebase with a Makefile for streamlined compilation and debugging; ensured memory safety using valgrind and enforced rigorous error handling for invalid syntax</li>
              </ul>
            </div>
          </div>

          <div class="resume-item">
            <div class="resume-item-header">
              <strong>SayBase Dev</strong>
              <span class="resume-date">June 2025–Present</span>
            </div>
            <div class="resume-tech-stack">Typescript, Python, JavaScript, React</div>
            <div class="resume-item-details">
              <ul>
                <li>Developed a voice-driven IDE companion with VSCode extension enabling real-time speech to text code commands through a WebSocket connected FastAPI backend, integrating Claude 3.5 Sonnet</li>
                <li>Architectured the underlying micro-services platform - TypeScript and React frontend, LangChain driven python services, tree-sitter code parsing, and a push to talk enabled workflow</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="resume-section">
          <h2 class="resume-section-title">RELEVANT EXPERIENCE</h2>
          <div class="resume-item">
            <div class="resume-item-header">
              <strong>Gemini - SWE Intern (Acquisition and Activation)</strong>
              <span class="resume-location">New York, NY</span>
            </div>
            <div class="resume-item-subheader">
              <span class="resume-tech-stack">Scala, TypeScript, React, Refine, Ant Design, Zod</span>
              <span class="resume-date">June 2025–August 2025</span>
            </div>
            <div class="resume-item-details">
              <ul>
                <li>Modernized internal tool by leading a full-stack migration and collaborating with stakeholders on the Compliance team to address workflow inefficiencies and improve usability</li>
              </ul>
            </div>
          </div>

          <div class="resume-item">
            <div class="resume-item-header">
              <strong>Penn Engineering Council</strong>
              <span class="resume-location">Philadelphia, PA</span>
            </div>
            <div class="resume-item-subheader">
              <span class="resume-item-subtitle">Finance Board</span>
              <span class="resume-date">December 2024–Present</span>
            </div>
            <div class="resume-item-details">
              <ul>
                <li>Oversee a $10,000 budget to support funding for the School of Engineering and individual students</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="resume-section">
          <h2 class="resume-section-title">SKILLS AND INTERESTS</h2>
          <div class="resume-item">
            <div class="resume-item-details">
              <p><strong>Technologies:</strong> Java; OCaml; C; Python; JavaScript; TypeScript, React, Refine</p>
              <p><strong>Interests:</strong> Golf (3.8 Handicap); LLMs; Basketball; Machine Learning; Web3, Prediction Markets, Crypto</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showError(container, message) {
    container.innerHTML = `
      <div class="pdf-error-message">
        <h3>Unable to Load PDF</h3>
        <p>${message}</p>
        <p>Please contact me directly for a copy of my resume.</p>
        <div style="margin-top: 1rem;">
          <a href="mailto:willsanz23@gmail.com" class="btn btn-primary">Email Me</a>
        </div>
      </div>
    `;
  }

  downloadPDF() {
    // Since we can't directly access local files, provide alternatives
    this.requestPDFCopy();
  }

  requestPDFCopy() {
    const message = `I'd be happy to send you my resume! Please email me at willsanz23@gmail.com or view my online resume in the meantime.`;
    alert(message);
    
    // Track the request
    Utils.eventEmitter.emit('pdf:download-requested');
  }

  // Public method to check if modal is open
  isModalOpen() {
    return this.isOpen;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFViewer;
} else {
  window.PDFViewer = PDFViewer;
}