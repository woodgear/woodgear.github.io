---
id: 'c99ea2'
time: '2020-09-21T15:39:42+08:00'
---
## install
```
docker run -p 6379:6379 --name my-redis -d  redis 
```
## delete all keys 

```
redis-cli FLUSHALL
```
## list all keys
keys* 