# Figma MCP 数据格式参考

本目录只描述 Figma MCP 相关数据的大致字段形态，供 `figma-ui-restore` schema 的指令和 agent 生成 artifact 时参考。

这些文件不是正式工作流产物，也不是任何项目的真实 Figma 数据。生成实际 OpenSpec change 时，正式设计输入仍然必须来自该 change 内的 `figma/snapshot.json`。

## 文件说明

- `figma.source.example.json`: 记录一次 Figma MCP 抓取来源的字段形态。
- `figma.handoff.example.yaml`: 记录 Figma MCP 缓存 handoff 的字段形态。
- `figma.metadata.example.xml`: 展示 `get_metadata` 类响应可包含的节点结构。
- `figma.design-context.example.tsx`: 展示 `get_design_context` 类响应可包含的参考代码形态。
- `figma.variable-defs.example.json`: 展示 `get_variable_defs` 类响应可包含的变量映射形态。
- `figma.node-source.example.json`: 展示 `use_figma` compact serializer 可包含的节点源码摘要形态。

## 使用规则

- 可以参考字段命名、输出路径组织和 handoff 语义。
- 不要复制示例中的 placeholder `fileKey`、`nodeId`、文案、颜色或组件名到正式 artifact。
- 不要把本目录作为 `tasks.md` 或 `apply` 的设计输入。
- `tasks.md` 和 `apply` 的设计输入只能是当前 change 固化后的 `figma/snapshot.json`。
