---
id: '084cc3'
time: '2020-11-10T09:52:11+08:00'
status: draft
---
本文尝试总结api(restful api)描述文件的一些要素.以此来指出从这种api描述文件中直接生成代码所依赖的要素有那些.同时还会介绍[openApi 3.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md)中对这些要素的具体说明,以及如何用ts实现一个简单但足够实用的openapi code generator.

## 对路由的描述
1. 路由描述 method url parameter query body response
2. 注释 上述每个都可以有注释
### 描述参数
```yml
paths:
  /users/{userId}:
    get:
      summary: Get a user by ID
      parameters:
        - in: path
          name: userId
          schema:
            type: integer
          required: true
          description: Numeric ID of the user to get
```
### option field and default value
默认所有的field都是optional的只有特意指定了required之后才是require的,object下面的可以指定required的列表
```yml
components:
  schemas:
    CreatePeriodBody:
      type: object
      required:
        - name
        - time_range
      properties:
        name:
          type: string
        time_range:
          type: object
          required:
            - start_at
            - end_at
          properties:
            start_at:
              type: number
            end_at:
              type: number
```
## object/nested object

## enum
openApi支持枚举 但是只支持string enum不支持 integer enum,看起来有一堆[PR](https://github.com/OAI/OpenAPI-Specification/issues/681)

## field/object restricted

## name style cast

## custom information

使用`x-`开头的标记
[OpenAPI Extensions
](https://swagger.io/docs/specification/openapi-extensions/)
```yaml

```