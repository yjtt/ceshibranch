<template>
	<div class="check_server">
		<div class="top">
      <el-row>
        <el-col :span="24">
          <div class="left">
            <p class="node_name">配置检测频率</p>
            <span class="areaButton"
                  :class="{'areaButton-bg':currentId==zone.id}"
                  @click="changeRegion(zone,index)"
                  v-for="(zone,index) in zoneList" :key='index'>
                  {{zone.zoneName }}
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="content">
    	<el-row>
        <el-col :span="15">
        	<el-button 
        		size="small" 
        		class="top_btn" 
        		:plain="false"
            :class="{'actived':isActive,'top_btn':!isActive}"
        		@click="configuredfBtn(multipleSelection)"
            :disabled="!isActive">配置</el-button>
            
          <el-button 
            size="small" 
            class="top_btn" 
            :plain="false"
            :class="{'actived':isActive,'top_btn':!isActive}"
            @click="delBtn(multipleSelection)"
            :disabled="!isActive">禁用</el-button>
            
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
            label="检测频率(间隔-定时)"
            width="380">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.radio">
                <el-radio :label="scope.row.agent_ip">
                  <input 
                    type="text" 
                    style="width:48px;height:24px;border-radius:4px;border:1px solid #c0c4cc;padding-left:10px;" 
                    v-model="scope.row.long"
                    :disabled="scope.row.radio!=scope.row.agent_ip"
                    @blur="onBlur(scope.row)"
                    placeholder="60" 
                    ><span style="color:#b8b8b8;margin-left:10px;">分钟</span>
                </el-radio>
                <el-radio :label="scope.row.agent_guid" >
                  <el-time-picker
                    arrow-control
                    size="small"
                    v-model="scope.row.time"
                    :disabled="scope.row.radio!=scope.row.agent_guid"
                    @blur="onBlur(scope.row)"
                    value-format="HH:mm" 
                    format="HH:mm"
                    style="width:70px;" 
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:00'
                    }"
                    placeholder="01:30">
                  </el-time-picker>
                </el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
            <!-- {{scope.row.agent_statecode}} -->
              <el-button
                type="text"
                size="mini"
                :disabled="scope.row.agent_statecode == '13'||scope.row.agent_statecode =='14'"
                @click="delRule(scope.row)">禁用
              </el-button>
                <el-button
                type="text"
                size="mini" 
                :disabled="scope.row.agent_statecode == '13'||scope.row.agent_statecode =='14'"
                @click="configuredfFrequency(scope.row)">配置
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="禁用检测频率"
      :visible.sync="dialoghandleVisibleDe"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否要禁用检测频率?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleDe = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="getDelete()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="禁用检测频率"
      :visible.sync="dialoghandleVisibleDe2"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否要禁用所选检测频率?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleDe2 = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="getDelete2()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="设置检测频率"
      :visible.sync="dialoghandleVisible"
      :close-on-click-modal='false'>
      <div class="content" style="text-align:center">
        <span style="margin-left:10px;color:#333">是否确定配置检测频率?</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisible = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="getDetermine()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 按钮设置检测频率 -->
    <el-dialog style='width:70%;margin:0px auto 50px;'
      title="设置检测频率"
      :visible.sync="dialoghandleVisibleSet"
      :close-on-click-modal='false'>
      <div class="content" style="" v-if="multipleSelection.length>0">
        <el-table
          :data="serverData2"
          style="width: 100%;"
          :select-on-indeterminate="true"
          :show-overflow-tooltip="true">
          <el-table-column
            label="云服务器"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.hostname}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="检测频率"
            width="280">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.radio">
                <el-radio :label="scope.row.agent_ip">
                  <input 
                    type="text" 
                    style="width:48px;height:24px;border-radius:4px;border:1px solid #c0c4cc;padding-left:10px;" 
                    v-model="scope.row.long"
                    :disabled="scope.row.radio!=scope.row.agent_ip"
                    @blur="onBlur(scope.row)"
                    placeholder="60" 
                    ><span style="color:#b8b8b8;margin-left:10px;">分钟</span>
                </el-radio>
                <el-radio :label="scope.row.agent_guid" >
                  <el-time-picker
                    arrow-control
                    size="small"
                    v-model="scope.row.time"
                    :disabled="scope.row.radio!=scope.row.agent_guid"
                    @blur="onBlur(scope.row)"
                    value-format="HH:mm" 
                    format="HH:mm"
                    style="width:60px;" 
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:00'
                    }"
                    placeholder="01:30">
                  </el-time-picker>
                </el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialoghandleVisibleSet = false"
          class="f_btn f_btn_l">取 消</el-button><el-button
          type="primary"
          @click="getDetermine2()"
          class="f_btn f_btn_r">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
  import { allArea,useRule } from '@/api/safety'
  import i18n from '@/lang'
  import $ajax from 'axios'
	export default {
      data (){
        return {
         	zoneList:[],
         	input:'',
          currentId: '',
          serverData:[],
          serverData1:[],//复制的serverData1
         	serverData2:[],
         	dialoghandleVisible:false,
           dialoghandleVisibleDe:false,
           dialoghandleVisibleDe2:false,
           dialoghandleVisibleSet:false,
         	ruleForm:{},
          checkForm:{},
          multipleSelection:[],
          radio:'',
          array:[],//所选的多条检测频率
          // isDisabled:true,
          isActive:false,
          loading:true,
        }
      },
      created(){
        this.getAllarea();
        
      },
      methods:{
        //获取所有地区
        getAllarea(){
          let ser = "remoteAllZone";
          allArea(ser).then(res => {
            let zonelist = res.zonelist;
            this.zoneList = zonelist;
            this.currentId = this.zoneList[0].id;
            this.getUseRule();
          })
          .catch(err => {
            console.log("获取地区失败", err);
          });
        },
        // 获取列表
        getUseRule(){
          this.loading =  true;
          let ser = "remoteGetHostListByZone",
              paramStr = "<zoneId>"+ this.currentId +"</zoneId>"
          useRule(ser,paramStr).then(res => {
            console.log(res);
            if(res=='查询不到数据！'){
              this.serverData = [];
              this.serverData1 = [];
              this.loading = false;
            }else{
              let getAllList = res.allList;
              this.loading = false;
              console.log(this.ruleForm,9988)
              for(var key in getAllList){
                getAllList[key].radio = '';
                getAllList[key].long = '';
                getAllList[key].time = '';
              }
              getAllList.forEach((item) => {
                if (item.checkTime.indexOf(":") == -1 && item.checkTime != '') {
                  item.radio = item.agent_ip;
                  item.long = item.checkTime;
                }else if (item.checkTime != ''){
                  item.radio = item.agent_guid;
                  item.time = item.checkTime;
                }
              })
              this.serverData = getAllList;
              this.serverData1 = getAllList;
            }
          })
          .catch(err => {
            console.log("获取地区失败", err);
          });
        },
        // 删除-确定 (单选)
        getDelete(){
          let ser = "deleteCheckFrenquencyConfig ",
              paramStr = '<frenquencyConfigStr>{"agent_guid":"'+ this.checkForm.agent_guid +'","checkType":"'+ this.checkForm.checkType +'"}</frenquencyConfigStr>'
          useRule(ser,paramStr).then(res => {
            this.serverData.checkTime = '';
            this.input = '';
            this.getUseRule();
            this.dialoghandleVisibleDe = false;
            this.$message({
              message: res
            })
          })
          .catch(err => {
            console.log("获取地区失败", err);
          });
        },
        delBtn(val){
          if(this.multipleSelection.length==0){
            this.$message('请选择数据')
          }else{
            this.dialoghandleVisibleDe2 = true;
            this.array = this.multipleSelection;
          }
        },
        // 删除（多选）
        getDelete2(){
          let guidArray = [];
          let typeArray = [];
          let arrayList = this.array;
          for (var i=0;i<arrayList.length;i++){
            guidArray.push(arrayList[i].agent_guid);
          }
          let guidArrayStr = guidArray.toString();
          let ser = "deleteCheckFrenquencyConfig ",
              paramStr = '<frenquencyConfigStr>{"agent_guid":"'+ guidArrayStr +'","checkType":"'+ arrayList[0].checkType +'"}</frenquencyConfigStr>'
          useRule(ser,paramStr).then(res => {
            this.serverData.checkTime = '';
            this.input = '';
            this.getUseRule();
            this.dialoghandleVisibleDe2 = false;
            this.$message({
              message: res
            })
          })
          .catch(err => {
            console.log("获取地区失败", err);
          });
        },
        // 配置-确定(单选)
        getDetermine(){
          let ser = "setCheckFrenquencyConfig",
              paramStr = '<frenquencyConfigStr>{ "frenquencyConfigStr":[{"agent_ip":"'+ this.checkForm.agent_ip +'","agent_guid":"'+ this.checkForm.agent_guid +'","checkTime":"'+ this.checkForm.checkTime +'","checkType":"'+ this.checkForm.checkType +'" }]}</frenquencyConfigStr>'

          useRule(ser,paramStr).then(res => {

            if(res=='应用成功！'){
              this.$message('应用成功！');
              this.dialoghandleVisible = false;
              this.input = '';
              this.getUseRule();
            }else if(res=='checkTime不能为空！'){
              this.$message('检测频率不能为空，请选择或填入检测频率')
            }
          })
          .catch(err => {
            console.log("获取地区失败", err);
            this.$message('请输入正确的检测检测频率不能小于60分钟或大于7天！');
          });
        },

        // 配置检测频率多个
        getDetermine2(){
          console.log(this.serverData2,555);
          for(var i=0;i<this.serverData2.length;i++){
            if(this.serverData2[i].radio==this.serverData2[i].agent_ip&&this.serverData2[i].long==''){
              this.serverData2[i].checkTime = '60';
            }else if(this.serverData2[i].radio == this.serverData2[i].agent_guid&&this.serverData2[i].time==''){
              this.serverData2[i].checkTime = '01:30';
            }
          }

          let list = [];
          for(var i=0;i<this.serverData2.length;i++){
            console.log(this.serverData2[i].agent_ip)
            list.push('{"agent_ip":"'+ this.serverData2[i].agent_ip +'","agent_guid":"'+ this.serverData2[i].agent_guid +'","checkTime":"'+ this.serverData2[i].checkTime +'","checkType":"'+ this.serverData2[i].checkType +'"}')
          }
          let list1 = [];
          for(var i=0;i<list.length;i++){
            list[i].substring(1,list[i].length);
            let obj = JSON.parse(list[i]);
            list1.push(obj);
          }
          let ser = "setCheckFrenquencyConfig",
              paramStr = '<frenquencyConfigStr>{ "frenquencyConfigStr":['+list+']}</frenquencyConfigStr>';
          useRule(ser,paramStr).then(res => {
            console.log(res);
            if(res=='应用成功！'){
              this.$message('应用成功！');
              this.dialoghandleVisibleSet = false;
              this.input = '';
              this.getUseRule();
            }else if(res=='checkTime不能为空！'){
              this.$message('检测频率不能为空，请选择或填入检测频率')
            }else {
              this.$message('检测频率不能小于60分钟或大于7天！');
            }
          })
          .catch(err => {
            console.log("获取地区失败", err);
            this.$message('请输入正确的检测检测频率不能小于60分钟或大于7天！');
          });
        },
        
        onBlur(item){
          this.configured(item);
          let allList = '';
          allList = this.serverData;
          allList.forEach((item) => {
            allList.checkTime = allList.hostId == this.ruleForm.hostId ? "this.ruleForm.checkTime" : allList.checkTime;
          })
          this.serverData = allList;
        },
      	// 切换地区
      	changeRegion(zone,index) {
          this.currentId = zone.id;
          this.input = '';
          this.getUseRule();
        },
        // 搜索的内容改变
        changeSearch(value){
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
          let status = [];
          if(this.multipleSelection.length>0){
            for(var i=0;i<this.multipleSelection.length;i++){
              status.push(this.multipleSelection[i].agent_statecode)
            }
            if(status.indexOf('13')==-1&&status.indexOf('14')==-1){
              this.isActive = true;
            }else{
              this.isActive = false;
            }
          }else{
            this.isActive = false;
          }
          
          console.log(status);
        },
        configuredfBtn(val){
          if(this.multipleSelection.length==0){
             this.$message({
              message: '请选择数据进行处理'
            })
          }else {
            console.log(val,6666);
            // this.checkForm = this.multipleSelection[0];
            this.dialoghandleVisibleSet = true;
            this.serverData2 = val;
          }
        },
        configured(items){
          if(items.radio == items.agent_ip){
            items.checkTime = items.long;
          }else if(items.radio == items.agent_guid) {
            items.checkTime = items.time;
          }else {
            items.checkTime = '';
          }
          this.ruleForm = items;
        },
        configuredfFrequency(val){
          this.checkForm = val;
          this.dialoghandleVisible = true;
          if(this.checkForm.radio==this.checkForm.agent_ip&&this.checkForm.long==''){
            this.checkForm.checkTime = '60';
          }else if(this.checkForm.radio == this.checkForm.agent_guid&&this.checkForm.time==''){
            this.checkForm.checkTime = '01:30';
          }
        },
        delRule(val){
          this.checkForm = val;
          // this.getUseRule();
          this.dialoghandleVisibleDe = true;
        },
        // 搜索列表
        getServerListSearch(){
          if(this.input!=""){
            let searchList = [];
            let serverData2 = this.serverData1;
            for (var i=0;i<serverData2.length;i++){
              console.log(serverData2[i].agent_ip.indexOf(this.input),999)
              if(serverData2[i].agent_ip.indexOf(this.input)!=-1||serverData2[i].hostname.indexOf(this.input)!=-1){
                searchList.push(serverData2[i]);
              }
            }
            this.serverData = searchList;
          }else {
            this.getUseRule();
          }
        },
        // 多选框的禁止选择
        checkboxInit(row,index){
          // row.type == 2|| 
          if (row.agent_statecode == '13' || row.agent_statecode == '14'){
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
    	padding-left:20px;
    	.text {
    		font-size:12px;
    	}
    }
    .bottom_btn {
    	margin-top:20px;
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
		}
		.top_btn {
			background-color:#f0f2f7;
			border:1px solid #f0f2f7;
			margin-top:20px;
			margin-left:20px;
      color:#606266;
		}
		.top_btn:hover {
			background-color:#f0f2f7;
			border:1px solid #f0f2f7;
			margin-top:20px;
			margin-left:20px;
			color:#606266
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
    .el-date-editor .el-icon-circle-close {
      display:none;
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
	}
</style>