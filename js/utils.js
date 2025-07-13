/**
 * Utilities Module
 * Common utility functions and helpers
 */

class Utils {
  // Debounce function for performance optimization
  static debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  // Throttle function for scroll events
  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Check if element is in viewport
  static isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  }

  // Get element's position relative to page
  static getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height
    };
  }

  // Smooth scroll to element
  static scrollToElement(element, offset = 0) {
    const targetPosition = Utils.getElementPosition(element).top - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  // Format numbers with commas
  static formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Generate random ID
  static generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Check if device is mobile
  static isMobile() {
    return window.innerWidth <= 768;
  }

  // Check if device is touch-enabled
  static isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  // Get scroll percentage
  static getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / scrollHeight) * 100;
  }

  // Wait for DOM to be ready
  static ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  // Wait for all images to load
  static waitForImages(callback) {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    if (images.length === 0) {
      callback();
      return;
    }
    
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === images.length) {
          callback();
        }
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            callback();
          }
        });
        
        img.addEventListener('error', () => {
          loadedImages++;
          if (loadedImages === images.length) {
            callback();
          }
        });
      }
    });
  }

  // Local storage with error handling
  static storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.warn('Failed to save to localStorage:', error);
        return false;
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.warn('Failed to read from localStorage:', error);
        return defaultValue;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.warn('Failed to remove from localStorage:', error);
        return false;
      }
    },

    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.warn('Failed to clear localStorage:', error);
        return false;
      }
    }
  };

  // Event emitter for custom events
  static eventEmitter = {
    events: {},

    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },

    off(event, callback) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(cb => cb !== callback);
      }
    },

    emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(callback => callback(data));
      }
    }
  };

  // Animation frame utilities
  static animation = {
    // Request animation frame with fallback
    requestFrame(callback) {
      return (window.requestAnimationFrame || 
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function(callback) { setTimeout(callback, 1000 / 60); })(callback);
    },

    // Cancel animation frame with fallback
    cancelFrame(id) {
      return (window.cancelAnimationFrame ||
              window.webkitCancelAnimationFrame ||
              window.mozCancelAnimationFrame ||
              clearTimeout)(id);
    }
  };

  // Performance monitoring
  static performance = {
    // Mark performance timing
    mark(name) {
      if (window.performance && window.performance.mark) {
        window.performance.mark(name);
      }
    },

    // Measure performance between marks
    measure(name, startMark, endMark) {
      if (window.performance && window.performance.measure) {
        window.performance.measure(name, startMark, endMark);
      }
    },

    // Get timing data
    getTiming(name) {
      if (window.performance && window.performance.getEntriesByName) {
        const entries = window.performance.getEntriesByName(name);
        return entries.length > 0 ? entries[0] : null;
      }
      return null;
    }
  };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
} else {
  window.Utils = Utils;
}