# UI/Figma Workflow Seed

This directory preserves the Figma/MCP artifacts that were removed from the generic `spec-parallel` workflow.

They are not part of the active generic schema. The dedicated UI-specific schema now lives at `/home/gxq/.local/share/openspec/schemas/figma-ui-restore/`.

## Contents

- `templates/figma-mcp.md`: Planning contract template for Figma MCP extraction and refresh policy.
- `templates/figma-snapshot.json`: Minimal snapshot shape used by a UI/Figma workflow.
- `examples/figma-mcp-format/`: Sanitized examples that show approximate Figma MCP cache and handoff field shapes.

## Rules

- Do not reference these files from the generic `schema.yaml`.
- Do not treat examples here as real design data.
- The dedicated UI workflow should define its own Figma artifact dependencies and source-of-truth policy explicitly.
