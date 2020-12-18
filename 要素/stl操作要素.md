---
id: '33a7a7'
time: '2020-12-18T15:09:43+08:00'
---
## array
### find-union-and-intersection-of-two-unsorted-arrays
给定两个无序数组，返回两个数组的交集
```ts
function findUnionValues<T>(array1:Array<T>, array2:Array<T>) {
  const array2Set = new Set(array2)
  const intersection = array1.filter(x => {
    return array2Set.has(x)
  })
  return Array.from(intersection)
}
```
#### 性能
时间: O(m+n+logn)
空间: ? 
#### 优化点  
1. 比较两个数组的大小
