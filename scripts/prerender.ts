import fs from "node:fs";
import path from "node:path";

import {
  dependencyRisks,
  payload,
  releaseReadiness,
  schemaLane,
  summary,
  verification
} from "../src/services/catalogSchemaGovernanceService";
import {
  renderDependencyRisks,
  renderDocs,
  renderOverview,
  renderReleaseReadiness,
  renderSchemaLane,
  renderVerification
} from "../src/services/render";

const outputDir = path.resolve(__dirname, "..", "site");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "api"), { recursive: true });
fs.copyFileSync(path.resolve(__dirname, "..", "CNAME"), path.join(outputDir, "CNAME"));

const pages: Record<string, string> = {
  "index.html": renderOverview(),
  "schema-lane.html": renderSchemaLane(),
  "dependency-risks.html": renderDependencyRisks(),
  "release-readiness.html": renderReleaseReadiness(),
  "verification.html": renderVerification(),
  "docs.html": renderDocs()
};

const rewrites: Array<[string, string]> = [
  ['href="/schema-lane"', 'href="schema-lane.html"'],
  ['href="/dependency-risks"', 'href="dependency-risks.html"'],
  ['href="/release-readiness"', 'href="release-readiness.html"'],
  ['href="/verification"', 'href="verification.html"'],
  ['href="/docs"', 'href="docs.html"']
];

for (const [filename, html] of Object.entries(pages)) {
  let content = html;
  for (const [from, to] of rewrites) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(path.join(outputDir, filename), content, "utf8");
}

const apiPayloads: Record<string, unknown> = {
  "api/dashboard/summary.json": summary(),
  "api/schema-lane.json": schemaLane(),
  "api/dependency-risks.json": dependencyRisks(),
  "api/release-readiness.json": releaseReadiness(),
  "api/verification.json": verification(),
  "api/sample.json": payload()
};

for (const [filename, data] of Object.entries(apiPayloads)) {
  fs.mkdirSync(path.dirname(path.join(outputDir, filename)), { recursive: true });
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(data, null, 2), "utf8");
}
