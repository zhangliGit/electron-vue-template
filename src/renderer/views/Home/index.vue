<template>
  <div class="home qui-fx-f1">
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState('app', ['title'])
  },
  data() {
    return {}
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
