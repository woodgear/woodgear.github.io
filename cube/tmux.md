---
time: '1996-09-08T23:37:07+08:00'
id: '7volfs3'
---

# default config
```
vim  ~/.tmux.conf
```
# change prefix from ctrl-b to ctrl-a
```
unbind C-b
set-option -g prefix C-a
bind-key  C-a send-prefix
```
# tmux list binding key
tmux list-keys
# how to kill all other panel except
kill-pane -a -t 0

# panel title
首先设置
set -g pane-border-format "#{pane_index} #{pane_title}"
set -g pane-border-status bottom
接着可以用指令
tmux select-pane -t 1 -T 'this pane'

# [tmux-xpanel](https://github.com/greymd/tmux-xpanes)
# show panel id
prefix+q
# jump to panel

# tmux 开启鼠标模式
```tmux.conf
set -g mouse on
bind-key -T copy-mode-vi MouseDragEnd1Pane send -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy"
bind-key -T copy-mode MouseDragEnd1Pane send -X copy-pipe-and-cancel "reattach-to-user-namespace pbcopy" 

```
# search in tmux 
1. into copy mode prefix+[
2. ctrl+s
3. n to search next,shift-n to reverse search
[search in tmux](https://superuser.com/a/231159/1201083)
# send-keys 转义
使用-l "" 双引号的里面就是正常的字符串转义规则 后面再单独的使用一个tmux send-keys 把回车发送过去
```bash
 tmux send-keys -t 1 -l "sed  \" -n '5864,\$p' ./log.log | less" ; tmux send-keys -t 1 enter

```