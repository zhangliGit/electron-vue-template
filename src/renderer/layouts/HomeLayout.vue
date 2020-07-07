<template>
  <section class="page-layout">
    1212
    <div class="" style="height: 400px; width: 500px; background:red"></div>
  </section>
</template>

<script>
export default {
  name: 'IndexTopNav'
}
</script>

<style lang="less" scoped>
.wy-wrapper {
  position: relative;
  max-width: 1200px;
  padding: 0 20px;
  min-height: calc(100vh - 246px);
  margin: auto;
}

.wy-header {
  margin: 0 30px;
  border-bottom: 1px solid #e3e2e2;
  text-align: center;
  a {
    display: inline-block;
    margin: 0 15px;
    color: #333;
    line-height: 42px;
    &.router-link-exact-active,
    &.router-link-active {
      border-bottom: 3px solid @primary-color;
      color: @primary-color;
    }
  }
}
</style>
