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