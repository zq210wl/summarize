<template>
  <div>
    <div contenteditable="true" class="my-input" @input="onInput"></div>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  model: {
    prop: 'myValue',
    event: 'myInput'
  },
  props: {
    myValue: String
  },
  data: function() {
    return {
      
    }
  },
  mounted() {
    console.log(this.myValue);
  },
  methods: {
    onInput(v) {
        this.$emit('myInput', v.target.innerHTML);
        console.log(v.target.innerHTML);
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
