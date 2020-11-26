---
id: 'd0eyolv'
time: '2019-12-29T11:11:02+08:00'
---

# 安装
```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-245.0.0-linux-x86_64.tar.gz
# 20191229 google-cloud-sdk-245.0.0-linux-x86_64.tar.gz md5 6c824a4760f3bd58c3bcc40a689dfc42
tar zxvf google-cloud-sdk-245.0.0-linux-x86_64.tar.gz google-cloud-sdk
./google-cloud-sdk/install.sh
# 执行完成之后要重启terminal
```
# 配置kubectl
```bash
#理论上讲自己直接装也是可以的
gcloud components install kubectl
# 首先要有一个project gcloud projects list 列出id
gcloud config set project project-id
# gcloud container clusters list # list cluster
# gcloud container clusters get-credentials $CLUSTER_NAME --region $REGION
gcloud container clusters get-credentials standard-cluster-1 --region us-central1-a

# 然后用可以通过kubectl 验证一下
kubectl config get-contexts
kubectl get po
```
必须开代理设置http(s)_proxy 环境变量

# 销毁
```
gcloud projects delete PROJECT_ID
```

# 扩容
```bash
#gcloud compute disks resize $DISK_NAME $NEW_DISK_SIZE --zone $ZONE
gcloud compute disks resize vh-dict 2GB --zone us-central1-a
```
不过好像有个bug 重启之后kubectl pod中的container(docker)好像并没有自动识别到扩容后的磁盘 lsblk 是正常的但是df -h 还是不对  
震惊  `New disk size '1' GiB must be larger than existing size '2' GiB.`