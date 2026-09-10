import assert from "node:assert/strict";
import test from "node:test";
import { copyFeedback, copyText } from "../lib/clipboard.ts";

function fallbackDocument({ result = true, throws = false } = {}) {
  const calls = [];
  const range = { cloneRange: () => "previous range" };
  const selection = {
    rangeCount: 1,
    getRangeAt: () => range,
    removeAllRanges: () => calls.push("clear selection"),
    addRange: (value) => calls.push(value),
  };
  const field = {
    style: {},
    focus: () => calls.push("focus temporary field"),
    select: () => calls.push("select text"),
    setSelectionRange: (start, end) => calls.push([start, end]),
    remove: () => calls.push("remove temporary field"),
  };
  return {
    calls,
    field,
    document: {
      body: { appendChild: () => calls.push("append temporary field") },
      activeElement: { focus: () => calls.push("restore focus") },
      getSelection: () => selection,
      createElement: () => field,
      execCommand: (command) => {
        calls.push(command);
        if (throws) throw new Error("Copy blocked");
        return result;
      },
    },
  };
}

test("uses the Clipboard API when available", async () => {
  const values = [];
  assert.equal(await copyText("hello@example.com", { clipboard: { writeText: async (value) => values.push(value) } }), true);
  assert.deepEqual(values, ["hello@example.com"]);
});

test("falls back when clipboard permission is rejected and restores focus and selection", async () => {
  const fallback = fallbackDocument();
  const copied = await copyText("hello@example.com", {
    clipboard: { writeText: async () => { throw new Error("Permission denied"); } },
    document: fallback.document,
  });
  assert.equal(copied, true);
  assert.equal(fallback.field.value, "hello@example.com");
  assert.ok(fallback.calls.includes("copy"));
  assert.deepEqual(fallback.calls.slice(-4), ["remove temporary field", "restore focus", "clear selection", "previous range"]);
});

test("falls back when the Clipboard API is unavailable", async () => {
  const fallback = fallbackDocument();
  assert.equal(await copyText("hello@example.com", { document: fallback.document }), true);
});

test("reports failure when neither clipboard method is available", async () => {
  assert.equal(await copyText("hello@example.com", {}), false);
});

test("reports rejected or throwing legacy copy and always removes the temporary field", async () => {
  for (const options of [{ result: false }, { throws: true }]) {
    const fallback = fallbackDocument(options);
    assert.equal(await copyText("hello@example.com", { document: fallback.document }), false);
    assert.ok(fallback.calls.includes("remove temporary field"));
    assert.ok(fallback.calls.includes("restore focus"));
  }
});

test("feedback distinguishes clipboard success from the actionable manual fallback", () => {
  assert.equal(copyFeedback(true), "Email copied to clipboard.");
  assert.match(copyFeedback(false), /Copy failed.*copy it manually/);
});
