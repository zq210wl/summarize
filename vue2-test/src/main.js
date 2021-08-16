import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 注册全局this属性
Vue.prototype.$getX = function(options) {
  console.log('Vue.prototype.$getX---:', options);
}

// 全局组件
Vue.component('MyComp', {
  data: function() {
    return {
      title: 'This is my compoment.'
    }
  },
  render: function(h) {
    return h('h3', this.title)
  }
});

// 全局混入组件
Vue.mixin({
  components: {
    CmptA: {
      data: function() {
        return { title: '组件A' }
      },
      render(h) {
        return h('h3', this.title)
      }
    },
    CmptB: {
      data: function() {
        return { title: '组件B' }
      },
      render(h) {
        return h('h3', '组件B')
      }
    }
  }
});

// 自定义组件库（插件的形式）
const MyComponentLibrary = (function(){
  const myCompoents = {
    CustomA: {
      name: 'CustomA',
      data: function() {
        return { txt: 'CustomA' }
      },
      render(h) {
        return h('h3', this.txt)
      }
    },
    CustomB: {
      name: 'CustomB',
      data: function() {
        return { txt: 'CustomB' }
      },
      render(h) {
        return h('h3', this.txt)
      }
    }
  };

  return {
    install: function (Vue) {
      Vue.mixin({
        components: myCompoents
      });
    }
  };

})();
// 应用组件库插件
Vue.use(MyComponentLibrary);


new Vue({
  data: {
    a: 111,
    b: 222,
    eventBus: new Vue(),
  },
  render: h => h(App),
}).$mount('#app')
