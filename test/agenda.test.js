import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(root, "_site/presentations/example/index.html");

describe("agenda auto_generate", () => {
  let html;

  beforeAll(() => {
    execSync("pnpm run build", { cwd: root, stdio: "pipe", timeout: 25_000 });
    html = fs.readFileSync(htmlPath, "utf-8");
  });

  it("generates agenda links from section slides", () => {
    // Extract the agenda section
    const agendaMatch = html.match(
      /<section class="slide-agenda">([\s\S]*?)<\/section>/
    );
    expect(agendaMatch, "agenda slide should exist").toBeTruthy();
    const agendaHtml = agendaMatch[1];

    // Extract all links
    const linkRegex = /<a href="#\/(\d+)">(.*?)<\/a>/g;
    const links = [];
    let match;
    while ((match = linkRegex.exec(agendaHtml)) !== null) {
      links.push({ index: parseInt(match[1], 10), title: match[2] });
    }

    expect(links.length).toBe(4);
    expect(links[0].title).toBe("Foundations");
    expect(links[1].title).toBe("Layouts");
    expect(links[2].title).toBe("Visual Impact");
    expect(links[3].title).toBe("Flow & Motion");
  });

  it("uses 0-based slide indices matching section positions", () => {
    // Find all section slides and their 0-based positions
    const sectionRegex = /<section class="slide-section">/g;
    const sectionIndices = [];
    const allSections = html.match(
      /<section class="slide-[^"]*"[^>]*>/g
    );
    if (allSections) {
      allSections.forEach((tag, i) => {
        if (tag.includes("slide-section")) {
          sectionIndices.push(i);
        }
      });
    }

    // Extract agenda link indices
    const agendaMatch = html.match(
      /<section class="slide-agenda">([\s\S]*?)<\/section>/
    );
    const linkRegex = /<a href="#\/(\d+)">/g;
    const linkIndices = [];
    let match;
    while ((match = linkRegex.exec(agendaMatch[1])) !== null) {
      linkIndices.push(parseInt(match[1], 10));
    }

    expect(linkIndices).toEqual(sectionIndices);
  });

  it("renders inside an ordered list", () => {
    const agendaMatch = html.match(
      /<section class="slide-agenda">([\s\S]*?)<\/section>/
    );
    expect(agendaMatch[1]).toContain('<ol class="agenda-list">');
    expect(agendaMatch[1]).toContain("</ol>");
  });
});
