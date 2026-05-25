import { payload, summary } from "../src/services/catalogSchemaGovernanceService";

console.log("catalog-schema-governance-studio demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().rules, null, 2));
