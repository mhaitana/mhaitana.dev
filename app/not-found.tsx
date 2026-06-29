
import { Container } from "@/components/container";
import { LinkButton } from "@/components/link-button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center py-32">
      <Container className="text-center">
        <p className="eyebrow">
          404
        </p>
        <h1 className="mt-6 text-6xl font-bold tracking-[-0.06em] text-foreground sm:text-8xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <LinkButton href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back home
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
