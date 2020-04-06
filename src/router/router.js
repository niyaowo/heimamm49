// 导入Vue
import Vue from 'vue'
// 导入子组件
import login from '@/views/login.vue';
// 导入路由
import VueRouter from "vue-router";
// 注册路由
Vue.use(VueRouter);
// 创建 并 导出 实例化路由对象
export default new VueRouter({
    routes: [
        // 重定向登入页
        {
            path: '/',
            redirect: '/login'
        },
        // 登入页
        {
            path: '/login',
            component: login
        }
    ]
});