import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { BlogCard } from "@/components/blog-card";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical articles, engineering notes, and architecture decisions by Matt Haitana.",
};

export default async function WritingPage() {
  const articles = await getAllArticles();

  return (
    <>
      <section className="px-6 pt-24 pb-16 lg:px-8">
        <Container>
          <SectionHeading
            eyebrow="Writing"
            title="Latest articles"
            description="Notes on frontend engineering, accessibility, deployment automation, and building teams."
          />
        </Container>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <BlogCard
                key={article.slug}
                article={{
                  slug: article.slug,
                  title: article.frontmatter.title,
                  description: article.frontmatter.description,
                  publishedAt: article.frontmatter.publishedAt,
                  readingTime: article.frontmatter.readingTime,
                }}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
