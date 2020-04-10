// 导入Vue
import Vue from 'vue'
// 导入子组件
import login from '@/views/login/login.vue';
import layout from '@/views/home/layout.vue';
import chart from '@/views/home/chart/chart.vue';
import userList from '@/views/home/userList/userList.vue';
import question from '@/views/home/question/question.vue';
import business from '@/views/home/business/business.vue';
import subject from '@/views/home/subject/subject.vue';

// 导入进度条插件
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css'

// 导入路由
import VueRouter from "vue-router";
// 注册路由
Vue.use(VueRouter);
// 创建 并 导出 实例化路由对象
const router = new VueRouter({
    routes: [
        // 重定向登入页
        {
            path: '/',
            component: login
        },
        // 登入页
        {
            path: '/login',
            component: login
        },
        // 首页
        {
            path: "/home",
            // 进入home 首页将子路由重定向  默认路径
            redirect: "/home/subject",
            component: layout,
            // 嵌套子路由
            children: [
                {
                    path: 'chart',
                    component: chart,
                },
                {
                    path: 'userList',
                    component: userList,
                },
                {
                    path: 'question',
                    component: question,
                },
                {
                    path: 'business',
                    component: business,
                },
                {
                    path: 'subject',
                    component: subject,
                }
            ]
        }
    ]
});
// router.beforeEach((next) => {
//     NProgress.start();
//     next()
// })
// router.afterEach(() => {
//     NProgress.done()
// })
export default router;