
/*
 【 diff算法 】
  参考：https://blog.csdn.net/lunahaijiao/article/details/86741739?utm_medium=distribute.wap_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.wap_baidujs&depth_1-utm_source=distribute.wap_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-2.wap_baidujs  
  * 从新集合中从左边取第一个元素 new1
  * 在旧集合中从左边开始找跟 new1 相同的元素 old1
  * 如果找到old1，则old1不移动，
      * 如果后面找到的元素只要位置在old1左边区域就往old1右边插入，
      * 如果找到的元素本身就在old1右边区域，则不移动
      * 如果没找到相同元素，则创建一个新元素，插入到old1的右边
      * 这样就找到了old2
   * 重复上面步骤，完成所有diff
   * diff完成之后的剩余工作：
      * 最后如果新队列中还有剩余的就把剩余的插入到旧的后面
      * 最后如果老队列中没有跟新队列中对应到的相同元素就直接删除掉
*/


/*
 【 react开发过程中遇到的一些key的的问题 】
   * 如果列表中item出现重复的key的，那么在下次更新列表的时候，只有一个item会被重用或者只有一个item会被重建，另一个item会被保留下来，导致数据错乱
   * 列表中存在非受空组件input，在使用index索引作为key，在操作修改列表顺序时候，input的内容会发生错乱等等问题
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