# 自定义 OpenSpec 通用工作流说明

本文档基于当前目录结构与 `schema.yaml`，用于说明 `spec-parallel` 通用 OpenSpec 工作流的阶段、subagent 并行语义、产物依赖和 Bugfix 回写规则。

## 当前结构

```text
.
├── schema.yaml
├── templates/
│   ├── proposal.md
│   ├── spec.md
│   ├── design.md
│   ├── tasks.md
│   └── finding.md
├── docs/
    └── ui-workflow-seed/
        ├── README.md
        ├── templates/
        │   ├── figma-mcp.md
        │   └── figma-snapshot.json
        └── examples/
            └── figma-mcp-format/
../figma-ui-restore/
├── schema.yaml
├── templates/
└── examples/
```

- `schema.yaml`: 定义通用 workflow 的 artifact 生成规则、依赖关系和 apply 阶段行为。
- `templates/`: 当前通用 workflow 的正式模板。
- `docs/ui-workflow-seed/`: Figma/MCP 相关素材，不属于当前通用 schema。
- `../figma-ui-restore/`: 独立的 Figma UI 还原专用 schema，和 `spec-parallel` 同级。

## 核心工作流

```mermaid
flowchart TD
    A["用户提出变更目标"] --> B["proposal.md<br/>PRD: 需求、场景、边界、验收"]

    B --> C1["specs subagent<br/>specs/**/*.md<br/>OpenSpec delta: 行为和场景变化"]
    B --> C2["design subagent<br/>design.md<br/>技术方案: 架构、API、组件、决策"]

    C1 --> C3["主 agent<br/>等待、冲突检查、整合"]
    C2 --> C3
    C3 --> D["tasks.md<br/>单一职责实现任务清单"]

    D --> E["apply<br/>按 tasks.md 执行并勾选任务"]
    E --> F{"apply/validation 是否发现 bug 或异常？"}
    F -- "否" --> G["完成变更，可进入后续归档"]
    F -- "是" --> H["finding.md<br/>复现、根因、最小修复、验证、回写矩阵"]
    H --> I["按 finding.md 回写 proposal/design/specs/tasks"]
    I --> E
```

## 产物职责

### proposal.md

`proposal.md` 是 PRD/source of truth for scope and acceptance，负责回答要解决什么问题、为谁解决、验收边界是什么。

必须覆盖：

- 需求概述
- 核心功能描述
- 用户场景，包含主流程、替代流程、失败或边界流程
- 功能详情，包含中等粒度的产品和技术约束
- 边界条件，包含 in scope、out of scope、assumptions、acceptance criteria
- Capabilities，定义后续要创建或修改的 `specs/<capability>/spec.md`
- Impact，说明影响到的代码、API、依赖、系统、用户或运维流程

如果 Bugfix 后发现范围或验收口径变化，需要回写 `proposal.md`。

### design.md

`design.md` 是技术方案/source of truth for implementation decisions，负责回答如何实现 proposal 并满足 specs。

`design.md` 必须由独立 design subagent 生成。该 subagent 的写入范围只限 `design.md`，不得写 `specs/**/*.md` 或 `tasks.md`。

必须覆盖：

- 需求概述
- 架构设计
- API 设计；无 API 变化时写 `Not applicable`
- 组件设计
- 技术决策与取舍
- 风险与缓解
- Open Questions；无未决问题时写 `None`

如果 Bugfix 后发现实现路径或技术决策变化，需要回写 `design.md`。

### specs/**/*.md

`specs/**/*.md` 是 OpenSpec 行为归档，负责描述可测试的行为变化和场景。

`specs/**/*.md` 必须由独立 specs subagent 生成。该 subagent 的写入范围只限 `specs/**/*.md`，不得写 `design.md` 或 `tasks.md`。

职责边界：

- 使用 `## ADDED/MODIFIED/REMOVED/RENAMED Requirements`
- 每个 requirement 使用 `### Requirement:`
- 每个 scenario 使用 `#### Scenario:`
- 使用 SHALL/MUST 描述规范行为
- 不承载架构设计或任务清单
- 只在需要消除行为歧义时引用 `design.md`

如果 Bugfix 后发现行为或场景变化，需要回写对应 `specs/<capability>/spec.md`。

### tasks.md

`tasks.md` 是 apply 阶段唯一进度追踪入口，负责把 proposal/design/specs 拆成单一职责的可执行任务。

`tasks.md` 由主 agent 在 specs subagent 和 design subagent 都完成后生成。主 agent 必须先检查两个并行 lane 的输出是否存在范围、行为、接口或实现决策冲突。

规则：

- 使用编号分组，例如 `## 1. API Behavior`
- 每个任务必须是 checkbox：`- [ ] X.Y Task description`
- 每个任务应有明确完成信号
- 按依赖顺序排列
- 包含必要的测试、回归和验收任务

如果 Bugfix 后发现任务拆分或执行顺序不合理，需要回写 `tasks.md`。

### finding.md

`finding.md` 是可选 Bugfix 记录，不属于普通 feature planning 的必需产物。

触发条件：

- apply 或 validation 过程中发现 bug
- 发现回归、异常行为、实现结果不符合预期
- 需要记录复现、根因、最小修复和验证结论

`finding.md` 必须给出文档回写矩阵：

| Artifact | 回写触发条件 |
| --- | --- |
| `proposal.md` | scope 或 acceptance 发生变化 |
| `design.md` | implementation path 或 technical decision 发生变化 |
| `specs/<capability>/spec.md` | behavior 或 scenario 发生变化 |
| `tasks.md` | task breakdown 或 execution order 被证明错误 |

如果无需回写，需要明确记录 `No additional artifact backwrite required`。

## Artifact 依赖关系

| Artifact | 生成文件 | 依赖 |
| --- | --- | --- |
| `proposal` | `proposal.md` | 无 |
| `specs` | `specs/**/*.md` | `proposal` |
| `design` | `design.md` | `proposal` |
| `tasks` | `tasks.md` | `specs`, `design` |
| `finding` | `finding.md` | `tasks`，仅 Bugfix/异常修复时使用 |
| `apply` | 修改代码并追踪 `tasks.md` | `tasks` |

## Subagent 并行语义

- `schema.yaml` 中的 `||` 表示必须使用 Codex subagent 并行处理，而不只是文档上的逻辑并行。
- `specs` 与 `design` 都只依赖 `proposal`，二者不存在 OpenSpec `requires` 层面的相互依赖。
- 主 agent 负责 orchestration：分派 subagent、等待结果、检查冲突、生成下游 `tasks.md`。
- 并行 lane 的写入范围必须互斥：specs subagent 只写 `specs/**/*.md`，design subagent 只写 `design.md`。
- apply 阶段如果 `tasks.md` 中存在无共享写入冲突的独立任务组，也应按 Codex subagent 规范拆分执行。

## 工作流要点

- 先用 `proposal.md` 固定需求、场景、边界和验收口径。
- `specs` 和 `design` 从 proposal 通过 subagent 并行生成，但职责不同：specs 管行为，design 管实现方案。
- `tasks.md` 只在 specs 和 design subagents 都完成且主 agent 完成一致性检查后生成，并作为 apply 的唯一进度来源。
- `finding.md` 只在 Bugfix 或异常调查时出现，用于记录复现、根因、最小修复、验证和回写决策。
- Figma/MCP 不属于当前通用 workflow；真正的 UI 还原流程已拆分到同级 schema `../figma-ui-restore/`。
