// 导入拦截器
import instance from '@/utils/request.js';
// 企业信息列表请求
function getBusinessData(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params
    })
}

// 设置企业状态
function setStatus(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data
    })
}

// 删除企业数据
function removeBusiness(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}

// 企业新增
function addBusiness(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data
    })
}

// 企业编辑
function editBusiness(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}

// 导出请求
export { getBusinessData, setStatus, removeBusiness, addBusiness, editBusiness }