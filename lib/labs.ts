// ============================================================================
//  haitech labs — solo-founder software studio pipeline
//
//  Single source of truth for the Labs area on mhaitana.dev.
//  Project facts mirror ~/Projects/haitechlabs/src/data/projects.ts.
//  This portfolio adds sentence-case copy, role context, and verified destinations.
//  Edit, add, or remove entries here and the labs page + pipeline grid update.
//
//  Pitches are intentionally one line: enough to understand the shape of the
//  opportunity, not a detailed specification. No project URL is currently
//  supplied by the canonical source; do not substitute the studio homepage.
// ============================================================================

import {
  Activity,
  Beaker,
  Boxes,
  CheckCircle2,
  Code2,
  Gauge,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type LabStatus = "live" | "alpha / waitlist" | "in development" | "brainstorm";

export type LabFilter = "all" | LabStatus;

export interface LabProject {
  id: string;
  name: string;
  /** One-line pitch. Investor-facing, not a spec. */
  pitch: string;
  /** The problem in plain language — what's broken today. */
  problem: string;
  /** Tech stack tags, shown as chips. */
  stack: string[];
  status: LabStatus;
  /** The market/category it lives in. */
  category: string;
  /** Responsibility supported by the studio's existing solo-founder description. */
  role: string;
  /** Add only a verified individual product, waitlist, repository, or case-study URL. */
  destination?: { href: string; label: string };
  /** Whether a visitor can request more detail (gated behind contact). */
  requestDetails: boolean;
}

export const labProjects: LabProject[] = [
  {
    id: "cruise-planner",
    name: "Cruise Planner",
    pitch:
      "Search sailings across 20+ cruise lines and connect them into multi-segment itineraries on one map.",
    problem:
      "Planning back-to-back cruises means matching ports and dates across separate cruise-line sites.",
    stack: ["Next.js", "Supabase", "Mapbox", "Redis", "OpenAI"],
    status: "live",
    category: "Travel",
    role: "Solo founder · design and development",
    requestDetails: false,
  },
  {
    id: "onthebell",
    name: "onthebell",
    pitch:
      "An address-verified community platform combining a local feed, marketplace, jobs, and business directory.",
    problem:
      "Local information and services are scattered across Facebook groups and generic marketplaces.",
    stack: ["Next.js", "Firebase", "Stripe", "PWA", "Google Maps"],
    status: "alpha / waitlist",
    category: "Local community",
    role: "Solo founder · design and development",
    requestDetails: true,
  },
  {
    id: "perkr",
    name: "perkr",
    pitch:
      "A marketplace connecting verified gig drivers with discounts from subscribing local businesses.",
    problem:
      "Gig drivers miss out on workplace perks, while local businesses need a way to reach that mobile workforce.",
    stack: ["Next.js", "Supabase", "Stripe", "Mapbox", "PWA"],
    status: "alpha / waitlist",
    category: "Marketplace / gig work",
    role: "Solo founder · design and development",
    requestDetails: true,
  },
  {
    id: "hai",
    name: "hAI",
    pitch:
      "A mobile workstation combining on-device language models, a code editor, and a Linux terminal.",
    problem:
      "Mobile development workflows often depend on a cloud backend for AI, shell access, and Git.",
    stack: ["Expo", "React Native", "llama.rn", "v86 Linux", "TypeScript"],
    status: "in development",
    category: "AI / developer tools",
    role: "Solo founder · design and development",
    requestDetails: true,
  },
  {
    id: "babyweight",
    name: "babyweight",
    pitch:
      "Weekly fitness-equipment swaps and guided workouts built around the movements of everyday parenting.",
    problem:
      "New parents want functional strength without a gym membership or equipment that outlives its usefulness.",
    stack: ["Expo", "Next.js", "Supabase", "Stripe", "EAS"],
    status: "in development",
    category: "Health & fitness",
    role: "Solo founder · design and development",
    requestDetails: true,
  },
];

/** Status → icon + color mapping. Color is never the sole signal: icon + label always accompany the dot. */
export const labStatusMeta: Record<
  LabStatus,
  { label: string; icon: LucideIcon; dotClass: string; chipClass: string }
> = {
  live: {
    label: "Live",
    icon: CheckCircle2,
    dotClass: "bg-emerald-500",
    chipClass: "border-emerald-700/40 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-400",
  },
  "alpha / waitlist": {
    label: "Alpha / waitlist",
    icon: Activity,
    dotClass: "bg-orange-500",
    chipClass: "border-orange-700/40 text-orange-700 dark:border-orange-400/40 dark:text-orange-400",
  },
  "in development": {
    label: "In development",
    icon: Code2,
    dotClass: "bg-sky-500",
    chipClass: "border-sky-700/40 text-sky-700 dark:border-sky-400/40 dark:text-sky-400",
  },
  brainstorm: {
    label: "Brainstorm",
    icon: Beaker,
    dotClass: "bg-purple-500",
    chipClass: "border-purple-500/40 text-purple-600 dark:text-purple-400",
  },
};

/** Filter chips shown above the pipeline grid, in display order. */
export const labFilters: { value: LabFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "alpha / waitlist", label: "Alpha / waitlist" },
  { value: "in development", label: "In development" },
];

export const labStats: { value: string; label: string }[] = [
  { value: "1", label: "Founder, shipping solo" },
  { value: String(labProjects.length), label: "Builds in the pipeline" },
  { value: String(labProjects.filter((p) => p.status === "live").length), label: "Live in production" },
  { value: String(labProjects.filter((p) => p.status !== "live").length), label: "Still in the workshop" },
];

export const labPillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Boxes,
    title: "What I build",
    body: "Lean MVPs, internal tools, and micro-SaaS. I start with a specific problem and build the smallest product that can test the idea.",
  },
  {
    icon: Gauge,
    title: "How I build",
    body: "Solo and design-led, from an early idea to a working product. Each release gives me something concrete to learn from.",
  },
  {
    icon: Rocket,
    title: "The model",
    body: "Build, validate, then decide: keep going, find a partner or operator, or close the project and move on.",
  },
];

export const HAITECH_LABS_URL = "https://haitechlabs.com";
