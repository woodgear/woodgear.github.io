---
subtitle:
  - 当我们在谈论编辑器/IDE时我们在谈论什么
  - 声明式与过程式
  - 对脑后插管时代的热切期盼
  - 从hello world 开始谈起
  - 某种程度上我们在谈 知/行
  - all the ide are same
  - action base programming
  - '孽畜,你什么时候又懂得了vscode/vim/emscs/idea/visual studio?'
  - 元素/IDE要素周期表
time: '1996-09-08T23:37:07+08:00'
id: 'nwffrhj'
---

> 很明显的,当我们在编程时,我们需要的就是IDE.至于付费/CPU/内存/无法自定义,这些问题要么要么是我们自己自身太穷/懒,要么现有的IDE太烂,但这些都无法改变的事实是,我们在操作的,所面向的,是结构化的数据而不是字符串,我们想要的是IDE.
# 名词定义
这里的IDE泛指所有的操作文字/源码的软件 包括但不限于 notepad/vim/emacs/vscode/idea/atom etc.
# 问题定义
问题在于我们希望通过IDE做什么.在我们的脑海中有我们想实现的功能 (一个想法) 接下来我们要表达我们的想法(以源码的形式) 再通过编译器编译执行 得到反馈 从而产生新的想法
即 想法 -> 表达 -> 反馈 -> 想法 的一个闭环. 所谓的IDE的技术就是如何最简化 表达->反馈 的过程 的技术.
本质原因是人脑计算能力的不够 否则的话就是 想法->表达 的一个回路了
所谓的表达 即将大脑中想法变成源码的过程 类如 现在我想在屏幕上输出'hello world' 这就是一个想法,这是我对未来的一种断言. 同时的我会编程 所以我知道需要用某种语言来表达这种想法 来与计算机沟通 再同时的我会rust,到这里 这个想法就变得更具体了一点 我需要一个文件里边是rust的源码
```bash
cargo new demo
```
```rust 
// demo/src/main.rs
fn main() {
    println("xxxx") //如果你懂的话这一行是编译不过的 不过不用困惑 这是故意的 请向下看
}
```
我要某种方式使的语言的源码变成真正的计算机可以理解的语言 
`cargo run`
从一个想法 *屏幕输出*(A) 到(B)另一个想法(C) *rust代码* 这一步是在我们脑海中发生的, 此时我们暂停一下稍微检查一下这三者
A: *屏幕输出* 这个想法是一切的缘起 在这里我们无需质疑其存在的价值
B: 想法转换的过程 这是一个从抽象到具体的过程 我们想*屏幕输出* 但是怎么做呢? 用小刀在电脑屏幕上划出'hello world'? 用画图在画出hello world? 用C/JAVA/RUST?
C: *RUST代码* 这个想法实际上是一个更具体的想法,是脑海中的最后一步,是一个可以指导我们具体行为的想法
现在我们从*屏幕输出*这个想法 跳转到*RUST代码*这个想法上了 接下来就该卷起指套 伸展手指 左手稍稍用力 敲击f键了 
但 真的是如此吗
> 进入正题警告
# 从零开始 一阶序与二阶序
现在我们的电脑上打开这着我们最爱的IDE(vim/emac 等自行填空)
屏幕上一片空白 (或者是请你资助乌干达) 手上摆着的是键盘 我们该怎么办?
Q: 依次按下 'f' 'n' ' ' 'm' ...
A: 如果你是在用vim的话 你已经死了
当我们在谈论如何操作/编辑文本/文本的时候 我们实际上是在说下列的事情
移动
插入
修改

删除

复制
粘贴

撤销
搜索/替换
搜索/跳转



# l-basic
基础移动 上 下 左 右
单词移动 左边一个单词 右边一个单词
当前行行首 当前行行末
整个文件开始 整个文件结束
移动到某一行

插入
删除一个字符 删除一个单词 
从当前删除到行末 
删除当前选中 
删除某种区域 ()/{}
从当前删除到某个字符 (开区间或者闭区间)  l-basic-delete-util-and-not-include l-basic-delete-util-and-include 

选择当前block 扩充选择 

在选择的block中替换

搜索选中的block



打开文件/文件夹

跳转至某一行
跳转至代码 (dependency)
debug
# l-insert
当前位置插入
当前位置后一个位置插入
当前位置所在单词后插入
当前位置所在单词后一个空格插入
当前位置所在单词前插入
当前位置所在单词前一个空格插入
## l-insert-before-current-line-start
当前位置所在行首插入
## l-insert-after-current-line-end
当前位置所在行尾插入
当前位置所在行首一个空格插入
当前位置所在行尾一个空格插入


## shell (which the ghost is)
现在我们终于将源码写到了文件中(掌声),接下来时候接受反馈了
rerun-last-command-in-the-shell
# tips
最好所有的操作都能够通过键盘完成

# l-package
## l-install-package
必须有安装插件的能力
## l-list-installed-package
能展示出当前安装的插件
## 显示出某个action的pacakge


# l-windows
现在 我们面对的是屏幕 上面充满像素点 就屏幕这个要素来讲 还可以继续切分
window/panel/tab/popup/buffer（窗口/面板/标签页/浮动窗口）
这是常见的几种概念 或者说称呼
其代表的东西大致是
1. 窗口 由程序渲染出来的在显示器上占据一定空间的像素的集合 姑且我们称之为窗口
2. 面板 她的出现不会导致其他面板内容的变化 最多会导致其他面板大小的变化 对于面板 我们常用的操作术语是分裂
3. 标签页 同属于一种的标签页占据相同的像素空间 对于标签页 我们常用的术语是切换
4. 浮动窗口 唯一可以覆盖在其他之上的存在 对于浮动窗口 我们常用的术语是覆盖 弹出 深度

要注意的是面板和标签页的概念是可以嵌套的 可以在一个面板中切换不同的标签页 也可以在一个标签页中再次分裂出面板 一般来讲我们将同一标签页下的所有分裂出的面板归为一组 将同一面板下的不同标签页分为一组

还有一种概念 focus 焦点 焦点用来描述当前能够接受操作的面板或者标签页 焦点的概念有点类似事件冒泡
buffer 窗口描述了像素 buffer 赋予窗口意义 面版 标签页都可以说是buffer

在这种概念下 我们可以给一些在IDE中出现的现象命名了
VSCODE
1. 侧边栏是面板 点击侧边栏不同按钮是在切换侧边栏面包上的标签页
2. 内置终端是面版 分裂的内置终端是面板中的面板
3. tab页就是tab页 （T_T）

## l-panel
当讨论面板时 常见的操作如下
### 焦点变化 l-panel-focus 
焦点的变化有两种
1. 上下左右移动焦点 l-panel-focus-move [[emacs#l-panel-focus-move]]
2. 当面板多于四个时 按照某种方式 直接切换到那个面板 l-panel-focus-jump [[emacs#l-panel-focus-jump]]
### 分裂面板 l-panel-split
[[emacs#l-panel-split]]

一般来讲是向下或者向右分裂窗口 
分裂窗口还有很重要的要素是 打开的窗口是什么
例如 
1. 打开一个终端窗口
2. 打开quickfix窗口
3. 在新窗口打开当前函数的定义
4. 在新窗口中打开文件
这些留到后面讨论
### 销毁面板 l-panel-destory
emacs
vscode
#### 销毁当前窗口 l-panel-destory-me
emacs
vscode
#### 销毁其他窗口 l-panel-destory-other
emacs
vscode
### 大小变化 l-panel-size
#### l-panel-size-change
emacs
> 真的吗? 真的吗?  真的有人手动的一点一点的增减面板的大小? 不会吧 不会吧
#### zoom l-panel-size-zoom
emacs
### 面板移动 l-panel-move
> 真的吗? 真的吗? 真的有人需要移动panel吗? 不会吧 不会吧


## l-terminal
终端窗口 最好有一个快捷键能够切换终端和编辑窗口
emacs
vscode
### l-terminal-jump-file
terrminal 应当能够智能的识别错误/文件名 在点击时/(或其他某种方法) 能够跳转到对应的文件中
vscode 原生支持
idea 不支持 (未找到解决方案)
## l-problem-terminal
同时显示problems and terminal
## l-move-focus-windows

## l-move-focus-tab

## l-file
### l-open-file
文件管理窗口 
能够执行常规的文件移动/重命名之类的操作
## l-errors
显示编译错误/lint错误
跳转到对应的错误代码


在弹出窗口中查看符号定义
## l-refactor
rename-symbol
去除外层作用域 (多个嵌套的if,去除外面的一层)

## lanuange-common
填充结构体

## auto fix
create method or field if not exist

# 文本操作 l-editor
## 快速的替换
将给定的文字替换为其他的文字
目前做的最好的是vscode的ctrl+d
vim的 cgn 也算勉强可以 cgn的问题是有时我不是想完全替换而是想在后面或者前面新增些文本
# 编辑器/IDE
本质上讲相同, 问题在与当面对一堆文本时 我们所能做的操作是什么.
编辑器相对来将倾向于将其处理为单纯的文本 所提供的操作是相对于文本而言的 搜索/替换
IDE倾向于将其处理为特定的编程语言 提供 提取函数/拆分文件 等重构操作
问题的关键在于 我们想做什么和能做什么之间的差距
# l-editor-surround
surround顾名思义 用某种东西将令一种东西包裹起来的操作
vim-surround 基本满足需求 但缺少非对称的surround的支持
例如 
```rust
let a = "xxx";
let a = format!("xxxx");
```
[vscode-surround](https://marketplace.visualstudio.com/items?itemName=yatki.vscode-surround)
## l-editor-select
方便的选中一段文本的能力 
常见的方式大概有两类共四种 
### 连续区域的选择
1. 基于扩充的选择 例如鼠标的拖拽选择 总的来讲就是 首先选择一部分 然后向上下左右扩充这种选择
2. 基于锚点的选则 首先将所有锚点标注起来 然后指定任意两个锚点 选择锚点之间的区域 锚点可以是类似easymotion的那样 或者是linenumer
### 非连续区域的选择
1. 基于匹配的选择 给定某个模式 例如成对的括号 特定的某个单词 某个正则 选择匹配模式的所有区域
2. 基于语法的选择 例如选中某个符号 或者选中某个对应的text object
#### l-editor-select-edit
选择完成之后就要有修改的能力
1. 限定在选择区域在修改 emacs的narrow
2. mutli-cursor
3. custom-action

# 好用的批量替换 单文件内支持直接选中当前单词并选中下一单词并更改
# 完善的自动补全自动提示支持
# git diff 的支持  
# 好用新建文件 支持
# 注释单行或多行

# l-config
配置信息集中到文件中,使得整个开发环境能够完全的复原出来
## l-open-config
一键式的打开config

## l-instll-package-from-config-file
必须有能里从某个配置文件中安装插件,更再一步的讲 最好能够通过不同的配置文件来加载不同的插件 
类似于 `ide -c CONFIGPATH` 的感觉

# l-search
假设将文件视为只读的数据库 我们能从这个数据库中获取到什么内容？
## l-search-normal
要素为 1. search的类型 文字|符号|文件名 2. search的范围 当前文档|当前文档目录|当前项目|当前worksapce|所有依赖(例如node_module,target之类的)
## l-serch-dependency
谁在使用这个文件中的符号,谁在依赖当前的文件, 能否给出一个依赖图？

# l-replace
和refactor不同的是 replace更侧重字符串的处理
1. 修改当前单词 并应用到下一相同单词


# l-system
这里讨论一些在IDE之外的东西，例如与操作系统的集成
## l-system-copy
对于一些现代的IDE(看向VSCODE/ATOM/IDEA)复制粘贴理所当然的通用,但对于某些"老伙计"(看向VIM/EMACS) 情况则不同.
1. 将emmacs中内容拷贝到系统剪切板
2. 将系统剪切板内容拷贝到emacs
3. 支持系统剪切板管理器 可以选择粘贴那条内容到IDE
# draft
建立某种action系统 第一步就是收集并区分出这些action lsp,vscode,jetbrains 已有的action实际上一个很好的来源


# 常用操作
1. 列出所有command
2. 列出所有符号
3. 搜索文件
4. 注释
5. format
6. 查找引用
7. rename
8. snippet
9. 切换命令行
10. 跳转回归 跳转前一使用此符号 跳转后一使用此符号 跳转定义


## l-autocomplete
当能推断出完整类型时  给出这个类型的默认实现
当前vscode ts 并不支持这种能力.