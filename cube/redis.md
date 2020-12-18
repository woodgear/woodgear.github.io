---
id: 'c99ea2'
time: '2020-09-21T15:39:42+08:00'
---
## install
```
docker run -p 6379:6379 --name my-redis -d  redis 
```
## connect
```bash
redis-cli -h 127.0.0.1 -p 6379
```
## delete all keys 

```
redis-cli FLUSHALL
```
## list all keys
keys* 
## monitor
after connect with redis-cli
```bash
redis-cli monitor
```