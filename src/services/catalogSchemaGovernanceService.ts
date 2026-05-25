import { dependencyBlocks, releasePackets, schemaChanges } from "../data/sampleCatalog";

export function summary() {
  return {
    schemaChanges: schemaChanges.length,
    urgentChanges: schemaChanges.filter((item) => item.risk === "red").length,
    blockedDependencies: dependencyBlocks.filter((item) => item.readiness !== "green").length,
    riskyPackets: releasePackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear feed and campaign dependency blockers first so release-safe schema changes do not break discovery, targeting, or launch timing."
  };
}

export function schemaLane() {
  return schemaChanges;
}

export function dependencyRisks() {
  return dependencyBlocks;
}

export function releaseReadiness() {
  return releasePackets;
}

export function verification() {
  return [
    "Catalog changes map to concrete downstream systems, not just field names.",
    "Dependency blockers surface the proof needed before a release becomes buyer-visible.",
    "Release posture ties schema work to storefront, feed, and campaign outcomes.",
    "The studio is buyer-readable and safe for embedded analytics tie-back.",
    "Synthetic data only; no real customer, order, or catalog records are included."
  ];
}

export function payload() {
  return {
    summary: summary(),
    changes: schemaLane(),
    rules: dependencyRisks(),
    releasePackets: releaseReadiness(),
    verification: verification()
  };
}
