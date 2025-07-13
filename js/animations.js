/**
 * Animations Module
 * Handles scroll-triggered animations, skill bars, counters, and other visual effects
 */

class Animations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.countersAnimated = new Set();
    this.skillsAnimated = new Set();
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupSkillBars();
    this.setupCounters();
    this.setupScrollAnimations();
    this.setupParallaxEffects();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleElementInView(entry.target);
        }
      });
    }, this.observerOptions);

    // Observe elements for animation
    this.observeElements();
  }

  observeElements() {
    // Cards and sections to animate
    const animatedElements = document.querySelectorAll(`
      .about-card,
      .skill-item,
      .profile-card,
      .resume-card,
      .contact-card,
      .social-card,
      .section-header
    `);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.observer.observe(el);
    });
  }

  handleElementInView(element) {
    // Animate element into view
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Trigger specific animations based on element type
    if (element.classList.contains('skill-item')) {
      this.animateSkillBar(element);
    }
    
    if (element.querySelector('.stat-number')) {
      this.animateCounters(element);
    }
  }

  setupSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
      this.observer.observe(item);
    });
  }

  animateSkillBar(skillItem) {
    if (this.skillsAnimated.has(skillItem)) return;
    
    const skillProgress = skillItem.querySelector('.skill-progress');
    const skillLevel = skillItem.getAttribute('data-skill');
    
    if (skillProgress && skillLevel) {
      setTimeout(() => {
        skillProgress.style.width = `${skillLevel}%`;
      }, 300);
      
      this.skillsAnimated.add(skillItem);
    }
  }

  setupCounters() {
    const statElements = document.querySelectorAll('.stat');
    statElements.forEach(stat => {
      this.observer.observe(stat);
    });
  }

  animateCounters(container) {
    if (this.countersAnimated.has(container)) return;
    
    const counters = container.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      setTimeout(updateCounter, 200);
    });
    
    this.countersAnimated.add(container);
  }

  setupScrollAnimations() {
    // Parallax effect for floating shapes
    this.setupFloatingShapes();
    
    // Scroll-based opacity changes
    this.setupScrollOpacity();
  }

  setupFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = scrollY * speed;
        shape.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  setupScrollOpacity() {
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - (scrollY / windowHeight) * 1.5);
      
      if (heroContent) {
        heroContent.style.opacity = opacity;
      }
    });
  }

  setupParallaxEffects() {
    // Code window tilt effect
    const codeWindow = document.querySelector('.code-window');
    
    if (codeWindow) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const maxTilt = 5;
        const tilt = Math.min(maxTilt, scrollY * 0.01);
        
        codeWindow.style.transform = `perspective(1000px) rotateY(${-tilt}deg)`;
      });
    }
  }

  // Utility methods for manual animations
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = elapsed / duration;
      
      element.style.opacity = Math.min(progress, 1);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  fadeOut(element, duration = 300) {
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = elapsed / duration;
      
      element.style.opacity = Math.max(1 - progress, 0);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };
    
    requestAnimationFrame(animate);
  }

  slideIn(element, direction = 'left', duration = 300) {
    const startPos = direction === 'left' ? '-100%' : '100%';
    element.style.transform = `translateX(${startPos})`;
    element.style.display = 'block';
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = elapsed / duration;
      
      const currentPos = direction === 'left' 
        ? -100 + (progress * 100)
        : 100 - (progress * 100);
      
      element.style.transform = `translateX(${currentPos}%)`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = 'translateX(0)';
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Public method to manually trigger animations
  triggerAnimation(selector, animationType = 'fadeIn') {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        switch (animationType) {
          case 'fadeIn':
            this.fadeIn(element);
            break;
          case 'slideIn':
            this.slideIn(element);
            break;
          default:
            this.handleElementInView(element);
        }
      }, index * 100); // Stagger animations
    });
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
} else {
  window.Animations = Animations;
}