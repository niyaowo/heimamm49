import Vue from 'vue'
import App from './App.vue'

// 导入路由对象
import router from './router/router.js';

// 导入axios 并这是基地址 作为全局axios
// import axios from 'axios';
// axios.defaults.baseURL = process.env.VUE_APP_URL;
// Vue.prototype.$axios = axios;
// console.dir(Vue);

// 导入elemnt 插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注入路由对象
  router
}).$mount('#app')
