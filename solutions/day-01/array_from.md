
| 返回一个浅拷贝的数组实例

```Array.from(arrayLike[, mapFn[, thisArg]])```

**目标对象**
* 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
* 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）

**可迭代对象**：内置实现了Symbol.iterator的对象                                      
* Array：浅拷贝
* Map：返回一个二维数组，二维数组的每一项分别为[key, val]
* Set：Array.from(new Set(arr))数组去重
* String：返回单个字符组成的数组
* TypedArray
* 函数的arguments对象：类数组
* NodeList对象：类数组

**类数组**：拥有length属性的对象，且对象其他属性名为数组下标（没有length属性不是类数组）
* 类数组转换成实际数组

eg:
```
  const b = Array.from({length:5},(v,i)=>i)
  console.log(b);  // [0,1,2,3,4]
```

**参数**
* ```Array.from(obj, mapFn, thisArg)``` <==> ```Array.from(obj).map(mapFn, thisArg)```