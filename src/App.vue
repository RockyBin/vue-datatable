<template>
  <div id="app">
    <router-view v-if="isFresh"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isFresh:true,
    }
  },
  methods:{
    reload(){
      this.isFresh = false;
      this.$nextTick(function(){
        this.isFresh = true
      })
    }
  }
}
</script>

<style>

</style>
