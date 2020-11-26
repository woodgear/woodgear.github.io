---
time: '1996-09-08T23:37:07+08:00'
id: '3jpoe6y'
---

# samba xp
samba 在xp上无法正常工作,输入正常的密码但显示密码错误
https://blog.csdn.net/lizongyao/article/details/89054634

# 重置密码
```
sudo smbpasswd -a user-name
```
# smblient
smbclient -L ip -U name%passwd