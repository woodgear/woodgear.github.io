---
time: '1996-09-08T23:37:07+08:00'
id: '8zi4vqf'
---

# registry
npm config set registry https://registry.npm.taobao.org
npm config get registry
# std 
## list
### concat
#### return new array
```js
const a=[1,2]
const b=[3,4]
const c= a.concat(a,b)
assert(a,[1,2])
assert(b,[3,4])
assert(c,[,1,2,3,4])
```
# http client
```js
//npm install axios
const axios = require('axios').default;

async function get_raw_html(url) {
    const raw = await axios(url);
    return raw.data;
}
```
# l-string-format
```js

```
# test framework
## mocha

## l-access-nest-object
乞丐版
```js
const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

const props = {
  user: {
    posts: [
      { title: 'Foo', comments: [ 'Good one!', 'Interesting...' ] },
      { title: 'Bar', comments: [ 'Ok' ] },
      { title: 'Baz', comments: [] },
    ]
  }
}

// let's pass in our props object...
console.log(get(['user', 'posts', 0, 'comments'], props))
// [ 'Good one!', 'Interesting...' ]
console.log(get(['user', 'post', 0, 'comments'], props))
// null

```
# [ramda](https://ramda.cn/)

# l-io
## l-io-file-to
```js
const data = fs.readFileSync('my-file.txt', 'utf8');
```

# iter-of-object
```node
const a = {
  "a":{"a":"a","b":"b"},
  "b":{"a":"a","b":"b"}

}
for (const [i1,i2] of Object.entries(a)) {
  const {a,b}=i2
  console.log(i1,a,b)
}
```
# l-string-format
## js-tagged-templates
[mdn Template_literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
但我们在写形如`xxx${a}`的时候我实际上要求的语义是将"xxx"+a,这是JS默认提供的语义,tagged-templates就是提供让我们能够自定义语义的方法
```js
let person = 'Mike';
let age = 28;

function myTag(strings, personExp, ageExp) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "
  let ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}`;
}

let output = myTag`That ${ person } is a ${ age }`;

console.log(output);
// That Mike is a youngster
```
更高阶的姿势实际上是说tagged-templates实质上是一个接受strings,和key的函数.strings和key正好的是一个接着一个的string[0]key[0]strings[1]key[1]这种,基于这种特性我们可以通过闭包(return 函数)来捕获更多的参数,来做更多的format的操作