import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/container";
import { AnimatedReveal } from "@/components/animated-reveal";
import { getArticleBySlug, getAllArticles } from "@/lib/mdx";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, content } = article;

  return (
    <>
      <article className="px-6 pt-24 pb-16 lg:px-8">
        <Container className="max-w-3xl">
          <AnimatedReveal>
            <Link
              href="/writing"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to writing
            </Link>
          </AnimatedReveal>

          <AnimatedReveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {new Date(frontmatter.publishedAt).toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {frontmatter.readingTime}
              </span>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {frontmatter.title}
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15}>
            <p className="mt-4 text-lg text-muted-foreground">{frontmatter.description}</p>
          </AnimatedReveal>
        </Container>
      </article>

      <section className="px-6 pb-24 lg:px-8">
        <Container className="max-w-3xl">
          <AnimatedReveal>
            <div className="article-content">
              <MDXRemote source={content} />
            </div>
          </AnimatedReveal>
        </Container>
      </section>
    </>
  );
}
