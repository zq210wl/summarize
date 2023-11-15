/*
- react-router、react-router-dom、history 是什么？区别是什么？怎么用？
  - history 是一个用来监听浏览器url变化的库，它会操作地址栏，并且把当前URL解析为location对象返回
    - history有三种形式：
      - browserHistory
      - hashHistory
      - memoryHistory
  - react-router 是用来给组件定义路由的，指定某个url应该显示哪个组件，它提供了<Router>和<Route>两个组件
    - 那么react-router是怎么知道当前url是什么的，进而显示对应的组件的？
      - 这个时候就需要history来辅助来，<Router history={browserHistory} />，Router会从history中得到location信息
    - react-router 会默认下载history库的，并<Router>默认使用browserHistory，如果想要自定义，可以设置history属性
    - V4之前只支持集中式路由，从V4开始支持分散式路由
  - react-router-dom 是基于react-router进行封装的库，扩展了其功能，提供了更多的组件和功能
    - 比如 <Link>、<BrowerHistory>、<HashHistory>
    - 还可以做到分散式路由，把路由的配置都放到各个组件中去，可以实现某个组件的局部路由功能
*/