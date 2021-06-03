
/*
 【 diff算法 】
  参考：
  1、https://blog.csdn.net/lunahaijiao/article/details/86741739?utm_medium=distribute.wap_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.wap_baidujs&depth_1-utm_source=distribute.wap_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.wap_baidujs  
  2、https://www.jianshu.com/p/3ba0822018cf
     * 文章中说的index其实是上一个链接中说的旧节点的_mountIndex，因为index在diff过程可能会改变，但是_mountIndex不会改变。
*/

/*
 【 redux如何使用 ????????】
   1、在redux的设计中，reducer函数必须返回一个新的state对象，不能直接在原state上就行修改，
      不然的话，redux会判断浅比较state有没有变化，如果没有变化的话就不会通知react组件去更新，
      也就是不会改变组件的props属性
   2、store中的数据

   http://live.vhall.com/534958413 从0到1解构react_redux_袁鑫
*/

/*
 【 React 中 setState 什么时候是同步的，什么时候是异步的？】
  
  * 在React中，如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新
    this.state，除此之外的setState调用会同步执行this.state 。所谓“除此之外”，指的是绕过React通过
    addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。
  * 看以下示例，第一次和第二次执行会被合并，第三次执行会先拿到合并后的结果再执行同步操作：
      constructor(props) {
         super(props);
         this.state = {
            val: 0
         };
      }
      componentDidMount() {
         this.setState({val: this.state.val + 1});
         console.log(this.state.val);    // 0
      
         this.setState({val: this.state.val + 1});
         console.log(this.state.val);    // 0
      
         setTimeout(() => {
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 2
      
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 3
         }, 0);
      }
*/


/*
 【 React 和 Vue 的区别 】
  [参考：https://blog.csdn.net/sinat_36521655/article/details/109301741，解释的比较详细]

   * 数据更新 和 dom渲染 方式不同
     * React 不可变数据 + 计算数据diff （ this.setState({a:1}) 返回一个新的state对象 ）
       * 每次state或props发生变化，组件和子组件都会执行render函数进行diff计算
     * Vue 可变数据 + 依赖收集 (this.a = 1)
       * 某个属性改变后，只对依赖的部分进行局部diff计算
   * 编译运行方式 不同
     * React runtime + React.createElement() （JSX也是会转换成React.createElement()来运行）
     * Vue compiler （初始化时需要先编译template）
*/


/*
  <React.Fragment> 相当于Vue中的 <template>
*/