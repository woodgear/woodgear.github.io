---
id: '8717a4'
time: '2020-11-26T13:57:53+08:00'
---
大致猜想
1. 每个docker都有自己的network namespace
2. 如果修改docker的namespace那么他们就能互联
3. 如果修改当前shell的namespace那么他们也能互联

## 实验
1. 起两个docker想办法将他们加到同一个network namespace中
