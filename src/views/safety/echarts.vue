<template>
	<div>
		<div id="myChart" :style="{width: '400px', height: '300px'}"></div>
		<div id="lineChart" :style="{width: '600px', height: '400px'}"></div>
		<div id="mapChart" :style="{width: '1200px', height: '800px'}"></div>
	</div>
</template>

<script>
import echarts from "echarts";
require("echarts/map/js/world.js");
// require('echarts/map/js/china.js')
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
// require('echarts/lib/chart/bar')
// 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
    this.drawLine1();
    this.drawMap();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "ECharts 入门示例" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      });
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("lineChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },

    drawMap() {
      let myChart = echarts.init(document.getElementById("mapChart"));

      var geoCoordMap = {
        上海: [121.4648, 31.2891],
        尼日利亚: [-4.388361, 11.186148],
        美国洛杉矶: [-118.24311, 34.052713],
        香港邦泰: [114.195466, 22.282751],
        美国芝加哥: [-87.801833, 41.870975],
        加纳库马西: [-4.62829, 7.72415],
        英国曼彻斯特: [-1.657222, 51.886863],
        德国汉堡: [10.01959, 54.38474],
        哈萨克斯坦阿拉木图: [45.326912, 41.101891],
        俄罗斯伊尔库茨克: [89.116876, 67.757906],
        巴西: [-48.678945, -10.493623],
        埃及达米埃塔: [31.815593, 31.418032],
        西班牙巴塞罗纳: [2.175129, 41.385064],
        柬埔寨金边: [104.88659, 11.545469],
        意大利米兰: [9.189948, 45.46623],
        乌拉圭蒙得维的亚: [-56.162231, -34.901113],
        莫桑比克马普托: [32.608571, -25.893473],
        阿尔及利亚阿尔及尔: [3.054275, 36.753027],
        阿联酋迪拜: [55.269441, 25.204514],
        匈牙利布达佩斯: [17.108519, 48.179162],
        澳大利亚悉尼: [150.993137, -33.675509],
        美国加州: [-121.910642, 41.38028],
        澳大利亚墨尔本: [144.999416, -37.781726],
        墨西哥: [-99.094092, 19.365711],
        加拿大温哥华: [-123.023921, 49.311753]
      };
      var BJData = [
        [
          {
            name: "尼日利亚",
            value: 1000
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "美国洛杉矶",
            value: 2370
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "香港邦泰",
            value: 3130
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "美国芝加哥",
            value: 2350
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "加纳库马西",
            value: 5120
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "英国曼彻斯特",
            value: 3110
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "德国汉堡",
            value: 6280
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "哈萨克斯坦阿拉木图",
            value: 7255
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "俄罗斯伊尔库茨克",
            value: 8125
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "巴西",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "埃及达米埃塔",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "西班牙巴塞罗纳",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "柬埔寨金边",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "意大利米兰",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "乌拉圭蒙得维的亚",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "莫桑比克马普托",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "阿尔及利亚阿尔及尔",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "阿联酋迪拜",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "匈牙利布达佩斯",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "澳大利亚悉尼",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "美国加州",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "澳大利亚墨尔本",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "墨西哥",
            value: 3590
          },
          {
            name: "上海"
          }
        ],
        [
          {
            name: "加拿大温哥华",
            value: 3590
          },
          {
            name: "上海"
          }
        ]
      ];
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value
              },
              {
                coord: toCoord
              }
            ]);
          }
        }
        return res;
      };

      var series = [];
      [["上海", BJData]].forEach(function(item, i) {
        series.push(
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5 //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 0, //尾迹线条透明度
                curveness: 0.3 //尾迹线条曲直度
              }
            },

            data: convertData(item[1])
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: "{b}" //圆环显示文字
              },
              emphasis: {
                show: true
              }
            },
            symbol: "circle",
            symbolSize: function(val) {
              return 4 + val[2] / 1000; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[0].name,
                value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
              };
            })
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#00ffff",
                formatter: "{b}",
                textStyle: {
                  color: "#0bc7f3"
                }
              },
              emphasis: {
                show: true
              }
            },
            symbol: "pin",
            symbolSize: 30,
            itemStyle: {
              normal: {
                show: true,
                color: "#9966cc"
              }
            },
            data: [
              {
                name: item[0],
                value: geoCoordMap[item[0]].concat([100])
              }
            ]
          }
        );
      });

      myChart.setOption({
        backgroundColor: "#000",
        tooltip: {
          trigger: "item",
          backgroundColor: "#1540a1",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>数据：" +
              value;
            return res;
          }
        },
        visualMap: {
          //图例值控制
          min: 0,
          max: 10000,
          show: false,
          calculable: true,
          color: ["#0bc7f3"],
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "world",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, //是否允许缩放
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "180%",
          itemStyle: {
            normal: {
              color: "#04284e", //地图背景色
              borderColor: "#5bc1c9" //省市边界线
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)" //悬浮背景
            }
          }
        },

        series: series
      });
    }
  }
};
</script>

<style>
</style>