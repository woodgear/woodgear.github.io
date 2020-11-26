---
tag: 'tinykv,raft'
time: '1996-09-08T23:37:07+08:00'
id: 'cdkfubl'
---

# Raft

Raft实际上要求使用者是必须是状态机模型,Raft负责保证状态机的输入是一致的,
在此之上,我们就可以通过在启动多个同样的状态机,来保证当出现状态机本身逻辑之外的错误时,能有一个未遭遇此错误的状态机正常,从而达到容错的作用
每个Node维护一个command列表,当确定集群中大多数节点共享相同的commands时(达成共识),将这些command应用到应用的状态机中,达成共识的commandlist是不可修改的(imuate)

既然我们的应用是状态机模型.达成共识的一个最简单的方法是,所有的请求都只给一个节点(将其称之为Leader节点),这个节点收到请求后,将请求存储起来(维护自己的command列表), 等到确认所有其他的Node(将其称之为follower)的commandlist和自己的commandlist一致后将这个command喂给应用,所谓的确保所有Node一致,最简单的做法就是向所有follower发请求,强行将自己的commandlist灌进去.,这样的话在每个节点(follower)上可以保证他们存储的commandlist与被选中的那个节点(leader)是一致的(达成共识的).在这种情况下,实际上无论谁被选中都是一样的,Node的状态是一致的,他们是等价的.现在,假设这个被选中的Node(leader)突然出现了问题(非逻辑问题,而是诸如断网,磁盘空间不够等问题),我们可以直接请求其他的Node,因为他们是等价的,这样就是所谓的容错性.

Raft描述的就是在 
1. 上述概念下的优化(实际上不用将全部的cmdlist发给follower),
2. 一些具体的关于如何维护节点commandlist一致,和为什么这样就一致了的证明,
3. 如何选择Leader节点,
4. 与在此之上的一些操作(扩容),
5. 和从现实角度考虑会遇到的一些问题的解决方法(commandlist是无限的,但存储是有限的 snapshot)
6. 客户端如何向一个Raft集群发起请求

## tiny
1. TinyKV 将Raft抽象封装到Node这个概念中,使用Node的人,通过读取Node.Ready()方法返回的command list来获取那些达成共识的command.将这些command应用到状态机中
2. 由使用者维护HardSate(Config信息) Entries(命令) Snapshot(使用者自身状态) 的持久化
3. 协助Node之间完成交流,将Node的command发送给对应的Node,将接受到的command交给自己的Node
4. 定时调用Node的tick方法,来保证Node内部一些依赖于时间的操作(heartbeattimeout,electionTimeout) 正常完成

### 重启
在重启时,Raft Node 需要能够帮助状态机恢复状态
1. 对于保存起来的commandlist 和snapshot 这个snapshot的最后一个command的Index

### snapshot
对于一个内存状态机(状态机所有状态维护在内存中)来讲,如果想要恢复到其中的某个状态 1. 从头开始将commands再执行一遍 2. 想办法将状态机的内存表示持久化起来  
snapshot实际上就是内存状态机的持久话的内存表示方式.  
有了snapshot之后,达到这个状态之前的log实际上已经不需要了 可以直接删除.

### ready/Advance 指的是什么?
Ready: 有新的index被commit了
Advance: 应用已经应用了Commit的Index,可以apply了

## log replication 
>最简单的做法就是向所有follower发请求,强行将自己的commandlist灌进去

最终要达成的效果是所有Raft节点上的log一致,但方法肯定不是上面那种简单粗暴的方式.
Raft共识实际上是一个链式推论的过程, 1. preLogIndex和preLogTerm能够匹配上 + leader只会发送连续的以preLogIndex为前缀的entries,就可已的出所有的log都是连续的
如果leader知道ofollower的log和自己相同的那部分(preLogIndex),那么实际上只要发送preLogIndex之后的部分即可了.
问题在于如何知道
一个简单的方法就是从leader的lastIndex开始发起,一直倒退 总有一个是能够与这个follower匹配上的.

还有一个问题是leader需要知道follower的lastIndex,这样leader才能确信log已经被分发到了大多数的节点上才能commit log
当leader成功的将自己的log分发给follower之后,leader可以确信follower的lastindex和自己的lastindex是一致的.

所以leader需要知道follower的log和自己的相同的部分 

所以为了维护这种信息 leader最起码需要为每个follower维护两个值 Match,Next.
Match: leader确信的follower和自己一定一样的Index,
Next: leader实际上可以直接将Match->LastIndex发给follower,但leader一开始是不知道follower的Match是多少的,Leader必须从LastIndex倒退的尝试去寻找Match,所以需要Next来维护这个游标 

因此整个流程是这样的
1. leader初始化 设置Match为0,Next为LastIndex
2. 使用Next-1为PreLoIndex 向follower发送Append
3-1. 成功 说明follower的log已经与leader的一致 我们可以得知最新的Match的信息,设置Next为Match+1,可以开始尝试commit了 TODO ??? 发送与返回异步的问题
3-2. 失败 说明PreLogIndex选取的不对,将Next递减 回到步骤2


## commit/sendmsg
>Q: 在那些情况下 我们可以commit?
>A: 在commit可能发生变化的情况下
>Q: 在那些情况下,commit可能发生变化

对于leader来讲的话,是Match发生变化的时候,即step AppendResponse的时候
对于follower来讲,是每次能够观察到lederCommit的时候,即step Append 和 Heartbeat的时候
在什么时候会发送Append和Heartbeat?
什么时候发送Append
有新的LogEntry的时候
1. leader becomeleader
2. client propose

上述是一种push base的思路
但AppendEntries的一个特性是他是Next->LastIndex,如果Next没有改变,仅仅是LastIndex向后了,那么发送的两个msg中,第一个msg的内容已经被第二个所包含了,在这种情况下,follower会收到重复的信息,这是不应当的.

如果是pullbase的思路呢?
只有等到真正发送msg时才去产生msg


# tips 
candidat选举超时立刻开始新一轮的选举
# question
## 假设一个raft节点 网络突然隔离 其会一直递增自己的选期,突然网络好了,会导致整个raftu集群被重置?
## 一个raftnode在重启后能重置那些信息?
lastIndex,lastIndexTerm 可以直接从logs中拿到
## pers 的matchIndex和nextIndex是如何工作的
match初始化为0 next初始化为lastIndex+1,在sendAppend时preLogIndex实际上是next-1 entries是[next,lastIndex],在AppendResponse时更新Next为LastIndex+1 Match=Next
## 如何保证leader不会commit之前的term的Index?

## 在初始化状态时 Prs的值是什么 AppendResponse 如何导致Prs的变化 sendApeend时如何根据Prs发送?

## 有3个节点 现在收到一个client的propose 将其bcast给自己的follower 收到follower的回复 此时收到了一个节点的回复 可以commit 但是另一节点还没回复 如果直接调用append的话 相当于冗余的又发送了一次

## 当出现网络分区的情况时 leader如何作出感知 以避免发送无法到达的log 浪费带宽

# snapshot 
假设只是为了获得prelogTerm就将snapshot发送给follower是不是有点过分??



# raftstore.go
一个raftstore代表的是一个node上的region的集合

# test_raftstore/cluster.go
一个mock版的cluster 负责创建db的路径

## 当我在GenericTest中调用cluster.StopServer时发生了什么
cluster->nodesimulator->node->raftstore.shutdown
## worker在做什么
raftworker被raftstore的startWorkers中起了一个协程调用起来 在run方法中select closech(结束信号) 或者raftch(raftmsg)调用对于peer的HandleMsg 之后调用所有peer的HandleRaftReady
## snapshot如何工作

对应结构
eraftpb的 snapshot SnapshotMetadata
rspb的 RaftSnapshotData
snap的snapshot

以TestOneSnapshot为分析入口
应当是讲snapshot的整个一生 从产生到发送到接受到apply到销毁

产生 当leder 进行log-replcation 调用sendAppend 尝试获取要发送的entries时 此时会发现 某个log entry 因为Compact导致无法获取 此时就要调用snapshot方法来获取并发送snapshot了
因此 第一个log应当是sendAppend中发现ErrCompact
入口点应当是peer_storage的snapshot
### peer_storage snapshot
每次调用 如果不是genrating状态 会向regionSched发送RegionTaskGen请求 后面在次调用时会尝试从channel读取结果
ps的regionsched 实际上是在raftstore的loadpeers中使用ctx.regionTaskSender 设置的 真正 连接到的是regionWorker的sender 在startWorkers中被start起来
worker实际上在做的就是在start方法中(worker.go) 起了一个协程 不停的从channel中读取task 交给handle Handle 这些task

在region_task.go中 的hadnle实现里 收到了RegionTaskGen的task后 调用taskhandle的ctx的handlegen方法
NewRegionTaskHandler的ctx中 有从构造函数中传递进来的engines和snapmanager的引用
在ctx snapContext的handlegen中 调用dosanpshot 成功了就通过channel将snap返回 这个channel 就是我们在peer_storage中 设置的channel

### region_task dosnapshot
获取给定region的 appliedIndex 和Term
生成一个snapkey 调用snapmr的Register方法 在函数结束时dregister
获取给定region的regionLocalstae
给定 snapkey 调用snapmgr的GetSnapshotForBuilding 
给定snapmgr 和region信息 嗲用 GetSnapshotForBuilding 的build方法
build方法会初始化好snapshotData 
将这个snapshotData Marshal到 通过applied index term region的confstate构造一个snapshot的data属性中
#### snapmgr的Register
snapshot是上层应用的一个快照 这里的上层应用就是 借助raft的kv 就是badger数据库 snapmgr维护了那些快照的状态(那些region在生成快照 生成的进度如何 sending recving generating)

register就是将这次想要生成的snapkey 存在snapmgr中
snapkey格式为 region_term_index

#### snapmgr的Deregister
同上dregister 就是把snapkey从snapmgr中
#### snapmgr的GetSnapshotForBuilding
调用NewSnapshotForBuilding
NewSnapshotForBuilding 调用NewSnap 然后 initForBuilding
##### NewSnap
构造snap的Snap结构体里面包含 cffiles meta 的path

如果发现meta文件存在的话就尝试loadmetafile metafile metafile中存放的是
snapshotMeta里面是SnapshotCFFile的信息 在load时会检查metafile中所指向的那些cfgfile的大小和md5

##### initForBuilding
snap根据NewSnap设置好的cfFile和metaFile的path 填充对应的文件句柄 设置cfFile的 SstWriter table.NewExternalTableBuilder 这是badger的功能

#### snap.snapshot的build方法、
调用newSnapBuilder build
##### build
对于每个cffile 根据region的startkey和endkey从 调用kv的transaction 获取数据 调用cfFile的 SstWriter方法 add进去


saveCFFiles 调用cfile.SstWriter.fish 将之前add的内容写入文件 设置cfFile的checkSum
saveMetaFile 将metafile 的Meta信息写入到metafile的path中

到这里 dosnapshot就ok了 
###  发送snapshot
peer_storage 的snapshot正常返回后raft会把它当作正常的msg推到待发送msg的队列中 在peer_mag_handle的sendRaftMessage中调用trans的send方法  
trans在tinykv中有两个实现 一个是transport.go中的ServerTransport 一个是kv/test_raftstore/node.go中的MockTransport
snapshot重载了read 方法 当send时实际上读取cffile的内容然后发出去

# GenericTest在做什么
如果crash为true 那么停掉所有的server  然后再启动

# snapshot正常逻辑
1. leader gc
2. leader sendAppend find compact,build snapshot
3. snapshot build ok,send it
4. ready peer_msg_handle use trans send msg
5. mock trans copy snap to target,and trigger snap msg
6. tragrt step snapmsg
7. save to raftlog
8. ready
9. peer_msg_handle save ready state
10. applysnapshot send to region_task to apply
11.  update raftstate applystate etc