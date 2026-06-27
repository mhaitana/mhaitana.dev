export interface Experience {
  company: string;
  companyUrl?: string;
  type: string;
  location?: string;
  period: string;
  duration: string;
  title: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    company: "CoStar Group",
    companyUrl: "https://www.costargroup.com",
    type: "Full-time",
    location: "Melbourne, Victoria, Australia",
    period: "Aug 2025 - Present",
    duration: "11 months",
    title: "Senior Software Engineer, Domain Skylight",
    achievements: [
      "Engineering premium listing experiences for Domain Skylight",
      "Collaborating across design and product on high-visibility customer-facing surfaces",
    ],
    technologies: ["React", "TypeScript", "Node.js", "Next.js"],
  },
  {
    company: "Domain",
    companyUrl: "https://www.domain.com.au",
    type: "Full-time",
    location: "Melbourne, Victoria, Australia · Hybrid",
    period: "Feb 2020 - Aug 2025",
    duration: "5 years 7 months",
    title: "Senior Engineer / Senior Software Engineer / Frontend Developer",
    achievements: [
      "Promoted from Frontend Developer to Senior Engineer across four consecutive roles",
      "Led frontend development for Agent Solutions Platforms and Realtime Agent products",
      "Drove software deployment practices and release automation across multiple squads",
      "Mentored engineers and shipped real-time features used by thousands of agents",
    ],
    technologies: ["React", "Node.js", "TypeScript", "GraphQL", "AWS", "CI/CD"],
  },
  {
    company: "Real Time Agent",
    companyUrl: "https://www.realtimeagent.com.au",
    type: "Full-time",
    location: "Melbourne, Australia",
    period: "Aug 2018 - Feb 2020",
    duration: "1 year 7 months",
    title: "Frontend Developer",
    achievements: [
      "Built real-time auction and offer-management interfaces for real estate agents",
      "Established foundational component patterns adopted after Domain acquisition",
    ],
    technologies: ["React", "Node.js", "JavaScript", "WebSockets"],
  },
  {
    company: "Future Golf",
    type: "Casual",
    location: "Remote",
    period: "Mar 2025 - Oct 2025",
    duration: "8 months",
    title: "Software Developer",
    achievements: [
      "Delivered full-stack features for a golf-tech platform on a casual contract basis",
      "Improved deployment reliability and release cadence",
    ],
    technologies: ["Node.js", "React", "Software Deployment", "CI/CD"],
  },
  {
    company: "New Zealand Defence Force",
    companyUrl: "https://www.nzdf.mil.nz",
    type: "Full-time",
    location: "Wellington, New Zealand",
    period: "Nov 2015 - Jul 2018",
    duration: "2 years 9 months",
    title: "Developer / Simulation & Process Modeller",
    achievements: [
      "Developed internal tooling and front-end systems for defence operations",
      "Modelled operational processes and simulations to inform capability decisions",
    ],
    technologies: ["JavaScript", "Front-End Development", "Software Deployment", "Simulation"],
  },
  {
    company: "NZ Army",
    companyUrl: "https://www.nzdf.mil.nz/army",
    type: "Reserves",
    location: "Wellington, New Zealand",
    period: "Oct 2007 - Present",
    duration: "18 years 9 months",
    title: "Army Reservist",
    achievements: [
      "Developed leadership, discipline, and mission-focus alongside a technical career",
    ],
    technologies: [],
  },
];

export interface Project {
  title: string;
  slug: string;
  category: ("Web" | "Mobile" | "AI" | "Open Source" | "Backend" | "Personal")[];
  description: string;
  technologies: string[];
  architecture?: string;
  challenges?: string[];
  outcomes?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Realtime Agent Platform",
    slug: "realtime-agent",
    category: ["Web"],
    description:
      "A real-time offer, bidding, and auction platform used by real estate agents to manage property transactions during campaigns.",
    technologies: ["React", "TypeScript", "Node.js", "GraphQL", "WebSockets"],
    architecture:
      "Event-driven React SPA with a Node.js GraphQL API, real-time WebSocket updates, and AWS-hosted microservices.",
    challenges: [
      "Handling concurrent bids with sub-second consistency across hundreds of users",
      "Designing accessible, high-stakes interfaces usable under auction-room pressure",
    ],
    outcomes: [
      "Supported thousands of property campaigns across Australia",
      "Reduced agent transaction coordination time significantly",
    ],
    liveUrl: "https://www.realtimeagent.com.au",
  },
  {
    title: "Domain Agent Solutions",
    slug: "domain-agent-solutions",
    category: ["Web"],
    description:
      "A suite of tools empowering real estate agents to manage listings, campaigns, and client relationships at scale.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "AWS"],
    architecture:
      "Modular Next.js and React frontend platforms backed by Node.js services and design-system components.",
    challenges: [
      "Unifying multiple legacy agent products into cohesive platform experiences",
      "Scaling CI/CD and release automation across multiple squads",
    ],
    outcomes: [
      "Improved deployment frequency and reliability",
      "Streamlined agent workflows used daily across Domain's customer base",
    ],
    liveUrl: "https://www.domain.com.au",
  },
  {
    title: "Personal Portfolio",
    slug: "personal-portfolio",
    category: ["Personal", "Open Source"],
    description:
      "A fast, accessible, premium portfolio site built to showcase engineering experience, projects, and writing.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    architecture:
      "Static-first Next.js App Router with MDX content, semantic HTML, and minimal client JS.",
    challenges: [
      "Balancing premium motion with accessibility and reduced-motion preferences",
      "Achieving strong Lighthouse scores without a CDN in local development",
    ],
    outcomes: [
      "Lighthouse targets: 100 Performance, 100 Accessibility, 100 SEO, >98 Best Practices",
    ],
    githubUrl: "https://github.com/mhaitana/portfolio",
    liveUrl: "https://mhaitana.dev",
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", proficiency: 5 },
      { name: "TypeScript", proficiency: 5 },
      { name: "Next.js", proficiency: 4 },
      { name: "Tailwind CSS", proficiency: 5 },
      { name: "Accessibility (WCAG)", proficiency: 4 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", proficiency: 5 },
      { name: "GraphQL", proficiency: 4 },
      { name: "REST APIs", proficiency: 5 },
      { name: "PostgreSQL", proficiency: 3 },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS", proficiency: 3 },
      { name: "CI/CD", proficiency: 4 },
      { name: "Docker", proficiency: 3 },
      { name: "Vercel", proficiency: 4 },
    ],
  },
  {
    name: "Architecture & Practices",
    skills: [
      { name: "System Design", proficiency: 4 },
      { name: "Testing", proficiency: 4 },
      { name: "Code Review", proficiency: 5 },
      { name: "Mentoring", proficiency: 4 },
    ],
  },
];

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
}

export const articles: Article[] = [
  {
    slug: "building-accessible-react-components",
    title: "Building Accessible React Components That Scale",
    description:
      "Practical patterns for keyboard navigation, focus management, and screen-reader support in large React codebases.",
    publishedAt: "2025-06-10",
    readingTime: "8 min read",
  },
  {
    slug: "lessons-from-five-years-at-domain",
    title: "Lessons From Five Years at Domain",
    description:
      "What I learned shipping real-time products, growing from frontend developer to senior engineer, and enabling teams to move fast.",
    publishedAt: "2025-05-22",
    readingTime: "6 min read",
  },
  {
    slug: "deployment-automation-for-frontend-teams",
    title: "Deployment Automation for Frontend Teams",
    description:
      "How to design CI/CD pipelines that reduce release risk and give engineers confidence to ship multiple times per day.",
    publishedAt: "2025-04-08",
    readingTime: "7 min read",
  },
];
