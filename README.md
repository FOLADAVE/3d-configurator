Markdown
# Chronograph Series 01 — Interactive 3D Product Configurator

A high-performance, interactive 3D timepiece configurator built with **React**, **TypeScript**, **Three.js**, **React Three Fiber**, and **Zustand**. Designed with a declarative scene architecture, strict type safety, and real-time material customization.

![Project Preview](./public/preview.png)
*(Tip: Use the built-in **Export PNG** button in your running app, save the image as `public/preview.png`, and commit it so your GitHub repo displays a live hero render.)*

---

## Key Features

- **Declarative 3D Scene Graph:** Converted raw `.glb` assets into strongly-typed JSX components via `gltfjsx`, eliminating imperative scene traversal and preserving native PBR surface maps (carbon-fiber weave, metallic roughness, and physical glass).
- **Independent Multi-Part Customization:** Real-time material color swapping across separate mesh targets (`Band_Carbon_Fiber`, `Band_Plastic`, and `Bezel_Frame`) managed through a decoupled Zustand store.
- **Cinematic Camera Presets:** Smooth, frame-rate-independent camera damping (`THREE.MathUtils.damp`) that automatically frames the **Overview**, **Dial & Bezel**, or **Strap** on selection while yielding immediately to manual `OrbitControls` interaction.
- **Dynamic Pricing & Studio HUD:** Responsive glassmorphism overlay featuring live finish-based price calculation, one-click configuration reset, and high-resolution WebGL canvas PNG export.
- **Strict TypeScript Compliance:** Built with `verbatimModuleSyntax` enabled and zero `any` types across 3D scene references, store actions, and UI components.

---

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **3D Engine & Helpers:** Three.js, `@react-three/fiber`, `@react-three/drei`, `three-stdlib`
- **State Management:** Zustand
- **Styling:** Tailwind CSS

---

## Project Architecture

```text
src/
├── components/
│   └── CameraRig.tsx            # Frame-rate-independent camera presets & PNG snapshot trigger
├── store/
│   └── useConfiguratorStore.ts  # Typed Zustand store for finishes, camera views, and pricing
├── Product.tsx                  # Declarative, strictly-typed 3D watch component (gltfjsx)
├── App.tsx                      # WebGL Canvas, studio lighting Stage, and floating HUD
└── main.tsx                     # Application entry point
Getting Started
Prerequisites
Node.js (v18 or higher)

npm

Installation & Local Development
Clone the repository:

Bash
git clone [https://github.com/FOLADAVE/3d-watch-configurator.git](https://github.com/FOLADAVE/3d-watch-configurator.git)
cd 3d-watch-configurator
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Build for production:

Bash
npm run build
3D Asset Attribution
Model: Khronos Group 3D Commerce Chronograph Watch (product.glb)

Author
Folarin Obajenihi

Portfolio: folarin-obajenihi.vercel.app

GitHub: @FOLADAVE