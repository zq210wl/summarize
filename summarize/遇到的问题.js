
/*
 【 SAAS 项目，使用的React版本16.1.1，最新版本已经是17.0.2了；"antd": "^2.13.8"】
  [问题1: <CitySelect> <CompanySelect> <LineSelect> 同步改异步，并且要兼容之前的使用方式]
    * 之前都是首次加载的时候，这三个值默认都是选择全部，
    * 所以之前所以页面在初始化的时候都直接用初始值去【同步】加载就行了，
    * 然后这些select内部会异步去加载各自的option数据。
    * 现在部分业务模块的页面需要做权限判断，用户只能看到有权限的数据，那么当时就想到会带来两个问题：
    * 第一个问题：是否要重新写三个新的组件来替换之前的组件，还是直接在原组件上进行改造；我选择了在原来组件上进行兼容改造；
        * 通过添加一个配置项来区分
    * 第二个问题：页面的首次加载逻辑肯定是要变的，要等到组件option数据都加载回来，再拿到第一个option的值作为首次加载值；
        * 这个时候就要异步地去加载每一项的option数据，等到都加载完了，再拿到初始值去初始化加载数据；就又带来另一个问题，异步怎么弄：
        * 通过在每个组件中暴露一个getFirstOption()的一个异步方法，内部返回一个 Promise 对象。
   
  [问题2: 编辑配置项的时候，有一个文本框列表，每个item后面都有一个增加和删除的按钮，这里就遇到了用索引index作为 key 的问题]
    * 删除：
        * 如果之前已经存在一个 key=2 的文本框，我在数据里删除了它，那么后面正常应该是后面的key=3的往前移动，变成key=2
        * 这个时候react的diff算法原理来判断，发现key=2的dom元素之前已经存在，而且位置也没变，那么就把key=2的dom就不变化
        * 其实就是把最后一项给删除了；
    * 添加：
        * 如果在 key=2 后面添加一项，跟删除同理，其实就是在最后面添加了一项
    * 【注意：input用的是react的 <Input defaultValue='xxx'/> 组件，并非双向绑定（非受控）的情况，最后统一通过form来获取值】
  [问题3: 如果列表中item出现重复的key的，那么在下次更新列表的时候，只有一个item会被重用或者只有一个item会被重建，另一个item会被保留下来，导致数据错乱]
    * 列表数据出现重复key导致数据错乱
*/

/*
  【 Vue 项目开发中 】
  [问题1: 前端数据用localstorage来缓存]
    * 首页推荐数据加载比较慢或者加载超时了，所以存在本地，加载完在替换
  [问题2: 线路列表页面和详情页面静态数据和动态数据异步渲染]
    * eta数据计算太慢了
*/

/*
  【 H5 项目开发中 】
  [问题1: 页面初始化的时候，多次执行获取初始化定位信息]
    * 使用Promise缓存来解决，把多次调用地位改成一次调用
*/


/* 待收集：
 vue 的 methods 中不能用箭头函数，不然 this 的指针就不对

 直接修改react的state 会引起什么问题？

 h5脚手架工具
*/


