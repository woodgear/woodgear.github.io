---
id: 'hflwwp1'
time: '2019-07-27T03:45:04+08:00'
---

# load average
操作系统过去1分钟 5分钟 15分钟的系统负载状态 每5秒计算一次
对于单核应用来讲1.0 代表满负荷 没有空闲cpu资源 >1.0 代表有进程在等待cpu资源

# 这些数字如何计算出来的?
最简单的方法是将每五秒的采样加起来除以12 如果是刚开机的情况按照0来处理 5分钟 15分钟同样 但是很明显并不是...2333
是[光滑](https://wiki.mbalib.com/wiki/%E6%8C%87%E6%95%B0%E5%B9%B3%E6%BB%91%E6%B3%95) 经过了光滑处理

光滑公式=> S(t) = Y(t) * a + S(t-1) * (1-a)
a属于[0,1] 大致思想是 当前时刻的平滑值为为当前时刻的真实值乘以一个比率+前一时刻的平滑值乘以(1-这个比率)
假设比率是0.6的话 当前时刻的平滑值就是当前时刻的真实值的60%+前一时刻平滑值的40%

linux代码中使用光滑公式
load(t) = n(1-e-1/12) + load(t-1) e(-5/60) 
n 指的是拿到进程数量
上述公式中的平滑常数是(1-e-1/12) 所以前一时刻平滑值要乘以 (e^(-1/12))=> 1-(e^(-1/12)) = e-1/12

```
CALC_LOAD(load,exp,n)
load *= exp;
load += n*(FIXED_1-exp);
```
一分钟的光滑常数大概是0.08 8%
五分钟的光滑常数大概是0.02 2%
十五分钟的光滑常数大概是0.01 1%


# 为什么平滑常数要选择(e-5/60)=>e(-1/12) e(-5/300)=>e(-1/60) e(-5/900)e(-1/180) 很明显 即标识的是采样的频率 为什么选择这个数字?或者讲为什么这个数字被使用? e自然对数又是怎么冒出来的?..
[答案看起来在这里 然而我看不懂](https://www.helpsystems.com/resources/guides/unix-load-average-reweighed)
嗯 大概的意思是说 经过一发专业而严谨的统计学分析 正确的平滑常数应该是 12/13 60/61 180/181 然而其计算结果与e(-1/12) e(-1/60) e(-1/180) 误差不到1% 最后换算成固定长度数计算时 只有12/13的数值不一样 1890 1884

## 为什么在brendangregg的文章linux-load-averages中0.62是正常1分钟 system load?
按照公式来就行了
```python
def cal(load,n,exp):
  return load*exp+n*(1-exp)
load = 0;
a = 12/13
print(a)
for i in range(12):
  load = cal(load,1,a)
print(load)
```
最终的结果是0.6173032933229092

## 当前(20190727)linux操作系统计算load average的代码在哪里?
[loadavg.c](https://github.com/torvalds/linux/blob/master/kernel/sched/loadavg.c)

# tips
[wiki](https://en.wikipedia.org/wiki/Load_%28computing%29)最后的note有提到 公式应该是load(t) = n(e^(-5/16)) + load(t-1)(1-e^(-5/16)) 我觉得并不对 作者的公式正确的

# 参考资源
http://www.brendangregg.com/blog/2017-08-08/linux-load-averages.html
https://www.helpsystems.com/resources/guides/unix-load-average-part-1-how-it-works
https://www.helpsystems.com/resources/guides/unix-load-average-part-2-not-your-average-average
https://my.oschina.net/fileoptions/blog/1649492
https://www.helpsystems.com/resources/guides/unix-load-average-reweighed