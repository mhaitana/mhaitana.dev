interface ClipboardEnvironment {
  clipboard?: Pick<Clipboard, "writeText">;
  document?: Document;
}

/** Prefer the Clipboard API, then fall back for denied permissions or older browsers. */
export async function copyText(
  text: string,
  environment: ClipboardEnvironment = {
    clipboard: globalThis.navigator?.clipboard,
    document: globalThis.document,
  },
): Promise<boolean> {
  if (environment.clipboard?.writeText) {
    try {
      await environment.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denial can still allow copying during the user gesture below.
    }
  }

  const doc = environment.document;
  if (!doc?.body || typeof doc.execCommand !== "function") return false;

  const previousFocus = doc.activeElement as HTMLElement | null;
  const selection = doc.getSelection();
  const ranges = selection
    ? Array.from({ length: selection.rangeCount }, (_, index) => selection.getRangeAt(index).cloneRange())
    : [];
  const field = doc.createElement("textarea");
  field.value = text;
  field.readOnly = true;
  field.tabIndex = -1;
  field.style.cssText = "position: fixed; left: -9999px; top: 0;";
  doc.body.appendChild(field);

  try {
    field.focus({ preventScroll: true });
    field.select();
    field.setSelectionRange(0, text.length);
    return doc.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
    previousFocus?.focus?.({ preventScroll: true });
    if (selection) {
      selection.removeAllRanges();
      for (const range of ranges) selection.addRange(range);
    }
  }
}

export function copyFeedback(copied: boolean): string {
  return copied
    ? "Email copied to clipboard."
    : "Copy failed. Select the email below and copy it manually.";
}
