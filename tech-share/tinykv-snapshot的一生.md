---
id: '2cc36b1'
time: '2020-08-07T05:56:46+08:00'
---

> 上面千根线 下面一根针
# 产生
## question: snapshot的生成是异步的 tikv用什么代码方式解决这个问题的?
send_append 会同步log 发现log被compact之后就会准备发送snapshot 如果snapshot暂时不可用 每次心跳返回时会检查对应node是否同步了最新的log 这个就还会走到检查snapshot的路径上去