// 对axios进行配置  然后将配置好的axos导出
import axios from 'axios'
import store from '@/store'

// 进行配置
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   // 请求头配置
//   Authorization: `Bearer ${store.getUser().token}`
// }

axios.interceptors.request.use((config) => {
  // 修改
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  // 成功的返回值 默认包装成promise对象
  return res
}, (err) => {
  // 获取响应状态码
  // err错误对象
  // err.response 响应对象
  // err.response.status 响应状态码
  if (err.response.status === 401) {
    // token失效返回登录页
    // this.$router.push('/login') 本质 把hash改成了 #/login
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
export default axios
