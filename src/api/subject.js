// 导入错误拦截器
import instance from '@/utils/request.js';
// 学科列表方法请求
function getSubjectData(params) {
    return instance({
        url: '/subject/list',
        method: 'get',
        params
    })
}
// 设置学科状态
function status(data) {
    return instance({
        url: "/subject/status",
        method: "post",
        data
    })
}

// 删除数据
function removeSubjectData(data) {
    return instance({
        url: "/subject/remove",
        method: "post",
        data
    })
}

// 添加学科信息
function addSubject(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data
    })
}

// 编辑学科
function editSubject(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data
    })
}
// 导出请求
export { getSubjectData, status, removeSubjectData, addSubject, editSubject };