# 如何获取新技术？
1、github 
    1）fork一些流行热门前端框架，经常去打开github去这些项目的issues里面看看都再讨论什么问题
    2）trending   https://github.com/trending/javascript?since=monthly
2、MDN 
    1）经常去打开看看有更新哪些技术
3、stackoverflow 在线技术问答平台: https://insights.stackoverflow.com/survey
    1）经常去打开看看
4、bestofjs: https://bestofjs.org/
5、SegmentFault 
4、微信订阅一些前端的技术公众号
5、同事之间的技术分享
6、邮件订阅周刊：
    HTML5 Weekly: A Free, Weekly Email Newsletter
    JavaScript Weekly: A Free, Weekly Email Newsletter
    CSS Weekly

# 看过的书籍
1、JavsScript高级程序设计
2、你不知道的JavaScript
3、JavaScript权威指南

# 项目
1、从0到1调研搭建公交查询H5app：
     1）平台对接，跟整个H5平台去做调研来对接如何接入一个新项目：
           （1）业务线项目的接入
           （2）埋点系统的接入
           （3）页面的拆分：首页(zepto.js、vue重构)、换乘查询页面、实时线路查询页面（为了方便后续业务拆分）
     2）技术选型：react、webpack  （之前avalon不维护了、angular太重了，Fis2没有专门的人来维护，都是临时性的业务部门的人来维护的）
     3）页面加载优化：首页和落地页（懒加载、接口数据异步加载）
            [问题0: 接口重试]
                       Promise包装请求接口，里面做接口重试
            [问题1: 前端数据用localstorage来缓存]
                       首页推荐数据加载失败或者加载超时了，所以存在本地，加载完在替换
            [问题2: 线路列表页面和详情页面静态数据和动态数据异步渲染]
                       eta数据计算太慢了
     4）设计了我们hybrid页面的版本控制方式，使用的远程加载h5，给native端来维护一套key：value的配置文件，我们在项目里面对每个页面都进行版本命名（有对应的native版本app，有一些页面需要h5开发）
     3）从开发和运营效率层面对项目对应的一些H5运营活动项目进行了抽象：
           （1）把我们经常要用的红包和发卷项目的H5进行抽象，做成了可配置话的，基于配置来生成对应的H5页面
           （2）开发了专门针对H5的脚手架工具，集成了一些常用的业务组件、公用util库和和常用的第三库，支持一键部署到测试环境和线上CDN环境
2、现有MIS的亮点：
     1）对现有系统进行了一些规范化的重构，之前缺少一些规范：
           （1）之前没有清晰的目录结构规范，组件命名也没有规范。规范组件的命名规范、组件的目录结构、可重用的公有组件和非公有组件的目录结构，之前一些不可重复的component也放在了共有组件中
           （2）一些业务组件的抽离：<CitySelect>   <CompanySelect>  <LineSelect>，更加方便快速的使用
           （3）组件模块没有做样式隔离，加入了样式模块化，scope
     2）前端权限系统的重构：
           （1）之前根本都没有接入权限系统，我接手以后因为要对外开放，所以需要加入权限控制
           （2）主要做了两方面的权限控制：
                        一是：菜单权限控制，基于接口的数据来动态创建路由菜单
                        二是：把一些业务组件做成了可配置的权限控制，加入一些权限属性来只返回权限内的数据
     3）主导开发了动态公交大屏系统：业务数据做成的地图可视化，车辆轨迹回放、车辆轨迹实时播放
     4）常规页面模块可配置话，如果发现已经有对应的目录了就不重新生成了，如果生成之后又在此基础上就行加工的就生成以后在配置文件中设置为false，不需要生成的就设置成false 
     4）近期正在调研用微应用来做版本渐进式升级
3、大屏系统技术难点
    * 面临的问题：
        * server端没有人支持，只有一个实习生
        * 数据量大，区域轨迹、站点坐标、车辆轨迹、汇总数据看板
        * 计算量大，轨迹漂移剔除计算、数据结构重组、轨迹动画计算
        * 一次渲染的元素多，
        * 页面车辆一直是保持动画的
        * 支持倍速播放
    * 采用的技术实现方案：
        * 先初始化地图、页面其他控件
        * 同时用webWorker开启一个线程来分分批加载数据、计算、数据处理、稀疏处理
        * 先把区域轨迹、站点轨迹这写静态数据先分批请求过来，然后用requestAnimationFrame异步分批渲染
        * 同时再开启一个webWorker来动态请求每个区域的车辆轨迹，然后进行轨迹漂移剔除计算、数据结构重组
        * 每请求完一次并且处理完后就postMessage给主线程，然后再有主线程去做轨迹动画计算
        * 因为每3S进行一次轨迹变化对比来计算动画，所以高倍速播放不会受到影响
        * 不再可是区域的区域不展示，不进行数据请求和渲染，进入可是区域再去渲染
        * 数据结构
        var areaMap = {
            'areaId_1': {name, id, guiji:[{lat,lat}]}
            'areaId_2': {name, id, guiji:[{lat,lat}]}
        }
        var areaToBusMap = {
            'areaId_1': [{lat,lat}, {lat,lat}, {lat,lat}]
            'areaId_2': [{lat,lat}, {lat,lat}, {lat,lat}]
        }

        worker.addEventListener("error") 错误监听
        worker.terminate 终止
4、jssdk
     1）司机端-androd-urlschame的形式开发的，iframe来实现的，对外暴露语意话的api
            1）调起打电话
            2）登陆
            3）获取用户登陆信息
            4）唤起其他应用
            5）获取当前应用的版本号等
            6) 获取定位
5、plugin 
    compiler.hooks.beforeCompile.tapAsync('myPlugin', (params, callback) => {
      // 读取配置和模版创建生成对应的页面
      // 添加路由组件
      console.log(params);
      callback();
    });

entry-option	初始化 option	-	同步
run	开始编译	compiler	异步
compile	真正开始的编译，在创建 compilation 对象之前	compilation 参数	同步
compilation	生成好了 compilation 对象，可以操作这个对象啦	compilation	同步
make	从 entry 开始递归分析依赖，准备对每个模块进行 build	compilation	并行
after-compile	编译 build 过程结束	compliation	异步
emit	在将内存中 assets 内容写到磁盘文件夹之前	compilation	异步
after-emit	在将内存中 assets 内容写到磁盘文件夹之后	compilation	异步
done	完成所有的编译过程	stats	同步
failed	编译失败的时候	error	同步

# React和Vue的区别对比？
    - 编译时
        * React没有模版的概念，更接近原生的函数化编程，利用jsx来开发，最后做语法转化就行了。
        * Vue需要用到模版来开发，需要学习它的模版语法和watch、computed的概念。这样可以在编译层面做一些优化，如静态数据分析。
    - 运行时
        * 数据响应式驱动的方式不同
            - Vue基于数据劫持的方案来实现的，this.xx = xx
            - React是基于Immutabled不可变数据来实现的，setState
        * UI更新时候的diff策略不同
            - React 直接从头到尾重新执行一次render来生成新的vnode，跟之前新的vnode来对比更新
            - Vue 只针对组件内部来重新render生成vnode来对比，组件级别传递props
    - 应用场景
        * React更适合一些大型的复杂的项目，
            - 它的fiber架构可以解决大数据量更新时候的UI卡顿问题
            - 它的基于jsx的函数式编程方式更加灵活，可以应对更加复杂的业务逻辑


# 如何编写一个jsBridge的jssdk？
    `
    // 全局注入jsBridge对象
    ;(function(){
        var callbackId = 0;
        var callbackMap = {};
        
        // native回调webview中的通用方法
        function nativeCallback(callbackId, params) {
            if (callbackMap[callbackId]) {
                callbackMap[callbackId](params);
            }
        }

        // 调用native的通用方法
        function invokeNative(method, params, callback) {
            callbackId++;
            callbackMap[callbackId] = callback;
            window.jsBridge.callNative({
                ...params,
                method,
                callbackId
            });
        }

        return {
            login: function(params, callback) {
                invokeNative('login', params, callback);
            },
            getUserInfo: function(params, callback) {
                invokeNative('getUserInfo', params, callback);
            }
        }
    })();
    `


function schemeJump (url) {
  let iframe = document.createElement('iframe')
  iframe.src = url
  iframe.style.display = 'none'
  document.documentElement.appendChild(iframe)
  setTimeout(() => {
    document.documentElement.removeChild(iframe)
  }, 0)
}

export function bridgeCall (type, module, method, args) {
  let url = `fusion://${type}?`
  if (module) {
    url += `module=${module}&`
  }
  url += `method=${method}&`
  let param = args.map((arg) => {
    return encodeURIComponent(JSON.stringify(arg))
  })
  url += `arguments=%5B${param}%5D&`
  // add host
  url += `origin=${window.location.hostname}`
  schemeJump(url)
}

# App中的H5如何做版本控制？
    - 在native中写一个配置文件，配置文件中配置每个webview对应的H5链接
      * { xxH5Url: 'https://xxx.com/v0.0.1', xxH5Url: 'https://xxx.com/v0.0.2' }

# 纯前端如何实现不同域名系统的单点登录？
    - 维护一个公用的用于单点登陆的页面url列表：
      * [ 'http://www.xxx.com/token.html', 'http://www.yyy.com/token.html', 'http://www.zzz.com/token.html' ]
    - 在每个系统中都创建一个用于设置cookie的页面，页面中url中获取登陆相关的参数信息来设置到cookie中
    - 每个系统再登陆成功以后都去根据遍历url列表来动态创建iframe，并把登陆信息通过url传递过去
    - 这样每个系统就都可以实现登陆了

# 前端如何实现H5的主题皮肤切换？
    - 纯css支持定义变量，把需要切换的主题样式都通过变量来表示
    - 然后通过动态切花主题class来实现切换主题的目的
    - 代码式例：
      `
        .div {
            width: 10px;
            height: 10px;
            background: var(--bg-color); // 需要动态切换的样式
        }
        .div.red-theme {     // 红色主题
            --bg-color: red;
        }
        .div.blue-theme {    // 蓝色主题
            --bg-color: blue;
        }
      `

# 前端如何现实多语言国际化？
    - 专门维护一个语言包：
      * local的文件夹：存放所有的语言配置文件
      * 工具类的文件夹：提供以下工具类：
        - 设置当前需要使用的语言：i18n.setLocal('China')
        - 根据key来获取对应文案的方法：i18n.getString('mainArea.buttonTxt')

# 首页初始化渲染加载优化？
    - 资源优化
        * JS和CSS文件合并压缩，服务器开启Gzip压缩，大大缩小资源大小
        * 一些小图片可以用icon-font来实现
        * 一些第三方库直接放在CDN上来加载
    - 加载优化
        * 资源存放在CDN上，就近请求资源服务器
        * DNS缓存，降低域名到IP的解析时间
        * 开启http2的支持，平行处理请求
        * 多域名加载静态资源，突破浏览器对单个域名的最大请求链接数量
        * 对静态资源进行缓存，优化非首次加载速度
        * 组件按需加载、路由懒加载
    - 渲染优化
        * CSS样式文件放入head中优先加载，页面UI的显示依赖样式，所以尽可能早的先家在CSS样式
        * JS脚本文件放在body最末尾加载（或者用async或defer标签来延迟加载），脚本会阻塞页面渲染
        * 图片加载优化：懒加载、根据设备独立像素比来选择加载对应分辨率的图片（不要直接家在3倍图）
    - 用户等待焦虑优化
        * UI骨架、加载动画
        * 分区域渲染UI，把耗时请求拆分成多个，进行异步渲染

# less都用到了哪些功能？
    - 变量 字体颜色、边框颜色、背景颜色
    - 运算 px -> rem 转换
    - 嵌套 语法更简洁
    - 混合（Mixins）抽离公共样式

# webpack编译流程，以及依赖关系是如何生成的？




# 如何封装一个VUE组件库？


# 前端如何实现接口错误监控？TODO

# 前端如何实现JS错误监控？TODO
    - 重写onerror事件：
    `
    window.onerror = function (message, url, lineNo, columnNo, error) {
        console.log(message, url, lineNo, columnNo, error);
    }
    `
    - Promise被reject后，没有进行处理的异常：
    `
    window.addEventListener('unhandledrejection', function(event) {
        // 这个事件对象有两个特殊的属性：
        console.log('报错的promise对象：', event.promise); // [object Promise] - 生成该全局 error 的 promise
        console.log('报错的原因：', event.reason); // Error: Whoops! - 未处理的 error 对象
        // 防止默认处理（例如将错误输出到控制台）
        event.preventDefault();
    });
    `


# React的中有哪几种任务？优先级是怎么样的？TODO



# 面试评价：项目比较常规，没有一些特色，比如：
    * 页面监控、UI没加载出来监控上报、长列表优化
    * reactNative、flutter、weex、小程序的线程交互方式以及有哪些优化方式
    * this指向问题，应该只想哪里：eventEmmiter、防抖、class中方式的this指向
    * jsBridge的调用方式
    * mpx小程序框架的编译原理，如果做到跨端



https://blog.csdn.net/weixin_37722222/article/details/101203972

