/*
 【 vue数据初始化的先后顺序 】
  参考：https://blog.csdn.net/weixin_39917811/article/details/113452913
       https://www.zhihu.com/question/363911873       
  1、创建vue实例 new Vue()
  2、初始化默认周期函数和默认事件 （Event & Lifecyle）
  3、beforeCreate（此期间不能访问state数据）
  4、初始化数据状态和数据响应式机制绑定（injection & reactivity），具体顺序如下：
     * props
     * methods
     * data
     * computed
     * watch
  5、created（可以访问state数据，不能访问dom）
  6、模版编译（编译得到虚拟dom 以及 注册相关数据绑定，这个时候编译完成的模版是存在内存中的）
  7、beforeMount
  8、将内存中编译好的模版真实替换到页面上
  9、mounted
    * beforeUpdate（在这一步还可以进行state更新，不会触发附加的重渲染过程）
    * 执行 diff算法 来打补丁，完成相应dom的重新渲染
    * updated（避免在此期间更改状态，因为这可能会导致更新无限循环）
    * beforeDestory（只这一步可以执行清理工作，比如setTimeout、丢弃已经还没有response的请求、一些还没有完成的promsie异步操作）
    * destoryed (整个vue实例被销毁，所以的事件绑定监听都被移除，所以的子实例也会被销毁)
*/


/*
 【 diff算法 】
  参考：https://www.cnblogs.com/happymental/p/11882461.html

  [原理流程如下：]（重点知识：diff的过程遵循深度优先、同层比较的策略）
  1、通过 compile 函数来编辑模版，从而得到虚拟dom（注意：比较都是通过新旧虚拟dom来比较的）
  2、通过 patch(oldVNode, newVNode) 来开始diff新老虚拟节点
  3、通过 isSame(oldVNode, newVNode) 来判断是否为相同节点
  4、如果不是相同节点，则直接创建新节点来替换新节点，直接操作真实dom（方式：把新节点插入到旧的节点前面，然后删除旧节点）
  5、如果是相同节点，则通过 patchVNode(oldVNode, newVNode)来更新旧节点，直接操作真实dom（注意：同层比较）
  6、在 patchVNode 方法中会继续递归比较 oldVNode 和 newVNode 的 children 来继续diff，方式：updateChildren(parentElm, oldCh, newCh)
  7、updateChildren(parentElm, oldCh, newCh) 会通过四种比较方式来循环比较新旧子节点是否有相同节点，方式：isSame(oldVNode, newVNode)
  8、如果有相同节点，就继续(步骤5、步骤6、....)
  9、如果没有相同节点，就执行跟(步骤4)相同操作

  [updateChildren方法中寻找相同弄的的四种比较方式：]
  1、oldStartIndex, oldEndIndex
  2、newStartIndex, newEndIndex
  3、比较顺序如下：
     (newStartIndex 跟 oldStartIndex)、
     (newEndIndex 跟 oldEndIndex)、
     (newEndIndex 跟 oldStartIndex)、
     (newStartIndex 跟 oldEndIndex)
  4、只要前面四种方式满足一个就算找到，然后继续执行while的下一次循环
  5、如果四种方式都没有满足，则在老的虚拟节点中去寻找是否有跟newStartIndex位置node相同的
*/


/*
 【 diff算法从O(n^3)到O(n)是怎么算出来的 】
  [参考：https://www.zhihu.com/question/66851503/answer/246766239]

  1、O(n^3)的算法
    * 将两颗树中所有的节点一一对比来寻找差异需要 O(n²) 的复杂度（两个嵌套循环）
    * 找到差异后需要操作dom时，还要计算最小转换方式，也就是从A转变成B的最小编辑距离的计算，需要 O(n) 的复杂度
    * 所以最终结果就为 O(n²) * O(n) = O(n^3)
  2、O(n)的算法
    * vue的diff算法只需要循环便利一遍就可以找到是否有相同节点，找寻找过程中就直接渲染到真实dom上了
    * vue的diff是同层级比较，找到相同节点就直接移动旧节点来，找不到就直接删除重建
    * 整个寻找差异 和 操作dom 都在一次循环中完成的，所以结果就为 O(n)
*/


/*
 【 观察者模式 VS 发布订阅模式 】
   [参考：https://segmentfault.com/a/1190000021091008]

  1、观察者模式：只包含 观察者(watcher)、被观察者(subject); 
     * 两者（松耦合）
     * 一个(subject)可以对应多个(watcher)
     * 缺少一个管理中心来统一管理不同的(subject)
     * (subject)变化后会直接通知所有(watcher)
  2、发布订阅模式：包含一个消息管理中心、观察着(watcher)、被观察者(subject)；
     * (subject)和(watcher)完全解偶 
     * 消息管理中心管理多个不同的(subject)
     * 每一个(subject)可以对应多个(watcher)
     * (subject)变化后会先通知到消息管理中心，再由消息管理中心决定需要通知哪些(watcher)
  
  相关案例：
  * 观察者模式
    * vue的数据绑定监听
  * 发布订阅模式
    * vue的eventBus事件机制、
    * webpack的tapable事件机制、
    * 原始dom的事件机制、
    * node的EventEmitter事件机制
*/


/*
 【 双向绑定原理 】
  [概念：]
  Watcher: 订阅者，多个订阅者，收到属性的变化通知并执行相应的函数，从而更新视图。
  Dep: 消息订阅器，收集订阅者，然后再属性变化的时候执行对应订阅者的更新函数。针对每个属性都会创建一个Dep
  Observer: 监听器，通过defineProperty劫持并监听所有属性，如果有变动的，就通知订阅者Watcher
  Compile：指令解析器，遍历每个节点进行解析，把指令初始化成一个订阅者Watcher，并替换模版数据或绑定相应函数
  
  原理：https://www.cnblogs.com/libin-1/p/6893712.html

  [主要难点：]
  1、在模版compile的注册双向绑定逻辑
    1）对{{exp}}绑定：var watcher = new Watcher(vm, exp, callback) 
       * 调用 watch.get() 完成以下操作：
          * 来设置 Dep.target = this
          * 然后调用vm.data[exp]来把当前watcher添加到对应的dep.subs中
          * 然后在vm.data[exp]=xxx 赋值的时候就调用对应dep.notify()来遍历subs中的watcher.update()来完成模版更新
    2）对 input 事件的绑定 
       * inputDom.addEventListener('input', (e)=>{
            vm.data[exp] = e.target.value  // 赋值，此时有依赖vm.data[exp]的watcher也会执行update()
         })
  2、如何实现调用 vm.xxx 等同于 vm.data.xxx
    1) Vue类的prototype上有一个_proxy()方法，此方式通过调用此方法来实现代理的，具体代码如下：
        Vue.prototype = { 
          _proxy: function(key) {
            var me = this;
            Object.defineProperty(me, key, {
                configurable: false,
                enumerable: true,
                get: function proxyGetter() {
                    return me._data[key];
                },
                set: function proxySetter(newVal) {
                    me._data[key] = newVal;
                }
            });
          }
        }
  3、如何实现vm.data对象的深层数据代理的？
    1）在observe()循环遍历vm.data的所有属性，来执行 defineReactive(data, key, val)
    2）在 defineReactive 中递归调用observe(val) 实现深层代理
*/


/*
 【 Vue2.0 双向绑定的实现原理 】
  参考：https://www.jianshu.com/p/6d02c1639b03
*/


/*
 【 Vue2.0 为什么要用虚拟 DOM(Virtual DOM) 】
  参考：https://learnku.com/articles/50487
*/


/*
 【 vue1.x & vue2.x 数据驱动更新视图机制对比，以及 VNode结合diff算法的优势是什么？ 】
  参考：https://github.com/natsu0728/blog/issues/8
       https://www.jianshu.com/p/6d02c1639b03
  * vue1.x的原理：
    * 采用（defineProperty数据劫持 + watcher添加依赖监听）的观察者模式进行数据响应的
    * 小粒度更新，精确追踪到数据变化所影响的dom变化，精确更新变化的dom     
  * vue2.x的原理：
    * 采用（defineProperty数据劫持 + watcher添加依赖监听）的观察者模式进行数据响应的
    * 以组件粒度为范围，组件内diff式更新，每次state变化都会执行组件的render函数 
*/


/*
 【 如何做到子组件不能修改父组件传递过来的propos属性 】
  参考：https://blog.csdn.net/weixin_44195250/article/details/102826180
  [原理：]
  1、对子组件的props进行代理，在set方法中判断全局变量isUpdatingChildComponent来决定是否可以修改数据
  2、如果是子组件自己调用，isUpdatingChildComponent = false，此时就会报警告
  3、如果是是父组件的属性修改了，此时要去更新子组件的props中对应的属性值，在更新之前会先设置isUpdatingChildComponent = true
  [源码：]
  defineReactive$$1(props, key, value, function () {
    if (!isRoot && !isUpdatingChildComponent) {
      warn('子组件不能修改props属性');
    }
  });
*/


/*
 【 子组件和父组件通信方式有哪几种？ 】
  1、父子组件通信：
    * vm.$on('eventName', callback)
    * vm.$emit('eventName', params)
  2、非父子组件通信
    * 通过全局eventBus来实现
      * var eventBus = new Vue()  // 因为Vue继承了eventBus，所以可以直接这样new
      * Vue.prototype.$eventBus = eventBus
      * eventBus.$on('eventName', callback)
      * eventBus.$emit('eventName', params)
    * 通过 Vuex 来实现
  3、跨层级组件通信
    * provide 、inject
*/


/*
 【 vue 异步更新dom的原理 】
  [强调：vue的dom更新是异步的，但是state的更新是同步的，不向react的setState()，react的state更新是异步的]
  【原理】：
  * 在一个tick事件循环中，每一次修改state都会触发相应的watch监听，
  * 但是watch监听不会立刻被触发执行，而是被放到一个待执行的异步队列数组中，（对相同data的多次watch会进行合并）
  * 在本次tick中，调用vm.xx = 1时, vue内部会往一个watcher的异步队列push进来watcher，然后立刻执行nextTick()来清空watcher队列：
    *  promsie.resolve().then(()=> { // 清除watch队列 })
*/


/*
 【 vm.$nextTick(callback) 】
  参考：https://www.jianshu.com/p/a7550c0e164f
  1、在vm.data发生变化的时候，vue是异步来更新dom的
  2、$nextTick的callback会在dom更新之后执行，所以在操作dom的时候，需要放$nextTick中来执行，可以保证拿到正确的dom数据
  3、$nextTick() 属于微任务（不支持promise浏览器会用setTimeout来做），会在执行完dom渲染操作后添加一个微任务，类似于 node的process.nextTick()
*/


/*
 【 Vue.js异步更新DOM策略及nextTick  ？？？？ 到到底是如何控制执行和渲染顺序的 】
  参考：https://juejin.cn/post/6844904071606845447
       https://segmentfault.com/a/1190000015632392（解释的很透彻）

  待解决 ？？？？？
*/


/*
 【 computed 相关知识 】
  1、computed 属性是缓存的，只要依赖属性值不变其值就不更新
  2、模版中任何{{xxFn()}}调用都应该用computed来实现
  3、可以同时依赖多个属性
*/


/*
 【 watch 相关知识】
  1、同时只能监听一个属性
  2、如果要监听多个属性，可以先把多个属性通过computed来整合成一个对象后，再监听整合后的computed属性
  3、执行异步或开销大的操作时：watch
  4、什么时候会执行？
      * 在首次初始化的时候是不会执行的，可以设置 immediate:true 来设置初始化执行 
      * watch属性的引用对象没有发生变化，是不会触发的，可以设置 deep:true 来设置
*/





/*
 【 父子组件生命周期函数的执行顺序 】
  参考：https://blog.csdn.net/weixin_39917811/article/details/113452913
       https://blog.csdn.net/qq_38021852/article/details/88640807
  1、初始化加载
     * 父beforeCreate > 父created > 父beforeMount> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted
     * 父组件准备挂载还没挂载时，子组件先完成挂载，最后父组件再挂载！
  2、更新
     * 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
  3、销毁
     * 父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
*/


/*
 【 <keep-alive> activated、deactivated、Router、 <router-view>】
  1、<keep-alive>是Vue的内置组件，在其中的组件在切换过程中将状态保留在内存中，防止重复渲染DOM
        <keep-alive>
            <component :is="currentView"></component>
        </keep-alive>
  2、在Router中可以在meta中设置需要被缓存的组件
        new Router({
          routes: [
            {
              path: '/',
              name: 'Home',
              component: () => import('@/components/home/home'),
              meta: {
                keepAlive: true // 需要被缓存
              }
            },
            {
              path: '/Header',
              name: 'Header',
              component: () => import('@/components/home/header'),
              meta: {
                keepAlive: false // 不需要被缓存
              }
            }
          ]
        });

        <div id="app">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
*/



/*
 【 路由vue-router、hash、history 】
    import Vue from 'vue';
    import Router from 'vue-router';
    Vue.use(Router);

    var router = new Router({
      mode: 'history', // 配置路由模式：hash 或 history，history需要后端nginx来配合返回index.html
      routes: [
        {
          path: '/user/:id', // 动态参数，这样组件会被重复利用，生命周期钩子不会被触发了； 获取：this.$route.params.id
          name: 'User',
          component: () => import('@/components/home/user'),  // 按需加载（组件和路由组件都可以这么用）
          meta: { // 路由元信息，对此路由的一种详细描述，可以提供给路由来进一步判断处理
            keepAlive: true, // 此路由器组件需要被缓存，配合 <keep-alive> 使用
            requiresAuth: true
          },
          beforeEnter: (to, from, next) => { // 此路由独享的钩子函数
            if (to.matched.some(record => record.meta.requiresAuth)) {  // 用 meta 信息来判断
              // .....
            }
          }, 
          children: [
            {
              // 当 /user/:id/profile 匹配成功，
              // UserProfile 会被渲染在 User 的 <router-view> 中
              path: 'profile',
              component: UserProfile
            },
          ]
        },
        { path: '/a', redirect: '/b' } // 重定向
      ]
    });
    // 全局钩子函数
    router.beforeEach((to, from, next) => {
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else next()
    })

    const app = new Vue({
      router,   // 这样会在 this 上添加 $route , 可以通过 watch 来判断路由的变化
      render: createElement => createElement(App)  // createElement方法用来创建vNode，第一个参数也可能直接传递一个组件
    }).$mount('#app')

    <div id="app">
      <router-link to="/foo">GoTo</router-link>
      <router-view></router-view>
    </div>
*/


/*
 【 异步组件、 路由懒加载 】
  请参考：
  异步组件：https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6
  路由懒加载：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
*/



/*
 【 hash、history 】
  https://developer.mozilla.org/en-US/docs/Web/API/History_API
*/


/*
 【 插槽slot、作用域插槽 】
  请参考：https://cn.vuejs.org/v2/guide/components-slots.html
*/


/*
 【 vue 开发中需要注意的问题 】
  * methods 中不能用箭头函数，不然 this 的指针就不对
  * 时间传参数可以直接这么写： <input type="button" value='add' @click="addItem(index)"/>
*/


/*
 【 vue2 和 vue3 双向数据绑定原理的不同点 】
  请参考：https://blog.csdn.net/weixin_45851208/article/details/107687070
*/



/*
  待解决：
  1、computed中的依赖是如何实现数据监听的？也就是如何坚挺表达式的{{fn()}}？跟普通的data中的对象监听有什么区别？如何实现数据缓存的？看相关代码
  2、computed属性如果没有在模版中被使用，那么computed方法还会执行吗？如果只是在js中被使用，会调用吗？  
  3、为什么diff算法是O(n)而不是O(n^3)
*/


