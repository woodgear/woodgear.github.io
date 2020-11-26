---
time: '1996-09-08T23:37:07+08:00'
id: 'rwjuyom'
---

# how to install
## docker
```
docker run -d --hostname my-rabbit --name mq -p 8080:15672 -p 5672:5672 rabbitmq:3-management
```
then login http://localhost:8080/#/ with guest / guest


# 模型
rabbitmq的核心是queue 通过不同的exchange和bindingkey将客户端发来的信息推送到queue上  
对于queue里的一个元素来讲只有一个消费者

对于消费者有routerkey的概念
对于生产者有bindingkey的概念

# minotor
如何查看通过某个exchange的所有msg而不消费这个msg
如何查看通过某个queue的所有msg而不消费这个msg
# 开启 rabbitmq-manager
rabbitmq-plugins enable rabbitmq_management
# 开启trace
```bash
sudo rabbitmqctl trace_on -p /
sudo rabbitmq-plugins enable  rabbitmq_tracing
# rabbitmq_tracing plugin 默认只有 guest 能够访问 tracefile
[only-guest-could-see-trace-file](https://github.com/rabbitmq/rabbitmq-tracing/issues/1)
[修复方式](https://github.com/rabbitmq/rabbitmq-tracing/pull/5#issuecomment-507278511)
```/etc/rabbitmq/advanced.config
[
    {rabbitmq_tracing, [
        {username, <<"USER">>},
        {password, <<"PASS">>}
    ]}
].
```
> Use your own username and password of course. The <<"">> is significant.

# log
rabbitmq-diagnostics status
输出中有log file 路径
```
# 创建用户
```bash
curl -i -u guest:guest --header "Content-Type: application/json" --request PUT --data '{"password":"dev","tags":"administrator"}' http://127.0.0.1:15672/api/users/dev

curl -i -u guest:guest --header "Content-Type: application/json" --request PUT --data '{"configure":".*","write":".*","read":".*"}' http://127.0.0.1:15672/api/permissions/%2F/dev

```

# connection
https://www.rabbitmq.com/uri-spec.html
```
"amqp://guest:guest@127.0.0.1:5672/"
```

# exchange_name router_key binding_key 关系是什么
# tools
rabbitmqctl 看起来不能连接远端的rabbitmq server?
# glassess
given ip port name passed what we can get from rabbitmq
## rabbitmq 版本


# 如何debug 客户端接受不到msg的信息？ exchange routerkey是正确的
1. 检查unroutable exchange  (how???)