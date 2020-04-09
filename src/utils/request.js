// 公用的错误拦截  拦截器
// 导入axios
import axios from 'axios'
import { Message } from 'element-ui';
// 导入token值
import { getToken } from './token.js'
// 创建axios 副本
const instance = axios.create({
    // 携带基地址
    baseURL: process.env.VUE_APP_URL,
    // 允许跨域携带Cooke 跨域携带cooke
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 判断有无token值
    if (getToken()) {
        // 设置请求头 参数 token值
        config.headers.token = getToken();
    }
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

// 导出axios 副本
export default instance;