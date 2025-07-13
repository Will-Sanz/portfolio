/**
 * Navigation Module
 * Handles mobile menu, smooth scrolling, and active link highlighting
 */

class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navMenu = document.getElementById('nav-menu');
    this.hamburger = document.getElementById('hamburger');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('.section, .hero');
    
    this.isMenuOpen = false;
    this.scrollThreshold = 100;
    
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupScrollEffects();
    this.setupActiveLinks();
    this.setupScrollIndicator();
  }

  setupMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;

    // Toggle mobile menu
    this.hamburger.addEventListener('click', () => this.toggleMobileMenu());

    // Close menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.isMenuOpen) {
          this.closeMobileMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.navMenu.contains(e.target) && 
          !this.hamburger.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.navMenu.classList.add('active');
    this.hamburger.classList.add('active');
    this.isMenuOpen = true;
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    // Animate hamburger to X
    this.animateHamburger(true);
  }

  closeMobileMenu() {
    this.navMenu.classList.remove('active');
    this.hamburger.classList.remove('active');
    this.isMenuOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Animate X back to hamburger
    this.animateHamburger(false);
  }

  animateHamburger(toX) {
    const spans = this.hamburger.querySelectorAll('span');
    if (spans.length !== 3) return;

    if (toX) {
      spans[0].style.transform = 'rotate(45deg) translateY(6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            this.scrollToSection(targetElement);
          }
        }
      });
    });
  }

  scrollToSection(element) {
    const navbarHeight = this.navbar.offsetHeight;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  setupScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;
    
    // Add/remove navbar background on scroll
    if (scrollY > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
    
    // Update active navigation links
    this.updateActiveLinks();
    
    // Hide/show scroll indicator
    this.updateScrollIndicator(scrollY);
  }

  setupActiveLinks() {
    // Set initial active link
    this.updateActiveLinks();
  }

  updateActiveLinks() {
    const scrollY = window.scrollY;
    const navbarHeight = this.navbar.offsetHeight;

    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to current section link
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          this.scrollToSection(aboutSection);
        }
      });
    }
  }

  updateScrollIndicator(scrollY) {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
      // Hide scroll indicator after scrolling past hero section
      if (scrollY > window.innerHeight * 0.3) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else {
        scrollIndicator.style.opacity = '0.6';
        scrollIndicator.style.pointerEvents = 'auto';
      }
    }
  }

  // Public method to programmatically navigate to a section
  navigateToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      this.scrollToSection(targetElement);
      
      // Close mobile menu if open
      if (this.isMenuOpen) {
        this.closeMobileMenu();
      }
    }
  }

  // Get current active section
  getCurrentSection() {
    const activeLink = document.querySelector('.nav-link.active');
    return activeLink ? activeLink.getAttribute('href').substring(1) : null;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
} else {
  window.Navigation = Navigation;
}