/*
性能优化：（待整理）

对于 JavaScript 步骤，还有其他一些很好的建议，下面简单列举出来，就不做 demo 了，

将一些纯计算型，不涉及 dom 访问的任务，放到Web Workers中
对于可以使用 css3 来实现的动画，就不需要用 JavaScript 来实现了
对于用户事件的响应，同步执行时间不要太长，逻辑尽量简单，复杂的逻辑可以延迟处理或分块处理

requestAnimationFrame 来完成动画

js动画使用可以触发layer的属性来减少layout，比如用transform的translate来移动元素

*/