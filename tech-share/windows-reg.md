---
time: '1996-09-08T23:37:07+08:00'
id: 'ohfreiy'
---

# 管理员权限 注册表虚拟化关闭 未设置Wow64DisableWow64FsRedirection
32位程序  32OS 不设             正常访问注册表        HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft 
32位程序  32OS KEY_WOW64_64KEY  被忽视 正常访问注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft
32位程序  32OS KEY_WOW64_32KEY  被忽视 正常访问注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft
32位程序  64OS 不设             访问到32位注册表 即带有WOW6432Node HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft
32位程序  64OS KEY_WOW64_64KEY  访问到64位注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft
32位程序  64OS KEY_WOW64_32KEY  访问到32位注册表 即带有WOW6432Node HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft

64位程序  32OS 不设             xx(无法运行)
64位程序  32OS KEY_WOW64_64KEY xx(无法运行)
64位程序  32OS KEY_WOW64_32KEY xx(无法运行)
64位程序  64OS 不设            访问到64位注册表 正常访问注册表  HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft
64位程序  64OS KEY_WOW64_64KEY 访问到64位注册表 正常访问注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft
64位程序  64OS KEY_WOW64_32KEY 访问到32位注册表 即带有WOW6432Node HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft


# 正常权限 注册表虚拟化开启 未设置Wow64DisableWow64FsRedirection
32位程序  32OS 不设             正常访问注册表        HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\Microsoft 
32位程序  32OS KEY_WOW64_64KEY  被忽视 正常访问注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\Microsoft
32位程序  32OS KEY_WOW64_32KEY  被忽视 正常访问注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\Microsoft
32位程序  64OS 不设             访问到32位注册表 即带有WOW6432Node HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\WOW6432Node\Microsoft
32位程序  64OS KEY_WOW64_64KEY  访问到64位注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\Microsoft
32位程序  64OS KEY_WOW64_32KEY  访问到32位注册表 即带有WOW6432Node HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\WOW6432Node\Microsoft

64位程序  32OS 不设             xx(无法运行)
64位程序  32OS KEY_WOW64_64KEY xx(无法运行)
64位程序  32OS KEY_WOW64_32KEY xx(无法运行)
64位程序  64OS 不设            访问到64位注册表 正常访问注册表  HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\Microsoft
64位程序  64OS KEY_WOW64_64KEY 访问到64位注册表 正常访问注册表 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\Microsoft
64位程序  64OS KEY_WOW64_32KEY 访问到32位注册表 即带有WOW6432Node HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft => HKEY_CURRENT_USER\Software\Classes\VirtualStore\MACHINE\SOFTWARE\WOW6432Node\Microsoft


<!-- 所以假设在32位程序运行在64位操作系统上 希望访问64位注册表
1. 设置 KEY_WOW64_64KEY
2. 关闭注册表重定向
 -->

 ## tips
[管理员权限 注册表虚拟化关闭](https://docs.microsoft.com/en-us/windows/security/identity-protection/user-account-control/how-user-account-control-works#virtualization)
除非32位程序要访问64位系统文件夹(例如调用64位notepad.exe而不是32位notepad.exe)否则不要使用Wow64DisableWow64FsRedirection