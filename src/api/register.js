// 导入错误信息拦截功能
import instance from '@/utils/request.js'
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