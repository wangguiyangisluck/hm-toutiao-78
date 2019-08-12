// 封装一个vue插件
// 作用：注册components下的组件为全局组件

import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
import ComA from '@/components/com-a'
import ComB from '@/components/com-b'

// vu插件定义的规则 暴露一个对象 {} 在对象中选项 install是个函数 对应的一个函数 函数形参Vue对象
export default {
  install (Vue) {
    // Vue.use(使用插件) Vue就是你use的Vue
    // Vue 全局注册组件即可(组件名，组件的配置对象)
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
    // 非父子传值
    Vue.component(ComA.name, ComA)
    Vue.component(ComB.name, ComB)
  }
}
