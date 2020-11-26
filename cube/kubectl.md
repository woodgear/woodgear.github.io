---
id: 'c77a006'
time: '2020-03-21 23:14:4'
---

# 概念
context configmap pod docker namespace
# 获取上次崩溃时日志

[y-pod-is-crashing-or-otherwise-unhealthy](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-pod-replication-controller/#my-pod-is-crashing-or-otherwise-unhealthy)

```
kubectl logs --previous {container_name} -n{name_space} --tail 400
```

# 获取configmap
kubectl get configmap -n ${namespace}
# 编辑环境变量
kubectl edit configmap ${configmap_name} -n ${namespace}
# 常用命令
```bash
kubectl get namespace # list all namespace
```