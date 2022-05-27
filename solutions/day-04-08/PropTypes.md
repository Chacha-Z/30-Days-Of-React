```import PropTypes from 'prop-types'```

对props进行类型检查，主要针对TypeError，是一个在 编码 阶段提供类型检查的方案，错误以 console 方式反馈

**基本使用：**

```js
// 类型限制
MyComponent.propTypes = {
  optionalArray: PropTypes.array,
  requiredArray: PropTypes.array.isRequired,
}

//默认值
MyComponent.defaultProps = {
  optionalArray: ['我是默认值!'],
}
```

**扩展验证器**
```js
// 数组、布尔、函数、数字、对象、字符串、symbol
MyComponent.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 你也可以声明一个 prop 是类的一个实例。
  // 使用 JS 的 instanceof 运算符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以声明 prop 是特定的值，类似于枚举
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是多种类型其中之一
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个某种类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 属性值为某种类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个特定形式的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你可以使用 `isRequired' 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告。
  requiredFunc: PropTypes.func.isRequired,

  // 任何数据类型的值
  requiredAny: PropTypes.any.isRequired,

  // 你也可以声明自定义的验证器。如果验证失败返回 Error 对象。不要使用 `console.warn` 或者 throw ，
  // 因为这不会在 `oneOfType` 类型的验证器中起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 也可以声明`arrayOf`和`objectOf`类型的验证器，如果验证失败需要返回Error对象。
  // 会在数组或者对象的每一个元素上调用验证器。验证器的前两个参数分别是数组或者对象本身，
  // 以及当前元素的键值。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};

```

**移除代码中的propsType代码**

> 在生产环境，我们并不需要prop-types生成的代码

> 当process.env.NODE_ENV === 'production'时prop-types自动为我们关闭了类型校验，但那些propTypes代码不会被移除。（参见prop-types源码）

安装插件：

```npm install --save-dev babel-plugin-transform-react-remove-prop-types```

在.babelrc中配置
```json
"env": {
  "production": {
    "plugins":  [
      [
        "transform-react-remove-prop-types",
        {
          "mode": "remove",
          "removeImport": true,
          "ignoreFilenames": ["node_modules"]
        }
      ]
    ]
  }
}
```
复制代码以上配置指定当```process.env.NODE_ENV === 'production'```时，触发清除。参数介绍如下:

```mode```: 清除prop-types生成的代码

```removeImport```: 清除import引入的代码

```ignoreFilenames```: 忽略node_modules中的代码

**参考**

React 快速上手 - 10 类型检查 PropTypes：https://juejin.cn/post/6844904180574846984

移除react项目中prop-types代码：https://juejin.cn/post/6844903613676912647