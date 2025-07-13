# Will Sanz - Portfolio Website

A modern, responsive portfolio website with white and navy color scheme, showcasing professional experience and personal journey.

## Features

- **Modern Design**: White and navy color scheme with clean, responsive layout
- **Dark/Light Theme Toggle**: Interactive theme switching
- **Animated Hero Section**: Typing animation and floating shapes
- **Professional Profile**: Integrated resume-style experience section
- **Social Media Integration**: Direct links to GitHub, LinkedIn, and X
- **Smooth Navigation**: Animated scrolling and mobile-friendly hamburger menu

## Files Structure

- `index.html` - Main HTML structure
- `style.css` - Modern CSS with white/navy theme and animations
- `js/` - Modular JavaScript files for different features
  - `theme-toggle.js` - Dark/light theme functionality
  - `typing-animation.js` - Hero section typing effect
  - `navigation.js` - Mobile navigation and smooth scrolling
  - `animations.js` - Page animations and interactions
  - `pdf-viewer.js` - Resume PDF handling
  - `utils.js` - Utility functions
- `script.js` - Main JavaScript coordination

## Running the Website

### Option 1: Simple File Opening
Open `index.html` directly in any web browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

### Option 2: Local HTTP Server (Recommended)
For better development and testing, use a local server:

**Using Python (if installed):**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (if installed):**
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server

# Or use npx (no global install needed)
npx http-server
```

**Using Live Server (VS Code Extension):**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then visit `http://localhost:8000` (or the port shown) in your browser.

## GitHub Pages Deployment

This portfolio is configured for GitHub Pages deployment:

1. **Push to GitHub**: Ensure all files are committed and pushed to the main branch
2. **Enable Pages**: Go to repository Settings → Pages
3. **Source**: Select "Deploy from a branch" and choose "main" branch
4. **Custom Domain**: Add `willsanz.com` in the custom domain field
5. **DNS Setup**: Update your domain's DNS records to point to GitHub Pages

### DNS Configuration for willsanz.com
Add these DNS records at Network Solutions:
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: will-sanz.github.io
```

## Customization

- **Personal Info**: Update contact details in `index.html`
- **Social Links**: Modify URLs in the social links section
- **Professional Profile**: Edit experience details in the about section
- **Styling**: Customize colors in CSS variables at the top of `style.css`
- **Theme**: Adjust white/navy color scheme in `:root` CSS variables

## Contact

- **Email**: willsanz23@gmail.com
- **LinkedIn**: [williamsanz](https://linkedin.com/in/williamsanz)
- **GitHub**: [Will-Sanz](https://github.com/Will-Sanz)
- **X**: [WillSanz11](https://x.com/WillSanz11)
