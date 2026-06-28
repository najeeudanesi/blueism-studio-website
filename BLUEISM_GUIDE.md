# Bluesim Studio Website - Brand & Design Guide

## Overview
This is a complete, production-ready upgrade of your Bluesim Studio website built with **Next.js 16**, **Tailwind CSS v4**, **Framer Motion**, and following your detailed design specifications.

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | #F2F1EC | Primary background color |
| Foreground | #1A1A1A | Primary text color |
| Blue | #0000FF | Fully saturated accent, services section background, hover states |
| Brown | #7A5C44 | Secondary text, captions, subtle accents |
| Border | #E8E7E0 | Dividers and borders |

## Typography

- **Display/Headings**: Cormorant Garamond (400, 500, 600, 700 weights)
  - Hero: 80px on mobile, 96-120px on desktop
  - Section headers: 48-80px
  - Small headings: 24-32px

- **Body**: Geist Sans
  - Size: 15-16px
  - Line-height: 1.5-1.6 (relaxed)
  - All sentence case, no all-caps

## Page Sections

### 1. Navigation
- Fixed top bar with backdrop blur
- Logo left: "Bluesim Studio" in serif
- Links right: Work, Services, About, Contact
- Hover state: text turns blue (#0000FF)
- Mobile: Slide-in menu with hamburger toggle

### 2. Hero
- Split layout: Image (left) + Text (right)
- Image: Interior architecture with natural light
- Text: Large serif headline with blue accent on "Studio"
- Tagline: "Form follows feeling."
- Manifesto: One-line description of the studio

### 3. Services
- Full blue background (#0000FF) with white text
- Five disciplines listed large and spaced:
  - 3D Design
  - Interior Architecture
  - Product Design
  - Software
  - UI/UX
- No icons, no cards—pure typography

### 4. Selected Work
- 2-column grid (1 on mobile)
- Each project: image + title + discipline
- Hover: subtle 1.04x scale transform over 400ms
- Images dominate the layout

### 5. About
- Two-column layout with left-border accent
- Text: Studio philosophy about slowness and materiality
- Right side: Tall interior image with warm natural sidelight
- Small blue dot as left-border accent

### 6. Philosophy/Quote
- Full-width centered quote section
- Large italic serif quote
- Attribution: "— Bluesim Studio"
- Off-white background with generous margins

### 7. Footer/Contact
- "Let's work together" headline
- Contact email: hello@bluesimstudio.com
- Social links: Instagram, Behance (plain text, no icons)
- Location: Lagos, Nigeria · Remote
- Copyright notice

## Animations & Interactions

- **Scroll Reveals**: Fade-up animations on each section using Framer Motion
- **Image Hover**: Subtle scale transform (1.04x) over 400ms
- **Navigation Hover**: Instant color change to blue
- **No Loaders**: Clean, instant transitions
- **Respects prefers-reduced-motion**: Animations disabled for accessibility

## Mobile Responsiveness

- All sections adapt gracefully to mobile screens
- Grid layouts collapse to single column
- Navigation becomes slide-in menu
- Typography scales responsively
- Touch-friendly spacing and interactions

## Component Structure

```
app/
├── page.tsx (main entry point)
├── layout.tsx (global layout with fonts)
├── globals.css (Tailwind v4 config + colors)
└── components/
    ├── navigation.tsx (fixed header with mobile menu)
    ├── hero.tsx (split image + text layout)
    ├── services.tsx (blue services grid)
    ├── work.tsx (project grid)
    ├── about.tsx (two-column with image)
    ├── philosophy.tsx (centered quote)
    └── footer.tsx (contact + links)
```

## Customization

### Changing Colors
Edit `/app/globals.css` in the `:root` CSS variables section:
```css
--background: #F2F1EC;
--primary: #0000FF;
--secondary: #7A5C44;
```

### Updating Copy
Each component file contains the text content. Modify directly in the component.

### Adding Projects
Edit `/components/work.tsx` and add to the `projects` array:
```js
{
  title: 'Project Name',
  discipline: 'Discipline',
  image: 'https://unsplash.com/...',
}
```

### Changing Images
All images are from Unsplash with natural light criteria. Update the `image` URLs in each component to use your own images or choose different Unsplash photos.

## Performance Optimizations

- ✅ Next.js 16 with Turbopack (faster builds)
- ✅ Image optimization with Next.js Image component
- ✅ CSS-in-JS with Tailwind v4
- ✅ Framer Motion for GPU-accelerated animations
- ✅ Server Components by default, Client Components only where needed
- ✅ Prefers-reduced-motion support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome for Android)

## Deployment

The site is ready to deploy to Vercel with one click. No additional configuration needed.

```bash
# Local development
pnpm dev

# Production build
pnpm build
pnpm start
```

---

Built with Next.js, Tailwind CSS, and Framer Motion. All images from Unsplash.
