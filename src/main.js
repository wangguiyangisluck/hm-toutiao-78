import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// @是一个路径的别名 是sec路径 在vue-cli项目下才有效
// index是目录的索引文件 默认使用的索引文件 index.js(若文件夹同时存在js文件优先级最高)
// index.vue index.json
import router from '@/router'

// 导入样式
import '@/styles/index.less'
import axios from '@/api'
Vue.prototype.$http = axios

// 是否开始产品级别提示   不开启 如果产品上线环节就可以减少一些日志的输出
// 开发阶段 提示越详细越好 开发级别的提示
Vue.config.productionTip = false

Vue.use(ElementUI)

// main.js文件
// 作用：引入需要依赖的模块(js,包,css,其他资源),创建一个vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
