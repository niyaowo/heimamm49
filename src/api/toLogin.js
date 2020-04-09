// 导入错误拦截器
import instance from '@/utils/request.js';
// 用户登入方法请求
function toLogin(data) {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}
// 导出请求
export { toLogin };