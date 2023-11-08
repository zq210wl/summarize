/*
面试题：https://juejin.cn/post/7182382408807743548

渲染和并发：
https://juejin.cn/post/7171231346361106440
问题：
* 什么场景需要开启并发？需要手动开始吗？可以自己写例子来试一下，用input、list中两个setState和console来测试
* 哪些事件会默认开始并发？input的输入会吗？
* 时间分片的时间到底是5ms还是16ms？？跟帧率有关系吗？
* 所谓并发，指的就是多个setState吧，中断的也是某个setStatus引起的变化，先把高优先级的setStatus引起的变化先进行渲染，再接着执行中断的setState？？？
* 30多个lane分别是哪些？
* 看看这个使用场景：https://juejin.cn/post/7136152787045318687  ？？？

Everything you need to know about Concurrent React ：
https://blog.codeminer42.com/everything-you-need-to-know-about-concurrent-react-with-a-little-bit-of-suspense/


对线面试官：怎么理解React的Fiber和并发模式：
https://www.mdnice.com/writing/a3c40683f9e744659b515709216ee60e

react18官方更新说明：
https://legacy.reactjs.org/blog/2022/03/29/react-v18.html

fiber 和 链表

深入剖析 React Concurrent： 
https://zhuanlan.zhihu.com/p/60307571

Understanding React's UI Rendering Process

react全套，可以根据他的目录结构来自己搜索学习：
https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b311cf10a4003b634719
https://xiaochen1024.com/series/60b1b600712e370039088e24/60b1b636712e370039088e25


所以主线程 JS 代码不要做太多的计算（不像安卓会很自然的起一个线程来做），要做拆分，这也是为啥 ui 框架要做计算的 fiber 化，就是因为处理交互的时候，不能让计算阻塞了渲染，要递归改循环，通过链表来做计算的暂停恢复。
每处理完一个fiber就先让出主线程，让主线程可以有机会先去处理一下其它UI交互的任务

这个 api 对于前端框架来说太需要了，框架就是希望计算不阻塞渲染，也就是在每一帧的间隔时间（idle时间）做计算，但是这个 api 毕竟是最近加的，有兼容问题，所以 react 自己实现了类似 idle callback 的fiber 机制，在执行逻辑之前判断一下离下一帧刷新还有多久，来判断是否执行逻辑。
具体react的fiber是如何计算是否有空闲时间的？

 Vue和React的对比：
 https://www.cnblogs.com/suihang/p/10098860.html



*/

/* 【react 基础原理】
    
*/

/* 【react 渲染原理】
    
*/

/* 【react 并发机制】
    https://juejin.cn/post/7087747915950604318
    * react concurrent 使用场景
      * https://medium.com/dailyjs/three-practical-examples-of-concurrent-react-b2dba2272a4d
*/

/* 【react hooks实现原理】
    
*/

/* 【react 事件系统】
    
*/


/*
1、memo 和 shouldComponent 的作用一致
2、子组件的状态变化不会引起父组件的重新render，但是父组件的状态变化会引起所有子组件的重新render，
   所以子组件想要避免不必要的渲染就需要用memo来包裹
3、组件的首字母为什么要大写？
4、useEffect 和 useLayoutEffect 的区别？触发时机？
5、suspense 是什么？为什么那么重要？怎么用？有什么特殊的？
6、react16之前到18都发生了哪些变化？
7、flushSync 是干嘛用的，作用？unstable_scheduleCallback 又是什么？
8、useTransition 和 useDeferredValue 的使用和区别？参考：https://vlambda.com/wz_7iCfxlL2J24.html
9、localSetImmediate、MessageChannel 是什么鬼？跟 setTimeout 的区别？
   https://juejin.cn/post/7146004454653820935
   https://juejin.cn/post/7159768909392904222
*/


/*
- 关于看源码：
  - 在实际项目中如果没有遇到跟自己理解不一致的情况出现的时候，一般我是不会主动去看源码的；
    实际远行情况跟官方说明不一致的时候，可能是文档没说清楚，也可能是自己没能很好的理解文档，
    不得已才会考虑去看源码；
  - 工具库的出现就是给我们来提高工作效率的，没有必要非要去看源码，能够很好的理解工具库的设计原理，
    并能很好的使用它来开发我们的项目是最重要的；
*/

/*
React concurrent mode 总结：
- 要解决的问题是：UI阻塞导致无法快速响应交互
- 解决方案是：
  - 工作循环
    - 这是基本的任务调度机制，工作循环中每次处理一个任务（fiber工作单元），都会去看当前循环的时间用完了没；
      如果没有用完，就接着处理下一个任务；如果用完了，就把控制权还给主线程，等下一次 requestIdleCallback 回调再接着做；
    - 也就是说，（不考虑突发事件的）正常调度是由工作循环来完成的，基本规则是：每个工作单元结束检查是否还有时间做下一个，没时间了就先“挂起”；
    - 这样的方式可以让主线程不会一直被占用，保持UI可持续响应交互 
  - 优先级机制
    - 可以通过一下API来动态调整任务的优先级，保证高优先级的任务先执行
    - 低优先级的任务如果执行了5ms还不能完成，那就先暂停它，等高优先级的任务执行完以后，再在下一次宏任务中来继续执行
*/


/*
- Diff算法
  - Diff算法是拿旧的虚拟dom的列表跟新的虚拟dom进行对比，操作的是旧虚拟dom树
*/

/*
- fiber树为什么要设计成双缓存？
  - 是为了在下一次render生成新的fiber树的时候，可以复用一些旧fiber树中的节点数据
    - 这个决定是否复用的过程就是Diff算法

- fiber节点的 effectTag 属性为什么用二进制来表示？
  - 通过二进制表示effectTag，可以方便的使用位操作为fiber.effectTag【赋值多个effect】
  - 一个变量代表来多个值，不需要用多个变量
  - 列举一个用到effectTag的场景1：
    - (workInProgress.effectTag & DidCapture) !== NoEffect
    - 这里其实是对二进制做与运算：我们拿Update和DidCapture来进行&操作，那么得到的结果就很明显了，所有位都是 0；
      - 用到的变量：NoEffect=0b000000000000; Update=0b000000000100; DidCapture=0b000001000000;
    - 所以这里的&操作就是用来判断在某个变量中是否含有某个属性的。
      比如这里就是判断workInProgress.effectTag中是否含有DidCapture这个属性
    - 这里每一个比特位代表的就是一个属性
      - 与运算（a & b）：对于每一个比特位，只有两个操作数相应的比特位都是 1 时，结果才为 1，否则为 0。
  - 列举一个用到effectTag的场景2：
    - 我们的组件同时拥有Update副作用和Snapshot副作用，那么Fiber节点的effectTag就要执行：
      - effectTag |= 0b00000000100
      - effectTag |= 0b00100000000
    - effectTag结果: 0b00100000100
    - 或运算（a | b）: 对两个二进制操作数逐位进行比较。只要两个对应位中有一个 1 时就为 1，否则为 0。

- 真正执行dom操作的时候，react会考虑是一个一个节点更新，还是直接一次更新全部节点

*/

/*
- Vue3、React16Hook、React Fiber 及相关探讨：
  - https://github.com/CodingMeUp/AboutFE/issues/35
    Vue是怎么优化虚拟dom的diff的，怎么做到很快的？？？？？？
    尤雨溪在今年的Vue Conf一个观点让我印象深刻：如果我们可以把更新做得足够快的话，理论上就不需要时间分片了。
    时间分片并没有降低整体的工作量，该做的还是要做, 因此React 也在考虑利用CPU空闲或者I/O空闲期间做一些预渲染。
    所以跟尤雨溪说的一样：React Fiber 本质上是为了解决 React 更新低效率的问题，不要期望 Fiber 能给你现有应用带来质的提升, 
    如果性能问题是自己造成的，自己的锅还是得自己背.
*/