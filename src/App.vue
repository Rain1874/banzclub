<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-button @click="startHacking">Start2</el-button>
    </div>
    <div id="test">
      <img src="./assets/background.jpg">
    </div>
    <div id="a">
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
    	console.log(p);
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

<style>
  /*这里写会放在head标签里边，内部css*/
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
  background: url("./assets/logo.png");
}
#test {
  width: 18px;
  height:18px;
  border-radius:100%;
  background:#d67c61;
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
  #a {
    height: 40px;
    width: 40px;
    background : linear-gradient(to top, black, white);
    display : flex;
    transition : transform 1s;
  }
  #a:hover {
    background: red;
  }

</style>
