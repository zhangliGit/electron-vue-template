import Vue from 'vue'
import store from '@/store/index.js'
import Router from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout'

import { recommendRoutes } from './modules/recommend'
import { ipcRenderer } from 'electron'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: BasicLayout,
      redirect: '/home',
      children: [
        ...recommendRoutes,
        {
          path: '/offline',
          name: 'offline',
          component: function(resolve) {
            require(['@/views/Offline/index.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/mini',
      name: 'mini',
      component: function(resolve) {
        require(['@/views/Mini/index.vue'], resolve)
      }
    },
    {
      name: 'tray',
      path: '/tray',
      component: function(resolve) {
        require(['@/views/Tray.vue'], resolve)
      }
    },
    {
      name: 'update',
      path: '/update',
      component: function(resolve) {
        require(['@/views/Update/index.vue'], resolve)
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.auth) {
    const userId = localStorage.getItem('userId')
    if (userId) {
      next()
    } else {
      store.commit('User/SET_SHOW_LOGIN', true)
      store.commit('App/SET_REDIRECT', to.fullPath)
      console.log(store.state.App.redirect)
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    ipcRenderer.send('set-tray-title', to.meta.title)
  }
})
export default router
