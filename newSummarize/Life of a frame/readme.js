/*
- 结合下面三个文章来看：
  - Life of a frame
    - https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/life_of_a_frame.md
  - The Anatomy of a Frame (一个frame的解刨):
    - https://aerotwist.com/blog/the-anatomy-of-a-frame/
  - Vsync of chrome，chrome任务优先级调度策略
    - https://blog.csdn.net/kaimo313/article/details/118159117
*/

/*
- 一些难点说明：
  - Vsync的解释
    - 当显示器将一帧画面绘制完成后，并在准备读取下一帧之前，显示器会发出一个垂直同步信号（vertical synchronization）
      给 GPU，简称 VSync。
    - Vsync 跟 Tick事件循环 是完全不同的两个东西，一个Vsync中可能会包含多个Tick的执行
  - BeginFrame 是如何被触发的？
    - 当 GPU 接收到 VSync 信号后，会将 VSync 信号同步给浏览器进程，浏览器进程再将其同步到
      对应的渲染进程，渲染进程接收到 VSync 信号之后，就可以准备绘制新的一帧。
  - Chrome是如何做到合并一帧内的所有修改？
    - 两个连续的Vsync之间的时间就是一帧的时间，在两个Vsync之间做的所有UI更新都会被合并
  - 如果一个Vsync之中没有发生任务UI变化，那么chrome会怎么处理？
    - chrome还是会接收到GPU发来的Vsync信号，但是chrome发现没有可以提交给GPU的UI变化，
      这时chrome就不会往GPU里面提交绘制任务
  - 两个Vsync之间会做哪些事情？
    - 会执行BeginFrame工作来合成将要提交给GPU的frame
    - 事件循环会一直开启，主线程会执行一些事件任务，进而也会执行js代码
  - chrome是如何判断是否有空闲时间，进而决定是否执行requestIdleCallback的？
    - chrome内部有计时器可以计算出两个Vsync之间的时间间隔，一般是16.7ms
    - 一个Vsync只会触发一次frame，如果frame提交给GPU以后，在等待下一次frame触发之前，
      主进程会继续执行一些低优先级的事件任务，比如setTimeout，如果在执行完低优先级任务以后，
      浏览器算出来距离下一次Vsync时间还有空闲时间，那么就会去执行requestIdleCallback
*/

/*
- 一个frame大致包括以下步骤：
  - 基于上一个已经结束了的frame的结果之上
  - BeginFrame（Vsync is fired, a frame starts）
  - HandleInputEvent：处理用户的交互事件，如点击、触碰、滚动等事件，这些交互事件优先级比较高，所以需要最优先处理
  - RequestAnimationFrame：执行RAF回调，回调里面如果又执行了requestAnimationFrame(callback)，那么会在下一个frame中执行
  - Parse HTML：如果有js操作了更新了dom，那就需要重新解析一下dom
  - Recalc Styles：如果有样式更新，那就需要重新结算样式
  - Layout：如果有元素的大小或位置变化了可能就需要重新执行Layout
  - Paint：生成绘制记录，生成Layers
  - Composite：有必要的话会把一些重叠的Layers合成一个ccLayer
  - Rasterize：生成图片textures纹理
  - Frame End：CompositorFrame，把layers的tiles合成成一个frame
  - Frame Ships：把合成的frame发送给GPU来绘制到屏幕上
*/


/*
- 两个参考文章：
  - Unified BeginFrame scheduling for Chrome 
    - https://www.cnblogs.com/huangguanyuan/p/10073441.html
  - Improved vsync scheduling for Chrome on Android：
    - https://docs.google.com/document/d/16822du6DLKDZ1vQVNWI3gDVYoSqCSezgEmWZ0arvkP8/mobilebasic
*/