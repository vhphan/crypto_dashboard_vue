import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        selectedCoin: 'ETH',
        coinList: [],
        selectedCoinHistoryDaily: [],
    },
    mutations: {
        setCoinList(state, coinList) {
            state.coinList = coinList;
        },
        setSelectedCoin(state, newSelectedCoin) {
            state.selectedCoin = newSelectedCoin;
        },
        setSelectedCoinHistoryDaily(state, hist) {
            state.selectedCoinHistoryDaily = hist;
        }
    },
    actions: {
        async setSelectedCoin(context, newSelectedCoin) {
            await context.commit('setSelectedCoin', newSelectedCoin)
            await context.dispatch('getSelectedCoinHistoryDaily');
        },
        async getCoinList(context) {
            try {
                let coins = (await this._vm.$flask.get('cmc/latest')).data;
                let coinList = coins.map(function (coin) {
                    return coin['symbol']
                });
                context.commit('setCoinList', coinList);
            } catch (error) {
                context.commit('showError', error);
            }
        },
        async getSelectedCoinHistoryDaily(context) {
            let selectedCoin = context.state.selectedCoin;
            let coinHist = await this._vm.$flask.get(`/cg/history/${selectedCoin}`);
            console.log('coinHist', coinHist);
            context.commit('setSelectedCoinHistoryDaily', coinHist);

        }
    },
    getters: {
        getSelectedCoin(state) {
            return state.selectedCoin;
        }
    }
};