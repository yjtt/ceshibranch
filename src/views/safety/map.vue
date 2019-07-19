<template>
   	<div id="myChart" :style="{width: '400px', height: '300px'}"></div>
</template>

<script>
import echarts from "echarts";
require("echarts/map/js/china.js");
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawMap();
  },
  methods: {
    drawMap() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      function mapTooltipClick(name) {
        alert(name);
      }
      function tooltipCharts() {
        console.log(arguments[0]);
        var myChart = echarts.init(document.getElementById("tooltipBarId"));
        var option = {
          tooltip: {},
          dataset: {
            source: [
              [
                "xAxis",
                "201701",
                "201702",
                "201703",
                "201704",
                "201705",
                "201706",
                "201707",
                "201708",
                "201709",
                "20170",
                "201710",
                "20170",
                "201801"
              ],
              [
                "amount",
                41.1,
                30.4,
                65.1,
                53.3,
                83.8,
                98.7,
                65.1,
                53.3,
                41.1,
                30.4,
                53.3,
                41.1,
                53.3,
                83.8
              ]
            ]
          },
          xAxis: {
            type: "category",
            interval: true,
            axisLabel: {
              rotate: 45
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {},
          color: ["red", "#F5A623"],
          grid: {
            show: true,
            backgroundColor: "#FAFAFA",
            left: 30,
            right: 20,
            top: 20
          },
          series: [
            {
              type: "bar",
              smooth: true,
              seriesLayoutBy: "row",
              barWidth: 10
            }
          ]
        };
        myChart.setOption(option);
      }
      myChart.setOption ( {
        visualMap: {
          min: 0,
          max: 2000,
          left: "center",
          top: "bottom",
          calculable: false,
          orient: "horizontal",
          inRange: {
            color: ["#e0ffff", "#006edd"]
          }
        },
        tooltip: {
          padding: 10,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none"
          },
          formatter: function(params) {
            return params.name + "<br />" + params.data["value"];
          }
        },
        series: [
          {
            name: "yes",
            type: "map",
            mapType: "china",
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                borderColor: "grey",
                areaColor: "#2678b2",
                label: {
                  show: false
                }
              },
              emphasis: {
                areaColor: "lightsteelblue",
                label: {
                  show: false
                }
              }
            },
            data: [
              {
                name: "北京",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "天津",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "上海",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "重庆",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "河北",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "河南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "云南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "辽宁",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "黑龙江",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "湖南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "安徽",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "山东",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "新疆",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "江苏",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "浙江",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "江西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "湖北",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "广西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "甘肃",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "山西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "内蒙古",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "陕西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "吉林",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "福建",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "贵州",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "广东",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "青海",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "西藏",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "四川",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "宁夏",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "海南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "台湾",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "香港",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              },
              {
                name: "澳门",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000)
                ]
              }
            ]
          }
        ]
      });
      var count = 0;
      var timeTicket = null;
      var dataLength = option.series[0].data.length;
      timeTicket && clearInterval(timeTicket);
      timeTicket = setInterval(function() {
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0
        });
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: count % dataLength
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: count % dataLength
        });
        count++;
      }, 1000);

      myChart.on("mouseover", function(params) {
        console.log(params);
        clearInterval(timeTicket);
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0
        });
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
      });
      myChart.on("mouseout", function(params) {
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function() {
          count++;
        }, 1000);
      });
    }
  }
};
</script>

<style>
</style>