# Security Policy

## Scope

This repository is a **reference control plane** for catalog schema governance,
dependency mapping, and release posture across commerce workflows. It ships
synthetic, non-sensitive sample data only. It is not a production system of record
and should not be deployed with real customer, order, or catalog data without an
independent security review.

## Supported versions

| Version | Supported |
|---------|-----------|
| `v1.0-prod` and later | ✅ |
| `v0.1-shipped` (pre-hardening) | ❌ |

## Reporting a vulnerability

Please report suspected vulnerabilities privately to **security@kineticgain.com**
(or open a [GitHub security advisory](https://github.com/mizcausevic-dev/catalog-schema-governance-studio/security/advisories/new)).
Do not open a public issue for a security report.

We aim to acknowledge within 3 business days.

## Dependency posture

- Dependencies are monitored weekly via Dependabot (npm + GitHub Actions).
- CI runs `npm audit --audit-level=high` on every push and pull request.
- High/critical advisories are triaged and either patched or documented here.

### Known / accepted advisories

_None at v0.1-shipped._
