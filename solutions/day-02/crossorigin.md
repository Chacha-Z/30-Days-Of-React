| script标签不受跨域限制，那么crossorigin属性到底做了什么？

1. 得到完整的错误信息：
   1. 设置 crossorigin属性后，script标签去请求资源的时候，request会带上origin头，然后会要求服务器进行 cors校验，跨域的时候如果response header 没有 ‘Access-Control-Allow-Origin’ 是不会拿到资源的。
   2. cors验证通过后，拿到的script运行内部报错的话，，window.onerror 捕获的时候，内部的error.message可以看到完整的错误信息，否则只能看到‘script error’
2. 定义跨域cookie发送表现
   1. crossorigin的属性值分为 anonymous和use-credentials。如果设置了crossorigin属性，但是属性值不正确的话，默认是anonymous。
   2. anonymous代表同域会带上cookie，跨域则不带上cookie，相当于 fecth请求的credentials: 'same-origin'。
   3. use-credentials跨域也会带上cookie，相当于fetch请求的 credentials: 'include'，这种情况下跨域的response header 需要设置'Access-Control-Allow-Credentials' = true，否则cors失败。


**总结**
1. 设置了crossorigin就相当于开启了cors校验。
2. 开启cors校验之后，跨域的script资源在运行出错的时候，window.onerror可以捕获到完整的错误信息。
3. crossorigin=use-credentials可以跨域带上cookie。


**为什么浏览器默认限制获取跨域脚本的错误信息**
这其实跟网络安全有关，不妨举一个例子来说明。

先假设浏览器默认可以将跨域脚本的错误信息返回。

这个时候我在我的博客里写下如下代码：
```html
<script src="http://某个银行/会员信息网址">
<script src="http://某个银行2/会员信息网址">
```
注意 src 里面提到地址，都是 HTML 页面的地址，当成 JS 来执行，肯定是会报错的。
因为我们假设浏览器能报具体错误，这个错误可能是类似于：

“请登录” is undefined.
“您好” is undefined.
我们通过报错信息的不一致，可能可以推断出当前访问我博客的会员在某某银行是否有账号。虽然不是什么大问题，但隐私的确是泄漏了，如果我是攻击者我可能会通过判断会员在某家银行是否有账号，『精准』推送相关的钓鱼网站给他。
