<template>
  <div>
    <h2>Chart</h2>
    <v-select v-model="selectedCoin" :options="coinList">
<!--      <option v-for="(coin, index) in coinList" :value="coin" :key="index">{{ coin }}</option>-->
    </v-select>
    <div class="row">
      <Candles v-bind:price-data="candlestickData.candles"
               v-bind:volume-data="candlestickData.volume"
               v-bind:dates="candlestickData.timestamp"
               v-bind:symbol="selectedCoin"
               class="col-lg-8"
      ></Candles>
      <CoinInfo class="col-lg-2"></CoinInfo>
    </div>
<!--    <ul>-->
<!--      <li v-for="(candle, id) in candlestickData.candles" :key="id">{{ candle[0] }}</li>-->
<!--    </ul>-->
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Candles from "@/components/Candles";
import CoinInfo from "@/components/CoinInfo";

export default {
  components: {CoinInfo, vSelect, Candles},
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
    selectedCoinInfo: {
      get(){
        return this.selectedCoinInfo;
      }
    },
    candlestickData(){
      let data = this.coinDailyData.data;
      if (typeof data == 'undefined') {
        return ['nothing yet..'];
      }
      let candles = data.map(d => {
        return [d['open'], d['close'], d['low'], d['high']];
      });
      let volume = data.map(d=> {
        return d['volumeto']-d['volumefrom'];
      })
      let timestamp = data.map(d=> {
        return [d['time'].substring(0,10)];
      })

      return {candles, volume, timestamp};
    }
  },
  created() {
    this.$store.dispatch('getCoinList');
    this.$store.dispatch('getSelectedCoinHistoryDaily');
  },

}
</script>

<style scoped>

</style>