/*
  【页面渲染原理】
   https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work // 渲染页面之浏览器的工作原理
   https://blog.csdn.net/weixin_43830271/article/details/111594017 // composite
   https://www.cnblogs.com/jinhengyu/p/10257754.html // 硬件加速原理
   https://www.infoq.cn/article/javascript-high-performance-animation-and-page-rendering/  // 高性能动画与页面渲染
  【概念梳理：】
    * 渲染层：renderLayer
    * 合成层：GraphicsLayer
    * 布局：layout
    * 绘制：paint
    * 合成：composite
    * reflow：重新执行 layout、paint
    * repaint：重新执行 paint
    * DOM-Tree：整个document文档对象
    * CSSOM-Tree：css样式抽象树
  【页面渲染的初始化流程】
    * dom字符串解析 -> DOM-Tree
    * css字符串 -> CSSOM-Tree
    * DOM-Tree + CSSOM-Tree -> RenderTree
    * 根据RenderTree来进行Layout布局 -> RenderLayer
    * 根据RenderLayer来进行Paint
        * -> 对渲染层进行分析得到不同的GraphicsLayer（即：合成层）
            * 带有特殊属性（3D的transform、opacity等）的元素会单独变成一个GraphicsLayer
            * 其它RenderLayer会共享一个GraphicsLayer
        * -> 输出GraphicsLayer的位图（即：纹理）到共享内存中
    * composite（层合成，合成是有合成线程单独负责处理的）
        * GPU把共享内存中的纹理进行分析合并绘制到屏幕上
            * GPU在纹理合成时对于每一层纹理都可以指定不同的合成参数，
              对含有【3D的transform、opacity】等属性的层会开启底层硬件加速，
              对transform、opacity等这些特殊属性进行变化的时候，只主要composite就行，
              不会进行reflow和repaint，不影响主线程，性能很好。
  【特别说明：】
    * GPU的功能是在原图的基础上进行旋转、移动、滤镜等处理，得到新的图片，但是并不会自己直接生成原图。
    * 并不是开启了硬件加速的GraphicsLayer层在任何属性变化的时候都不进行reflow和repaint
        * 只适应于：transform、opacity等特殊属性
        * color、width、height、文本内容等变化还是会重新layout或paint的
    * GraphicsLayer的纹理都是由CPU来绘制到内存中的，而且都是通过GPU来绘制到屏幕上的
    * GPU硬件加速只是对带有特殊属性的纹理再进行相关属性变化时，可以直接通过合成线程来异步composite
    * 浏览器页面渲染过程中存在两个线程：
        * 主线程 - 负责JS运行、页面事件交互、图片纹理生成
        * 合成线程 - 图片纹理合成、把图片渲染到页面上
    * layout 和 paint 这两个过程在某些情况下是可以避免的
*/


/*
 【一些页面渲染相关的说明：】
  layout：是一个耗时特别大的操作
  paint：是一个耗时很短的操作
  屏幕刷新率是指：屏幕上的图像在一秒中会刷新大概60次，这每一次就是一帧，动画就是快速的改变每一帧的图像来实现的。
  repaint重新绘制是指：告诉CPU去重新计算浏览器可视区域内每个像素点的颜色，如果不需要重新绘制的话，也就不需要重新计算了，只需要把上一帧的像素重新再绘制一份就行了。不管是初始化paint还是repaint，都是整个页面绘制的。
  layout布局是指：计算每一个元素的盒模型属性：宽、高、位置、是否需要隐藏、文本内容。
  reflow是指：重新计盒模型属性受到影响的每一个元素的盒模型属性。
  reflow的开销：在很多引起reflow的case中，由于导致了几乎整个页面元素的盒模型属性都需要重新计算，所以就等于整个页面重新layout了。
  reflow和repaint策略：并不是每次变化都马上会执行，而是将每次变化都维护在一个队列里面，在下一帧中统一合并进行一次layout和paint。
*/


/*
 【DOM操作优化】
  * 讲的很不错：https://segmentfault.com/a/1190000008267184
*/


/*
 【为什么前端监控要用GIF打点】
  * https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw?utm_source=tuicool&utm_medium=referral
*/