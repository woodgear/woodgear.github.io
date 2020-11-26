---
time: '1996-09-08T23:37:07+08:00'
id: 'jk2vjrb'
---

# how to get cfd
```bash
CFD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
```
# args
[](https://tecadmin.net/tutorial/bash-scripting/bash-command-arguments/)
```
$1 to $n	$1 is the first arguments, $2 is second argument till $n n’th arguments. From 10’th argument, you must need to inclose them in braces like ${10}, ${11} and so on
$0	The name of script itself
$$	Process id of current shell
$*	Values of all the arguments. All agruments are double quoted
$#	Total number of arguments passed to script
$@	Values of all the arguments
$?	Exit status id of last command
$!	Process id of last command
```

# how to unset env
```bash
unset xxx
```
# how to read argument
```bash
echo name of script is $0
echo first argument is $1
echo second argument is $2
echo seventeenth argument is $17
echo number of arguments is $#
```
# or
```bash
# ${1-foo}, "return foo if $1 is unset
${1-foo}
```
[how-to-write-a-bash-script-that-takes-optional-input-arguments](https://stackoverflow.com/questions/9332802/how-to-write-a-bash-script-that-takes-optional-input-arguments)

# head
```bash
#!/usr/bin/env node
```
# time format
```bash
echo $(date +"%y-%m-%d-%H-%M-%S")
```
# exit code
```bash
echo $?
```
# zip


## 交集
sort a.txt b.txt | uniq -d

## 并集
sort a.txt b.txt | uniq 

## 差集
a.txt-b.txt:
sort a.txt b.txt b.txt | uniq -u
b.txt - a.txt:
sort b.txt a.txt a.txt | uniq -u
# if error exit
```bash
set -e # 全局
# find port
# 手动
exit_code=$?
if [ $exit_code -ne 0 ]; then
    exit $exit_code
fi

```
# get all extenstion
fd -t f |rg  '(.*\.)+(.*)$' -o -r '$2'

# summary file encoding and line end status
fd -a -e cpp -e c -e h -e hpp . ./addin/ | sed 's/\\/\\\\/g' |xargs -I{} file "{}" |rg -o ", (.*) text, with (.*) line terminators" -r '$1 $2'| sort |uniq -c |sort -r
# set line break
sed  -i 's/\r$//' $FILE
# find port

# swap
## enable
sudo dd if=/dev/zero of=/swapfile bs=1G count=40 status=progress
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
## disable
sudo swapoff /swapfile
sudo rm -f /swapfil
# alias
在bash脚本中alias不会默认被展开 要使用shopt 打开某个开关才行
```bash
#!/bin/bash
# unalias.sh

shopt -s expand_aliases  # Enables alias expansion.

alias llm='ls -al | more'
llm

echo

unalias llm              # Unset alias.
llm
# Error message results, since 'llm' no longer recognized.

exit 0
```
# measure time
time xxx
# check kernel version
```
uname -rv
```
# increase file watch limit
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
## random string
```bash
# random(len:number)
# return random string which have special length
random() {
    len=$1
    cat  /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w $len | head -n 1
}
id=$(random 10)
echo $id
# output: mnRnNxGKtc 
```