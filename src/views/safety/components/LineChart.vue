<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')

import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '380px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()    
    function debounce(func, wait, immediate) {
      let timeout, args, context, timestamp, result;

      const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };

      return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    }
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }


    //   const sidebarElm1 = document.getElementById("icon-submenu");
    // sidebarElm1.addEventListener("click", this.__resizeHanlder);

    const sidebarElm2 = document.getElementById("myDIV");
    sidebarElm2.addEventListener("webkitAnimationEnd", this.__resizeHanlder);
    
    // 监听侧边栏的变化
    // const sidebarElm1 = document.getElementsByClassName("sub-menu")[0];
    // sidebarElm1.addEventListener("webkitAnimationEnd", this.__resizeHanlder);
    // console.log(111)

    // 监听侧边栏的变化
    // const sidebarElm = document.getElementsByClassName("el-col")[0];
    // sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
    // console.log(222)

    const sidebarElm = document.getElementsByClassName("Menu")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)
    // const sidebarElm2 = document.getElementsByClassName("Menu")[0];
    // sidebarElm2.removeEventListener("transitionend", this.__resizeHanlder);

    // const sidebarElm1 = document.getElementsByClassName("sub-menu")[0];
    // sidebarElm1.removeEventListener("transitionend", this.__resizeHanlder);
    // const sidebarElm1 = document.getElementsByClassName("toggle-subMenu")[0];
    // sidebarElm1.removeEventListener("click", this.__resizeHanlder);

    // const sidebarElm = document.getElementsByClassName("el-col")[0];
    // sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);

    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ expectedData, actualData ,lineChartTime} = {}) {
      this.chart.setOption({
        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: lineChartTime,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['文件一致性检测', '异常登陆']
        },
        series: [{
          name: '文件一致性检测', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '异常登陆',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
