---
id: '7gfvp2b'
time: '2020-03-21 23:14:4'
---

# 从git中获取某文件创建时间
```bash
git log  --follow --date-order --pretty={\"date\":\"%cI\"\,\"author\":\"%an\"\,\"msg\":\"%s\"\,\"hash\":\"%h\"} -- test1.md
```
输入:被git管理的文件路径

输出:形如

```json
{
    create:"2017:10:10/10:10",
    lastmodify:"2017:10:10/10:10"
}
```
# https git clone 配置密码
[Useful-tool-Git-Credential-Manager-for-Windows](https://blog.miniasp.com/post/2016/02/01/Useful-tool-Git-Credential-Manager-for-Windows)
1. 下载安装Git-Credential-Manager-for-Windows
2. 执行git config --global credential.helper manager
3. git clone 回弹出输入框输入账号密码即可 后面就不用输了
搜索`管理网络密码`可以删除账号

# ssh key 
```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa
```
# add or update/replace remote 
```bash
git remote rename origin old-origin
git remote rm  origin
git remote add origin ssh://xxxx
```
# 代理
```
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy
git config --global --unset https.proxy
```

# force pull  
```bash
git fetch origin master
git reset --hard FETCH_HEAD
git clean -df
```
# ignore file mode change
git core.fileMode false
# remove a merge commit
