
/* 【全局作用域中的var和let、 window对象、 全局上下文对象this】===============================================  
    * 在全局作用域中：
        * this === window
        * var 定义的全局变量【会】被定义到window对象上
            var a = 1；
            window.a === a; // true
            this.a === a; // true
        * let 定义的全局变量【不会】定义到widow对象上
            let b = 1；
            window.b === b; // false
            this.b === b;  // false
    * 在函数作用域中：（即：在全局中执行function）
        * 非严格模式下：this === window
            function f1(){
              return this;
            }
            f1() === window;
        * 严格模式下：this === undefined
            function f2(){
              "use strict"; // 严格模式
              return this;
            }
            f2() === undefined; // true
    * 严格模式 和 let 并没有什么关系，两者不会互相产生影响
*/


// defineproperty与proxy对比，哪个好，为什么？

/* 【typeof 输出类型】===============================================  
*/
typeof {}     // 'object'
typeof []     // 'object'
typeof null   // 'object'
typeof /123/  // 'object'
typeof (()=>{})  // 'function'
typeof 123      // 'number'
typeof 'abc'    // 'string'
typeof undefined    // 'undefined'
typeof true      // 'boolean'
typeof Symbol()  // 'symbol'


/* 【JavaScript 隐式类型转换】===============================================  
*/
  拆箱操作
  https://juejin.cn/post/6844903859765133320
  https://juejin.cn/post/6844903838575493127

  隐式类型转换
  https://chinese.freecodecamp.org/news/javascript-implicit-type-conversion/
  https://juejin.cn/post/6844903934876745735

  instanceof
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof

  原始数据
  https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive

  JavaScript 深入了解基本类型和引用类型的值
  https://segmentfault.com/a/1190000006752076

  对象字面量语法
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals

  对象属性的描述，defineProperty， Value、Writable、Enumerable、Configurable
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

  null
  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null

  typeof 
  到底是用来干嘛的

  instanceof 和 constructor 判断实例类型的区别？？

/* 【array的哪些方法会改变原数组】===============================================  
   注意：以下方法并不会改变原数组
     slice
     concat
*/
unshift
push
shift
pop
splice
sort
reverse

/* 【把一个类数组结构转换成一个真正的数组结构】===============================================  
   典型案例：Array.from(arguments)
*/
Array.from({0:'a', 1: 'b', length: 2})

/* 【二维数组展开变成一维数组】===============================================  
*/
[].concat(...[[5,6]])

/* 【创建一个没有prototype的纯对象】===============================================  
*/
Object.create(null)

/* 【迭代器】===============================================  
*/

/* 【生成器】===============================================  
*/

/* 【二进制的相关运算】===============================================  
    参考：https://segmentfault.com/a/1190000013607145
*/

/* 【JS事件循环、宏任务、微任务、GUI渲染、DOM操作 等等相关知识梳理】===============================================  
    [参考：http://www.liweiliang.com/962.html，讲的很详细。]
    [相关概念：]
      * 宏任务(macroTask)，微任务(microTask)，事件循环(Event Loop)，
        调用栈(Call Stack)，回调事件队列(Callback Queue)、tick(一次事件循环)。
    [tick解释：]
      * 整个js的事件循环系统中存在两个概念：主线程、待执行异步队列(微任务队列、宏任务队列)，
      * 主线程中的任务代表本次事件循环，也就是本次tick，
      * 等本次tick中的任务执行完毕后，会去把异步队列中的任务推入主线程来执行，也就是进入了下一次tick
    [具体执行顺序：]
    * 先执行本次tick的任务，本次tick可能会产生异步任务（微任务、宏任务）
    * 本次tick的任务执行完毕之后，会从异步任务中把微任务队列推入下一次tick，进而执行，
    * 这一次的tick中可能还会产生微任务，它还会继续进入微任务队列优先执行，
    * 直到微任务队列中没有任务了，才会执行宏任务队列中的任务。
    [注意点：]
    * 页面真实的GUI的渲染跟屏幕刷新频率有关，大部分电脑显卡的刷新频率是1秒刷新60次，
      所以页面GUI渲染会间隔（1000/60 = 16.67）毫秒会刷新一次。
    * DOM操作 和 真实的GUI的渲染是异步的，在这16.67毫秒内的所有的DOM操作会被合并在一次GUI渲染中执行。
    * 在一次tick中可能会执行dom操作，这个时候dom操作后的结果已经形成了，后面代码可以获取到dom的正确结果，
      但是还没有执行GUI渲染页面，页面上还看不到。
    * 真实的GUI渲染 和 下一个tick的执行顺序是不确定的。
    * 本次微任务会在一次GUI渲染之前执行，微任务会阻塞GUI渲染。
    [实例参考：]
        <div class="container">
            我不会被马上GUI渲染出来
        </div>
        <script>
            console.log(document.getElementById('item1').innerHTML);
            document.getElementById('item1').innerHTML = '我是改变后的值，我也不会被马上GUI渲染到页面';
            Promise.resolve().then(() => {
                // 页面虽然还没有真正执行GUI渲染，但是我可以拿到正确的结果
                console.log(document.getElementById('item1').innerHTML);
                alert(1);
            });
        </script>
*/

/* 【setTimeout 和 requestAnimationFrame 执行动画、页面渲染时机】===============================================  
    [参考：http://www.liweiliang.com/962.html，讲的很详细。]
    [参考：https://www.bilibili.com/video/BV1K4411D7Jb?p=1&share_medium=android&share_plat=android&share_source=WEIXIN&share_tag=s_i&timestamp=1622098644&unique_k=MeEXpH]
    [解释：]
    * 页面真实的GUI的渲染跟屏幕刷新频率有关，大部分电脑显卡的刷新频率是1秒刷新60次，
      所以页面GUI渲染会间隔（1000/60 = 16.67）毫秒会刷新一次。
    * 在这16.67毫秒内的所有的DOM操作会被合并在一次GUI渲染中执行。
*/

/* 【整个页面的渲染原理和加载顺序】===============================================  
    [参考：https://zhuanlan.zhihu.com/p/94621707?from_voters_page=true]
    [涉及到的知识点：]
    * CSS Tree，DOM Tree，render Tree
    * dom解析、dom渲染（这是两个不同的概念）
    * link （是不会阻塞Dom解析的，因为css是不会改变dom结构的，但是会阻塞dom渲染，因为render Tree需要依赖css）
    * defer 延迟执行（DOMContentLoaded之前执行）（不阻塞继续解析，并行去加载js）
    * async (异步)（加载完后立马执行，但是会在window.load之前执行）
    * document.addEventListener("DOMContentLoaded")事件 （当初始的 HTML 文档被完全加载和解析完成之后被触发，此事件是绑定在document对象上的，并不是window上）
    * window.onload事件
*/


/* 【前端安全相关问题】===============================================  
    * XSS  跨站脚本攻击
    * CSRF 跨站请求伪造，如何预防： 
      * 服务端校验请求头中的Refer信息
      * 开启token令牌验证，token是根据每个用户信息来随机生成并记录在客户端和服务端的，黑客是没法伪造的，服务端可以通过token来解析出对应的用户   
*/


/* 【闭包、作用域、作用域链】===============================================  
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures
    * 闭包就是一个可以访问其它函数内部变量的函数。
    * 作用域：？？？？？？？？？？？？？？
    * 作用域链：？？？？？？？？？？？？？？
*/


/* 【事件冒泡和事件捕获】=============================================== 
   * 冒泡是从内层元素往父级元素传递，这个时候可以用 event.stopPropagation() 来阻止向上冒泡
   * 捕获是从父级元素往内层元素传递
   [相关扩展知识：]
   * event.preventDefault()  阻止默认事件执行
   * event.stopPropagation() 阻止冒泡
*/


/* 【实现点击<img>标签直接下载图片的方法】=============================================== 
    * 方法一：
      * <a href="http://www.aa.com/filename.png" download="renameFilename.png"><img /></a>
      * 此方法只能支持同源下载，跨域则不能下载。
    * 方法二：  ？？？？？？？？？？  参考以下：
      * https://juejin.cn/post/6856574401408679944
      * https://juejin.cn/post/6844903816828026894
      * https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
*/


/* 【浏览器同源策略 以及 跨域相关的一些知识】=============================================== 
    * 所谓同源限制，其实是浏览器不允许通过JS来访问未经允许非同源地址，但浏览器不阻止你向其他域名发出请求：
      * 也就是说跨域请求是可以发送到被访问的服务器的，只要对方返回CORS是允许的，那就还是可以访问的，
      * 如果对方返回的CORS是不允许的，那浏览器就会报跨域请求错误。
      * 浏览器提交表单是不受同源策略限制的，因为表单提交之后，浏览器是不会再去处理请求返回了。
      * 总结：所以同源限制，其实就是限制不能从其它源来【获取到】数据。
    * 协议、域名、端口号三者都完全一样才能叫是同源
    * 源是可以修改的：document.domain = 'aaa.com', 两个同父级域名的两个子域名可以通过把自己的document.domain设置为相同的父级域名来实现跨域
    * 跨域资源嵌入是被允许的：
      * <script> <a> <img> <link> <video> <iframe> 
    * 非同源会有以下限制：
        1.cookie 访问限制
        2.DOM 访问限制
        3.Ajax 请求限制
    * 同源政策的目的：是为了保证【用户信息的安全】，防止恶意的网站窃取数据。
    

   【js有哪些跨域方法】=============================================== 
    1、jsonp <script src="http://a.xx.com/index.js?callback=fun"></script>，只能发送get请求 
    2、cors 服务器端来设置允许跨域，
      * 默认是不带cookie请求的，如果想要请求是带cookie，那么需要：
        * 客户端
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
        * 服务端
          Access-Control-Allow-Credentials: true
      * 跨域请求分为简单和非简单请求：【具体看：https://segmentfault.com/a/1190000037638295】
        * 简单请求：直接发送请求
        * 非简单请求：需要先发送一个option预检请求
    3、nginx反向代理 需要配置一个代理服务器来转发请求
    4、同父域名下的子域的跨域用：<iframe>， 例如：页面A: aa.baidu.com , 页面B：bb.baidu.com
       * 在A页面通过<iframe>嵌入一个B域名下的页面，然后A 和 B 同时设置 document.domain = 'baidu.com',
       * A就可以通过：document.getElementById("myIFrame").contentWindow.XXXX 来访问B页面，比如调用B页面的方法去请求数据，
       * B也可以通过：window.parent.XXX 来访问A页面
    5、window.name 和 iframe 来实现跨域
       * 利用的特性是：如果一个窗口设置了window.name，在这个窗口先打开 aa.baidu.com/xx.html，再跳转到 bb.google.com/yy.html，window.name的值是不变的。
       * 实现方式： 假如有是三个页面：A：aa.baidu.com/main.html, B：aa.baidu.com/emptyForCross.html, C：bb.google.com/xx.html
         * 在A页面用iframe先嵌入C页面，C页面修改 window.name = 'xxxxxx', 然后再跳转到B页面，
         * 然后A就可以通过：document.getElementById("myIFrame").contentWindow.name来获取到值了
    6、window.postMessage()
       * 假如：A：aa.baidu.com/main.html 通过<iframe>潜入 B：bb.google.com/xx.html
       * A 和 B 都通过： window.addEventListener('message', function(event){ // 处理消息 });
       * A通过：document.getElementsByTagName('iframe')[0].contentWindow.postMessage('消息内容', 'bb.google.com')
       * B通过：window.parent.postMessage('消息内容', 'aa.baidu.com')
    7、webSockt
*/


/* 【cookie的有哪些缺点】=============================================== 
    1、有时效性，到期就过期了
    2、cookie 是很容器被用户被清除的
    3、cookie 是可以被浏览器安全设置级别给屏蔽的
    4、cookie 在每次同源请求的时候都会被发送，导致不必要的资源浪费
    5、cookie的长度和数量是有限制的
*/


/* 【突破浏览器【域名】【并发限制】的解决方案】=============================================== 
    * 不同浏览器都不一样，chrome 一个域名并发限制是：6
    * 通过把资源设置在多个域名下来解决并发限制问题（多个域名可以指向同一个ip服务器）
*/


/* 【Promise/A+规范，彻底弄懂Promise原理】=============================================== 
    参考：
      * 中文：https://zhuanlan.zhihu.com/p/143204897
      * 英文：https://promisesaplus.com/

   【示例】：
      new Promise((resolve, reject) => {
        // 这里不会返回一个新的promise
      }).then(
        successResult => { // 成功回调 }, 
        failResult => { // 失败回调 }
      ).then(
        successResult => { // 成功回调 }, 
        failResult => { // 失败回调 }
      ).then(
        null, // 不设置成功回调
        failResult => { // 失败回调 }
      ).then(
        successResult => { // 成功回调 }, 
        null // 不设置失败回调
      ).catch(err => {
        // 失败回调
      })

   【重磅总结：】
      * Promise 和 回调地狱 都是在用【异步编程】的方法去解决有关联的【同步任务】，
      * Promsie 解决的是回调地狱的问题，
      * 每个then都接受两个callback：success 和 fail，
      * Promise的每一个then的callback(success或fail)都会返回一个新的Promise，
      * 如果then的callback没有显示地返回一个promise对象，那么JS程序内部会自动执行【Promise.resolve(当前callback返回值)】来生成一个新的promise，
      * 这个新的Promise的执行结果会决定应该执行下一个then的success还是fail，
      * 如果下一个then根本就没有指定callback(success或fail)，那么就会继续往下追随找到最近一个指定了对应callback的then，然后执行它,
      * 比如：新的Promise执行结果为【fullfilled】，那么就会往下找到最近一个指定了【success】的then，然后执行它的【success】，
      * 比如：新的Promise执行结果为【rejected】，那么就会往下找到最近一个指定了【fail】的then，然后执行它的【fail】，
      * 如果找到最后都没有找到一个指定了【fail】的then，那么就会抛出异常，所以一般会在最后设置一个catch来兜底处理没有捕获的异常。
      * catch其实就是一个没有指定success的then，等同于 then(null, failCallback)，所以catch不只是放在最后来兜底的，它也可以放在then的前面。
       
   【Promise异常】
      * Promise 会自动捕获代码异常，并执行reject(异常信息)
      * 如果没有指定fail来捕获异常，Promsie就会往外抛【unhandledrejection】异常，
      * 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件；
          window.addEventListener('unhandledrejection', function(event) {
            // 这个事件对象有两个特殊的属性：
            console.log('报错的promise对象：', event.promise); // [object Promise] - 生成该全局 error 的 promise
            console.log('报错的原因：', event.reason); // Error: Whoops! - 未处理的 error 对象
            // 防止默认处理（例如将错误输出到控制台）
            event.preventDefault();
          });
      * Promise没法捕获【异步执行】的异常：
          new Promise(function(resolve, reject) {
            setTimeout(() => {
              throw new Error("Whoops!");
            }, 1000);
          }).catch(alert);
*/


/* 【彻底弄懂async await原理】=============================================== 
     // 一般不只是下面这么用，这么用没有什么意义，写出来只是为了更好的理解原理
     async function yy() {  
      return 'yy';
     }
     async function zz() {
       return Promise.resolve('zz');
     }
     async function xx() {
       let promise1 = yy();
       let result1 = await promise;
       console.log(result);

       let promise2 = zz();
       let result2 = await promise2;
       console.log(result2);

       let promise3 = Promise.resolve('zz');
       let result3 = await promise3;
       console.log(result3);
     }

     // 一般是下面这么用的
     let p1 = new Promise((resolve, reject) => {});
     let p2 = new Promise((resolve, reject) => {});
     async function zz() {  
       let result1 = await p1;
       console.log(result1);
       let result2 = await p2;
       console.log(result2);
       // 最后可以return任何值，最后都会被包装成Promise返回，以供后面继续异步操作
     }
    * async await 是 Promise 的一种简化写法，可以解决连续then回调的不优雅的写法问题
    * await 后面跟随的是一个Promise对象
    * async 函数返回的是一个Promise对象，所以可以在 async函数 里面继续 await 一个async函数
    * await 返回的是Promise【Fullfilled】后的结果，
    * await 后面的Promise reject 后，会直接抛出异常，阻断后面js执行，
      * 可以在catch中来捕获处理，这时候await的就是catch返回的结果了，catch返回的也是Promsie对象
      * 一般根据具体情况看要不要这么用，还是不处理异常，直接让程序报错就行了
*/


/* 【JS全局异常捕获】=============================================== 
    * try catch 没法捕获【异步执行】的异常，这个异常会被冒泡到window对象上
        try {
          setTimeout(() => {
            throw new Error("Whoops!");
          }, 1000);
        } catch(err) {
          console.log('this is error', err)
        }
    * 可以通过 window.onerror 来捕获下面两种异常：
      * JS脚本里边存着语法错误
      * JS脚本在运行时发生错误
    * window.onerror 捕获异常的方法：
        window.onerror = function (message, url, lineNo, columnNo, error) {
            console.log(message, url, lineNo, columnNo, error);
        }
    * window.onerror 不能捕获到资源加载失败的异常，比如： <img> <script> ，可以用以下方法：
        document.getElementById('#img').onerror = function(event) {
          console.log('图片加载异常', event);
        }
        document.getElementById('#script').onerror = function(event) {
          console.log('脚本加载异常', event);
        }
    * window.onerror 不能捕获 Promise.reject 异常，可以用专门捕获此异常的事件：
        * window.addEventListener('unhandledrejection', function(event) { console.log(event) })
*/


/* 【异步加载JS的方法】=============================================== 
    * <script src="a.js" defer></script> （阻塞document的DomContentLoaded事件）
    * <script src="a.js" async></script> （阻塞window的onload事件）
    * 动态创建script标签：（等同于ascync，此方法加载的js会阻塞window.onlaod事件，所以可以在window.onload事件里面动态创建script）
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'a.js';
        document.head.appendChild(script);
*/

/*
  每日一题：
  https://github.com/Advanced-Frontend/Daily-Interview-Question
*/