/**
 * Typing Animation Module
 * Creates a typewriter effect for the hero subtitle
 */

class TypingAnimation {
  constructor(elementId, options = {}) {
    this.element = document.getElementById(elementId);
    this.texts = options.texts || [
      'Full Stack Developer',
      'Creative Problem Solver',
      'Tech Enthusiast',
      'Code Craftsman'
    ];
    this.speed = options.speed || 100;
    this.deleteSpeed = options.deleteSpeed || 50;
    this.pauseTime = options.pauseTime || 2000;
    this.loop = options.loop !== false;
    
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;
    
    this.init();
  }

  init() {
    if (!this.element) {
      console.warn('Typing animation element not found');
      return;
    }
    
    // Start the animation
    this.type();
  }

  type() {
    const currentText = this.texts[this.currentTextIndex];
    
    if (this.isPaused) {
      setTimeout(() => {
        this.isPaused = false;
        this.type();
      }, this.pauseTime);
      return;
    }

    if (!this.isDeleting) {
      // Typing forward
      this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
      
      if (this.currentCharIndex === currentText.length) {
        // Finished typing current text, pause then start deleting
        this.isPaused = true;
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseTime);
        return;
      }
    } else {
      // Deleting backward
      this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
      
      if (this.currentCharIndex === 0) {
        // Finished deleting, move to next text
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        
        // Small pause before starting next text
        setTimeout(() => this.type(), 200);
        return;
      }
    }

    // Continue typing/deleting
    const speed = this.isDeleting ? this.deleteSpeed : this.speed;
    setTimeout(() => this.type(), speed + this.getRandomDelay());
  }

  getRandomDelay() {
    // Add some randomness to make it feel more natural
    return Math.random() * 50;
  }

  // Public methods for controlling the animation
  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.type();
    }
  }

  stop() {
    this.isPaused = true;
    this.element.textContent = '';
  }

  restart() {
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isPaused = false;
    this.type();
  }

  // Update texts dynamically
  updateTexts(newTexts) {
    this.texts = newTexts;
    this.restart();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TypingAnimation;
} else {
  window.TypingAnimation = TypingAnimation;
}