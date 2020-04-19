// 导入错误拦截器
import instance from '@/utils/request.js'
// 获取详情接口请求
function getDataTitle(data) {
    return instance({
        url: "/data/title",
        method: "post",
        data
    })
}
// 获取饼状图数据
function getStatistics(data) {
    return instance({
        url: "/data/statistics",
        method: "post",
        data
    })
}

// 导出方法
export { getDataTitle, getStatistics }