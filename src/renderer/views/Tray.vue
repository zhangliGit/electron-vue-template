<template>
  <div class="tray qui-fx-ae">
    <div class="tray-box">
      <ul>
        <li class="menu-item" @click="showMain">
          <a-icon type="desktop" />
          <span>显示主界面</span>
        </li>
        <li class="menu-item" @click="restart">
          <a-icon type="sync" />
          <span>重启</span>
        </li>
        <li class="menu-item quit" @click="quit">
          <a-icon type="poweroff" />
          <span>退出应用</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tray',
  data() {
    return {}
  },
  computed: {},
  methods: {
    restart() {
      this.$electron.ipcRenderer.send('restart')
    },
    quit() {
      this.$electron.ipcRenderer.send('window-close')
    },
    showMain() {
      this.$electron.ipcRenderer.send('show-window')
    }
  }
}
</script>

<style lang="less" scoped>
.tray {
  position: relative;
  width: 200px;
  height: 130px;
  z-index: 9999999;
  opacity: 0.97;
  top: 200px;
  .tray-box {
    height: 130px;
    position: absolute;
    left: 8px;
    top: 8px;
    right: 8px;
    bottom: 8px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
    .menu-item {
      height: 42px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      color: #222;
      font-size: 14px;
      &.disabled {
        color: #999;
      }
      &:hover {
        background: #f3f5f9;
      }
      &.quit {
        border-top: 1px solid #ddd;
        margin: 4px 0;
      }
      .anticon {
        margin-right: 15px;
      }
    }
  }
}
</style>
