---
description: Model Context Protocol，用于把外部工具服务器接入编排层的协议。
---

**MCP（Model Context Protocol）**是一种协议，用来把外部工具服务器接入[编排层（Harness）](./Harness.md)。也就是[智能体（Agent）](./Agent.md)如何获得“编排层默认能力之外”的[工具](./Tool.md)。智能体不会“调用 MCP”，它调用的是具体工具，只不过这个工具来自 MCP 服务器。MCP 也可暴露资源（只读数据）和提示模板，但最核心用途仍是工具接入。

_用法：_

“它怎么拿到 Jira 权限的？”

“通过 MCP。编排层挂了 Jira 工具服务器，智能体调的是 Jira 工具，不是直接调 MCP 协议本身。”
