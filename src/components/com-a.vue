<!--  -->
<template>
  <div>com-a{{msg}}</div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style lang='less' scoped>

</style>
