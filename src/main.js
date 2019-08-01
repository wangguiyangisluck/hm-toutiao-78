import Vue from 'vue'
import App from './App.vue'

// 是否开始产品级别提示   不开启 如果产品上线环节就可以减少一些日志的输出
// 开发阶段 提示越详细越好 开发级别的提示
Vue.config.productionTip = false

// main.js文件
// 作用：引入需要依赖的模块(js,包,css,其他资源),创建一个vue实例
new Vue({
  render: h => h(App)
}).$mount('#app')
