export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: string;
  categoryColor: string;
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "portfolio-v2",
    number: "01",
    title: "Portfolio v2",
    description:
      "This site — a personal portfolio built with Next.js 14, Tailwind CSS, and Framer Motion. Fully self-hosted via Cloudflare Tunnels on a home server with zero cold starts.",
    longDescription:
      "Designed from scratch with a focus on micro-interactions and performance. Features a dark/light mode toggle, a floating Nujabes music player, a guestbook backed by a Postgres database, and smooth scroll-triggered animations throughout.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Cloudflare", "Docker"],
    category: "Web App",
    categoryColor: "blue",
    github: "https://github.com/ritikkumar27/portfolio_v2",
    live: "https://ritikkumar.dev",
    featured: true,
  },
  {
    id: "backend-blog",
    number: "02",
    title: "Backend-Heavy Blog",
    description:
      "A full-featured blogging platform at blog.ritikkumar.dev. Built with NestJS for the backend, Drizzle ORM, PostgreSQL, and Handlebars for server-side rendering.",
    tags: ["NestJS", "Drizzle ORM", "PostgreSQL", "Handlebars", "TypeScript"],
    category: "Web App",
    categoryColor: "indigo",
    github: "https://github.com/ritikkumar27/blog",
    live: "https://blog.ritikkumar.dev",
  },
  {
    id: "home-server",
    number: "03",
    title: "Home Server Stack",
    description:
      "A self-hosted infrastructure layer running on bare metal Linux. Manages reverse proxying via Caddy, secure zero-trust tunnels through Cloudflare, and multi-container apps with Docker Compose.",
    tags: ["Linux", "Docker", "Caddy", "Cloudflare Tunnels", "CachyOS"],
    category: "Infrastructure",
    categoryColor: "emerald",
  },
  {
    id: "local-ai",
    number: "04",
    title: "Local AI Node",
    description:
      "A fully offline AI stack running on the home server. Ollama serves local LLMs, exposed through Open WebUI — no external API calls, no telemetry, full control.",
    tags: ["Ollama", "Open WebUI", "Docker", "Linux", "LLMs"],
    category: "Local AI",
    categoryColor: "purple",
  },
  {
    id: "aws-deployment",
    number: "05",
    title: "AWS Blog Deployment",
    description:
      "CI/CD pipeline that deploys the NestJS blog to AWS EC2 on every push to main. GitHub Actions handles migrations with Drizzle and zero-downtime restarts via PM2.",
    tags: ["AWS EC2", "GitHub Actions", "Supabase", "PM2", "Drizzle"],
    category: "DevOps",
    categoryColor: "orange",
  },
];
