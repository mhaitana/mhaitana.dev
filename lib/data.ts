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
    title: "Senior Software Engineer",
    achievements: [
      "Engineering high-visibility, premium customer-facing web surfaces and listing experiences using React 18/19 and Next.js 15.",
      "Collaborating closely with design, product, and cross-functional teams to design scalable platform architectures and ensure visual excellence.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL"],
  },
  {
    company: "Domain",
    companyUrl: "https://www.domain.com.au",
    type: "Full-time",
    location: "Melbourne, Victoria, Australia · Hybrid",
    period: "Feb 2020 - Aug 2025",
    duration: "5 years 7 months",
    title: "Senior Software Engineer",
    achievements: [
      "Architected and maintained a multi-client GraphQL BFF (Apollo Server 4 / Express / Next.js) serving web, iOS, and Android clients simultaneously, implementing field-level authorization directives and OpenAPI-to-TypeScript codegen to eliminate contract drift.",
      "Led cross-platform delivery of real-time agent productivity products, establishing unified type-safe codegen pipelines, visual regression testing (Percy), snapshot testing (Roborazzi), and 80%+ coverage gates.",
      "Designed and maintained two composable design system monorepos (using Lerna and Changesets) supplying 30+ React component packages with sub-path exports and Emotion CSS-in-JS design tokens, consumed across multiple internal products.",
      "Owned end-to-end CI/CD for a suite of containerized Node.js services on AWS ECS Fargate, authoring multi-stage Dockerfiles, Jenkins pipelines (covering unit, integration, and schema checks), and AWS CDK deployments with per-PR preview environments.",
      "Promoted from Frontend Developer to Senior Engineer across four consecutive roles, leading frontend development for Agent Solutions and Realtime Agent products."
    ],
    technologies: ["React", "Node.js", "TypeScript", "GraphQL", "AWS", "Docker", "CDK", "Jenkins", "Lerna", "Cypress", "Jest"],
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
      "Built real-time auction and offer-management interfaces for real estate agents using React, Node.js, and WebSockets.",
      "Established foundational components and real-time state synchronization patterns adopted across broader platforms after company acquisition.",
    ],
    technologies: ["React", "Node.js", "JavaScript", "WebSockets", "CSS-in-JS"],
  },
  {
    company: "Future Golf",
    type: "Casual",
    location: "Remote",
    period: "Mar 2025 - Oct 2025",
    duration: "8 months",
    title: "Software Developer",
    achievements: [
      "Delivered full-stack features for a golf-tech platform on a casual contract basis.",
      "Improved deployment reliability and release cadence by setting up automated CI/CD pipelines.",
    ],
    technologies: ["React", "Node.js", "TypeScript", "CI/CD"],
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
      "Developed internal tooling and front-end systems for defence operations.",
      "Modelled operational processes, simulations, and interactive transit/logistics tools to inform capability decisions.",
    ],
    technologies: ["JavaScript", "Simulation", "Data Visualization", "Process Modelling"],
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
      "Developed leadership, discipline, and mission-focus alongside a technical career.",
    ],
    technologies: [],
  },
];

export const skillCategories = [
  {
    name: "Languages & Core",
    skills: [
      { name: "TypeScript / JavaScript", proficiency: 5 },
      { name: "Python", proficiency: 4 },
      { name: "GraphQL (SDL)", proficiency: 4 },
      { name: "HTML / CSS", proficiency: 5 },
      { name: "Shell Scripting (Bash/Zsh)", proficiency: 3 },
    ],
  },
  {
    name: "Frontend & Mobile",
    skills: [
      { name: "React / React 19", proficiency: 5 },
      { name: "Next.js (App Router)", proficiency: 5 },
      { name: "React Native / Expo", proficiency: 4 },
      { name: "Design Systems (Lerna/Changesets)", proficiency: 5 },
      { name: "Accessibility (WCAG AA)", proficiency: 5 },
    ],
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "Node.js (Express/BFF)", proficiency: 5 },
      { name: "AI Systems & LLM Integration", proficiency: 4 },
      { name: "Python (Django/FastAPI)", proficiency: 4 },
      { name: "Redis / BullMQ", proficiency: 4 },
      { name: "Databases (Postgres/DynamoDB/MongoDB)", proficiency: 4 },
    ],
  },
  {
    name: "Cloud, DevOps & Observability",
    skills: [
      { name: "AWS (ECS/Fargate/CDK)", proficiency: 4 },
      { name: "CI/CD (Jenkins/GitHub Actions)", proficiency: 5 },
      { name: "Docker / LocalStack", proficiency: 4 },
      { name: "APM (Elastic APM/Raygun)", proficiency: 4 },
      { name: "Testing (Playwright/Cypress/Jest)", proficiency: 5 },
    ],
  },
];


