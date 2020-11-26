---
time: '1996-09-08T23:37:07+08:00'
id: 'wnftwmn'
---

需要记住的是在powershell中流动的是object而不是string
# 获取object信息
Get-Member
```ps
Get-Service|Get-Member
```
[询问中](https://stackoverflow.com/questions/61947281/how-to-know-what-type-of-object-that-a-powershell-cmd-will-return)



# 常见操作
## 查询 | 过滤 | 操作
```ps
Get-Process| Where-Object {$_.ProcessName -match "bare.*"} |Stop-Process
```