---
time: '1996-09-08T23:37:07+08:00'
id: 'n2ii9e4'
---

# install
```bash
sudo apt-get install libopenblas-base r-base
# sudo apt-get install gdebi
wget https://download1.rstudio.org/rstudio-xenial-1.1.419-amd64.deb
sudo gdebi rstudio-1.2.5033-amd64.deb 
```
# hello world
```
msg <- "Hello World!"
print(msg)
```
# 注释
```r
# this is a comment
```
rstudio中执行ctrl+shift+c
# 执行文件

# 二元函数图
当我们在说我们想画二元函数图的时候 实际上我们是想画一个2维图形,必备的要素有
1. 一个函数式f(x,y) = 1x+2y
2. 我们期望给定的x,y的取值范围
3. 观察3维图像的方法 旋转放缩之类的  

在R语言中 这些操作表示的很完美
```r

# 设置x的取值范围
x <- seq(0, 1, length =100)
# 设置y的取值范围
y <-  seq(1,100)
# 我们想要的函数
f <- fuyction(x, y) {
  0.3*x+0.7/y
}

# 给定数据和函数生成点集
m <- outer(x, y, f)
# 修复溢出的数据
m[is.infinite(m)] <- NA
# 画图 theta 左右旋转角度 0-360 phi 上下旋转角度 0-360
persp(x, y, m,theta=0,phi=0,axes =TRUE,ticktype = "detailed")
```
# 一元函数图
同上只不过不用考虑旋转放缩的问题
```r
f <- function(x) 1/(1+exp(-x))

curve(f,-10,10)
#
```
## 多函数
```r
curve(x^2+3*x+1,-10,5,col="blue")
# 其他函数要指定add=TRUE
curve(x^2+3*x+2,-10,5,col="blue",add=TRUE)
```
# 画线
有时 我们想画些标注线
```r
curve(x^2+3*x+1,-10,5,col="blue")
# h 纵坐标为1 同样 v 表示横坐标为x
abline(h=1, col="gray")
```
# marix
```
#初始化一个size,size的矩阵 注意 矩阵从1开始
m =matrix(0,nrow=size,ncol=size)
print(m[1,1])

```
# 变量定义
```

```
# 函数定义

# 数组定义

# 输出(print)
```
printf <- function(...) cat(sprintf(...))
printf("xxx %s \n","xxx")
```