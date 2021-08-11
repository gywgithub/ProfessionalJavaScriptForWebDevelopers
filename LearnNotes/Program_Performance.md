# Program performance

> 程序性能相关整理


#### 2.1.4 动态加载脚本

> 除了<script>标签，还有其他方式可以加载脚本。因为 JavaScript 可以使用 DOM API，所以通过向 DOM 中动态添加 script 元素同样可以加载指定的脚本。只要创建一个 script 元素并将其添加到DOM 即可。

~~~
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
document.head.appendChild(script); 
~~~

当然，在把 HTMLElement 元素添加到 DOM 且执行到这段代码之前不会发送请求。默认情况下，以这种方式创建的<script>元素是以异步方式加载的，相当于添加了 async 属性。不过这样做可能会
有问题，因为所有浏览器都支持 createElement()方法，但不是所有浏览器都支持 async 属性。因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载：

~~~
let script = document.createElement('script'); 
script.src = 'gibberish.js'; 
script.async = false; 
document.head.appendChild(script); 
~~~

以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响它们在资源获取队列中的优先级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。要想让预加载器知道这些
动态请求文件的存在，可以在文档头部显式声明它们：

~~~
<link rel="preload" href="gibberish.js"> 
~~~


#### 3.1.5 语句


ECMAScript 中的语句以分号结尾。省略分号意味着由解析器确定语句在哪里结尾，如下面的例子所示：

~~~
let sum = a + b // 没有分号也有效，但不推荐
let diff = a - b; // 加分号有效，推荐
~~~

即使语句末尾的分号不是必需的，也应该加上。记着加分号有助于防止省略造成的问题，比如可以避免输入内容不完整。此外，加分号也便于开发者通过删除空行来压缩代码（如果没有结尾的分号，只
删除空行，则会导致语法错误）。加分号也有助于在某些情况下提升性能，因为解析器会尝试在合适的位置补上分号以纠正语法错误。
多条语句可以合并到一个 C 语言风格的代码块中。代码块由一个左花括号（{）标识开始，一个右花括号（}）标识结束：

~~~
if (test) { 
 test = false; 
 console.log(test); 
} 
~~~

if 之类的控制语句只在执行多条语句时要求必须有代码块。不过，最佳实践是始终在控制语句中使用代码块，即使要执行的只有一条语句，如下例所示：

~~~
// 有效，但容易导致错误，应该避免
if (test) 
 console.log(test); 
// 推荐
if (test) { 
 console.log(test); 
} 
~~~

在控制语句中使用代码块可以让内容更清晰，在需要修改代码时也可以减少出错的可能性


#### 3.5.10 赋值操作符

简单赋值用等于号（=）表示，将右手边的值赋给左手边的变量，如下所示：

~~~
let num = 10; 
~~~

复合赋值使用乘性、加性或位操作符后跟等于号（=）表示。这些赋值操作符是类似如下常见赋值操作的简写形式：

~~~
let num = 10; 
num = num + 10;
~~~

以上代码的第二行可以通过复合赋值来完成：

~~~
let num = 10; 
num += 10; 
~~~

每个数学操作符以及其他一些操作符都有对应的复合赋值操作符：

~~~
- 乘后赋值（*=）
- 除后赋值（/=）
- 取模后赋值（%=）
- 加后赋值（+=）
- 减后赋值（-=）
- 左移后赋值（<<=）
- 右移后赋值（>>=）
- 无符号右移后赋值（>>>=）
~~~

这些操作符仅仅是简写语法，使用它们不会提升性能。


#### 3.6.9 with 语句

> 警告 由于 with 语句影响性能且难于调试其中的代码，通常不推荐在产品代码中使用 with
语句。


#### 4.3.3 性能

垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失，因此垃圾回收的时间调度很重要。尤其是在内存有限的移动设备上，垃圾回收有可能会明显拖慢渲染的速度和帧速率。

开发者不知道什么时候运行时会收集垃圾，因此最好的办法是在写代码时就要做到：无论什么时候开始收集垃圾，都能让它尽快结束工作。

现代垃圾回收程序会基于对 JavaScript 运行时环境的探测来决定何时运行。探测机制因引擎而异，但基本上都是根据已分配对象的大小和数量来判断的。比如，根据 V8 团队 2016 年的一篇博文的说法：

“在一次完整的垃圾回收之后，V8 的堆增长策略会根据活跃对象的数量外加一些余量来确定何时再次垃圾回收。”

由于调度垃圾回收程序方面的问题会导致性能下降，IE 曾饱受诟病。它的策略是根据分配数，比如分配了 256 个变量、4096 个对象/数组字面量和数组槽位（slot），或者 64KB 字符串。只要满足其中某个条件，垃圾回收程序就会运行。这样实现的问题在于，分配那么多变量的脚本，很可能在其整个生命周
期内始终需要那么多变量，结果就会导致垃圾回收程序过于频繁地运行。由于对性能的严重影响，IE7最终更新了垃圾回收程序。

IE7 发布后，JavaScript 引擎的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触发垃圾回收的阈值。IE7 的起始阈值都与 IE6 的相同。如果垃圾回收程序回收的内存不到已分配的 15%，这些变量、字面量或数组槽位的阈值就会翻倍。如果有一次回收的内存达到已分配的 85%，则阈值重置为默认值。这么一个简单的修改，极大地提升了重度依赖 JavaScript 的网页在浏览器中的性能。

警告 在某些浏览器中是有可能（但不推荐）主动触发垃圾回收的。在 IE 中，window.CollectGarbage()方法会立即触发垃圾回收。在 Opera 7 及更高版本中，调用 window.opera.collect()也会启动垃圾回收程序。



#### 4.3.4 内存管理

在使用垃圾回收的编程环境中，开发者通常无须关心内存管理。不过，JavaScript 运行在一个内存管理与垃圾回收都很特殊的环境。分配给浏览器的内存通常比分配给桌面软件的要少很多，分配给移动
浏览器的就更少了。这更多出于安全考虑而不是别的，就是为了避免运行大量 JavaScript 的网页耗尽系统内存而导致操作系统崩溃。这个内存限制不仅影响变量分配，也影响调用栈以及能够同时在一个线程中执行的语句数量。

将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据。如果数据不再必要，那么把它设置为 null，从而释放其引用。这也可以叫
作解除引用。这个建议最适合全局变量和全局对象的属性。局部变量在超出作用域后会被自动解除引用，如下面的例子所示：

~~~
function createPerson(name){ 
 let localPerson = new Object(); 
 localPerson.name = name; 
 return localPerson; 
} 
let globalPerson = createPerson("Nicholas"); 
// 解除 globalPerson 对值的引用
globalPerson = null; 
~~~

在上面的代码中，变量 globalPerson 保存着 createPerson()函数调用返回的值。在 createPerson()内部，localPerson 创建了一个对象并给它添加了一个 name 属性。然后，localPerson 作为函数值被返回，并被赋值给 globalPerson。localPerson 在 createPerson()执行完成超出上下文后会自动被解除引用，不需要显式处理。但 globalPerson 是一个全局变量，应该在不再需要时手动解除其引用，最后一行就是这么做的。

不过要注意，解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关的值已经不在上下文里了，因此它在下次垃圾回收时会被回收。

1. 通过 const 和 let 声明提升性能

ES6 增加这两个关键字不仅有助于改善代码风格，而且同样有助于改进垃圾回收的过程。因为 const let 都以块（而非函数）为作用域，所以相比于使用 var，使用这两个新关键字可能会更早地让垃圾回收程序介入，尽早回收应该回收的内存。在块作用域比函数作用域更早终止的情况下，这就有可能发生。

2. 隐藏类和删除操作

根据 JavaScript 所在的运行环境，有时候需要根据浏览器使用的 JavaScript 引擎来采取不同的性能优化策略。截至 2017 年，Chrome 是最流行的浏览器，使用 V8 JavaScript 引擎。V8 在将解释后的 JavaScript代码编译为实际的机器码时会利用“隐藏类”。如果你的代码非常注重性能，那么这一点可能对你很重要。

运行期间，V8 会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类的对象性能会更好，V8 会针对这种情况进行优化，但不一定总能够做到。比如下面的代码：

~~~
function Article() { 
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
} 
let a1 = new Article(); 
let a2 = new Article(); 
~~~

V8 会在后台配置，让这两个类实例共享相同的隐藏类，因为这两个实例共享同一个构造函数和原型。假设之后又添加了下面这行代码：

~~~
a2.author = 'Jake'; 
~~~

此时两个 Article 实例就会对应两个不同的隐藏类。根据这种操作的频率和隐藏类的大小，这有可能对性能产生明显影响。
当然，解决方案就是避免 JavaScript 的“先创建再补充”（ready-fire-aim）式的动态属性赋值，并在构造函数中一次性声明所有属性，如下所示：

~~~
function Article(opt_author) { 
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
 this.author = opt_author; 
} 
let a1 = new Article(); 
let a2 = new Article('Jake'); 
~~~

这样，两个实例基本上就一样了（不考虑 hasOwnProperty 的返回值），因此可以共享一个隐藏类，从而带来潜在的性能提升。不过要记住，使用 delete 关键字会导致生成相同的隐藏类片段。看一下这个例子：

~~~
function Article() { 
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
 this.author = 'Jake'; 
} 
let a1 = new Article(); 
let a2 = new Article(); 
delete a1.author; 
~~~

在代码结束后，即使两个实例使用了同一个构造函数，它们也不再共享一个隐藏类。动态删除属性与动态添加属性导致的后果一样。最佳实践是把不想要的属性设置为 null。这样可以保持隐藏类不变
和继续共享，同时也能达到删除引用值供垃圾回收程序回收的效果。比如：

~~~
function Article() { 
 this.title = 'Inauguration Ceremony Features Kazoo Band'; 
 this.author = 'Jake'; 
} 
let a1 = new Article(); 
let a2 = new Article(); 
a1.author = null; 
~~~


4. 静态分配与对象池

为了提升 JavaScript 性能，最后要考虑的一点往往就是压榨浏览器了。此时，一个关键问题就是如何减少浏览器执行垃圾回收的次数。开发者无法直接控制什么时候开始收集垃圾，但可以间接控制触发垃圾回收的条件。理论上，如果能够合理使用分配的内存，同时避免多余的垃圾回收，那就可以保住因释放内存而损失的性能。


浏览器决定何时运行垃圾回收程序的一个标准就是对象更替的速度。如果有很多对象被初始化，然后一下子又都超出了作用域，那么浏览器就会采用更激进的方式调度垃圾回收程序运行，这样当然会影
响性能。看一看下面的例子，这是一个计算二维矢量加法的函数：

~~~
function addVector(a, b) { 
 let resultant = new Vector(); 
 resultant.x = a.x + b.x; 
 resultant.y = a.y + b.y; 
 return resultant; 
} 
~~~

调用这个函数时，会在堆上创建一个新对象，然后修改它，最后再把它返回给调用者。如果这个矢量对象的生命周期很短，那么它会很快失去所有对它的引用，成为可以被回收的值。假如这个矢量
加法函数频繁被调用，那么垃圾回收调度程序会发现这里对象更替的速度很快，从而会更频繁地安排垃圾回收。
该问题的解决方案是不要动态创建矢量对象，比如可以修改上面的函数，让它使用一个已有的矢量对象：

~~~
function addVector(a, b, resultant) { 
 resultant.x = a.x + b.x; 
 resultant.y = a.y + b.y; 
 return resultant; 
} 
~~~

当然，这需要在其他地方实例化矢量参数 resultant，但这个函数的行为没有变。那么在哪里创建矢量可以不让垃圾回收调度程序盯上呢？
一个策略是使用对象池。在初始化的某一时刻，可以创建一个对象池，用来管理一组可回收的对象。应用程序可以向这个对象池请求一个对象、设置其属性、使用它，然后在操作完成后再把它还给对象池。
由于没发生对象初始化，垃圾回收探测就不会发现有对象更替，因此垃圾回收程序就不会那么频繁地运行。下面是一个对象池的伪实现：

~~~
// vectorPool 是已有的对象池 
let v1 = vectorPool.allocate(); 
let v2 = vectorPool.allocate(); 
let v3 = vectorPool.allocate(); 
v1.x = 10; 
v1.y = 5; 
v2.x = -3; 
v2.y = -6; 
addVector(v1, v2, v3); 
console.log([v3.x, v3.y]); // [7, -1] 
vectorPool.free(v1); 
vectorPool.free(v2); 
vectorPool.free(v3); 
// 如果对象有属性引用了其他对象
// 则这里也需要把这些属性设置为 null 
v1 = null; 
v2 = null; 
v3 = null; 
~~~

如果对象池只按需分配矢量（在对象不存在时创建新的，在对象存在时则复用存在的），那么这个实现本质上是一种贪婪算法，有单调增长但为静态的内存。这个对象池必须使用某种结构维护所有对
象，数组是比较好的选择。不过，使用数组来实现，必须留意不要招致额外的垃圾回收。比如下面这个例子：

~~~
let vectorList = new Array(100); 
let vector = new Vector(); 
vectorList.push(vector); 
~~~

由于 JavaScript 数组的大小是动态可变的，引擎会删除大小为 100 的数组，再创建一个新的大小为200 的数组。垃圾回收程序会看到这个删除操作，说不定因此很快就会跑来收一次垃圾。要避免这种动态分配操作，可以在初始化时就创建一个大小够用的数组，从而避免上述先删除再创建的操作。不过，必须事先想好这个数组有多大。

注意 静态分配是优化的一种极端形式。如果你的应用程序被垃圾回收严重地拖了后腿，可以利用它提升性能。但这种情况并不多见。大多数情况下，这都属于过早优化，因此不用考虑。


#### 6.2.2 数组空位
使用数组字面量初始化数组时，可以使用一串逗号来创建空位（hole）。ECMAScript 会将逗号之间相应索引位置的值当成空位，ES6 规范重新定义了该如何处理这些空位。可以像下面这样创建一个空位数组：


~~~
const options = [,,,,,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5 
console.log(options); // [,,,,,] 
~~~

ES6 新增的方法和迭代器与早期 ECMAScript 版本中存在的方法行为不同。ES6 新增方法普遍将这些空位当成存在的元素，只不过值为 undefined：

~~~
const options = [1,,,,5]; 
for (const option of options) { 
 console.log(option === undefined); 
} 
// false 
// true 
// true 
// true 
// false 

const a = Array.from([,,,]); // 使用 ES6 的 Array.from()创建的包含 3 个空位的数组
for (const val of a) { 
 alert(val === undefined); 
} 
// true 
// true 
// true 
alert(Array.of(...[,,,])); // [undefined, undefined, undefined] 
for (const [index, value] of options.entries()) { 
 alert(value); 
} 
// 1 
// undefined 
// undefined 
// undefined 
// 5
~~~

ES6 之前的方法则会忽略这个空位，但具体的行为也会因方法而异：

~~~
const options = [1,,,,5]; 
// map()会跳过空位置
console.log(options.map(() => 6)); // [6, undefined, undefined, undefined, 6] 
// join()视空位置为空字符串
console.log(options.join('-')); // "1----5" 
~~~

注意 由于行为不一致和存在性能隐患，因此实践中要避免使用数组空位。如果确实需要空位，则可以显式地用 undefined 值代替。



#### 6.3.1 历史
随着浏览器的流行，不难想象人们会满怀期待地通过它来运行复杂的 3D 应用程序。早在 2006 年，Mozilla、Opera 等浏览器提供商就实验性地在浏览器中增加了用于渲染复杂图形应用程序的编程平台，无须安装任何插件。其目标是开发一套 JavaScript API，从而充分利用 3D 图形 API 和 GPU 加速，以便
在<canvas>元素上渲染复杂的图形。

1. WebGL 

最后的 JavaScript API 是基于 OpenGL ES（OpenGL for Embedded Systems）2.0 规范的。OpenGL ES是 OpenGL 专注于 2D 和 3D 计算机图形的子集。这个新 API 被命名为 WebGL（Web Graphics Library），于 2011 年发布 1.0 版。有了它，开发者就能够编写涉及复杂图形的应用程序，它会被兼容 WebGL 的浏
览器原生解释执行。

在 WebGL 的早期版本中，因为 JavaScript 数组与原生数组之间不匹配，所以出现了性能问题。图形驱动程序 API 通常不需要以 JavaScript 默认双精度浮点格式传递给它们的数值，而这恰恰是 JavaScript数组在内存中的格式。因此，每次 WebGL 与 JavaScript 运行时之间传递数组时，WebGL 绑定都需要在目标环境分配新数组，以其当前格式迭代数组，然后将数值转型为新数组中的适当格式，而这些要花费很多时间。



#### 6.3.3 DataView
第一种允许你读写 ArrayBuffer 的视图是 DataView。这个视图专为文件 I/O 和网络 I/O 设计，其API 支持对缓冲数据的高度控制，但相比于其他类型的视图性能也差一些。DataView 对缓冲内容没有任何预设，也不能迭代。

必须在对已有的 ArrayBuffer 读取或写入时才能创建 DataView 实例。这个实例可以使用全部或部分 ArrayBuffer，且维护着对该缓冲实例的引用，以及视图在缓冲中开始的位置。

~~~
const buf = new ArrayBuffer(16); 
// DataView 默认使用整个 ArrayBuffer 
const fullDataView = new DataView(buf); 
alert(fullDataView.byteOffset); // 0 
alert(fullDataView.byteLength); // 16 
alert(fullDataView.buffer === buf); // true 
// 构造函数接收一个可选的字节偏移量和字节长度
// byteOffset=0 表示视图从缓冲起点开始
// byteLength=8 限制视图为前 8 个字节
const firstHalfDataView = new DataView(buf, 0, 8); 
alert(firstHalfDataView.byteOffset); // 0 
alert(firstHalfDataView.byteLength); // 8 
alert(firstHalfDataView.buffer === buf); // true 
// 如果不指定，则 DataView 会使用剩余的缓冲
// byteOffset=8 表示视图从缓冲的第 9 个字节开始
// byteLength 未指定，默认为剩余缓冲
const secondHalfDataView = new DataView(buf, 8); 
alert(secondHalfDataView.byteOffset); // 8 
alert(secondHalfDataView.byteLength); // 8 
alert(secondHalfDataView.buffer === buf); // true 
~~~

要通过 DataView 读取缓冲，还需要几个组件。
- 首先是要读或写的字节偏移量。可以看成 DataView 中的某种“地址”。
- DataView 应该使用 ElementType 来实现 JavaScript 的 Number 类型到缓冲内二进制格式的转换。
- 最后是内存中值的字节序。默认为大端字节序。



#### 6.3.4 定型数组


定型数组是另一种形式的 ArrayBuffer 视图。虽然概念上与 DataView 接近，但定型数组的区别在于，它特定于一种 ElementType 且遵循系统原生的字节序。相应地，定型数组提供了适用面更广的
API 和更高的性能。设计定型数组的目的就是提高与 WebGL 等原生库交换二进制数据的效率。由于定型数组的二进制表示对操作系统而言是一种容易使用的格式，JavaScript 引擎可以重度优化算术运算、

按位运算和其他对定型数组的常见操作，因此使用它们速度极快。

创建定型数组的方式包括读取已有的缓冲、使用自有缓冲、填充可迭代结构，以及填充基于任意类型的定型数组。另外，通过<ElementType>.from()和<ElementType>.of()也可以创建定型数组：

~~~
// 创建一个 12 字节的缓冲
const buf = new ArrayBuffer(12); 
// 创建一个引用该缓冲的 Int32Array 
const ints = new Int32Array(buf); 
// 这个定型数组知道自己的每个元素需要 4 字节
// 因此长度为 3 
alert(ints.length); // 3

// 创建一个长度为 6 的 Int32Array 
const ints2 = new Int32Array(6); 
// 每个数值使用 4 字节，因此 ArrayBuffer 是 24 字节
alert(ints2.length); // 6 
// 类似 DataView，定型数组也有一个指向关联缓冲的引用
alert(ints2.buffer.byteLength); // 24 
// 创建一个包含[2, 4, 6, 8]的 Int32Array 
const ints3 = new Int32Array([2, 4, 6, 8]); 
alert(ints3.length); // 4 
alert(ints3.buffer.byteLength); // 16 
alert(ints3[2]); // 6 
// 通过复制 ints3 的值创建一个 Int16Array 
const ints4 = new Int16Array(ints3); 
// 这个新类型数组会分配自己的缓冲
// 对应索引的每个值会相应地转换为新格式
alert(ints4.length); // 4 
alert(ints4.buffer.byteLength); // 8 
alert(ints4[2]); // 6 
// 基于普通数组来创建一个 Int16Array 
const ints5 = Int16Array.from([3, 5, 7, 9]); 
alert(ints5.length); // 4 
alert(ints5.buffer.byteLength); // 8 
alert(ints5[2]); // 7 
// 基于传入的参数创建一个 Float32Array 
const floats = Float32Array.of(3.14, 2.718, 1.618); 
alert(floats.length); // 3 
alert(floats.buffer.byteLength); // 12 
alert(floats[2]); // 1.6180000305175781 

~~~



#### 6.4.3 选择 Object 还是 Map

对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。

1. 内存占用

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。
不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

2. 插入性能

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操
作，那么显然 Map 的性能更佳。

3. 查找速度

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言，查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些。

4. 删除性能

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null。但很多时候，这都是一种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。
如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。



#### 8.2.4 原型模式

> 警告 Object.setPrototypeOf()可能会严重影响代码性能。Mozilla 文档说得很清楚：“在所有浏览器和 JavaScript 引擎中，修改继承关系的影响都是微妙且深远的。这种影响并
不仅是执行 Object.setPrototypeOf()语句那么简单，而是会涉及所有访问了那些修改过[[Prototype]]的对象的代码。”

为避免使用 Object.setPrototypeOf()可能造成的性能下降，可以通过 Object.create()来创建一个新对象，同时为其指定原型：

~~~
let biped = { 
 numLegs: 2 
}; 
let person = Object.create(biped); 
person.name = 'Matt'; 
console.log(person.name); // Matt 
console.log(person.numLegs); // 2 
console.log(Object.getPrototypeOf(person) === biped); // true 
~~~


#### 第 10 章  函数

函数是ECMAScript中最有意思的部分之一，这主要是因为函数实际上是对象。每个函数都是Function类型的实例，而 Function 也有属性和方法，跟其他引用类型一样。因为函数是对象，所以函数名就是指向函数对象的指针，而且不一定与函数本身紧密绑定。函数通常以函数声明的方式定义，比如：

~~~
function sum (num1, num2) { 
 return num1 + num2; 
} 
~~~

注意函数定义最后没有加分号。
另一种定义函数的语法是函数表达式。函数表达式与函数声明几乎是等价的：

~~~
let sum = function(num1, num2) { 
 return num1 + num2; 
}; 
~~~

这里，代码定义了一个变量 sum 并将其初始化为一个函数。注意 function 关键字后面没有名称，因为不需要。这个函数可以通过变量 sum 来引用。
注意这里的函数末尾是有分号的，与任何变量初始化语句一样。
还有一种定义函数的方式与函数表达式很像，叫作“箭头函数”（arrow function），如下所示：

~~~
let sum = (num1, num2) => { 
 return num1 + num2; 
}; 
~~~

最后一种定义函数的方式是使用 Function 构造函数。这个构造函数接收任意多个字符串参数，最后一个参数始终会被当成函数体，而之前的参数都是新函数的参数。来看下面的例子：

~~~
let sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
~~~

我们不推荐使用这种语法来定义函数，因为这段代码会被解释两次：第一次是将它当作常规ECMAScript 代码，第二次是解释传给构造函数的字符串。这显然会影响性能。不过，把函数想象为对
象，把函数名想象为指针是很重要的。而上面这种语法很好地诠释了这些概念。


#### 11.3.3 异步函数策略

如果在前面的例子中使用的是异步函数，那又会怎样呢？比如：

~~~
function fooPromiseExecutor(resolve, reject) { 
 setTimeout(reject, 1000, 'bar'); 
} 
async function foo() { 
 await new Promise(fooPromiseExecutor); 
} 
foo(); 
// Uncaught (in promise) bar 
// foo
// async function (async) 
// foo
~~~

这样一改，栈追踪信息就准确地反映了当前的调用栈。fooPromiseExecutor()已经返回，所以它不在错误信息中。但 foo()此时被挂起了，并没有退出。JavaScript 运行时可以简单地在嵌套函数中
存储指向包含函数的指针，就跟对待同步函数调用栈一样。这个指针实际上存储在内存中，可用于在出错时生成栈追踪信息。这样就不会像之前的例子那样带来额外的消耗，因此在重视性能的应用中是可以优先考虑的


#### 14.3.3 异步回调与记录队列

MutationObserver 接口是出于性能考虑而设计的，其核心是异步回调与记录队列模型。为了在大量变化事件发生时不影响性能，每次变化的信息（由观察者实例决定）会保存在 MutationRecord
实例中，然后添加到记录队列。这个队列对每个 MutationObserver 实例都是唯一的，是所有 DOM变化事件的有序列表。


#### 14.3.4 性能、内存与垃圾回收

DOM Level 2 规范中描述的 MutationEvent 定义了一组会在各种 DOM 变化时触发的事件。由于浏览器事件的实现机制，这个接口出现了严重的性能问题。因此，DOM Level 3 规定废弃了这些事件。
MutationObserver 接口就是为替代这些事件而设计的更实用、性能更好的方案。

将变化回调委托给微任务来执行可以保证事件同步触发，同时避免随之而来的混乱。为 MutationObserver 而实现的记录队列，可以保证即使变化事件被爆发式地触发，也不会显著地拖慢浏览器。

无论如何，使用 MutationObserver 仍然不是没有代价的。因此理解什么时候避免出现这种情况就很重要了。


#### 14.4 小结

文档对象模型（DOM，Document Object Model）是语言中立的 HTML 和 XML 文档的 API。DOM Level 1 将 HTML 和 XML 文档定义为一个节点的多层级结构，并暴露出 JavaScript 接口以操作文档的底层结构和外观。
DOM 由一系列节点类型构成，主要包括以下几种。

- Node 是基准节点类型，是文档一个部分的抽象表示，所有其他类型都继承 Node。
- Document 类型表示整个文档，对应树形结构的根节点。在 JavaScript 中，document 对象是Document 的实例，拥有查询和获取节点的很多方法。
- Element 节点表示文档中所有 HTML 或 XML 元素，可以用来操作它们的内容和属性。
- 其他节点类型分别表示文本内容、注释、文档类型、CDATA 区块和文档片段。

DOM 编程在多数情况下没什么问题，在涉及<script>和<style>元素时会有一点兼容性问题。因为这些元素分别包含脚本和样式信息，所以浏览器会将它们与其他元素区别对待。

要理解 DOM，最关键的一点是知道影响其性能的问题所在。DOM 操作在 JavaScript 代码中是代价比较高的，NodeList 对象尤其需要注意。NodeList 对象是“实时更新”的，这意味着每次访问它都
会执行一次新的查询。考虑到这些问题，实践中要尽量减少 DOM 操作的数量。

MutationObserver 是为代替性能不好的 MutationEvent 而问世的。使用它可以有效精准地监控DOM 变化，而且 API 也相对简单。


#### 15.1 Selectors API 

JavaScript 库中最流行的一种能力就是根据 CSS 选择符的模式匹配 DOM 元素。比如，jQuery 就完全以 CSS 选择符查询 DOM 获取元素引用，而不是使用 getElementById()和 getElementsByTagName()。

Selectors API（参见 W3C 网站上的 Selectors API Level 1）是 W3C 推荐标准，规定了浏览器原生支持的 CSS 查询 API。支持这一特性的所有 JavaScript 库都会实现一个基本的 CSS 解析器，然后使用已有的 DOM 方法搜索文档并匹配目标节点。虽然库开发者在不断改进其性能，但 JavaScript 代码能做到的毕竟有限。通过浏览器原生支持这个 API，解析和遍历 DOM 树可以通过底层编译语言实现，性能也有了数量级的提升。

Selectors API Level 1 的核心是两个方法：querySelector()和 querySelectorAll()。在兼容浏览器中，Document 类型和 Element 类型的实例上都会暴露这两个方法。
Selectors API Level 2 规范在 Element 类型上新增了更多方法，比如 matches()、find()和findAll()。不过，目前还没有浏览器实现或宣称实现 find()和 findAll()。


#### 15.3.1 CSS 类扩展


自 HTML4 被广泛采用以来，Web 开发中一个主要的变化是 class 属性用得越来越多，其用处是为元素添加样式以及语义信息。自然地，JavaScript 与 CSS 类的交互就增多了，包括动态修改类名，以及根据给定的一个或一组类名查询元素，等等。为了适应开发者和他们对 class 属性的认可，HTML5 增加了一些特性以方便使用 CSS 类。

1. getElementsByClassName()

getElementsByClassName()是 HTML5 新增的最受欢迎的一个方法，暴露在 document 对象和所有 HTML 元素上。这个方法脱胎于基于原有 DOM 特性实现该功能的 JavaScript 库，提供了性能高好的原生实现。

getElementsByClassName()方法接收一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的 NodeList。如果提供了多个类名，则顺序无关紧要。下面是几个示例：

// 取得所有类名中包含"username"和"current"元素
// 这两个类名的顺序无关紧要
let allCurrentUsernames = document.getElementsByClassName("username current"); 
// 取得 ID 为"myDiv"的元素子树中所有包含"selected"类的元素
let selected = document.getElementById("myDiv").getElementsByClassName("selected"); 
这个方法只会返回以调用它的对象为根元素的子树中所有匹配的元素。在 document 上调用getElementsByClassName()返回文档中所有匹配的元素，而在特定元素上调用 getElementsByClassName()则返回该元素后代中匹配的元素。

5. 内存与性能问题

使用本节介绍的方法替换子节点可能在浏览器（特别是 IE）中导致内存问题。比如，如果被移除的子树元素中之前有关联的事件处理程序或其他 JavaScript 对象（作为元素的属性），那它们之间的绑定关系会滞留在内存中。如果这种替换操作频繁发生，页面的内存占用就会持续攀升。在使用 innerHTML、outerHTML 和 insertAdjacentHTML()之前，最好手动删除要被替换的元素上关联的事件处理程序和JavaScript 对象。

使用这些属性当然有其方便之处，特别是 innerHTML。一般来讲，插入大量的新 HTML 使用innerHTML 比使用多次 DOM 操作创建节点再插入来得更便捷。这是因为 HTML 解析器会解析设置给
innerHTML（或 outerHTML）的值。解析器在浏览器中是底层代码（通常是 C++代码），比 JavaScript快得多。不过，HTML 解析器的构建与解构也不是没有代价，因此最好限制使用 innerHTML 和
outerHTML 的次数。比如，下面的代码使用 innerHTML 创建了一些列表项：

~~~
for (let value of values){ 
 ul.innerHTML += '<li>${value}</li>'; // 别这样做！
} 
~~~

这段代码效率低，因为每次迭代都要设置一次 innerHTML。不仅如此，每次循环还要先读取innerHTML，也就是说循环一次要访问两次 innerHTML。为此，最好通过循环先构建一个独立的字符
串，最后再一次性把生成的字符串赋值给 innerHTML，比如：

~~~
let itemsHtml = "";
for (let value of values){ 
 itemsHtml += '<li>${value}</li>'; 
} 
ul.innerHTML = itemsHtml; 
~~~

这样修改之后效率就高多了，因为只有对 innerHTML 的一次赋值。当然，像下面这样一行代码也可以搞定：

~~~
ul.innerHTML = values.map(value => '<li>${value}</li>').join('');
~~~


#### 16.2.3 元素尺寸

本节介绍的属性和方法并不是 DOM2 Style 规范中定义的，但与 HTML 元素的样式有关。DOM 一直缺乏页面中元素实际尺寸的规定。IE 率先增加了一些属性，向开发者暴露元素的尺寸信息。这些属性
现在已经得到所有主流浏览器支持


1. 偏移尺寸

第一组属性涉及偏移尺寸（offset dimensions），包含元素在屏幕上占用的所有视觉空间。元素在页面上的视觉空间由其高度和宽度决定，包括所有内边距、滚动条和边框（但不包含外边距）。以下 4 个属性用于取得元素的偏移尺寸。

- offsetHeight，元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度（如果可见）和上、下边框的高度。
- offsetLeft，元素左边框外侧距离包含元素左边框内侧的像素数。
- offsetTop，元素上边框外侧距离包含元素上边框内侧的像素数。
- offsetWidth，元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度（如果可见）和左、右边框的宽度。

其中，offsetLeft 和 offsetTop 是相对于包含元素的，包含元素保存在 offsetParent 属性中。offsetParent 不一定是 parentNode。比如，<td>元素的 offsetParent 是作为其祖先的<table>元素，因为<table>是节点层级中第一个提供尺寸的元素。图 16-1 展示了这些属性代表的不同尺寸


要确定一个元素在页面中的偏移量，可以把它的 offsetLeft 和 offsetTop 属性分别与 offsetParent的相同属性相加，一直加到根元素。下面是一个例子：

~~~
function getElementLeft(element) { 
 let actualLeft = element.offsetLeft; 
 let current = element.offsetParent; 
 while (current !== null) { 
 actualLeft += current.offsetLeft; 
 current = current.offsetParent; 
 } 
 return actualLeft; 
}
function getElementTop(element) { 
 let actualTop = element.offsetTop; 
 let current = element.offsetParent; 
 while (current !== null) { 
 actualTop += current.offsetTop; 
 current = current.offsetParent; 
 } 
 return actualTop; 
}
~~~


这两个函数使用 offsetParent 在 DOM 树中逐级上溯，将每一级的偏移属性相加，最终得到元素的实际偏移量。对于使用 CSS 布局的简单页面，这两个函数是很精确的。而对于使用表格和内嵌窗
格的页面布局，它们返回的值会因浏览器不同而有所差异，因为浏览器实现这些元素的方式不同。一般来说，包含在<div>元素中所有元素都以<body>为其 offsetParent，因此 getElementleft()
和 getElementTop()返回的值与 offsetLeft 和 offsetTop 返回的值相同。

> 注意 所有这些偏移尺寸属性都是只读的，每次访问都会重新计算。因此，应该尽量减少查询它们的次数。比如把查询的值保存在局量中，就可以避免影响性能。


#### 17.5 内存与性能

因为事件处理程序在现代 Web 应用中可以实现交互，所以很多开发者会错误地在页面中大量使用它们。在创建 GUI 的语言如 C#中，通常会给 GUI 上的每个按钮设置一个 onclick 事件处理程序。这
样做不会有什么性能损耗。在 JavaScript 中，页面中事件处理程序的数量与页面整体性能直接相关。原因有很多。首先，每个函数都是对象，都占用内存空间，对象越多，性能越差。其次，为指定事件处理程序所需访问 DOM 的次数会先期造成整个页面交互的延迟。只要在使用事件处理程序时多注意一些方法，就可以改善页面性能。


##### 17.5.1 事件委托

只要可行，就应该考虑只给 document 添加一个事件处理程序，通过它处理页面中所有某种类型的事件。相对于之前的技术，事件委托具有如下优点。

- document 对象随时可用，任何时候都可以给它添加事件处理程序（不用等待 DOMContentLoaded或 load 事件）。这意味着只要页面渲染出可点击的元素，就可以无延迟地起作用。

- 节省花在设置页面事件处理程序上的时间。只指定一个事件处理程序既可以节省 DOM 引用，也可以节省时间。

- 减少整个页面所需的内存，提升整体性能。

最适合使用事件委托的事件包括：click、mousedown、mouseup、keydown 和 keypress。mouseover 和 mouseout 事件冒泡，但很难适当处理，且经常需要计算元素位置（因为 mouseout 会
在光标从一个元素移动到它的一个后代节点以及移出元素之外时触发）

##### 17.5.2 删除事件处理程序

把事件处理程序指定给元素后，在浏览器代码和负责页面交互的 JavaScript 代码之间就建立了联系。这种联系建立得越多，页面性能就越差。除了通过事件委托来限制这种连接之外，还应该及时删除不用的事件处理程序。很多 Web 应用性能不佳都是由于无用的事件处理程序长驻内存导致的。

导致这个问题的原因主要有两个。第一个是删除带有事件处理程序的元素。比如通过真正的 DOM方法 removeChild()或 replaceChild()删除节点。最常见的还是使用 innerHTML 整体替换页面的
某一部分。这时候，被 innerHTML 删除的元素上如果有事件处理程序，就不会被垃圾收集程序正常清理。比如下面的例子：

~~~
<div id="myDiv"> 
 <input type="button" value="Click Me" id="myBtn"> 
</div> 
<script type="text/javascript"> 
 let btn = document.getElementById("myBtn"); 
 btn.onclick = function() { 
 // 执行操作
 document.getElementById("myDiv").innerHTML = "Processing..."; 
 // 不好！
 }; 
</script> 
~~~

这里的按钮在<div>元素中。单击按钮，会将自己删除并替换为一条消息，以阻止双击发生。这是很多网站上常见的做法。问题在于，按钮被删除之后仍然关联着一个事件处理程序。在<div>元素上设
置 innerHTML 会完全删除按钮，但事件处理程序仍然挂在按钮上面。某些浏览器，特别是 IE8 及更早版本，在这时候就会有问题了。很有可能元素的引用和事件处理程序的引用都会残留在内存中。如果知道某个元素会被删除，那么最好在删除它之前手工删除它的事件处理程序，比如：

~~~
<div id="myDiv"> 
 <input type="button" value="Click Me" id="myBtn"> 
</div> 
<script type="text/javascript"> 
 let btn = document.getElementById("myBtn"); 
 btn.onclick = function() { 
 // 执行操作
 btn.onclick = null; // 删除事件处理程序
 document.getElementById("myDiv").innerHTML = "Processing..."; 
 }; 
</script>

~~~

在这个重写后的例子中，设置<div>元素的 innerHTML 属性之前，按钮的事件处理程序先被删除了。这样就可以确保内存被回收，按钮也可以安全地从 DOM 中删掉。
但也要注意，在事件处理程序中删除按钮会阻止事件冒泡。只有事件目标仍然存在于文档中时，事件才会冒泡。

注意 事件委托也有助于解决这种问题。如果提前知道页面某一部分会被使用innerHTML删除，就不要直接给该部分中的元素添加事件处理程序了。把事件处理程序添加到更高层
级的节点上同样可以处理该区域的事件。

另一个可能导致内存中残留引用的问题是页面卸载。同样，IE8 及更早版本在这种情况下有很多问题，不过好像所有浏览器都会受这个问题影响。如果在页面卸载后事件处理程序没有被清理，则它们仍然会残留在内存中。之后，浏览器每次加载和卸载页面（比如通过前进、后退或刷新），内存中残留对象的数量都会增加，这是因为事件处理程序不会被回收。

一般来说，最好在 onunload 事件处理程序中趁页面尚未卸载先删除所有事件处理程序。这时候也能体现使用事件委托的优势，因为事件处理程序很少，所以很容易记住要删除哪些。关于卸载页面时的
清理，可以记住一点：onload 事件处理程序中做了什么，最好在 onunload 事件处理程序中恢复。

> 注意 在页面中使用 onunload 事件处理程序意味着页面不会被保存在往返缓存（bfcache）中。如果这对应用很重要，可以考虑只在 IE 中使用 onunload 来删除事件处理程序。

#### 17.7 小结
事件是 JavaScript 与网页结合的主要方式。最常见的事件是在 DOM3 Events 规范或 HTML5 中定义的。虽然基本的事件都有规范定义，但很多浏览器在规范之外实现了自己专有的事件，以方便开发者更好地满足用户交互需求，其中一些专有事件直接与特殊的设备相关。
围绕着使用事件，需要考虑内存与性能问题。例如：

- 最好限制一个页面中事件处理程序的数量，因为它们会占用过多内存，导致页面响应缓慢；

- 利用事件冒泡，事件委托可以解决限制事件处理程序数量的问题；

- 最好在页面卸载之前删除所有事件处理程序。

使用 JavaScript 也可以在浏览器中模拟事件。DOM2 Events 和 DOM3 Events 规范提供了模拟方法，可以模拟所有原生 DOM 事件。键盘事件一定程度上也是可以模拟的，有时候需要组合其他技术。IE8及更早版本也支持事件模拟，只是接口与 DOM 方式不同。事件是 JavaScript 中最重要的主题之一，理解事件的原理及其对性能的影响非常重要。

#### 第 18 章 动画与 Canvas 图形

图形和动画已经日益成为浏览器中现代 Web 应用程序的必备功能，但实现起来仍然比较困难。视觉上复杂的功能要求性能调优和硬件加速，不能拖慢浏览器。目前已经有一套日趋完善的 API 和工具可
以用来开发此类功能。

毋庸置疑，<canvas>是 HTML5 最受欢迎的新特性。这个元素会占据一块页面区域，让 JavaScript可以动态在上面绘制图片。<canvas>最早是苹果公司提出并准备用在控制面板中的，随着其他浏览器
的迅速跟进，HTML5 将其纳入标准。目前所有主流浏览器都在某种程度上支持<canvas>元素。

与浏览器环境中的其他部分一样，<canvas>自身提供了一些 API，但并非所有浏览器都支持这些API，其中包括支持基础绘图能力的 2D 上下文和被称为 WebGL 的 3D 上下文。支持的浏览器的最新版
本现在都支持 2D 上下文和 WebGL

##### 18.4.2 WebGL 基础

取得 WebGL 上下文后，就可以开始 3D 绘图了。如前所述，因为 WebGL 是 OpenGL ES 2.0 的 Web版，所以本节讨论的概念实际上是 JavaScript 所实现的 OpenGL 概念。
可以在调用 getContext()取得 WebGL 上下文时指定一些选项。这些选项通过一个参数对象传入，选项就是参数对象的一个或多个属性。

- alpha：布尔值，表示是否为上下文创建透明通道缓冲区，默认为 true。
- depth：布尔值，表示是否使用 16 位深缓冲区，默认为 true。
- stencil：布尔值，表示是否使用 8 位模板缓冲区，默认为 false。
- antialias：布尔值，表示是否使用默认机制执行抗锯齿操作，默认为 true。
- premultipliedAlpha：布尔值，表示绘图缓冲区是否预乘透明度值，默认为 true。
- preserveDrawingBuffer：布尔值，表示绘图完成后是否保留绘图缓冲区，默认为 false。

建议在充分了解这个选项的作用后再自行修改，因为这可能会影响性能。

可以像下面这样传入 options 对象：

~~~
let drawing = document.getElementById("drawing"); 
// 确保浏览器支持<canvas> 
if (drawing.getContext) { 
 let gl = drawing.getContext("webgl", { alpha: false }); 
 if (gl) { 
 // 使用 WebGL 
 } 
} 
~~~

这些上下文选项大部分适合开发高级功能。多数情况下，默认值就可以满足要求。

#### 第 20 章  JavaScript API

随着 Web 浏览器能力的增加，其复杂性也在迅速增加。从很多方面看，现代 Web 浏览器已经成为构建于诸多规范之上、集不同 API 于一身的“瑞士军刀”。浏览器规范的生态在某种程度上是混乱而无
序的。一些规范如 HTML5，定义了一批增强已有标准的 API 和浏览器特性。而另一些规范如 Web Cryptography API 和 Notifications API，只为一个特性定义了一个API。不同浏览器实现这些新 API 的情况也不同，有的会实现其中一部分，有的则干脆尚未实现。

最终，是否使用这些比较新的 API 还要看项目是支持更多浏览器，还是要采用更多现代特性。有些API 可以通过腻子脚本来模拟，但腻子脚本通常会带来性能问题，此外也会增加网站 JavaScript 代码的体积。

##### 20.1.2 原子操作基础

任何全局上下文中都有 Atomics 对象，这个对象上暴露了用于执行线程安全操作的一套静态方法，其中多数方法以一个 TypedArray 实例（一个 SharedArrayBuffer 的引用）作为第一个参数，以相关操作数作为后续参数。

任何全局上下文中都有 Atomics 对象，这个对象上暴露了用于执行线程安全操作的一套静态方法，其中多数方法以一个 TypedArray 实例（一个 SharedArrayBuffer 的引用）作为第一个参数，以相关操作数作为后续参数。

以下代码演示了所有算术方法：

~~~
// 创建大小为 1 的缓冲区
let sharedArrayBuffer = new SharedArrayBuffer(1); 
// 基于缓冲创建 Uint8Array 
let typedArray = new Uint8Array(sharedArrayBuffer); 
// 所有 ArrayBuffer 全部初始化为 0 
console.log(typedArray); // Uint8Array[0]
const index = 0; 
const increment = 5; 
// 对索引 0 处的值执行原子加 5 
Atomics.add(typedArray, index, increment); 
console.log(typedArray); // Uint8Array[5]
// 对索引 0 处的值执行原子减 5 
Atomics.sub(typedArray, index, increment); 
console.log(typedArray); // Uint8Array[0]
~~~

Atomics API 还提供了 Atomics.isLockFree()方法。不过我们基本上应该不会用到。这个方法在高性能算法中可以用来确定是否有必要获取锁。规范中的介绍如下：
Atomics.isLockFree()是一个优化原语。基本上，如果一个原子原语（compareExchange、load、store、add、sub、and、or、xor 或 exchange）在 n 字节大小的数据上的原子步骤
在不调用代理在组成数据的n字节之外获得锁的情况下可以执行，则Atomics.isLockFree(n)会返回 true。高性能算法会使用 Atomics.isLockFree 确定是否在关键部分使用锁或原子
操作。如果原子原语需要加锁，则算法提供自己的锁会更高效。

Atomics.isLockFree(4)始终返回 true，因为在所有已知的相关硬件上都是支持的。能够如此假设通常可以简化程序。

##### 20.3 Encoding API 

Encoding API 主要用于实现字符串与定型数组之间的转换。规范新增了 4 个用于执行转换的全局类：TextEncoder、TextEncoderStream、TextDecoder 和 TextDecoderStream。

> 注意 相比于批量（bulk）的编解码，对流（stream）编解码的支持很有限。


20.3.1 文本编码

Encoding API 提供了两种将字符串转换为定型数组二进制格式的方法：批量编码和流编码。把字符串转换为定型数组时，编码器始终使用 UTF-8。

1. 批量编码

所谓批量，指的是 JavaScript 引擎会同步编码整个字符串。对于非常长的字符串，可能会花较长时间。批量编码是通过 TextEncoder 的实例完成的：

~~~
const textEncoder = new TextEncoder(); 
这个实例上有一个 encode()方法，该方法接收一个字符串参数，并以 Uint8Array 格式返回每个字符的 UTF-8 编码：
const textEncoder = new TextEncoder(); 
const decodedText = 'foo'; 
const encodedText = textEncoder.encode(decodedText);
// f 的 UTF-8 编码是 0x66（即十进制 102）
// o 的 UTF-8 编码是 0x6F（即二进制 111）
console.log(encodedText); // Uint8Array(3) [102, 111, 111] 
编码器是用于处理字符的，有些字符（如表情符号）在最终返回的数组中可能会占多个索引：
const textEncoder = new TextEncoder(); 
const decodedText = '☺'; 
const encodedText = textEncoder.encode(decodedText); 
// ☺的 UTF-8 编码是 0xF0 0x9F 0x98 0x8A（即十进制 240、159、152、138）
console.log(encodedText); // Uint8Array(4) [240, 159, 152, 138] 
编码器实例还有一个 encodeInto()方法，该方法接收一个字符串和目标 Unit8Array，返回一个字典，该字典包含 read 和 written 属性，分别表示成功从源字符串读取了多少字符和向目标数组写入了多少字符。如果定型数组的空间不够，编码就会提前终止，返回的字典会体现这个结果：
const textEncoder = new TextEncoder(); 
const fooArr = new Uint8Array(3); 
const barArr = new Uint8Array(2); 
const fooResult = textEncoder.encodeInto('foo', fooArr);
const barResult = textEncoder.encodeInto('bar', barArr);
console.log(fooArr); // Uint8Array(3) [102, 111, 111] 
console.log(fooResult); // { read: 3, written: 3 }
console.log(barArr); // Uint8Array(2) [98, 97] 
console.log(barResult); // { read: 2, written: 2 }
encode()要求分配一个新的 Unit8Array，encodeInto()则不需要。对于追求性能的应用，这个差别可能会带来显著不同。
~~~

> 注意 文本编码会始终使用 UTF-8 格式，而且必须写入 Unit8Array 实例。使用其他类型数组会导致 encodeInto()抛出错误。

##### 20.10 计时 API

页面性能始终是 Web 开发者关心的话题。Performance 接口通过 JavaScript API 暴露了浏览器内部的度量指标，允许开发者直接访问这些信息并基于这些信息实现自己想要的功能。这个接口暴露在
window.performance 对象上。所有与页面相关的指标，包括已经定义和将来会定义的，都会存在于这个对象上。
Performance 接口由多个 API 构成：

- High Resolution Time API 
- Performance Timeline API 
- Navigation Timing API 
- User Timing API 
- Resource Timing API 
- Paint Timing API 

有关这些规范的更多信息以及新增的性能相关规范，可以关注 W3C 性能工作组的 GitHub 项目页面。

##### 20.10.2 Performance Timeline API 

Performance Timeline API 使用一套用于度量客户端延迟的工具扩展了 Performance 接口。性能度量将会采用计算结束与开始时间差的形式。这些开始和结束时间会被记录为 DOMHighResTimeStamp值，而封装这个时间戳的对象是 PerformanceEntry 的实例。
浏览器会自动记录各种 PerformanceEntry 对象，而使用 performance.mark()也可以记录自定义的 PerformanceEntry 对象。在一个执行上下文中被记录的所有性能条目可以通过 performance. 
getEntries()获取：

~~~
console.log(performance.getEntries()); 
// [PerformanceNavigationTiming, PerformanceResourceTiming, ... ] 
这个返回的集合代表浏览器的性能时间线（performance timeline）。每个 PerformanceEntry 对象都有 name、entryType、startTime 和 duration 属性：
const entry = performance.getEntries()[0]; 
console.log(entry.name); // "https://foo.com" 
console.log(entry.entryType); // navigation 
console.log(entry.startTime); // 0 
console.log(entry.duration); // 182.36500001512468
不过，PerformanceEntry 实际上是一个抽象基类。所有记录条目虽然都继承 PerformanceEntry，但最终还是如下某个具体类的实例：
- PerformanceMark
- PerformanceMeasure
- PerformanceFrameTiming
- PerformanceNavigationTiming
- PerformanceResourceTiming
- PerformancePaintTiming
上面每个类都会增加大量属性，用于描述与相应条目有关的元数据。每个实例的 name 和 entryType属性会因为各自的类不同而不同。
1. User Timing API 
User Timing API 用于记录和分析自定义性能条目。如前所述，记录自定义性能条目要使用
performance.mark()方法：
performance.mark('foo'); 
console.log(performance.getEntriesByType('mark')[0]); 
// PerformanceMark { 
// name: "foo", 
// entryType: "mark", 
// startTime: 269.8800000362098, 
// duration: 0 
// } 
在计算开始前和结束后各创建一个自定义性能条目可以计算时间差。最新的标记（mark）会被推到getEntriesByType()返回数组的开始：
performance.mark('foo'); 
for (let i = 0; i < 1E6; ++i) {} 
performance.mark('bar'); 
const [endMark, startMark] = performance.getEntriesByType('mark'); 
console.log(startMark.startTime - endMark.startTime); // 1.3299999991431832 
除了自定义性能条目，还可以生成 PerformanceMeasure（性能度量）条目，对应由名字作为标识的两个标记之间的持续时间。PerformanceMeasure 的实例由 performance.measure()方法生成：
performance.mark('foo'); 
for (let i = 0; i < 1E6; ++i) {} 
performance.mark('bar'); 
performance.measure('baz', 'foo', 'bar'); 
const [differenceMark] = performance.getEntriesByType('measure');
console.log(differenceMark); 
// PerformanceMeasure { 
// name: "baz", 
// entryType: "measure", 
// startTime: 298.9800000214018, 
// duration: 1.349999976810068 
// }
~~~

3. Resource Timing API 
Resource Timing API 提供了高精度时间戳，用于度量当前页面加载时请求资源的速度。浏览器会在加载资源时自动记录 PerformanceResourceTiming。这个对象会捕获大量时间戳，用于描述资源加载的速度。
下面的例子计算了加载一个特定资源所花的时间：

~~~
const performanceResourceTimingEntry = performance.getEntriesByType('resource')[0]; 
console.log(performanceResourceTimingEntry); 
// PerformanceResourceTiming { 
// connectEnd: 138.11499997973442 
// connectStart: 138.11499997973442 
// decodedBodySize: 33808 
// domainLookupEnd: 138.11499997973442 
// domainLookupStart: 138.11499997973442 
// duration: 0 
// encodedBodySize: 33808 
// entryType: "resource" 
// fetchStart: 138.11499997973442 
// initiatorType: "link" 
// name: "https://static.foo.com/bar.png", 
// nextHopProtocol: "h2" 
// redirectEnd: 0 
// redirectStart: 0 
// requestStart: 138.11499997973442 
// responseEnd: 138.11499997973442 
// responseStart: 138.11499997973442 
// secureConnectionStart: 0 
// serverTiming: [] 
// startTime: 138.11499997973442 
// transferSize: 0 
// workerStart: 0 
// } 
console.log(performanceResourceTimingEntry.responseEnd – 
 performanceResourceTimingEntry.requestStart); 
// 493.9600000507198 
~~~

通过计算并分析不同时间的差，可以更全面地审视浏览器加载页面的过程，发现可能存在的性能瓶颈。

##### 20.12.2 使用 SubtleCrypto 对象

Web Cryptography API 重头特性都暴露在了 SubtleCrypto 对象上，可以通过 window.crypto.subtle 访问：

~~~
console.log(crypto.subtle); // SubtleCrypto {}
~~~

这个对象包含一组方法，用于执行常见的密码学功能，如加密、散列、签名和生成密钥。因为所有密码学操作都在原始二进制数据上执行，所以 SubtleCrypto 的每个方法都要用到 ArrayBuffer 和
ArrayBufferView 类型。由于字符串是密码学操作的重要应用场景，因此 TextEncoder 和TextDecoder 是经常与 SubtleCrypto 一起使用的类，用于实现二进制数据与字符串之间的相互转换。

> 注意 SubtleCrypto 对象只能在安全上下文（https）中使用。在不安全的上下文中，subtle 属性是 undefined。

1. 生成密码学摘要

计算数据的密码学摘要是非常常用的密码学操作。这个规范支持 4 种摘要算法：SHA-1 和 3 种SHA-2。
- SHA-1（Secure Hash Algorithm 1）：架构类似 MD5 的散列函数。接收任意大小的输入，生成160 位消息散列。由于容易受到碰撞攻击，这个算法已经不再安全。
- SHA-2（Secure Hash Algorithm 2）：构建于相同耐碰撞单向压缩函数之上的一套散列函数。规范支持其中 3 种：SHA-256、SHA-384 和 SHA-512。生成的消息摘要可以是 256 位（SHA-256）、
384 位（SHA-384）或 512 位（SHA-512）。这个算法被认为是安全的，广泛应用于很多领域和协议，包括 TLS、PGP 和加密货币（如比特币）。

2. CryptoKey 与算法

如果没了密钥，那密码学也就没什么意义了。SubtleCrypto 对象使用 CryptoKey 类的实例来生成密钥。CryptoKey 类支持多种加密算法，允许控制密钥抽取和使用。
CryptoKey 类支持以下算法，按各自的父密码系统归类。
- RSA（Rivest-Shamir-Adleman）：公钥密码系统，使用两个大素数获得一对公钥和私钥，可用于签名/验证或加密/解密消息。RSA 的陷门函数被称为分解难题（factoring problem）。
- RSASSA-PKCS1-v1_5：RSA 的一个应用，用于使用私钥给消息签名，允许使用公钥验证签名。
- SSA（Signature Schemes with Appendix），表示算法支持签名生成和验证操作。
- PKCS1（Public-Key Cryptography Standards #1），表示算法展示出的 RSA 密钥必需的数学特性。
- RSASSA-PKCS1-v1_5 是确定性的，意味着同样的消息和密钥每次都会生成相同的签名。
- RSA-PSS：RSA 的另一个应用，用于签名和验证消息。
- PSS（Probabilistic Signature Scheme），表示生成签名时会加盐以得到随机签名。
- 与 RSASSA-PKCS1-v1_5 不同，同样的消息和密钥每次都会生成不同的签名。
- 与 RSASSA-PKCS1-v1_5 不同，RSA-PSS 有可能约简到 RSA 分解难题的难度。
- 通常，虽然 RSASSA-PKCS1-v1_5 仍被认为是安全的，但 RSA-PSS 应该用于代替RSASSA-PKCS1-v1_5。
- RSA-OAEP：RSA 的一个应用，用于使用公钥加密消息，用私钥来解密。
- OAEP（Optimal Asymmetric Encryption Padding），表示算法利用了 Feistel 网络在加密前处理未加密的消息。
- OAEP 主要将确定性 RSA 加密模式转换为概率性加密模式。
- ECC（Elliptic-Curve Cryptography）：公钥密码系统，使用一个素数和一个椭圆曲线获得一对公钥和私钥，可用于签名/验证消息。ECC 的陷门函数被称为椭圆曲线离散对数问题（elliptic curve discrete logarithm problem）。ECC 被认为优于 RSA。虽然 RSA 和 ECC 在密码学意义上都很强，但 ECC 密钥比 RSA 密钥短，而且 ECC 密码学操作比 RSA 操作快。
- ECDSA（Elliptic Curve Digital Signature Algorithm）：ECC 的一个应用，用于签名和验证消息。这个算法是数字签名算法（DSA，Digital Signature Algorithm）的一个椭圆曲线风格的变体。
- ECDH（Elliptic Curve Diffie-Hellman）：ECC 的密钥生成和密钥协商应用，允许两方通过公开通信渠道建立共享的机密。这个算法是 Diffie-Hellman 密钥交换（DH，Diffie-Hellman key exchange）协议的一个椭圆曲线风格的变体。
- AES（Advanced Encryption Standard）：对称密钥密码系统，使用派生自置换组合网络的分组密码加密和解密数据。AES 在不同模式下使用，不同模式算法的特性也不同。
- AES-CTR：AES 的计数器模式（counter mode）。这个模式使用递增计数器生成其密钥流，其行为类似密文流。使用时必须为其提供一个随机数，用作初始化向量。AES-CTR 加密/解密可以并行。
- AES-CBC：AES 的密码分组链模式（cipher block chaining mode）。在加密纯文本的每个分组之前，先使用之前密文分组求 XOR，也就是名字中的“链”。使用一个初始化向量作为第一个分组
的 XOR 输入。
- AES-GCM：AES 的伽罗瓦/计数器模式（Galois/Counter mode）。这个模式使用计数器和初始化向量生成一个值，这个值会与每个分组的纯文本计算 XOR。与 CBC 不同，这个模式的 XOR 输
入不依赖之前分组密文。因此 GCM 模式可以并行。由于其卓越的性能，AES-GCM 在很多网络安全协议中得到了应用。
- AES-KW：AES 的密钥包装模式（key wrapping mode）。这个算法将加密密钥包装为一个可移植且加密的格式，可以在不信任的渠道中传输。传输之后，接收方可以解包密钥。与其他 AES 模
式不同，AES-KW 不需要初始化向量。
- HMAC（Hash-Based Message Authentication Code）：用于生成消息认证码的算法，用于验证通过不可信网络接收的消息没有被修改过。两方使用散列函数和共享私钥来签名和验证消息。
- KDF（Key Derivation Functions）：可以使用散列函数从主密钥获得一个或多个密钥的算法。KDF能够生成不同长度的密钥，也能把密钥转换为不同格式。
- HKDF（HMAC-Based Key Derivation Function）：密钥推导函数，与高熵输入（如已有密钥）一起使用。
- PBKDF2（Password-Based Key Derivation Function 2）：密钥推导函数，与低熵输入（如密钥字符串）一起使用。

> 注意 CryptoKey 支持很多算法，但其中只有部分算法能够用于 SubtleCrypto 的方法。要了解哪个方法支持什么算法，可以参考 W3C 网站上 Web Cryptography API 规范的“Algorithm Overview”

#### 第 24 章 网络请求与远程资源

> 注意 POST 请求相比 GET 请求要占用更多资源。从性能方面说，发送相同数量的数据，GET 请求比 POST 请求要快两倍。

#### 第 25 章 客户端存储

##### 25.1.5 使用 cookie 的注意事项

还有一种叫作 HTTP-only 的 cookie。HTTP-only 可以在浏览器设置，也可以在服务器设置，但只能在服务器上读取，这是因为 JavaScript 无法取得这种 cookie 的值。
因为所有 cookie 都会作为请求头部由浏览器发送给服务器，所以在 cookie 中保存大量信息可能会影响特定域浏览器请求的性能。保存的 cookie 越大，请求完成的时间就越长。即使浏览器对 cookie 大小有限制，最好还是尽可能只通过 cookie 保存必要信息，以避免性能问题。
对 cookie 的限制及其特性决定了 cookie 并不是存储大量数据的理想方式。因此，其他客户端存储技术出现了。

#### 第 26 章 模块

##### 26.1.4 入口

相互依赖的模块必须指定一个模块作为入口（entry point），这也是代码执行的起点。这是理所当然的，因为 JavaScript 是顺序执行的，并且是单线程的，所以代码必须有执行的起点。入口模块也可能依赖其他模块，其他模块同样可能有自己的依赖。于是模块化 JavaScript 应用程序的所有模块会构成依赖图。


图中的箭头表示依赖方向：模块 A 依赖模块 B 和模块 C，模块 B 依赖模块 D 和模块 E，模块 C 依赖模块 E。因为模块必须在依赖加载完成后才能被加载，所以这个应用程序的入口模块 A 必须在应用程序的其他部分加载后才能执行。

在 JavaScript 中，“加载”的概念可以有多种实现方式。因为模块是作为包含将立即执行的 JavaScript代码的文件实现的，所以一种可能是按照依赖图的要求依次请求各个脚本。对于前面的应用程序来说，下面的脚本请求顺序能够满足依赖图的要求：

~~~
<script src="moduleE.js"></script> 
<script src="moduleD.js"></script> 
<script src="moduleC.js"></script> 
<script src="moduleB.js"></script> 
<script src="moduleA.js"></script>
~~~

模块加载是“阻塞的”，这意味着前置操作必须完成才能执行后续操作。每个模块在自己的代码到达浏览器之后完成加载，此时其依赖已经加载并初始化。不过，这个策略存在一些性能和复杂性问题。为
一个应用程序而按顺序加载五个 JavaScript 文件并不理想，并且手动管理正确的加载顺序也颇为棘手。

##### 26.1.5 异步依赖

因为 JavaScript 可以异步执行，所以如果能按需加载就好了。换句话说，可以让 JavaScript 通知模块系统在必要时加载新模块，并在模块加载完成后提供回调。在代码层面，可以通过下面的伪代码来实现：

~~~
// 在模块 A 里面
load('moduleB').then(function(moduleB) { 
 moduleB.doStuff(); 
});
~~~

模块 A 的代码使用了 moduleB 标识符向模块系统请求加载模块 B，并以模块 B 作为参数调用回调。模块 B 可能已加载完成，也可能必须重新请求和初始化，但这里的代码并不关心。这些事情都交给了模块加载器去负责。

如果重写前面的应用程序，只使用动态模块加载，那么使用一个<script>标签即可完成模块 A 的加载。模块 A 会按需请求模块文件，而不会生成必需的依赖列表。这样有几个好处，其中之一就是性能，因为在页面加载时只需同步加载一个文件。

这些脚本也可以分离出来，比如给<script>标签应用 defer 或 async 属性，再加上能够识别异步脚本何时加载和初始化的逻辑。此行为将模拟在 ES6 模块规范中实现的行为，本章稍后会对此进行讨论。


#### 工作者线程

##### 27.2.4 配置 Worker 选项

Worker()构造函数允许将可选的配置对象作为第二个参数。该配置对象支持下列属性。
- name：可以在工作者线程中通过 self.name 读取到的字符串标识符。
- type：表示加载脚本的运行方式，可以是"classic"或"module"。"classic"将脚本作为常规脚本来执行，"module"将脚本作为模块来执行。
- credentials：在 type 为"module"时，指定如何获取与传输凭证数据相关的工作者线程模块脚本。值可以是"omit"、"same-orign"或"include"。这些选项与 fetch()的凭证选项相同。
在 type 为"classic"时，默认为"omit"。

> 注意 有的现代浏览器还不完全支持模块工作者线程或可能需要修改标志才能支持。


##### 27.2.5 在 JavaScript 行内创建工作者线程

工作者线程需要基于脚本文件来创建，但这并不意味着该脚本必须是远程资源。专用工作者线程也可以通过 Blob 对象 URL 在行内脚本创建。这样可以更快速地初始化工作者线程，因为没有网络延迟。
下面展示了一个在行内创建工作者线程的例子。

~~~
// 创建要执行的 JavaScript 代码字符串
const workerScript = ` 
 self.onmessage = ({data}) => console.log(data); 
`;
// 基于脚本字符串生成 Blob 对象
const workerScriptBlob = new Blob([workerScript]); 
// 基于 Blob 实例创建对象 URL 
const workerScriptBlobUrl = URL.createObjectURL(workerScriptBlob); 
// 基于对象 URL 创建专用工作者线程
const worker = new Worker(workerScriptBlobUrl); 
worker.postMessage('blob worker script'); 
// blob worker script
~~~

在这个例子中，通过脚本字符串创建了 Blob，然后又通过 Blob 创建了对象 URL，最后把对象 URL传给了 Worker()构造函数。该构造函数同样创建了专用工作者线程。

如果把所有代码写在一块，可以浓缩为这样：

~~~
const worker = new Worker(URL.createObjectURL(new Blob([`self.onmessage = 
({data}) => console.log(data);`]))); 
worker.postMessage('blob worker script'); 
// blob worker script 
~~~

工作者线程也可以利用函数序列化来初始化行内脚本。这是因为函数的 toString()方法返回函数代码的字符串，而函数可以在父上下文中定义但在子上下文中执行。来看下面这个简单的例子：

~~~
function fibonacci(n) { 
 return n < 1 ? 0 
 : n <= 2 ? 1 
 : fibonacci(n - 1) + fibonacci(n - 2); 
} 
const workerScript = ` 
 self.postMessage( 
 (${fibonacci.toString()})(9) 
 ); 
`; 
const worker = new Worker(URL.createObjectURL(new Blob([workerScript]))); 
worker.onmessage = ({data}) => console.log(data); 
// 34
~~~

这里有意使用了斐波那契数列的实现，将其序列化之后传给了工作者线程。该函数作为 IIFE 调用并传递参数，结果则被发送回主线程。虽然计算斐波那契数列比较耗时，但所有计算都会委托到工作者
线程，因此并不会影响父上下文的性能。

> 注意 像这样序列化函数有个前提，就是函数体内不能使用通过闭包获得的引用，也包括全局变量，比如 window，因为这些引用在工作者线程中执行时会出错。

#### 第 28 章 最佳实践

##### 28.2 性能

相比 JavaScript 刚问世时，目前每个网页中 JavaScript 代码的数量已有极大的增长。代码量的增长也带来了运行时执行 JavaScript 的性能问题。JavaScript 一开始就是一门解释型语言，因此执行速度比编译型语言要慢一些。Chrome 是第一个引入优化引擎将 JavaScript 编译为原生代码的浏览器。随后，其他主流浏览器也紧随其后，实现了 JavaScript 编译。
即使到了编译 JavaScript 时代，仍可能写出运行慢的代码。不过，如果遵循一些基本模式，就能保证写出执行速度很快的代码。


##### 28.2.1 作用域意识

第 4 章讨论过 JavaScript 作用域的概念，以及作用域链的工作原理。随着作用域链中作用域数量的增加，访问当前作用域外部变量所需的时间也会增加。访问全局变量始终比访问局部变量慢，因为必须
遍历作用域链。任何可以缩短遍历作用域链时间的举措都能提升代码性能。

1. 避免全局查找

改进代码性能非常重要的一件事，可能就是要提防全局查询。全局变量和函数相比于局部值始终是最费时间的，因为需要经历作用域链查找。来看下面的函数：

~~~
function updateUI() { 
 let imgs = document.getElementsByTagName("img"); 
 for (let i = 0, len = imgs.length; i < len; i++) { 
 imgs[i].title = '${document.title} image ${i}'; 
 } 
 let msg = document.getElementById("msg"); 
 msg.innerHTML = "Update complete."; 
} 
~~~

这个函数看起来好像没什么问题，但其中三个地方引用了全局 document 对象。如果页面的图片非常多，那么 for 循环中就需要引用 document 几十甚至上百次，每次都要遍历一次作用域链。通过在
局部作用域中保存 document 对象的引用，能够明显提升这个函数的性能，因为只需要作用域链查找。

通过创建一个指向 document 对象的局部变量，可以通过将全局查找的数量限制为一个来提高这个函数的性能：

~~~
function updateUI() { 
 let doc = document; 
 let imgs = doc.getElementsByTagName("img"); 
 for (let i = 0, len = imgs.length; i < len; i++) { 
 imgs[i].title = '${doc.title} image ${i}'; 
 } 
 let msg = doc.getElementById("msg"); 
 msg.innerHTML = "Update complete."; 
} 
~~~

这里先把 document 对象保存在局部变量 doc 中。然后用 doc 替代了代码中所有的 document。
这样调用这个函数只会查找一次作用域链，相对上一个版本，肯定会快很多。

因此，一个经验规则就是，只要函数中有引用超过两次的全局对象，就应该把这个对象保存为一个局部变量。

2. 不使用 with 语句

在性能很重要的代码中，应避免使用 with 语句。与函数类似，with 语句会创建自己的作用域，因此也会加长其中代码的作用域链。在 with 语句中执行的代码一定比在它外部执行的代码慢，因为作
用域链查找时多一步。
实际编码时很少有需要使用 with 语句的情况，因为它的主要用途是节省一点代码。大多数情况下，使用局部变量可以实现同样的效果，无须增加新作用域。下面看一个例子：

~~~
function updateBody() { 
 with(document.body) { 
 console.log(tagName); 
 innerHTML = "Hello world!"; 
 } 
}
~~~ 

这段代码中的 with 语句让使用 document.body 更简单了。使用局部变量也可以实现同样的效果，如下：

~~~
function updateBody() { 
 let body = document.body; 
 console.log(body.tagName); 
 body.innerHTML = "Hello world!"; 
} 
~~~

虽然这段代码多了几个字符，但比使用 with 语句还更容易理解了，因为 tagName 和 innerHTML属于谁很明确。这段代码还通过把 document.body 保存在局部变量中来省去全局查找。

##### 28.2.2 选择正确的方法

与其他语言一样，影响性能的因素通常涉及算法或解决问题的方法。经验丰富的开发者知道用什么方法性能更佳。通常很多能在其他编程语言中提升性能的技术和方法同样也适用于 JavaScript。

1. 避免不必要的属性查找

在计算机科学中，算法复杂度使用大 O 表示法来表示。最简单同时也最快的算法可以表示为常量值或 O(1)。然后，稍微复杂一些的算法同时执行时间也更长一些。下表列出了 JavaScript 中常见算法的类型。

~~~
表 示 法 名 称 说 明
O(1) 常量 无论多少值，执行时间都不变。表示简单值和保存在变量中的值
O(logn) 对数 执行时间随着值的增加而增加，但算法完成不需要读取每个值。例子：二分查找
O(n) 线性 执行时间与值的数量直接相关。例子：迭代数组的所有元素
O(n2
) 二次方 执行时间随着值的增加而增加，而且每个值至少要读取 n 次。例子：插入排序
~~~

常量值或 O(1)，指字面量和保存在变量中的值，表示读取常量值所需的时间不会因值的多少而变化。读取常量值是效率极高的操作，因此非常快。来看下面的例子：

~~~
let value = 5; 
let sum = 10 + value; 
console.log(sum); 
~~~

以上代码查询了 4 次常量值：数值 5、变量 value、数值 10 和变量 sum。整体代码的复杂度可以认为是 O(1)。
在 JavaScript 中访问数组元素也是 O(1)操作，与简单的变量查找一样。因此，下面的代码与前面的例子效率一样：

~~~
let values = [5, 10]; 
let sum = values[0] + values[1]; 
console.log(sum); 
~~~

使用变量和数组相比访问对象属性效率更高，访问对象属性的算法复杂度是 O(n)。访问对象的每个属性都比访问变量或数组花费的时间长，因为查找属性名要搜索原型链。简单来说，查找的属性越多，
执行时间就越长。来看下面的例子：

~~~
let values = { first: 5, second: 10 }; 
let sum = values.first + values.second; 
console.log(sum); 
~~~

这个例子使用两次属性查找来计算 sum 的值。一两次属性查找可能不会有明显的性能问题，但几百上千次则绝对会拖慢执行速度。
特别要注意避免通过多次查找获取一个值。例如，看下面的例子：

~~~
let query = window.location.href.substring(window.location.href.indexOf("?")); 
~~~

这里有 6 次属性查找：3 次是为查找 window.location.href.substring()，3 次是为查找window.location.href.indexOf()。通过数代码中出现的点号数量，就可以知道有几次属性查找。
以上代码效率特别低，这是因为使用了两次 window.location.href，即同样的查找执行了两遍。只要使用某个 object 属性超过一次，就应该将其保存在局部变量中。第一次仍然要用 O(n)的复杂
度去访问这个属性，但后续每次访问就都是 O(1)，这样就是质的提升了。例如，前面的代码可以重写为如下：

~~~
let url = window.location.href; 
let query = url.substring(url.indexOf("?")); 
~~~

这个版本的代码只有 4 次属性查找，比之前节省了约 33%。在大型脚本中如果能这样优化，可能就会明显改进性能。
通常，只要能够降低算法复杂度，就应该尽量通过在局部变量中保存值来替代属性查找。另外，如果实现某个需求既可以使用数组的数值索引，又可以使用命名属性（比如 NodeList 对象），那就都应
该使用数值索引。


2. 优化循环

循环是编程中常用的语法构造，因此在 JavaScript 中也十分常见。优化这些循环是性能优化的重要内容，因为循环会重复多次运行相同的代码，所以运行时间会自动增加。其他语言有很多关于优化循环的研究，这些技术同样适用于 JavaScript。优化循环的基本步骤如下。
(1) 简化终止条件。因为每次循环都会计算终止条件，所以它应该尽可能地快。这意味着要避免属性查找或其他 O(n)操作。
(2) 简化循环体。循环体是最花时间的部分，因此要尽可能优化。要确保其中不包含可以轻松转移到循环外部的密集计算。
(3) 使用后测试循环。最常见的循环就是 for 和 while 循环，这两种循环都属于先测试循环。do-while就是后测试循环，避免了对终止条件初始评估 ，因此应该会更快。
注意 在旧版浏览器中，从循环迭代器的最大值开始递减至 0 的效率更高。之所以这样更快，是因为 JavaScript 引擎用于检查循环分支条件的指令数更少。在现代浏览器中，正序
还是倒序不会有可感知的性能差异。因此可以选择最适合代码逻辑的迭代方式。
以上优化的效果可以通过下面的例子展示出来。这是一个简单的 for 循环：

~~~
for (let i = 0; i < values.length; i++) { 
 process(values[i]); 
} 
~~~

这个循环会将变量 i 从 0 递增至数组 values 的长度。假设处理这些值的顺序不重要，那么可以将循环变量改为递减的形式，如下所示：

~~~
for (let i = values.length - 1; i >= 0; i--) { 
 process(values[i]); 
} 
~~~

这一次，变量 i 每次循环都会递减。在这个过程中，终止条件的计算复杂度也从查找 values.length的 O(n)变成了访问 0 的 O(1)。循环体只有一条语句，已不能再优化了。不过，整个循环可修改为后测试循环：

~~~
let i = values.length-1; 
if (i > -1) { 
 do { 
 process(values[i]); 
 }while(--i >= 0); 
}
~~~

这里主要的优化是将终止条件和递减操作符合并成了一条语句。然后，如果再想优化就只能去优化process()的代码，因为循环已没有可以优化的点了。
使用后测试循环时要注意，一定是至少有一个值需要处理一次。如果这里的数组是空的，那么会浪费一次循环，而先测试循环就可以避免这种情况。

3. 展开循环

如果循环的次数是有限的，那么通常抛弃循环而直接多次调用函数会更快。仍以前面的循环为例，如果数组长度始终一样，则可能对每个元素都调用一次 process()效率更高：

~~~
// 抛弃循环
process(values[0]);、
process(values[1]); 
process(values[2]); 
~~~

这个例子假设 values 数组始终只有 3 个值，然后分别针对每个元素调用一次 process()。像这样展开循环可以节省创建循环、计算终止条件的消耗，从而让代码运行更快。
如果不能提前预知循环的次数，那么或许可以使用一种叫作达夫设备（Duff’s Device）的技术。该技术是以其发明者 Tom Duff 命名的，他最早建议在 C 语言中使用该技术。在 JavaScript 实现达夫设备的人是 Jeff Greenberg。达夫设备的基本思路是以 8 的倍数作为迭代次数从而将循环展开为一系列语句。来看下面的例子：

~~~
// 来源：Jeff Greenberg 在 JavaScript 中实现的达夫设备
// 假设 values.length > 0 
let iterations = Math.ceil(values.length / 8); 
let startAt = values.length % 8; 
let i = 0; 
do { 
 switch(startAt) { 
 case 0: process(values[i++]); 
 case 7: process(values[i++]); 
 case 6: process(values[i++]); 
 case 5: process(values[i++]); 
 case 4: process(values[i++]); 
 case 3: process(values[i++]); 
 case 2: process(values[i++]); 
 case 1: process(values[i++]); 
 } 
 startAt = 0; 
} while (--iterations > 0); 
~~~

这个达夫设备的实现首先通过用 values 数组的长度除以 8 计算需要多少次循环。Math.ceil()用于保证这个值是整数。startAt 变量保存着仅按照除以 8 来循环不会处理的元素个数。第一次循环执
行时，会检查 startAt 变量，以确定要调用 process()多少次。例如，假设数组有 10 个元素，则 startAt变量等于 2，因此第一次循环只会调用 process()两次。第一次循环末尾，startAt 被重置为 0。于是后续每次循环都会调用 8 次 process()。这样展开之后，能够加快大数据集的处理速度。

Andrew B. King 在 Speed Up Your Site 一书中提出了更快的达夫设备实现，他将 do-while 循环分成了两个单独的循环，如下所示：

~~~
// 来源：Speed Up Your Site（New Riders，2003）
let iterations = Math.floor(values.length / 8); 
let leftover = values.length % 8; 
let i = 0; 
if (leftover > 0) { 
 do { 
 process(values[i++]); 
 } while (--leftover > 0); 
} 
do { 
 process(values[i++]); 
 process(values[i++]); 
 process(values[i++]); 
 process(values[i++]); 

 process(values[i++]); 
 process(values[i++]); 
 process(values[i++]); 
 process(values[i++]); 
} while (--iterations > 0); 
~~~

在这个实现中，变量 leftover 保存着只按照除以 8 来循环不会处理，因而会在第一个循环中处理的次数。处理完这些额外的值之后进入主循环，每次循环调用 8 次 process()。这个实现比原始的实现快约 40%。

展开循环对于大型数据集可以节省很多时间，但对于小型数据集来说，则可能不值得。因为实现同样的任务需要多写很多代码，所以如果处理的数据量不大，那么显然没有必要。

4. 避免重复解释

重复解释的问题存在于 JavaScript 代码尝试解释 JavaScript 代码的情形。在使用 eval()函数或Function 构造函数，或者给setTimeout()传入字符串参数时会出现这种情况。下面是几个例子：

~~~
// 对代码求值：不要
eval("console.log('Hello world!')"); 
// 创建新函数：不要
let sayHi = new Function("console.log('Hello world!')"); 
// 设置超时函数：不要
setTimeout("console.log('Hello world!')", 500); 
~~~

在上面所列的每种情况下，都需要重复解释包含 JavaScript 代码的字符串。这些字符串在初始解析阶段不会被解释，因为代码包含在字符串里。这意味着在 JavaScript 运行时，必须启动新解析器实例来解析这些字符串中的代码。实例化新解析器比较费时间，因此这样会比直接包含原生代码慢。
这些情况都有对应的解决方案。很少有情况绝对需要使用 eval()，因此应该尽可能不使用它。此时，只要把代码直接写出来就好了。对于 Function 构造函数，重写为常规函数也很容易。而调用
setTimeout()时则可以直接把函数作为第一个参数。比如：

~~~
// 直接写出来
console.log('Hello world!'); 
// 创建新函数：直接写出来
let sayHi = function() { 
 console.log('Hello world!'); 
}; 
// 设置超时函数：直接写出来
setTimeout(function() { 
 console.log('Hello world!'); 
}, 500); 
~~~

为了提升代码性能，应该尽量避免使用要当作 JavaScript 代码解释的字符串。

5. 其他性能优化注意事项

在评估代码性能时还有一些地方需要注意。下面列出的虽然不是主要问题，但在使用比较频繁的时候也可能有所不同。

- 原生方法很快。应该尽可能使用原生方法，而不是使用 JavaScript 写的方法。原生方法是使用 C 或 C++等编译型语言写的，因此比 JavaScript 写的方法要快得多。JavaScript中经常被忽视的是Math 对象上那些执行复杂数学运算的方法。这些方法总是比执行相同任务的 JavaScript 函数快得多，比如求正弦、余弦等。
- switch 语句很快。如果代码中有复杂的 if-else 语句，将其转换成 switch 语句可以变得更快。然后，通过重新组织分支，把最可能的放前面，不太可能的放后面，可以进一步提升性能。
- 位操作很快。在执行数学运算操作时，位操作一定比任何布尔值或数值计算更快。选择性地将某些数学操作替换成位操作，可以极大提升复杂计算的效率。像求模、逻辑 AND 与和逻辑 OR
或都很适合替代成位操作。

##### 28.2.3 语句最少化

JavaScript 代码中语句的数量影响操作执行的速度。一条可以执行多个操作的语句，比多条语句中每个语句执行一个操作要快。那么优化的目标就是寻找可以合并的语句，以减少整个脚本的执行时间。
为此，可以参考如下几种模式。

1. 多个变量声明

声明多个变量时很容易出现多条语句。比如，下面使用多个 let 声明多个变量的情况很常见：

~~~
// 有四条语句：浪费
let count = 5; 
let color = "blue"; 
let values = [1,2,3]; 
let now = new Date(); 
~~~

在强类型语言中，不同数据类型的变量必须在不同的语句中声明。但在 JavaScript 中，所有变量都可以使用一个 let 语句声明。前面的代码可以改写为如下：

~~~
// 一条语句更好
let count = 5, 
 color = "blue", 
values = [1,2,3], 
now = new Date(); 
~~~

这里使用一个 let 声明了所有变量，变量之间以逗号分隔。这种优化很容易做到，且比使用多条语句执行速度更快。

2. 插入迭代性值

任何时候只要使用迭代性值（即会递增或递减的值），都要尽可能使用组合语句。来看下面的代码片段：

~~~
let name = values[i]; 
i++; 
~~~

前面代码中的两条语句都只有一个作用：第一条从 values 中取得一个值并保存到 name 中，第二条递增变量 i。把迭代性的值插入第一条语句就可以将它们合并为一条语句：

~~~
let name = values[i++]; 
~~~

这一条语句完成了前面两条语句完成的事情。因为递增操作符是后缀形式的，所以 i 在语句其他部分执行完成之前是不会递增的。只要遇到类似的情况，就要尽量把迭代性值插入到上一条使用它的语句中。

3. 使用数组和对象字面量

本书代码示例中有两种使用数组和对象的方式：构造函数和字面量。使用构造函数始终会产生比单纯插入元素或定义属性更多的语句，而字面量只需一条语句即可完成全部操作。来看下面的例子：

~~~
// 创建和初始化数组用了四条语句：浪费
let values = new Array(); 
values[0] = 123; 
values[1] = 456; 
values[2] = 789; 
// 创建和初始化对象用了四条语句：浪费
let person = new Object(); 
person.name = "Nicholas"; 
person.age = 29; 
person.sayName = function() { 
 console.log(this.name); 
}; 
~~~

在这个例子中，分别创建和初始化了一个数组和一个对象。两件事都用了四条语句：一条调用构造函数，三条添加数据。这些语句很容易转换成字面量形式：

~~~
// 一条语句创建并初始化数组
let values = [123, 456, 789]; 
// 一条语句创建并初始化对象
let person = { 
 name: "Nicholas", 
 age: 29, 
 sayName() { 
 console.log(this.name); 
 } 
}; 
~~~

重写后的代码只有两条语句：一条创建并初始化数组，另一条创建并初始化对象。相对于前面使用了 8 条语句，这里使用两条语句，减少了 75%的语句量。对于数千行的 JavaScript 代码，这样的优化效果可能更明显。

应尽可能使用数组或对象字面量，以消除不必要的语句。

> 注意 减少代码中的语句量是很不错的目标，但不是绝对的法则。一味追求语句最少化，可能导致一条语句容纳过多逻辑，最终难以理解。

##### 28.2.4 优化 DOM 交互

在所有 JavaScript 代码中，涉及 DOM 的部分无疑是非常慢的。DOM 操作和交互需要占用大量时间，因为经常需要重新渲染整个或部分页面。此外，看起来简单的操作也可能花费很长时间，因为 DOM 中携带着大量信息。理解如何优化 DOM 交互可以极大地提升脚本的执行速度。

1. 实时更新最小化

访问 DOM 时，只要访问的部分是显示页面的一部分，就是在执行实时更新操作。之所以称其为实时更新，是因为涉及立即（实时）更新页面的显示，让用户看到。每次这样的更新，无论是插入一个字
符还是删除页面上的一节内容，都会导致性能损失。这是因为浏览器需要为此重新计算数千项指标，之后才能执行更新。实时更新的次数越多，执行代码所需的时间也越长。反之，实时更新的次数越少，代码执行就越快。来看下面的例子：

~~~
let list = document.getElementById("myList"), 
 item; 
for (let i = 0; i < 10; i++) { 
 item = document.createElement("li"); 
 list.appendChild(item); 
 item.appendChild(document.createTextNode('Item ${i}'); 
} 
~~~

以上代码向列表中添加了 10 项。每添加 1 项，就会有两次实时更新：一次添加<li>元素，一次为它添加文本节点。因为要添加 10 项，所以整个操作总共要执行 20 次实时更新。
为解决这里的性能问题，需要减少实时更新的次数。有两个办法可以实现这一点。第一个办法是从页面中移除列表，执行更新，然后再把列表插回页面中相同的位置。这个办法并不可取，因为每次更新
时页面都会闪烁。第二个办法是使用文档片段构建 DOM 结构，然后一次性将它添加到 list 元素。这个办法可以减少实时更新，也可以避免页面闪烁。比如：

~~~
let list = document.getElementById("myList"), 
 fragment = document.createDocumentFragment(), 
 item; 
for (let i = 0; i < 10; i++) { 
 item = document.createElement("li"); 
 fragment.appendChild(item); 
 item.appendChild(document.createTextNode("Item " + i)); 
} 
list.appendChild(fragment); 
~~~

这样修改之后，完成同样的操作只会触发一次实时更新。这是因为更新是在添加完所有列表项之后一次性完成的。文档片段在这里作为新创建项目的临时占位符。最后，使用 appendChild()将所有项
目都添加到列表中。别忘了，在把文档片段传给 appendChild()时，会把片段的所有子元素添加到父元素，片段本身不会被添加。
只要是必须更新 DOM，就尽量考虑使用文档片段来预先构建 DOM 结构，然后再把构建好的 DOM结构实时更新到文档中。

2. 使用 innerHTML

在页面中创建新 DOM节点的方式有两种：使用 DOM方法如 createElement()和 appendChild()，以及使用 innerHTML。对于少量 DOM 更新，这两种技术区别不大，但对于大量 DOM 更新，使用
innerHTML 要比使用标准 DOM 方法创建同样的结构快很多。在给 innerHTML 赋值时，后台会创建 HTML 解析器，然后会使用原生 DOM 调用而不是 JavaScript
的 DOM 方法来创建 DOM 结构。原生 DOM 方法速度更快，因为该方法是执行编译代码而非解释代码。
前面的例子如果使用 innerHTML 重写就是这样的：

~~~
let list = document.getElementById("myList"), 
 html = ""; 
for (let i = 0; i < 10; i++) { 
 html += '<li>Item ${i}</li>'; 
} 
list.innerHTML = html;
~~~

以上代码构造了一个HTML字符串，然后将它赋值给list.innerHTML，结果也会创建适当的 DOM结构。虽然拼接字符串也会有一些性能损耗，但这个技术仍然比执行多次 DOM 操作速度更快。
与其他 DOM 操作一样，使用 innerHTML 的关键在于最小化调用次数。例如，下面的代码使用innerHTML 的次数就太多了：

~~~
let list = document.getElementById("myList"); 
for (let i = 0; i < 10; i++) { 
 list.innerHTML += '<li>Item ${i}</li>'; // 不要
} 
~~~
这里的问题是每次循环都会调用 innerHTML，因此效率极低。事实上，调用 innerHTML 也应该看成是一次实时更新。构建好字符串然后调用一次 innerHTML 比多次调用 innerHTML 快得多。
注意 使用 innerHTML 可以提升性能，但也会暴露巨大的 XSS 攻击面。无论何时使用它填充不受控的数据，都有可能被攻击者注入可执行代码。此时必须要当心。

3. 使用事件委托

大多数 Web 应用程序会大量使用事件处理程序实现用户交互。一个页面中事件处理程序的数量与页面响应用户交互的速度有直接关系。为了减少对页面响应的影响，应该尽可能使用事件委托。
事件委托利用了事件的冒泡。任何冒泡的事件都可以不在事件目标上，而在目标的任何祖先元素上处理。基于这个认知，可以把事件处理程序添加到负责处理多个目标的高层元素上。只要可能，就应该
在文档级添加事件处理程序，因为在文档级可以处理整个页面的事件。

4. 注意 HTMLCollection
由于 Web 应用程序存在很大的性能问题，HTMLCollection 对象的缺点本书前面已多次提到过了。任何时候，只要访问 HTMLCollection，无论是它的属性还是方法，就会触发查询文档，而这个查询相当耗时。减少访问 HTMLCollection 的次数可以极大地提升脚本的性能。
可能优化 HTMLCollection 访问最关键地方就是循环了。之前，我们讨论过要把计算
HTMLCollection 长度的代码转移到 for 循环初始化的部分。来看下面的例子：

~~~
let images = document.getElementsByTagName("img"); 
for (let i = 0, len = images.length; i < len; i++) { 
 // 处理
} 
~~~

这里的关键是把 length 保存到了 len 变量中，而不是每次都读一次 HTMLCollection 的 length属性。在循环中使用 HTMLCollection 时，应该首先取得对要使用的元素的引用，如下面所示。这样才能避免在循环体内多次调用 HTMLCollection：

~~~
let images = document.getElementsByTagName("img"), 
 image; 
for (let i = 0, len=images.length; i < len; i++) { 
 image = images[i]; 
 // 处理
} 
~~~

这段代码增加了 image 变量，用于保存当前的图片。有了这个局部变量，就不需要在循环中再访问 images HTMLCollection 了。
编写 JavaScript 代码时，关键是要记住，只要返回 HTMLCollection 对象，就应该尽量不访问它。以下情形会返回 HTMLCollection：
- 调用 getElementsByTagName()；
- 读取元素的 childNodes 属性；
- 读取元素的 attributes 属性；
- 访问特殊集合，如 document.form、document.images 等。
理解什么时候会碰到 HTMLCollection 对象并适当地使用它，有助于明显地提升代码执行速度。

##### 28.3 部署

任何 JavaScript 解决方案最重要的部分可能就是把网站或 Web 应用程序部署到线上环境了。在此之前我们已完成了很多工作，包括架构方面和优化方面的。现在到了把代码移出开发环境，发布到网上，让用户去使用它的时候了。不过，在发布之前，还需要解决一些问题。

28.3.1 构建流程

准备发布 JavaScript 代码时最重要一环是准备构建流程。开发软件的典型模式是编码、编译和测试。换句话说，首先要写代码，然后编译，之后运行并确保它能够正常工作。但因为 JavaScript 不是编译型语言，所以这个流程经常会变成编码、测试。你写的代码跟在浏览器中测试的代码一样。这种方式的问题在于代码并不是最优的。你写的代码不应该不做任何处理就直接交给浏览器，原因如下。

- 知识产权问题：如果把满是注释的代码放到网上，其他人就很容易了解你在做什么，重用它，并可能发现安全漏洞。
- 文件大小：你写的代码可读性很好，容易维护，但性能不好。浏览器不会因为代码中多余的空格、缩进、冗余的函数和变量名而受益。
- 代码组织：为保证可维护性而组织的代码不一定适合直接交付给浏览器。

为此，需要为 JavaScript 文件建立构建流程。

1. 文件结构

构建流程首先定义在源代码控制中存储文件的逻辑结构。最好不要在一个文件中包含所有JavaScript 代码。相反，要遵循面向对象编程语言的典型模式，把对象和自定义类型保存到自己独立的
文件中。这样可以让每个文件只包含最小量的代码，让后期修改更方便，也不易引入错误。此外，在使用并发源代码控制系统（如 Git、CVS 或 Subversion）的环境中，这样可以减少合并时发生冲突的风险。

注意，把代码分散到多个文件是从可维护性而不是部署角度出发的。对于部署，应该把所有源文件合并为一个或多个汇总文件。Web 应用程序使用的 JavaScript 文件越少越好，因为 HTTP 请求对某些 Web应用程序而言是主要的性能瓶颈。而且，使用<script>标签包含 JavaScript 是阻塞性操作，这导致代码下载和执行期间停止所有其他下载任务。因此，要尽量以符合逻辑的方式把 JavaScript 代码组织到部署文件中。

2. 任务运行器

如果要把大量文件组合成一个应用程序，很可能需要任务运行器自动完成一些任务。任务运行器可以完成代码检查、打包、转译、启动本地服务器、部署，以及其他可以脚本化的任务。

很多时候，任务运行器要通过命令行界面来执行操作。因此你的任务运行器可能仅仅是一个辅助组织和排序复杂命令行调用的工具。从这个意义上说，任务运行器在很多方面非常像.bashrc 文件。其他情况下，要在自动化任务中使用的工具可能是一个兼容的插件。

如果你使用 Node.js 和 npm 打印 JavaScript 资源，Grunt 和 Gulp 是两个主流的任务运行器。它们非常稳健，其任务和指令都是通过配置文件，以纯 JavaScript 形式指定的。使用 Grunt 和 Gulp 的好处是它们分别有各自的插件生态，因此可以直接使用 npm 包。关于这两个工具插件的详细信息可以参考本书附录。

3. 摇树优化

摇树优化（tree shaking）是非常常见且极为有效的减少冗余代码的策略。正如第 26 章介绍模块时所提到的，使用静态模块声明风格意味着构建工具可以确定代码各部分之间的依赖关系。更重要的是，摇树优化还能确定代码中的哪些内容是完全不需要的。
实现了摇树优化策略的构建工具能够分析出选择性导入的代码，其余模块文件中的代码可以在最终打包得到的文件中完全省略。假设下面是个示例应用程序：

~~~
import { foo } from './utils.js'; 
console.log(foo); 
export const foo = 'foo'; 
export const bar = 'bar'; // unused 
~~~

这里导出的 bar 就没有被用上，而构建工具可以很容易发现这种情况。在执行摇树优化时，构建工具会将 bar 导出完全排除在打包文件之外。静态分析也意味着构建工具可以确定未使用的依赖，同样也会排除掉。通过摇树优化，最终打包得到的文件可以瘦身很多。

4. 模块打包器

以模块形式编写代码，并不意味着必须以模块形式交付代码。通常，由大量模块组成的 JavaScript代码在构建时需要打包到一起，然后只交付一个或少数几个 JavaScript 文件。
模块打包器的工作是识别应用程序中涉及的 JavaScript 依赖关系，将它们组合成一个大文件，完成对模块的串行组织和拼接，然后生成最终提供给浏览器的输出文件。
能够实现模块打包的工具非常多。Webpack、Rollupt 和 Browserify 只是其中的几个，可以将基于模块的代码转换为普遍兼容的网页脚本。

28.3.2 验证

即使已出现了能够理解和支持 JavaScript 的 IDE，大多数开发者仍通过在浏览器中运行代码来验证自己的语法。这种方式有很多问题。首先，如此验证不容易自动化，也不方便从一个系统移植到另一个系统。其次，除了语法错误，只有运行的代码才可能报错，没有运行到的代码则无法验证。有一些工具可以帮我们发现 JavaScript 代码中潜在的问题，最流行的是 Douglas Crockford 的 JSLint 和 ESLint。这些代码检查工具可以发现 JavaScript 代码中的语法错误和常见的编码错误。下面是它们会报告的一些问题：
- 使用 eval()；
- 使用未声明的变量；
- 遗漏了分号；
- 不适当地换行；
- 不正确地使用逗号；
- 遗漏了包含语句的括号；
- 遗漏了 switch 分支中的 break；
- 重复声明变量；
- 使用了 with；
- 错误地使用等号（应该是两个或三个等号）；
- 执行不到的代码。
在开发过程中添加代码检查工具有助于避免出错。推荐开发者在构建流程中也加入代码检查环节，以便在潜在问题成为错误之前识别它们。

28.3.3 压缩

谈到 JavaScript 文件压缩，实际上主要是两件事：代码大小（code size）和传输负载（wire weight）。代码大小指的是浏览器需要解析的字节数，而传输负载是服务器实际发送给浏览器的字节数。在 Web开发的早期阶段，这两个数值几乎相等，服务器发送给浏览器的是未经修改的源文件。而今天，这两个数值不可能相等，实际上也不应该相等。

1. 代码压缩

JavaScript 不是编译成字节码，而是作为源代码传输的，所以源代码文件通常包含对浏览器的JavaScript 解释器没有用的额外信息和格式。JavaScript 压缩工具可以把源代码文件中的这些信息删除，并在保证程序逻辑不变的前提下缩小文件大小。注释、额外的空格、长变量或函数名都能提升开发者的可读性，但对浏览器而言这些都是多余的字
节。压缩工具可以通过如下操作减少代码大小：
- 删除空格（包括换行）；
- 删除注释；
- 缩短变量名、函数名和其他标识符。
所有 JavaScript 文件都应该在部署到线上环境前进行压缩。在构建流程中加入这个环节压缩JavaScript 文件是很容易的。
注意 在 Web 开发的上下文中，“压缩”（compression）经常意味着“最小化”（minification）。
虽然这两个术语可以互换使用，但实际上它们的含义并不相同。
最小化是指把文件大小减少到比原始大小还要小，但结果文件包含的仍是语法正确的代码。通常，最小化只适合 JavaScript 等解释型语言，编译为二进制的语言自然会被编译器最小化。压缩与最小化的区别在于前者得到的文件不再包含语法正确的代码。压缩后的文件必须通过解压缩才能恢复为代码可读的格式。压缩通常能得到比最小化更小的文件，压缩算法不用考虑保留语法结构，因此自由度更高。

2. JavaScript 编译

类似于最小化，JavaScript 代码编译通常指的是把源代码转换为一种逻辑相同但字节更少的形式。与最小化的不同之处在于，编译后代码的结构可能不同，但仍然具备与原始代码相同的行为。编译器通过输入全部 JavaScript 代码可以对程序流执行稳健的分析。编译可能会执行如下操作：

- 删除未使用的代码；
- 将某些代码转换为更简洁的语法；
- 全局函数调用、常量和变量行内化。

3. JavaScript 转译

我们提交到项目仓库中的代码与浏览器中运行的代码不一样。ES6、ES7 和 ES8 都为 ECMAScript规范扩充增加了更好用的特性，但不同浏览器支持这些规范的步调并不一致。
通过 JavaScript 转译，可以在开发时使用最新的语法特性而不用担心浏览器的兼容性问题。转译可以将现代的代码转换成更早的 ECMAScript 版本，通常是 ES3 或 ES5，具体取决于你的需求。这样可以确保代码能够跨浏览器兼容。本书附录将介绍一些转译工具。

> 注意 “转译”（transpilation）和“编译”（compilation）经常被人当成同一个术语混用。编译是将源代码从一种语言转换为另一种语言。转译在本质上跟编译是一样的，只是目标语言与源语言是一种语言的不同级别的抽象。因此，把 ES6/ES7/ES8 代码转换为 ES3/ES5代码从技术角度看既是编译也是转译，只是转译更为确切一些。

4. HTTP 压缩

传输负载是从服务器发送给浏览器的实际字节数。这个字节数不一定与代码大小相同，因为服务器和浏览器都具有压缩能力。所有当前主流的浏览器（IE/Edge、Firefox、Safari、Chrome 和 Opera）都支持客户端解压缩收到的资源。服务器则可以根据浏览器通过请求头部（Accept-Encoding）标明自己支持的格式，选择一种用来压缩 JavaScript 文件。在传输压缩后的文件时，服务器响应的头部会有字段（Content-Encoding）标明使用了哪种压缩格式。浏览器看到这个头部字段后，就会根据这个压缩格式进
行解压缩。结果是通过网络传输的字节数明显小于原始代码大小。

例如，使用 Apache 服务器上的两个模块（mod_gzip 和 mod_deflate）可以减少原始 JavaScript文件的约 70%。
这很大程度上是因为JavaScript的代码是纯文件，所以压缩率非常高。减少通过网络传输的数据量意味着浏览器能更快收到数据。注意，服务器压缩和浏览器解压缩都需要时间。不过相比于
通过传入更少的字节数而节省的时间，整体时间应该是减少的。

注意 大多数 Web 服务器（包括开源的和商业的）具备 HTTP 压缩能力。关于如何正确地配置压缩，请参考相关服务器的文档

28.4 小结

随着 JavaScript 开发日益成熟，最佳实践不断涌现。曾经的业余爱好如今也成为了正式的职业。因此，前端开发也需要像其他编程语言一样，注重可维护性、性能优化和部署。
为保证 JavaScript 代码的可维护性，可以参考如下编码惯例。
- 其他语言的编码惯例可以作为添加注释和确定缩进的参考，但 JavaScript 作为一门适合松散类型的语言也有自己的一些特殊要求。
- 由于 JavaScript 必须与 HTML 和 CSS 共存，因此各司其职尤为重要：JavaScript 负责定义行为，HTML 负责定义内容，而 CSS 负责定义外观。
- 如果三者职责混淆，则可能导致难以调试的错误和可维护性问题。随着 Web 应用程序中 JavaScript 代码量的激增，性能也越来越重要。因此应该牢记如下这些事项。
- 执行 JavaScript 所需的时间直接影响网页性能，其重要性不容忽视。
- 很多适合 C 语言的性能优化策略同样也适合 JavaScript，包括循环展开和使用 switch 语句而不是 if 语句。
- 另一个需要重视的方面是 DOM 交互很费时间，因此应该尽可能限制 DOM 操作的数量。开发 Web 应用程序的最后一步是上线部署。以下是本章讨论的相关要点。
- 为辅助部署，应该建立构建流程，将 JavaScript 文件合并为较少的（最好是只有一个）文件。
- 构建流程可以实现很多源代码处理任务的自动化。例如，可以运行 JavaScript 验证程序，确保没有语法错误和潜在的问题。
- 压缩可以让文件在部署之前变得尽量小。
- 启用 HTTP 压缩可以让网络传输的 JavaScript 文件尽可能小，从而提升页面的整体性能。
