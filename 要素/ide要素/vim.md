---
time: '1996-09-08T23:37:07+08:00'
id: 'd4iaol0'
---

# l-config
一般来讲是 ~/.vimrc
在vim中可以通过 `:e $MYVIMRC` 来快速打开
# mutli line edit
visual block Practical vim p42 用面向列的可视模式编辑表格数据
ctrl+v 进入面向列的可视模式
c 编辑列 esc 应用编辑
c:删除并进入插入模式 
插入操作看起来只影响顶行 但实际上影响所有行 只有等到返回普通模式时才真正显示操作结果(这种怪异的现象的原因很简单 vim没有实现好而已)
实际上当用ctrl+v进入到可视模式时实际上还是普通模式可以用x . 等命令
# 多文件编辑
vsp 与sp
# surround
install vim-surround
```
yss"
```
# jump to line end
use `$`
# replace only visual area (mutli line)
into visual mode select txt and enter ':' it will show `'<,'>` then just use `s/xx/xxx/g` pattern
# replace only visual area (part of line)
not a elegant way
[]

# plugin manager
[vim-plug](https://github.com/junegunn/vim-plug)
## install
```
# vim
curl -fLo ~/.vim/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
# nvim 
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

```

# vim termimal mode
## exit
c+\c+n

# vim delete all content under a bracket
## 1 ]}
```
{ _
    {
        ddddddd
    }
}
```
```
d]} # ] ]x goto unmatched x
```
```
{

}
```
# i} i) a} a) etc
i} "inner Block", select [count] Blocks, from "[count] [{"to the matching '}', excluding the '{' and '}'
```
di}
```
# 居中
zz
# split windows
## split new window edit same file
ctrl+w+v

# 将多行文本加上"
```vim
" first use vim-surround to surround one line
yss"
" then use norm command to apply this behavior in mutli line
:.,$ norm .
```
# 批量生成数字
例如生成'vec!["xxx 1".to_string(),"xxx2".to_string()]'
```vim
:for i in rage(1,10) |put ='\"xxx '.i.'\".to_string(),'|endfor
:.,.+10 s/\n/,/g
```

# jump to previous location
```
mi // 给当前位置打上i标记
`i // 跳转到 i标记位置
`` //跳转到之前位置
```

# 对于一段选定的文本的每一行 执行相同的操作
1. qx  录制宏 
2. visual select :`<> normal @x # 对选择的每一行执行宏

## l-basic-delete-util-and-not-include 
dtx
## l-basic-delete-util-and-include 
dfx
# l-move 

上
下
左
右
左边一个单词
右边一个单词
当前行行首
当前行行末
整个文件开始
整个文件结束
跳转到行号
## l-move-pre-screen 向上翻屏
ctrl+b
## l-move-next-screen 向下翻屏
ctrl+f

# vim regex
```
# capture group 使用\(\)来包裹 replace 的时候使用\1
info!("hello");
:s/info\(.*\)/println\1
println!("hello");
# 换行使用\r
abc
:s/abc/123\r123\r/g
123
123
```
# 实战case
## 将选中文字作为输入传递给外部命令
https://benninger.ca/posts/vim-use-selected-text-as-input-to-a-shell-command/

## 隔行复制
```txt
sh 1.sh
sh 1.sh
sh 1.sh
sh 1.sh
```

# l-editor-select
## 基于锚点的选择
### 行号
行号 选择当前行到某一特殊行
1. 首先进入select-mode
2. 使用xxG跳转到期望的行号
[](https://unix.stackexchange.com/a/30056) 

# scope-select
## 选中当前行


# regex
```
:8,10 s/search/replace/g
```
## tips
set incsearch 
capture group 需要转义
``
s/^\(.*\)$
``
# jump-to-next-current-word
[go-to-the-next-same-word-in-vim-without-using-search](https://stackoverflow.com/questions/10010392/go-to-the-next-same-word-in-vim-without-using-search)
使用`*`
# copy-to-line-end-without-newline