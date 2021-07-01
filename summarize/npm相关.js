
/*
  【devDependencies 和 dependencies】
   * devDependencies
     * 开发阶段，用来【运行项目】或【调试项目】需要用的一些构建相关的依赖包。
   * dependencies
     * 以require('xxx')的形式引入项目代码中，生产环境需要依赖的代码包。 
*/

/*
  【peerDependencies】
   [参考：https://juejin.cn/post/6844904053936226312]
   * 当一个依赖项 c 被列在某个包 b 的 peerDependency 中时，它就不会被自动安装。
     取而代之的是，包含了 b 包的代码库 a 则必须将对应的依赖项 c 包含为其依赖。
     如果运行 npm install 时找不到该依赖，npm 会作出警告，正如例子中所示：
   * 比如：项目中dependencies设置了react-dom，
          react-dom的peerDependencies设置了react，
          那么我们就需要在dependencies中设置react
   * npm install 不会被自动安装
*/

/*
  【npm install 会在node_modules下安装哪些包？】
   * 当前目录中package.json中的 devDependencies 和 dependencies
   * 依赖包中package.json中的 dependencies
*/

/*
  【package-lock.json】
  
*/

/*
  【npx】
   * 可以运行使用 Node.js 构建并通过 npm 仓库发布的代码。
   * 使用方式：npx commandName xx
              npx webpack xx
*/
