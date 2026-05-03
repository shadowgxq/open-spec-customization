# frontend-business-spec

`frontend-business-spec` 是面向前端业务功能交付的 user-level OpenSpec 自定义 schema。

它把业务 Spec、Figma Skill 输入、Repo 分析、技术设计、执行任务、交付验证和用户验收后的 bugfix 回写闭环放进同一个 workflow。核心边界是：OpenSpec 管 artifact DAG 和验收承接，Figma 数据获取必须交给 `figma-mcp-cache` Skill，findings 只在 post-apply / post-user-validation 阶段生成。

## Workflow

```text
proposal
   ↓
specs / figma-intake(profile=summary) / repo-analysis
   ↓
design
   ↓
tasks
   ↓
apply + figma-mcp-cache(profile=full) subagent
   ↓
verification

post-apply:
user feedback / verification defect / visual QA failure
   ↓
spec-finding-backwrite
   ↓
findings/<date>-<slug>.md
   ↓
root cause -> minimal fix -> docs backwrite -> re-verify
```

## Artifacts

| Artifact | Output | Responsibility |
| --- | --- | --- |
| `proposal` | `proposal.md` | PRD-style scope, scenarios, acceptance, Figma applicability, capability list |
| `specs` | `specs/**/*.md` | Business behavior, user scenarios, error scenarios, boundary conditions, acceptance results |
| `figma-intake` | `figma/intake.md` | `figma-mcp-cache profile=summary` input/output archive, cache paths, visual constraints, UI states, known gaps, apply full-cache status |
| `repo-analysis` | `analysis/repo-analysis.md` | Routes, pages, components, state/data flow, API/service layers, styling, tests, risk and no-touch areas |
| `design` | `design.md` | Technical design, implementation mapping, Figma-to-UI mapping, file scope, parallel boundaries, validation strategy |
| `tasks` | `tasks.md` | Executable checklist with `Source`, `Owner`, `Write Lock`, `Parallel`, `Done`, and `Validate` |
| `verification` | `verification.md` | Business, visual, technical, regression, command, screenshot/evidence, and remaining-gap verification |

## Figma Rule

Figma 数据获取必须使用 `figma-mcp-cache` Skill：

- Figma URL parsing
- Figma MCP reads
- screenshots
- metadata
- variables
- component candidates
- apply-stage design context
- apply-stage assets
- summary planning cache and apply full cache

主 agent 和 OpenSpec 主流程不得直接调用 Figma MCP。`figma/intake.md` 只记录 Skill 输入、输出、cache path、retrieval status、视觉约束和验收承接关系，不复制 `figma-mcp-cache` 的内部规范。

如果没有 Figma 输入，也必须生成 `figma/intake.md`，状态写为 `Not applicable`，并说明视觉 hard gate 不适用。

## FF Parallel Strategy

FF / continue 阶段只执行 `figma-mcp-cache profile=summary`。这个阶段的目标是为 `specs`、`design` 和 `tasks` 提供规划级 Figma 证据，不拉完整实现上下文。

强依赖策略：

```text
proposal.md
  ↓
第一波并行：
  ├─ figma-mcp-cache(profile=summary)
  └─ repo-analysis
  ↓
第二波并行：
  ├─ specs
  └─ design
  ↓
tasks
```

适用场景：纯 UI 还原、全新页面、高度还原、`Visual Hard Gate: yes`。

弱依赖策略：

```text
proposal.md
  ↓
乐观并行：
  ├─ figma-mcp-cache(profile=summary)
  ├─ repo-analysis
  ├─ specs draft
  └─ design draft
  ↓
reconcile
  ↓
tasks
```

适用场景：功能为主、Figma 只是样式参考、现有页面局部样式调整。无论强弱依赖，`tasks.md` 都必须等 summary intake 与 repo analysis 被 reconciled 后再生成。

## Apply Figma Strategy

进入 apply 且 Figma applicable 时，主流程必须启动一个单独的 `figma-mcp-cache profile=full` subagent 补充实现级缓存。这个 subagent 写入 state cache，例如：

- `figma.design-context.tsx`
- `figma.assets.json`
- `figma.variable-defs.json`
- `figma.screenshot.png`
- `assets/`
- `apply-intake.md`

full-profile subagent 不直接写业务代码，不改 `proposal.md`、`specs/**/*.md`、`design.md` 或 `tasks.md`。主 agent 根据 `tasks.md` 执行：

- `Figma: none`：不依赖 Figma，可在 full subagent 运行时继续执行。
- `Figma: summary`：只依赖 `figma/intake.md` 的 summary 规划证据。
- `Figma: full`：必须等待 full cache 完成；如果 full cache blocked，则该 task blocked，不能猜测缺失设计数据。

## Findings

`findings` 不进入主 artifact DAG。不要把 workflow 写成：

```text
proposal -> specs -> design -> tasks -> apply -> finding
```

正确触发方式是主流程完成后，由用户验收、verification、visual QA 或验收口径变化触发 `spec-finding-backwrite`：

```text
openspec/changes/<change-id>/findings/<date>-<slug>.md
```

Finding 必须记录用户反馈、复现步骤、期望结果、实际结果、根因定位、问题分类、最小修复方案、修复记录、重新验证、文档回写矩阵和归档说明。

## Backwrite Matrix

| Problem Type | Backwrite Target |
| --- | --- |
| Scope, acceptance, PRD changed | `proposal.md` |
| Business behavior, scenarios, boundary conditions, acceptance result changed | `specs/**/*.md` |
| Figma source, visual state, visual constraint, cache evidence changed | `figma/intake.md` |
| Repository assumptions changed | `analysis/repo-analysis.md` |
| Technical design, implementation path, API, component, Figma-to-UI mapping, validation strategy changed | `design.md` |
| Task split, order, owner, write lock, validation changed | `tasks.md` |
| Verification method or result changed | `verification.md` |
| Code bug only and artifacts were correct | only `findings/*.md`, mark `No artifact backwrite required` |

## Usage

```bash
openspec schema which frontend-business-spec
openspec schema validate frontend-business-spec
openspec templates --schema frontend-business-spec

openspec new change <change-id> --schema frontend-business-spec
openspec instructions proposal --schema frontend-business-spec
openspec instructions apply --schema frontend-business-spec
```

To make it the default schema for a project:

```yaml
# openspec/config.yaml
schema: frontend-business-spec
```

## Maintenance Notes

- `schema.yaml` only uses OpenSpec's supported `artifacts` and `apply` fields so `openspec schema validate frontend-business-spec` can validate it.
- Parallel orchestration is represented through artifact dependencies and instructions: `specs`, `figma-intake`, and `repo-analysis` all require only `proposal`, so they can run in parallel. Runtime instructions distinguish strong dependency two-wave parallelism from weak dependency optimistic parallelism.
- `templates/finding.md` is intentionally unregistered. It is used by the post-apply `spec-finding-backwrite` flow, not by normal artifact generation.
- `implementation-plan.md` is not a default artifact. Its content belongs in `design.md`; complex projects can manually extend under `design/`.
