<template>
  <div>
    <h2>Chart</h2>
    <v-select v-model="selectedCoin" :options="coinList">
<!--      <option v-for="(coin, index) in coinList" :value="coin" :key="index">{{ coin }}</option>-->
    </v-select>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  components: {vSelect},
  name: "Chart",
  // data() {
  //   return {}
  // },
  computed: {
    ...mapState(
        {
          coinList: state => state.crypto.coinList,
          coinDailyData: state => state.crypto.selectedCoinHistoryDaily
          // selectedCoin: state => state.crypto.coinList.selectedCoin
        }
    ),
    ...mapGetters({
      selectedCoinFromStore: 'getSelectedCoin'
    }),
    selectedCoin: {
      get() {
        // return this.$store.state.crypto.selectedCoin;
        return this.selectedCoinFromStore;
      },
      set(newSelectedCoin) {
        this.$store.dispatch('setSelectedCoin', newSelectedCoin);
      }
    },
    candlestickData(){
      let data = this.coinDailyData.data;
      let ohlc = data.map(d => {
        return [d['open'], d['high'], d['low'], d['close']]
      })

      console.log(ohlc);
      return ohlc;
    }
  },
  created() {
    this.$store.dispatch('getCoinList');
    this.$store.dispatch('getSelectedCoinHistoryDaily');
  }
}
</script>

<style scoped>

</style>