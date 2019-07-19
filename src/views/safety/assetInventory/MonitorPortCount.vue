<template>
  <div class="porcessCount">
    <div class="top">
      <el-row>
        <el-col :span="24">
          <div class="left">
            <p class="node_name">监听端口清点</p>
            <span class="areaButton"
                  :class="{'areaButton-bg':currentId==zone.id}"
                  @click="changeRegion(zone,index)"
                  v-for="(zone,index) in zoneList" :key='index'>
                  {{zone.zoneName + '（' + zone.count +'）'}}
			      </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="content">
      <div class="template_title">
        <el-radio-group v-model="template_type" size="small" fill="#3dc7fa">
          <el-radio-button label="default">最新数据</el-radio-button><el-radio-button label="custom">历史变动</el-radio-button>
        </el-radio-group>
      </div>
      <!-- 最新数据 star -->
      <div class="template_default" v-show="isDefault" v-loading='loading_N'>
        <div class="fl_r">
          <el-input placeholder="请输入云服务器IP或名称" v-model="search_new_pro" class="input-with-select" size="small" style="width:350px" @change="changeSearch" @keyup.native='showCount'>
            <el-button slot="append" icon="el-icon-search" @click="getNewestProList"></el-button>
          </el-input>
        </div>
        <!-- {{newestProList}} -->
        <el-table
            :show-overflow-tooltip="true"
            :data="newestProList"
            style="width: 100%">
          <!-- <el-table-column
            type="selection"
            width="50">
          </el-table-column> -->
            <el-table-column
              label="云服务器名称"
              width="180">
              <template slot-scope="scope">
                <router-link :to='{ name: "serverdetails",params: {ip:scope.row.agent_ip,id:scope.row.host_id,zone_id: currentId,guid: scope.row.agent_guid,integrityEventID:"1130",atype: atype}}'> 
                  <!-- <el-button size="mini" type="text">
                    {{scope.row.agent_ip}}
                  </el-button> -->
                  <div class="serviceName">
                    {{scope.row.hostname}}
                  </div>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="端口号">
              <template slot-scope="scope">
                {{scope.row.port==""?"--":scope.row.port}}
              </template>
            </el-table-column>
            <el-table-column
              label="网络协议" >
              <template slot-scope="scope" >
                {{scope.row.proto==""?"--":scope.row.proto}}
              </template>
            </el-table-column>
            <el-table-column
              label="对应进程">
              <template slot-scope="scope">
                {{scope.row.program_name==""?"--":scope.row.program_name}}
              </template>
            </el-table-column>
            <el-table-column
              label="绑定监听IP">
              <template slot-scope="scope">
                {{scope.row.listen_ip==""?"--":scope.row.listen_ip}}
              </template>
            </el-table-column>
               <el-table-column
              label="上报时间"
              width="200">
              <template slot-scope="scope">
                {{scope.row.LogDate==""?"--":scope.row.LogDate}}
              </template>
            </el-table-column>
        </el-table>
          <div class="content-bottom">
            <el-pagination
              v-if="totalPage_NewestProList>10"
              @size-change="handleSizeChange_N_Pro"
              @current-change="handleCurrentChange_N_Pro"
              :current-page="currentPage_NewestProList"
              :page-size="NewestProListSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalPage_NewestProList">
          </el-pagination>
          <el-pagination
              v-else
              layout="">
          </el-pagination>
        </div>
      </div>
      <!-- 最新数据 end -->
      
      <!-- 历史变动 star -->
      <div class="template_custom" v-show="!isDefault" v-loading='loading_H'>
        <div class="fl_r">
          <el-input placeholder="请输入云服务器IP或名称" v-model="search_history_pro" class="input-with-select" size="small" style="width:350px" @change="changeSearch">
            <el-button slot="append" icon="el-icon-search" @click="getHistorytProList"></el-button>
          </el-input>
        </div>
				<el-table
            :show-overflow-tooltip="true"
            :data="historyProList"
            style="width: 100%">
          <!-- <el-table-column
            type="selection"
            width="50">
          </el-table-column> -->
            <el-table-column
              label="云服务器名称"
              width="130">
              <template slot-scope="scope">
                <router-link :to='{ name: "serverdetails",params: {ip:scope.row.agent_ip,id:scope.row.host_id,zone_id: currentId,guid: scope.row.agent_guid,integrityEventID:"1130", atype: atype}}'> 
                  <!-- <el-button size="mini" type="text">
                    {{scope.row.agent_ip}}
                  </el-button> -->
                  <div class="serviceName">{{scope.row.hostname}}</div>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="端口号">
              <template slot-scope="scope">
                {{scope.row.port==""?"--":scope.row.port}}
              </template>
            </el-table-column>
            <el-table-column
              label="变动状态"
              >
              <template slot-scope="scope">
                <span :class="{'red':scope.row.status=='del','green':scope.row.status!='del'}">{{scope.row.status=='del'?'停止':'新增'}}</span>
                <!-- <span>{{scope.row.status=='del'?'停止':'新增'}}</span> -->
              </template>
            </el-table-column>
            <el-table-column
              label="网络协议" width="150">
              <template slot-scope="scope" >
                {{scope.row.proto==""?"--":scope.row.proto}}
              </template>
            </el-table-column>
            <el-table-column
              label="对应进程"
               width="180">
              <template slot-scope="scope">
                {{scope.row.program_name==""?"--":scope.row.program_name}}
              </template>
            </el-table-column>
            <el-table-column
              label="绑定监听IP">
              <template slot-scope="scope">
                {{scope.row.listen_ip==""?"--":scope.row.listen_ip}}
              </template>
            </el-table-column>
               <el-table-column
              label="变动时间"
              width="180">
              <template slot-scope="scope">
                {{scope.row.changed_time==""?"--":scope.row.changed_time}}
              </template>
            </el-table-column>
        </el-table>
        <div class="content-bottom">
            <el-pagination
              v-if="totalPage_HistoryProList>10"
              @size-change="handleSizeChange_H_Pro"
              @current-change="handleCurrentChange_H_Pro"
              :current-page="currentPage_HistoryProList"
              :page-size="historyProListSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalPage_HistoryProList">
          </el-pagination>
          <el-pagination
              v-else
              layout="">
          </el-pagination>
  
        </div>
      <!-- 历史变动 end -->
      
      </div>

    </div>
  </div>
</template>

<script>
import i18n from "@/lang";
import { portEventService,serverRegion} from "@/api/safety";
export default {
  data() {
    return {
      name: i18n.common.processInventory,
      template_type: "default",

      newestProList: [],
      NewestProListSize: 10,
      ecmListData: [],
      currentPage_NewestProList: 1,
      totalPage_NewestProList: 1,
      search_new_pro: "",
      search_history_pro: "",
      loading_N: true,
      atype: 1,
      historyProList: [],
      historyProListSize: 10,
      currentPage_HistoryProList: 1,
      totalPage_HistoryProList: 1,
      search_his_pro: "",
      loading_H: true,
      currentId: 1,
      zoneList: [],
      zoneType: 'new',
      areas: [
        {
          name: "广州",
          uuid: "3"
        },
        {
          name: "陕西",
          uuid: "0"
        }
      ]
    };
  },
  created() {
    this.getExceptionRegion();

    // this.getNewestProList();
    // this.getHistorytProList();
    
  },
  methods: {
    // 切换地区时重新调用表格
    changeRegion(zone,index) {
      console.log(123,zone,index)
      this.currentId = zone.id
      // 切换地区时当前页切换到第一页
      this.currentPage_NewestProList = 1,
      this.currentPage_HistoryProList = 1,
      this.search_new_pro = '';
      this.search_history_pro = '';
      this.getNewestProList()
      this.getHistorytProList();
      
    },
    // 获取地区
    getExceptionRegion() {
      let ser = "remoteAllZone";
      serverRegion(ser,'')
        .then(res => {
          console.log("获取地区成功", res);
          let zoneAll = res.zonelist;
          for (var key in zoneAll) {
            zoneAll[key].count = 0;
          }
          this.getexceptionRegionNum(zoneAll);
        })
        .catch(err => {
          console.log("获取地区失败", err);
        });
    },
    //获取地区数量
    getexceptionRegionNum(zoneAll) {
      let ser1 = "remoteGetPortZoneList";
      let paramData = "<type>"+this.zoneType+"</type>";      
      portEventService(ser1,paramData)
        .then(res => {
          console.log("获取地区数量成功", res);
          if (res.zoneList.length == 0) {
            this.currentId = zoneAll[0].id;
            this.zoneList = zoneAll;
            this.getNewestProList();
            this.getHistorytProList();
          } else {
            for (var item in zoneAll) {
              let zoneAllNum = res.zoneList;
              for (var num in zoneAllNum) {
                if (zoneAll[item].id === zoneAllNum[num].zoneId) {
                  zoneAll[item].count = zoneAllNum[num].count;
                }
              }
            }
            this.zoneList = zoneAll;
            for (var i = 0; i < zoneAll.length; i++) {
              if (zoneAll[i].count > 0) {
                this.currentId = zoneAll[i].id;
                this.getNewestProList();
                this.getHistorytProList();
                return;
              }
            }
          }
          
    
        })
        .catch(err => {
          console.log("获取地区数量失败", err);
        });
    },
    changeSearch(value){
      this.currentPage_NewestProList = 1;
      this.currentPage_HistoryProList = 1;
    },
    handleSizeChange_N_Pro(val) {
      console.log(`每页 ${val} 条`);
      this.NewestProListSize = val;
      this.currentPage_NewestProList = 1;
      console.log(this.NewestProListSize);
      this.getNewestProList();
    },
    handleCurrentChange_N_Pro(val) {
      this.currentPage_NewestProList = val;
      this.getNewestProList();
    },
    handleSizeChange_H_Pro(val) {
      console.log(`每页 ${val} 条`);
      this.historyProListSize = val;
      this.currentPage_HistoryProList = 1;
      console.log(12345,this.currentPage_HistoryProList )
      
      console.log(this.historyProListSize);
      this.getHistorytProList();
    },
    handleCurrentChange_H_Pro(val) {
      this.currentPage_HistoryProList = val;
      console.log(123,this.currentPage_HistoryProList )
      this.getHistorytProList();
    },
     //sll添加
    showCount:function(ev){
      // console.log(88888888888)
      if(ev.keyCode == 13){
        // alert('你按回车键了');
        this.getNewestProList();
      }
    },
    getNewestProList() {
      this.loading_N = true;
      let ser = "getPortNewEventByAdminId",
        paramData =
          "<areaZoneId>"+this.currentId+"</areaZoneId><condition>" +
          this.search_new_pro +
          "</condition><page>" +
          this.currentPage_NewestProList +
          "</page><onePageSize>" +
          this.NewestProListSize +
          "</onePageSize>";
      portEventService(ser, paramData)
        .then(res => {
          console.log("获取最新数据成功", res);
          this.newestProList = res.newList;
          this.totalPage_NewestProList = res.totalElements;
          this.loading_N = false;
        })
        .catch(err => {
          console.log("获取最新数据失败", err);
        });
    },
    getHistorytProList() {
      console.log(2);
      this.loading_H = true;
      let ser = "getPortHistoryEventByAdminId",
        paramData =
          "<areaZoneId>"+this.currentId+"</areaZoneId><condition>" +
          this.search_history_pro +
          "</condition><page>" +
          this.currentPage_HistoryProList +
          "</page><onePageSize>" +
          this.historyProListSize +
          "</onePageSize>";
      portEventService(ser, paramData)
        .then(res => {
          console.log('获取历史数据成功', res);
          this.historyProList = res.historyList;
          this.totalPage_HistoryProList = res.totalElements;
          this.loading_H = false;
        })
        .catch(err => {
          console.log('获取历史数据失败',err);
        });
    }
  },
  computed: {
    isDefault: function() {
      // if (this.template_type === "default") {
      //   this.zoneType = 'new'
      //   console.log(this.zoneType)
      //   this.getNewestProList();
      // } else {
      //   this.zoneType = 'history'
      //   console.log(this.zoneType)        
      //   this.getHistorytProList();               
      // }
      return this.template_type === "default";
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.porcessCount {
  background: #f6f8fb;
  .content {
    .fl_r {
      float: right;
      margin-bottom: 20px;
      margin-top:-30px;
    }
    .content-top-left {
      width: 100%;
      height: 100%;
      line-height: 82px;
      background: #ffffff;
      padding-left: 20px;
      overflow: hidden;
    }
    .content-top-right {
      width: 100%;
      height: 100%;
      line-height: 82px;
      background: #ffffff;
      padding-left: 20px;
      overflow: hidden;
    }
  }
  .top {
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #f8f9fb;
    position: relative;
    &:after {
      content: "";
      height: 0;
      width: 0;
      border: 8px solid #f6f8fb;
      border-color: transparent transparent transparent #f6f8fb;
      position: absolute;
      bottom: -9px;
      left: 0px;
    }
    &:before {
      content: "";
      height: 0;
      width: 0;
      border: 8px solid #f6f8fb;
      border-color: transparent #f6f8fb transparent transparent;
      position: absolute;
      bottom: -9px;
      right: 0px;
    }
    .left {
      /*width: 65%;*/
      /*float: left;*/
      padding-left: 20px;
      text-align: left;
      .node_name {
        font-size: 14px;
        color: #333333;
        padding: 20px 0px;
      }
    }
    .ind-header-right {
      line-height: 119px;
    }
    .right {
      /*padding-top: 52px;*/
      .createButton {
        width: 120px;
        height: 36px;
        background: #3ac0f1;
        border-color: #3ac0f1;
        color: #ffffff;
        font-size: 12px;
        margin-right: 15px;
        &:hover {
          background: #5ed4ff;
        }
      }
    }
  }
  .line {
    height: 10px;
    width: 100%;
    background: #f0f2f7;
    background-size: 50% 100%;
    background-repeat: no-repeat;
  }
}
</style>
<style lang="scss">
.porcessCount {
  .el-select .el-input {
    width: 140px;
  }
  .el-table .el-table__body-wrapper tbody tr td {
    height: 35px;
    padding:2px 0;
  }
  .content {
    overflow: hidden;
    background: #fff;
    padding: 20px;
  }
  .content-bottom {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }
  .el-input__inner:focus {
    border-color: #dcdfe6;
    outline: none;
  }
  .el-input__inner:hover {
    border-color: #dcdfe6;
    outline: none;
  }
  .serviceName{
    line-height:15px;
    font-size:12px;
    margin:8px 0；
  }
  .red{
    color:#f6585e;
  }
  .green{
    color:#52ec29;
  }
}
</style>
