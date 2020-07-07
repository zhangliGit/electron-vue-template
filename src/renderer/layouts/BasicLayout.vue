<template>
  <a-config-provider :locale="locale">
    <a-layout class="basic-layout qui-page qui-fx-ver">
      <a-modal
        title="发现新版本"
        :maskClosable="false"
        :closable="false"
        v-model="versionTag"
        @ok="downApp"
        okText="更新"
        cancelText="下次再说"
      >
        <p>1. 整体用户体验优化</p>
        <p>2. 修改已知bug</p>
        <p>3. 新增版本更新记录功能</p>
      </a-modal>
      <a-modal
        :footer="null"
        :closable="false"
        title="新版本下载中, 请稍等..."
        :maskClosable="false"
        v-model="updateTag"
      >
        <div class="qui-fx-jc">
          <a-progress type="circle" :percent="percent" />
        </div>
      </a-modal>
      <a-layout-header class="basic-layout-header">
        <basic-header />
      </a-layout-header>
      <div class="qui-fx-f1 qui-fx">
        <div class="slide-left">left</div>
        <div class="qui-fx-f1 qui-fx">
          <keep-alive :exclude="keepAliveExcludeList" v-if="isOnliline || noLimitRoutes.includes($route.name)">
            <router-view v-if="!refresh"></router-view>
          </keep-alive>
          <offline v-else />
        </div>
      </div>
      <login />
    </a-layout>
  </a-config-provider>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { ipcRenderer } from 'electron'
import BasicHeader from '@/components/BasicHeader'
import Login from '@/components/Login'
import Offline from '@/components/Offline/index'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      updateTag: false,
      versionTag: false,
      percent: 0,
      locale: zhCN,
      refresh: false,
      keepAliveExcludeList: []
    }
  },
  computed: {
    ...mapGetters('App', ['isOnliline']),
    ...mapState('App', ['noLimitRoutes'])
  },
  components: {
    BasicHeader,
    Login,
    Offline
  },
  created() {
    // ipcRenderer.send('checkForUpdate')
    ipcRenderer.on('message', (event, text) => {
      if (text === '检测到新版本，正在下载……') {
      }
    })
    ipcRenderer.on('downloadProgress', (event, progressObj) => {
      this.percent = progressObj.percent || 0
    })
    ipcRenderer.on('isUpdateNow', () => {
      this.versionTag = true
    })
  },
  methods: {
    downApp() {
      ipcRenderer.send('isUpdateNow')
    }
  }
}
</script>

<style lang="less" scoped>
.basic-layout {
  height: 100vh;
  .basic-layout-header,
  .basic-layout-footer {
    height: 50px;
    line-height: 50px;
    padding: 0;
    z-index: 22;
    position: relative;
  }
  .basic-layout-footer {
    border-top: 1px solid #ddd;
  }
  .basic-layout-header {
    background: @primary-color;
    color: #eee;
    -webkit-app-region: drag;
  }
  .basic-layout-sider {
    position: relative;
    background: none;
    box-shadow: none;
    overflow-x: hidden;
    overflow-y: hidden;
    .split-handle {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 5px;
      border-right: 1px solid #ddd;
      cursor: col-resize;
    }
  }
  .slide-left {
    width: 100px;
    height: 100%;
    background-color: #eee;
    box-shadow: 2px 0 4px #ccc;
  }
  .footer {
    height: 10px;
    background-color: green;
  }
}
</style>
