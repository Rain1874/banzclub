<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-button @click="startHacking">Start2</el-button>
    </div>
    <div id="app-test">
      <img src="./assets/background.jpg">
      <img src="./assets/bg.jpg">
    </div>
    <div id="test">
      autoprefixer1
    </div>
    <div id="index">
      index5555
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  display: flex;
  background: url("./assets/bg.jpg");
}
#app-test {
  /*animation:twinkling 1.2s linear 0s infinite;;*/
}
@keyframes twinkling {
  0% {
    opacity: 0.5;
    transform: scale(0.2);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
