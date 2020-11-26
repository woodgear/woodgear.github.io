---
time: '1996-09-08T23:37:07+08:00'
id: 'n2ctkee'
---

# windows
rust 的pdb是兼容windbg的所以平常的调试windows下程序的方法都可以在rust上使用

[debug-rust-vscode](https://www.forrestthewoods.com/blog/how-to-debug-rust-with-visual-studio-code/)
vscode的debug在sourceFileMap上貌似有bug放弃 使用windbg很好用
## windbg
[rust-windbbg](https://www.youtube.com/watch?v=ZsrvNtl3enU)
大致步骤如下
1. 使用对应toolchain的windbg (x86_64-pc-windows-msvc => windbg x86)
2. windbg->file->open executable
3. set sysmbol file to ./target/debug 
4. set source file to ./src
5. set source file to $HOMEDIR\rustup\toolchains\stable-i686-pc-windows-msvc\lib\rustlib\src\
6. enter .open main.rs
7. select line which you want to set breakpoint and press f9
8. press g and now you are start to debug


实际上就是说设置对应的执行文件路径 设置源码路径 当前代码仓库的路径和rust std库的路径 如果引用了第三方库想要debug进去估计也要设置其路径 直接使用`.open xx`命令打开文件 按f9来设置断点就可以了

或者更简单的方式 直接使用命令行来操作
```bat
.srcpath+"xxxx"
rem list srcpath
.srcpath

.sympath+"xxxx"
rem list srcpath
.sympath
```
## attach a running rust program
在windbg中使用attach to process即可,后面的设置和上面一样 
## attach a rust program when it start
[how-to-debug-windows-services](https://support.microsoft.com/en-us/help/824344/how-to-debug-windows-services)
与通过windbg直接启动程序 和 attach到一个已经运行的程序不同 这次我们希望能够在程序启动时自动的attach上去.  
理论上讲上面链接的方法都是可用的 但是在真正尝试时 gflags的方法并没有生效 改注册表的方法是可用的
```bat
rem REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\${NAME}.exe" /v Debugger  /t REG_SZ /d "${WINDBG_FULLPATH}"

REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\test-debug.exe" /v Debugger  /t REG_SZ /d "C:\Program Files (x86)\Windows Kits\10\Debuggers\x86\windbg.exe"

```
## c project static link rust program
使用windbg同上 只不过也要配置C项目的符号和源码路径