import {
  dependencyRisks,
  releaseReadiness,
  schemaLane,
  summary,
  verification
} from "./catalogSchemaGovernanceService";

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root { color-scheme: dark; --bg: #08131f; --panel: #122232; --text: #ebf3f8; --muted: #9eb1bf; --accent: #59e0b5; --good: #55d49b; --warn: #ffcb63; --bad: #ff847c; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: radial-gradient(circle at top, #143046 0%, var(--bg) 54%); color: var(--text); }
      a { color: inherit; text-decoration: none; }
      .shell { width: min(1180px, calc(100vw - 40px)); margin: 28px auto 40px; }
      .topbar, .card, .table-wrap { background: rgba(18, 34, 50, 0.95); border: 1px solid rgba(158, 177, 191, 0.16); border-radius: 26px; box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24); }
      .topbar { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 18px; padding: 28px 30px; }
      .brand { display: flex; gap: 18px; align-items: flex-start; max-width: 720px; }
      .badge { width: 58px; height: 58px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(89, 224, 181, 0.35), rgba(80, 214, 255, 0.2)); font-weight: 800; letter-spacing: 0.08em; }
      .eyebrow { color: var(--muted); text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; }
      h1, h2, h3, p { margin: 0; }
      h1 { margin-top: 6px; font: 700 42px/1.05 Georgia, serif; }
      .brand p { margin-top: 10px; color: var(--muted); max-width: 620px; font-size: 17px; line-height: 1.6; }
      nav { display: flex; flex-wrap: wrap; gap: 12px; align-content: flex-start; }
      nav a { padding: 12px 16px; border-radius: 999px; border: 1px solid rgba(158, 177, 191, 0.16); color: var(--muted); font-weight: 600; }
      nav a.active { color: var(--bg); background: linear-gradient(135deg, var(--accent), #90f0ff); }
      .section { padding: 30px; }
      .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
      .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
      .stat { padding: 18px; border-radius: 22px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(158, 177, 191, 0.12); }
      .stat label { display: block; color: var(--muted); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
      .stat strong { display: block; margin-top: 10px; font-size: 36px; }
      .stat span { display: block; margin-top: 8px; color: var(--muted); line-height: 1.5; }
      .table-wrap { overflow: hidden; margin-top: 22px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 16px 18px; text-align: left; border-bottom: 1px solid rgba(158, 177, 191, 0.12); vertical-align: top; }
      th { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; }
      td { line-height: 1.5; }
      tr:last-child td { border-bottom: none; }
      .tag { display: inline-flex; padding: 6px 10px; border-radius: 999px; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.12em; }
      .tag.red { background: rgba(255, 132, 124, 0.18); color: var(--bad); }
      .tag.yellow { background: rgba(255, 203, 99, 0.18); color: var(--warn); }
      .tag.green { background: rgba(85, 212, 155, 0.18); color: var(--good); }
      .list { display: grid; gap: 14px; }
      .item { padding: 18px; border-radius: 20px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(158, 177, 191, 0.12); }
      .item p, .footer-note { margin-top: 8px; color: var(--muted); line-height: 1.6; }
      .section-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 22px; margin-top: 22px; }
      code { color: var(--accent); }
      @media (max-width: 960px) { .section-grid, .stat-grid { grid-template-columns: 1fr; } h1, h2 { font-size: 34px !important; } .shell { width: min(100vw - 24px, 1180px); } .topbar, .section { padding: 22px; } }
    </style>
  </head>
  <body>
    <div class="shell">${body}</div>
  </body>
</html>`;
}

function topbar(active: string) {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/schema-lane", label: "Schema Lane" },
    { href: "/dependency-risks", label: "Dependency Risks" },
    { href: "/release-readiness", label: "Release Readiness" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<div class="topbar"><div class="brand"><div class="badge">KG</div><div><div class="eyebrow">Catalog Schema Governance Studio</div><h1>Commerce catalog and release control plane</h1><p>Schema changes, dependency blockers, and release posture in one operator surface for merchandising and platform teams.</p></div></div><nav>${links.map((link) => `<a class="${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</nav></div>`;
}

function stateClass(value: "red" | "yellow" | "green") {
  return value;
}

export function renderOverview() {
  const metrics = summary();
  return layout("Catalog Schema Governance Studio", `${topbar("/")}
    <div class="card section">
      <div class="eyebrow">Overview</div>
      <h2 style="margin: 6px 0 10px; font: 700 48px/1 Georgia, serif;">Catalog releases fail when schema changes, feed blockers, and launch posture are split apart.</h2>
      <p>This studio makes the operating layer explicit: which fields are changing, which dependencies are still blocked, and which release packets need intervention before launch or discovery breaks.</p>
      <div class="stat-grid">
        <div class="stat"><label>Schema changes</label><strong>${metrics.schemaChanges}</strong><span>Active field changes tied to domain, owner, and next action.</span></div>
        <div class="stat"><label>Urgent changes</label><strong>${metrics.urgentChanges}</strong><span>Red changes where launch or targeting risk is already building.</span></div>
        <div class="stat"><label>Blocked dependencies</label><strong>${metrics.blockedDependencies}</strong><span>Storefront, feed, and growth blockers still waiting on proof.</span></div>
        <div class="stat"><label>Risky packets</label><strong>${metrics.riskyPackets}</strong><span>Release packets with visible go/no-go pressure.</span></div>
      </div>
      <div class="footer-note">${metrics.recommendation}</div>
    </div>`);
}

export function renderSchemaLane() {
  return layout("Catalog Schema Governance Studio — Schema Lane", `${topbar("/schema-lane")}<div class="card section"><div class="eyebrow">Schema Lane</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">The queue should show which field is changing, why it matters, and who owns the next move.</h2><p>Each row ties catalog context to storefront risk, downstream systems, and the action needed to preserve release reliability.</p></div><div class="table-wrap section"><table><thead><tr><th>Change</th><th>Excerpt</th><th>Owner</th><th>Next Action</th><th>Risk</th></tr></thead><tbody>${schemaLane().map((item)=>`<tr><td><strong>${item.domain}</strong><br />${item.changeId}<br />${item.field}</td><td>${item.excerpt}</td><td>${item.owner}</td><td>${item.nextAction}</td><td><span class="tag ${stateClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div>`);
}

export function renderDependencyRisks() {
  return layout("Catalog Schema Governance Studio — Dependency Risks", `${topbar("/dependency-risks")}<div class="card section"><div class="eyebrow">Dependency Risks</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Most catalog failures are actually dependency failures with a missing proof packet.</h2><p>This lane maps blocker sources to required evidence, owner lanes, readiness, and the impact area if the dependency stays unresolved.</p></div><div class="section-grid"><div class="table-wrap section"><table><thead><tr><th>Blocker</th><th>Required Evidence</th><th>Owner</th><th>Readiness</th></tr></thead><tbody>${dependencyRisks().map((item)=>`<tr><td><strong>${item.blocker}</strong><br />${item.source}<br />${item.impactArea}</td><td>${item.requiredEvidence}</td><td>${item.owner}</td><td><span class="tag ${stateClass(item.readiness)}">${item.readiness}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Dependency Blockers</div><h3>Where catalog release recovery is likely to stall.</h3><div class="list">${dependencyRisks().map((item)=>`<div class="item"><strong>${item.riskId} · ${item.owner}</strong><p>${item.note}</p><span>${item.source} · ${item.impactArea}</span></div>`).join("")}</div></div></div>`);
}

export function renderReleaseReadiness() {
  return layout("Catalog Schema Governance Studio — Release Readiness", `${topbar("/release-readiness")}<div class="card section"><div class="eyebrow">Release Readiness</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Release posture matters when the next launch window is shorter than the next dependency cycle.</h2><p>This lane surfaces which packets are safe, which still have blockers, and where launch risk needs immediate intervention.</p></div><div class="card-grid" style="margin-top: 22px;">${releaseReadiness().map((packet)=>`<div class="card section"><div class="eyebrow">${packet.packetId}</div><h3>${packet.audience}</h3><div class="stat-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0;"><div class="stat"><label>Completeness</label><strong style="font-size: 30px;">${packet.completenessScore}%</strong><span>${packet.audience}</span></div><div class="stat"><label>Status</label><strong style="font-size: 30px;"><span class="tag ${stateClass(packet.status)}">${packet.status}</span></strong><span>${packet.blocker}</span></div></div><div class="footer-note">${packet.launchWindowHours} hours to launch window · ${packet.decisionNote}</div></div>`).join("")}</div>`);
}

export function renderVerification() {
  return layout("Catalog Schema Governance Studio — Verification", `${topbar("/verification")}<div class="card section"><div class="eyebrow">Verification</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">What this repo proves about catalog governance and commerce systems.</h2><div class="list">${verification().map((item)=>`<div class="item"><strong>${item}</strong></div>`).join("")}</div></div>`);
}

export function renderDocs() {
  return layout("Catalog Schema Governance Studio — Docs", `${topbar("/docs")}<div class="card section"><div class="eyebrow">Docs</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A studio for schema changes, dependency blockers, and release-safe commerce governance.</h2><p>This repo models the operating layer between catalog change intake and release reliability: field visibility, downstream evidence, launch posture, discovery impact, and operator-safe interventions.</p><div class="footer-note">Routes: <code>/</code> · <code>/schema-lane</code> · <code>/dependency-risks</code> · <code>/release-readiness</code> · <code>/verification</code> · <code>/docs</code></div></div>`);
}
