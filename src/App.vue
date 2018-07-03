<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'assets/style/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  // 使用sass中的颜色
  h1 {
    color: $mainColor;
  }
}
</style>
