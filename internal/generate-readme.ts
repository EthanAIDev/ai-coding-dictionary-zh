#!/usr/bin/env -S npx tsx
// Generate README.md from internal/Curriculum.md + dictionary/*.md + internal/README.template.md.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);
const CURRICULUM = join(HERE, "Curriculum.md");
const TEMPLATE = join(HERE, "README.template.md");
const DICT_DIR = join(ROOT, "dictionary");
const OUTPUT = join(ROOT, "README.md");
const MARKER = "<!-- CURRICULUM -->";
const TOC_MARKER = "<!-- TOC -->";

const SECTION_RE = /^## Section \d+ — .+$/;
const BULLET_RE = /^- (.+)$/;
const LINK_RE = /\[([^\]]+)\]\(\.\/([^)]+)\.md\)/g;

type Term = { key: string; label: string };
type Section = { heading: string; terms: Term[] };

function fail(msg: string): never {
  console.error(msg);
  process.exit(1);
}

// Mirrors GitHub's heading slugger: lowercase, strip punctuation (keeping hyphens),
// then replace spaces with hyphens. "Section 1 — Foundations" → "section-1--foundations".
function headingSlug(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N} -]/gu, "")
    .replace(/ /g, "-");
}

function parseCurriculum(text: string): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;

  text.split("\n").forEach((raw, idx) => {
    const lineNo = idx + 1;
    const line = raw.trimEnd();
    if (line === "") return;

    if (line.startsWith("## ")) {
      if (!SECTION_RE.test(line)) {
        fail(
          `Curriculum.md:${lineNo}: section heading must match "## Section N — Title" (em-dash required): ${line}`
        );
      }
      current = { heading: line.slice(3), terms: [] };
      sections.push(current);
      return;
    }

    if (line.startsWith("- ")) {
      if (!current)
        fail(`Curriculum.md:${lineNo}: bullet before any section heading`);
      const m = line.match(BULLET_RE);
      if (!m || !m[1])
        fail(`Curriculum.md:${lineNo}: malformed bullet: ${line}`);
      const raw = m[1];
      const parts = raw.split("|").map((p) => p.trim());
      if (parts.length > 2)
        fail(
          `Curriculum.md:${lineNo}: bullet may only contain one "|" separator: ${line}`
        );
      const [rawKey, rawLabel] = parts;
      if (!rawKey) fail(`Curriculum.md:${lineNo}: term key cannot be empty`);
      const key = rawKey;
      const label = rawLabel ?? rawKey;
      if (key.trim() !== key || label.trim() !== label)
        fail(`Curriculum.md:${lineNo}: term has surrounding whitespace`);
      if (/[*_`\[]/.test(key) || /[*_`\[]/.test(label))
        fail(
          `Curriculum.md:${lineNo}: term key/label must be plain text, no markdown: ${line}`
        );
      current.terms.push({ key, label });
      return;
    }

    fail(
      `Curriculum.md:${lineNo}: only "## Section N — Title" headings and "- Term" bullets are allowed: ${line}`
    );
  });

  return sections;
}

function stripFrontmatter(body: string): string {
  if (!body.startsWith("---\n")) return body;
  const end = body.indexOf("\n---\n", 4);
  if (end === -1) return body;
  return body.slice(end + 5).replace(/^\n+/, "");
}

function rewriteLinks(body: string, labelByKey: Map<string, string>): string {
  return body.replace(LINK_RE, (_, text: string, target: string) => {
    const key = decodeURIComponent(target);
    const label = labelByKey.get(key) ?? text;
    return `[${label}](#${headingSlug(label)})`;
  });
}

function main(): void {
  const template = readFileSync(TEMPLATE, "utf8");
  if (!template.includes(MARKER)) fail(`Template missing ${MARKER} marker`);
  if (!template.includes(TOC_MARKER))
    fail(`Template missing ${TOC_MARKER} marker`);

  const sections = parseCurriculum(readFileSync(CURRICULUM, "utf8"));
  const labelByKey = new Map<string, string>();
  for (const section of sections) {
    for (const term of section.terms) {
      if (labelByKey.has(term.key)) {
        fail(`Curriculum.md: duplicate term key "${term.key}"`);
      }
      labelByKey.set(term.key, term.label);
    }
  }

  const seen = new Set<string>();
  const parts: string[] = [];
  for (const section of sections) {
    parts.push(`## ${section.heading}`, "");
    for (const term of section.terms) {
      if (seen.has(term.key))
        fail(`Curriculum.md: duplicate term "${term.key}"`);
      seen.add(term.key);
      const entryPath = join(DICT_DIR, `${term.key}.md`);
      let body: string;
      try {
        body = readFileSync(entryPath, "utf8");
      } catch {
        fail(
          `Curriculum.md references "${term.key}" but ${entryPath} does not exist`
        );
      }
      parts.push(
        `### ${term.label}`,
        "",
        rewriteLinks(stripFrontmatter(body).trimEnd(), labelByKey),
        ""
      );
    }
  }

  const onDisk = new Set(
    readdirSync(DICT_DIR)
      .filter((n) => n.endsWith(".md"))
      .map((n) => n.slice(0, -3))
  );
  const orphans = [...onDisk].filter((t) => !seen.has(t)).sort();
  if (orphans.length)
    fail(
      `dictionary/ entries not referenced by Curriculum.md: ${orphans.join(", ")}`
    );

  const block = parts.join("\n").trimEnd() + "\n";
  const toc = sections
    .map((s) => {
      const terms = s.terms
        .map((t) => `- [${t.label}](#${headingSlug(t.label)})`)
        .join("\n");
      return [
        "<details>",
        `<summary>${s.heading}</summary>`,
        "",
        terms,
        "",
        "</details>",
      ].join("\n");
    })
    .join("\n\n");
  const banner =
    "<!--\n" +
    "  GENERATED FILE — DO NOT EDIT.\n" +
    "  Source: dictionary/*.md, internal/Curriculum.md, internal/README.template.md\n" +
    "  Regenerate: npm run generate\n" +
    "-->\n\n";
  writeFileSync(
    OUTPUT,
    banner + template.replace(TOC_MARKER, toc).replace(MARKER, block)
  );
}

main();
