---
tag: regex
time: '1996-09-08T23:37:07+08:00'
id: 'zej73z7'
---

# not space
[^\s]

# regex online
[regex101](https://regex101.com/)
# 非某个单词
[利用正则表达式排除特定字符串](https://www.cnblogs.com/wangqiguo/archive/2012/05/08/2486548.html)
>正则：^(?!bid:u).*$  匹配结果就是第2行，也就是第1行被排除了
这里使用了零宽度断言(?!exp),注意，我们有一个向前查找的语法(也叫顺序环视)  (?=exp)
(?=exp) 会查找exp之前的【位置】如果将等号换成感叹号，就变成了否定语义，也就是说查找的位置的后面不能是exp
一般情况下?!要与特定的锚点相结合，例如^行开头或者$行结尾，那么上面的例子的意思如下：
^(?!bid:u).*$ 先匹配一个行开头的位置，并且要求接下来的位置的后面不是bid:u这个字符串。这样由于第一行^之后的位置后面是bid:u所以匹配失败，被排除在外了。


[online-demo](https://regex101.com/r/SoP7B4/1)

# or
```regex
(aaaa|bbbbb)
```
[online-demo](https://regex101.com/r/NF4LZX/1)

# 匹配中文
```bash
(^[^\x00-\xff]+)
```
# 匹配重复
```bash
(^\w+)\n+\1
# +1 匹配第一个capture-group
```
