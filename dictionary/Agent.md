---
description: 被工具、系统提示词和上下文窗口编排起来，并与用户轮流交互的模型。也就是“运行中的模型”。
---

一个[模型](./Model.md)被[编排层（Harness）](./Harness.md)包裹后，接入[工具](./Tool.md)、[系统提示词](./System%20prompt.md)和[上下文窗口](./Context%20window.md)，并与用户按[轮次](./Turn.md)互动，就形成了一个“智能体（Agent）”。_Claude Code 是一种智能体，Cursor 是一种智能体，Claude.ai 也是一种智能体。_ 你真正对话的对象是智能体，而不是裸模型。

_避免：_“AI”“机器人”这种说法太笼统，容易混淆你指的是模型参数，还是编排后的系统。

_用法：_

“这次迁移你用的是哪个智能体？”

“本地用 Claude Code，UI 用 Cursor。底层模型一样，但编排层不一样。”
