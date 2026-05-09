---
description: 任何东西都可以作为推理模型。通常是远程的（Anthropic、OpenAI、Google），但也可以是本地的（Ollama、llama.cpp）。
---

任何为 [推理](./Inference.md) 提供 [模型](./Model.md) 的东西。通常是远程服务（Anthropic、OpenAI、Google），但也可以是本地服务 - Ollama、LM Studio、在您自己的计算机上运行的 llama.cpp。 [编排层（Harness）](./Harness.md) 本身不运行模型；它要求提供商这样做。

_用法：_

“我们可以为气隙客户端离线运行这个吗？”

“将模型提供商更换为本地模型提供商 — Ollama 或 llama.cpp 在他们的盒子上。编排层并不关心，它只是到达不同的端点。”
