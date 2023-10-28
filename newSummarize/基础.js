/* var 跟 let、const的最大区域是：
   1、https://segmentfault.com/a/1190000015403867
   2、在全局作用域下，var 定义的变化会放在window上，let和const不会
*/

/* 冻结 object 的属性
   Object.freeze(obj);
*/

/* void 的作用和意义
   1、最大的意义是返回undefined
   参考：https://kuro.tw/posts/2019/08/04/JS-%E5%86%B7%E7%9F%A5%E8%AD%98-%E4%BD%A0%E6%89%80%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84-void/
*/

/* undefined 和 null 的区别
   1、最大的区别就是：undefined是window上的一个对象，null不是
   2、null代表的就是一个还没有空的对象，undefined代表未定义
*/

/* "use strict"; 的意义
   意义就是：让开发者按照一种良好的代码规范来书写代码，如果书写不规范就会强制报错
*/

/* n++ 和 ++n
   1、n++ 返回n
   2、++n 返回n+1以后的结果
   3、这两个运算之后，都会把n加上1，那么 n = n + 1 了
*/

/* 原型链
   1、参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
*/

/* Promise
   https://es6.ruanyifeng.com/#docs/promise
   https://blog.flqin.com/359.html
*/

/* 浏览器原理
   * 浏览器是多线程的，其中包括：js线程、UI渲染线程、事件线程、定时器触发线程、http请求线程等
     * js线程 和 UI渲染线程 是互斥的
     * 主线程是什么？？？？？
   * 事件循环？？？？？ life of a frame
      * https://blog.flqin.com/359.html
      * https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/life_of_a_frame.md
      * 
   * life of a pixel
      * https://www.youtube.com/watch?v=K2QHdgAKP-s
      * https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit?pli=1#slide=id.ga884fe665f_64_6
      * 
   * 浏览器的工作原理
      * https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work
      * https://juejin.cn/post/7204806134935306301 
         * tcp
         * https
         * 缓存策略 
      * https://blog.csdn.net/lianhunqianr1/article/details/120031021
      * https://www.youtube.com/watch?v=jaPpP3cdgDQ 视频
*/

/* 性能优化
1、网络优化
   * CDN，缩短物理传输距离，就近访问。CDN还有什么好处？
   * 多域名，一个域名的并发限制
   * 开启预加载，怎么实现？
2、资源优化
   * 打包、压缩
   * 字体图标
   * gzip压缩
   * 资源缓存
   * 
3、渲染优化
   * 资源文件的加载顺序
   * 异步加载 async defer
   * 动画 requestAnimationFrame 具体怎么用？
*/

/*
1、如何添加一个空闲执行的任务？
   requestIdleCallback
2、动画优化函数是什么？怎么用？
   requestAnimationFrame
3、什么是js调用栈？
   https://blog.csdn.net/qq_44767749/article/details/122664247
4、堆和栈是什么？
   https://blog.csdn.net/qq_43789598/article/details/125242326
5、performance工具怎么看？怎么使用？
   https://juejin.cn/post/7155350299295612941?searchId=20230810111815D460658F5688D3D5A23C
*/

/* 很重要，要看：
GPU Accelerated Compositing in Chrome：（浏览器的渲染原理）
- https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/?spm=taofed.bloginfo.blog.1.19585ac8DH04KK

Overview of the RenderingNG architecture：
- https://developer.chrome.com/articles/renderingng-architecture/

渲染性能：
- https://web.dev/articles/rendering-performance?spm=taofed.bloginfo.blog.58.19585ac8DH04KK&hl=zh-cn

Composite合成层：
- https://fed.taobao.org/blog/taofed/do71ct/performance-composite/

[译]渲染性能优化之Composite篇:
- https://github.com/FrankKai/FrankKai.github.io/issues/200
- https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count?hl=zh-cn

Chrome DevTools Performance 功能详解：
- https://juejin.cn/post/7112544960934576136

窥探现代浏览器架构(三)
- https://zhuanlan.zhihu.com/p/101587249
*/

// ===================== 以下是结论 ======================
/*

- requestAnimationFrame 的正确理解
  - requestAnimationFrame 是在一次frame的 Layout和Paint 之前执行的；
  - 在本次frame中执行的所有 requestAnimationFrame 的 callback 会在下一次的frame中全部执行；
    - 也就是说，如果在本次frame中同时执行了10次 requestAnimationFrame，设置了10个 callback，
      那么在下一次的frame中这个10个 callback 会都执行掉；
  - requestAnimationFrame 的 callback 是会被主线程中正在执行的js代码阻塞住的；
    - 因为它的callback也是要在主线程中执行的；Layout和Paint的操作也是在主线程中执行的，都会被阻塞；
  - 浏览器每16.7ms进行一次页面重绘，每次重绘之前会执行上一次frame设置的 requestAnimationFrame 的 callback；
    - 所以只要页面重新paint一次，那么 就会执行一次 requestAnimationFrame callback；
    - 所以：用 requestAnimationFrame 设置的动画一定不会出现掉帧的情况，但是解决不了阻塞卡顿的情况；

- 事件循环（事件循环时运行在主线程中的运行，它会被执行栈中的js代码所阻塞）
  1、所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
     - 执行栈中的js代码是是由JS引擎线程调用，并在JS引擎中执行的，此线程会阻塞主线程
  2、主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
     - 这些任务都是有各种其它线程控制的事件添加的，比如：
       - 事件触发线程，处理用户的点击等事件
       - 定时触发器线程，处理setInterval与setTimeout注册的事件
       - 异步http请求线程，处理XMLHttpRequest请求响应事件
  3、一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，如果有有执行任务，则进入执行栈，开始执行。
  4、主线程不断重复上面的三步，此过程也就是常说的Event Loop(事件循环)。
  - 特别说明：任务队列中也会有BeginFrame任务，当主线程的事件循环读取到此任务后就会开始BeginFrame的工作

- Promise

- Https

- Http缓存


*/