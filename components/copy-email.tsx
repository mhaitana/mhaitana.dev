"use client";

import { useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { copyFeedback, copyText } from "@/lib/clipboard";
import { useHydrated } from "@/lib/use-hydrated";

export function CopyEmail({ email }: { email: string }) {
  const [result, setResult] = useState<boolean | null>(null);
  const [copying, setCopying] = useState(false);
  const hydrated = useHydrated();
  const statusId = useId();
  const fieldId = useId();

  async function handleCopy() {
    if (copying) return;
    setCopying(true);
    setResult(null);
    try {
      setResult(await copyText(email));
    } catch {
      setResult(false);
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className="min-w-0">
      <button type="button" onClick={handleCopy} disabled={!hydrated} aria-disabled={copying} aria-busy={copying} aria-describedby={statusId} className={buttonVariants({ variant: "outline" })}>
        {result === true ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        {copying ? "Copying…" : result === true ? "Copied" : "Copy email"}
      </button>
      <p id={statusId} role="status" aria-live="polite" aria-atomic="true" className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {result === null ? "" : copyFeedback(result)}
      </p>
      {result === false && (
        <div className="mt-3">
          <label htmlFor={fieldId} className="text-sm font-medium">Email address to copy</label>
          <input id={fieldId} type="text" value={email} readOnly onFocus={(event) => event.currentTarget.select()} className="mt-2 min-h-11 w-full min-w-0 border border-border bg-background px-3 text-sm" />
        </div>
      )}
      <noscript><p className="mt-3 text-sm text-muted-foreground">Use the email link or copy the address shown above.</p></noscript>
    </div>
  );
}
