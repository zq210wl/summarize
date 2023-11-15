/*
- 深度好文
  - 彻底搞懂React的调度机制原理（Scheduler调度器的实现原理）
    - https://segmentfault.com/a/1190000039101758
  - React commit阶段详解
    - https://segmentfault.com/a/1190000039097269
  - React源码解析之优先级Lane模型
    - https://juejin.cn/post/7008802041602506765
*/

/*
- todo
  - React的秘密
    - https://segmentfault.com/blog/react-secret
    - https://github.com/neroneroffy/react-source-code-debug
*/

/*
- React15
  - Reconciler（协调器）—— 负责找出变化的组件
  - Renderer（渲染器）—— 负责将变化的组件渲染到页面上
- React16
  - Scheduler（调度器）—— 根据任务优先级来进行任务的调度，以及用时间分片来完成任务的暂停和开启
  - Reconciler（协调器）—— 负责找出变化的组件，这个时候会执行render方法来绘制fiber节点
  - Renderer（渲染器）—— 负责将变化的组件渲染到页面上，也就是所谓的commit阶段，
                       各个生命周期的回调函数也是在commit阶段被触发的

- React中有三套优先级机制：
  - Lane优先级
    - 31种
  - React事件优先级
    - // 离散事件优先级，例如：点击事件，input输入等触发的更新任务，优先级最高
      export const DiscreteEventPriority: EventPriority = SyncLane;
    - // 连续事件优先级，例如：滚动事件，拖动事件等，连续触发的事件
      export const ContinuousEventPriority: EventPriority = InputContinuousLane;
    - // 默认事件优先级，例如：setTimeout触发的更新任务
      export const DefaultEventPriority: EventPriority = DefaultLane;
    - // 闲置事件优先级，优先级最低
      export const IdleEventPriority: EventPriority = IdleLane;
  - Scheduler优先级
    - export const NoPriority = 0; //没有优先级
    - export const ImmediatePriority = 1; // 立即执行任务的优先级，级别最高
    - export const UserBlockingPriority = 2; // 用户阻塞的优先级
    - export const NormalPriority = 3; // 正常优先级
    - export const LowPriority = 4; // 较低的优先级
    - export const IdlePriority = 5; // 优先级最低，闲表示任务可以闲置

- React优先级转换：
  - React事件优先级 -> Lane优先级 -> Scheduler优先级

- Scheduler的时间分片
  - 在render阶段，每次遍历前，都会通过Scheduler提供的shouldYield方法判断是否需要中断遍历
    function workLoopConcurrent() {
        // Perform work until Scheduler asks us to yield
        while (workInProgress !== null && !shouldYield()) {
            performUnitOfWork(workInProgress);
        }
    }
  - 在Schdeduler中，为任务分配的初始剩余时间为5ms

- Scheduler的timerQueue和taskQueue为什么都使用小顶堆来实现？
  - 可以最快的取出队列中时间最早的那个元素，时间复杂度O(1)
  - 取出元素之后可以很快的进行剩余元素的排序，时间复杂度为O(nlogn)
  - 插入任务的时候可以很快的根据任务的时间把它插入到对应的位置，时间复杂度为O(nlogn)

- Fiber的这种链表结构，是一种可以中断并在此开启的【递归调用】的数据结构

- 变化后的DOM最终是怎么被渲染到页面上的？
  - React15: 
    - Reconciler 和 Renderer 是【交替】工作的，当第一个li在页面上已经变化后，第二个li再进入Reconciler
  - React16及以后:
    - Reconciler 和 Renderer 不再是交替工作。当Scheduler将任务交给Reconciler后，
      Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记

- Scheduler 内部的调度者和执行者直接是通过 MessageChannel 来相互调用的，也就是发起了一个宏事件任务
  - 可以调度两种任务：同步(scheduleSyncCallback)和异步(lanePriorityToSchedulerPriority)

- React是如何做到针对click事件和setTimeout事件引起的state变化都可以进行状态合并的？
  - React是如何做到state合并更新的？

- 为什么要用 MessageChannel 来实现时间片任务调度？
  - 用 MessageChannel 是为了产生一个宏任务
    - 为什么不用 setTimeout(fn, 0)?
      - 递归的 setTimeout() 调用会使调用间隔变为 4ms，导致浪费了 4ms
    - 为什么不用 rAF() 呢？
      - 页面更新的时间不确定，如果浏览器间隔了 10ms 才更新页面，那么这 10ms 就浪费了
    - 为什么不使用微任务呢？
      - 微任务将在页面渲染前全部执行完，所以达不到「将主线程还给浏览器」的目的。

- React的每次遍历最小执行单元是一个fiber节点，那么fiber节点、ReactElement、浏览器element 分别是什么？

- React合成事件(SyntheticEvent - React自己实现的一个事件对象)
  - React自己实现一套事件机制: 顶层注册，事件收集，统一触发
  - 这样做的好处：
    - 对事件进行归优先级类，干预事件的分发以优化用户的交互体验
    - 提供合成事件对象，抹平浏览器的兼容性差异
    - 用事件委托把事件触发都代理到root元素减少内存开销

- 区分React的并发模式(concurrent)和自动批处理(Automatic Batching)，这两个是不同的两个概念
  - ReactDom.createRoot()可以开启并发模式
  - 只有在开启并发模式的情况下，所有情况下的state更新才会被合并执行
  - 在没有开启并发模式的时候，只有react控制下的事件才会进行state合并

- ReactDOM.flushSync() 调用此方法的意思：
  - 到此方法为止开始进行render，只把到此为止的所有state进行合并执行，
    之后state变化会开启另一次render
  - 如果想要没执行一个state就render一次，那么就需要把每个state的变化都用flushSync单独包裹执行

- React的state的更新，自动批处理(Automatic Batching)
  - 批处理：对state进行合并处理
  - React的状态更新分为同步和异步更新，但是它们都会对当前代码之前的state进行合并
    - 同步任务会执行 performSyncWorkOnRoot、Scheduler的scheduleSyncCallback
    - 异步任务会执行 performConcurrentWorkOnRoot、Scheduler的lanePriorityToSchedulerPriority
  - 异步更新：state会被转成一个Update对象，以链表形式存在放在当前fiber节点的updateQuenen中，最后合并执行
  - 针对基于 ReactDom.createRoot() 创建出来的组件，同步和异步任务都会进行合并，不区分是否为react控制下的更新
  - 只有相同优先级的的state变化才会被合并执行，低优先级的更新会被放在下一次render中执行

- commit的三个阶段
  - Before mutation
    - 触发的生命周期：
      - useEffect (异步调用)
  - Mutation
    - 执行dom的增删改
    - 更新ref，但是还没有执行ref回调来真正的设置
    - 触发的生命周期：
      - useLayoutEffect的销毁回调
  - Layout
    - 到这个阶段dom已经更新完毕了，由于 JS 的同步执行阻塞了主线程，所以此时 JS 已经可以获取到新的DOM，但是浏览器对新的DOM并没有完成渲染
    - 触发的生命周期：
      - componentDidMount (同步调用)
      - componentDidUpdate (同步调用)
      - useLayoutEffect (同步调用)
      - this.setState({ xxx: 1 }, () => {
           console.log("这个方法被调用了");
        }); (同步调用)
      - 真正的执行ref回调来设置ref (同步调用)

- diff算法
  - 在我们做数组相关的算法题时，经常使用双指针从数组头和尾同时遍历以提高效率，但是这里却不行
    - 因为同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历
  - 用到了key:value的map结构来转换旧节点数组
  - 从 abcd 变为 dabc，只需要将d移动到前面，但实际上React保持d不变，将abc分别移动到了d的后面
   - 从这点可以看出，考虑性能，我们要尽量减少将节点从后面移动到前面的操作
  - 具体算法：https://react.iamkasong.com/diff/multi.html#diff%E7%9A%84%E6%80%9D%E8%B7%AF

- React任务优先级
  - 同步任务：生命周期方法、受控的用户输入（比如输入框内输入文字）
  - 高优先级任务：交互事件（比如动画）
  - 低优先级任务：其他（比如数据请求）

- React各种模式最终体现在fiber.mode值的不同，流程都差不多，只是一些细节会不同

- React的hooks也是用链表实现的一个hooks链表，用来记录每个hooks的位置

- React.forwardRef(function(props, ref){  })
  - 子组件用forwardRef来包裹
  - 可以让父组件在给子组件设置了ref属性的时候，可以获取到子组件想要暴露给父组件的dom元素

- Suspense、useDeferredValue、useTransition  - TODO
*/

/*
- useEffect 和 useLayoutEffect 的区别以及触发时机？
  - useEffect 因为是在commit阶段执行完成以后异步执行的，所以是在页面repaint以后异步执行的
  - useLayoutEffect 因为是在commit阶段同步执行的，所以是在页面repaint之前同步执行的，它会block页面的repainting
    - 好处是：可以避免二次渲染问题
    - componentDidMount 中的代码也是会被同步执行，比如执行setState()
*/

/*
- 高阶函数
  - 定义：函数的参数是函数，或者函数的返回值是函数
- 高阶组件 HOC
  - 定义：参数为组件，返回值为新组件的函数，此函数作为一种可以被复用的功能函数
  - 形式：const EnhancedComponent = withXxx(WrappedComponent);
*/
