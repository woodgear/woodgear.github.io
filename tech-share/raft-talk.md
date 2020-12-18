---
time: '1996-09-08T23:37:07+08:00'
id: 'tdzrf32'
---

# disclaim
并不是讲解,不保证正确性,通过lab2a测试,分享理解,欢迎提问,不保证能够正确回答.

# What Raft could/want do
逻辑之外的错误,现实生活中的问题,网络延迟/丢包,断电...
解决的方法: 备份
带来的问题: 备份的同步
## 什么样的模型可以通过备份容错
纯函数/状态机

最终的问题就变成了如何保持每个状态机应用的指令序列一致

# How Raft do?
# log replication

rpc Message {
    index:1,
    term:2,
    data: {vec<u8>}
}

a :l 11 22  >33
b :f 11 22



 l 11  22 55
 f 11  22 33 44

  22 55
 f 11 22 55



//  .....applied....committed.........last
//  --------|--------------------------|

既然我们的应用是状态机模型.达成共识的一个最简单的方法是,所有的请求都只给一个节点(将其称之为Leader节点,使用term标识一个leader的任期),这个节点收到请求后,将请求存储起来(维护自己的command列表), 等到确认所有其他的Node(将其称之为follower)的commandlist和自己的commandlist一致后将这个command喂给应用.
所谓的确保所有Node一致,最简单的做法就是向所有follower发请求,将自己的commandlist灌进去.,统计follower的返回值,确定大多数节点都已经达成同步.更新commit
这样的话在每个节点(follower)上可以保证他们存储的commandlist与被选中的那个节点(leader)是一致的(达成共识的).

leader append only: leader 只会增加自己的log不会删除

### when how commit change? how progress work
>最简单的做法就是向所有follower发请求,将自己的commandlist灌进去

最终要达成的效果是所有Raft节点上的log一致,但方法肯定不是上面那种简单粗暴的方式.
理论上说leader只要将follower没有的部分灌进去即可
## 找到相同的部分(preLogIndex,preLogTerm)
Log Matching Property
1. 在任意节点的log中 给定相同的index和term,data 一定是相同的 (0,0,nill).
log来自于leader leader只会递增index
2. 在任意节点的log中,给定相同的index term,前面的所有index也是相同的
log来自leader leader的同步log时,会保证同步完成后,leader和follower的log是一致的

所以leader只要找到一个自己log中index和term,和follower中的一致,就能知道两者一致的部分了.

Raft共识实际上是一个链式推论的过程, 1. preLogIndex和preLogTerm能够匹配上 + leader只会发送连续的以preLogIndex为前缀的entries,就可以的出所有的log都是连续的

一个简单的方法就是从leader的lastIndex开始发起,一直倒退 总有一个是能够与这个follower匹配上的.
## 发送不同的部分
从已经确定的prelogIndex,和preLogTerm 开始 直接把后面的index发过去
## commit
还有一个问题是leader需要知道follower的lastIndex,这样leader才能确信log已经被分发到了大多数的节点上,才能commit log.
当leader成功的将自己的log分发给follower之后,leader可以确信follower的lastindex和自己的lastindex是一致的.

## 总结
所以为了维护这种信息 leader最起码需要为每个follower维护两个值 Match,Next.
Match: leader确信的follower和自己一定一样的Index,
Next: leader实际上可以直接将Match->LastIndex发给follower,但leader一开始是不知道follower的Match是多少的,Leader必须从LastIndex倒退的尝试去寻找Match,所以需要Next来维护这个游标 

因此leader的整个流程是这样的
1. leader初始化 设置Match为0,Next为LastIndex+1
2. 使用Next-1为PreLoIndex 向follower发送Append
3-1. follower接受log 说明follower的log已经与leader的一致 我们可以得知最新的Match的信息,设置Next为Match+1,可以开始尝试commit了
3-2. follower拒绝log 说明PreLogIndex选取的不对,将Next递减 回到步骤2

而 folloer则比较简单
如果leader发来的preLogTerm和preLogIndex在自己的log中,将leader发来的log存在自己的log里
不存在,拒绝

## leader election
leader有可能出问题,我们需要某种机制恢复

1. leader 定时发送心跳,告知follower自己还活着
2. follower 发现leader出问题了,开始自己尝试当leader

1. 增加term
2. 发送投票请求

fa: 11 22 33 t:3
cb: t:2 22

election safety : 每个term只有一个leader
1. 奇数节点投票,每个节点只投一次,总是能确定是否获胜
2. 投拒绝票给比自己还落后的condidate
                       1,2,3,4
## log compact/snapshot (未实现)
raft实际上维护了一个保持共识的指令序列 然后后面的应用就可以保证自己执行的指令是相同的,如果后面是一个一个只依赖于输入指令的状态机 那么就可以保证所有状态是同步的
但指令序列是无限的 raft实际上保持了所有的指令序列 我们需要gc,但gc带来的一个问题是如何同步那些正好需要同步那些被gc掉的指令 我们需要快照 不再是通过指令序列使得对方达到同步的状态 而是直接将整个状态机安装过去以达到同步的状态.

# 实现 
## tinykv
只有leader节点定时tick检查applied的数量 到达一个给定值 发出一个CompactLogRequest 通过raft达成同步后在apply这个request时 向`raftlog-gc worker`发出`ScheduleCompactLog` 由`raftlog-gc worker`真正的做删除的逻辑
这里的问题是 为什么只有leader做定时的检查 按照论文所说 应该是每个node独立的做gc才对


## tikv

## etcd



## cluster member change.(未实现)
leader将add/remove当中一个entry,通过log replcition保证大多数节点已经认知到这个变化,当这个config commit之后,leader开始同步?


//  snapshot/first.....applied....committed....stabled.....last
//  --------|------------------------------------------------|
//                            log entries