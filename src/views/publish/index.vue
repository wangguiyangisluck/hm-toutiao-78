<template>
  <dir class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 使用选择图片组件 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
           <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表文章</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改文章</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </dir>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 文章数据
      articleForm: {
        title: null,
        content: null,
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      // 地址栏的文章ID
      articleId: null
    }
  },
  watch: {
    // 注意:监听data中的数据变化,this.$route属于响应式数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          channel_id: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 如果ID在地址栏存储 代表是修改逻辑 才有必要获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  methods: {
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 切换图片类型 重置图片数据
    changeType () {
      this.articleForm.cover.images = []
    },
    // 发表文章 或 存入草稿
    async submit (draft) {
      // 1.发请求
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 2.提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 3.页面跳转到内容管理
      this.$router.push('/article')
    },
    // 修改 或者 存入草稿
    async update (draft) {
      // 1.发请求
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 2.提示
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      // 3.页面跳转到内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang="less">
</style>
