---
time: '1996-09-08T23:37:07+08:00'
id: 'vmcpwuk'
---

# How to specify test directory for mocha?
```
mocha server-test
Or if you have subdirectories use this:
mocha "server-test/**/*.js"
Note the use of double quotes. If you omit them you may not be able to run tests in subdirectories.
```