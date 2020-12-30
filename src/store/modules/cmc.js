import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        latest: []
    },
    mutations: {
        setLatest(state, latest) {
            state.latest = latest;
        }
    },
    getters: {
        getLatest(state) {
            let latest = state.latest

            return latest.map(function (obj) {
                let filteredKeys = [
                    'name',
                    'symbol',
                    'circulating_supply',
                    'total_supply'
                ];
                let subset = Object.keys(obj)
                    .filter(key => filteredKeys.indexOf(key) >= 0)
                    .reduce((obj2, key) => Object.assign(obj2, {[key]: obj[key]}), {});
                return {...subset, ...obj['quote']['USD'],};

                // let prices_obj = {};
                // if (typeof obj['chart']['prices'] !== "undefined") {
                //     prices_obj['prices'] = obj['chart']['prices'].map(d => d[1]);
                // }
                //
                // return {...subset, ...obj['quote']['USD'], ...prices_obj};
            })
        }
    },
    actions: {
        async getLatest(context) {
            try {
                // const latest = (await this._vm.axios.get('dummy_data/cmc_latest_merge.json')).data;
                const latest = (await this._vm.$flask.get('cmc/latest')).data;
                console.log('latest', latest);
                context.commit('setLatest', latest);

                // const

            } catch (error) {
                context.commit('showError', error);
            }
        },
    }
}

