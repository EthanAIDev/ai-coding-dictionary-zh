---
description: 参数。无状态，只做下一个 Token 预测。模型本身不能直接当作智能体使用。
---

[参数](./Parameters.md)。[无状态](./Stateless.md)：只执行[下一个 Token 预测](./Next-token%20prediction.md)。`Claude Opus 4.7` 和 `GPT-5` 都是模型。模型本身不能执行“智能体级”的动作，它必须被[编排层（Harness）](./Harness.md)包裹起来。

_用法：_

“我们在规划阶段要不要把模型从 Sonnet 换成 Opus？”

“可以试，但这个任务的大头通常由编排层决定。如果[系统提示词](./System%20prompt.md)和[工具](./Tool.md)配置不对，换模型也救不了。”
