<template>
  <div>
    {{this.haha}}
  </div>
</template>

<script>
export default {
  inject: ['haha'],
  data: function() {
    return {
      
    }
  },
  mounted() {
      console.log('this.$root.a----:', this.$root.a);
      this.$root.a = 4;
      console.log('this.$parent.a----:', this.$parent.a);
      console.log('this.$parent.$parent.a----:', this.$parent.$parent.a);
      setTimeout(() => {
        this.$root.eventBus.$emit('setAge', '50啦');
      }, 0);
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
