

/*
  1、GUI负责的层的UI渲染是单独有一个线程来负责的，不会阻塞主线程。
     https://blog.csdn.net/weixin_33834679/article/details/87972958
  2、CSS transforms 可以在不影响正常文档流的情况下改变作用内容的位置。
     https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms
     https://www.phpied.com/css-animations-off-the-ui-thread/
     https://blog.csdn.net/weixin_33834679/article/details/87972958  
  3、合成器的优点在于，其工作无关主线程，合成器线程不需要等待样式计算或者 JS 执行，
     这就是为什么合成器相关的动画 最流畅，如果某个动画涉及到布局或者绘制的调整，就会涉及到主线程的重新计算，自然会慢很多。
  4、部分css3的动画效果是在合成线程上实现的，不需要主线程介入，所以省去了重排和重绘的过程，这就大大提升了渲染效率。
     JavaScript都是在在主线程上执行的，所以JavaScript的动画需要主线程的参与，所以效率会大打折扣
  
  
  5、虽然说浏览器执行js是单线程执行（注意，是执行，并不是说浏览器只有1个线程，而是运行时，runing），但实际上浏览器的2个重要的执行线程，这 2 个线程协同工作来渲染一个网页：主线程和合成线程。
     合成层
     
     根据这个来总结吧：https://blog.csdn.net/weixin_33834679/article/details/87972958
                    https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work

*/

/*
  【页面渲染原理】
   https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work
   https://www.cnblogs.com/xiaohuochai/p/9174471.html
   https://blog.csdn.net/weixin_34268310/article/details/88859536
   https://juejin.cn/post/6844903502678867981 // 合成层
  【概念梳理：】
    * 合成层：layer
    * 布局：layout
    * 绘制：paint
    * 合成：composite
    * reflow：重新执行 layout
    * repaint：重新执行 paint
    * DOM-Tree：整个document文档对象
    * CSSOM-Tree：css样式抽象树
  【页面渲染的初始化流程】
    * dom字符串解析 -> DOM-Tree
    * css字符串 -> CSSOM-Tree
    * DOM-Tree + CSSOM-Tree -> Render-Tree
    * 
   1、整个文档也是一个layer；
   2、每个layer中也可以有子layer；
   3、子layer的几何属性发生变化以后，会导致整个renderTree重新进行layout、自己的layer和父layer都会再次paint。
   1、layer层的几何属性发生变化以后，会导致整个页面文档的layer层重新layout布局。
*/


/*
  layout 是一个耗时特别大的操作
  paint 是一个耗时很短的操作

  屏幕刷新率是指：屏幕上的图像在一秒中会刷新大概60次，这每一次就是一帧，动画就是快速的改变每一帧的图像来实现的。
  repaint重现绘制是指：告诉CPU去重新计算浏览器可视区域内每个像素点的颜色，如果不需要重新绘制的话，也就不需要重新计算了，只需要把上一帧的像素重新再绘制一份就行了。不管是初始化paint还是repaint，都是整个页面绘制的。
  layout布局是指：计算每一个元素的几何属性：宽、高、位置、是否需要隐藏、文本内容。
  reflow是指：重新计几何属性受到影响的每一个元素的几何属性。
  reflow的开销：在很多引起reflow的case中，由于导致了几乎整个页面元素的几何属性都需要重新计算，所以就等于整个页面重新layout了。
  reflow和repaint策略：并不是每次变化都马上会执行，而是将每次变化都维护在一个队列里面，在下一帧中统一合并进行一次layout和paint。
*/

/*
浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次

虚拟dom diff的性能分析、：https://www.zhihu.com/question/31809713
    * 手动自己控制细节更新和框架diff更新的性能对比：

    * 整个innerHTML='xx'更新和diff更新的性能对比，比较性能的影响因素；
        如果innerHTML变化量比较大，比如整个应用都要更新，他的性能开销可能就很大

核心diff算法：http://hcysun.me/vue-design/zh/renderer-diff.html
双端比较的原理：http://hcysun.me/vue-design/zh/renderer-diff.html#%E5%8F%A6%E4%B8%80%E4%B8%AA%E6%80%9D%E8%B7%AF-%E5%8F%8C%E7%AB%AF%E6%AF%94%E8%BE%83
*/