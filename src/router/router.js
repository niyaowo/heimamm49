// 导入Vue
import Vue from 'vue'
// 导入子组件
import login from '@/views/login.vue';
// 导入路由
import VueRouter from "vue-router";
// 注册路由
Vue.use(VueRouter);
// 创建实例化路由对象
const router = new VueRouter({
    routes: [
        {
            // 登陆页
            path: '/',
            component: login
        }
    ]
});
// 导入路由对象
export default router;