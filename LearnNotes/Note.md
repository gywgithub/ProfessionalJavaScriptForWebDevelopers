# Learn Notes

> 内容扩展，总结，思考...

### 随机数与安全

#### Math.random()

JavaScript高级程序设计（第4版）

> `Math.random()` 方法返回一个 0~1 范围内的随机数，其中包含 0 但不包含 1。

MDN

> Math.random() 函数返回一个浮点，伪随机数在范围0到小于1，也就是说，从0（包括0）往上，但是不包括1（排除1），然后您可以缩放到所需范围。实现将初始种子选择到随机数生成算法；它不能被用户选择或重置。
> 
> 一个非密码学安全的随机数来源。

JavaScript4 高级程序设计（第4版）中 **注意** 提示：

> Math.random()方法在这里出于演示目的是没有问题的。如果是为了加密而需要生成随机数（传给生成器的输入需要较高的不确定性），那么建议使用window.crypto. getRandomValues()。


#### 思考

之前没看到关于 `Math.ramdom()` 的类似提示，发现日常开发中有时也会遇到通过 `Math.random()` 进行一些基础的随机加密操作，但从来没意识到安全问题。接下来看下 `window.crypto. getRandomValues()`

#### window.crypto.getRandomValues()

MDN

> Crypto.getRandomValues() 方法让你可以获取符合密码学要求的安全的随机值。传入参数的数组被随机值填充（在加密意义上的随机）。
> 
> 为了确保足够的性能，不使用真正的随机数生成器，但是它们正在使用具有足够熵值伪随机数生成器。它所使用的 PRNG 的实现与其他不同，但适用于加密的用途。该实现还需要使用具有足够熵的种子，如系统级熵源。

在浏览器中运行

![window.crypto.getRandomValues()](imgs/getRandomValues.png)

#### 总结

开发中如果只是随意生成一个数字，可以直接使用 `Math.random()`,如果涉及到安全就需要使用 `window.crypto.getRandomValues()` 了，注意这里的 `getRandomValues` 的参数传递，在使用时也需要确保 `window.crypto.getRandomValues` 可用，在 node 中使用需要安装 get-random-values 库。


#### 参考链接

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random

https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto

https://developer.mozilla.org/zh-CN/docs/Web/API/RandomSource/getRandomValues

https://www.npmjs.com/package/get-random-values
