---
time: '1996-09-08T23:37:07+08:00'
id: 'kln7cuv'
---

# import-package
1. 每个文件中必须指明自己所属的包
2. 每个文件夹下只能有一个包
3. import 语句 `m "test-golang/foo"` 绝对路径 `test-golang`是总的包名 在go.mod中定义 `/foo`是文件夹名 与包名无关 `m` 是此文件夹中存在的包的别名
4. 同一文件夹中(同一包)的不同文件中定义的符号 互相可见   
golang的一个repo由一个或者多个module组成 一个module由一个或多个package组成  package是一个文件夹下一个或多个go源文件, 在相同的package下符号定义互相共享(可以在一个go文件中直接使用定义在另一个go文件但是相同package的符号)
一个repo 一般只含有一个module, module的定义文件是go.mod 其中声明了此module的 module path
首字母大写的符号导出


# 忽略unused xx 报警
```bash
go run -gcflags '-unused_pkgs -unused_vars' xx.go 
```
# dependency 依赖
go mod init xxx (you moudle path),所以一个正常的go的目录结构是这样的
```
you-project-dir
    you-moude-dir
        main.go
    go.mod
```
go.mod 作用类似于package.json或者carg.yaml

## l-function-args
```
func a(a1,a2 string) {

}
```
# test [test](https://golang.org/pkg/testing/)
```go
package xxx
import (
	"fmt"
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestXXXX(t *testing.T) {
    assert.Equal(t, false, false)
}
```
文件名必须以_test 结尾

`go test xxx` xxx是包名字 可以用正则 `go test ./controller/*`
`go test如xx -run TEST_NAME` 只测试特定的函数 只测试特定的函数 

### 如何避免cache
go test --count=1

### 如何输出log
go test -v  // --verbose go test 默认捕获输出.此外可以直接使用t.Logf(")

## 变量定义
```golang
package main

import "fmt"

func main() {

    var a = "initial"
    fmt.Println(a)

    var b, c int = 1, 2
    fmt.Println(b, c)

    var d = true
    fmt.Println(d)

    var e int
    fmt.Println(e)

    f := "apple"
    fmt.Println(f)
}
/*
 go run variables.go
initial
1 2
true
0
apple
*/
```
## control statement
```golang
package main

import "fmt"

func main() {

    if 7%2 == 0 {
        fmt.Println("7 is even")
    } else {
        fmt.Println("7 is odd")
    }

    if 8%4 == 0 {
        fmt.Println("8 is divisible by 4")
    }

    if num := 9; num < 0 {
        fmt.Println(num, "is negative")
    } else if num < 10 {
        fmt.Println(num, "has 1 digit")
    } else {
        fmt.Println(num, "has multiple digits")
    }
}
```
# function-define
```golang
func FUNC_NAME(ARG1 ARG1_TYPE,ARG2 ARG2_TYPE) RET_TYPE {

}
```
# l-string
## l-string-fmt
```golang
// https://golang.org/pkg/fmt/
// golang 采用的是常规的模板方式 %X 一般常用的有%v 打印结构体 %+v 结构体+fieldname %d 数字 %s 字符串
title := fmt.Sprintf("已采集%d个药草, 还需要%d个完成任务", progress, target)
```


##  容器
### list
#### push
```golang
package main

import "fmt"

func main() {
	var s []int
	printSlice(s)

	// append works on nil slices.
	s = append(s, 0)
	printSlice(s)

	// The slice grows as needed.
	s = append(s, 1)
	printSlice(s)

	// We can add more than one element at a time.
	s = append(s, 2, 3, 4)
	printSlice(s)
}
```
# interface
```golang
type INTERFACE_NAME interface {
    FUNC_NAME(ARG) RET_TYPE
}
```
## impl-interface
```golang
package main

import (
	"fmt"
)

type Barkble interface {
	bark() string
}

func cal(b Barkble) {
	fmt.Printf(b.bark())
}

type Dog1 struct {
	name string
}

func NewDog1() *Dog1 {
	return &Dog1{name: "A"}
}
func (d *Dog1) bark() string {
	return d.name
}

type Dog2 struct {
	name string
}

func NewDog2() *Dog2 {
	return &Dog2{name: "B"}
}
func (d *Dog2) bark() string {
	return d.name
}

func main() {
	cal(NewDog1())
	cal(NewDog2())
}
```
# l-struct
```golang
type STRUCT_NAME struct {
    FIELD_NAME FIELD_TYPE,
    FIELD_NAME FIELD_TYPE,
}
```
## l-construct-struct
```golang
type Dog1 struct {
	name string
}
func a() {
    d := Dog1 {
        name:"2"}
}
```
要注意的是如果没有逗号，则}不能另起新行，否则会报错


## l-struct-anonymous
```golang
 []struct{ file, md5 string } 
```

# statement
## select
### loop
```golang

```
## iterator
```golang
a := []string{"Foo", "Bar"}
for i, s := range a {
    fmt.Println(i, s)
}
m := map[string]int{
    "one":   1,
    "two":   2,
    "three": 3,
}
for k, v := range m {
    fmt.Println(k, v)
}
```
# common-container
## list
## array
```go

```
## quque
## map
```golang
package main

import (
	"fmt"
)

type A struct {
	m map[uint64]uint64
}

func main() {
	fmt.Println("Hello, playground")
	a := new(A)
	a.m = make(map[uint64]uint64)
	a.m[1] = 2
	fmt.Printf("%v", a)
}
```
```go
package main

import (
	"fmt"
)

func main() {
	m := make(map[uint64]string)
	m[1] = "1111"
	m[3] = "1111"

	fmt.Printf("%v\n", m)
	fmt.Printf("%v\n", m[1])
	fmt.Printf("%v\n", m[3])
}
```

## l-array-access-syntax
[slice-expressions-in-go](https://medium.com/golangspec/slice-expressions-in-go-963368c20765)
### l-array-range
```golang
package main

import (
	"fmt"
)

func main() {
	a := []int{1, 2, 3, 4}
	b := a[0:1]
	fmt.Printf("%v\n", a)
	fmt.Printf("%v\n", b)

}
// [1 2 3 4]
// [1]
```


# debug
更准确的说 是golang vscoe debug的配置

go test -c 可以直接编译某个测试文件为binary

## 以某个测试为入口 debug

[](https://github.com/microsoft/vscode-go/issues/318)

1. 配置vscode
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "test",
            "program": "${workspaceRoot}",
            "env": {},
            "args": [
                "-test.v",
                "-test.run",
                "TestPing2"
            ],
            "showLog": true
        }
    ]
}
```
2. 在测试文件中打上断点 点击debug


# l-struct-
# l-struct-mixin
## define
```go
type A struct {
	a_name_1 string
	a_name_2 string
}
type B struct {
	A
	b_name_1 string
}

// B  实际的field是 a_name_1 a_name_2 b_name_1
```
## init
```go
a := A{a_name_1: "a_1", a_name_2: "a_2"}
b1 := B{a,"b"}
b2 := B{A:a,b_name_1:"b"}
fmt.Printf("%+v\n", b1)
fmt.Printf("%+v\n", b2)
// 要注意的是不能混用 field:value,value [source](https://github.com/Unknwon/go-fundamental-programming/issues/8)
//[go-playground](https://play.golang.org/p/5BrRMGibttH)
```

# l-profile
go test  -cpuprofile cpu.prof -memprofile mem.prof
go tool pprof mem.prof
web

# l-ffi
## 调用c
## 从c中读取
```c
char * echo(char *name)
```
```golang
```
检测空指针

[]()
# l-json
```golang
type response struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}
```
## l-type-from-json
```golang
res1D := &response{
    Page:   1,
    Fruits: []string{"apple", "peach", "pear"}
}
res1B, _ := json.Marshal(res1D)
fmt.Println(string(res1B))

## 避免html字符转义
https://blog.csdn.net/LinHenk/article/details/89636192


```
```golang
str := `{"page": 1, "fruits": ["apple", "peach"]}`
res := response{}
json.Unmarshal([]byte(str), &res)
fmt.Println(res)
fmt.Println(res.Fruits[0])
```
## l-assert-json-stringl--eq
[](https://gist.github.com/turtlemonvh/e4f7404e28387fadb8ad275a99596f67)


# l-ffi
```c
extern "C" int echo(char *OutBuffer, size_t &OutLen, const char *InBuffer, size_t InLen)
{
    std::memcpy(OutBuffer, InBuffer, InLen);
}
```

### l-call-ffi-dynmaic
```golang
package main


func main() {

}
```

### l-call-ffi-static
#### windows
golang windows 静态链接很麻烦 放弃吧 用动态链接
#### linux

## l-been-ffi
必须能够变成动态或者静态的c库

### l-been-ffi-dynmaic

### l-been-ffi-static