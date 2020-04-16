
// 导入拦截器
import instance from '@/utils/request.js';
// 用户 信息列表请求
function getUserData(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params
    })
}
// 设置用户状态
function setStatus(data) {
    return instance({
        url: "/user/status",
        method: "post",
        data
    })
}
// 删除用户 
function removeUser(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        data
    })
}

// 添加用户 
function addUser(data) {
    return instance({
        url: "/user/add",
        method: "post",
        data
    })
}

// 添加用户 
function editUser(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        data
    })
}
export { getUserData, setStatus, removeUser, addUser, editUser };