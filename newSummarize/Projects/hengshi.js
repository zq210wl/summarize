/*

最大的贡献：支持了微应用的潜入方式，解决了之前iframe潜入带来的各种问题
 - 好像是用京东的框架做的，它是基于iframe来做的
 - iframe潜入的问题有哪些？
 - 微前端，qiankun，场景是跟路由无关的多实例场景
 - 引入tailwind来开发样式，如何集成和编译？

引入微软的playwright测试框架，帮助提高测试效率，降低测试成本，加快产品发版进度
 - 范围：
   - 主流程case覆盖
   - custom issue覆盖
 - 重要功能：
   - 通过录制来快速生成测试代码
   - 截图对比

Monorepo目录结构重构
 - yarn、。。

项目使用的技术
 - TS

React17 升级到 React18？
 - 遇到了哪些问题：
   - ReactDOM.createRoot(rootElement).render() 替代 ReactDOM.render()
   - 自动批处理的问题，之前的异步任务的state会出现错误，要改为用flushSync来取消自动合并
   - 升级React-redux 连接库到8.0
   - 升级antDesign

引入storybook来写组件库
 - 业务组件 和 基础组件

引入TS
 - 在项目中局部加入TS文件，需要做哪些处理？
 - 是否需要自动生成ds文件？？
*/