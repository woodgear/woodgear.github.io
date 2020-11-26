---
id: '64b8a6'
time: '2020-10-19T15:14:40+08:00'
---

## corrupt history file 
```bash
mv ~/.zsh_history ~/.zsh_history_bad
strings ~/.zsh_history_bad > ~/.zsh_history
fc -R ~/.zsh_history
```