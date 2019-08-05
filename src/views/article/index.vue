<template>
  <div>内容管理</div>
</template>

<script>
export default {
  created () {
    this.$http
      .get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .then(res => {
        console.log(res.data)
        // 401 (UNAUTHORIZED)没有权限
      })
  }
}
</script>

<style scoped lang="less">
</style>
