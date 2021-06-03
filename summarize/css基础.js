
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
  【margin塌陷问题】
   * 现象：
*/


/*
  【负margin问题】
   * margin-left: -50px , 从自身开始整体往左边移动50px，如果到达最左边会超出边界
   * margin-right: -50px , 从后面元素开始整体往左边移动50px，后边会覆盖前边元素
*/


/*
  【BFC - Bock Formatting Context - 块级格式化上下文】
   [参考：]
    * https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
    * https://zhuanlan.zhihu.com/p/25321647
   * 垂直方向上的margin重叠问题
     * 问题原因：属于同一个BFC的两个相邻Box的margin会发生重叠
     * 如何解决：只要让两个子元素中任何一个元素变为BFC元素，就可以解决
        * 原因：BFC内部的元素和外部的元素绝对不会互相影响
   * 清除浮动，情况1:
     * 问题原因：浮动元素会脱离文档流，所以会导致父容器高度塌陷
     * 如何解决：只要让父容器变为BFC元素，就可以解决
        * 原因：BFC内部的元素和外部的元素绝对不会互相影响
    * 清除浮动，情况1:
     * BFC 元素内部的float元素也会影响相邻子元素 
        * 如何解决：只要让相邻子元素也变为BFC，就可以解决
            * 浮动元素跟BFC元素不会重合 
    [经典布局案例：]
    .cf:after, .cf:before { content: " "; display: table; }
    .cf:after { clear: both; }
        :before是因为table类型能生成独立的bfc，防止上边距塌陷，
        :after负责清除浮动，防止父级高度塌陷；
*/

/*
  margin: topAndBottom leftAndRight;
  transform: translate(x, y)
  background: 
*/


/* 【实现一个三角形】

*/


/* 【实现一个渐变的背景】

*/


/* 【实现一个带阴影的边框】

*/