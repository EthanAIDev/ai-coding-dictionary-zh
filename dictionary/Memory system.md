---
description: 尝试通过持久保存到环境并在会话开始时重新加载来使智能体在会话之间保持有状态的系统。
---

尝试在 [会话](./Session.md) 上创建 [智能体（Agent）](./Agent.md) [有状态](./Stateful.md) 的系统。在会话期间将信息保留到 [环境](./Environment.md) 中，并在未来会话开始时将其重新加载到 [上下文窗口](./Context%20window.md) 中，因此智能体在用户 [清空会话](./Clearing.md) 会话之外保持连续性。

_用法：_

“我一直不得不重新告诉它我使用的是 Postgres，而不是 MySQL。”

“连接一个内存系统——将它学到的内容写入第一个 [轮次](./Turn.md) 上的 [文件系统](./Filesystem.md)，在会话开始时重新加载它。[模型](./Model.md) 本身是 [无状态](./Stateless.md)；内存层伪造了连续性。”
