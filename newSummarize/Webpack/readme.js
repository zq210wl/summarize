/*
- 模块化历程
  - commonjs规范
    - nodejs内置的模块化管理规范，特点是：全部文件都是nodejs启动时同步一次加载完
    - modejs的8.5版本以后开始内置支持ES6模块的加载规范了，之前的版本也可以用Babel来编译执行
    - 浏览器端也有一个模块化的库实现了：browserify
    - API使用方式：
      const a = require('moduleA');
      const b = require('moduleB');
      exports.xx = 1;
      exports.yy = 2;
      或者：
      module.exports = {
        xx: 1,
        yy: 2,
      };
  - AMD规范
    - 浏览器端的异步模块化加载规范
    - 模块化库：requirejs
    - API使用方式：
      // 定义无依赖的模块
      define(function(){
        const a = 1;
        return { a };
      })；
      // 定义有依赖的模块
      define([moduleA, moduleB], function(a, b){
        const x = a + 1;
        const y = b + 2;
        return { x, y };
      })；
      // 定义有模块名字的模块
      define('moduleName', [moduleA, moduleB], function(a, b){
        const x = a + 1;
        const y = b + 2;
        return { x, y };
      })；
      // 引用模块
      requirejs(['moduleA', 'moduleB'], function(a, b) {
        console.log(a + b);
      });
  - CMD模块化规范
    - commonjs + requirejs，支持用到的时候再异步加载，也支持同步加载
    - 模块化库：sea.js
    - API使用方式：
      define(function(require, exports, module){
        let abc = 1;
        // 同步引入
        let moduleX = require('./moduleX');
        moduleX();
        // 异步引入
        require.async('./moduleY', function(moduleY){
          abc = moduleY.say();
        });
        module.exports = { x: abc };
      });
  - ES6模块化规范
    - 需要用到Babel来编译，
    - 相关的模块化库：webpack
    - API使用方式：
      import xx from './moduleX';
      export { a: xx };
      export default { b: yy };
    - 浏览器内置加载方式：
      <script type="module" src="https://www.xx.com/a.js"></script>
      <script type="module">
        var xx = 1;
        console.log(xx);
      </script>
  - UMD规范
    - https://juejin.cn/post/6844903927104667662
*/

/*
- ES6 中的 export 和 export default
  - export { x, y };
    - 这是固定用法，导出的值必须放到{}中
  - export default { x, y };
    或
    let a = { x, y };
    export defualt a;
    或
    let x = 1;
    export default x;
    - 这是默认导出一个对象字面量
  - 特别说明：
    - 上面两种方式导出的都是对变量的引用，不是拷贝；
    - 导出的变量是【不能重新赋值】的，但是变量如果是对象的话，可以修改对象已经存在的字段的值； 

- ES6 中引入模块的路径
  - import { name } from 'moduleX.js'; // 引入第三方库，会从 node_modules 目录中去找
  - import { name } from './moduleX.js'; // 相对路径的引用方式
  - import { name } from '/a/b/moduleX.js'; // 绝对路径的引用方式
  - import { name } from 'http://a/b/moduleX.js'; // 加载网络路径的引用方式

- ES6 动态加载模块
  - import('./moduleX.js').then(function(moduleX){ console.log(moduleX); });

- ES6 导出 default 默认成员的两种方法：
  - import xx, { name } from 'moduleX.js';
  - import { name, default as xx } from 'moduleX.js';

- ES6 引用并直接导出：
  - export { name, age, default as xx } from 'moduleX.js'; // 只需要把import直接换成export就行了
*/

/*
- webpack
  - mode模式：production、development、none
  - loader是用来加载不同类型的资源，根据不同的规则来看看以什么样的方式来把它编译成【js代码】加载进来
    - 分类：
      - 编译转换类，如：babel-loader
      - 文件操作类，如：file-loader、url-loader、css-loader
      - 代码检查类，如：eslint-loader
    - 原理：
      - 多个loader其实就是一个管道的概念，A-loader -> B-loader -> C-loader
  - output.publicPath = 'dist/'; // 设置资源导出的目录（也就是网站的根目录）
  - 核心原理
    - 从入口文件开始找到所有的依赖文件，生成一个文件依赖树，
    - 然后再把这些不同的文件给到不同的loader来处理，
    - 最后处理完后把最终的代码放到对应的bundle文件中。
  - 插件机制 Plugin
    - 作用：除了资源加载以外的其它自动化的工作，例如：
      - 自动清除 dist 目录
      - 自动拷贝不需要参与打包静态文件到输出目录
      - 压缩输出代码
      - 自动生成引用好资源文件的html文件
      - 热更新
    - 工作机制：
      - 在webpack编译的过程中会在不同阶段有一些对应的事件钩子hooks，也就是生命周期钩子，
        插件可以在这些这些hooks中挂载对应的处理逻辑，
        等webpack执行到对应的hooks的时候，就会执行注入的处理逻辑
  - HMR 热更新
    - 并不可以开箱即用，需要使用HMR提供的API来手动添加对应的处理代码
    - 针对不同的JS没有通用的处理方案
  - DefinePlugin
    - 往代码中注入全局变量，比如：
      new webpack.DefinePlugin({
        NODE_ENV: '"PRODUCTION"',
      })
  - TreeShaking 只对 ES module 生效，还需要满足以下两个条件才会起作用：
    - webpack配置需要开启treeShaking功能
    - 被用到的库的 package.json 中 sideEffects: false 的代码库会被进行treeShaking处理，
      或者直接指定哪些文件有副作用，不要进行treeShaking，
      如：sideEffects: ['./aa.js', './dd.css']
  - 代码分离 Code Splitting，以下两个方式都会生成多个chunk：
    - 多入口打包
    - 动态导入，import().then()
  - optimization 配置项专门用来配置压缩之类的优化项
  - 文件缓存的设置，需要用到[name]-[hash]的形式
    - chunkHash - 有可能js文件和css文件都来自同一个chunk，这个时候如果只改变css内容，那么生成的js文件名也会变化
    - contentHash - 这是【推荐使用】的，真正的文件内容发生变化才会改变
*/

/*
- 为什么ESM可以进行treeShaking，但是CommonJS不行？
  - CommonJS 在实际运行之前是无法确定哪些模块是需要的哪些是不需要的，比如：
    if(isTrue){
	   module = require("./a");
    } else {
       module = require("./b");
    }
  - ESM 从规范层面规避了这些问题，他要求所有模块的导入导出只能出现在模块的顶层，所以模块之间的依赖关系时高度确定的
*/