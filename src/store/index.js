import Vue from 'vue'
import Vuex from 'vuex'

import cmc from './modules/cmc'
import error from './modules/error'
import crypto from './modules/crypto'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    cmc,
    error,
    crypto
  }
})