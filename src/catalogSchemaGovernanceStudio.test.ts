import { describe, expect, test } from "vitest";

import {
  dependencyRisks,
  releaseReadiness,
  schemaLane,
  summary,
  verification
} from "./services/catalogSchemaGovernanceService";

describe("catalog-schema-governance-studio", () => {
  test("returns a governance recommendation", () => {
    expect(summary().recommendation).toMatch(/release/i);
  });

  test("maps schema changes and blockers", () => {
    expect(schemaLane().length).toBeGreaterThan(2);
    expect(dependencyRisks().some((risk) => risk.readiness === "red")).toBe(true);
  });

  test("verification posture stays buyer-readable", () => {
    expect(releaseReadiness().every((packet) => packet.audience.length > 0)).toBe(true);
    expect(verification().some((item) => item.toLowerCase().includes("catalog"))).toBe(true);
  });
});
