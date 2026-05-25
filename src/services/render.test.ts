import { describe, expect, test } from "vitest";

import {
  renderDependencyRisks,
  renderDocs,
  renderOverview,
  renderReleaseReadiness,
  renderSchemaLane,
  renderVerification
} from "./render";
import {
  dependencyBlocks,
  releasePackets,
  schemaChanges
} from "../data/sampleCatalog";

const renderers = [
  ["overview", renderOverview],
  ["schema-lane", renderSchemaLane],
  ["dependency-risks", renderDependencyRisks],
  ["release-readiness", renderReleaseReadiness],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Catalog Schema Governance Studio");
    expect(html).toContain('href="/schema-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("schema lane lists every change with a risk tag", () => {
    const html = renderSchemaLane();
    for (const change of schemaChanges) {
      expect(html).toContain(change.changeId);
    }
    expect(html).toContain('class="tag red"');
  });

  test("dependency risks list every block with readiness tags", () => {
    const html = renderDependencyRisks();
    for (const block of dependencyBlocks) {
      expect(html).toContain(block.riskId);
    }
    expect(html).toContain('class="tag red"');
    expect(html).toContain('class="tag yellow"');
  });

  test("release readiness shows packets and completeness scores", () => {
    const html = renderReleaseReadiness();
    for (const packet of releasePackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.completenessScore));
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/dependency-risks");
    expect(html).toContain("/release-readiness");
  });
});
