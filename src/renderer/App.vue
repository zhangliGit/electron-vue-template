<template>
  <div ref="app" id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {},
  methods: {
    ...mapActions('Download', {
      initDownload: 'init',
      checkDownloaded: 'checkDownloaded'
    }),
    handleAppWillClose() {
      if (this.$route.name !== 'mini') {
        this.$store.commit('play/SET_PLAY_STATUS', false)
      }
      this.$store.commit('play/SET_SHOW_DESKTOP_LYRIC', false)
    },
    handleNetworkChange({ name, title, message }, status = true) {
      const networkNotification = new Notification(name, {
        title,
        body: message,
        icon: 'public/images/icon.ico'
      })
      const tip = networkNotification.title
      this.$store.commit('App/SET_ONLINE', status, tip)
    }
  },
  created() {
    this.initDownload()
  },
  mounted() {
    this.$electron.ipcRenderer.on('will-close', () => {
      this.handleAppWillClose()
      this.$electron.ipcRenderer.send('app-exit')
    })

    window.onunload = () => {
      this.handleAppWillClose()
    }

    window.onoffline = () => {
      this.handleNetworkChange(
        {
          name: '网易云音乐',
          title: '网易云音乐',
          message: '请检查您的网络连接'
        },
        false
      )
    }
    window.ononline = () => {
      this.handleNetworkChange({
        name: '网易云音乐',
        title: '网易云音乐',
        message: '网络连接成功'
      })
    }
  }
}
</script>
