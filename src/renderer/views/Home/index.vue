<template>
  <div class="home qui-fx-f1">
    <div class="title">{{ title }}{{ version }}</div>
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
    color: @primary-color;
  }
}
</style>
