<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view/>
  </div>
</template>

<script lang="js">
import Sidebar from "@/components/Sidebar/Sidebar";
export default {
  name:"App",
  components:{
    Sidebar
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app {
  height: 100%;
}
</style>
