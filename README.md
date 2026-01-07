# Stephy Longueira - DJ & Artist Portfolio

An ultra-modern, fast, responsive, and sleek portfolio website for DJ/Artist Stephy Longueira.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: Lexend Tera (Google Fonts)

## Features

- 🎨 Modern dark theme with accent colors (pink/cyan gradient)
- ⚡ Fast performance with Next.js optimizations
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🖼️ Scroll-synchronized image carousel
- 📅 Upcoming shows section
- 🖼️ Filterable gallery with lightbox
- 📍 Featured venues showcase
- 📬 Contact form with validation

## Pages

- **Home**: Hero section, scroll carousel, upcoming shows
- **About**: Artist biography, journey timeline, music style
- **Gallery**: Filterable image gallery with lightbox
- **Featured Venues**: Showcase of notable performance venues
- **Contact**: Contact form and social links

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The development server runs at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── venues/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── components/
    ├── Navigation.tsx
    ├── Footer.tsx
    ├── Hero.tsx
    ├── ScrollCarousel.tsx
    ├── UpcomingShows.tsx
    └── index.ts
```

## Customization

### Adding Images

Replace the placeholder divs in components with actual `<Image>` components from `next/image`:

```tsx
import Image from "next/image";

// Replace placeholder with:
<Image
  src="/images/your-image.jpg"
  alt="Description"
  fill
  className="object-cover"
/>
```

### Updating Content

- **Shows**: Edit `upcomingShows` array in `src/components/UpcomingShows.tsx`
- **Venues**: Edit `featuredVenues` array in `src/app/venues/page.tsx`
- **Gallery**: Edit `galleryImages` array in `src/app/gallery/page.tsx`
- **Social Links**: Edit `socialLinks` arrays in Footer and Contact components

### Color Scheme

Colors are defined as CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #0a0a0a;
  --foreground: #f5f5f5;
  --accent: #ff3366;        /* Pink */
  --accent-secondary: #00d4ff; /* Cyan */
  --muted: #1a1a1a;
  --muted-foreground: #888888;
  --border: #2a2a2a;
}
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm start
```

## License

All rights reserved © Stephy Longueira
