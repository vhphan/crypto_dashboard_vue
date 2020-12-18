import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const errorSystem = {
    state: {
        show: false,
        text: 'Error'
    },
    mutations: {
        showError(state, message) {
            state.show = true;
            state.text = message;
        }
    },

};
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        error: errorSystem
    }
})
