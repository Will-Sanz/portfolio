/**
 * Main Portfolio Script
 * Coordinates all modules and initializes the application
 */

class Portfolio {
  constructor() {
    this.modules = {};
    this.isInitialized = false;
    
    // Bind context
    this.init = this.init.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  async init() {
    try {
      Utils.performance.mark('portfolio-init-start');
      
      // Initialize core modules
      await this.initializeModules();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Handle download resume functionality
      this.setupDownloadResume();
      
      // Mark as initialized
      this.isInitialized = true;
      
      Utils.performance.mark('portfolio-init-end');
      Utils.performance.measure('portfolio-init', 'portfolio-init-start', 'portfolio-init-end');
      
      console.log('Portfolio initialized successfully');
      
      // Emit initialization complete event
      Utils.eventEmitter.emit('portfolio:initialized', this.modules);
      
    } catch (error) {
      console.error('Failed to initialize portfolio:', error);
    }
  }

  async initializeModules() {
    // Initialize theme toggle
    if (typeof ThemeToggle !== 'undefined') {
      this.modules.themeToggle = new ThemeToggle();
    }

    // Initialize navigation
    if (typeof Navigation !== 'undefined') {
      this.modules.navigation = new Navigation();
    }

    // Initialize typing animation
    if (typeof TypingAnimation !== 'undefined') {
      this.modules.typingAnimation = new TypingAnimation('typing-text', {
        texts: [
          'Full Stack Developer',
          'Creative Problem Solver',
          'Tech Enthusiast',
          'Code Architect',
          'Digital Innovator'
        ],
        speed: 80,
        deleteSpeed: 40,
        pauseTime: 2000
      });
    }

    // Initialize animations
    if (typeof Animations !== 'undefined') {
      this.modules.animations = new Animations();
    }

    // Initialize PDF viewer
    if (typeof PDFViewer !== 'undefined') {
      this.modules.pdfViewer = new PDFViewer();
    }

    // Wait a bit for DOM to be fully ready
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  setupGlobalEvents() {
    // Handle window resize
    window.addEventListener('resize', Utils.debounce(this.handleResize, 250));
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Handle page unload
    window.addEventListener('beforeunload', () => this.cleanup());
    
    // Handle errors
    window.addEventListener('error', this.handleError);
  }

  setupDownloadResume() {
    const viewPdfBtn = document.getElementById('view-pdf-resume');
    if (viewPdfBtn) {
      viewPdfBtn.addEventListener('click', () => {
        if (this.modules.pdfViewer) {
          this.modules.pdfViewer.open();
        }
      });
    }
  }

  handleDownloadResume() {
    // Show a message since we don't have an actual PDF
    const message = `
      Resume download will be available soon! 
      For now, you can view my resume using the "View Full Resume" button 
      or contact me directly at willsanz23@gmail.com for a copy.
    `;
    
    alert(message);
    
    // Track the download attempt (could be sent to analytics)
    Utils.eventEmitter.emit('resume:download-attempted');
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Emit resize event for modules that need to respond
    Utils.eventEmitter.emit('window:resize', { width, height });
    
    // Update CSS custom properties for responsive design
    document.documentElement.style.setProperty('--viewport-width', `${width}px`);
    document.documentElement.style.setProperty('--viewport-height', `${height}px`);
  }

  handleVisibilityChange() {
    if (document.hidden) {
      // Page is not visible
      this.pauseAnimations();
      Utils.eventEmitter.emit('page:hidden');
    } else {
      // Page is visible
      this.resumeAnimations();
      Utils.eventEmitter.emit('page:visible');
    }
  }

  pauseAnimations() {
    // Pause typing animation to save resources
    if (this.modules.typingAnimation) {
      this.modules.typingAnimation.pause();
    }
  }

  resumeAnimations() {
    // Resume typing animation
    if (this.modules.typingAnimation) {
      this.modules.typingAnimation.resume();
    }
  }

  handleError(event) {
    console.error('Portfolio error:', event.error);
    
    // Track error for debugging
    Utils.eventEmitter.emit('error:occurred', {
      message: event.error?.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  }

  // Public API methods
  getModule(name) {
    return this.modules[name];
  }

  isModuleLoaded(name) {
    return !!this.modules[name];
  }

  navigateToSection(sectionId) {
    if (this.modules.navigation) {
      this.modules.navigation.navigateToSection(sectionId);
    }
  }

  toggleTheme() {
    if (this.modules.themeToggle) {
      this.modules.themeToggle.toggleTheme();
    }
  }

  getCurrentTheme() {
    return this.modules.themeToggle?.getCurrentTheme() || 'light';
  }

  // Cleanup method
  cleanup() {
    // Clean up animations
    if (this.modules.animations) {
      this.modules.animations.destroy();
    }
    
    // Stop typing animation
    if (this.modules.typingAnimation) {
      this.modules.typingAnimation.stop();
    }
    
    // Clear event listeners
    Utils.eventEmitter.events = {};
    
    console.log('Portfolio cleaned up');
  }
}

// Initialize portfolio when DOM is ready
Utils.ready(() => {
  // Wait for all scripts to load
  Utils.waitForImages(() => {
    // Create global portfolio instance
    window.portfolio = new Portfolio();
    
    // Initialize with a small delay to ensure all modules are loaded
    setTimeout(() => {
      window.portfolio.init();
    }, 100);
  });
});

// Expose utilities globally for debugging
if (typeof window !== 'undefined') {
  window.Utils = Utils;
}