---
time: '1996-09-08T23:37:07+08:00'
id: '1vgrzba'
---

# what it is
一个网络流量的捕获提醒处理工具
监听网络流量 根据用户规则做处理(log/alert/drop)
# how to install
## windows
download and click (need to install wincap) that go to install dir (normaly C:\\snort) to use snort.exe
# how it work
通过wincap监听流量解析自己的规则文件和配置作出响应
# how to build

# what snort could not do
修改网络包 snort可以丢弃网络包但不能修改
# 规则
```bat
./snort -b -A fast -c snort.conf
``` 
pass->drop->alert->log
## pass
## drop
## alert
## log

# 对比 wireshark tcpdump snort

# examples
## show all dns query on screnn
## drop dns which match