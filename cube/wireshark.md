---
time: '1996-09-08T23:37:07+08:00'
id: 'udqmedm'
---

# capture filter 和display filter区别
[https://osqa-ask.wireshark.org/questions/6660/what-is-the-difference-between-capture-filter-and-display-filter]
A capture filter is used to select which packets should be saved to disk while capturing. For capture filters wireshark uses the BPF syntax. BPF is module that runs in the kernel and can therefor maintain high rates of capturing because the packets do not have to move from kernel space to user space when filtering. The things that can be filtered on are predefined and limited (compared to display filters) as full dissection has not been done on the packets.

Display filters are used to change the view of a capture file. They take advantage of the full dissection of all packets. This makes it possible to do very complex and advanced filtering when analyzing a network tracefile.
## capture filter display filter 写法 语法区别
capture filter 使用的是[pcap-filter](http://www.tcpdump.org/manpages/pcap-filter.7.html)的语法
display filter (https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html)

# 给定本地端口/远程端口/本地IP/远程IP 抓包
## 从本地的大于某个数字的端口发向远端80 或者443端口的http/https包
大于1024
src portrange 1024-65535 and dst port 80 or dst port 443 and tcp

# 给定http url 关键字 抓取http包
无法使用capture filter 一般先用capturefilter 过滤 然后用display filter 
capture filter: src portrange 1024-65535 and dst port 80 and tcp
display filter: http.request.full_uri contains "test"

# 当我设置好了一个capture filter 进入到packet界面之后如何修该它
先停掉当前的capture 然后点capture options 最下面修正然后start
# 抓本地端口与包
安装wincap
# Q
## 在没有证书的情况下能获得https请求的什么信息
什么都拿不到