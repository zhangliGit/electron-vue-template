<template>
  <div class="home qui-fx-f1">
    <div class="qui-main-color">{{ title }}{{ version }}</div>
    <div class="qui-main-bg-color box"></div>
  </div>
</template>

<script>
import pkg from '../../../../package.json'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState('app', ['title'])
  },
  data() {
    return {
      version: pkg.version
    }
  },
  components: {},
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.home {
  .title {
    background: #fff;
  }
  .box {
    width: 200px;
    height: 100px;
  }
}
</style>
