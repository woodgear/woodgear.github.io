---
id: '5554007'
time: '2020-08-07T06:34:54+08:00'
---

> 现在我们凝视着这残骸，期望从中汲取到足够的信息

# what it is
当我们debug时，很重要的一步就是如何从log文件中排除干扰项快速的定位的我们想要的信息。本文介绍一些工具以及他们的使用场景，帮助我们更好的debug

# cut line range
从log文件中切出一个range
```
sed -n 'start,end p'
# start: number >=0
# end: number >=0 | $

sed -n '5,10p' # 第5到十行
sed -n '5,$p' # 第5行到结尾
```
# less jump to line
```bash
less +100g bigfile.txt
```
[less-quickly-jump-to-line-number-in-large-file](https://superuser.com/a/113044/1201083)