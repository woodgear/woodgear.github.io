---
time: '1996-09-08T23:37:07+08:00'
id: 'pys2q0j'
---

# tips
## 获取某个action的具体command
使用gui界面的keyboard shortcut 直接搜索 右键菜单中有 copy command id
https://code.visualstudio.com/docs/getstarted/keybindings


## task 相对路径
task.json 的[schema](https://code.visualstudio.com/docs/editor/tasks-appendix)
```json
// task.json
    "tasks": [
        {
            "label": "check-bot-client",
            "type": "shell",
            "options": {
                // 设置执行命令的相对路径
                "cwd": "bot-client-rust"
            },
            "command": "cargo check",
            "problemMatcher": {
                "base": "$rustc",
                // 设置problemMatcher的相对路径
                "fileLocation":["relative","${workspaceRoot}/bot-client-rust"]
            }
        }
    ]
```

# extenstion
[command-line-extension-management](https://code.visualstudio.com/docs/editor/extension-gallery#_command-line-extension-management)
## list
code --list-extensions
## install
code --install-extension
## uninstall
code --uninstall-extension