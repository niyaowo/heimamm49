// 导入Vue
import Vue from 'vue';
// 导入Vuex
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    // 共享数据
    state: {
        // 首页 用户详情资料
        userInfo: "",
    }
})

// 导出Vuex实例对象
export default store;