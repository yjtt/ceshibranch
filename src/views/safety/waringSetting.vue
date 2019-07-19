<template>
  <div class="warning-setting">
      <h3 class="title">告警设置</h3>
      <!-- <div class="setting">
        <el-row>
          <el-col :span="24">
            <span class="news">请确认消息订阅中 "安全消息事件通知" 已打开</span>
            <el-button
              type="text"
              size="small"
              class="click-setting">点击进入设置</el-button>
          </el-col>
        </el-row>
      </div> -->

      <div class="table">
        <!-- {{tableData3}} -->
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <!-- <el-table-column

            width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="checked"></el-checkbox>
            </template> -->
          <!-- </el-table-column> -->
          <el-table-column
            label="通知项目"
            width="160">
            <template slot-scope="scope">{{ scope.row.notifyProject }}</template>
          </el-table-column>
          <el-table-column
            prop="sendRule"
            label="发送规则"
            width="160">
          </el-table-column>
          <el-table-column
            prop="sendFrequency"
            label="发送频率"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="通知方式"
            width="300">
            <template slot-scope="scope">
              <el-checkbox-group v-model='scope.row.checkList' @change="handleclick">
              <!-- <el-checkbox label="短信"></el-checkbox> -->
              <el-checkbox label="邮件"></el-checkbox>
              <!-- <el-checkbox label="站内信"></el-checkbox> -->
            </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="通知时间"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-radio v-model=scope.row.radio label="1">24小时</el-radio>
              <!-- <el-radio v-model=scope.row.radio label="2">仅8:00-20:00</el-radio> -->
            <!-- </el-checkbox-group> -->
            </template>
          </el-table-column>
        </el-table>
      </div>

  </div>
</template>

<script>
  import { setEmail} from "@/api/safety";


  export default {
    data() {
      return {
        tableData3: [{
          id: 1,
          notifyProject: '所有模块',
          sendRule: '服务器发生异常',
          sendFrequency: '每条一次',
          checkList: ['邮件'],
          radio:'1',
          status:"1"
        },
        // {
        //   id: 2,
        //   notifyProject: '文件检测',
        //   sendRule: '发生检测不一致',
        //   sendFrequency: '单台ESC一天最多一条  单账号一天最多5条',
        //   checkList: [],
        //   radio:'1'
        // }
        ],
        multipleSelection: [],
        status:'1'


      }
    },
    created() {
      // this.addsetEmail();
      this.getReceivemail()
    },
    methods: {
      checked(){},
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      getReceivemail(){
        let ser = 'Receivemail'
        let paramsData = '';
        setEmail(ser,paramsData).then(res=>{
            console.log('获取邮箱状态成功', res);
            this.status = res
            if(res==1){
              this.tableData3[0].checkList = ['邮件']
            }else{
              this.tableData3[0].checkList = []
            }
        }).catch(err=>{
            console.log('获取邮箱状态失败', err);
        })
      },

      addsetEmail(){
        let ser = 'setEmail'
        let paramsData = '<type>email</type><status>'+ this.status+'</status>';
        setEmail(ser,paramsData).then(res=>{
            this.$message(res);
            console.log('标记警告邮箱', res);
        }).catch(err=>{
            console.log('标记警告邮箱失败', err);
        })
        },
      handleclick() {
        if(this.tableData3[0].checkList.length>0){
          this.status = 1
        }else{
          this.status = 0          
        }
         
        // console.log(111);
        this.addsetEmail()
      }
    }


  }

</script>

<style>
  .warning-setting {
    /*width: 100%;*/
    height: 100%;
    background-color: #fff;
    margin-left: 0px;
    padding: 40px 20px;
    padding-top: 0;
  }
  .setting {
    background-color: #dbf1f9;
    border:1px solid #3ac0f1;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .setting .news {
    font-size: 12px;
    padding-left: 20px;
  }
  .click-setting {
    text-decoration: underline;
  }
  .title {
    line-height: 58px;
    font-size: 14px;
  }

  .el-table .el-table__header-wrapper thead tr th{
    height:35px;
    padding:0;
    background-color: #f0f2f7;
    color:#333;
  }

  .el-table .el-table__body-wrapper tbody tr td{
    height:35px;
    padding:2px 0;
  }

  .alert {
    /*position: relative;*/
    /*left:30px;*/
    width: 30px;
    height: 30px;
    background-color: #7d7d7d;
    opacity: 0.6;

  }
  .server {
    border:none;
  }

</style>