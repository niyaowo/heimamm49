// 导入错误拦截器
import instance from '@/utils/request.js';
// 题库列表方法请求
function getQusetionData(params) {
    return instance({
        url: '/question/list',
        method: 'get',
        params
    })
}
// 设置题库状态
function setStatus(data) {
    return instance({
        url: "/question/status",
        method: "post",
        data
    })
}

// 删除数据
function removeQuestionData(data) {
    return instance({
        url: "/question/remove",
        method: "post",
        data
    })
}

// 添加题库
function addQuestion(data) {
    return instance({
        url: "/question/add",
        method: "post",
        data
    })
}

// 编辑题库
function editSubject(data) {
    return instance({
        url: "/subject/edit",
        method: "post",
        data
    })
}

// 导出请求
export { getQusetionData, setStatus, removeQuestionData, addQuestion, editSubject };