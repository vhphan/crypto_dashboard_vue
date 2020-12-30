<template>
  <div ref="candle" class="candle">
  </div>
</template>

<script>
import * as echarts from 'echarts';
import def from '../data/default_data';

export default {
  name: "Candles",
  props: {
    priceData: {
      type: Array, default() {
        return def.candle.priceData
      }
    },
    volumeData: {
      type: Array, default() {
        return def.candle.volumeData
      }
    },
    dates: {
      type: Array, default() {
        return def.candle.dates
      }
    },
    symbol: {type: String, default: 'DEF'},
    upColor: {type: String, default: '#14b143'},
    downColor: {type: String, default: '#ef232a'},
  },
  data() {
    let priceData = this.priceData;
    let volumeData = this.volumeData;
    let dates = this.dates;
    let upColor = this.upColor;
    let downColor = this.downColor;
    let symbol = this.symbol;
    let legendData = [symbol];
    return {
      chartInstance: null,
      options: {
        backgroundColor: '#000',
        animation: false,
        legend: {
          left: 'center',
          data: legendData,
          textStyle: {color: '#fff'}
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          borderWidth: 1,
          padding: 10,
          textStyle: {},
          position: function (pos, params, el, elRect, size) {
            var obj = {top: 10};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          extraCssText: 'width: 170px'
        },
        axisPointer: {
          link: {xAxisIndex: 'all'},
          label: {
            backgroundColor: '#777'
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            brush: {
              type: ['lineX', 'clear']
            }
          }
        },
        brush: {
          xAxisIndex: 'all',
          brushLink: 'all',
          outOfBrush: {
            colorAlpha: 0.1
          }
        },
        visualMap: {
          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [{
            value: 1,
            color: downColor
          }, {
            value: -1,
            color: upColor
          }]
        },
        grid: [
          {
            left: '3%',
            right: '1%',
            height: '50%'
          }, {
            left: '3%',
            right: '1%',
            top: '57%',
            height: '10%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: dates,
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              z: 100
            },
            axisLabel: {show: false},
          },
          {
            type: 'category',
            gridIndex: 1,
            data: dates,
            scale: true,
            boundaryGap: false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
              label: {
                formatter: function (params) {
                  let seriesValue = (params.seriesData[0] || {}).value;
                  return params.value
                      + (seriesValue != null
                              ? '\n' + echarts.format.addCommas(seriesValue)
                              : ''
                      );
                }
              }
            },
            axisLabel: {color: '#fff'}

          }
        ],
        yAxis: [
          {
            scale: true,
            // splitArea: {
            //     show: true
            // }
            axisLabel: {color: '#fff'},
            splitLine: {show: false},
          },
          {
            scale: true,
            gridIndex: 1,
            // splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 50,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '93%',
            start: 50,
            end: 100
          }
        ],
        color: ['#1E96FC', '#A2D6F9', '#FCF300', '#FFC600'],
        series: [
          {
            name: symbol,
            type: 'candlestick',
            data: priceData,
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: null,
              borderColor0: null
            },
          },

          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: volumeData,
            itemStyle: {
              color: function (params) {
                if (priceData[params.dataIndex][1] > priceData[params.dataIndex][0]) {
                  return downColor;
                }
                return upColor;
              },
            }
          }
        ]
      },
    };
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.candle);
    this.chartInstance.setOption(this.options);
  }
}
</script>

<style scoped>
.candle {
  width: 800px;
  height: 400px;
}
</style>