<template>
  <div id="app">
    <HelloWorld>
      <template v-slot:xingming>{{xingming}}</template>
      <template v-slot:nianling="{ bigAge, smallAge}">{{bigAge + '' + smallAge}}</template>
      <template v-slot:default>haha</template>
    </HelloWorld>
    <MyInput v-model="inputV" />{{inputV}}
    <TestSync v-bind:age.sync="age" :obj="obj"/>{{age}}{{obj.v}}
    <MyProvider />
    <MyComp />
    <CmptA />
    <CmptB />
    <CustomA />
    <CustomB />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyInput from './components/MyInput.vue'
import TestSync from './components/TestSync.vue'
import MyProvider from './components/MyProvider.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MyInput,
    TestSync,
    MyProvider
  },
  provide: {
    haha: 'aaaahhhhhhhh'
  },
  watch: {
    'obj': {
      handler: function(v) {
        console.log('v has change', v);
      },
      deep: true
    },
    'age': function(v) {
      console.log('age has change', v);
    }
  },
  data: function() {
    return {
      xingming: 'zhangqi',
      nianling: '21',
      inputV: 'abc',
      age: 33,
      obj: {
        v: 2
      },
      a: 999
    }
  }
}
</script>

<style>
#app {

}
</style>
