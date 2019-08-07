<template>
  <div>
    <div>Header</div>
    <div>
      <!-- 插槽 如果插槽不写名字 认为默认插槽 -->
      <!-- 给插槽取名字 -->
      <slot name="content" :msg="msg" a="10"></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style scoped lang="less">
</style>
