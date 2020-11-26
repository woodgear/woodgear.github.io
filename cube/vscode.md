---
id: '2e3c1f'
time: '2020-09-22T15:21:55+08:00'
---
## 纯键盘在命令下拉框中选择
呼出命令下拉框后，使用tab将焦点从输入框中移走,接下来就可以使用jk来上下移动了
## 在snippet中开始自动补全
[enable-code-snippets](https://stackoverflow.com/questions/55683145/intellisense-not-working-in-code-snippets-vs-code)
```json
"editor.suggest.snippetsPreventQuickSuggestions": false
```
## replace regex
```
find: (^[^\x00-\xff]+)\n+\1
replace: ### $1\n
```