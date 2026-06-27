import { AnimatedReveal } from "./animated-reveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Matt combines deep frontend expertise with a calm, product-first mindset. He elevates every team he joins.",
    author: "Colleague at Domain",
    role: "Engineering Manager",
  },
  {
    quote:
      "His work on our real-time platform was instrumental. Reliable code, thoughtful UX, and genuine ownership.",
    author: "Product Lead",
    role: "CoStar Group",
  },
  {
    quote:
      "A rare engineer who can talk to stakeholders, write clean code, and mentor juniors — all in the same day.",
    author: "Senior Engineer",
    role: "Past collaborator",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, index) => (
        <AnimatedReveal key={t.author} delay={index * 0.05}>
          <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <Quote className="h-6 w-6 text-primary/60" aria-hidden="true" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
              “{t.quote}”
            </p>
            <footer className="mt-6">
              <p className="text-sm font-semibold">{t.author}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </footer>
          </blockquote>
        </AnimatedReveal>
      ))}
    </div>
  );
}
