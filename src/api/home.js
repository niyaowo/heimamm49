// 导入错误拦截器
import instance from '@/utils/request.js'
// 获取用户详情接口请求
function getUserInfo(params) {
    return instance({
        url: "/info",
        method: "get",
        params
    })
}

// 导出方法
export { getUserInfo }