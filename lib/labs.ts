// ============================================================================
//  haitech labs — solo-founder software studio pipeline
//
//  Single source of truth for the Labs area on mhaitana.dev.
//  Content mirrors the canonical source at ~/Projects/haitechlabs/src/data/projects.ts.
//  Edit, add, or remove entries here and the labs page + pipeline grid update.
//
//  Pitches are intentionally one line: enough to understand the shape of the
//  opportunity, not enough to hand away the playbook. `requestDetails` gates
//  the deeper conversation behind the contact form.
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
  /** Whether a visitor can request more detail (gated behind contact). */
  requestDetails: boolean;
}

export const labProjects: LabProject[] = [
  {
    id: "cruise-planner",
    name: "cruise planner",
    pitch:
      "search real sailings across 20+ cruise lines and chain them into optimized multi-segment itineraries on one map.",
    problem:
      "planning back-to-back cruises means hand-matching ports and dates across separate line sites — slow and error-prone.",
    stack: ["Next.js", "Supabase", "Mapbox", "Redis", "OpenAI"],
    status: "live",
    category: "travel",
    requestDetails: false,
  },
  {
    id: "onthebell",
    name: "onthebell",
    pitch:
      "an address-verified hyper-local platform bundling a feed, marketplace, jobs, and business directory for one community.",
    problem:
      "regional towns lack a single trusted, locally-scoped digital home — needs are scattered across facebook groups and generic marketplaces.",
    stack: ["Next.js", "Firebase", "Stripe", "PWA", "Google Maps"],
    status: "alpha / waitlist",
    category: "local community",
    requestDetails: true,
  },
  {
    id: "perkr",
    name: "perkr",
    pitch:
      "a perks and deals marketplace giving verified gig drivers exclusive discounts, funded by subscribing local businesses.",
    problem:
      "gig drivers get no benefits and small businesses can't reach that mobile workforce. perkr connects both sides.",
    stack: ["Next.js", "Supabase", "Stripe", "Mapbox", "PWA"],
    status: "alpha / waitlist",
    category: "marketplace / gig",
    requestDetails: true,
  },
  {
    id: "hai",
    name: "hAI",
    pitch:
      "a local-first mobile dev workstation — chat with on-device LLMs, edit code, and run a real Linux terminal from your phone.",
    problem:
      "real development tooling doesn't run on a phone without a cloud backend; hai puts AI inference, a shell, and git on-device.",
    stack: ["Expo", "React Native", "llama.rn", "v86 Linux", "TypeScript"],
    status: "in development",
    category: "ai / dev tools",
    requestDetails: true,
  },
  {
    id: "babyweight",
    name: "babyweight",
    pitch:
      "weekly fitness-equipment swaps plus guided workouts for new parents — train to lift, carry, and twist through daily parenting.",
    problem:
      "gyms cost and weights clutter. new parents want functional strength without a membership or outgrown home gear.",
    stack: ["Expo", "Next.js", "Supabase", "Stripe", "EAS"],
    status: "in development",
    category: "health & fitness",
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
    chipClass: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
  },
  "alpha / waitlist": {
    label: "Alpha / Waitlist",
    icon: Activity,
    dotClass: "bg-orange-500",
    chipClass: "border-orange-500/40 text-orange-600 dark:text-orange-400",
  },
  "in development": {
    label: "In Development",
    icon: Code2,
    dotClass: "bg-sky-500",
    chipClass: "border-sky-500/40 text-sky-600 dark:text-sky-400",
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
  { value: "alpha / waitlist", label: "Alpha / Waitlist" },
  { value: "in development", label: "In Development" },
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
    body: "lean MVPs, internal tools, and micro-SaaS. i pick sharp, well-defined problems and ship the smallest product that proves the thesis.",
  },
  {
    icon: Gauge,
    title: "How I build",
    body: "solo, design-led, shipping to production in public. metrics from day one — every build is either earning signal or it isn't worth keeping.",
  },
  {
    icon: Rocket,
    title: "The model",
    body: "i build, validate, then decide: keep going, bring on a partner or operator, or sunset and move on. keep what compounds.",
  },
];

export const HAITECH_LABS_URL = "https://haitechlabs.com";