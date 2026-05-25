// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";

import {
  dependencyRisks,
  payload,
  releaseReadiness,
  schemaLane,
  summary,
  verification
} from "./services/catalogSchemaGovernanceService";
import {
  renderDependencyRisks,
  renderDocs,
  renderOverview,
  renderReleaseReadiness,
  renderSchemaLane,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5502);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/schema-lane", (_req, res) => res.type("html").send(renderSchemaLane()));
app.get("/dependency-risks", (_req, res) => res.type("html").send(renderDependencyRisks()));
app.get("/release-readiness", (_req, res) => res.type("html").send(renderReleaseReadiness()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/schema-lane", (_req, res) => res.json(schemaLane()));
app.get("/api/dependency-risks", (_req, res) => res.json(dependencyRisks()));
app.get("/api/release-readiness", (_req, res) => res.json(releaseReadiness()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`Catalog Schema Governance Studio listening on http://${host}:${port}`);
  });
}

export default app;
