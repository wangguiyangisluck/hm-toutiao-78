
<template>
  <div class="container">
    <el-card class="my-card">
      <!-- logo -->
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:270px; margin-right:26px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // 按照自己的校验逻辑去value校验值即可
      // 手机号格式  1开头 2 3-9之间 最后9位数字即可
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不对'))
      }
      callback()
    }
    return {
      // 表单的数据对象
      loginForm: {
        // 字段参考接口文档
        mobile: '',
        code: ''
      },
      // 校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', tirgger: 'blur' },
          { validator: checkMobile, tirgger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', tirgger: 'blur' },
          { len: 6, message: '请输入6位验证码', tirgger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 1.对整个表单进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log('siccess')
          // 2.校验成功发送登陆请求
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res是响应对象  res.data数据属于响应主体
              // console.log(res.data)
              this.$router.push('/')
            })
            .catch(() => {
              // 请求失败 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
//scoped lang='less'  可以让当前的style支持less

//若想要覆盖elementUI的样式需要在全局作用域下书写
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  /* center/cover  背景图定位/背景图尺寸 cover是等比例缩放铺满容器多余被裁剪
  contian 等比缩放完全显示当前容器可能会存在留白 */
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    width: 450px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
  }
  img {
    width: 200px;
    display: block;
    margin: 0 auto 30px;
  }
}
</style>
