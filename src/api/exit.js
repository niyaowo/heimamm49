// 导入错误拦截器
import instance from '@/utils/request.js'
// 获取用户详情接口请求
function exitLogin() {
    return instance({
        url: "/logout",
        method: "get",
    })
}

// 导出方法
export { exitLogin }