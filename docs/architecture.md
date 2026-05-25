# Architecture

## Overview

`catalog-schema-governance-studio` is a lightweight TypeScript + Express studio for modeling the operating layer between catalog attribute changes, merchandising dependencies, and release-safe shipping posture.

## Surfaces

- `overview`
  - active schema changes
  - blocked dependencies
  - release-ready changes
  - governance recommendation
- `schema-lane`
  - field-by-field change queue
  - owner routing
  - downstream impact
- `dependency-risks`
  - storefront, feed, ads, and analytics blockers
  - required evidence
  - readiness posture
- `release-readiness`
  - change packets
  - completeness score
  - go/no-go timing
- `verification`
  - what the repo proves about catalog-governance systems

## Data Model

- `SchemaChange`
  - domain, field, owner, risk, downstream impact, next action
- `DependencyRisk`
  - blocker, source, required evidence, owner, readiness, impact area
- `ReleasePacket`
  - audience, completeness score, launch window, blocker, decision note

## Design Principle

Catalog state should be inspectable by merchandising, growth, product, and platform stakeholders. The system should explain:
- which schema change is under pressure right now
- which downstream dependency is still missing
- who owns the next move
- where launch or feed risk is building
