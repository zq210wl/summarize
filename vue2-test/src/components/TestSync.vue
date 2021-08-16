<template>
  <div>
    <input class="my-input" @input="onInput"></div>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    age: {
        type: Number,
        value: 22
    },
    obj: Object
  },
  data: function() {
    return {
      
    }
  },
  mounted() {
    console.log(this.age, this.obj.v);
    this.$root.eventBus.$on('setAge', function(age) {
        console.log('this.$root.eventBus.$on', age);
    });
    this.$getX({gg: 'ggggg'});
  },
  methods: {
    onInput(v) {
        this.$emit('update:age', +v.target.value)
        this.obj.v = +v.target.value;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my-input {
        width: 100px;
        height: 50px;
        border: 1px solid red;
    }
</style>
