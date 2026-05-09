---
description: 会话早期通常更聪明、更聚焦；会话拉长后会进入“迟钝区”，错误率上升。
aliases:
  - 智能区
  - 迟钝区
  - Smart zone / Dumb zone
---

在 [会话](./Session.md) 早期，[智能体（Agent）](./Agent.md) 常处于“智能区”：理解快、注意力集中、关键约束抓得住。随着会话拉长，容易进入“迟钝区”：更容易漏条件、忘上下文、犯低级错，且更常出现忠实性[幻觉](./Hallucination.md)。

底层机制通常与[注意力退化](./Attention%20degradation.md)有关：同一个 [模型](./Model.md)、同一个 [编排层（Harness）](./Harness.md)，只是 [上下文](./Context.md) 越来越重。

实务上，一旦你明显感到“越做越飘”，优先 [清空会话](./Clearing.md) 或 [压缩总结](./Compaction.md)，别硬扛。

_用法：_

“前三个模块都很准，第四个开始乱了。”

“已经离开智能区了。压缩后重载计划，再继续下一块。”
