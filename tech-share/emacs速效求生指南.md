---
id: '8ff1ef'
time: '2020-10-10T14:29:57+08:00'
---
# emacs速效逃生指南
> 身为一个vim和vscode的狂热粉丝,怎么能让emacs使用起来更像vscode+vscode-vim呢?

> 快点 再不快点逃去evil-mode的话 整个人就变成emacs的形状了
## 安装
[click this to see help](http://letmegooglethat.com/?q=how+to+install+emacs)
## 配置/包管理/evil
> 如果你无法装包,那么问题肯定出在__上,而不是emacs上.
1. emacs -nw
1. Ctrl+x Ctr+f ~/.emacs.d/init.el 回车
2. 在这个奇怪的界面内所有想完成的操作用alt+x搜索指令来完成 多按几次esc重新回到编辑区 方向键控制光标 直接输入就是编辑 back键删除 (坚持住 vim马上就来了)
3. 将这一坨复制粘贴到init.el中 (鼠标右键 paste)
> copy from http://evgeni.io/posts/quick-start-evil-mode/
```emacs-lisp
;; load package manager, add the Melpa package registry
(require 'package)
(add-to-list 'package-archives '("melpa" . "https://melpa.org/packages/") t)
(package-initialize)

;; bootstrap use-package
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))
(require 'use-package)

(use-package evil
  :ensure t
  :defer .1 ;; don't block emacs when starting, load evil immediately after startup
  :init
  :config
  (evil-mode)
  (message "Loading evil-mode...done"))
```
4. alt+x save-buffer 然后 alt+x eval+buffer
5. 等待/祈祷
6. 等到看到"Loading evil-mode...done"的字样就好了.(welcome to vim)
7. alt+x kill-emacs 

(呼,真是次惊险绝伦的冒险,不过还好最后还是干掉了emacs,现在喘口气休息一下,下次在来干emacs(配置)吧.)
## 窗口操作/自定义命令/文件搜索

(哦呀哦呀,为什么你已经这么熟练了呢？)

## lsp (rust/ts/js/go/python)
(让我们一起快乐的写代码吧)
## shell
(这都有了还要什么自行车啊？)
## other tips
观摩大佬的教程 [想一想,不充值怎么会变强呢?](https://edu.51cto.com/course/19329.html)

## bugs
[init.el not load](https://stackoverflow.com/questions/12224575/emacs-init-el-file-doesnt-load)