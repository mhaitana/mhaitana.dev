import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  external?: boolean;
  download?: string | boolean;
}

export function LinkButton({
  href,
  children,
  variant = "default",
  size = "default",
  className,
  external,
  download,
}: LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (external || download) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        download={download === true ? "" : download || undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
