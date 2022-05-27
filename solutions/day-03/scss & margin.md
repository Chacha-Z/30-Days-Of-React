#### **react中支持sass scss**

```npm install node-sass --save```

**sass和scss的区别**

sass 是一种类 Ruby 的缩进式语法，对空格敏感，不使用花括号而使用缩进，并且每个属性之间通过换行来分割；SCSS 可以看作 SASS 的语法改良版，与 CSS 完全兼容。


**常见功能**
1. 嵌套：使用 & 选中当前元素的父元素，```&:after { }```
2. 变量：```$color: #111111```;
3. 混合器：@mixin，提取重复代码段以复用；使用@include引入，插入CSS代码片段中
  ``` CSS
      @mixin get-border-radius($border-radius:5px,$color:red){
        -moz-border-radius: $border-radius;
        -webkit-border-radius: $border-radius;
        border-radius: $border-radius;
        color:$color;
      }
  ```
4. 继承：%，定义一个被继承的样式，类似静态语言中的抽象类，他本身不起作用，只用于被其他人继承；@extend，继承%或另一个选择器
5. 其它：基础运算，+-*/%

#### **margin-top塌缩**

为什么会有溢出：针对多个段落margin设置的历史遗留问题

什么情况下会发生：

1. 元素的底边与其同级元素的顶边塌陷；
2. 元素的上边距或下边距在与第一个子元素的边距接触时塌陷。

sol：同级元素——构造BFC，只有同一个BFC内的block-level boxes的垂直margin会塌陷；父子元素——设置padding或border等。