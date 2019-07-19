<template>
	<div class="check_server">
		<div class="top">
      <el-row>
        <el-col :span="24">
          <div class="left">
            <p class="node_name">配置生效服务器</p>
            <span class="areaButton"
                  :class="{'areaButton-bg':currentId==zone.id}"
                  @click="changeRegion(zone,index)"
                  v-for="(zone,index) in zoneList" :key='index'>
                  {{zone.zoneName}}
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="content">
    	<el-row>
        <el-col :span="15">
        	<div class="btn">
        		<el-button 
        			size="small" 
        			:plain="false"
        			@click="useCloudRule1(multipleSelection)"
              :class="{'actived':isActive,'bottom_btn_r':!isActive}"
              :disabled="multipleSelection.length==0||isActive==false"
              >应用</el-button>
              
        		<el-button 
        			size="small"  
        			:plain="false"
        			@click="delRule1(multipleSelection)"
              :class="{'actived':isActive1,'bottom_btn_r':!isActive1}"
              :disabled="multipleSelection.length==0||isActive1==false">删除</el-button>
              <!-- :class="{'actived':multipleSelection.length==1&&multipleSelection[0].type!=1,'bottom_btn_r':multipleSelection.length!=1||multipleSelection[0].type==1}" -->
              <span class="text">未设置检测频率的服务器于每天01:30进行检测，或点击
                <router-link  :to='{ name: "checkTime"}'>
                <el-button type="text" class="foot_btn"><a href="" style="text-decoration:underline;">设置检测频率</a></el-button></router-link>
              进行重新设置</span>
        	</div>
        </el-col>
        <el-col :span="8">
            <el-input placeholder="请输入云服务器IP或名称" v-model="input" class="input-with-select group" size="small" @change="changeSearch" @keyup.native='showCheck'>
              <el-button slot="append" icon="el-icon-search" @click="getServerListSearch"></el-button>
            </el-input>
          </el-col>
      </el-row>
      <div class="mainTable" v-loading="loading">
      	<el-table
          :data="serverData"
          style="width: 100%;"
          :select-on-indeterminate="true"
          :show-overflow-tooltip="true"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="80"
            :selectable="checkboxInit">
          </el-table-column>
          <el-table-column
            label="云服务器名称"
            width="220">
            <template slot-scope="scope">
              <span>{{scope.row.hostname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="IP地址"
            width="220">
            <template slot-scope="scope">
              <span>{{scope.row.agent_ip}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="检测频率"
            width="380">
            <template slot-scope="scope">
                <div v-if="scope.row.checkTime!=''">
                  <input 
                    v-if="scope.row.checkTime!=''&&scope.row.checkTime.indexOf(':')!=-1"
                    type="text" 
                    style="width:48px;height:24px;border-radius:4px;border:1px solid #c0c4cc;padding-left:10px;" 
                    v-model="scope.row.checkTime"
                    disabled>
                  <input 
                    v-else="scope.row.checkTime!=''"
                    type="text" 
                    style="width:48px;height:24px;border-radius:4px;border:1px solid #c0c4cc;padding-left:10px;" 
                    v-model="scope.row.checkTime"
                    disabled>  
                  <span v-if="scope.row.checkTime!=''&&scope.row.checkTime.indexOf(':')==-1" style="color:#b8b8b8;margin-left:10px;">分钟</span>
                </div>
                <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
            <!-- {{scope.row.type}}{{scope.row.agent_statecode}} -->
            	<el-button
                type="text"
                size="small"
                @click="useCloudRule(scope.row)"
                :disabled="scope.row.type==2||scope.row.agent_statecode!=12">应用</el-button>
              <el-button
                type="text"
                size="small"
                @click="delRule(scope.row)"
                :disabled="scope.row.type==1||scope.row.agent_statecode!=12">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom">
    	
    </div>
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="应用规则"
      :visible.sync="dialoghandleVisibleUse"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否要应用规则?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleUse = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="useCloudRuleUse()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 应用规则按钮弹出的弹框 -->
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="应用规则"
      :visible.sync="dialoghandleVisibleUse1"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否要应用规则?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleUse1 = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="useCloudRuleUse1()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除规则的对话框 -->
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="删除规则"
      :visible.sync="dialoghandleVisibleDel"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否要删除规则?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleDel = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="delCloudRule()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="删除规则"
      :visible.sync="dialoghandleVisibleDel2"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否要删除规则?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleDel2 = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="delCloudRule1()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
	import { allArea,getHostListByRule,useRule } from '@/api/safety'
	export default {
      data (){
        return {
         	zoneList:[],
         	input:'',
         	serverData:[],
          serverData1:[],
         	totalPage:2,
         	currentPage:1,
         	pageSize:10,
         	currentId:'',
         	IntegrityRuleID:'',
         	hostList:'',
         	rulehostList:'',
         	allList:'',
         	value1:'',
         	multipleSelection:[],
          dialoghandleVisibleUse:false,
          dialoghandleVisibleUse1:false,
          dialoghandleVisibleDel:false,
          dialoghandleVisibleDel2:false,
          rows:'',
          rows2:[],
          isActive:false,
          isActive1:false,
          loading:true,
        }
      },
      created(){
       	this.getAllArea();
       	this.create();
       	
      },
      methods:{
      	// 切换地区
      	changeRegion(zone,index) {
          this.currentId = zone.id;
          this.currentPage = 1;
          this.input = '';
          this.getServerList();
        },
        // 搜索的内容改变
        changeSearch(value){
          this.currentPage = 1;
        },
        // 按下回车搜索
        showCheck:function(ev){
          if(ev.keyCode == 13){
            this.getServerListSearch();
          }
        },
        // 多选框的选择，选择的每一项的值
        handleSelectionChange(val) {

          this.multipleSelection = val;
          if(this.multipleSelection.length>0){
            let arr2 = [],arr3=[];
            for(var i=0;i<this.multipleSelection.length;i++){
              arr2.push(this.multipleSelection[i].type);
              arr3.push(this.multipleSelection[i].agent_statecode)
            }
            console.log(arr2,arr3,777)
            if(arr2.indexOf(2)==-1 && arr3.indexOf("13")==-1 && arr3.indexOf("14")==-1){
              this.isActive = true;
            }else {
              this.isActive = false;
            }
            if(arr2.indexOf(1)==-1 && arr3.indexOf("13")==-1 && arr3.indexOf("14")==-1){
              this.isActive1 = true;
            }else {
              this.isActive1 = false;
            }
          }else{
            this.isActive = false;
            this.isActive1 = false;
          }
          
        },
        // 拿到规则id
        create(){
        	let IntegrityRuleID = this.$route.params.IntegrityRuleID;
        	this.IntegrityRuleID = IntegrityRuleID;
        	// console.log(this.IntegrityRuleID);
        	// let aa = window.location.href;
      	},
      	// 获取地区
      	getAllArea(){
      		let ser = 'remoteAllZone';
      		allArea(ser).then(res=>{
              this.zoneList = res.zonelist;
              this.currentId = this.zoneList[0].id;
              this.getServerList();
              console.log(res,111);
            }).catch( err => {
              console.log('获取存储数据失败', err)
            })
    		},
        // 获取列表
        getServerList(){
          this.loading = true;
      		let ser1 = 'remoteGetHostListByRule';
      		let paramStr = '<zoneId>'+ this.currentId +'</zoneId>'+'<IntegrityRuleID>'+ this.IntegrityRuleID +'</IntegrityRuleID>';
     			getHostListByRule(ser1,paramStr).then(res1=>{
     				console.log(res1)
            if(res1=='主机数据为空！'){
              this.serverData = [];
              this.serverData1 = [];
              this.loading = false;
            }else {
              console.log(res1,6666);
              let hostList = res1.hostList;
              let rulehostList = res1.rulehostList;
              this.loading = false;
              for(var key in hostList){
                hostList[key].checkType = '';
                hostList[key].checkTime = '';
                hostList[key].type = 1;
              }
              let hostList1 = hostList;
              for(var key in rulehostList){
                rulehostList[key].type = 2;
              }
              let rulehostList1 = rulehostList;
              this.serverData = rulehostList1.concat(hostList1);
              this.serverData1 = rulehostList1.concat(hostList1);
              console.log(this.serverData,888);
              let serverTimeRule = this.serverData;
              for(var key in serverTimeRule){
                if (serverTimeRule[key].checkTime.indexOf(":") == -1 && serverTimeRule[key].checkTime != '') {
                  serverTimeRule[key].radio = serverTimeRule[key].agent_ip;
                  serverTimeRule[key].long = serverTimeRule[key].checkTime;
                }else if (serverTimeRule[key].checkTime != ''){
                  serverTimeRule[key].radio = serverTimeRule[key].agent_guid;
                  serverTimeRule[key].time = serverTimeRule[key].checkTime;
                }
              }
            }
      		}).catch(err=>{
        	console.log('失败2222666',err);
      		})
    		},
    		// 应用规则
        useCloudRule(scope){
     			console.log(scope,222);
          this.dialoghandleVisibleUse = true;
          this.scope = scope;
      		console.log(this.scope,333);
    		},
        useCloudRuleUse(){
          let hostIdStr = this.scope.host_id.toString();
          let ser = 'distributingIntegrityRuleForHosts';
          let paramStr = '<distributeRuleId>'+ this.IntegrityRuleID +'</distributeRuleId><distributeHostIdStr>'+ hostIdStr +'</distributeHostIdStr>';
          useRule(ser,paramStr).then(res=>{
            console.log('应用成功',res);
            if(res == '完整性监控规则不存在！'){
              this.$message('该规则不能配置');
            }else{
              this.$message('配置生效服务器成功');
              this.dialoghandleVisibleUse = false;
              this.input = '';
              this.getServerList();
            }
          }).catch(err=>{
            console.log('应用失败',err);
          })
        },
        // 按钮应用规则
        useCloudRule1(value){
          this.value = value;
          this.dialoghandleVisibleUse1 = true;
          console.log(value,333);
        },
        useCloudRuleUse1(){
          let arr = [];
            for(var i=0;i<this.value.length;i++){
              console.log(this.value[i].host_id,555);
              arr.push(this.value[i].host_id);
              console.log(arr,666);
            }
            console.log(arr,444);
            let hostIdStr = arr.toString();
            let ser = 'distributingIntegrityRuleForHosts';
            let paramStr = '<distributeRuleId>'+ this.IntegrityRuleID +'</distributeRuleId><distributeHostIdStr>'+ hostIdStr +'</distributeHostIdStr>';
            useRule(ser,paramStr).then(res=>{
              console.log('应用成功',res);
              if(res == '完整性监控规则不存在！'){
                this.$message('该规则不能配置');
              }else{
                this.$message('配置生效服务器成功');
              }
              this.dialoghandleVisibleUse1 = false;
              this.input = '';
              this.getServerList();
            }).catch(err=>{
              console.log('应用失败',err);
            })
        },
    		// 删除规则
    		delRule(row){
      		this.rows = row;
          this.dialoghandleVisibleDel = true;
          console.log(this.rows,777);
    		},
        delCloudRule(){
          let ser = "deleteIntegrityRuleForHost";
          let paramStr = '<hostId>'+this.rows.host_id+'</hostId><integrityRuleID>'+this.rows.IntegrityRuleID+'</integrityRuleID>'
          useRule(ser,paramStr).then(res=>{
            if(res=="分配/取消完整性规则成功！"){
              this.$message("删除成功");
              this.dialoghandleVisibleDel = false;
              this.input = '';
              this.getServerList();
            }else{
              this.$message(res);
            }
          console.log('删除成功',res);
          }).catch(err=>{
            console.log('删除失败',err);
          })
        },
        // 删除规则，多选
    		delRule1(row){
          this.rows2 = row;
          this.dialoghandleVisibleDel2 = true;
          console.log(this.rows2,777);
        },
        delCloudRule1(){
          console.log(this.rows2,999);
          let list = this.rows2;
          let arrhost_id = [];
          for(var i=0;i<list.length;i++){
            console.log(list[i].host_id)
            arrhost_id.push(list[i].host_id)
          }
          console.log(arrhost_id.toString());
          let arrhost_idStr = arrhost_id.toString();
          let ser = "deleteIntegrityRuleForHost";
          let paramStr = '<hostId>'+arrhost_idStr+'</hostId><integrityRuleID>'+this.rows2[0].IntegrityRuleID+'</integrityRuleID>'
          useRule(ser,paramStr).then(res=>{
            console.log(res,888);
            if(res=="分配/取消完整性规则成功！"){
              this.$message("删除成功");
              this.dialoghandleVisibleDel2 = false;
              this.input = '';
              this.getServerList();
            }else{
              this.$message(res);
            }
          console.log('删除成功',res);
          }).catch(err=>{
            console.log('删除失败',err);
          })
        },
    	
        // 搜索列表
        getServerListSearch(){
          if(this.input!=""){
            let searchList = [];
            let serverData2 = this.serverData1;
            console.log(serverData2,'===');
            for (var i=0;i<serverData2.length;i++){
              console.log(serverData2[i].agent_ip.indexOf(this.input),999)
              if(serverData2[i].agent_ip.indexOf(this.input)!=-1||serverData2[i].hostname.indexOf(this.input)!=-1){
                searchList.push(serverData2[i]);
              }
            }
            this.serverData = searchList;
          }else {
            this.getServerList();
          }
          
        },
        checkboxInit(row,index){
          // row.type == 2|| 
          if (row.agent_statecode == 13 || row.agent_statecode == 14){
            return 0;//不可勾选
          }else{
            return 1;//可勾选
          }
        },

      },
    }

</script>

<style lang="scss" scoped="scoped">
	.check_server {
		background-color:#fff;
		padding-bottom:30px;
		overflow:hidden;
    .content{
      background:#ffffff;
      padding-bottom:20px;
      .left {
      	height:20px;
      }
    }
    .top{
      width:100%;
      background: #ffffff;
      border-bottom: 1px solid #f8f9fb;
      position: relative;
      padding-bottom:20px;
      &:after{
        content: '';
        height: 0;
        width: 0;
        border: 8px solid #f6f8fb;
        border-color: transparent transparent transparent #f6f8fb;
        position: absolute;
        bottom: -9px;
        left: 0px;
      }
      &:before{
        content: '';
        height: 0;
        width: 0;
        border: 8px solid #f6f8fb;
        border-color: transparent #f6f8fb transparent transparent;
        position: absolute;
        bottom: -9px;
        right: 0px;
      }
      .left{
        /*width: 65%;*/
        /*float: left;*/
        padding-left: 2%;
        text-align: left;
        .node_name{
          font-size: 14px;
          color: #333333;
          padding: 20px 0px;
        }
      }
      .right{
        /*padding-top: 52px;*/
        .createButton{
          width: 120px;
          height: 36px;
          background: #3ac0f1;
          border-color: #3ac0f1;
          color: #ffffff;
          font-size: 12px;
          margin-right: 10px;
          &:hover{
            background: #5ed4ff;
          }
        }
      }
    }
    .line{
      height: 10px;
      width: 100%;
      background: #f0f2f7;
      background-size: 50% 100%;
      background-repeat: no-repeat;
    }
    .el-input-group {
      margin-top:20px;
      float:right;
    }
    .group {
      width:350px;
      margin-right: -25px;
    }
    .mainTable {
      background-color:#ffffff;
      margin-right: 40px;
      padding-bottom:20px;
      margin-top:20px;
    }
    .el-table {
      margin-left:20px;
      margin-right:20px;
      color:#606266 ;
    }
    .content-bottom{
      float: right;
      // margin-top:20px;
      margin-right: 20px;
    }
    .bottom {
    	padding-left:10px;
    	
    }
    .bottom_btn {
    	margin-top:20px;
    }
    .btn {
    	margin-top:20px;
    	margin-left:20px;
    }
    .text {
      font-size:12px;
      margin-left:20px;
    }
	}
</style>

<style lang="scss">
	.check_server {
		.el-icon-time {
      display:none;
    }
    .el-input--prefix .el-input__inner {
    	padding-left: 15px ;
		}
		.el-input--suffix .el-input__inner {
    	padding-right: 0px;
		}
		.el-table .el-table__body-wrapper tbody tr td {
   	 	padding: 5px 0;
		}
		.foot_btn {
			font-size:12px;
		}
		.bottom_btn_r {
			background-color:#f0f2f7;
			border:1px solid #f0f2f7;
      color:#666;
		}
    .bottom_btn_r:hover {
      background-color:#f0f2f7;
      border:1px solid #f0f2f7;
      color:#666;
    }
    .actived {
      background-color:#56d6c4;
      border:1px solid #56d6c4;
      color:#fff;
    }
    .actived:hover {
      background-color:#56d6c4;
      border:1px solid #56d6c4;
      color:#fff;
    }
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
      border-top-right-radius:0px;
      border-bottom-right-radius:0px;
    }
    .el-dialog__footer .f_btn_r {
      background-color: #f9cd76;
      border-top-left-radius:0px;
      border-bottom-left-radius:0px;
    }
	}
</style>