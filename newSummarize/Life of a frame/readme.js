/*
- Life of a frame
  - https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/life_of_a_frame.md
- The Anatomy of a Frame (一个frame的解刨): 
  - https://aerotwist.com/blog/the-anatomy-of-a-frame/
*/

/*
- 一个frame大致包括以下步骤：
  - Input event：处理用户的交互，如点击、触碰、滚动等事件
  - JS：JS 解析执行（可能有多个事件循环）
  - Begin frame：帧开始，更新渲染开始。窗口尺寸变更(resize执行)，页面滚动(scroll执行)等的处理
  - rAf：requestAnimationFrame
  - Layout：布局
  - Paint： 绘制
*/

/*
- 一些难点说明：
  - Vsync的解释
    - 垂直同步脉冲（Vertical synchronization, Vsync）是加在两帧之间。它指示着前一帧的结束，和新一帧的开始。 
      垂直同步脉冲是一个持续时间比较长的脉冲，可能持续一行或几行的扫描时间，但在这段时间内，没有像素信号出现。
    - 它是显卡和GPU的一种能力，它可以触发应用程序进行BeginFrame操作
  - BeginFrame 是如何被触发的？
    - 在Vsync被触发的时候，就会调用chrome进程，chrome进程再去触发一个叫做BeginImplFrameToSendBeginMainFrame
      的事件放入到事件循环中，然后当执行到此事件时就会开启BeginFrame
  - Chrome是如何做到合并一帧内的所有修改？
    - 两个连续的Vsync之间的时间就是一帧的时间，在两个Vsync之间做的所有UI更新都会被合并
*/