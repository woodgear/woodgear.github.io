---
time: '1996-09-08T23:37:07+08:00'
id: 'hlx854c'
---

# 搭建调试环境
我们的目标是搭建一个能进行方便调试的驱动开发环境,所谓的方便调试,应该满足以下几点
1. 能够通过命令行的方式编译出驱动
2. 能够以简单的方式(命令行)将驱动文件部署到测试机上
3. 能够以简单的方式(命令行)在测试机上启动驱动
4. 能够在开发机上单步调试 打断点
5. 能够在开发机上从驱动入口出断点调试
6. 测试机开机自启断点

简单的讲就是我们决对不应当在被调试机上手动执行任何操作
被调试机应该就只是一个简单的viewer而已
根据我已有的概念 大概的思路是 使用windbg的远程调试做到在开发机上调试
# 原理
从win7开始所有的64的驱动都需要签名 这是确定的 也就是说假设编译出一个驱动(右键观察属性 数字签名一列) 没有做任何签名的步骤 不论对windows做任何配置 都无法让其正常加载启动(sc start) 但是对如何校验签名 windows 放宽了限制,在实际的生产环境中windows会校验所有签名的所有者(必须有证书?) 证书必须能够溯源到windows自己,也就是讲必须送给windows签名,但同时也提供了开关让我们不进行校验证书这一步.简单的讲就是我们可以给驱动[打上测试签名]() 在[开启测试模式](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/the-testsigning-boot-configuration-option)的电脑上运行

# 运行驱动
在开发中运行驱动需要测试签名的驱动运行在测试模式的电脑上 也就是讲需要在host上调用signtool在targer上`bcdedit /set testsigning on`然后重启


# 双机调试

# 测试签名
微软签名的本质原因是所有的电脑中都有windows的证书,所以想要测试 我们的电脑中也要装一个自己mock的证书
https://docs.microsoft.com/en-us/windows-hardware/drivers/install/creating-test-certificates
```
makecert -r -pe -ss PrivateCertStore -n CN=Contoso.com(Test) -eku 1.3.6.1.5.5.7.3.3 ContosoTest.cer
```
上述命令会把PrivateCertStore这个证书装到电脑中 可以通过certmgr.msc 看到

## 嵌入式签名
https://docs.microsoft.com/en-us/windows-hardware/drivers/install/test-signing-a-driver-through-an-embedded-signature
```
Signtool sign /v /fd sha256 /s PrivateCertStore /n Contoso.com(Test) /t http://timestamp.digicert.com amd64\toaster.sys
```

# 双机调试
```bat
bcdedit /debug on 

rem 设置端口 这里n指的是com接口
rem bcdedit /dbgsettings

rem https://resources.infosecinstitute.com/kernel-debugging-qemu-windbg/#gref

完成之后重启桌面右下角有水印
```
# ubuntu kvm dev-windows driver widnows  
两台电脑之间通过串口通信 而kvm模拟的串口可以互相连接(tcp 相同端口 client side mode和server side 两个虚拟机开启串行通信接口 一个作为server 一个作为client
client虚拟机在启动时会尝试连接server所以必须先启动server
mode)
# 经典双机调试 host window target virtual box windows
设置串口的时候不要选择使用已有的串口
pipename 格式为 \\.\pipe\PipeName
# windbg cmdline
```bat
set WINDBG_PATH="C:\WinDDK\7600.16385.1\Debuggers\windbg.exe"
# COM1 是开发机的COM口 baud 必须和调试机对应COM口的baud一致

# [symbol-path](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/symbol-path)
# 从https://msdl.microsoft.com/download/symbols加载符号并缓存到本地

  -k com:port=\\.\pipe\win7,baud=115200 -y cache*;srv*https://msdl.microsoft.com/download/symbols
```
# 符号加载
需要翻墙 设置环境变量_NT_SYMBOL_PROXY
# 驱动执行环境
## 猜想
除非特别创建线程 驱动代码运行在用户线程的内核空间,例如写Fd捕获到文件读写时 驱动回调代码就运行在发起文件读写的那个进程中(只不过进入了内核态)
所以假设我有个文件回调 打出`PsGetCurrentProcessId`同时有个进程一直在write file + print current pid 那么两个pid应当是能对应的

# windbg dbgprint
在windbg中看dbgprint
`ed nt!Kd_Default_Mask 8`
# 源码调试
加载完符号设置好srcpath之后 可能要.open xx来开启源码窗口
# pdb reload
为了解决pdb占用问题 使用symstore将pdb索引到其他目录再用http-server
```bat
set local_symbol_server_path=C:\Users\18754\work\driver\my_symb_server
set pdb_dir_path=C:\Users\18754\work\driver\winpcap_resource\winpcap\packetNtx\driver\bin\amd64
set symstore_exe_path="C:\Program Files (x86)\Windows Kits\10\Debuggers\x64\symstore.exe"
%symstore_exe_path%  add /s %local_symbol_server_path%  /compress /r /f %pdb_dir_path%\*.pdb /t npf
```
build.bat 编译驱动 自动做test sign,用symstore加入到local symbol server中,simple http server 提供网络访问, windbg.bat 启动windbg 设置好symbol server 使用vboxmanager控制vm重启,虚拟机中自启动bot-server,host中使用bot-client连接控制更新驱动 
这样基本就是一个完美的debug流程了

# create service
```bat
sc create $name type= kernel binPath= $Path
```

# debug print
[debug level](https://docs.microsoft.com/en-us/windows-hardware/drivers/devtest/reading-and-filtering-debugging-messages)
DbgPrintEx  允许我们设置log的level和kind,在调试时我们能设置对应kind的mask 从而允许我们过滤log

```bat
NTSYSAPI ULONG DbgPrintEx(
  ULONG ComponentId,
  ULONG Level,
  PCSTR Format,
  ...   
);
```
ComponentId 标识的组件的类型(kind) 可以使用下面几个定义在wdk Dpfilter.h中的常量
```bat
IHVVIDEO Video driver

IHVAUDIO Audio driver

IHVNETWORK Network driver

IHVSTREAMING Kernel streaming driver

IHVBUS Bus driver

IHVDRIVER Any other type of driver
```
```bat
//ed nt!Kd_IHVDRIVER_Mask 0x4d
ed nt!Kd_{ComponentId}_Mask 0x{Mask}
```
使用ed设置对应ComponentId的Mask `dd nt!Kd_{ComponentId}_Mask`查看设置的值
我们在可以在电脑上设置对应component的filtermask 来决定那些信息是会被显示出来的
如果Mask是A Level是B,A&B!=0 则会显示也就是说Mask和Level的二进制中必须至少有一位都是`1`才能显示log

# [winobj](https://docs.microsoft.com/en-us/sysinternals/downloads/winobj)
可以用来检查device有没有被创建成功


# deivce
如果没有delete device的话可能会无法重新安装

# 测试 
安装 启动 卸载 升级

通信

内存?