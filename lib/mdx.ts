import fs from "fs";
import path from "path";
import matter from "gray-matter";

const writingDirectory = path.join(process.cwd(), "content/writing");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(writingDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  };
}

export async function getAllArticles(): Promise<Omit<Article, "content">[]> {
  const files = fs.readdirSync(writingDirectory);
  const articles = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fileContent = fs.readFileSync(path.join(writingDirectory, file), "utf-8");
      const { data } = matter(fileContent);
      return {
        slug,
        frontmatter: data as ArticleFrontmatter,
      };
    });

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );
}
