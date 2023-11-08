/*

- 历年的各种版本演进ppt：
  - 2017年10月：https://docs.google.com/presentation/d/1i1Brb5FTmjStDpnUeKBphKZOJVjZzpM_rv5Wb3TMMtU/edit#slide=id.g3c8accb579_0_0
  - 2018年7月：https://docs.google.com/presentation/d/11_wf2Nh7GOjMfj7Gk-uQssw2qudD71K6ACblnK9-eO4/edit#slide=id.p
  - 2019年8月：https://docs.google.com/presentation/d/1xW_ZmasHTydUyP1nsv79Ap21nuzQEMCN-EPdWKKxFJw/edit#slide=id.g60f92a5151_40_0
  - 2020年7月：https://docs.google.com/presentation/d/104xva9dG9X6wRMXMv2q9e-OM7JgBFantJFgDqLgLEkc/edit#slide=id.g60f92a5151_40_0
  - 2020年11月：https://docs.google.com/presentation/d/1AB737qw1N0d0-poJkpnfYC6khp-Ry9vwHw3ldQ2Tbhc/edit#slide=id.ga99ab38c10_0_0


- 所有版本记录，包括ppt和video，谷歌内部一直在不断更新：
  - https://docs.google.com/spreadsheets/d/14Oy_F3Yw6JlBVyqBU150TlonkznuXSWhJGkaSOy9V9Q/edit#gid=0

- 参考链接：
  - MDN 渲染页面 - 浏览器的工作原理：https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work
  - Inside look at modern web browser(3): https://developer.chrome.com/blog/inside-browser-part3/
  - 窥探现代浏览器架构(三): https://zhuanlan.zhihu.com/p/101587249

- life of a pixel 的说明：（依据的是2020年11月的ppt） 
   - 浏览器所有的content是有下面两个进程负责的；
     - 渲染进程
       - 主线程 Main Thread
         - js引擎（渲染引擎解析道script标签的时候，可以调用js引擎的接口来执行相应的js代码）
         - 渲染引擎 (暴露一些桥接接口给js引擎来访问DOM和CSSOM)
           - 构建 DOM 树
           - 构建 CSSOM 树
           - 构建 Render 树（把 DOM 和 CSSOM 组合起来，确定显示哪些节点以及节点的计算样式）
           - 构建 Layout 树（根据 Render 树来计算出每个节点的宽度、高度以及位置）
           - Paint绘制（按照相应的顺序生成带有一系列绘制操作命令的dislay item list；
             在Paint阶段会将页面分解为多个layer，让其可以独立地Raster光栅化；
             将内容提升到 GPU 上的layer可以提高绘制和重新绘制性能）
             - Raster光栅化解释：将以上这些信息转化为显示器的像素的过程叫做光栅化；
       - 合成器线程 Compositor thread（会阻塞主线程；可以直接接收input事件来处理，比如滚动合成层的滚动条，
         但是如果滚动的不是layer或者有阻塞的js监听器，那么就会合成器就会把该输入转发到主线程去处理）
         - Compositing合成（Combine layers to CCLayer, 当文档的各个部分以不同的layer绘制，
           相互重叠时，必须进行合成，以确保它们以正确的顺序绘制到屏幕上，并正确显示内容；
           CCLayer跟普通Layer没有本质的区别，只是CCLayer是把多个普通Layer进行了合并而已；）
         - 把layer切分成多个小的tiles，然后发送给Raster去处理得到textures纹理信息，页面是通过多个tiles拼接
           而成的（这样可以做到只显示可是区域的tiles，当页面滚动的时候再去把隐藏的且需要显示出来tiles渲染出来）
     - GPU进程
       - 接收渲染进程传递过来的 paint operations 进行Raster光栅化，生成textures纹理信息，这些信息可以返回给渲染进程继续处理；
         所以Rastering是一个异步的过程；
       - 还可以接受渲染进程传递过来的 CompositorFrame 信息来渲染图片到页面；
         具体渲染的过程是：调用系统的graphics library库去驱动GPU去生成位图，进而显示到屏幕上；
       - 关于GPU加速的解释：Raster生成的各个层的位图都存储在GPU内存中，GPU也可以运行命令来生成图片，
         GPU只要从内存中拿出各个层的图片进行位置移动或缩放就可以直接渲染了；
   - Repaint重绘（发生重绘的时候不一定要从头再开始构建，一些情况可以直接从 Layout和Paint 之间开始；
     注意：In the future, layers will be created after paint.）
     - compositing assignments（重新分配组装之前创建的一些layer，这些layer有自己的display item list 以及对应的绘制命令）
     - prepaint（给重新分配的layer设置一些属性）
   - 渲染器进程不会直接调用GPU来进行相应的操作，而是通过调用另一个叫做GPU的进程，让它来调用GPU进行相应操作；
     - 这样做的好处是：图形驱动是不稳定的，如果GPU在调用系统中的图形驱动的时候失败挂掉了，那么浏览器会自动去重新启动GPU进程；
     - 渲染器进程和GPU进程是分开的两个独立的进程；
   - 有哪些方式可以让一个元素变为layer？
     - 3D 相关的 css 样式
     - will-change 设置为 opacity，transform，top，left，bottom，right
       - 说明：元素提升为合成层后，改变 transform 和 opacity 才不会触发 paint，如果不是合成层，则其依然会触发 paint
     - fixed（在高的 DPI 上会默认提升，在低 DPI 上不会）
     - Hardware-accelerated video element
     - Hardware-accelerated 2D canvas
     - 3D WebGL
     - Overlay（比如 A 覆盖在 B 上，而 B 是提升的 composite layer，则 A 也会提升到新的 composite layer）
*/

/*
- 难点说明：
  - 栅格化 (Rasterisation)是什么？
    - 栅格化，又称光栅化，是将向量图形格式表示的图像转换成位图以用于显示器或者打印机输出的过程。
*/