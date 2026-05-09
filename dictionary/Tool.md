---
description: 编排层公开供智能体调用的函数 - 读取、写入、Bash、搜索。智能体如何感知环境并对其采取行动。
---

[编排层（Harness）](./Harness.md) 公开供 [智能体（Agent）](./Agent.md) 调用的函数 — Read、Write、Bash、Search。工具是智能体感知和作用于 [环境](./Environment.md) 的方式：除了通过 [工具结果](./Tool%20result.md) 之外，它无法看到环境，并且除了通过 [工具调用](./Tool%20call.md) 之外，它无法更改环境。每个工具调用都会花费额外的 [模型提供商请求](./Model%20provider%20request.md) ，因为结果必须返回到模型才能决定下一步做什么。

_用法：_

“智能体可以直接查询分期吗？”

“将 `psql` 工具添加到工具中，在暂存时范围为只读。如果没有工具，智能体将无法看到 [文件系统](./Filesystem.md) 之外的任何内容。”
