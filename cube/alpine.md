---
id: 'hflwwpo'
time: '2019-06-15T10:37:04+08:00'
---

# cmd not found
可能是没有安装glibc导致的
```
apk --no-cache -X https://apkproxy.herokuapp.com/sgerrand/alpine-pkg… add glibc glibc-bin
```
# 国内源
```bash
echo "http://mirrors.ustc.edu.cn/alpine/v3.3/main/" > /etc/apk/repositories
```