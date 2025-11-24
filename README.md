# Monochrome Cyber Minimal Blog Prototype

A minimal, high-motion, accessible blog prototype built with React, Tailwind CSS, and Framer Motion.
Pivoted to a "Monochrome Cyber Minimal" aesthetic: strict black/white/gray palette, technical grids, and wireframe visuals.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Asset List

### Palette (Cyber Minimal)
- **Background**: `#000000` (Pure Black)
- **Panel**: `#0a0a0a`
- **Border**: `#333333`
- **Text**: `#888888` (Muted), `#ffffff` (Highlight)

### Fonts
- **Headings/UI**: [Outfit](https://fonts.google.com/specimen/Outfit) (Sans-serif)
- **Code/Meta**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Monospace)

### Icons
- [Lucide React](https://lucide.dev/)

## QA Checklist

1.  **Aesthetic Check**: Verify no neon colors remain. Only black, white, and grays.
2.  **Motion Sensitivity**: Verify `prefers-reduced-motion` disables tilt and parallax effects.
3.  **Keyboard Navigation**: Ensure all interactive elements (Nav links, PostCards, Close button) are focusable and have visible focus states.
4.  **Responsiveness**: Check layout on Mobile (375px), Tablet (768px), and Desktop (1440px).
5.  **Reading Mode**: Verify focus is trapped within the modal when open and body scroll is locked.

## Project Structure

```
.
├── index.html              # Entry point
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS config
├── tailwind.config.js      # Tailwind config (Cyber palette)
├── vite.config.js          # Vite config
└── src
    ├── App.jsx             # Main application logic & components
    ├── index.css           # Global styles & Cyber grid utilities
    └── main.jsx            # React root
```
