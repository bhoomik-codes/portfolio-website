# 🚀 Bhoomik Sevta's Portfolio

A high-performance, visually immersive portfolio website showcasing my work as an AI-ML Developer and Full-Stack Engineer. Built with **Next.js**, **React Three Fiber**, and **Framer Motion**, this project combines modern 3D rendering with a sleek, neon-glass aesthetic.

## 🎨 Color Scheme & Design System

The project strictly follows a **"Deep Abyss + Neon Glass"** aesthetic, blending deep, dark backgrounds with vibrant, glowing neon accents to create a futuristic and highly engaging user interface.

- **Backgrounds:** `#080B14` (Deep Primary), `#0F1220` (Secondary), `#141828` (Tertiary).
- **Glassmorphism:** `rgba(20, 24, 40, 0.55)` paired with a `blur(16px)` backdrop filter and subtle `rgba(94, 92, 230, 0.25)` borders.
- **Accents:** 
  - Neon Blue (`#5E5CE6`)
  - Neon Purple (`#A358DF`)
  - Neon Green (`#39FF14`)
  - Neon Teal (`#00E5CC`)
  - Neon Orange (`#FF8C00`)
- **Text & Typography:** `#F8F8F2` (Primary Off-White), `#A8A8B3` (Secondary Grey), `#6B6B7B` (Muted). 
- **Fonts:** `Space Grotesk` (Headings), `Inter` (Body), `JetBrains Mono` (Labels & Code).
- **Gradients:** A core hero gradient combining Neon Blue, Purple, and Teal (`linear-gradient(135deg, #5E5CE6 0%, #A358DF 50%, #00E5CC 100%)`).

## 🧱 Presentation Structures

The portfolio uses several dynamic and interactive UI structures to present data efficiently:

1. **Interactive Image Carousels:** Project cards with multiple screenshots utilize an inline carousel. Users can seamlessly click through images using next/prev buttons and tracking dots.
2. **Markdown Modal Overlays:** Clicking on a project dynamically fetches its individual `README.md` and renders it cleanly inside a glassmorphic modal overlay using `react-markdown`.
3. **Filterable Project Grid:** A responsive masonry-style grid categorizes projects (AI/ML, Full-Stack, Web Dev, Tools) allowing users to instantly sort projects.
4. **Floating 3D Scene:** The "About Me" section embeds a live 3D Canvas utilizing `@react-three/fiber` featuring a custom-built robot that tracks the user's mouse position on the screen, surrounded by glowing rings and floating orbs.
5. **Glassmorphic Cards:** Elements throughout the site utilize glass cards with multi-layered neon drop-shadows to distinguish content from the deep background.

## ✨ Animations & Interactions

Smooth transitions and micro-interactions are woven deeply into the experience:

- **Framer Motion Elements:** 
  - Uses `AnimatePresence` for smooth layout pops when filtering the project grid and fading in/out the Markdown modal.
  - Viewport-triggered scroll animations (`whileInView`) to elegantly slide in text, cards, and images as the user scrolls.
  - Hover states (`whileHover`) that scale cards and buttons up while intensifying their neon box-shadows.
- **CSS Keyframes:** Used for continuous, lightweight animations like the drifting background ambient orbs, the rotating dashed image frame, and the blinking typewriter cursor.
- **Typing Effect:** A custom React hook effect in the Hero section that continuously types and deletes my various professional roles.
- **3D Render Loop:** `useFrame` is utilized within the Three.js canvas to independently animate the robot's glowing chest plate, floating orbs, and ring rotations.
- **Custom Mouse Cursor:** The default cursor is hidden and replaced by a custom dot-and-ring SVG cursor that expands dynamically when hovering over clickable elements.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React 18
- **Styling:** CSS Modules with extensive CSS variables and flexbox/grid layouts.
- **3D Engine:** Three.js, React Three Fiber, React Three Drei
- **Animations:** Framer Motion
- **Markdown:** React-Markdown
- **Deployment:** PM2 running on Oracle Cloud Infrastructure behind a Caddy reverse proxy.
