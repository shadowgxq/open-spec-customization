## Intake Status

- **Figma Applicable:** <!-- yes/no -->
- **Status:** <!-- complete/blocked/not-applicable/stale -->
- **Visual Hard Gate:** <!-- yes/no -->
- **Figma Dependency:** <!-- strong/weak/not-applicable -->
- **Last Updated:** <!-- YYYY-MM-DD or unknown -->

## Source

- **Figma URL:** <!-- source URL or Not applicable -->
- **Target Page / Frame / State:** <!-- page/frame/state -->
- **Target Viewports / Devices:** <!-- dimensions, DPR, platform when known -->
- **Fidelity Target:** <!-- exact/reference/project-convention/Not applicable -->

## Skill Contract

- **Required Skill:** `figma-mcp-cache`
- **Direct Figma MCP Access:** forbidden
- **Main Agent Rule:** Do not call Figma MCP directly. Use only cache outputs recorded here.
- **Planning Profile:** `summary`
- **Apply Profile:** `full`
- **Skill Scope:** Figma URL parsing, MCP reads, screenshots, metadata, variables, component candidates, design context, assets, and cache status.
- **FF / Continue Rule:** Use `profile=summary` only. Do not require `figma.design-context.tsx`, `figma.assets.json`, downloaded `assets/`, or `apply-intake.md` during planning.
- **Apply Rule:** Start `profile=full` through a separate subagent at apply entry. Do not block tasks marked `Figma: none` while full cache is running.

## Planning Retrieval

- **Cache Path:** <!-- figma/<cache-path> or Not applicable -->
- **Profile:** <!-- summary/not-applicable -->
- **Screenshot Path:** <!-- cached screenshot path or Not applicable -->
- **Metadata Path:** <!-- cached metadata path or Not applicable -->
- **Variable Definitions Path:** <!-- cached variables path or Not applicable -->
- **Figma Intake Path:** <!-- state-cache figma-intake.md path or Not applicable -->
- **Component Candidates Path:** <!-- state-cache component-candidates.md path or Not applicable -->
- **Retrieval Notes:** <!-- completed tools, missing tools, permissions, stale data -->

## Apply Retrieval

- **Full Profile Status:** <!-- pending/not-started/complete/blocked/not-applicable -->
- **Apply Intake Path:** <!-- state-cache apply-intake.md path or Not applicable -->
- **Design Context Path:** <!-- state-cache figma.design-context.tsx path or Not applicable -->
- **Assets Index Path:** <!-- state-cache figma.assets.json path or Not applicable -->
- **Downloaded Assets Path:** <!-- state-cache assets/ path or Not applicable -->
- **Full Cache Missing Artifacts:** <!-- missing artifacts or None/Not applicable -->
- **Full Retrieval Notes:** <!-- apply-stage subagent status, gaps, stale assets, blocked reason -->

## Visual Constraints Summary

<!-- Summarize layout, typography, color/token, spacing, component hierarchy, interaction, responsive, asset, and state constraints from the cache. Do not invent missing Figma data. -->

## UI States

- **Default:** <!-- required/not required/notes -->
- **Loading:** <!-- required/not required/notes -->
- **Empty:** <!-- required/not required/notes -->
- **Error:** <!-- required/not required/notes -->
- **Disabled:** <!-- required/not required/notes -->
- **Other:** <!-- selected/hover/focus/etc. -->

## Known Gaps

<!-- Missing permissions, unavailable nodes, incomplete states, stale screenshots, token gaps, or Not applicable. -->

## Visual Acceptance Requirements

<!-- Concrete visual checks required during tasks/apply/verification. Include screenshot evidence expectations when applicable. -->
