import Vue from 'vue'
import Vuex from 'vuex'
import persistStatePlugin from './plugins/keep-state'
import modules from './modules'
import app from './modules/Home'
Vue.use(Vuex)
const myPlugin = persistStatePlugin(['User'])

const store = new Vuex.Store({
  modules: {
    ...modules,
    app
  },
  plugins: [myPlugin]
})
export default store
