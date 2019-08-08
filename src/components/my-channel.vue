<template>
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // myValue: null,
      channelOptions: []
    }
  },
  // watch: {
  //   // 如果要监听对象下的属性，应该用字符串当作方法名
  //   myValue: function (newVal, oldVal) {
  //     // console.log(newVal)
  //     if (newVal === '') {
  //       // axios 不会将参数提交给后台
  //       this.myValue = null
  //     }
  //   }
  // },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      // 把数据传给父组件
      // 后端不支持空字符判断，所以把val值在清除时设置为null
      if (val === '') val = null
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang="less">
</style>
