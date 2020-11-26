---
time: '1996-09-08T23:37:07+08:00'
id: 'jqapm5l'
---

# Mysql 树形结构查询
# 对于树执行的操作
* 区间查询 给定父节点 查询所有子节点(所有)
* 给定子节点查询父节点
* 给定父节点查询 单层子节点(儿子)

## 邻接表模型(adjacency list)
adjacency list 简单的讲就是通过id 和parent来维护父子关系 root元素的parent为null
```sql
CREATE TABLE category(
id INT AUTO_INCREMENT PRIMARY KEY,
parent INT DEFAULT NULL);
```
adjacency list 的查询通过嵌套的子查询语句组成 每层嵌套查询出当前id的所有1级子元素
## Nested Set Model
通过维护左右两个区间来维护 父子关系 
查询子元素 只要比较 元素的左右区间是否在父元素上即可
与adjacency list 的区别最大就是通过两个区间 提供足够的信息 使得我们能够直接判断出 元素是否为另一元素的子元素.
adjacency list 不能直接做到这一点 因为子节点还可以有子节点 而adjacency list只是通过parent维护了直系关系

Nested Set 的缺点是增加node时要关系其他节点的区间 本质原因是Nested Set使用来区间的概念 而区间是映射到数字上 固定分配的 你没法在1-2直接插入第三个值

# 参考文档