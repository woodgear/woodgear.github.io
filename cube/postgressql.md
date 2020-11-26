---
time: '1996-09-08T23:37:07+08:00'
id: 'pisrftj'
---

# cli 
```
su postgres      
Password: 
postgres@kaka:/home/oaa$ psql
psql (10.10 (Ubuntu 10.10-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# help
You are using psql, the command-line interface to PostgreSQL.
Type:  \copyright for distribution terms
       \h for help with SQL commands
       \? for help with psql commands
       \g or terminate with semicolon to execute query
       \q to quit
postgres=# 
```
## 登录
与mysql 的登录流程不同
psql有一个perr的登录概念
当在pg_hba.conf 设置了之后
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             postgres                                peer
```
psql -U postgres 必须使用相同的unix用户名登录
tail -f  /var/log/postgresql/*
```
provided user name (postgres) and authenticated user name (oaa) do not match
```
在psql中 当前用户名 角色名 数据库名是 有所关联的



## list user
\du
## delete user
drop role xxx; # ;很重要