# OpenSpec 自定义 Schemas

本目录存放本机 user-level OpenSpec schemas。每个一级子目录都是一个独立 schema，目录内必须包含 `schema.yaml` 和对应 `templates/`。

## 当前 Schemas

| Schema | 定位 | 适用场景 | 入口文档 |
| --- | --- | --- | --- |
| `spec-parallel` | 通用需求交付 workflow | 普通功能、后端/API、非强 UI 还原任务 | `spec-parallel/README.md` |
| `figma-ui-restore` | Figma 驱动的 UI 高保真还原 workflow | 从 Figma/MCP 数据还原前端页面，并强制视觉验收 | `figma-ui-restore/README.md` |

## 选择规则

- 使用 `spec-parallel`：当任务重点是需求拆解、技术方案、行为 spec、实现 tasks 和 bugfix 回写。
- 使用 `figma-ui-restore`：当任务重点是根据 Figma 设计稿还原 UI，并需要 `figma/snapshot.json`、`ui-contract.md`、`implementation-map.md`、`visual-qa.md` 形成强约束链路。

## 文档组织策略

保留每个 schema 子目录内的说明文档，同时新增本根目录说明文档。

原因：

- 根目录 `README.md` 负责 schema 列表、选择规则和全局维护约定。
- 子目录文档负责该 schema 的具体 artifact 流程、source-of-truth 规则、模板语义和校验方式。
- 删除子目录文档会让使用者进入某个 schema 后缺少局部上下文；所有细节集中到根文档也会导致维护成本和冲突变高。

## 校验命令

```bash
openspec schema which spec-parallel
openspec schema validate spec-parallel

openspec schema which figma-ui-restore
openspec schema validate figma-ui-restore
```

## 维护约定

- 新增 schema 时，优先创建独立一级目录，不要塞进已有 schema 的 `docs/`。
- 每个 schema 保持自己的 `README.md` 或等价说明文档。
- 跨 schema 的总览、选择规则和维护约定写在本文件。
- 示例数据只能使用脱敏 fixture，不要提交真实 Figma `fileKey`、`nodeId`、业务文案或资产 URL。
