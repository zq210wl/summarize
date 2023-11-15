/*
- qiankun是基于single-spa来封装的
  - single-spa的原理
  - 缺点

- 原理
  - 1、监听路由变化
  - 2、配置子应用
  - 3、加载子应用
  - 4、渲染子应用

- 每个被主应用加载的微应用需要的webpack配置：
  - output.library = `${packageName}-[name]`
    - 保证每个子应用最终生成的文件名不一致，这样可以进行文件缓存
    - 只要能保证每个子应用生成的文件名不重复，不这样写也可以
  - output.libraryTarget = 'umd'
    - 为了支持各种规范的加载方式，以便主应用可以通过其中一种方式来获取到子应用的生命周期函数
    - 最终生成的umd中的window[`${packageName}-[name]`]，跟文件名保持一致
  - output.chunkLoadingGlobal = `webpackJsonp_${packageName}` - webpack5
    output.jsonpFunction = `webpackJsonp_${packageName}` - webpack4
    - 全局变量用于 webpack 加载动态chunk模块
    - 动态加载chunk会通过script标签来加载，每个chunk的内容会被jsonpFunction指定的函数名字包裹，
      加载回来就会自动调用此函数来注册此chunk模块，这样此模块就可以被webpack_require方法来调用了
    - 也就是webpack的动态chunk是通过jsonp的形式来加载的
  - 在入口最前面单独引入public-path.js文件，它里面是动态设置 __webpack_public_path__
    - 主项目域名a.com，子项目域名b.com，请求文件 b.com/js/test.js，
      在微前端下会请求到 a.com/js/test.js，会导致资源404错误，
      所以需要动态的把publicPath设置为b.com
    - 用子应用的entry值来作用其值
  - 子应用服务器要开启允许主域名跨域访问

- 子应用的公共代码复用
  - 子应用的url文件都会被缓存起来，如果多个应用存在文件名相同的情况，会进行复用
  - 单个子应用的相同的文件也只会请求一次，下一次可以直接复用

- 子应用保持keep-alive的tab页效果

- 样式用添加前缀的方式避免，还有tailwind

- shadowDom存在的问题
  - 子应用的样式全在shadowDom中，但是子应用往主应用中渲染了一个全局遮照层的Dom，这个dom的样式就应用不上
  - 无法使用 @font-face 加载字体
  - 主应用无法获取子应用内的元素

- 调用微应用的接口的登录信息怎么同步，单点登录？
  - window.fetch(url, {
      ...args,
      mode: 'cors',
      credentials: 'include',
    });

- script中的js是通过eval()执行的

- qiankun的js沙箱机制
  - 只支持单个子应用方案
    - 快照沙箱（SnapshotSandBox）：需要直接记录、修改、恢复window对象的属性 -> 用来兼容不支持Proxy的浏览器
    - LegacySandBox：用Proxy实现，但是还是需要记录、修改、恢复window对象的属性 -> 将会被淘汰
  - 支持多个子应用的方案
    - 代理沙箱（ProxySandBox）：获取属性的时候可以从window上直接获取，修改属性的时候只能修改代理的window对象，
                              防止了各个实例互相污染全局对象
      - const fakeWindow = Object.create(null);
        this.proxyWindow = new Proxy(fakeWindow, {
            set: (target, prop, value, receiver) => {
               if (this.isRunning) {
                    target[prop] = value;
               }
            },
            get: (target, prop, receiver) => {
               return prop in target ? target[prop] : window[prop];
            }
        });
*/

/*
- js沙箱用途
  - 限制第三方对某个对象的属性访问
  - 为了安全，限制直接访问某些对象
*/