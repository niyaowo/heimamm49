// 导入错误拦截器
import instance from '@/utils/request.js';
// 学科列表方法请求
function getSubjectData() {
    return instance({
        url: '/subject/list',
        method: 'get',
    })
}
// 导出请求
export { getSubjectData };