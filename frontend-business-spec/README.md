# frontend-business-spec

`frontend-business-spec` 是一个面向前端业务功能交付的 OpenSpec 自定义工作流。

它解决的问题：

```text
业务需求如何转成稳定的前端实现
Figma 视觉还原如何接入 OpenSpec
代码仓库分析如何参与设计
apply 阶段如何安全并行
用户验收后的 bug 如何复现、修复、回写文档
```

核心原则：

```text
specs 只写业务行为
figma-intake 只承接 Figma Skill 输出
repo-analysis 只分析代码现状
design 负责技术设计 + 实现映射
tasks 负责可执行任务
verification 负责验收计划和执行结果
findings 只在用户验收后触发
```

## 主流程

```text
proposal
   ↓
┌────────────────┬────────────────────┬────────────────┐
↓                ↓                    ↓
specs        figma-intake          repo-analysis
业务行为       Figma Skill 输入       代码仓库分析
↓                ↓                    ↓
└────────────────┴────────────────────┘
                 ↓
              design
                 ↓
              tasks
                 ↓
              apply
                 ↓
           verification
```

用户验收后：

```text
user feedback / verification defect
        ↓
spec-finding-backwrite skill
        ↓
findings/<date>-<slug>.md
        ↓
reproduce → root cause → minimal fix → docs backwrite → re-verify
```

## Artifact 一览

| Artifact | Output | Responsibility |
| --- | --- | --- |
| `proposal` | `proposal.md` | PRD-style source of truth for scope, user scenarios, acceptance, and optional Figma input |
| `specs` | `specs/**/*.md` | Business behavior and scenario specifications |
| `figma-intake` | `figma/intake.md` | Figma skill intake contract, cache summary, visual constraints, and known gaps |
| `repo-analysis` | `analysis/repo-analysis.md` | Repository, route, component, styling, API, state, validation, and reuse analysis |
| `design` | `design.md` | Technical design, implementation mapping, component split, Figma mapping, and parallelization guidance |
| `tasks` | `tasks.md` | Single-responsibility executable tasks for apply |
| `verification` | `verification.md` | Verification plan before apply and execution log after apply |

## 模板约束

- `proposal.md`：PRD 风格，包含 scope、acceptance 和 Figma input。
- `specs/**/*.md`：只写业务行为、场景、边界和验收，不写实现细节。
- `figma/intake.md`：只记录 `figma-mcp-cache` Skill 输出、cache path、视觉约束和 known gaps。
- `analysis/repo-analysis.md`：只分析仓库现状、可复用面、风险面和验证命令。
- `design.md`：写技术设计、组件拆分、实现映射、并行边界和验证策略，不写 checkbox tasks。
- `tasks.md`：每个 task 必须单一职责，必须可验证，并包含 `Depends On`。
- `verification.md`：apply 前是 plan，apply 后必须回填 execution results。
- `findings/*.md`：只在用户验收后或 verification 发现明确 defect 后创建。

## Figma 规则

```text
Figma 数据获取必须走 figma-mcp-cache。
主 agent 不允许直接调用 Figma MCP。
figma-intake 只记录 Skill 输出和 cache 结果。
Figma: full 的 task 必须有 full cache。
```

补充约束：

- 如果 `Figma Dependency = none`，也必须生成 `figma/intake.md`，并写 `Not applicable`。
- `figma/intake.md` 不复制 `figma-mcp-cache` 内部命令。
- 主流程只消费 `figma/intake.md` 记录的 cache path、缺失项和视觉约束。

## Apply 并行规则

```text
只有满足以下条件才能并行：
Parallel = yes
Write Lock 不重叠
Owner 不冲突
Depends On 已完成
Validate 明确
```

`apply` 阶段必须先读取：

```text
proposal.md
specs/**/*.md
figma/intake.md
analysis/repo-analysis.md
design.md
tasks.md
verification.md
```

然后按 `Depends On` 顺序执行任务，并在执行过程中同步更新：

- `tasks.md`
- `verification.md`

如果任务标记为 `Figma: full` 但缺少 full cache，停止并刷新 `figma-intake`，不要直接绕过约束。

## Findings 规则

```text
findings 不进入主 DAG。
findings 只在用户验收后或 verification 发现明确 defect 后触发。
触发后使用 spec-finding-backwrite skill。
finding 必须包含复现、根因、最小修复、回写矩阵、重新验证。
```

## 推荐目录结构

```text
frontend-business-spec/
  schema.yaml
  README.md
  templates/
    proposal.md
    spec.md
    figma-intake.md
    repo-analysis.md
    design.md
    tasks.md
    verification.md
    finding.md

openspec/changes/<change-id>/
  proposal.md
  design.md
  tasks.md
  verification.md

  specs/
    <capability>/spec.md

  figma/
    intake.md

  analysis/
    repo-analysis.md

  findings/
    <date>-<slug>.md
```

## 执行规则

主流程：

```text
proposal 完成后，并行启动：
1. specs subagent
2. figma-intake subagent
3. repo-analysis subagent

三者全部完成后，才能生成 design.md。
design.md 完成后，生成 tasks.md。
tasks.md 完成后，进入 apply。
apply 后更新 verification.md。
```

最终工作流：

```text
proposal
→ specs / figma-intake / repo-analysis 并行
→ design
→ tasks
→ apply
→ verification

post-apply:
→ spec-finding-backwrite
→ findings/*.md
→ docs backwrite
```

## 使用方式

```bash
openspec schema which frontend-business-spec
openspec schema validate frontend-business-spec
openspec templates --schema frontend-business-spec

openspec new change <change-id> --schema frontend-business-spec
openspec instructions proposal --schema frontend-business-spec
openspec instructions apply --schema frontend-business-spec
```
