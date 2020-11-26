---
id: '21bcee'
time: '2020-09-16T13:35:01+08:00'
tag: server-framework-要素
---
> that's truely amzaing that koa only contains four file.
# how koa works
> koa将中间件作为server设计的原语.  
> 洋葱模型的中间件,将调用下层中间件的权利交给了上层中间件.  

下面50行代码基本就是koa的核心了
```js
use(fn) {
    this.middleware.push(fn);
    return this;
}

callback() {
    // http server 使用此函数
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
}

handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}

createContext(req, res) {
    // 可以忽略 基本上就是各种赋值
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
}
  

```
因此本质上koa啥都没有,最多只是一种写中间件的方式 >万事万物都是中间件 2333

在浓缩的话甚至可以变成一行
```js
compose(this.middleware)(this.createContext(req, res)).then((ctx)=>{ctx.res.send(ctx.body)})
```
koa的本质在于compose的实现,其是如何组织中间件调用的
## how compose works
现在我们想要做的实际在是在每个middleware的调用next时调用下层的middleware,等待返回然后自己再return. 其同步版的代码大概是
```js
function compose(ms) {
  return function (context) {
    return dispatch(0)
    function dispatch (i) {
      if (i==ms.length) {
        return 
      }
      ms[i](context,()=>{dispatch(i+1)})
    }
  }
}
```
本质上讲,是个递归的调用,通过闭包传递了要调用的中间件的序号.
```js
// the real koa-compose
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
[online-playground](https://playcode.io/672763)

## how convert works
convert 本身对于koa没什么太大的价值,主要是做兼容,将之前基于generator的写法变成基于promise的写法.具体如何做的可能会在另一篇文章中分析.

## the normal elements
### router
router 本质上讲是对一个服务的描述,如同protobuf文件对rpc服务的描述一样,一个胶水层.
#### oneshot
#### stream
### client
### auth

### db

### log
