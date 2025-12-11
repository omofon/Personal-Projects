# FAQ Accordion

A responsive, accessible FAQ accordion component built as a Frontend Mentor challenge. Features smooth expand/collapse animations, keyboard navigation, and mobile-first responsive design.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://accordion-gamma-liart.vercel.app/)
[![GitHub](https://img.shields.io/badge/code-github-blue)](https://github.com/omofon/Personal-Projects/tree/05d8713fc97d18bc898b7fe82edac91eb2d161c8/Frontend%20Mentor/faq-accordion-main)

## Features

- **Accessible**: Full ARIA attribute support and keyboard navigation
- **Responsive**: Mobile-first design with breakpoints for tablets and desktops
- **Performant**: Vanilla JavaScript with no dependencies
- **Modern CSS**: Tailwind CSS with custom theming and component layers

## Tech Stack

- HTML5 (Semantic markup)
- CSS3 (Tailwind CSS v4)
- Vanilla JavaScript (ES6+)
- Deployed on Vercel

## The Challenge

Users should be able to:

- ✅ Hide/show answers by clicking questions
- ✅ Navigate and toggle using keyboard only
- ✅ View optimal layout on any device size
- ✅ See hover and focus states for interactive elements

## What I Learned

### CSS Architecture

Implemented Tailwind's layer system for organized, maintainable styles:

```css
@layer components {
  .faq__question-button {
    @apply flex justify-between items-center w-full text-left 
           py-4 transition-colors duration-200 cursor-pointer;
  }
}
```

### Accessibility First

Proper ARIA implementation for screen readers and keyboard users:

```javascript
button.setAttribute('aria-expanded', String(shouldExpand));
const answerId = button.getAttribute('aria-controls');
```

### Layout Constraint Management

Fixed container overflow issues by accounting for margins in width calculations:

```html
class="w-[calc(100%-4rem)] max-w-sm md:max-w-lg xl:max-w-xl"
```

This prevents content from breaking viewport boundaries when margins (`mx-8` = 4rem total) are applied.

## Project Structure

```
faq-accordion-main/
├── assets/
│   └── images/          # SVG icons and background patterns
├── script/
│   └── index.js         # Accordion toggle logic
├── src/
│   ├── input.css        # Tailwind source styles
│   └── output.css       # Compiled CSS
└── index.html           # Main markup
```

## Key Implementation Details

### Toggle Logic

Clean, functional approach to state management:

```javascript
function toggleFaqItem(button) {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  const shouldExpand = !isExpanded;
  
  button.setAttribute('aria-expanded', String(shouldExpand));
  // Toggle icons and answer visibility
}
```

### Responsive Background

Using `<picture>` element for art direction:

```html
<picture>
  <source media="(min-width: 376px)" 
          srcset="./assets/images/background-pattern-desktop.svg" />
  <img src="./assets/images/background-pattern-mobile.svg" 
       alt="Purple background" />
</picture>
```

## Local Development

```bash
# Clone the repository
git clone https://github.com/omofon/Personal-Projects.git

# Navigate to project
cd "Frontend Mentor/faq-accordion-main"

# Open in browser
open index.html

# Or use a local server
npx serve
```

## Deployment

Deployed on Vercel with automatic deployments on push to main branch.

## Lessons & Improvements

**What went well:**
- Clean separation of concerns (HTML/CSS/JS)
- Accessibility-first approach paid off in implementation
- Tailwind layer system kept CSS organized

**What I'd improve:**
- Add smooth height transitions on expand/collapse
- Implement close-others-on-open behavior (accordion pattern)
- Add loading skeleton for better perceived performance

## Author

- GitHub - [@omofon](https://github.com/omofon)
- Frontend Mentor - [@omofon](https://www.frontendmentor.io/profile/omofon)

## Acknowledgments

Challenge by [Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-wyfFdeBwBz). Design specifications provided by Frontend Mentor.

---

**Note:** This is a learning project. Feedback and suggestions welcome via issues or pull requests.