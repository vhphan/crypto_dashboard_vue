<template>
  <div>
    <h2>Latest</h2>
    <Table
        :table-data="latestFromStore"
        :table-columns="tableColumns"
        :table-options="tableOptions"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Table from "@/components/Table";
import $ from 'jquery';
import 'jquery-sparkline'
import {router} from "@/router";
// import Trend from 'vuetrend'

export default {
  components: {Table},
  data() {
    const context = this;
    return {
      tableOptions: {
        rowClickMenu: [
          {
            label: "<i class='fas fa-chart-line'></i> View Charts",
            action: function (e, row) {
              console.log(e);
              let selectedCoin = row.getData().symbol
              router.push('/chart', function () {
                context.$store.dispatch('setSelectedCoin', selectedCoin);
              });
            }
          },
          {
            label: "<i class='fas fa-chart-area'></i> View Markets",
            action: function (e, row) {
              console.log(e, row);
            }
          },
          {
            separator: true,
          },
          {
            label: "<i class='fas fa-chart-bar'></i> View Historical Data",
            action: function (e, row) {
              console.log(e, row);
            }
          },
        ],
        layout: "fitDataTable",
        pagination: "local",
        paginationSize: 20,
        height: '90vh',
        rowClick: function (e, row) { //trigger an alert message when the row is clicked
          console.log("Row click callback " + row.getData().name + " Clicked!!!!");
        }
      }
    }

  },
  created() {
    this.$store.dispatch('getLatest');
  },
  computed: {
    ...mapGetters(
        {
          latestFromStore: 'getLatest'
        }
    ),
    tableColumns: function () {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      let context = this;
      let columns = [
        'name',
        'price',
        "percent_change_24h",
        "percent_change_7d",
        "market_cap",
        "volume_24h",
        "circulating_supply",
        // 'prices',
        'symbol'
      ];
      let numberColumns = [
        'price',
        "percent_change_24h",
        "percent_change_7d",
        "market_cap",
        "volume_24h",
        "circulating_supply",
      ];
      let currencyColumns = [
        'price',
        "market_cap",
        "volume_24h",
      ];
      let titleCase = this.titleCase;
      // let ctx = this;

      let modify = function (d1) {
        if (d1 === 'symbol') {
          return 'Sparklines'
        }
        let d2 = d1.replace('percent_change_', '');
        return titleCase(d2)
      };
      return columns.map(function (d) {
        let headerInfo = {};
        let otherInfo = {};
        if (numberColumns.includes(d)) {
          headerInfo = {
            headerFilter: 'input',
            headerFilterPlaceholder: 'Minimum',
            headerFilterFunc: '>=',
          }
          otherInfo = {
            ...otherInfo,
            hozAlign: "right",
            vertAlign: "middle",
            // , width: 100
          }
        } else {
          headerInfo = {
            headerFilter: true,
            vertAlign: "middle",

          }
        }
        if (d === 'symbol') {
          otherInfo = {
            ...otherInfo,
            headerFilter: false,
            headerSort: false,
            resizable: false,
            cssClass: 'spark',
            width: 240,
            // columnResized: function (column) {
            //   //column - column component of the resized column
            // },
          }
        }

        return {
          title: modify(d),
          field: d,
          formatter: function (cell, formatterParams, onRendered) {

            if (d === 'symbol') {
              let symbol = cell.getValue();
              onRendered(async function () {
                let hist = (await context.$flask(`/cg/historyhour/${symbol}`)).data;
                let data = hist.map(d => d['close'])
                $(cell.getElement()).sparkline(data, {
                  width: "100%",
                  height: "100%",
                  type: "line",
                  disableTooltips: false
                });
              });


              // cell.getElement().addClass("my-spark");

            } else {
              let finalVal;
              finalVal = typeof cell.getValue() === 'number' ? cell.getValue().toFixed(3) :
                  cell.getValue();
              if (currencyColumns.includes(d)) {
                finalVal = formatter.format(finalVal);
              }
              if (d.includes('percent_change')) {
                if (cell.getValue() > 0) {
                  finalVal = '<i class="fa fa-arrow-up float-left text-success"></i>' + finalVal + '%';
                } else {
                  finalVal = '<i class="fa fa-arrow-down float-left text-danger"></i>' + finalVal + '%';
                }
              }
              if (d === 'circulating_supply') {
                // const row = cell.getRow();
                // const symbol = row.getCell("symbol").getValue();
                const symbol = cell.getData().symbol;
                // console.log(cell.getData());
                finalVal = (parseFloat(finalVal)).toLocaleString('en') + ' ' + symbol;
              }
              return finalVal;
            }

          },
          ...headerInfo,
          ...otherInfo,

        }
      })
    }


  },
  methods: {
    coinClick(e) {
      console.log('coinClick', e);
    },
    rowWithContextMenu(row) {
      let data = row.getData();
      let element = row.getElement();

      console.log("Data:", data);
      console.log("Element:", element);
    }
  }
}
</script>

<style>


</style>