import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
    state: {
        selectedCoin: 'ETH',
        coinList: [],
        selectedCoinHistoryDaily: [],
        loading: false,
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
        },
        getSelectedCoinInfo(state, getters, rootState, rootGetters) {
            // console.log('rootState', rootState);
            const currencyFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            let percentColumns = [
                "percent_change_1h",
                "percent_change_24h",
                "percent_change_7d",
            ];
            let currencyColumns = [
                'price',
                "market_cap",
                "volume_24h",
            ];
            const selectedCoin = state.selectedCoin;

            const latest = rootGetters.getLatest;
            console.log('latest', latest);
            const latestForCoin = latest.filter(d => d['symbol'] === selectedCoin)[0];
            let formattedInfo = {};
            for (const [key, value] of Object.entries(latestForCoin)) {
                console.log(`${key}: ${value}`);
                if (currencyColumns.includes(key)) {
                    formattedInfo[key] = currencyFormatter.format(value);
                }
                if (percentColumns.includes(key)) {
                    formattedInfo[key] = value.toFixed(3) + '%';
                }
                if (key.includes('supply')) {
                    formattedInfo[key] = value.toFixed(3) + ' ' + latestForCoin.symbol;
                }
            }
            return {...latestForCoin, ...formattedInfo};
        }
    }
};