import Vue from 'vue'
import Vuex from 'vuex'
// vuex 强缓存组件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// 封装本地存储， vuex-persistedstate
// vuex-persistedstate --> 持久化state
// 下载
// - yarn add vuex-persistedstate@3.2.1
// 引入
// - import createPersistedState from "vuex-persistedstate";
// 调用
// -  plugins: [createPersistedState()],

// 配置项
// key: 默认值是vuex
// storage: 存储的方式， 默认是本地存储
// reducer: 指定持久化那些数据 函数，return一个对象，对象就作为储存的value
// - 参数 state 把state里的数据当作当前路径存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'SET_TOKEN',
      // 本地存储 不写默认就是
      // storage: window.localStorage
      // 会话存储
      // storage: window.sessionStorage
      reducer({ tokenObj, myChannels, histories }) {
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      // 将tokon存在vuex
      state.tokenObj = token
    },
    /**
     *
     * @param {Array} channels 删除或添加后最新的channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    /**
     *
     * @param {*} histories 删除或者添加以后的新的搜索历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
