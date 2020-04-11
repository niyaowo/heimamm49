import Vue from 'vue'
import App from './App.vue'

// 导入路由对象
import router from '@/router/router.js';
// 导入Vuex数据共享管理器 对象
import store from '@/store/index.js';

// 导入elemnt 插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注入路由对象
  router,
  // 注入Vuex
  store,
}).$mount('#app')
