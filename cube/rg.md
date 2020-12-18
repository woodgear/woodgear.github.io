---
time: '1996-09-08T23:37:07+08:00'
id: 'pvzf7nx'
---

# hide file name
--no-filename
# only show match
`rg -o 'REGEX' FILE  `
# only show captureed group
```bash
# 注意位置和单引号
rg 'name:(.*)' -o -r '$1'
```
# only show file name
```
rg -l
```
# dnot show line number
```
rg -N
```
# serach but filter some file
```sh 
// 注意加引号
rg curl -g '*.toml'
// 忽略某些文件夹
rg xx -g '!data/*'
```
# ignore case
```sh
rg -i
```
# 显示那些没有命中匹配的行
术语: invert-match
`rg -v REGEX`

# or
```regex
(aaaa|bbbbb)
```
[online-demo](https://regex101.com/r/NF4LZX/1)
# search in all folder
```bash
rg --no-ignore --hidden 'xx'
```