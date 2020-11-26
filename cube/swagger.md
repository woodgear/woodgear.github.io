---
time: '1996-09-08T23:37:07+08:00'
id: '1nfevxp'
---

# what it is
通过协议指定接口 之后我们就可以自动生成client与server swagger就是这样的一个协议 其描述了restful风格的协议
# concept
[swagger](https://swagger.io/specification/) 描述restful的一套规范
# tags 代表什么?
# schemas 代表什么
看起来	代表请求的数据约束 和返回的数据约束 类似类型的感觉
[Data Models](https://swagger.io/docs/specification/data-models/)
# security 代表什么
# 如何生成 server  client代码 (falsk server js 代码举例)
# 如何标识 方法名 路径 参数 header 压缩方式 期望的返回值 压缩方式
实际上每一个都映射到 yaml中了
本质上讲swagger的协议是无所谓的 问题是swagger的codegen的实现
```yaml
openapi: 3.0.1
info:
  title: vocabulary hunder 
  description: 'This is a api of vocabulary hunder use by all client and server'
  version: 0.0.1
servers:
- url: http://localhost:5000
  description: local dev server

- url: http://vocabularyhunter.com
  description: product server
paths:
  /api/vh/hunter:
    post:
      tags: 
      - server
      summary: 给定一篇文章 获取其中的生词
      parameters:
        - in: header
          name: id
          description: 用户id
          schema:
            type: string
          required: true
      requestBody:
        description: body是json 含有 article 属性
        content:
          application/json:
            schema:
              type: object
              properties:
                article:
                  type: string
              example:
                article: "Those who do not understand Unix are condemned to reinvent it, poorly.
– Henry Spencer, Usenet signature, November 1987
"
        required: true
        
      responses:
        '200':
          description: "正确的获取了未知单词列表"
          content:
            application/json:
              schema:
                type: array
                items: 
                  type: string
                example: ["condemned"]
        default:
          description: 嗯 总之就是出错了

```


我们不应当让swagger生成的server主导我们的业务 所以每一个swagger的server的codegenerstor都应该是自己手写的 client的话用swager就好不用那么麻烦了

# reference
swagger的prptocol允许我们在yaml中定义引用 在上面的例子中每个schema下面的部分我们时直接写出来的 但是 实际上可以把他抽出来单独定义 便于 复用 和保持抽象浓度
```yaml
etc
etc
      responses:
        '200':
          description: "alla"
          content:
            application/json:
              schema:
                type: array
                items: 
                  $ref: "#/components/schemas/a"
          
        default:
          description: "error"
components:
  schemas:
    a:
      properties:
        id:
          type: integer
        name:
          type: string
```