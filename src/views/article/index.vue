<template>
  <div>
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用自己的组件 -->
          <!-- 当绑定了v-model时 做的第一件事就是 :value="reqParams.channel_id" -->
          <!-- @input="reqParams.channel_id=数据" -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            @change="changeDate"
            v-model="dateArr"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <!-- <my-test> -->
    <!-- slot-scope="scope 指定接收插槽传递过来的所有的自定义的属性和值的集合数据(对象{msg:'值'})" -->
    <!-- <div slot="content" slot-scope="scope">content {{scope.a}}</div> 老语法 -->
    <!-- <template v-slot:content="scope">content {{scope.a}}</template> -->
    <!-- <div slot="footer">footer</div> -->
    <!-- </my-test> -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:150px;height:120px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:150px;height:120px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px">
        <!-- total 指定的总条数 -->
        <!-- 分页组件  默认的每页显示的10条数 组件文档中page-size 是指定分页每页显示的条数 -->
        <!-- 当你更改组件的当前页码时 拿着新的页码重新请求渲染列表 -->
        <!-- 当你不是点击按钮触发的分页 不会去选中按钮的样式 :current-page 需要把当前页码数据和分页组件进行绑定 -->
        <el-pagination
          :background="true"
          layout="total,prev, pager, next,jumper"
          :page-size="reqParams.per_page"
          :total="total"
          :current-page="reqParams.page"
          @current-change="changPager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import MyTest from '@/components/my-test'
// import MyBread from '@/components/my-bread'
export default {
  // components: { MyTest, MyBread },
  data () {
    return {
      // 收集请求参数(表单数据)
      reqParams: {
        status: null,
        channel_id: 2,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      // channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 计算属性 computed 当你需要一个新数据， 依赖data中的数据得到，当data中数据改变，计算属性也会改变
  // 侦听器 watch 当你需要监听  某个data数据改变，改变后做性能开销较大操作时(异步操作),也可以做其他事情
  // watch: {
  //   // 如果要监听对象下的属性，应该用字符串当作方法名
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     // console.log(newVal)
  //     if (newVal === '') {
  //       // axios 不会将参数提交给后台
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  created () {
    // created 钩子函数 是组件实例完成，属性已经绑定,但是还没有挂载到Dom中
    // 获取频道下拉选项数据
    // this.getChannelOptions()
    // 获取文章列表数据
    this.getArticle()
  },
  methods: {
    // 编辑文章
    edit (id) {
      // 发布文章和编辑文章使用的是用一个路由规则
      // 如果使用 params 是路径传参 /publish /publish/1000 两个路由规则
      // 使用query传参 /publish  /publish?id=10
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del (id) {
      // 1.弹出一个确认框
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 2.点击确认 发起删除请求
          await this.$http.delete(`articles/${id}`)
          // 3.删除成功 提示 更新列表
          this.$message.success('删除文章成功')
          this.getArticle()
        })
        .catch(() => {})
    },
    // 选择日期后的函数
    changeDate (dateArr) {
      // dateArr[起始日期,结束日期]
      // dateArr 自带有清空功能 清空后dateArr中没有值是null 需要严谨的处理
      // console.log(dateArr)
      if (dateArr) {
        // 把日期格式转换格式 使用moment插件即可 但是不需要这么麻烦 组件提供格式属性
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      // 其他数据时双向绑定的
      this.reqParams.page = 1
      this.getArticle()
    },
    // 页码改变事件函数
    changPager (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticle () {
      // 请求方式是get  第二个参数是一个对象 {params:指定参数对象}
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 文章列表
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
