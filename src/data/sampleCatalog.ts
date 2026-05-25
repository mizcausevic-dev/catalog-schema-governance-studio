export type SchemaChange = {
  changeId: string;
  domain: string;
  field: string;
  issueType: string;
  owner: string;
  nextAction: string;
  risk: "red" | "yellow" | "green";
  excerpt: string;
};

export type DependencyRisk = {
  riskId: string;
  blocker: string;
  owner: string;
  source: string;
  readiness: "red" | "yellow" | "green";
  requiredEvidence: string;
  impactArea: string;
  note: string;
};

export type ReleasePacket = {
  packetId: string;
  audience: string;
  completenessScore: number;
  status: "red" | "yellow" | "green";
  blocker: string;
  launchWindowHours: number;
  decisionNote: string;
};

export const schemaChanges: SchemaChange[] = [
  {
    changeId: "SC-114",
    domain: "Variant catalog",
    field: "material_composition",
    issueType: "Feed schema drift",
    owner: "Catalog Ops",
    nextAction: "Lock feed mapping review before search and ad sync",
    risk: "red",
    excerpt: "The new variant material field is live in PIM but still missing in marketplace and ad-feed mappings."
  },
  {
    changeId: "SC-128",
    domain: "Product detail page",
    field: "bundle_eligibility",
    issueType: "PDP rendering dependency",
    owner: "Storefront Engineering",
    nextAction: "Validate fallback rendering and merchandising rules",
    risk: "yellow",
    excerpt: "Bundle eligibility rules changed, but the PDP component contract has not been revalidated."
  },
  {
    changeId: "SC-142",
    domain: "Search facets",
    field: "eco_certification",
    issueType: "Facet release timing",
    owner: "Search Platform",
    nextAction: "Confirm facet index rebuild before campaign launch",
    risk: "yellow",
    excerpt: "New eco-certification facet is modeled, but the index rebuild is not yet scheduled."
  },
  {
    changeId: "SC-157",
    domain: "Pricing feeds",
    field: "promo_tier_window",
    issueType: "Campaign targeting mismatch",
    owner: "Growth Systems",
    nextAction: "Reset campaign audience rules against new price-window logic",
    risk: "red",
    excerpt: "The promotion tier window changed without synchronized audience-rule updates in the campaign layer."
  }
];

export const dependencyBlocks: DependencyRisk[] = [
  {
    riskId: "DR-21",
    blocker: "Marketplace feed mapping incomplete",
    owner: "Catalog Ops",
    source: "Channel feed sync",
    readiness: "red",
    requiredEvidence: "Mapped field proof, feed preview, and channel acceptance note",
    impactArea: "Marketplace visibility",
    note: "Field exists in source data, but downstream channel mapping is still incomplete."
  },
  {
    riskId: "DR-29",
    blocker: "Storefront component fallback not approved",
    owner: "Storefront Engineering",
    source: "PDP rendering",
    readiness: "yellow",
    requiredEvidence: "Fallback screenshot proof and component contract signoff",
    impactArea: "Product detail rendering",
    note: "The UI fallback exists, but release proof has not yet been signed off."
  },
  {
    riskId: "DR-34",
    blocker: "Search index rebuild not scheduled",
    owner: "Search Platform",
    source: "Search / discovery",
    readiness: "yellow",
    requiredEvidence: "Index rebuild job confirmation and validation query results",
    impactArea: "Facet discoverability",
    note: "Facet configuration is ready, but the index rebuild still lacks an execution window."
  },
  {
    riskId: "DR-41",
    blocker: "Campaign audience rules lagging price-window logic",
    owner: "Growth Systems",
    source: "Ad and CRM targeting",
    readiness: "red",
    requiredEvidence: "Audience rule diff, QA sample set, and campaign relaunch note",
    impactArea: "Paid and lifecycle targeting",
    note: "Audience logic still reflects the old price-window model."
  }
];

export const releasePackets: ReleasePacket[] = [
  {
    packetId: "RP-07",
    audience: "Merchandising launch",
    completenessScore: 58,
    status: "red",
    blocker: "Channel feed mapping and campaign audience drift",
    launchWindowHours: 18,
    decisionNote: "Do not release until feed and campaign dependencies are reconciled."
  },
  {
    packetId: "RP-14",
    audience: "Storefront update",
    completenessScore: 74,
    status: "yellow",
    blocker: "Fallback proof still pending",
    launchWindowHours: 26,
    decisionNote: "Release is possible if storefront fallback proof clears in the next cycle."
  },
  {
    packetId: "RP-22",
    audience: "Search facet release",
    completenessScore: 81,
    status: "yellow",
    blocker: "Index rebuild window not yet confirmed",
    launchWindowHours: 32,
    decisionNote: "Hold until search rebuild timing is locked."
  },
  {
    packetId: "RP-31",
    audience: "Internal schema rollout",
    completenessScore: 94,
    status: "green",
    blocker: "No active blocker",
    launchWindowHours: 72,
    decisionNote: "Packet is safe for governed rollout."
  }
];
