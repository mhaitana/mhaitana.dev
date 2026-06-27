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

