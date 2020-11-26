---
time: '1996-09-08T23:37:07+08:00'
id: '4kh2ivx'
---

sed 默认只是将替换后的文本输出,不会直接写入文件

# replace in file with a backup
```bash
# sed -i[SUFFIX] 's/PATTERN/REPLACH/g' FILE
sed -i.bak 's/TestPass/TestPaperPass/g' ./raft/raft_test.go
```
# replace in shell