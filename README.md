# Oculomics AI — Retinal Health Platform

### From Scratch to Production: Complete Project Documentation

## Project Overview

**Oculomics** is a healthcare AI platform that uses retinal imaging to detect systemic diseases — cardiovascular disease, stroke, Alzheimer's, diabetes, glaucoma, and hypertension — from a single non-invasive eye scan.

This project is a **full redesign of the Oculomics landing page**, transforming it from a product catalog into a compelling, interactive AI-first healthcare narrative targeted at clinicians and healthcare partners.

## Problem Statement

The original web presence was:
- Functionally heavy, visually dated
- Felt like a product catalog, not a medical AI platform
- Did not communicate the "futuristic, life-saving, AI-first" nature of Oculomics
- Failed to establish immediate trust with clinicians

**Goal:** Redesign the landing page into an interactive narrative that makes the Oculomics concept intuitive and builds clinical credibility instantly.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.2.0 | UI component framework |
| **React DOM** | 18.2.0 | DOM rendering |
| **React Scripts** | 5.0.1 | Build toolchain (CRA) |
| **Google Fonts** | CDN | Typography — Syne + DM Sans |
| **CSS-in-JS** | Native | Styles via template literals |
| **IntersectionObserver** | Browser API | Scroll-triggered animations |

> **Zero external UI libraries.** No Tailwind, no Material UI, no Bootstrap. Pure React + CSS.

---

## Libraries to Install

### Step 1 — Install Node.js (Required)

Download from [nodejs.org](https://nodejs.org) → choose **LTS version**

Verify installation:
```bash
node -v    # Should show v18.x or higher
npm -v     # Should show 9.x or higher
```

### Step 2 — Create React App (Installs Everything Automatically)

```bash
npx create-react-app oculomics-landing
```

This single command installs all required packages:

| Package | What It Does |
|---|---|
| `react` | Core React library — components, hooks, JSX |
| `react-dom` | Renders React components into the browser DOM |
| `react-scripts` | Webpack, Babel, ESLint, dev server — all preconfigured |
| `web-vitals` | Performance measurement (included by CRA) |

### Step 3 — Navigate Into Project

```bash
cd oculomics-landing
npm start
```

> 💡 No additional `npm install` commands needed. `create-react-app` handles everything.

---

## 🗂️ Project Structure

```
oculomics-landing/
│
├── public/
│   └── index.html              ← HTML shell — single div#root
│
├── src/
│   ├── App.js                  ← Root component, imports OculomicsLanding
│   ├── index.js                ← ReactDOM.createRoot entry point
│   ├── index.css               ← Global reset (intentionally empty)
│   └── OculomicsLanding.jsx    ← 🌟 Main landing page (all logic + styles)
│
├── package.json                ← Dependencies and scripts
└── README.md                   ← This file
```

---

## 🚀 Running the Project — Step by Step

### 1. Extract the ZIP

Unzip `oculomics-landing.zip` to your preferred folder.

### 2. Open in VS Code

```bash
code oculomics-landing
```

Or: File → Open Folder → select `oculomics-landing`

### 3. Open the Terminal

`Ctrl + `` ` `` ` (backtick) or View → Terminal

### 4. Install Dependencies

```bash
npm install
```

This reads `package.json` and installs all packages into `node_modules/`.

### 5. Start the Dev Server

```bash
npm start
```

✅ Opens automatically at: **http://localhost:3000**

Hot reload is enabled — any file save instantly updates the browser.

---

## 🏗️ Architecture & Key Implementation Decisions

### Component Design

The entire landing page lives in one self-contained component: `OculomicsLanding.jsx`

```
OculomicsLanding
├── <style>         ← All CSS injected via template literal
├── <nav>           ← Fixed navigation with scroll-to anchors
├── Hero Section    ← Animated rings, badge, headline, stats
├── Retina Visual   ← Animated eye with AI markers + scan line
├── Conditions Grid ← 6 interactive disease cards (useState)
├── How It Works    ← 4-step workflow strip
├── Trust Section   ← Clinical evidence + animated progress bars
├── CTA Section     ← Call-to-action with dual buttons
└── Footer          ← Compliance badges
```

### React Hooks Used

| Hook | Where | Why |
|---|---|---|
| `useState` | Conditions grid | Track which card is active/clicked |
| `useEffect` | Trust section | Set up IntersectionObserver on mount |
| `useRef` | Trust section | Reference the DOM element to observe |

### CSS Architecture

- All styles in a single `<style>` tag via template literal at the top of the file
- CSS custom properties (`--accent`, `--bg`, etc.) for consistent theming
- `clamp()` for fluid responsive typography
- CSS Grid with responsive breakpoints at 900px
- `animation-delay` for staggered entry animations
- `IntersectionObserver` triggers class changes for scroll-in animations

---

## Design System

### Color Palette

| Variable | Value | Usage |
|---|---|---|
| `--bg` | `#040b14` | Page background |
| `--surface` | `#071525` | Card backgrounds |
| `--accent` | `#00c8ff` | Primary cyan — CTAs, highlights |
| `--accent2` | `#00ff99` | Secondary green — accuracy figures |
| `--accent3` | `#ff6b35` | Tertiary orange (optic disc) |
| `--text` | `#e8f4ff` | Primary body text |
| `--text-muted` | `#7a9ab8` | Secondary/description text |

### Typography

| Font | Weight | Usage |
|---|---|---|
| **Syne** | 700, 800 | Headlines, numbers, labels |
| **DM Sans** | 300, 400, 500 | Body text, descriptions |

### Design Rationale

- **Dark theme** — mirrors clinical software (PACS, MRI viewers). Reduces eye strain. Signals precision.
- **Cyan accents** — associated with medical imaging and technology. Creates trust.
- **Concentric rings** in hero — subliminally echoes a retinal scan / optic disc anatomy.
- **Animated scan line** on retina visual — makes the AI process tangible and real-time.

---

## Page Sections Breakdown

### 1. Navigation
- Fixed top bar with blur backdrop
- Logo + 4 anchor links + CTA button
- Collapses on mobile (links hidden under 900px)

### 2. Hero
- Animated concentric retinal rings (CSS `@keyframes`)
- Staggered `fadeUp` entrance for badge, title, subtitle, CTAs, stats
- 4 key metrics: 97% accuracy, 6 diseases, 3M+ training images, 90s turnaround

### 3. Retina Visualization
- Simulated fundus eye with CSS radial gradients
- Optic disc glow effect
- Sweeping scan line animation
- AI detection markers with pulse animation + labels
- Left column: product benefits checklist

### 4. Conditions Grid (Interactive)
- 6 disease cards mapped from data array
- `onClick` toggles `activeCard` state
- Each card: icon, name, description, accuracy percentage
- Hover: border glow + card lift

### 5. How It Works
- 4-step workflow: Capture → AI Analysis → Risk Report → EHR Integration
- Horizontal connector line via CSS `::before` pseudo-element

### 6. Trust & Research
- 4 trust items: FDA, Nature Medicine, HIPAA, Deployment scale
- Animated stat bars using `IntersectionObserver` — bars animate from 0% to target on scroll-enter

### 7. CTA
- Dual CTA: "Request Demo" + "Download Clinical Brief"
- Radial glow background for visual emphasis

### 8. Footer
- Logo, copyright, compliance badges, links

---

## Deployment — From Dev to Production

### Option A: Vercel (Recommended — Free)

```bash
npm install -g vercel
vercel
```

Follow prompts → live URL in 60 seconds.

### Option B: Netlify (Drag & Drop)

```bash
npm run build
```

Go to [netlify.com](https://netlify.com) → drag the `build/` folder onto the dashboard.

### Option C: GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/oculomics-landing",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

### Production Build

```bash
npm run build
```

Creates an optimized `build/` folder:
- Minified JS and CSS
- Hashed filenames for cache busting
- Tree-shaken bundle
- Production-ready static files

---

## Recommended VS Code Extensions

Install via `Ctrl+Shift+X`:

| Extension | Publisher | Purpose |
|---|---|---|
| **ES7+ React/Redux/React-Native snippets** | dsznajder | React shortcuts (`rafce`, `useState`) |
| **Prettier - Code formatter** | Prettier | Auto-format JSX on save |
| **Auto Rename Tag** | Jun Han | Rename open/close JSX tags together |
| **Bracket Pair Colorizer** | CoenraadS | Color-coded bracket matching |
| **GitLens** | GitKraken | Enhanced Git history in editor |

---

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `Cannot find module './OculomicsLanding'` | Wrong filename or location | Ensure file is `src/OculomicsLanding.jsx` |
| `React is not defined` | Missing import | Add `import React from 'react';` at top |
| Fonts not loading | No internet | Check connection — Google Fonts loads via CDN |
| Port 3000 in use | Another server running | `npm start -- --port 3001` |
| `node_modules not found` | Skipped install | Run `npm install` first |
| Blank white screen | JS error in console | Open DevTools (`F12`) → Console tab |

---

## Future Enhancements (Production Roadmap)

| Feature | Priority | Notes |
|---|---|---|
| React Router — multi-page | High | Add `/platform`, `/research`, `/contact` routes |
| CMS Integration | High | Move conditions/stats data to Contentful or Sanity |
| Demo Request Form | High | Modal with email capture + Mailchimp integration |
| WebGL Retina Shader | Medium | Real fundus photo with GLSL scan-line overlay |
| GSAP ScrollTrigger | Medium | Cinematic narrative scroll animations |
| i18n (Multi-language) | Medium | `react-i18next` for global clinic deployment |
| A/B Testing | Medium | Test hero headlines with Split.io |
| Accessibility Audit | High | `axe-core`, WCAG 2.1 AA compliance |
| Unit Tests | Medium | Jest + React Testing Library |
| Analytics | High | Google Analytics 4 + Hotjar heatmaps |

---

## Performance Targets (Post-Production)

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | > 90 | Chrome DevTools |
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Core Web Vitals |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Bundle Size | < 150KB gzipped | `source-map-explorer` |

---

##  Author

Built as a frontend assessment project demonstrating:
- React functional components with hooks
- CSS animation systems without external libraries
- Medical-AI UX design for clinical audiences
- Scroll-triggered interactions via IntersectionObserver
- Component-driven architecture with data-mapped UI

---

*Oculomics Health AI · CE Mark · FDA Breakthrough Device Designation*

Note: 

1) In this attachment, i dont have any Figma file, so  I took guidance from youtube tutorial, Figma support, and my existing project knowledge. Based on this, I created this task, logic building, and image format are all my findings
2) i dont use any AI tool for creating this project. except the readme file for grammar mistakes, alignment purpose
