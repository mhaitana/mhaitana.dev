import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { AnimatedReveal } from "./animated-reveal";
import { Article } from "@/lib/data";

interface BlogCardProps {
  article: Article;
  index: number;
}

export function BlogCard({ article, index }: BlogCardProps) {
  return (
    <AnimatedReveal delay={index * 0.05}>
      <article className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {new Date(article.publishedAt).toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readingTime}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-foreground">
          <Link
            href={`/writing/${article.slug}`}
            className="hover:underline focus:underline"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">{article.description}</p>
      </article>
    </AnimatedReveal>
  );
}
