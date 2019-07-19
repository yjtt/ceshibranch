<template>
  <div class="ind_monitor">
    <div class="top">
      <el-row>
        <el-col :span="21">
          <div class="left">
            <p class="node_name">异常登录</p>
            <span class="areaButton"
                  :class="{'areaButton-bg':currentId==zone.id}"
                  @click="changeRegion(zone,index)"
                  v-for="(zone,index) in zoneList" :key='index'>
                  {{zone.zoneName + '（' + zone.count +'）'}}
			      </span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="right">  
            <router-link to="loginsecurityset">
              <el-button class="createButton" type="primary">登录安全设置</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="content">
      <el-row>
        <el-col :span="15">
          <div class="content_top content_top_left">
            <el-button class="node_name h_btn" :class="{'active':isActive}"
             type="plain"  @click="markDispose" :disabled="isDisabled">标记为已处理</el-button>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="content_top content_top_right" >
            <el-input placeholder="请输入云服务器IP或名称" v-model="searchExceList" class="input-with-select" size="small" style="width:350px" @change="changeSearch" @keyup.native='showIndList'>
              <el-button slot="append" icon="el-icon-search" @click="getExceptionList"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="mainTable" v-loading = 'loading'>
        <el-table
                :show-overflow-tooltip="true"
                :data="tableData"
                style="width: 100%" 
                @selection-change="handleSelectionChange"
                @filter-change="filterChange"
                >
          <el-table-column
                type="selection"
                :selectable="checkboxInit"
                width="50">
          </el-table-column>
          <el-table-column
                  prop="agent_ip"
                  label="云服务器名称"
                  width="130">
            <template slot-scope="scope">
              <router-link :to='{ name: "serverdetails",params: {ip:scope.row.agent_ip,id:scope.row.host_id,zone_id: currentId,guid: scope.row.agent_guid,integrityEventID:"1130",atype:atype}}'>
                <!-- <el-button type="text" size="mini" >{{scope.row.agent_ip}}</el-button> -->
                <div class="serviceName">{{scope.row.hostname}}</div>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="logindate.time"
            label="登录时间"
            width="150">
            <template slot-scope="scope">
              {{scope.row.logindate==""?"--":scope.row.logindate}}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
            column-key = 'filter'
            :filter-multiple="false"
            filter-placement="bottom-start">
            <template slot-scope="scope">
              <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status == 0 ? '未处理' : '已处理'}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  :show-overflow-tooltip="true"
                  label="对应用户名"
                  width="80">
            <template slot-scope="scope">
              {{scope.row.loginuser==""?"--":scope.row.loginuser}}
            </template>
          </el-table-column>
          <el-table-column
                  label="登录类型"
                  width="80">
            <template slot-scope="scope">
              {{scope.row.logintype==""?"--":scope.row.logintype}}
            </template>
          </el-table-column>
          <el-table-column
                  :show-overflow-tooltip="true"
                  label="登录源IP"
                  width="150">
            <template slot-scope="scope">
              {{scope.row.sourceip==""?"--":scope.row.sourceip}}
            </template>
          </el-table-column>
          <el-table-column
              prop="warningtype"
              label="告警类型"
              width="110"
              :filters="[{ text: '异地登录', value: '4' },{ text: '暴力破解', value: '5' },{ text: '非法IP登录', value: '1' },{ text: '非法账号登录', value: '3' }, { text: '非法时间登录', value: '2' }, { text: '爆破登录', value: '6' }  ]"
              :filter-multiple="false"
            column-key = 'filter1'
              
              filter-placement="bottom-start">
              <template slot-scope="scope">
                {{scope.row.warningtype == 1 ? '非法IP登录' : scope.row.warningtype == 2 ? '非法时间登录' : scope.row.warningtype == 3 ? '非法账号登录' : scope.row.warningtype == 4 ?'异地登录' : scope.row.warningtype == 5 ? '暴力破解' : '爆破登录'}}
              </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="安全等级"
            :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
            column-key = 'filter2'
            :filter-multiple="false"
            filter-placement="bottom-start">
            <template slot-scope="scope">
              <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="operation"
                  label="操作">
            <template slot-scope="scope">
              <!-- <el-button @click="getRemoteUpdateExceptionStatus(scope.row.sshexceptioneventid)" type="text" size="small" :disabled="scope.row.status == 1">标记为已处理</el-button> -->
              <!-- <el-button @click="dialogUpdateVisible = true" type="text" size="small" :disabled="scope.row.status == 1">标记为已处理</el-button> -->
              <el-button @click="getModel(scope.row.sshexceptioneventid)" type="text" size="small" :disabled="scope.row.status == 1">标记为已处理</el-button>
           
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content-bottom">
          <el-pagination
           v-if="totalPage>10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
         <el-pagination
            v-else
            layout="">
          </el-pagination>
        </div>
    </div>
    <el-dialog style='width:80%;margin:0px auto 50px;'
        title="选择应用的云服务器" :close-on-click-modal='false'
        :visible.sync="dialogUpdateVisible">
        <!-- <div style="margin-right:20px;display:inline-block;">123123
            <i>
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76;"></svg-icon>
            </i>
          </div> -->
        <p style="text-align:center;display:block;margin:40px auto;">
          <i>
            <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76;"></svg-icon>
          </i>
          <span style="margin:20px;">
            是否确定标记为已处理
          </span>
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogUpdateVisible = false"
            class="f_btn f_btn_l">取 消</el-button><el-button
            type="primary"
            @click="getRemoteUpdateExceptionStatus()"
            class="f_btn f_btn_r">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog style='width:80%;margin:0px auto 50px;'
        title="选择应用的云服务器" :close-on-click-modal='false'
        :visible.sync="dialogUpdateVisible1">
        <p
          style="text-align:center;display:block;margin:40px auto;">
           <i>
            <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76;"></svg-icon>
          </i>
          <span style="margin:20px;">
            是否确定标记为已处理
          </span>
          </p>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogUpdateVisible1 = false"
            class="f_btn f_btn_l">取 消</el-button><el-button
            type="primary"
            @click="getRemoteUpdateExceptionStatus1()"
            class="f_btn f_btn_r">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { serverRegion, exceptionRegionNum, exceptionList} from "@/api/safety";
import i18n from "@/lang";

export default {
  data() {
    return {
      loading: true,
      currentId: 1,
      zoneList: [],
      tableData: [
        
      ],
      currentPage: 1,
      totalPage: 1,      
      pageSize: 10,
      searchExceList: "",
      dialogUpdateVisible:false,
      dialogUpdateVisible1:false,
      biaojiid: '',
      multipleSelection: [],
      atype:'2',
      tableStatus: '0,1',
      warningtype: '1,2,3,4,5,6',
      isDisabled: true,
      isActive: false,
      severity: '0,1'
    };
  },
  created() {
    this.getExceptionRegion();
    // this.getExceptionList();
  },

  methods: {  
    checkboxInit(row,index){
      if (row.status == 1) 
        return 0;//不可勾选
      else
        return 1;//可勾选
    },
    // 表头筛选
    filterChange(value) {
      if(value.filter){
        // 筛选状态
        if(value.filter.length>0){
          this.tableStatus = value.filter.join(',')
        }else {
          this.tableStatus = '0,1'
        }
      }else if(value.filter1){
        // 筛选告警类型
        if( value.filter1.length > 0){
          this.warningtype = value.filter1.join(',')
        }else{
          this.warningtype = '1,2,3,4,5,6'
        }
      }else if(value.filter2){
        // 筛选告警类型
        if( value.filter2.length > 0){
          this.severity = value.filter2.join(',')
        }else{
          this.severity = '0,1'
        }
      }
      this.currentPage = 1;
      this.getExceptionList()
    },
    changeSearch(value){
      this.currentPage = 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      console.log(this.pageSize)
      this.getExceptionList()
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getExceptionList()        
    },
    changeRegion(zone,index) {
      console.log()
      this.currentId = zone.id;
      this.searchExceList = '';
      this.getExceptionList()
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
      let ser1 = "remoteGetZoneList";
      exceptionRegionNum(ser1)
        .then(res => {
          console.log("获取地区数量成功111", res);
          if(res.zoneList.length==0){
            this.currentId = zoneAll[0].id;
            this.zoneList = zoneAll
            this.getExceptionList();
          }else{
            for (var item in zoneAll) {
              let zoneAllNum = res.zoneList;
              for (var num in zoneAllNum) {
                if (zoneAll[item].id === zoneAllNum[num].zoneId) {
                  zoneAll[item].count = zoneAllNum[num].count;
                }
              }
            }
            this.zoneList = zoneAll
            for(var i=0;i<zoneAll.length;i++){
              if(zoneAll[i].count>0){
                this.currentId = zoneAll[i].id;
                this.getExceptionList();
                return
              }
            }
          }
        })
        .catch(err => {
          console.log("获取地区数量失败", err);
        });
    },
    //回车事件
    showIndList:function(ev){
      // console.log(88888888888)
      if(ev.keyCode == 13){
        // alert('你按回车键了');
        this.getExceptionList();
      }
    },
    // 列表
    getExceptionList() {
      this.loading = true;
      let ser = "remoteGetExceptionEventList";
      let paramStr =
        '<paramStr>{"paramStr":{"currentPage":'+this.currentPage+', "pageSize":'+this.pageSize+',"zoneId":'+this.currentId+', "status":"'+ this.tableStatus +'", "warningtype":"'+this.warningtype+'", "queryParam":"'+this.searchExceList+'", "severity":"'+this.severity+'"}}</paramStr>';
      exceptionList(ser, paramStr)
        .then(res => {
          console.log('获取列表成功',res)
          let obj2 = res.eventList;
          this.tableData = obj2;
          this.totalPage = res.totalElements
          //  this.tableData = [];
          this.loading = false;
          
        })
        .catch(err => {
          console.log("获取存储数据失败", err);
        });
    },
    getModel(sshexceptioneventid){
      this.dialogUpdateVisible1 = true
      this.biaojiid1 = sshexceptioneventid
      console.log(this.biaojiid)
    },
    // 标记为已处理
    getRemoteUpdateExceptionStatus1(){
      let ser = "remoteUpdateExceptionStatus";
      let paramStr ='<Ids>'+this.biaojiid1+'</Ids>';
      // console.log(this.biaojiid)         
      exceptionList(ser,paramStr).then(res=>{
        console.log('异常登陆标记成功',res);
        this.dialogUpdateVisible1 = false        
        this.$message({
            message: '标记成功'
          });
        this.getExceptionList();
      }).catch(err=>{
        this.$message({
            message: '标记失败'
          });
        // console.log('异常登陆标记失败',err)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;      
      if(this.multipleSelection.length>1){
        this.isActive  = true;
        this.isDisabled = false;
      }
      // else{
      //   this.isActive  = false;
      //   this.isDisabled = true;
      // }
      // console.log(this.multipleSelection);//返回一个数组对象
    },
    
  //点击表格上部标记为已处理时触发的事件
    markDispose(){
      // if(this.multipleSelection.length == 0){
      //   this.isDisabled = true
      //   // this.$message({
      //   //     message: '请选择一项数据进行处理'
      //   //   });
      // }else if(this.multipleSelection.length > 1){
        // this.isDisabled = false
        // this.$message({
        //     message: '只能选择一条数据进行处理，请重新选择'
        //   });
      // }else 
      if(this.multipleSelection[0].status == 1){
        this.isDisabled = false
        this.$message({
            message: '您所选择的数据已处理过，请重新选择'
          });
      }else{
        this.dialogUpdateVisible = true;
      }
      
    },
    //点击弹框确定按钮
    getRemoteUpdateExceptionStatus(){
      // console.log(1111);
      // console.log(this.multipleSelection)
      if(this.multipleSelection.length == 1){
        //调接口刷新表格        
        let ser = "remoteUpdateExceptionStatus";
        console.log(this.multipleSelection,'#############')
        console.log(this.multipleSelection[0].sshexceptioneventid)
        let paramStr ='<Ids>'+this.multipleSelection[0].sshexceptioneventid+'</Ids>';        
        exceptionList(ser,paramStr).then(res => {
          console.log('异常登陆标记成功11111',res);
          this.dialogUpdateVisible = false
          this.$message({
              message: '标记成功'
            });
          this.getExceptionList();
        }).catch(err=>{
        this.$message({
            message: '标记失败'
          });
        // console.log('异常登陆标记失败',err)
      })
      }
    }
  }
};
</script>
<style lang="scss" scoped="scoped">
.ind_monitor {
  .active {
    border: 1px solid #56d6c4;
    background: #56d6c4;
    color: #fff;
  }
  background: #ffffff;
  border-bottom: 1px solid #f8f9fb;
  position: relative;
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
  }
  .content_top_right{
    float: right;
  }
  .left {
    padding-left: 2%;
    text-align: left;
    .node_name {
      font-size: 14px;
      color: #333;
      padding: 20px 0px;
    }
  }
  .right {
    padding-top: 38px;
    text-align: right;
    .createButton {
      width: 120px;
      height: 40px;
      background: #3ac0f1;
      border-color: #3ac0f1;
      color: #ffffff;
      font-size: 12px;
      margin-right: 20px;
      &:hover {
        background: #5ed4ff;
      }
    }
  }
  .content {
    padding: 20px;
    .content_top {
      background: #ffffff;
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
}
.clear {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.line {
  height: 10px;
  width: 100%;
  background: #f0f2f7;
  background-size: 50% 100%;
  background-repeat: no-repeat;
}
.btn {
  float: right;
}
</style>
<style lang="scss">
.ind_monitor {
  .el-select .el-input {
    width: 140px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-table .el-table__body-wrapper tbody tr td {
    height: 35px;
    padding: 2px 0;
  }
  .el-table th > .cell {
    color: #333;
    text-align: left;
  }
  .el-table td,
  .el-table th.is-leaf {
    text-align: left;
  }
  .el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    color: #333;
  }
  .el-table-filter__list-item .is-active {
    background-color: #f0f2f9;
    color: #333;
  }
  .content {
    overflow: hidden;
  }
  .content-bottom {
    float: right;
    margin: 20px 20px 0 0;
  }
  .h_btn {
    background-color: #f0f2f7;
    border: 1px solid #f0f2f7;
    height: 35px;
    line-height: 35px;
    padding: 0 20px;
  }
  .mainTable {
    background-color: #ffffff;
    padding: 20px 0;
  }
  .el-input-group {
    margin-top: 0;
    float: right;
  }
// 弹框样式
 .el-dialog__header {
    background-color: #323c4e;
    height:40px;
    line-height: 40px;
    /*color:#e4e5e7;*/
    padding: 0;
    padding-left: 20px;

  }
  .el-dialog__title {
    color:#e4e5e7;
    font-size: 12px;
  }
.el-dialog__footer {
    padding:0;
    width: 100%;
    font-size: 0;
    height:35px;
  }
  .el-dialog__footer .f_btn {
    margin: 0;
    background-color: #0f0;
    width: 50%;
    border: none;
  }
  .el-dialog__footer .f_btn_l {
    background-color: #f0f2f7;
  }
  .el-dialog__footer .f_btn_r {
    background-color: #f9cd76;
  }
  .el-input {
    // width:250px;
    height:30px;
    padding: 0; 
  }
  .el-input__inner {
    height:30px;
    /* margin-left: 40px; */
  }
  .el-input--suffix .el-input__inner {
    height:30px;
    margin-left: 8px;
  }
  .el-button--mini{
    padding:0;
  }
  .serviceName{
    line-height:15px;
    font-size:12px;
    margin:8px 0;
  }
  .red{
      color:#f6585e;
    }
    .green{
      color:#52ec29;
    }
}
.el-table-filter{
  text-align: left !important ;
}
</style>

