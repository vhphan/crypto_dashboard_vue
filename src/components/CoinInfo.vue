<template>
  <div>
    <table v-if="coinInfoData" class="table table-dark">
      <tr v-for="key in Object.keys(coinInfoData)" :key="key">
        <th scope="row">{{ key }}</th>
        <td>{{ coinInfoData[key] }}</td>
      </tr>
    </table>
    <div v-else>
      <p>Nothing here</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "CoinInfo",
  computed: {
    ...mapGetters({
      coinInfoData: 'getSelectedCoinInfo'
    })
  }
}
</script>

<style scoped>

</style>