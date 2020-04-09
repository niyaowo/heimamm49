// 注册页获取短信验证 请求方法
// 导入axios
import axios from 'axios'
import { Message } from 'element-ui';
// 创建axios 副本
const instance = axios.create({
    // 携带基地址
    baseURL: process.env.VUE_APP_URL,
    // 允许跨域携带Cooke 跨域携带cooke
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
        return response.data;
    } else {
        Message.error(response.data.message);
        return Promise.reject("error");
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 获取手机验证码
function getPhoneCode(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data: data,

    })
}
// 注册功能
function register(data) {
    return instance({
        url: '/register',
        method: 'post',
        data,
    })
}
// 导出功能
export { getPhoneCode, register };