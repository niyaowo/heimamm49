// 注册页获取短信验证 请求方法
// 导入axios
import axios from 'axios'
export default (data) => {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: data,
        // 跨域携带cooke
        withCredentials: true
    }).then(
        res => {
            //成功回调
            window.console.log(res);
        }
    );
}