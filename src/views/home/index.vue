<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#303030"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-news"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-picture"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown" @command="clickMenu">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 这里是二级路由的出口  组件显示的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    // 绑定Bus事件
    eventBus.$on('updateName', (data) => {
      this.name = data
    })
    eventBus.$on('updatePhoto', (data) => {
      this.photo = data
    })
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleMenu () {
      // 切换侧边栏收起与展开
      this.isCollapse = !this.isCollapse
    },
    // click绑定的是原生dom事件  绑定在组件上认为是自定义事件  组件内部没触发无效事件
    // click 绑定在组件解析后的DOM上  使用事件修饰符 native 绑定原生事件
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 清除用户信息
      store.removeUser()
      // 跳转登录页
      this.$router.push({ name: 'login' })
    },
    // 如果这个事件有默认的传参  你想接收参数 不加括号
    clickMenu (menuType) {
      // menuType ===setting this.setting()
      // menuType ===logout this.logout()
      this[menuType]()
    }
  }
}
</script>

<style scoped lang="less">
//组件名称其实就是解析后组件容器的类名
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background: #303030;
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #eee0e5;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
      cursor: pointer;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
      font-weight: 700;
      color: #262626;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: 700;
      }
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: #6c7b8b url(../../assets/images/logo_admin.png) no-repeat
    center/140px auto;
}
.miniLogo {
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 36px auto;
}
.el-menu {
  border-right: none;
}
</style>
