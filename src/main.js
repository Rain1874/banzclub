import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import './index.less';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
