## Figma MCP Context

<!-- Figma URL, fileKey, nodeIds, page/component scope, owner, permissions, and target viewport/device. -->

## Subagent Orchestration

| Role | Inputs | Output Ownership | Done Signal | Blocked Reason |
|------|--------|------------------|-------------|----------------|
| Figma subagent | `proposal.md`, Figma URL, nodeIds, viewport/state scope | `figma-mcp.md`, `figma/snapshot.json`, `mcp/<change-or-page>/figma.*` | Snapshot complete and raw artifacts indexed | <!-- missing permission/source/node/state/tool output --> |

## Capture Tools

<!-- Required tools: get_metadata, get_design_context, get_variable_defs, use_figma compact node source, get_screenshot. -->

## Raw Artifact Contract

| Raw Artifact | Purpose | Required |
|--------------|---------|----------|
| `mcp/<change-or-page>/figma.source.json` | Source URL, fileKey, nodeId, tools, framework/language hints | yes |
| `mcp/<change-or-page>/figma.metadata.xml` | Figma node metadata tree | yes |
| `mcp/<change-or-page>/figma.design-context.tsx` | MCP reference code and asset URLs | yes |
| `mcp/<change-or-page>/figma.variable-defs.json` | Variables/tokens exposed by Figma | yes |
| `mcp/<change-or-page>/figma.node-source.json` | Compact Plugin API node source summary | yes |
| `mcp/<change-or-page>/figma.reference.png` | Reference screenshot for visual QA | yes |
| `mcp/<change-or-page>/figma.handoff.yaml` | Fetch status, known gaps, recommended reads | yes |

## Snapshot Contract

<!-- Record output path figma/snapshot.json, expected payload shape, completion signal, and blocked conditions. -->

## Refresh Policy

<!-- When snapshot must be refreshed: Figma URL/node changes, stale screenshot, insufficient node source, missing state, or explicit task. -->

## Example Fixture Policy

<!-- `examples/figma-mcp-format/` is only a sanitized field-shape reference. Do not copy placeholder or real project values into artifacts. -->

## Known Gaps

<!-- Missing evidence, unsupported states, unavailable assets, screenshot gaps, or permissions issues. -->

## Artifact Return Index

| Artifact | Status | Notes |
|----------|--------|-------|
| <!-- path --> | <!-- done/blocked --> | <!-- notes --> |
