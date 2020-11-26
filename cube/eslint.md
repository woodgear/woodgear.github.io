---
time: '1996-09-08T23:37:07+08:00'
id: '0pclsny'
---

# how to disable rule
## 全局修改
在eslint 配置文件中的rules中修改
```json
  rules: {
    "promise/param-names":"off"
  }
```
## 局部修改
通过注释来设置 (可以设在函数定义上 作用范围为整个函数))
```js
/* eslint prefer-promise-reject-errors: "off" */
```