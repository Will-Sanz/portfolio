/**
 * Theme Toggle Module
 * Handles dark/light mode switching with localStorage persistence
 */

class ThemeToggle {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.body = document.body;
    this.currentTheme = this.getStoredTheme() || 'light';
    
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);
    
    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    this.watchSystemTheme();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    this.storeTheme(newTheme);
    
    // Add a nice transition effect
    this.addTransitionEffect();
  }

  setTheme(theme) {
    this.currentTheme = theme;
    
    if (theme === 'dark') {
      this.body.classList.add('dark-theme');
    } else {
      this.body.classList.remove('dark-theme');
    }
    
    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }

  getStoredTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  storeTheme(theme) {
    localStorage.setItem('portfolio-theme', theme);
  }

  watchSystemTheme() {
    // Only watch if no stored preference
    if (!this.getStoredTheme()) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener((e) => {
        this.setTheme(e.matches ? 'dark' : 'light');
      });
      
      // Set initial based on system preference
      if (mediaQuery.matches) {
        this.setTheme('dark');
      }
    }
  }

  updateMetaThemeColor(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }

  addTransitionEffect() {
    // Add a subtle pulse effect to the toggle button
    this.themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
      this.themeToggle.style.transform = 'scale(1)';
    }, 150);
  }

  // Public method to get current theme
  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeToggle;
} else {
  window.ThemeToggle = ThemeToggle;
}