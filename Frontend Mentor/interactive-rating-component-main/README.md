# Interactive Rating Component

A responsive rating widget that allows users to submit feedback scores from 1-5, built as a Frontend Mentor challenge.

## Live Demo

**[View Live Site](https://ratings-ten.vercel.app/)** | **[View Code](https://github.com/omofon/Personal-Projects/tree/21c45f62843447e5ec778420d61ccb47116a5bde/Frontend%20Mentor/interactive-rating-component-main)**

## Features

- Fully responsive design (mobile-first approach)
- Accessible rating selection using ARIA radiogroup pattern
- Smooth state transitions between rating and thank you views
- Hover and active states for interactive elements
- Submit button enabled only when rating is selected

## Tech Stack

- **HTML5** - Semantic markup with accessibility considerations
- **Tailwind CSS** - Utility-first styling with custom theme configuration
- **Vanilla JavaScript** - DOM manipulation and event handling
- **Vercel** - Deployment platform

## Project Structure

```
├── images/              # SVG icons and design assets
├── script/
│   └── index.js        # Rating logic and UI state management
├── src/
│   ├── style.css       # Tailwind configuration and custom styles
│   └── output.css      # Compiled Tailwind output
└── index.html          # Main application markup
```

## Key Implementation Details

### State Management
The component manages two view states (rating form and thank you message) using a simple show/hide pattern controlled by the `hidden` attribute.

### Accessibility
- Semantic HTML with proper ARIA roles (`radiogroup`, `radio`)
- `aria-checked` states updated dynamically
- Keyboard navigation support through native button elements
- Disabled state clearly indicated on submit button

### UI Logic
- Submit button remains disabled until user selects a rating
- Selected rating button receives visual feedback via `.active` class
- Previous selection automatically cleared when new rating selected
- Rating value persisted and displayed in thank you state

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. No build step required for basic usage

For Tailwind development:
```bash
# Compile Tailwind changes
npx tailwindcss -i ./src/style.css -o ./src/output.css --watch
```

## Design Credits

Challenge design by [Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI)

## Potential Enhancements

If this were a production component, consider adding:
- API integration to persist ratings to a backend
- Loading states during submission
- Error handling and retry logic
- Analytics tracking
- Support for keyboard-only navigation (arrow keys for rating selection)
- Animation transitions between states
- Multiple rating scales (e.g., 1-10, emoji-based)
- Reusable as a framework component (React, Vue, etc.)

---

**Built by** [Omofon](https://github.com/omofon)