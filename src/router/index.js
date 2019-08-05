// 初始化路由对象 提供main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Setting from '@/views/setting'
import Notfound from '@/views/404'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      // 跳转路由 $router.push('/login')或者$router.push({name:'login'})
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   redirect: '/welcome',
    //   children: [
    //     {
    //       path: '/welcome',
    //       name: 'welcome',
    //       component: Welcome
    //     }
    //   ]
    // }
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'article',
          component: Article
        },
        {
          path: '/image',
          name: 'image',
          component: Image
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/fans',
          name: 'fans',
          component: Fans
        },
        {
          path: '/setting',
          name: 'setting',
          component: Setting
        }
      ]
    },
    // 404页面
    {
      path: '*',
      name: '404',
      component: Notfound
    }
  ]

})

// 加上全局前置导航守卫
router.beforeEach((to, from, next) => {
  // // 1.如果是登陆路由就放行
  // if (to.path === '/login') return next()
  // // 2.获取用户信息 如果没有 拦截登陆
  // if (!store.getUser().token) return next('/login')
  // // 3.放行
  // next()

  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
