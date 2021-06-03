
/*
 【 webpack构建流程 】
  [参考详细流程：https://blog.csdn.net/chern1992/article/details/106841365]
  1、初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。
  2、开始编译: 根据我们的webpack配置注册好对应的插件调用 compile.run 进入编译阶段,
             在编译的第一阶段是 compilation，他会注册好不同类型的module对应的 factory，
             不然后面碰到了就不知道如何处理了。  
  3、编译模块: 进入 make 阶段，会从 entry 开始进行两步操作：第一步是调用 loaders 对模块的原始代码进行编译，
             转换成标准的JS代码, 第二步是调用 acorn 对JS代码进行语法分析，然后收集其中的依赖关系。
             每个模块都会记录自己的依赖关系，从而形成一颗关系树。
  4、输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个
             单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
  5、输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
 */


/*
 【 webpack性能优化 】  
  * webpack性能优化是一个很大的话题，可以在很多个方面进行优化
    * https://zhuanlan.zhihu.com/p/150731200
  * webpack 自带优化
    * tree shaking
    * scope hoisiting （参考：https://zhuanlan.zhihu.com/p/27980441）
  * 需要自己实现的优化 
    * 时间
        * thread-loader 和 happypack 
            * 实现了单独的 worker 池，用于多进程/多线程运行 loaders；
        * hard-source-webpack-plugin 
            * 为模块提供中间缓存步骤。为了查看结果，需要使用此插件运行webpack两次：第一次构建将花费正常的时间。第二次构建将显着加快（大概提升90%的构建速度）。 
        * 使用catch-loader 对所有loader添加缓存；
            * 对于js文件，因为babel-loader自带有catche功能，直接开启即可
            * 对于其它类型文件，直接用catch-loader来缓存
        * Oneof 
        * sourceMap选用 eval-source-map
        * 为模块搜索提供明确的搜索目录
    * 时间和体积
        * 提前构建第三方库
            * 用webpack自带的DLL插件来实现动态链接库，把第三方资源库文件打包单独生成bundle，然后放到cdn上来直接引入，这样不但减小了打包体积，还缩短了编译时间   
                * DLLPlugin 和 DLLReferencePlugin 实现了拆分 bundles，同时节约了反复构建 bundles 的成本，大大提升了构建的速度；
        * IgnorePlugin 忽略一些我们用不到的模块中的代码，比如moment中的locale模块


  * 长缓存 (参考：https://blog.csdn.net/Jenn168/article/details/108694438?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-4&spm=1001.2101.3001.4242)
    * hash
    * chunkHash
    * contentHash
*/


/*
 【 webpack是什么 】  
 */


/*
 【 什么是chunk，什么是bundle，chunk和bundle有什么关系和区别 】  
 */


 /*
 【 loader是什么，plugin是什么 】  
 */


/*
 【 webpack的打包过程 】  
 */


/*
 【 runtime模块里面包括哪些东西 】  
 */


 /*
 【 js模块化的实现原理 】  
 */

/*
 【 如何写一个loader，如何写一个plugin 】  
 */


/*
 【 webpack常用配置项介绍 】  
 */


 /*
 【 常用的loader，plugin 】
  * loader
     * style-loader
     * css-loader
     * less-loader
     * post-css-loader 开启autoPrefixer
     * babel-loader  针对js和jsx
     * url-loader
  * plugin
     * DefinePlugin 
     * HtmlWebpackPlugin
     * UglifyWebpackPlugin
     * commonChunkPlugin
 */


 /*
 【 webpack性能优化 】  
 */


 /*
 【 webpack使用过程中遇到的问题，怎么解决的 】  
 */


  /*
 【 sourceMap 应该用哪种模式 】  
  参考：https://juejin.cn/post/6844903450644316174
  * 生产环境用：cheap-module-source-map
 */
 