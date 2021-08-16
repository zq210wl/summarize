<template>
  <div class="hello">
    <span>姓名：</span>
    <slot name="xingming"></slot>
    <span>年龄：</span>
    <slot name="nianling" v-bind:smallAge="smallAge" v-bind:bigAge="bigAge">{{smallAge}}</slot>
    <span>默认：</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    
  },
  data: function() {
    return {
      smallAge: 23,
      bigAge: 31
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
