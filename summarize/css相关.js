
/*
 【浮动相关知识】
  * 什么是浮动元素？
    * 设置了float的元素就会变成浮动元素
    * 它是一种特殊的inline-block元素
    * MDN参考：https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats
  * 浮动元素会对其它元素造成什么影响？
    * 对父容器的影响：
      * 会导致其脱离了父容器的包裹，也就是浮动元素无法把父元素的高度撑开，进而导致父容器高度塌陷
    * 对后面兄弟节点的影响
      * 后面【块级元素】会被浮动元素遮盖住，但是块级元素中的行内元素不会被遮盖住，而是会围绕在浮动元素周围
      * 后面【行内元素】会围绕在浮动元素周围
    * 对前面兄弟节点的影响【不会对前面元素造成任何影响】
      * 前面如果是【块级元素】，那么浮动元素就会在另一起一行排列
      * 前面如果是【行内元素】，那么浮动元素就会紧跟着它排列在一行，除非宽度不够，它就会另一起一行排列
  * 如何解决上面浮动元素带来的影响？
    * 这就需要用到clear属性来清除浮动了
    * clear属性是设置在被影响的元素上的
      * clear: left; clear: right; clear: both; 
  * 那么什么是清除浮动？
    * 清除浮动就是清除【设置了clear属性的元素】的【前面的浮动元素】对它自己造成的影响，让它按照它本来应该表现出来的布局来排列
      * 【块级元素】应该【独站一行排列】，所以块级元素就可以解决【父容器高度塌】陷问题 
      * 【行内元素】【不能清除浮动】，所以行内元素还是会围绕着浮动元素排列
        * 具体怎么围绕，要根据浮动元素和行内元素的前后顺序具体情况具体分析
*/


/*
 【BFC相关知识】
  * 翻译：块格式化上下文，它是指一个环境，在这个环境里面的元素遵循一定的规律。
  * 为什么要有这个概念？也就是要解决什么问题？
    * 没设置BFC的块级元素，无法包裹内部浮动元素，导致高度塌陷（BFC可以清除内部元素浮动造成的问题）
    * 没设置BFC的两个块级元素，存在margin重合，也就是margin塌陷问题 （BFC解决margin塌陷问题）
  * 那么如何把一个元素设置为BFC ？
    * 查看：https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
    * 常用：
      * overflow: auto/hidden
      * dispaly: inline-block/table
      * position: absolute/fixed
*/

/*
 【为什么有些框架要在元素的before和after上面设置display:table来清楚浮动，而不用block？】
   [代码如下：]
    .parent::before, .parent::after {
      content: ' ',
      display: table;
    }
    .parent::after {
      clear: both;
    }
   [解释：]
     * display:table 不只是用来清除浮动的，
     * 还用来防止父容器中第一个元素或者最后一个元素在设置了margin以后，导致的margin塌陷问题。
*/

/*
 【移动端适配相关知识】
  * 物理像素、逻辑像素、物理像素/逻辑像素PPR
    * 物理像素是指设备屏幕的物理像素，一个物理像素点是由四个点构成的
  * document.documentElement.clientWidth（文档默认宽度、布局视口）
     * 很多手机的文档默认宽度是980px，这样的宽度会导致部门文档内容超出屏幕，需要滚动来显示
  * device-width（逻辑像素宽度、视觉视口宽度、设备宽度、屏幕宽度window.screen.width） 
    * 不同手机的device-width不一样，比如有：iphone5:320px，iphoneX:375px，ipad:768px
  * <meta name="viewport" content="width=device-width"></meta>
    * 就是设置 document.documentElement.clientWidth = device-width
  * 移动端适配方案: 整体等比缩放，有下面三种方式：
    * 整体viewport等比缩放、就按照真实的设计稿宽度来开发、<meta name="viewport" content="width=device-width, initial-scale=[device-width/开发时的设计稿参照宽度]"></meta>
    * rem、<html style="font-size: 100px;">、device-width/开发时的设计稿参照宽度
    * vw
  * 响应式高清图片适配
    * 我通常所说的是【图片尺寸】指的是 【物理像素】 
    * 我通常所说的是【图片分辨率】指的是 【单位长度的物理像素】
    * DPR 即window.devicePixelRatio，这个值在出场的时候就固定了，不能修改（这个值跟屏幕分辨路有关，如果非要修改，可以调整屏幕分辨率）
      * DPR = 2，说明1个逻辑像素 == 2个物理像素 
    * 假如屏幕上需要显示一个<img style="width:30px"/>的图片：
      * DPR=1的屏幕需要一个宽度至少为：1 * 30 物理像素的图片 
      * DPR=2的屏幕需要一个宽度至少为：2 * 30 物理像素的图片
      * DPR=3的屏幕需要一个宽度至少为：3 * 30 物理像素的图片
    * 实现方法：
      * 媒体查询
      * <img src='aa.jpg' srcset="aa1.jpg 1x, aa2.jpg 2x, aa3.png 3x" /> 
      * <img src='aa.jpg' srcset="aa1.jpg 370w, aa2.jpg 800w, aa3.png 960w" /> 
*/


/*
  【行内元素之间的空白间隙问题】
   * 现象：html 元素在书写的时候会进行换行来写，这样在两个元素之间就会有一个英文字符的空白，如下：
        <div id="container">
            <span id="span1"></span>
            <span id="span2"></span>
        </div>
    * 为什么会这样？
        * 因为只要换行就会产生空白，所有的空白会被合并为一个英文单词长度的空白字符
    * 解决方案：
        * 元素在书写的时候不要换行（不友好）
        * 在父容器上设置属性：font-size:0, 这样就可以设置空白字符的长度为0了，也就不会占据空间了（建议使用）
   * inline-block 和 inline 都属于行内元素，都会产生上看的空白间隙问题
*/


/*
  【负margin】
   * margin-left: -50px , 从自身开始整体往左边移动50px，如果到达最左边会超出边界
   * margin-right: -50px , 从后面元素开始整体往左边移动50px，后边会覆盖前边元素
*/


/*
 【0.5px边框实现方案】
  * 方法一（只适用于给四个边框都设置值的场景）:
      .box {
          width: 100px;
          height: 50px;
          box-shadow: 0px 0px 0px 0.5px #000;
      }
  * 方法二（比较通用）:

      // 四个边框都设置值
      .box {
          position: relative;
          width: 100px;
          height: 50px;
      }
      .box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          border: 1px solid #000;
          width: 200%;
          height: 200%;
          transform: scale(0.5);
      }

      // 只设置一条线
      .box {
          position: relative;
          width: 100px;
          height: 1px;
      }
      .box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background: #000;
          width: 200%;
          height: 100%;
          transform: scale(0.5);
      }
*/


/*
 【opacity:0.1, visibility:hidden, display:none 的区别】
  * opacity:0.1
    * 会渲染到页面，可以交互，【自己单独一个层】，值变化后只会进行composite，不会layouat和paint
  * visibility:hidden
    * 不会渲染到页面，【不可以交互】，但是会参与layout 
  * display:none
    * 不会渲染到页面，不可以交互
*/



/*
 【各种基础】
  * box-sizing: border-box
  * box-shadow: X轴偏移量 Y轴偏移量 [阴影模糊半径] [阴影扩展] [阴影颜色]
*/

/*
 【flex布局】
  目标：属性所有属性及其用法
*/


/*
 【Grid布局】
  目标：原理，如何实现
*/


/*
 【动画相关的所有属性】
  目标：熟悉怎么用
*/


/*
 【各种元素居中的实现方式】
  目标：考虑各种情况
*/

/*
  margin: topAndBottom leftAndRight;
  transform: translate(x, y)
*/


/* 【实现一个三角形】
      .triangle {
        width: 0;
        height: 0;
        border-top: 10px solid #000; // 决定高度
        border-left: 8px solid transparent; // 决定宽度
        border-right: 8px solid transparent; // 决定宽度
      }
*/


/* 【实现一个渐变的背景】

*/


/* 【实现一个带阴影的边框】

*/


/*
   【H5自适应方案】
    https://segmentfault.com/a/1190000023583974
    https://www.imweb.io/topic/5a523cc0a192c3b460fce3a5
    http://caibaojian.com/simple-flexible.html
    https://imweb.io/topic/5745adf5a94f742c1db63485

    方案一：【rem适配】
      原理：
        * 设置视口宽度为设备宽度：<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0 />
        * 开发时候的基准屏幕宽度用：375px
        * 设计图的宽度一般都用：750px
        * 根字体大小自己指定一个宽度：10px
        * 不同宽度屏幕的适配：htmlFontSize = (document.documentElement.width / 375) * 10 + 'px'

      开发流程：
        * 拿到设计图
        * 设计图上显示一个元素的宽度为50px
        * 把这个元素的用rem单位来写出来
        * 先把2倍宽度转化为1倍宽度：50 / 2 = 25px
        * 再把1倍宽度转化为rem单位：25 / 10 = 2.5rem

      用less工程化解决方案：
        // 定义相关变量和方法
        @design-radio: 2
        @root-fontsize: 10
        .rem(width, @value) {
          width: @value/@design-radio/@root-fontsize;
        }
        // 给div设置宽度
        div {
          .rem(width, 50rem)
        }

      window.devicePixelRatio 设备独立像素的应用：
        * 可以根据不同的dpr来加载不同倍数大小的图片
        * 具体方案：通过js动态修改html的class来加载对应class下的图片
          

      
      答疑：
        * 为什么要用375px的屏幕作为基准值？为什么不用其它宽度？
            1、完全可以用其它任何宽度作为基准值，最后通过修改【htmlFontSize】以后都是可以完全适配的；
            2、选择375px是因为主流手机屏幕的宽度一般都是375px左右；
        * 为什么要用2倍设计图，也就是750px的设计图？为什么不用1倍或3倍设计图？
            1、完全可以用1倍、3倍、其它倍数的设计图
            2、选择2倍图只是因为给2倍的设计稿显示会更为清晰，超过2倍的清晰度，人类在手机视觉上也看不出区别，给3倍就已经超过人类视觉的极限了
            3、选1倍图的话在高清屏幕（1px = 多个物理像素）上就显示的不清除了
        * 设备独立像素在此方案中能
*/