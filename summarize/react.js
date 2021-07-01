/*
   待看：
   * hooks源码实现，理解原理：
      * https://code.h5jun.com/woniq/1/edit?js
   * React Fiber是什么？
      * https://zhuanlan.zhihu.com/p/26027085
   * react调度算法解析
      * http://www.babyitellyou.com/details?id=5fd0fa01f8d82b7f22042522 
      * https://www.infoq.cn/article/what-the-new-engine-of-react
      * https://juejin.cn/post/6844903582622285831#comment
   * react技术揭秘
      * https://react.iamkasong.com/ 
*/

/*
  react题目看这个就够了：
  https://github.com/funnycoderstar/blog/issues/129
*/

/*
 【React 发展历程】 以下总结有误，待完成。。。。。。。。。。
   参考：react技术揭秘： https://react.iamkasong.com/
   * React15.x
      * 从获得最新的数据，到将数据在页面中呈现出来，可以分为两个阶段：（两个阶段是一气呵成的，中间不能被打断）
         * 【协调阶段】，这个阶段 React 用新数据生成新的 Virtual DOM ，遍历 Virtual DOM ，然后通过 Diff 算法，快速找出需要更新的元素，放到更新队列中去。
            * 调度策略：Stack reconcile(递归更新，一层一层深度遍历diff)
         * 【渲染阶段】，这个阶段 React 根据所在的渲染环境，遍历更新队列，将对应元素更新。在浏览器中，就是跟新对应的 DOM 元素。除浏览器外，渲染环境还可以是 Native，硬件，VR 等。
      * VNode的表现存储形式：
         * 普通节点
      * 普通VNode( node:{children: [node, node]} 数组存书形式)、diff阶段和元素渲染过程一气呵成
      * 可以实现：协调（diff -> 提交渲染）
   * React16.x
      * 从获得最新的数据，到将数据在页面中呈现出来，可以分为两个阶段：（第一个阶段可以被打断）
         * 【Reconcile 阶段】，此阶段中，依序遍历组件，通过 diff 算法，判断组件是否需要更新，给需要更新的组件加上 tag。遍历完之后，将所有带有 tag 的组件加到一个数组中。【这个阶段的任务可以被打断。】
            * 调度策略：Fiber reconcile(一种轻量的执行线程，可以实现任务分片执行)
         * 【Commit 阶段】，根据在 Reconcile 阶段生成的数组，遍历更新 DOM，这个阶段需要一次性执行完。如果是在其他的渲染环境 – Native，硬件，就会更新对应的元素。 
      * VNode的表现存储形式：
         * Fiber节点
   * React16.8
      * 增加Hooks功能
*/


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
      * 老数据：[{id: '1', txt: '1'}, {id: '1', txt: '1'}]
      * 新数据：[{id: '2', txt: '2'}, {id: '3', txt: '3'}] 或 [{id: '1', txt: '1'}, {id: '2', txt: '2'}]
   * 列表中存在非受空组件input，在使用index索引作为key，在操作修改列表顺序时候，input的内容会发生错乱等等问题
*/


/*
 【 react的组件生命周期以及初始化过程，以下是老版本的，新版本有变化 】
   [参考：https://www.jianshu.com/p/4482a1f48c72]
   * 初始化
      1、constructor
         * getDefaultProps
         * getInitialState
      2、componentWillMount
      3、render
      4、componentDidMount
   * 更新
      5、componentWillReceiveProps
      6、shouldComponentUpdate
      7、componentWillUnmount
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