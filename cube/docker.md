---
tag: 'docker,docker-compose'
id: '264dbff'
time: '2020-03-22T07:14:47+08:00'
---

# how-to-ignore-files-from-your-docker-images
create a file name [.dockerignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file)
# how to run with shell change enter point
docker run  --entrypoint /bin/bash -it xx
# keep alpine in background
```sh
docker container run -d  alpine  tail -f /dev/null 
```
# expose port
docker run -p 127.0.0.1:80:8080 

# 运行时容器端口映射
不能
# 设置自启
[start-containers-automatically](https://docs.docker.com/config/containers/start-containers-automatically/)
```bash
docker update --restart=no my-container
docker update --restart=always my-container
docker run -d --restart=always redis
```
# 设置环境变量 set-env
```
docker run --env a=b IMAGE
```
# query restart policy
```bash
docker inspect -f "{{ .HostConfig.RestartPolicy }}"  NAME
```
# 外部访问容器端口
docker inspect 查看ip 直接通过ip访问
# 容器内部直接通过某种方式访问宿主机端口
目前好像没有对于全部平台通用的方式
[docker-container-access-host-network](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)
## mac/windows
直接使用host.docker.internal
## linux
使用host mode
```
docker run IMAGE --noauth --bind_ip=0.0.0.0
```
# docker-compose
docker-compose 可以当作docker一样使用 区别在于docker-compse 使用yaml配置文件 可以方便的配置duogedocker协作的情况 用docker的话就只能用shell脚本了

[what docker-compse is](https://beginor.github.io/2017/06/08/use-compose-instead-of-run.html)

docker-compose 会去当前目录找docker-compose.yaml
## port 
HOST:CONTAINER 
## docker build 
```bash

```
## docker name format (invalid reference format)
```bash
# 注意:是关键字 a和b中不能包含:
docker build -t a:b
```
## push dockerhub
```bash
# docker login -u $name -p $pass $server
docker login
# 所以只要你的docker-image的名字是正确的就能直接推上去
# docker tag exist-docker-image new-docker-image
docker push user-name/image:version
```
# volume
```bash
docker run -v HOST:CONTAINER -p HOST:CONTAINER
```
# aliyun
```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://yxjrbm4q.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

docker run --name send -d -p 1443:1443 moerats/send
```
## 指定network namespace
```bash
docker container run -ti --network=container:nginx alpine
```
## get_pid_by_container_name
docker inspect --format '{{.State.Pid}}' $name

# network
## create

## list

# network and network namespace
在docker中相同的network并不共享相同的network namespace