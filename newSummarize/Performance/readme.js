/*
性能优化：（待整理）

对于 JavaScript 步骤，还有其他一些很好的建议，下面简单列举出来，就不做 demo 了，

将一些纯计算型，不涉及 dom 访问的任务，放到Web Workers中
对于可以使用 css3 来实现的动画，就不需要用 JavaScript 来实现了
对于用户事件的响应，同步执行时间不要太长，逻辑尽量简单，复杂的逻辑可以延迟处理或分块处理

requestAnimationFrame 来完成动画

js动画使用可以触发layer的属性来减少layout，比如用transform的translate来移动元素

Avoid large, complex layouts and layout thrashing：
https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing?hl=en#avoid-layout-thrashing

渲染性能
https://web.dev/articles/rendering-performance?hl=zh-cn

CSS Houdini：
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Houdini

事件代理或事件委托

performance.now() 需要去学习这里所有的方法和属性是什么
https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

*/



/*
- 学习 Performance 工具使用
  - 用 Performance 工具来深入理解 Event Loop
    - https://juejin.cn/post/7155350299295612941?searchId=20230810111815D460658F5688D3D5A23C
  - 用 Performance 来分析 Event Loop、宏微任务以及它们执行顺序
    - https://juejin.cn/post/7196582574642004025
  - 快速掌握 Performance 性能分析
    - https://juejin.cn/post/7046805217668497445






*/