/*
- WebWorker，postMessage，MessageChannel 的使用
*/

/*
- 事件冒泡(Bubble) 和 事件捕获(Capture)
  - 事件流：是指当点击一个目标元素的时候，事件的传递顺序；
    - 先从最顶层元素开始传递到目标元素（捕获），然后再从目标元素传递到最顶层元素（冒泡）
    - 所以事件捕获的触发时机会先于事件冒泡
*/

/*
- requestAnimationFrame 深入理解
  - RAF避免不了卡顿问题，但是可以避免掉帧
  - RAF为什么不回丢帧？
    - RAF回调只有屏幕真正渲染一次才会执行一次，
      如果任何地方的代码执行导致来没有执行渲染，那么下一次RAF就不会被执行
  - 只有RAF里面本身调用的RAF才会放在【下一次frame】执行，
    如果一次同时调用多个RAF那么这些RAF都会在【本次frame】中被执行
  - callback中的时间戳参数代表的是上一个Vsync(frame)结束的时间，单位是毫秒，精度到微妙
*/

/*
- requestIdleCallback 深入理解
  - 浏览器会在每一帧结束后去判断浏览器是否空闲，如果空闲就执行requestIdleCallback，
    - 所以说此回调只可能会在每一帧结束后去执行
  - 多个requestIdleCallback行程了一个队列，如果没有指定timeout，那么就是先进先出
  - requestIdleCallback中又嵌套执行了另一个requestIdleCallback，没有什么特殊的，另一个会被安排在eventLoop中
*/

/*
- Generator 函数
  - 可以把一系列有关联的任务封装到一个Generator函数里面，然后一步一步的执行
    - 特点：这些任务可以被暂停和开启
  - 可以封装Promise异步任务到一个Generator函数里面
    - 可以在函数外面监听异步任务的执行结果，然后继续调用next往下执行
      - async await 就是Generator函数的封装，是Generator函数的语法糖

- Thunk 函数
  - 作用：thunk 从形式上将函数的执行部分和回调部分分开，这样我们就可以在一个地方执行函数，在另一个地方执行回调函数。
  - 是一种对【函数柯里化】的应用

- 函数柯里化 currying
  - 是对函数的一种包装
  - 作用：fn(1,2,3) -> fn(1)(2)(3)或fn(1,2)(3)

- 组合(compose)和管道(pipe) 函数
  - todo ？？？？
  - https://www.bilibili.com/video/BV1h5411N7eq/?spm_id_from=333.337.search-card.all.click&vd_source=555766b712a2e03a84b474a38afc330a

*/

/*
& | 运算
*/