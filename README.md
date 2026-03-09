# Ritik Kumar - DevOps Engineer Portfolio

Welcome to my personal portfolio! This project showcases my skills, experience, and passion as a DevOps Engineer specializing in modern Web Architecture, Networking, and System Design.

## 🚀 Live Preview

_(Add your live URL here once deployed, e.g., https://ritikkumar.dev)_

---

## 🛠️ Tech Stack

This project is built using modern web technologies :

- **Framework**: [Next.js]
- **Library**: [React]
- **Styling**: [Tailwind CSS]
- **Animations**: [Framer Motion] & [OGL](for 3D webGL backgrounds)

---

## 📂 Project Structure

The project has a clean and modular structure focusing on reusability and scalability:

```text
src/
├── app/                  # Next.js App Router layout and pages
│   ├── globals.css       # Global styles and Tailwind directives
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main Portfolio Landing Page
│
├── components/           # Reusable UI components
│   ├── portfolio/        # Section-specific components
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── Background.tsx
│   │   └── TypewriterRole.tsx
│   │
│   ├── ui/               # Generic/Shared UI elements
│   │   └── 3d-card.tsx
│   │
│   ├── PostHogProvider.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
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

- **Dynamic Backgrounds & 3D Elements:** Engaging interactive backgrounds using WebGL/OGL and `framer-motion`.
- **Responsive Layout:** fully functional and visually appealing on all device sizes.
- **Dark/Light Mode:** Seamless theme toggling to accommodate user preferences.
- **Typewriter Effects:** Smooth, performant text animations in the Hero section.

---

## 📝 License

This project is for personal use and showcasing work. Any third-party libraries used are under their respective licenses.

---

_Built with ❤️ by Ritik Kumar._
