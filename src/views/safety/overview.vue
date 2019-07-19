<template>
    <div class='safety_overview'>
        <!-- 头部 -->
        <el-row :gutter="20">
            <el-col :span="10" >
                <div class="safety-block">
                    <div class="block-tip border_b_1">ECS保护状态</div>
                    <div class="block-article">
                        <el-row class="h90"> 
                            <el-col :span="4" class="grid-content">
                                <p class="m_b_7_t_6">
                                  <router-link :to="{name:'echartsMap'}">
                                    <span class="font_28">{{amount.hostListCount}}</span>
                                  </router-link>
                                    <span class="font_12_c">(台)</span>
                                </p>
                                <span class="font_12" >总数量</span>
                            </el-col>
                            <el-col :span="5" class="grid-content">
                                <p class="m_b_7_t_6">
                                    <router-link :to="{name:'map'}">
                                    <span class="font_28" style="color:#3dd6c1">{{amount.inProtectHostCount}}</span>
                                    </router-link>
                                    <span class="font_12_c">(台)</span>
                                </p>
                                <span class="font_12" >防护中</span>
                            </el-col>
                            <el-col :span="5"  class="grid-content">
                                <p class="m_b_7_t_6">
                                    <span class="font_28">{{amount.closeProtectHostCount}}</span>
                                    <span class="font_12_c">(台)</span>
                                </p>
                                <span class="font_12 c_666">关闭防护</span>
                            </el-col>
                            <el-col :span="5" class="grid-content">
                                <p class="m_b_7_t_6">
                                    <span class="font_28">{{amount.notActiveHostCount}}</span>
                                    <span class="font_12_c">(台)</span>
                                </p>
                                <span class="font_12 c_666">未激活</span>
                            </el-col>
                            <el-col :span="5"  class="grid-content">
                                <p class="m_b_7_t_6">
                                    <span class="font_28" style="color:#f75c68">{{amount.outlineHostCount}}</span>
                                    <span class="font_12_c">(台)</span>
                                </p>
                                <span class="font_12"  >离线</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="safety-block">
                    <div class="block-tip">异常登录</div>
                    <div class="block-article">
                        <el-row class="h90"> 
                            <el-col :span="14" class="grid-content">
                                <div class="err-login"></div>
                            </el-col>
                            <el-col :span="10"  class="grid-content">
                                <p class="m_15">
                                    <span class="font_28">{{amount.exceptionEventCount}}</span>
                                    <span class="font_12_c">(条)</span>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="7" >
                <div class="safety-block">
                    <div class="block-tip">文件一致性检测</div>
                    <div class="block-article">
                        <el-row class="h90"> 
                            <el-col :span="14" class="grid-content">
                                <div class="monitor-filetest"></div>
                            </el-col>
                            <el-col :span="10"  class="grid-content">
                                <p class="m_15">
                                    <span class="font_28">{{amount.integrityEventCount}}</span>
                                    <span class="font_12_c">(条)</span>
                                </p>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
        </el-row>   
        <!-- 主体-->
        <div class="main-chart" style="margin-top:20px;">
            <div class="chart-tip border_b_1">
                <p >安全检测</p>
                <div class="float_r">
                    <el-radio-group v-model="chooseDays" size="small" id='myDIV'  @change="getExceptionEvent">
                        <el-radio-button label="7" >7天</el-radio-button>
                        <el-radio-button label="30">30天</el-radio-button>
                    </el-radio-group>
                    <!-- <button class="button-time button-active">7天</button>
                    <button class="button-time ">30天</button>       -->
                </div>
            </div>
            <el-row :gutter="20" >
                <el-col :span="14"  class="border_r_1"  style="padding:20px 20px 20px 30px;">
                    <p class="font_12">文件一致性检测/异常登录事件趋势</p>
                    <line-chart :chart-data="lineChartData"  v-loading='loading1'></line-chart>
                </el-col>
                    <el-col :span="10" style="padding:20px 30px 20px 20px;">
                    <p class="font_12">TOP安全事件主机</p>
                    <div class="margin_t_25" v-loading='loading2'>
                        <ul class="box_Card">
                            <li class="center" v-if='boxLists.length == 0'>暂无数据</li>
                            <li v-for="(item,index) in boxLists" :key=index>
                                <p class="box_txt">{{item.agent_ip}}</p>
                                <div class="box_chart">
                                    <div class="bar_chart" v-bind:style="{width: item.widthData}"></div>
                                    <span class="bar_num">{{item.sum}}(条)</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row> 
        </div>    
    </div>
</template>
<script>
import LineChart from "./components/LineChart";
import { setsafetyUsername, setsafetyUserid } from "@/utils/auth";
import { amounts, exceptionEvent, getToken } from "@/api/safety";
import axios from "axios";
export default {
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: {
        actualData: [],
        lineChartTime: [],
        expectedData: []
      },
      boxLists: [{ agent_ip: "", sum: 0, host_Id: "", widthData: "0%" }],
      chooseDays: "7",
      amount: {
        hostListCount: 0,
        inProtectHostCount: 0,
        closeProtectHostCount: 0,
        exceptionEventCount: 0,
        notActiveHostCount: 0,
        outlineHostCount: 0,
        integrityEventCount: 0
      },
      loginToken: "",
      loading1: true,
      loading2: true
    };
  },
  created() {
    this.getAmounts();
    this.getExceptionEvent();
    this.getData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    getAmounts() {
      let ser = "remoteGetHostInfoByUser";
      amounts(ser)
        .then(res => {
          console.log("获取总览数据成功", res);
          this.amount = res;
        })
        .catch(err => {
          console.log("获取总览数据失败", err);
        });
    },
    getExceptionEvent() {
      this.getRemoteGetEvent();
      this.loading1 = true;
      let ser = "remoteGetExceptionEventByUser";
      let paramsData = "<days>" + this.chooseDays + "</days>";
      exceptionEvent(ser, paramsData)
        .then(res => {
          console.log("获取异常登录事件成功", res);
          var list = res.exceptionEventList;
          var list1 = res.integrityEventList;
          var newList = [];
          var newList1 = [];
          var newListTime = [];
          for (var i = 0; i < list.length; i++) {
            newList.push(list[i].sum);
            newListTime.push(list[i].createTime);
          }
          for (var j = 0; j < list1.length; j++) {
            newList1.push(list1[j].sum);
          }
          this.lineChartData.actualData = newList;
          this.lineChartData.lineChartTime = newListTime;
          this.lineChartData.expectedData = newList1;
          this.loading1 = false;
        })
        .catch(err => {
          console.log("获取异常登录事件失败", err);
        });
    },
    getRemoteGetEvent() {
      this.loading2 = true;
      let ser = "remoteGetEventCount";
      let paramsData = "<days>" + this.chooseDays + "</days>";
      exceptionEvent(ser, paramsData)
        .then(res => {
          console.log("获取安全事件主机信息成功", res);
          var list = res.list;
          var lineWidth = "";
          for (var i = 0; i < list.length; i++) {
            lineWidth = (list[i].sum / list[0].sum * 0.8 * 100).toFixed(2);
            list[i].widthData = lineWidth > 0.15 ? lineWidth + "%" : "0.15%";
          }
          this.boxLists = list;
          this.loading2 = false;
        })
        .catch(err => {
          console.log("获取安全事件主机信息失败", err);
        });
    },
    getData() {
      console.log(1111);
      let date =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
        "<soapenv:Header/><soapenv:Body>" +
        "<ser:remoteGetHostInfoByUser><Token>BBE5B3A0F6738FCE5D2BF5C283CE95E8</Token>" +
        "</ser:remoteGetHostInfoByUser>" +
        "</soapenv:Body>" +
        "</soapenv:Envelope>";
      axios({
        url: "http://172.18.208.18:8080/services/hostService?wsdl",
        method: "post",
        data: date
        // withCredentials: true
      })
        .then(response => {
          // this.testData = response.data
          console.log(response, 5555);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
// @import "./style.css";
#myDIV {
  background: #fff;
  animation: mymove 500ms;
  /*Safari 和 Chrome:*/
  -webkit-animation: mymove 500ms;
}

@keyframes mymove {
  from {
    background-color: #fff;
  }
  to {
    background-color: #fff;
  }
}

/*Safari 和 Chrome:*/
@-webkit-keyframes mymove {
  from {
    background-color: #fff;
  }
  to {
    background-color: #fff;
  }
}

.safety_overview {
  .p_t_l_0 {
    padding-left: 0;
    padding-top: 0;
    padding-right: 0;
    // padding: 0;
    color: #333;
  }
  .safety-block {
    height: 130px;
    background-color: #fff;
  }
  .block-tip {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }
  .border_b_1 {
    border-bottom: 1px solid #f1f4f9;
  }
  .border_r_1 {
    border-right: 1px solid #f1f4f9;
  }
  .margin_t_25 {
    margin-top: 25px;
  }
  .font_12_c {
    font-size: 12px;
    color: #c0c9dd;
  }
  .font_12 {
    font-size: 12px;
  }
  .c_666 {
    color: #666666;
  }
  .font_28 {
    font-size: 28px;
    margin: 2px;
  }
  .m_b_7_t_6 {
    margin-bottom: 7px;
    margin-top: 6px;
  }
  .m_15 {
    margin-top: 15px;
    margin-left: 15px;
  }
  .p_20 {
    padding: 20px;
  }
  .center {
    text-align: center;
  }
  .h90 {
    height: 90px;
    text-align: center;
    padding: 10px 20px;
    .grid-content {
      vertical-align: middle;
    }
  }
  .err-login {
    width: 125px;
    height: 64px;
    display: inline-block;
    background: url(../../assets/safety/monitor-Abnormal.png) no-repeat center
      center;
  }
  .monitor-filetest {
    width: 125px;
    height: 64px;
    display: inline-block;
    background: url(../../assets/safety/monitor-filetest.png) no-repeat center
      center;
  }
  .p_t_l_0_update {
    background-color: #fff;
    height: 130px;
    width: 161px;
    float: right;
  }
  .p_t_l_0_update_w1 {
    display: block;
    text-align: center;
    font-size: 12px;
    height: 22px;
    padding-top: 18px;
  }
  .p_t_l_0_update_w2 {
    text-align: center;
    color: #fff;
    font-size: 14px;
    display: block;
    width: 161px;
    height: 90px;
    line-height: 100px;
    background: url(../../assets/safety/monitor-update.png) no-repeat top center;
  }
  .main-chart {
    width: 100%;
    height: 473px;
    background-color: #fff;
    // margin-top: 20px;
  }
  .chart-tip {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    p {
      display: inline-block;
    }
    .float_r {
      float: right;
      .el-radio-group {
        margin-top: -3px;
      }
      .el-radio-button:first-child .el-radio-button__inner {
        height: 25px;
        line-height: 25px;
        width: 60px;
        padding: 0;
        color: #333;
        border: 1px solid #fff;
        background-color: #fff;
      }
      .el-radio-button:last-child .el-radio-button__inner {
        height: 25px;
        line-height: 25px;
        width: 60px;
        padding: 0;
        color: #333;
        border: 1px solid #fff;
        background-color: #fff;
        box-shadow: none;
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        border: 1px solid #3cc1f0;
        color: #3cc1f0;
        border-radius: 4px;
        background-color: #fff;
      }
    }
  }

  .bar_chart {
    width: 83%;
    height: 15px;
    background-color: #f9cd76;
    float: left;
  }
  .bar_num {
    float: right;
  }
  .box_Card {
    .box_chart {
      width: 100%;
      height: 20px;
      margin: 10px 15px 15px 0;
    }
    li:nth-child(2) div div {
      background-color: #f8d287;
    }
    li:nth-child(3) div div {
      background-color: #f5d69a;
    }
    li:nth-child(4) div div {
      background-color: #f4ddae;
    }
    li:nth-child(5) div div {
      background-color: #f5e5c5;
    }
    li:nth-child(6) div div {
      background-color: #f8ecd4;
    }
  }
  .box_txt {
    width: 200px;
  }
}
.el-table th > .cell {
  color: #333;
  font-weight: 700;
}
</style>