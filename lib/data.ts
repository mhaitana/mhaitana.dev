/** Calendar-month dates preserve the precision of the original career history. */
export type YearMonth = `${number}-${number}`;

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthIndex(value: YearMonth): number {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) throw new RangeError(`Invalid career date: ${value}`);
  return Number(match[1]) * 12 + Number(match[2]) - 1;
}

export function formatMonth(value: YearMonth): string {
  const index = monthIndex(value);
  return `${monthNames[index % 12]} ${Math.floor(index / 12)}`;
}

export function formatExperiencePeriod(startDate: YearMonth, endDate: YearMonth | null): string {
  return `${formatMonth(startDate)} – ${endDate ? formatMonth(endDate) : "Present"}`;
}

/** Inclusive months match the original published durations for completed roles. */
export function formatExperienceDuration(
  startDate: YearMonth,
  endDate: YearMonth | null,
  asOf: Date = new Date(),
): string {
  const end = endDate
    ? monthIndex(endDate)
    : asOf.getUTCFullYear() * 12 + asOf.getUTCMonth();
  const months = Math.max(0, end - monthIndex(startDate) + 1);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return [
    years ? `${years} ${years === 1 ? "year" : "years"}` : "",
    remainingMonths || !years
      ? `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`
      : "",
  ].filter(Boolean).join(" ");
}

export const profile = {
  name: "Matt Haitana",
  role: "Senior Software Engineer",
  location: "Melbourne, Australia",
  email: "mhaitana@gmail.com",
  website: "https://mhaitana.dev",
  github: "https://github.com/mhaitana",
  linkedin: "https://www.linkedin.com/in/mhaitana/",
  lead: "I build product platforms, shared APIs and the systems that help teams deliver them.",
  summary: "Senior software engineer with over a decade of experience across property technology and defence. Work spans customer-facing applications, multi-client GraphQL APIs, composable design systems and delivery infrastructure. Currently building web experiences at CoStar Group and exploring local-first AI and developer tooling.",
};

export interface Experience {
  id: string;
  company: string;
  companyUrl?: string;
  type: string;
  location?: string;
  startDate: YearMonth;
  endDate: YearMonth | null;
  readonly period: string;
  readonly duration: string;
  title: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

type ExperienceSource = Omit<Experience, "period" | "duration">;

// Dates and achievements are the source for About, Resume and homepage evidence.
const experienceSources: ExperienceSource[] = [
  {
    id: "costar",
    company: "CoStar Group",
    companyUrl: "https://www.costargroup.com",
    type: "Full-time",
    location: "Melbourne, Victoria, Australia",
    startDate: "2025-08",
    endDate: null,
    title: "Senior Software Engineer",
    summary: "Building customer-facing web and listing experiences with React and Next.js, in partnership with design and product teams.",
    achievements: [
      "Engineering high-visibility, premium customer-facing web surfaces and listing experiences using React 18/19 and Next.js 15.",
      "Collaborating closely with design, product, and cross-functional teams to design scalable platform architectures and ensure visual excellence.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL"],
  },
  {
    id: "domain",
    company: "Domain",
    companyUrl: "https://www.domain.com.au",
    type: "Full-time",
    location: "Melbourne, Victoria, Australia · Hybrid",
    startDate: "2020-02",
    endDate: "2025-08",
    title: "Senior Software Engineer",
    summary: "Led work across shared GraphQL APIs, design systems and delivery infrastructure. Progressed through four roles, from Frontend Developer to Senior Engineer.",
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
    id: "real-time-agent",
    company: "Real Time Agent",
    companyUrl: "https://www.realtimeagent.com.au",
    type: "Full-time",
    location: "Melbourne, Australia",
    startDate: "2018-08",
    endDate: "2020-02",
    title: "Frontend Developer",
    summary: "Built real-time auction and offer interfaces, with components and state patterns adopted across broader platforms after acquisition.",
    achievements: [
      "Built real-time auction and offer-management interfaces for real estate agents using React, Node.js, and WebSockets.",
      "Established foundational components and real-time state synchronization patterns adopted across broader platforms after company acquisition.",
    ],
    technologies: ["React", "Node.js", "JavaScript", "WebSockets", "CSS-in-JS"],
  },
  {
    id: "future-golf",
    company: "Future Golf",
    type: "Casual",
    location: "Remote",
    startDate: "2025-03",
    endDate: "2025-10",
    title: "Software Developer",
    summary: "Delivered full-stack golf platform features and automated CI/CD to improve deployment reliability and release cadence.",
    achievements: [
      "Delivered full-stack features for a golf-tech platform on a casual contract basis.",
      "Improved deployment reliability and release cadence by setting up automated CI/CD pipelines.",
    ],
    technologies: ["React", "Node.js", "TypeScript", "CI/CD"],
  },
  {
    id: "nzdf",
    company: "New Zealand Defence Force",
    companyUrl: "https://www.nzdf.mil.nz",
    type: "Full-time",
    location: "Wellington, New Zealand",
    startDate: "2015-11",
    endDate: "2018-07",
    title: "Developer / Simulation & Process Modeller",
    summary: "Developed operational tools, simulations and logistics models to inform defence capability decisions.",
    achievements: [
      "Developed internal tooling and front-end systems for defence operations.",
      "Modelled operational processes, simulations, and interactive transit/logistics tools to inform capability decisions.",
    ],
    technologies: ["JavaScript", "Simulation", "Data Visualization", "Process Modelling"],
  },
  {
    id: "nz-army",
    company: "NZ Army",
    companyUrl: "https://www.nzdf.mil.nz/army",
    type: "Reserves",
    location: "Wellington, New Zealand",
    startDate: "2007-10",
    endDate: null,
    title: "Army Reservist",
    summary: "Ongoing reserve service alongside a technical career, developing leadership, discipline and mission-focus.",
    achievements: [
      "Developed leadership, discipline, and mission-focus alongside a technical career.",
    ],
    technologies: [],
  },
];

export function getExperiences(asOf: Date = new Date()): Experience[] {
  return experienceSources.map((experience) => ({
    ...experience,
    period: formatExperiencePeriod(experience.startDate, experience.endDate),
    duration: formatExperienceDuration(experience.startDate, experience.endDate, asOf),
  }));
}

export const experiences: Experience[] = getExperiences();

export interface SelectedImpact {
  id: string;
  experienceId: string;
  title: string;
  problem: string;
  role: string;
  system: string;
  outcome: string;
  achievementIndexes: number[];
}

/** Summaries of the Domain achievements above; no unpublished metrics or work. */
export const selectedImpact: SelectedImpact[] = [
  {
    id: "shared-api",
    experienceId: "domain",
    title: "One API across three platforms",
    problem: "Keeping web, iOS and Android clients aligned on API contracts.",
    role: "Architected and maintained the GraphQL backend-for-frontend.",
    system: "Apollo Server, field-level authorisation and OpenAPI-to-TypeScript code generation.",
    outcome: "A shared, type-safe API serving all three clients without contract drift.",
    achievementIndexes: [0],
  },
  {
    id: "design-systems",
    experienceId: "domain",
    title: "Shared foundations for product teams",
    problem: "Supplying reusable UI foundations across multiple internal products.",
    role: "Designed and maintained two composable design system monorepos.",
    system: "Lerna, Changesets, React component packages and shared Emotion design tokens.",
    outcome: "30+ component packages consumed across multiple products.",
    achievementIndexes: [2],
  },
  {
    id: "delivery-platform",
    experienceId: "domain",
    title: "A repeatable path to production",
    problem: "Delivering and checking a suite of containerised Node.js services.",
    role: "Owned the end-to-end CI/CD workflow and infrastructure deployments.",
    system: "Multi-stage Docker builds, Jenkins checks, AWS CDK and ECS Fargate.",
    outcome: "Per-PR preview environments with unit, integration and schema checks in the delivery pipeline.",
    achievementIndexes: [3],
  },
];

export interface SkillCategory {
  name: string;
  context: string;
  skills: { name: string }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Primary",
    context: "Product interfaces, shared APIs and design systems at Domain and CoStar Group.",
    skills: [
      { name: "TypeScript / JavaScript" },
      { name: "React / Next.js" },
      { name: "Node.js / GraphQL" },
      { name: "Design systems / Accessibility" },
    ],
  },
  {
    name: "Production experience",
    context: "Service delivery, cross-platform products and automated quality checks at Domain.",
    skills: [
      { name: "AWS ECS / Fargate / CDK" },
      { name: "Docker / Jenkins / CI/CD" },
      { name: "Jest / Cypress / Visual regression" },
      { name: "React Native / Expo" },
    ],
  },
  {
    name: "Current exploration",
    context: "Local-first AI gateways, context compression and developer tooling.",
    skills: [
      { name: "Rust / Python" },
      { name: "AI systems / LLM integration" },
      { name: "Model Context Protocol (MCP)" },
    ],
  },
];
