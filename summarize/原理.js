
/* 各种问题收集：
  什么是AST抽象语法树？
  什么是语法分析器？
  每种类型的文件，也就是每一种语言都有对应的词法分析器来把它们翻译成相应的AST吗？
    * 比如 js 类型的语言有对应的语法解析器：Acorn，来把js内容转换成JS类型的AST  ？
  每一种AST都有对应的解析器来生成对应的代码吗？
  Babel 在AST的应用是怎样的？
  webpack 在AST的应用是怎样的？
  CSS类型文件对应的AST解析树是什么？
  webpack的loader（比如：css-loader）是会直接把源代码转换成js类型的AST吗？还是怎样的？

  各种参考：
  https://juejin.cn/post/6844904035271573511
  https://www.cnblogs.com/goloving/p/14078228.html
*/


/*
  【 正确理解抽象语法树：AST 】
   * 顾名思义，它是针对语法的一种抽象，是为编程语言服务的，
   * AST抽象语法树并不是针对JS语言专门设计的概念，
   * 每一种语言都有它对应的AST抽象语法树，
   * JS有专门针对JS语法的解析器，可以把JS编译对应的AST，
   * PHP有专门针对PHP语法的解析器，可以把PHP编译对应的AST，
   * HTML有专门针对HTML语法的解析器，可以把HTML编译对应的AST，
   * AST是可以提供给开发人员来进行增删改操作，
   * AST也可以用对应的语法parser解析器来反向编译成JS或PHP等语言，
   * AST主要被用于各种工程编译处理时候的中间代码，方便进行操作
*/


/*
  【 正确理解虚拟dom：vNode 】
   * vNode是专门针对UI元素操作设计的一种解决方案
   * vNode被用于各种UI操作，如：html、android、ios等
   * vNode可以支持跨平台，可以转换成 html、android、ios等对应的UI元素
   * html、android、ios等对应的UI元素也可以被解析转化成vNode来处理
   * vNode 跟 AST 是两种不同的东西：
        * vNode 是解决UI操作问题的
        * AST 是解决语言操作问题的
*/


/*
  【 Babel是如何把ES6转换成ES5的？】
   * 采用的Babel.transform(code, { plugins: [] }) 来转换的，具体流程如下：
     * 先把ES6 code通过对应的js parser来解析成对应的AST
     * 接下来可以在plugins中设置对应的修改插件来对AST做对应的增删改操作（如果不需要就不用设置），生成操作后的新的AST
     * 然后再根据新的AST来用对应的生成器来生成对应的 ES5 code
*/


/*
  【 webpack loader的实现原理 】
   * loader都是将需要转换的文件转换成一个模块化的JS代码。
        * 参考css相关loader处理逻辑：https://segmentfault.com/a/1190000039310736
   * css-loader原理：
        * 转换之前的源代码：
            @import "./reset.css"; 
            .red{
                color:"#f40";
                background:url("./bg.png")
            }
        * 转换之后的JS模块代码：
            var import1 = require("./reset.css");
            var import2 = require("./bg.png");
            module.exports = `.red{
                color:"#f40";
                background:url("${import2}")
            }`;
        * 总结，css-loader干了什么：
            * 将css文件的内容作为字符串导出
            * 将css中的其他依赖作为require导入，以便webpack分析依赖
    * style-loader原理：
        * 创建一个style标签，然后把CSS代码字符串作为内容插入到style标签中：
            // css-loade处理后的代码： 
            module.exports = `.red{
                color:"#f40";
            }`
            // style-loader处理逻辑：
            var style = module.exports;
            var styleElem = document.createElement("style");
            styleElem.innerHTML = style;
            document.head.appendChild(styleElem);
            module.exports = {}
*/


/*
  【 从宏观上分析 webpack 工作原理 】
    * webpack本身仅做依赖分析，解析不了的文件用loader来解析成js模块代码，
    * 然后根据依赖分析后的结果来生成对应的AST抽象语法树，
    * 然后在对AST抽象语法树进行分析，在这期间可以用plugin来进行相应操作，
    * 最后再根据操作后的AST树来生成对应的JS bundle 文件。
*/


/*
  【 webpack模块化打包解决的是什么问题？ 】
    * 模块化解决作用域问题
    * 从入口依赖分析打包解决多个<script>标签引入的顺序控制问题
    * loader方便了对CSS、图片等资源的操作
    * plugin可以让开发者像gulp一样对项目资源做进一步个性化的处理 
*/


/*
  【 从宏观上分析 VUE 模版编译成VNode的流程 】
    * template > HTML AST > parse AST > optimize > generate 生成render函数 > 执行render函数 > VNode
      * optimize: 用来给AST递归添加各种static属性，配合VNode和patch使用，避免不必要的re-render，提高性能。
      * render函数：这里的render函数其实就是 createElement，createElement 用来创建VNode的，【依赖收集】也是在执行render的时候完成的。
              render: function (createElement) {
                  return createElement('h1', this.blogTitle)
              }
              // 生成的render函数的代码示例：【执行它就会进行依赖收集】
              function anonymous() {
                with(this){return _c('div',[_m(0),(message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])])}
              }
    * 参考详细的模版编译流程：
      * https://juejin.cn/post/6844903942178996238
*/


/*
  【 从宏观上分析 React JSX编译成VNode的流程 】
    * 执行组件的 render 函数 > 用相应的解析器解析JSX > 生成 createElement 函数 > 执行 createElement 函数 > VNode
    * render内部逻辑会调用 createElement 用来创建VNode的
        const element = <h1>Hello, world</h1>;
        ReactDOM.render(element, document.getElementById('root')); 
*/


/*
  【 AMD、commonJS、ESModule的实现原理 】
*/


/*
  【 js与native通信有几种方式，什么优缺点 】
*/


/*
PostCss的原理，类似webpack  https://segmentfault.com/a/1190000039310736
*/

/*
  【 各种好文章收集 】
    * 《Vue不看源码懂原理》系列——Vue模板编译
       * https://juejin.cn/post/6844904110391558151
    * 《Vue不看源码懂原理》系列——Vue的diff算法不难懂
       * https://juejin.cn/post/6844904111117336590
*/