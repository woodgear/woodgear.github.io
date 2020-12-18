---
time: '1996-09-08T23:37:07+08:00'
id: 's64pn40'
---

C-x 指的是按Ctrl键 然后按x键
M-x 指的是按Alt键 然后按x键
在emacs中所有的操作都是command 你可以直接通过按键触发这些命令 或者通过M+x command 来处罚

# 概念
## mode
功能的集合
### 查看当前的active的mode
```
;; emacs native
describe-mode
```
### 开启某个mode
```
(xxx-mode)
```
### 查看某个mode是由那个package提供的
好像没什么好的方法 可以使用describe-mode 然后手动点击进去 最后会到达某个package的代码

## command
## 查看某个mode是由哪个package提供的

# l-config
测试
# l-list-installed-package
`M-x list-packages`进入到package的列表中,使用`M-x end-of-buffer`跳到最后面,然后使用上方向键 install的package会有红色的标识
# l-move 
上: C-p/Up                    : previous-line
下: C-n/Down                  : next-line
左: C-b/Left                  : backward-char 
右: C-f/Right                 : forward-char
左边一个单词: M-b               : backward-word
右边一个单词: M+f               : forward-word
当前行行首:  C-a               :  move-beginning-of-line
当前行行末:  C-e               : move-end-of-line
整个文件开始: M-<               : beginning-of-buffer
整个文件结束: M->               : end-of-buffer

跳转到行号: M-g g N            : goto-line

删除当前行: C-k  :kill-line 
撤销: C-u     :undo

打开文件: C-x C-f :find-file
# l-open-file
`M-x find-file<CR>` 

# l-windows
## l-panel
###  l-panel-focus-move
doom emacs的话使用 Spac+W+ghjk
```
;; doom-emacs native
;; provide by [evil](https://github.com/emacs-evil/evil)
evil-window-right/up/down/left
```
###  l-panel-focus-jump
使用[winum](https://github.com/deb0ch/emacs-winum)可以做到自如的直接跳转
他在窗口上增加了标号 并提供直接跳转到对于窗口的command
doom emacs 配置
```elisp
;; package.el

```
### l-panel-destory-me
```elisp
;; emacs native
delete-window
```

### l-panel-destory-other
```elisp
;; emacs native
delete-other-windows
```
## l-panel-size-zoomin
## l-panel-size-zoomout
https://github.com/emacsorphanage/zoom-window
两种都是同样的 使用`zoom-window-zoom` 

## l-terminal
使用shell-pop 可以提供一个shell 像vscode一样
# l-system
## l-system-copy

貌似需要比较麻烦的配置
配合CopyQ使用 可以达到比较好的插入效果
可以参照 simpleclip 和clipit
目前在我的doom emacs中使用的是[xsel-base-copy](https://github.com/rolandwalker/simpleclip/issues/6#issuecomment-333714700)提供的方法