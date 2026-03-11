# Ritik Kumar - DevOps Engineer Portfolio

Welcome to my personal portfolio! This project showcases my skills, experience, and passion as a DevOps Engineer specializing in modern Web Architecture, Networking, and System Design.

## 🚀 Live Preview

_https://ritikkumar.dev_

---

## 🚀 Recent Enhancements & Fixes

- **Performance**: Eliminated lag on mobile devices (it still might lag a little lol).
- **UI Improvements**: Fixed navigation bar visibility and scaled the Music Player widget for mobile screens.
- **Infrastructure & Deployment**:
  - Containerized the application using Docker (`Dockerfile`, `docker-compose.yml`).
  - Configured a secure Cloudflare Tunnel to expose the Dockerized app routing, seamlessly resolving 502 Bad Gateway and DNS conflicts.

---

## 🛠️ Tech Stack

This project is built using modern web technologies :

- **Framework**: Next.js
- **Library**: React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & OGL(for 3D webGL backgrounds)
- **Icons**: Lucide React (used in custom Music Player & UI)
- **Email Service**: EmailJS (for direct contact form delivery)
- **Audio**: HTML5 `<audio>` API (for background music playback)
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Routing & Exposure**: Cloudflare Tunnel

---

## 📂 Project Structure

The project has a clean structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline for automated homelab deployment
├── Dockerfile            # Multi-stage build definition for containerization
├── docker-compose.yml    # Orchestration configuration for local & server environments
├── src/
│   ├── app/              # Next.js App Router layout and pages
│   │   ├── favicon.ico
│   │   ├── globals.css   # Global styles and Tailwind directives
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main Portfolio Landing Page
│   │
│   ├── components/       # Reusable UI components
│   │   ├── portfolio/    # Section-specific components
│   │   │   ├── Background.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── index.ts
│   │   │   ├── MusicSection.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── OverviewSection.tsx
│   │   │   └── TypewriterRole.tsx
│   │   │
│   │   ├── ui/           # Generic/Shared UI elements
│   │   │   └── 3d-card.tsx
│   │   │
│   │   ├── AnimatedBackground.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   │
│   └── lib/              # Utility functions
│       └── utils.ts
```

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ritikkumar27/portfolio_v2.git
   cd portfolio_v2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **View in the browser:**
   Open [http://localhost:3000](http://localhost:3000) to see the result. The page will auto-update as you edit files.

---

## 🎨 Design & Features

- **Dynamic Backgrounds & 3D Elements:** cool backgrounds using WebGL/OGL and `framer-motion`.
- **Responsive Layout:** visually appealing on all device sizes.
- **Typewriter Effects:** Smooth, performant text animations in the Hero section.
- **Interactive Music Player:** A sleek, minimal music widget with play/pause, seek functionality, and continuous playback.
- **Contact Form Delivery:** email service with EJS templating for direct mail functionality.
- **Expandable Content:** Overview and upcoming Blog sections for detailed insights and updates.

---

_Built with ❤️ by Ritik Kumar._
