---
id: 'bcbca6'
time: '2020-11-25T23:19:55+08:00'
---
介绍几个多种功能的BCC工具  funccount/stackcount/trace/argdist 的用法
[#part_of_xmind#tools.debugging/mutli-purpose](./bpf.xmind)

介绍了如何在BCC中debug
1. 使用各种对bpf本身的观察工具debug
2. 手动修改代码 bpf_trace_printk("BDG req=%llx ts=%lld\\n", req, ts);
