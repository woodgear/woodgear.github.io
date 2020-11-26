---
id: 'vc3atkq'
time: '2019-12-08T23:50:03+08:00'
title: redis原理
---

![redis](./redis.png "open in new tab to see big picture")


# 常用操作与概念
## 结构组成
如果说mysql是数据库表这种结构的话,Redis种就很简单粗暴,只有词典,只有kv,在查询是通过对key的正则匹配查询来区分模块.