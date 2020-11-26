---
time: '1996-09-08T23:37:07+08:00'
id: 'ezrfqzr'
---

# vs2008
```bat
rem /build /rebuild
"C:\Program Files (x86)\Microsoft Visual Studio 9.0\Common7\IDE\devenv.com" .\xxx.sln /build "Release|Win32" /project xxx
```
# degbug dll project
直接点debug 会要求指明调用dll的exe 填好路径即可

# 离线安装包
必须用cmd 不能用powershell
```bat
.\vs_community__1600658420.1558275487.exe ^
--layout C:\Users\developer\Desktop\ci\vs
```
# change file encoding

# build project