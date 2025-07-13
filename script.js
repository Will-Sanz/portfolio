document.addEventListener('DOMContentLoaded', () => {
    const viewResumeBtn = document.getElementById('view-resume');
    const downloadResumeBtn = document.getElementById('download-resume');

    viewResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showResumeModal();
    });

    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Resume download feature coming soon! For now, please contact me directly for my resume.');
    });

    function showResumeModal() {
        const modal = document.createElement('div');
        modal.className = 'resume-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Will Sanz - Resume</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="resume-content">
                        <section class="resume-section">
                            <h3>Contact Information</h3>
                            <p>Email: willsanz23@gmail.com</p>
                            <p>GitHub: github.com/Will-Sanz</p>
                            <p>LinkedIn: linkedin.com/in/williamsanz</p>
                        </section>
                        
                        <section class="resume-section">
                            <h3>Summary</h3>
                            <p>Passionate developer with experience in web technologies and software development. 
                               Seeking opportunities to contribute to innovative projects and grow technical skills.</p>
                        </section>
                        
                        <section class="resume-section">
                            <h3>Technical Skills</h3>
                            <ul>
                                <li>Programming Languages: JavaScript, Python, HTML/CSS</li>
                                <li>Frameworks & Libraries: React, Node.js</li>
                                <li>Tools & Technologies: Git, VS Code, Command Line</li>
                                <li>Databases: Basic SQL knowledge</li>
                            </ul>
                        </section>
                        
                        <section class="resume-section">
                            <h3>Education & Learning</h3>
                            <p>Continuously learning through online courses, coding bootcamps, and personal projects.</p>
                        </section>
                        
                        <section class="resume-section">
                            <h3>Projects</h3>
                            <p>Check out my GitHub for latest projects and contributions.</p>
                        </section>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        .resume-modal {
            display: flex;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: white;
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
        }

        .modal-header h2 {
            margin: 0;
            color: #333;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            color: #333;
        }

        .modal-body {
            padding: 1.5rem;
        }

        .resume-content .resume-section {
            margin-bottom: 1.5rem;
        }

        .resume-content h3 {
            color: #007bff;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.3rem;
        }

        .resume-content ul {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
        }

        .resume-content li {
            margin-bottom: 0.3rem;
        }
    `;
    document.head.appendChild(style);
});
