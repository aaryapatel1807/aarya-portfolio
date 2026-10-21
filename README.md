# Aarya's Portfolio

Interactive scroll-driven portfolio inspired by jameschugh.com mechanics.

## 🎯 Features

### ✅ Implemented
- **3D Hero Fly-In** - Scroll-triggered scale + depth animation
- **Timeline Journey** - 6-stop scrollable journey with dynamic card updates
- **Smooth Scroll** - Lenis momentum-based scrolling
- **Bottom Pill Navigation** - Section highlighting on scroll
- **Keyboard Shortcuts** - G (GitHub), L (LinkedIn), M (Mail), I (Instagram), R (Resume)
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Dark Mode Support** - System preference detection

### 🚧 Coming Soon
- Project Card Deck with swipe interaction
- Stack Unwrap animation with hover tooltips
- Draggable notes/collage elements
- Notes wall with backend
- Day/night theme toggle button
- Performance optimizations

## 🚀 Quick Start

### Install Dependencies
```bash
cd aarya-portfolio
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP 3.12.5 + Lenis 1.0.42
- **Scroll:** ScrollTrigger plugin

## 📂 Project Structure

```
aarya-portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles + Lenis config
├── components/
│   ├── Hero.tsx            # 3D fly-in hero section
│   ├── TimelineJourney.tsx # Scroll-driven timeline
│   ├── BottomNav.tsx       # Fixed bottom navigation
│   └── KeyboardShortcuts.tsx # Global keyboard listeners
├── lib/
│   └── scroll.ts           # Lenis + GSAP setup
└── public/
    └── (assets)
```

## ⌨️ Keyboard Shortcuts

Press these keys anywhere on the page:

- **G** → GitHub profile
- **L** → LinkedIn profile
- **M** → Email
- **I** → Instagram
- **R** → Download resume

## 🎨 Customization

### Update Your Content

**Hero Section** (`components/Hero.tsx`):
- Line 30-32: Change name and tagline
- Line 40: Update project names

**Timeline** (`components/TimelineJourney.tsx`):
- Lines 10-37: Edit your timeline stops

**Contact Links** (`components/KeyboardShortcuts.tsx`):
- Lines 6-10: Update your social/profile URLs

**Projects** (`app/page.tsx`):
- Lines 50-59: Add your project details

### Adjust Animation Values

**Hero Fly-In** (`components/Hero.tsx`, lines 21-34):
```typescript
// Tweak these values:
scale: 0.7,     // Start size (try 0.6-0.9)
z: -300,        // Start depth (try -200 to -500)
end: "bottom 60%", // Scroll distance
```

**Timeline Scroll** (`components/TimelineJourney.tsx`, line 50):
```typescript
// Change stops array length to adjust timeline length
```

## 🔧 Configuration

### Smooth Scroll Settings
Edit `lib/scroll.ts` (lines 15-22):
```typescript
duration: 1.2,     // Smoothing duration (0.8-2.0)
easing: (t) => ... // Easing function
smoothTouch: false // Mobile touch smoothing
```

### Theme Colors
Edit `app/globals.css` (lines 5-24):
```css
--background: #ffffff;
--foreground: #0a0a0a;
--accent: #0066cc;
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🐛 Troubleshooting

### Scroll not smooth?
- Check browser DevTools console for errors
- Ensure `initSmoothScroll()` runs only once
- Clear browser cache

### Animations not triggering?
- Enable ScrollTrigger markers: `markers: true` in GSAP config
- Check element refs are properly connected
- Verify sections have proper IDs

### TypeScript errors?
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` paths configuration

## 📊 Performance

Target metrics:
- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Scroll animations at 60fps
- [ ] Cumulative Layout Shift < 0.1

## 🎓 Based On

This portfolio uses scroll mechanics analyzed from jameschugh.com:
- See `../rea-jameschugh/extraction/` for full analysis
- Implementation spec: `07-implementation-spec.md`

**What's copied:** Scroll mechanics and interaction patterns
**What's NOT copied:** Design, copy, images, personal content

## 📝 License

MIT - Feel free to use as inspiration for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but suggestions welcome:
1. Fork the repo
2. Create your feature branch
3. Submit a PR with description

---

**Built with:** Next.js + GSAP + Lenis  
**Inspired by:** Modern scroll-driven storytelling  
**Status:** Phase 1 Complete (Structure + Core Scroll)
