// 封装操作sessionStorage的函数
// 提供给其他模块使用
// 1. 约定好  key的名字
// 2.约定好value的格式 字符串格式 JSON数据
const KEY = 'hm-toutiao-78-user'
export default {
  // 设置用户信息
  setUser (user) {
    // 存储user对象数据
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }

}
