---
id: 'kvawytt'
subtitle: 
    - all the thing you need to know about windows
time: '2019-05-05T11:28:47+08:00'
---

# cwd
```
rem current exe dir
set CED=%~dp0 
```
# md5

```bat
certUtil -hashfile ${file} MD5
```
# check err,err handle'
[](https://stackoverflow.com/a/51897403/5642024)
```bat
rem 第一种 每次执行完检查
if %errorlevel% neq 0 exit /b %errorlevel%
rem 第二种
rem 1.在文件开头设置
SETLOCAL EnableDelayedExpansion
rem 2. 如果coommand-1 失败 整个脚本失败
command-1 ||  (echo "sth err" && exit /b !ERRORLEVEL!)
```
# sleep
```
# sleep 3s
ping -n 3 127.0.0.1 >nul

```
# 单行命令换行
```bat
echo one ^
two ^
*
rem one two *

echo one & echo two
rem one
rem two

echo one & ^
echo two
rem one
rem two

echo one ^
& echo two
rem one & echo two
```
[ref](https://stackoverflow.com/questions/69068/split-long-commands-in-multiple-lines-through-windows-batch-file)

# args
```
%0 - the command used to call the batch file (could be foo, ..\foo, c:\bats\foo.bat, etc.)
%1 is the first command line parameter,
%2 is the second command line parameter,
and so on till %9 (and SHIFT can be used for those after the 9th).

%~nx0 - the actual name of the batch file, regardless of calling method (some-batch.bat)
%~dp0 - drive and path to the script (d:\scripts)
%~dpnx0 - is the fully qualified path name of the script (d:\scripts\some-batch.bat)
```
[ref](https://stackoverflow.com/questions/357315/get-list-of-passed-arguments-in-windows-batch-script-bat)
# rm -rf
@RD /S /Q %path%
# mkdir
mkdir
# define-var 变量
```bat
# 注意=号左边不能有空格 右边的空格会被看做变量值的一部分
set A="1 2 3"
set B= 1 2 3
set C=1 2 3
set C=123

# %NAME% 来使用变量
echo %A%
echo %B%
echo %C%
```

```bat
"1 2 3"
 1 2 3
1 2 3
123
```

# copy
[xcopy](https://stackoverflow.com/questions/986447/batch-file-to-copy-files-from-one-folder-to-another-folder)
xcopy /y .\a.txt C:\b\b.txt
## target is file or directory
echo f | xcopy /y .\a.txt C:\b\b.txt

# query porcoess by name
```
TASKLIST /FI "IMAGENAME eq explorer.exe"
```
# 命令行空格转义
一个引号=>三个引号
```
cmd /c "TASKLIST /FI """IMAGENAME eq explorer.exe""" "
```
# net copy from samba
copy 时有可能会报错 是因为没有net use,使用net use 时也可能报错 因为之前错误的use过了 此时需要的是 列出所有的net 然后删除那些出问题的
```bat
net use \\IP\shared /user:USER PASSWD
net use rem 列出所有
net use \\IP /del rem 删除

```

# 如何快速的打开 Start Up 目录

win+r shell:startup
# kill process which listening port
netstat -ano | findstr :yourPortNumber
taskkill /PID typeyourPIDhere /F

# 取消登录密码
netplwiz run as admin cancle user must enter passed etc ...

# 检查进程权限
```
accesschk.exe -vqp cmd
```
[accesschk](https://docs.microsoft.com/en-us/sysinternals/downloads/accesschk)
# 检查进程是否存在
```bat
tasklist /FI "IMAGENAME eq myapp.exe" 
```
# 查看服务信息
```ps
 gwmi -Query "select Name,PathName from Win32_Service where PathName like '%venus%'"
```
# 进入到回收站
# 拷贝文件名
资源管理器 选择文件 按住shift 右键菜单中有copy as path

# 清空dns cache
 ipconfig /flushdns
# 查看dll
dumpbin 
# 设置环境变量
[wmic-env](https://www.programmersought.com/article/71752026181/)
[](https://www.cnblogs.com/killerlegend/p/3405484.html)
```bat
rem 好像没有upsert的语法 所以先delete 再create

rem Change the path environment variable values
wmic ENVIRONMENT where "name='path' and username='<system>'" set VariableValue="%path%;e:\tools"
rem Add system environment variables 
wmic ENVIRONMENT create name="home",username="<system>",VariableValue="%HOMEDRIVE%%HOMEPATH%"
rem  Delete the environment variable
wmic ENVIRONMENT where "name='home'" delete
rem set (create or update) env
wmic ENVIRONMENT set name="CUSTOM_EXE_DIR",username="<system>",VariableValue="E:\sm\scripts"
```

# 更新环境变量
https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/redirects/RefreshEnv.cmd

# 检查端口占用