---
time: '2020-08-12T10:40:53.000Z'
id: '1e03ace'
---

## 追求性能
追求性能的方式实际上是
1. 从业务的角度将所有能并行的逻辑并行 不过这里要考虑Amdahl定律和并行本身会带来的性能和理解成本
2. 异步 绝对不要阻塞 最大化的利用CPU
3. 从业务的角度 减少要处理的业务 即优化流程 
### raft性能优化手段
1. ReadIndex (业务)
2. batching pipe (流量塑型)

## 信息交换
这里我们关注于通过msg的交互 raft的node从中获取到了什么信息
### 心跳
心跳实际上是empty的AppendEntries 从etcd/raft-rs的实现看 
Request 标识的是leader的commit和commit Response标识的是follower的term 是commit更新的手段
## commit 传播
## log-replcation 传播
