<template>
  <div class="ecm_monitor">
    <div class="top">
      <el-row>
          <el-col :span="24">
            <div class="left mb10" v-loading="loading1">
              <p class="node_name bold-wei">{{name}} <span> 详情 </span></p>
              <span class="head-content" >名称 : {{serverDetail.vmName || '--'}} </span>
              <span class="head-content" >ID : {{serverDetail.id || '--' }} </span>
              <span class="head-content" >所在区域 : {{serverDetail.zoneName || '--' }} </span>
              <span class="head-content" >公网IP : {{serverDetail.publicip || '--' }} </span>
              <span class="head-content" >内网IP : {{serverDetail.nic ? serverDetail.nic[0].ipaddress : '--' }} </span>
              <span class="head-content" >操作平台 : {{serverDetail.osStyle || '--' }} </span>
              <span class="head-content" >防护状态 : {{statusName }} </span>
            </div>
          </el-col>
      </el-row>
      <div class="content">
        <div class="template_title">
          <el-radio-group v-model="template_type" size="small" fill="#3ac7fa" @change="getDetailsCon">
            <el-radio-button label="default">资产清点</el-radio-button>
            <el-radio-button label="custom">异常登录</el-radio-button>
            <el-radio-button label="check">文件一致性检测</el-radio-button>
            <el-radio-button label="checkDetail" v-if="aType=='4'">文件一致性检测事件详情</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <!-- 资产清点 -->
      <div class="template_default" v-show="isDefault && !isCustom && !isCheck && !isCheckDetail">
        <h4 class="ser-choose bold-wei">资产清点</h4>
        <div class="content-list-1">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="监听端口" name="first" >
              <div class="server-table-content" style="border-top:none" >
                <div class="server-table-f">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="15">
                        <div class="table-left">
                          <p>数据最后获取时间：<span>
                            {{ecmListDataTime || '无'}}
                            </span>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span="9">
                        <el-input placeholder="端口号" v-model="input1" @keyup.native='showDuan' class="input-with-select" size="small" style="width:350px">
                          <el-button slot="append" icon="el-icon-search" v-on:click="getCatchPortSearch"></el-button>
                        </el-input>
                      </el-col>
                    </el-row>
                  </div>
                <div v-loading="loading2">
                  <el-table
                          :show-overflow-tooltip="true"
                          :data="ecmListData"
                          style="width: 100%">
                    <el-table-column
                            prop="port"
                            label="监听端口号">
                    </el-table-column>
                    <el-table-column
                            prop="proto"
                            label="网络协议"
                           >
                    </el-table-column>
                    <el-table-column
                            prop="program_name"
                            label="对应进程"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="listen_ip"
                            label="绑定监听IP"
                           >
                    </el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      v-if="totalPageCP>10"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPageCP">
                    </el-pagination>
                    <el-pagination
                      v-else
                      layout="">
                    </el-pagination>
                  </div>
                </div>

              </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="运行进程" name="second">
              <div class="server-table-content">
                <div class="server-table-f">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="15">
                        <div class="table-left">
                          <p>数据最后获取时间：<span>
                            {{ecmListDataTime1 || '无'}}
                            </span>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span="9">
                        <el-input placeholder="进程名" v-model="input2" @keyup.native='showYun' class="input-with-select" size="small" style="width:350px">
                          <el-button slot="append" icon="el-icon-search" v-on:click="getRunProcessSearch"></el-button>
                        </el-input>
                      </el-col>
                    </el-row>
                  </div>
                <div v-loading="loading3">
                <el-table
                        :show-overflow-tooltip="true"
                        :data="ecmListData1"
                        style="width: 100%">
                  <el-table-column
                          prop="process_name"
                          :show-overflow-tooltip="true"
                          label="进程名">
                  </el-table-column>
                  <el-table-column
                          :show-overflow-tooltip="true"
                          prop="process_path"
                          label="进程路径"
                          >
                    <template slot-scope="scope">
                      {{scope.row.process_path.length == 0 ? '--' : scope.row.process_path}}
                    </template>
                  </el-table-column>
                  <el-table-column
                          :show-overflow-tooltip="true"
                          prop="init_parameters"
                          label="启动参数"
                  >
                    <template slot-scope="scope">
                      {{scope.row.init_parameters.length == 0 ? '--' : scope.row.init_parameters}}
                    </template>
                  </el-table-column>
                  <el-table-column
                          prop="init_time"
                          label="启动时间"
                          width="200"
                          >
                  </el-table-column>
                  <el-table-column
                          prop="user"
                          label="运行用户"
                          >
                  </el-table-column>
                  <el-table-column
                          prop="PID"
                          label="PID"
                          >
                  </el-table-column>
                  <el-table-column
                          prop="ppname"
                          label="父进程"
                          >
                  </el-table-column>
                  <!-- // <el-table-column
                  //         prop="file_md5"
                  //         label="文件MDS"
                  //         >
                  // </el-table-column> -->
                </el-table>
                <div class="pagination">
                  <el-pagination
                    v-if="totalPageRP>10"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-size="pageSize1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalPageRP">
                  </el-pagination>
                  <el-pagination
                    v-else
                    layout="">
                  </el-pagination>
                </div>
              </div>

            </div>
            </div>

            </el-tab-pane>
           
            <el-tab-pane label="账号信息" name="third">
              <div class="server-table-content">
                <div class="server-table-f">
                <div class="server-date">
                  <el-row>
                    <el-col :span="15">
                      <div class="table-left">
                        <p>数据最后获取时间：<span>
                          {{ecmListDataTime2 || '无'}}
                          </span>
                        </p>
                      </div>

                    </el-col>
                    <el-col :span="9">
                      <el-input placeholder="用户名" v-model="input3" @keyup.native='showUsername' class="input-with-select" size="small" style="width:350px">
                        <el-button slot="append" icon="el-icon-search" v-on:click="getUserMsgSearch">
                        </el-button>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
                <div v-loading="loading4">
                  <el-table
                          :show-overflow-tooltip="true"
                          :data="ecmListData2"
                          style="width: 100%">
                    <el-table-column
                            prop="username"
                            label="用户名">
                        <template slot-scope="scope">
                          {{scope.row.username==""  ? '--' :scope.row.username }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="用户组"
                           >
                        <template slot-scope="scope">
                          {{scope.row.groups==""  ? '--' :scope.row.groups }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="到期时间"
                    >
                        <template slot-scope="scope">
                          {{scope.row.expireTime ==""  ? '--' : scope.row.expireTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                
                            label="上次登录时间"
                           >
                           <template slot-scope="scope">
                            {{scope.row.lastLoginTime.length < 10 ? '--' : scope.row.lastLoginTime}}
                          </template>
                    </el-table-column>
                    <el-table-column
                            label="上次登录IP"
                           >
                           <template slot-scope="scope">
                            {{scope.row.sourceip.length < 5 ? '--' : scope.row.sourceip}}
                          </template>
                    </el-table-column>
                    <el-table-column
                            label="上报时间"
                           >
                        <template slot-scope="scope">
                          {{scope.row.createtime ==""  ? '--' : scope.row.createtime}}
                        </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      v-if="totalPageUM>10"
                      @size-change="handleSizeChange2"
                      @current-change="handleCurrentChange2"
                      :current-page="currentPage2"
                      :page-size="pageSize2"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPageUM">
                    </el-pagination>
                    <el-pagination
                      v-else
                      layout="">
                    </el-pagination>
                  </div>
                </div>

              </div>
              </div>

            </el-tab-pane>
            <el-tab-pane label="软件管理" name="fourth">
              <div class="server-table-content">
                <div class="server-table-f">
                <div class="server-date">
                  <el-row>
                    <el-col :span="15">
                      <div class="table-left">
                        <p>数据最后获取时间：<span>
                          {{ecmListDataTime3 || '无'}}
                          </span>
                          <!-- <span class="reget-t" v-on:click="getSoftManagement">重新获取</span> -->
                        </p>
                      </div>

                    </el-col>
                    <el-col :span="9">
                      <el-input placeholder="软件名称" v-model="input4" @keyup.native='showRuan' class="input-with-select" size="small" style="width:350px">
                        <el-button slot="append" icon="el-icon-search" v-on:click="getSoftManagementSearch">
                        </el-button>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
                <div v-loading="loading5">
                  <el-table
                          :show-overflow-tooltip="true"
                          :data="softWareListData"
                          style="width: 100%">
                    <el-table-column
                            label="软件名">
                        <template slot-scope="scope">
                          {{scope.row.software_name ==""  ? '--' : scope.row.software_name}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="软件版本"
                           >
                        <template slot-scope="scope">
                          {{scope.row.version ==""  ? '--' : scope.row.version}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="软件最后更新时间"
                    >
                        <template slot-scope="scope">
                          {{scope.row.update_time  ? scope.row.update_time : '--'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="上报时间"
                           >
                        <template slot-scope="scope">
                          {{scope.row.createtime ==""  ? '--' : scope.row.createtime}}
                        </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      v-if="totalPageSM>10"
                      @size-change="handleSizeChangeSoft"
                      @current-change="handleCurrentChangeSoft"
                      :current-page="currentPageSoft"
                      :page-size="pageSizeSoft"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalPageSM">
                    </el-pagination>
                    <el-pagination
                      v-else
                      layout="">
                    </el-pagination>
                  </div>
                </div>

              </div>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
      <!-- 异常登录 -->
      <div class="template_custom" v-show="!isDefault && isCustom && !isCheck && !isCheckDetail">
        <h4 class="ser-choose bold-wei">异常登录</h4>
        <div class="content-list-1">
          <el-tabs v-model="activeName1" @tab-click="handleClick">
            <el-tab-pane label="异地登录" name="first">
              <div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor,'ownColor':!isChangeColor}" type="plain" @click="markDispose">
                            标记为已处理
                          </p>

                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-loading="loading6">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="ecmListData3"
                            style="width: 100%"
                            @filter-change="errorFilterChange"
                            @selection-change="handleSelectionChange">
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="180">
                      </el-table-column>
                      <el-table-column
                              prop="logindate"
                              width="180"
                              label="登录时间"
                             >
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="80"
                              :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
                              column-key = 'filter1'
                              :filter-multiple="false"
                      >
                      <template slot-scope="scope">
                        <!-- {{scope.row.status == 0 ?　"未处理" : "已处理"}} -->
                        <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status==0?'未处理':'已处理'}}</span>
                      </template>
                      </el-table-column>
                      <el-table-column
                              prop="loginuser"
                              label="对应用户名"
                              width="80"
                             >
                            <template slot-scope="scope">
                              <span>{{scope.row.loginuser == '' ? '--' : scope.row.loginuser}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                              prop="logintype"
                              label="登录类型"
                              >
                      </el-table-column>
                      <el-table-column
                              prop="sourceip"
                              label="登录源IP"
                              width="200"
                              >
                            <template slot-scope="scope">
                              <span>{{scope.row.sourceip == '' ? '--' : scope.row.sourceip}}</span>
                            </template>

                      </el-table-column>    
                      <el-table-column
                        prop="status"
                        label="安全等级"
                        :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
                        column-key = 'filter11'
                        :filter-multiple="false"
                        filter-placement="bottom-start">
                        <template slot-scope="scope">
                          <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
                        </template>
                      </el-table-column> 
                      <!-- <el-table-column
                              prop="warningType"
                              label="告警类型"
                              width="140"
                              :filters="[{text: '异地登录', value: '异地登录'}, {text: '爆破登录', value: '爆破登录'}, {text: '非法IP登录', value: '非法IP登录'}, {text: '非法账号登录', value: '非法账号登录'}, {text: '非法时间登录', value: '非法时间登录'}]"
                              :filter-multiple="false"
                      >
                      </el-table-column> -->
                      <el-table-column
                              prop="operation"
                              label="操作"
                              >
                              <template slot-scope="scope" >
                                <el-button
                                  size="small"
                                  type="text" v-on:click="getModel(scope.row.sshexceptioneventid)" :disabled="scope.row.status == 1">标记为已处理</el-button>
                              </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                        v-if="totalPageLE1>10"
                        @size-change="handleSizeChange3"
                        @current-change="handleCurrentChange3"
                        :current-page="currentPage3"
                        :page-size="pageSize3"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageLE1">
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout="">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="暴力破解" name="second">
              <div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor1,'ownColor':!isChangeColor1}"  @click="markDispose">
                            标记为已处理
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                  <div v-loading="loading7">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="ecmListData7"
                            @filter-change="errorFilterChange"
                            style="width: 100%"
                            @selection-change="handleSelectionChange1">
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="180">
                      </el-table-column>
                      <el-table-column
                              prop="logindate"
                              width="190"
                              label="登录时间"
                             >
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="60"
                              :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
                              column-key = 'filter2'
                              :filter-multiple="false"
                      >
                      <template slot-scope="scope">
                        <!-- {{scope.row.status == 0 ?　"未处理" : "已处理"}} -->
                        <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status==0?'未处理':'已处理'}}</span>
                      </template>
                      </el-table-column>
                      <el-table-column
                              prop="loginuser"
                              label="对应用户名"
                             >
                          <template slot-scope="scope">
                            <span>{{scope.row.loginuser == '' ? '--' : scope.row.loginuser}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                              prop="logintype"
                              label="登录类型"
                              >
                      </el-table-column>
                      <el-table-column
                              prop="sourceip"
                              label="登录源IP"
                              width="200"
                              >
                            <template slot-scope="scope">
                              <span>{{scope.row.sourceip == '' ? '--' : scope.row.sourceip}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="安全等级"
                        :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
                        column-key = 'filter22'
                        :filter-multiple="false"
                        filter-placement="bottom-start">
                        <template slot-scope="scope">
                          <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="operation"
                              label="操作"
                              >
                        <template slot-scope="scope">
                          <el-button type="text" size="small" v-on:click="getModel(scope.row.sshexceptioneventid)"
                          :disabled="scope.row.status == 1">标记为已处理</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                        v-if="totalPageLE5>10"
                        @size-change="handleSizeChange8"
                        @current-change="handleCurrentChange8"
                        :current-page="currentPage7"
                        :page-size="pageSize7"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageLE5">
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout="">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div></el-tab-pane>
            <el-tab-pane label="非法IP登录" name="third"><div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor2,'ownColor':!isChangeColor2}" @click="markDispose">
                            标记为已处理
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                  <div v-loading="loading8">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="ecmListData4"
                            @filter-change="errorFilterChange"
                            style="width: 100%"
                            @selection-change="handleSelectionChange2">
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="180">
                      </el-table-column>
                      <el-table-column
                              prop="logindate"
                              width="180"
                              label="登录时间"
                             >
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="80"
                              :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
                              column-key = 'filter3'
                              :filter-multiple="false"
                      >
                        <template slot-scope="scope">
                          <!-- {{scope.row.status === "0" ? "未处理" : "已处理"}} -->
                          <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status==0?'未处理':'已处理'}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="loginuser"
                              label="对应用户名"
                             >
                            <template slot-scope="scope">
                              <span>{{scope.row.loginuser == '' ? '--' : scope.row.loginuser}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                              prop="logintype"
                              label="登录类型"
                              >
                      </el-table-column>
                      <el-table-column
                              prop="sourceip"
                              label="登录源IP"
                              width="200"
                              >
                            <template slot-scope="scope">
                              <span>{{scope.row.sourceip == '' ? '--' : scope.row.sourceip}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="安全等级"
                        :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
                        column-key = 'filter33'
                        :filter-multiple="false"
                        filter-placement="bottom-start">
                        <template slot-scope="scope">
                          <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column
                              prop="typewarn"
                              label="告警类型"
                              width="140"
                              :filters="[{text: '异地登录', value: '异地登录'}, {text: '爆破登录', value: '爆破登录'}, {text: '非法IP登录', value: '非法IP登录'}, {text: '非法账号登录', value: '非法账号登录'}, {text: '非法时间登录', value: '非法时间登录'}]"
                              :filter-multiple="false"
                      >
                      </el-table-column> -->
                      <el-table-column
                              prop="operation"
                              label="操作"
                              >
                        <template slot-scope="scope">
                          <el-button type="text" size="small" v-on:click="getModel(scope.row.sshexceptioneventid)" :disabled="scope.row.status == 1">标记为已处理</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                        v-if="totalPageLE2>10"
                        @size-change="handleSizeChange4"
                        @current-change="handleCurrentChange4"
                        :current-page="currentPage4"
                        :page-size="pageSize4"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageLE2">
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout="">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="非法账号登录" name="fourth">
              <div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor3,'ownColor':!isChangeColor3}" @click="markDispose">
                            标记为已处理
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                  <div v-loading="loading9">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="ecmListData5"
                            @filter-change="errorFilterChange"
                            style="width: 100%"
                            @selection-change="handleSelectionChange3">
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="180">
                      </el-table-column>
                      <el-table-column
                              prop="logindate"
                              width="180"
                              label="登录时间"
                             >
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="80"
                              :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
                              column-key = 'filter4'
                              :filter-multiple="false"
                      >
                      <template slot-scope="scope">
                        <!-- {{scope.row.status === "0" ? "未处理" : "已处理"}} -->
                        <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status==0?'未处理':'已处理'}}</span>
                      </template>
                      </el-table-column>
                      <el-table-column
                              prop="loginuser"
                              label="对应用户名"
                             >
                            <template slot-scope="scope">
                              <span>{{scope.row.loginuser == '' ? '--' : scope.row.loginuser}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                              prop="logintype"
                              label="登录类型"
                              >
                      </el-table-column>
                      <el-table-column
                              prop="sourceip"
                              label="登录源IP"
                              width="200"
                              >
                            <template slot-scope="scope">
                              <span>{{scope.row.sourceip == '' ? '--' : scope.row.sourceip}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="安全等级"
                        :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
                        column-key = 'filter44'
                        :filter-multiple="false"
                        filter-placement="bottom-start">
                        <template slot-scope="scope">
                          <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column
                              prop="typewarn"
                              label="告警类型"
                              width="140"
                              :filters="[{text: '异地登录', value: '异地登录'}, {text: '爆破登录', value: '爆破登录'}, {text: '非法IP登录', value: '非法IP登录'}, {text: '非法账号登录', value: '非法账号登录'}, {text: '非法时间登录', value: '非法时间登录'}]"
                              :filter-multiple="false"
                      >
                      </el-table-column> -->
                      <el-table-column
                              prop="operation"
                              label="操作"
                              >
                        <template slot-scope="scope">
                          <el-button type="text" size="small" v-on:click="getModel(scope.row.sshexceptioneventid)"  :disabled="scope.row.status == 1">标记为已处理</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                        v-if="totalPageLE3>10"
                        @size-change="handleSizeChange5"
                        @current-change="handleCurrentChange5"
                        :current-page="currentPage5"
                        :page-size="pageSize5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageLE3">
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout="">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="非法时间登录" name="fifth"><div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor4,'ownColor':!isChangeColor4}" v-on:click="markDispose">
                            标记为已处理
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-loading="loading10">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="ecmListData6"
                            @filter-change="errorFilterChange"
                            style="width: 100%"
                            @selection-change="handleSelectionChange4">
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="180">
                      </el-table-column>
                      <el-table-column
                              prop="logindate"
                              width="180"
                              label="登录时间"
                             >
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="80"
                              :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
                              column-key = 'filter5'
                              :filter-multiple="false"
                      >
                      <template slot-scope="scope">
                        <!-- {{scope.row.status == 0 ? "未处理" : "已处理"}} -->
                        <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status==0?'未处理':'已处理'}}</span>
                      </template>
                      </el-table-column>
                      <el-table-column
                              prop="loginuser"
                              label="对应用户名"
                             >
                             <template slot-scope="scope">
                            <span>{{scope.row.loginuser == '' ? '--' : scope.row.loginuser}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                              prop="logintype"
                              label="登录类型"
                              >
                      </el-table-column>
                      <el-table-column
                              prop="sourceip"
                              label="登录源IP"
                              width="200"
                              >
                            <template slot-scope="scope">
                              <span>{{scope.row.sourceip == '' ? '--' : scope.row.sourceip}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="安全等级"
                        :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
                        column-key = 'filter55'
                        :filter-multiple="false"
                        filter-placement="bottom-start">
                        <template slot-scope="scope">
                          <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column
                              prop="typewarn"
                              label="告警类型"
                              width="140"
                              :filters="[{text: '异地登录', value: '异地登录'}, {text: '爆破登录', value: '爆破登录'}, {text: '非法IP登录', value: '非法IP登录'}, {text: '非法账号登录', value: '非法账号登录'}, {text: '非法时间登录', value: '非法时间登录'}]"
                              :filter-multiple="false"
                      >
                      </el-table-column> -->
                      <el-table-column
                              prop="operation"
                              label="操作"
                              >
                        <template slot-scope="scope">
                          <el-button type="text" size="small" v-on:click="getModel(scope.row.sshexceptioneventid)"  :disabled="scope.row.status == 1">标记为已处理</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                        v-if="totalPageLE4>10"
                        @size-change="handleSizeChange6"
                        @current-change="handleCurrentChange6"
                        :current-page="currentPage6"
                        :page-size="pageSize6"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageLE4"
                        >
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout=""
                        >
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="爆破登录" name="six"><div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor4,'ownColor':!isChangeColor4}" v-on:click="markDispose">
                            标记为已处理
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-loading="loading11">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="ecmListData8"
                            @filter-change="errorFilterChange"
                            style="width: 100%"
                            @selection-change="handleSelectionChange4">
                      <el-table-column
                              type="selection"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="180">
                      </el-table-column>
                      <el-table-column
                              prop="logindate"
                              width="180"
                              label="登录时间"
                             >
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="80"
                              :filters="[{ text: '未处理', value: '0' }, { text: '已处理', value: '1' }]"
                              column-key = 'filter6'
                              :filter-multiple="false"
                      >
                      <template slot-scope="scope">
                        <!-- {{scope.row.status == 0 ? "未处理" : "已处理"}} -->
                        <span :class="{'red':scope.row.status==0,'green':scope.row.status==1}">{{scope.row.status==0?'未处理':'已处理'}}</span>
                      </template>
                      </el-table-column>
                      <el-table-column
                              prop="loginuser"
                              label="对应用户名"
                             >
                             <template slot-scope="scope">
                            <span>{{scope.row.loginuser == '' ? '--' : scope.row.loginuser}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                              prop="logintype"
                              label="登录类型"
                              >
                      </el-table-column>
                      <el-table-column
                              prop="sourceip"
                              label="登录源IP"
                              width="200"
                              >
                            <template slot-scope="scope">
                              <span>{{scope.row.sourceip == '' ? '--' : scope.row.sourceip}}</span>
                            </template>
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="安全等级"
                        :filters="[{ text: '低', value: '0' }, { text: '高', value: '1' }]"
                        column-key = 'filter66'
                        :filter-multiple="false"
                        filter-placement="bottom-start">
                        <template slot-scope="scope">
                          <span>{{scope.row.severity == 0 ? '低' : '高'}}</span>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column
                              prop="typewarn"
                              label="告警类型"
                              width="140"
                              :filters="[{text: '异地登录', value: '异地登录'}, {text: '爆破登录', value: '爆破登录'}, {text: '非法IP登录', value: '非法IP登录'}, {text: '非法账号登录', value: '非法账号登录'}, {text: '非法时间登录', value: '非法时间登录'}]"
                              :filter-multiple="false"
                      >
                      </el-table-column> -->
                      <el-table-column
                              prop="operation"
                              label="操作"
                              >
                        <template slot-scope="scope">
                          <el-button type="text" size="small" v-on:click="getModel(scope.row.sshexceptioneventid)"  :disabled="scope.row.status == 1">标记为已处理</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <!-- 9999 -->
                      <el-pagination
                        v-if="totalPageLE6>10"
                        @size-change="handleSizeChange9"
                        @current-change="handleCurrentChange9"
                        :current-page="currentPage9"
                        :page-size="pageSize9"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageLE6"
                        >
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout=""
                        >
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </div>
      <!-- 文件检测一致性 -->
      <div class="template_check" v-show="!isDefault && !isCustom && isCheck && !isCheckDetail">
        <h4 class="ser-choose bold-wei">文件一致性检测</h4>
        <div class="content-list-1">
          <el-tabs v-model="activeName2" @tab-click="handleClick">
            <el-tab-pane label="严重" name="first">
              <div class="server-table-content">
                <div class="server-table-f server-table-f-1">
                  <div class="server-date">
                    <el-row>
                      <el-col :span="24">
                        <div class="table-left">
                          <p class="marked-pro" :class="{'changeColor':isChangeColor5,'ownColor':!isChangeColor5}" v-on:click="markDispose1">
                            标记为已处理
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>

                  <div v-loading="loading12">
                    <el-table
                            :show-overflow-tooltip="true"
                            :data="integrityData"
                            @filter-change="itegrityFilterChange"
                            style="width: 100%"
                            @selection-change="handleSelectionChangeInteri">
                      <el-table-column
                              type="selection"
                             :selectable="checkboxInit"
                              width="50">
                      </el-table-column>
                      <el-table-column
                              prop="agent_ip"
                              label="云服务器名称"
                              width="130">
                      </el-table-column>
                      <el-table-column
                              label="规则名称"
                              :show-overflow-tooltip="true"
                             >
                        <template slot-scope="scope">
                          <el-tooltip placement="bottom" class="item" effect="dark">
                            <div slot="content">{{scope.row.name}}</div>
                            <div class="itegrityStyle">{{scope.row.name}}</div>
                          </el-tooltip>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="status"
                              label="状态"
                              width="80"
                              :filters="[{ text: '未处理', value: '1' }, { text: '已处理', value: '0' }]"
                              column-key = 'filter12'
                              :filter-multiple="false"
                      >
                        <template slot-scope="scope">
                          <span :class="{'red':scope.row.status==1,'green':scope.row.status==0}">{{scope.row.status == "0" ? "已处理" : "未处理"}}</span>
                          
                        </template>
                      </el-table-column>
                      <el-table-column
                              label="文件"
                              width="80"
                              :show-overflow-tooltip="true"
                             >
                        <template slot-scope="scope">
                          <!-- <el-tooltip placement="bottom" class="item" effect="dark">
                            <div slot="content">{{scope.row.path}}</div>
                            <div class="itegrityStyle">{{scope.row.path}}</div>
                          </el-tooltip> -->
                          <router-link :to='{ name: "serverdetails",params: {ip:scope.row.agent_ip,id:scope.row.host_id,zone_id:currentId,guid:scope.row.agent_guid,integrityEventID:scope.row.IntegrityEventID,atype:atype1}}'> 
                            <el-button type="text" size="mini">{{scope.row.path==""?"--":scope.row.path}}</el-button>
                          </router-link>
                        </template>
                      </el-table-column>
                      <el-table-column
                          label="检测周期"
                          :show-overflow-tooltip="true">
                          <template slot-scope="scope">
                            {{scope.row.checkTime==""?"--":scope.row.checkTime}}
                          </template>
                      </el-table-column>
                      <el-table-column
                              width="100"
                              label="严重级别"
                              :filters="[{ text: '严重', value: '7' }]"
                              column-key = 'filter2'
                              :filter-multiple="false"
                              >
                        <template slot-scope="scope">
                          {{scope.row.severity == 7 ? "严重" : ""}}
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="LogDate"
                              label="最近发生时间"
                              width="160"
                              :show-overflow-tooltip="true">
                      </el-table-column>
                      <el-table-column
                              label="描述"
                              :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                          <el-tooltip 
                            placement="bottom" 
                            class="item" 
                            effect="dark"
                            >
                            <div slot="content" v-html='scope.row.full_log'></div>
                            <div class="itegrityStyle" >{{scope.row.full_log==""?"--":scope.row.full_log}}</div>
                          </el-tooltip>
                        </template>
                      </el-table-column>
                      <el-table-column
                              prop="operation"
                              label="操作"
                              width="150"
                              >
                        <template slot-scope="scope">
                          <el-button
                            v-on:click="getModel1(scope.row.IntegrityEventID)"
                            type="text"
                            size="small"
                            :disabled="scope.row.status == 0">标记为已处理
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <div class="pagination">
                      <el-pagination
                        v-if="totalPageIE>10"
                        @size-change="handleSizeChange7"
                        @current-change="handleCurrentChange7"
                        :current-page="currentPage8"
                        :page-size="pageSize8"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalPageIE"
                        >
                      </el-pagination>
                      <el-pagination
                        v-else
                        layout=""
                        >
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 文件一致性检测详情 -->
      <div class="template_checkDetail" v-show="!isDefault && !isCustom && !isCheck && isCheckDetail">
        <div class='ind_monitor'>
        <div class="content" v-loading="loading13">

            <div class="content_middle">
                <p>描述</p>
                <div class='con-min'>
                    <label>文件：</label>
                    <span class="right">{{result.Path}}</span>
                </div>  
            </div>
            <div class="bar" v-if="result.md5_before!=''||result.md5_after!=''">
                <el-container style="position:relative;">
                    <el-aside width="60px" class="in-block bar_aside" style="position:absolute;top:0;left:0;">md5</el-aside>
                    <el-main class="in-block">
                        <div>
                            <label>旧值：</label>
                            <span class="right">{{result.md5_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label>
                            <span>{{result.md5_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.owner_before!=''||result.owner_after!=''">
                <el-container style="position:relative;">
                    <el-aside width="60px" class="in-block bar_aside" style="position:absolute;top:0;left:0;">所有者</el-aside>
                    <el-main class="in-block">
                        <div>
                            <label>旧值：</label>
                            <span class="right">{{result.owner_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label>
                            <span >{{result.owner_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.gowner_before!=''||result.gowner_after!=''">
                <el-container style="position:relative;">
                    <el-aside width="60px" class="in-block bar_aside" style="position:absolute;top:0;left:0;">组</el-aside>
                    <el-main class="in-block">
                        <div>
                            <label>旧值：</label><span class="right">{{result.gowner_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.gowner_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.perm_before!=''||result.perm_after!=''">
                <el-container style="position:relative;">
                    <el-aside width="60px" class="in-block bar_aside" style="position:absolute;top:0;left:0;">权限</el-aside>
                    <el-main class="in-block">
                        <div>
                            <label>旧值：</label><span class="right">{{result.perm_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.perm_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.sha1_before!=''||result.sha1_after!=''">
                <el-container style="position:relative;">
                    <el-aside width="60px" class="in-block bar_aside" style="position:absolute;top:0;left:0;">SHA-1</el-aside>
                    <el-main class="in-block">
                        <div>
                            <label>旧值：</label><span class="right">{{result.sha1_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label><span >{{result.sha1_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="bar footer" v-if="result.size_before!=''||result.size_after!=''">
                <el-container style="position:relative;">
                    <el-aside width="60px" class="in-block bar_aside" style="position:absolute;top:0;left:0;">大小</el-aside>
                    <el-main class="in-block">
                        <div>
                            <label>旧值：</label>
                            <span class="right">{{result.size_before}}</span>
                        </div>
                        <div>
                            <label>新值：</label>
                            <span >{{result.size_after}}</span>
                        </div>
                    </el-main>
                </el-container>
            </div>
            <div class="content_middle" style="border-top:0">
                <p style="display:inline-block;">修改内容</p>
                <span style="color:red;">(a、d、c、&gt;、&lt; (添加、删除、改变、添加的内容、删除内容),a、d、c左边是原文件、右边是改变后的文件，数字代表行号，两个数字间有逗点，代表是连续的行。)
                </span>
            </div>
            <div class="bar1 footer" v-if="result.whatchanged!=''">
                <el-container style="display:-webkit-box;">
                <!-- height:200px; -->
                    <el-aside width="60px" class="bar_center_aside" style="display:-webkit-box;">
                    <div style="display:inline-block;">修改内容</div></el-aside>
                    <el-main class="in-block" style="padding-left:20px;">
                        <div>
                            <span class="right" v-html="whatchangedLi"></span>
                        </div>
                    </el-main>
                </el-container>
            </div>
        </div>
        </div>
      </div>
      <el-dialog style='width:80%;margin:0px auto 50px;'
        title="选择应用的云服务器"
        :visible.sync="dialogUpdateVisiblePose">
        <div style="width:100%;display:inline-block;position: relative">
          <i>
            <svg-icon icon-class="warn" style="font-size:50px;margin-left: 30%;color:#f9cd76;"></svg-icon>
          </i>
          <p
          style="text-align:center;display:inline-block;auto;position: absolute;top:15px;margin-left:10px">是否确定标记为已处理</p>
        </div>

        
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogUpdateVisiblePose = false"
            class="f_btn f_btn_l">取 消</el-button><el-button
            type="primary"
            @click="getUpdateExceptionStatus()"
            class="f_btn f_btn_r">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog style='width:80%;margin:0px auto 50px;'
        title="选择应用的云服务器"
        :visible.sync="dialogUpdateVisiblePose1">
        <p
          style="text-align:center;display:block;margin:40px auto;">是否确定标记为已处理</p>
        <div slot="footer" class="dialog-footer">
          <el-button
            @click="dialogUpdateVisiblePose1 = false"
            class="f_btn f_btn_l">取 消</el-button><el-button
            type="primary"
            @click="getUpdateIntegerityEventBtnStatus()"
            class="f_btn f_btn_r">确 定</el-button>
        </div>
      </el-dialog>

  </div>
</div>

</template>

<script>
import RegionList from "@/components/RegionList";
import ConsoleTable from "@/components/ConsoleTable";
import {
  catchPort,
  runProcess,
  userMsg,
  logException,
  integrityEventList,
  updateIntegerityEventStatus,
  softManage,
  agentDetails
} from "@/api/safety";
import $ajax from "axios";
import i18n from "@/lang";

export default {
  components: {
    RegionList,
    ConsoleTable
  },
  data() {
    return {
      empty: "--",
      name: "123.123.123.12",
      loading: false,
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      select: "",
      markPose: "",
      isChangeColor: false,
      isChangeColor1: false,
      isChangeColor2: false,
      isChangeColor3: false,
      isChangeColor4: false,
      isChangeColor5: false,
      detailsType: "",
      agentGuid: "",
      hostId: 267,
      template_type: "default",
      activeName: "first",
      activeName1: "first",
      activeName2: "first",
      value4: "",
      multipleSelection: [],
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      loading5: true,
      loading6: true,
      loading7: true,
      loading8: true,
      loading9: true,
      loading10: true,
      loading11: true,
      loading12: true,
      loading13: true,
      currentId: 1,
      pageSize: 10,
      pageSize1: 10,
      pageSize2: 10,
      pageSize3: 10,
      pageSize4: 10,
      pageSize5: 10,
      pageSize6: 10,
      pageSize7: 10,
      pageSize8: 10,
      pageSize9: 10,
      pageSizeSoft: 10,
      totalPageCP: 1,
      totalPageRP: 1,
      totalPageSM: 1,
      totalPageUM: 1,
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1,
      currentPage5: 1,
      currentPage6: 1,
      currentPage7: 1,
      currentPage8: 1,
      currentPage9: 1,

      currentPageSoft: 1,
      totalPageLE1: 1,
      totalPageLE2: 1,
      totalPageLE3: 1,
      totalPageLE4: 1,
      totalPageLE5: 1,
      totalPageLE6: 1,
      totalPageIE: 1,
      exception_status: "0,1",
      exception_status1: "0,1",
      dialogUpdateVisiblePose: false,
      dialogUpdateVisiblePose1: false,
      areas: [
        {
          name: "名称",
          uuid: ""
        },
        {
          name: "ID",
          uuid: ""
        },
        {
          name: "所在区域",
          uuid: ""
        },
        {
          name: "公网IP",
          uuid: ""
        },
        {
          name: "内网IP",
          uuid: ""
        },
        {
          name: "操作平台",
          uuid: ""
        },
        {
          name: "防护状态",
          uuid: ""
        }
      ],
      serverDetail: [],
      statusName: "",
      Pagination: {
        pagingData: [10, 20, 50],
        total: 0,
        show: false
      },
      ecmListData: [],
      ecmListData1: [],
      ecmListData2: [],
      ecmListData3: [],
      ecmListData4: [],
      ecmListData5: [],
      ecmListData6: [],
      ecmListData7: [],
      ecmListData8: [],
      integrityData: [],
      softWareListData: [],
      ecmListDataTime: "",
      ecmListDataTime1: "",
      ecmListDataTime2: "",
      ecmListDataTime3: "",
      aaa: "",
      severity: "0,1",
      IntegrityEventID:'',
      result:'',
      whatchangedName:'',
      whatchangedLi:[],
      atype1:'4',
      aType:'',
    };
  },
  created() {
    this.create();
    this.getCatchPort();
    this.getRunProcess();
    this.getUserMsg();
    this.getLogException();
    this.getIntegrityEventList();
    this.getSoftManagement();
    this.getAgentDetails();
    this.judgeType();
    this.getDetails();
    //监听触发操作
    function hashChange() {}
    function hashChange1() {
      // alert('2132')
      sessionStorage.removeItem("templateType");
    }

    //url变化监听器
    if (
      "onhashchange" in window &&
      (typeof document.documentMode === "undefined" ||
        document.documentMode == 8)
    ) {
      // 浏览器支持onhashchange事件
      window.onhashchange = hashChange(); // TODO，对应新的hash执行的操作函数
    } else {
      console.log(123123);
      window.onhashchange = hashChange1();
    }
  },

  methods: {

    checkboxInit(row,index){
      if (row.status == 0) 
        return 0;//不可勾选
      else
        return 1;//可勾选
    },
    errorFilterChange(value) {
      if (value.filter1) {
        // 筛选状态
        if (value.filter1.length > 0) {
          this.exception_status = value.filter1.join(",");
          this.currentPage3 = 1;
        } else {
          this.exception_status = "1,0";
        }
        this.getLogExceptionRegion();
      } else if (value.filter2) {
        // 筛选状态
        if (value.filter2.length > 0) {
          this.exception_status = value.filter2.join(",");
          this.currentPage7 = 1;
        } else {
          this.exception_status = "1,0";
        }
        this.getLogExceptionBlasting();
      } else if (value.filter3) {
        // 筛选状态
        if (value.filter3.length > 0) {
          this.exception_status = value.filter3.join(",");
          this.currentPage4 = 1;
        } else {
          this.exception_status = "1,0";
        }
        this.getLogExceptionIp();
      } else if (value.filter4) {
        // 筛选状态
        if (value.filter4.length > 0) {
          this.exception_status = value.filter4.join(",");
          this.currentPage5 = 1;
        } else {
          this.exception_status = "1,0";
        }
        this.getLogExceptionUser();
      } else if (value.filter5) {
        // 筛选状态
        if (value.filter5.length > 0) {
          this.exception_status = value.filter5.join(",");
          this.currentPage6 = 1;
        } else {
          this.exception_status = "1,0";
        }
        this.getLogExceptionTime();
      } else if (value.filter6) {
        // 筛选状态
        if (value.filter6.length > 0) {
          this.exception_status = value.filter6.join(",");
          this.currentPage6 = 1;
        } else {
          this.exception_status = "1,0";
        }
        this.getLogExceptionBlasting2();
      } else if (value.filter11) {
        // 筛选状态
        if (value.filter11.length > 0) {
          this.severity = value.filter11.join(",");
          this.currentPage6 = 1;
        } else {
          this.severity = "1,0";
        }
        this.getLogExceptionRegion();
      } else if (value.filter22) {
        // 筛选状态
        if (value.filter22.length > 0) {
          this.severity = value.filter22.join(",");
          this.currentPage6 = 1;
        } else {
          this.severity = "1,0";
        }
        this.getLogExceptionBlasting();
      } else if (value.filter33) {
        // 筛选状态
        if (value.filter33.length > 0) {
          this.severity = value.filter33.join(",");
          this.currentPage6 = 1;
        } else {
          this.severity = "1,0";
        }
        this.getLogExceptionIp();
      } else if (value.filter44) {
        // 筛选状态
        if (value.filter44.length > 0) {
          this.severity = value.filter44.join(",");
          this.currentPage6 = 1;
        } else {
          this.severity = "1,0";
        }
        this.getLogExceptionUser();
      } else if (value.filter55) {
        // 筛选状态
        if (value.filter55.length > 0) {
          this.severity = value.filter55.join(",");
          this.currentPage6 = 1;
        } else {
          this.severity = "1,0";
        }
        this.getLogExceptionTime();
      } else if (value.filter66) {
        // 筛选状态
        if (value.filter66.length > 0) {
          this.severity = value.filter66.join(",");
          this.currentPage6 = 1;
        } else {
          this.severity = "1,0";
        }
        this.getLogExceptionBlasting2();
      }
    },
    itegrityFilterChange(value) {
      if (value.filter12) {
        // 筛选状态
        if (value.filter12.length > 0) {
          this.exception_status1 = value.filter12.join(",");
          console.log(this.exception_status1,33333)
          this.currentPage8 = 1;
        } else {
          this.exception_status1 = "1,0";
        }
        this.getIntegrityEventList();
      }
    },
    filterTag(value, row) {
      return row.status === value;
    },
    filterTag1(value, row) {
      return row.Severity == value;
    },
    judgeType() {
      this.detailsType = window.location.href.substring(
        window.location.href.length - 2
      );
      let aa =
          this.detailsType === "/1"
            ? "default"
            : this.detailsType === "12"
              ? "default"
              : this.detailsType === "13"
                ? "default"
                : this.detailsType === "14"
                  ? "default"
                  : this.detailsType === "/2" 
                    ? "custom" 
                    : this.detailsType === "/3" ? "check" : "checkDetail",
        bb = 
          this.detailsType === "14" 
          ? "fourth" 
          :  this.detailsType === "13" 
            ? "third"
            :  this.detailsType === "12" ? "second" : "first";
      this.getTemplateType();
      this.template_type = aa;
      this.activeName = bb;
    },
    getTemplateType() {
      let tType = sessionStorage.getItem("templateType");
      if (tType == null) {
        return;
      } else {
        this.template_type = tType;
      }
    },
    getCatchPortSearch() {
      this.currentPage = 1;
      this.getCatchPort();
    },
    getRunProcessSearch() {
      this.currentPage1 = 1;
      this.getRunProcess();
    },
    getUserMsgSearch() {
      this.currentPage2 = 1;
      this.getUserMsg();
    },
    getSoftManagementSearch() {
      this.currentPageSoft = 1;
      this.getSoftManagement();
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getCatchPort();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCatchPort();
    },
    handleSizeChange1(val) {
      this.currentPage1 = 1;
      this.pageSize1 = val;
      this.getRunProcess();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getRunProcess();
    },
    handleSizeChange2(val) {
      this.currentPage2 = 1;
      this.pageSize2 = val;
      this.getUserMsg();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getUserMsg();
    },
    handleSizeChange3(val) {
      this.pageSize3 = val;
      this.getLogExceptionRegion();
    },
    handleCurrentChange3(val) {
      this.currentPage3 = val;
      this.getLogExceptionRegion();
    },
    handleSizeChange8(val) {
      this.currentPage7 = 1;
      this.pageSize7 = val;
      this.getLogExceptionBlasting();
    },
    handleCurrentChange8(val) {
      this.currentPage7 = val;
      this.getLogExceptionBlasting();
    },
    handleSizeChange9(val) {
      this.currentPage9 = 1;
      this.pageSize9 = val;
      this.getLogExceptionBlasting2();
    },
    handleCurrentChange9(val) {
      this.currentPage9 = val;
      this.getLogExceptionBlasting2();
    },
    handleSizeChange4(val) {
      this.currentPage4 = 1;
      this.pageSize4 = val;
      this.getLogExceptionIp();
    },
    handleCurrentChange4(val) {
      this.currentPage4 = val;
      this.getLogExceptionIp();
    },
    handleSizeChange5(val) {
      this.currentPage5 = 1;
      this.pageSize5 = val;
      this.getLogExceptionUser();
    },
    handleCurrentChange5(val) {
      this.currentPage5 = val;
      this.getLogExceptionUser();
    },
    handleSizeChange6(val) {
      this.currentPage6 = 1;
      this.pageSize6 = val;
      this.getLogExceptionTime();
    },
    handleCurrentChange6(val) {
      this.currentPage6 = val;
      this.getLogExceptionTime();
    },
    handleSizeChange7(val) {
      this.currentPage8 = 1;
      this.pageSize8 = val;
      this.getIntegrityEventList();
    },
    handleCurrentChange7(val) {
      this.currentPage8 = val;
      this.getIntegrityEventList();
    },
    handleSizeChangeSoft(val) {
      this.currentPageSoft = 1;
      this.pageSizeSoft = val;
      this.getSoftManagement();
    },
    handleCurrentChangeSoft(val) {
      this.currentPageSoft = val;
      this.getSoftManagement();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.isChangeColor = val.length > 1 ? true : false;
    },
    handleSelectionChange1(val) {
      this.multipleSelection = val;
      this.isChangeColor1 = val.length > 1 ? true : false;
    },
    handleSelectionChange2(val) {
      this.multipleSelection = val;
      this.isChangeColor2 = val.length > 1 ? true : false;
    },
    handleSelectionChange3(val) {
      this.multipleSelection = val;
      this.isChangeColor3 = val.length > 1 ? true : false;
    },
    handleSelectionChange4(val) {
      this.multipleSelection = val;
      this.isChangeColor4 = val.length > 1 ? true : false;
    },
    handleSelectionChangeInteri(val) {
      this.multipleSelection = val;
      this.isChangeColor5 = val.length > 1 ? true : false;
    },
    checkSelectable(row) {
      return row.status == 0;
    },
    checkSelectable1(row) {
      return row.Status == 0;
    },
    create() {
      console.log(this.$route.params)
      let agentIp = this.$route.params.ip,
        hostId = this.$route.params.id,
        zoneId = this.$route.params.zone_id,
        agentGuid = this.$route.params.guid,
        IntegrityEventID = this.$route.params.integrityEventID,
        aType = this.$route.params.atype;

      this.name = agentIp;
      this.hostId = hostId;
      this.currentId = zoneId;
      this.agentGuid = agentGuid;
      this.IntegrityEventID = IntegrityEventID;
      this.aType = aType;
      // console.log(this.IntegrityEventID,agentIp)
      let aa = window.location.href;
    },
    //计算机详情信息
    getAgentDetails() {
      this.loading1 = true;
      let ser = "queryVMDetailByhost",
        paramStr =
          "<zoneId>" +
          this.currentId +
          "</zoneId>" +
          "<agentGuid>" +
          this.agentGuid +
          "</agentGuid>";
      agentDetails(ser, paramStr)
        .then(res => {
          // let serverDetails = eval('(' + res.vmDetail + ')');
          // console.log(123,serverDetails)
          this.statusName = res.statusName;
          if (res.vmDetail) {
            this.serverDetail = eval("(" + res.vmDetail + ")");
          }
          this.loading1 = false;
          // this.areas[0].uuid = serverDetails.vmName;
          // this.areas[1].uuid = serverDetails.id;
          // this.areas[2].uuid = serverDetails.zoneName;
          // this.areas[3].uuid = serverDetails.publicip;
          // this.areas[4].uuid = serverDetails.nic[0].ipaddress;
          // this.areas[5].uuid = serverDetails.osStyle;
          // this.areas[6].uuid = res.statusName;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //端口监听
    getCatchPort() {
      this.loading2 = true;
      let ser = "getPortNewEventByHostId",
        paramStr =
          "<hostId>" +
          this.hostId +
          "</hostId>" +
          "<portCondition>" +
          this.input1 +
          "</portCondition>" +
          "<page>" +
          this.currentPage +
          "</page><onePageSize>" +
          this.pageSize +
          "</onePageSize>";
      catchPort(ser, paramStr)
        .then(res => {
          this.ecmListDataTime = res.newportList
            ? res.newportList[0].LogDate
            : "无数据";
          this.ecmListData = res.newportList;
          this.totalPageCP = res.totalElements;
          this.loading2 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //运行进程
    getRunProcess() {
      this.loading3 = true;
      console.log(this.currentPage1);
      let ser = "getProcessNewEventByHostId",
        paramStr =
          "<hostId>" +
          this.hostId +
          "</hostId>" +
          "<processCondition>" +
          this.input2 +
          "</processCondition>" +
          "<page>" +
          this.currentPage1 +
          "</page><onePageSize>" +
          this.pageSize1 +
          "</onePageSize>";
      runProcess(ser, paramStr)
        .then(res => {
          this.ecmListDataTime1 = res.newProcessList
            ? res.newProcessList[0].LogDate
            : "无数据";
          this.ecmListData1 = res.newProcessList;
          this.totalPageRP = res.totalElements;
          this.loading3 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    // 用户信息
    getUserMsg() {
      this.loading4 = true;
      let ser = "getUserInfoNewEventByHostId",
        paramStr =
          '<hostInfo>{"hostId":"'+
                  this.hostId +
                  '","page":"'+
                  this.currentPage2+
                  '","onePageSize":"'+
                  this.pageSize2+
                  '","userInfoCondition":"'+
                  this.input3 +
                  '"}</hostInfo>';
      userMsg(ser, paramStr)
        .then(res => {
          this.ecmListDataTime2 = res.newUserInfoList
            ? res.newUserInfoList[0].lasttime
            : "无数据";
          this.ecmListData2 = res.newUserInfoList;
          this.totalPageUM = res.totalElements;
          this.loading4 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },

    // 软件管理
    getSoftManagement() {
      console.log('----------')
      this.loading5 = true;
      let ser = "getSoftWareNewEventByHostId",
        paramStr =
          '<hostInfo>{"hostId":"'+
                  this.hostId +
                  '","page":"'+
                  this.currentPageSoft+
                  '","onePageSize":"'+
                  this.pageSizeSoft+
                  '","softWareCondition":"'+
                  this.input5 +
                  '"}</hostInfo>';
      softManage(ser, paramStr).then(res => {
        this.ecmListDataTime3 = res.newSoftWareList
          ? res.newSoftWareList[0].LogDate
          : "无数据";
        this.softWareListData = res.newSoftWareList;
        this.totalPageSM = res.totalElements;
        this.loading5 = false;
      });
    },
    //异常登录-异地登录
    getLogExceptionRegion() {
      this.loading6 = true;
      let ser = "remoteGetExceptionEventList",
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage3 +
          '","pageSize":"' +
          this.pageSize3 +
          '","zoneId":"' +
          this.currentId +
          '","status":"' +
          this.exception_status +
          '","warningtype":"4","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';
      logException(ser, paramStr)
        .then(res => {
          let ecmListData3 = res.eventList;
          this.ecmListData3 = ecmListData3;
          this.totalPageLE1 = res.totalElements;
          this.loading6 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //异常登录-暴力破解
    getLogExceptionBlasting() {
      this.loading7 = true;
      let ser = "remoteGetExceptionEventList",
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage7 +
          '","pageSize":"' +
          this.pageSize7 +
          '","zoneId":"' +
          this.currentId +
          '","status":"' +
          this.exception_status +
          '","warningtype":"5","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';
      logException(ser, paramStr)
        .then(res => {
          let ecmListData7 = res.eventList;
          this.ecmListData7 = ecmListData7;
          this.totalPageLE5 = res.totalElements;
          this.loading7 =  false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //异常登录-非法ip登录
    getLogExceptionIp() {
      this.loading8 = true;
      let ser = "remoteGetExceptionEventList",
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage4 +
          '","pageSize":"' +
          this.pageSize4 +
          '","zoneId":"' +
          this.currentId +
          '","status":"' +
          this.exception_status +
          '","warningtype":"1","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';
      logException(ser, paramStr)
        .then(res => {
          let ecmListData4 = res.eventList;
          this.ecmListData4 = ecmListData4;
          this.totalPageLE2 = res.totalElements;
          this.loading8 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //异常登录-非法账号登录
    getLogExceptionUser() {
      this.loading9 = true;
      let ser = "remoteGetExceptionEventList",
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage5 +
          '","pageSize":"' +
          this.pageSize5 +
          '","zoneId":"' +
          this.currentId +
          '","status":"' +
          this.exception_status +
          '","warningtype":"3","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';
      logException(ser, paramStr)
        .then(res => {
          let ecmListData5 = res.eventList;
          this.ecmListData5 = ecmListData5;
          this.totalPageLE3 = res.totalElements;
          this.loading9 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //异常登录-非法时间登录
    getLogExceptionTime() {
      this.loading10 = true;
      let ser = "remoteGetExceptionEventList",
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage6 +
          '","pageSize":"' +
          this.pageSize6 +
          '","zoneId":"' +
          this.currentId +
          '","status":"' +
          this.exception_status +
          '","warningtype":"2","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';
      logException(ser, paramStr)
        .then(res => {
          let ecmListData6 = res.eventList;
          this.ecmListData6 = ecmListData6;
          this.totalPageLE4 = res.totalElements;
          this.loading10 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    //异常登录-爆破登陆
    getLogExceptionBlasting2() {
      this.loading11 = true;
      let ser = "remoteGetExceptionEventList",
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage7 +
          '","pageSize":"' +
          this.pageSize7 +
          '","zoneId":"' +
          this.currentId +
          '","status":"' +
          this.exception_status +
          '","warningtype":"6","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';
      logException(ser, paramStr)
        .then(res => {
          let ecmListData8 = res.eventList;
          this.ecmListData8 = ecmListData8;
          this.totalPageLE6 = res.totalElements;
          this.loading11 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },
    // 异常登录
    getLogException() {
      this.loading6 = true;
      this.loading7 = true;
      this.loading8 = true;
      this.loading9 = true;
      this.loading10 = true;
      this.loading11 = true;
      let ser = "remoteGetExceptionEventList",
        //异地登录
        paramStr =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage3 +
          '","pageSize":"' +
          this.pageSize3 +
          '","zoneId":"' +
          this.currentId +
          '","status":"0,1","warningtype":"4","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>',
        // 暴力破解
        paramStr4 =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage7 +
          '","pageSize":"' +
          this.pageSize7 +
          '","zoneId":"' +
          this.currentId +
          '","status":"0,1","warningtype":"5","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>',
        //非法ip登录
        paramStr1 =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage4 +
          
          '","pageSize":"' +
          this.pageSize4 +
          '","zoneId":"' +
          this.currentId +
          '","status":"0,1","warningtype":"1","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>',
        //非法账号登录
        paramStr2 =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage5 +
          '","pageSize":"' +
          this.pageSize5 +
          '","zoneId":"' +
          this.currentId +
          '","status":"0,1","warningtype":"3","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>',
        //非法时间登录
        paramStr3 =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage6 +
          '","pageSize":"' +
          this.pageSize6 +
          '","zoneId":"' +
          this.currentId +
          '","status":"0,1","warningtype":"2","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>',
        // 爆破登录
        paramStr5 =
          '<paramStr>{"paramStr":{"currentPage":"' +
          this.currentPage9 +
          '","pageSize":"' +
          this.pageSize9 +
          '","zoneId":"' +
          this.currentId +
          '","status":"0,1","warningtype":"6","host_id":"' +
          this.hostId +
          '","queryParam":"", "severity":"' +
          this.severity +
          '"}}</paramStr>';

      logException(ser, paramStr)
        .then(res => {
          // alert(111)
          let ecmListData3 = res.eventList;
          this.ecmListData3 = ecmListData3;
          this.totalPageLE1 = res.totalElements;
          this.loading6 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
      // 暴力破解
      logException(ser, paramStr4)
        .then(res => {
          let ecmListData7 = res.eventList;
          this.ecmListData7 = ecmListData7;
          this.totalPageLE5 = res.totalElements;
          this.loading7 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
      //非法ip登录
      logException(ser, paramStr1)
        .then(res => {
          let ecmListData4 = res.eventList;
          this.ecmListData4 = ecmListData4;
          this.totalPageLE2 = res.totalElements;
          this.loading8 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
      // 非法账号登录
      logException(ser, paramStr2)
        .then(res => {
          let ecmListData5 = res.eventList;
          this.ecmListData5 = ecmListData5;
          this.totalPageLE3 = res.totalElements;
          this.loading9 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
      // 非法时间登录
      logException(ser, paramStr3)
        .then(res => {
          let ecmListData6 = res.eventList;
          this.ecmListData6 = ecmListData6;
          this.totalPageLE4 = res.totalElements;
          this.loading10 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
      // 爆破登录
      logException(ser, paramStr5)
        .then(res => {
          this.ecmListData8 = res.eventList;
          this.totalPageLE6 = res.totalElements;
          this.loading11 = false;
        })
        .catch(err => {
          console.log("获取数据存储失败", err);
        });
    },

    //文件一致性检测
    getIntegrityEventList() {
      this.loading12 = true;
      let ser = "remoteGetIntegrityEventHostList";
      // let paramsData = '{"paramStr":{ "currentPage":"'+ this.currentPage7 +'","status":"0,1","severity":"7" ,"pageSize":"'+ this.pageSize7 +'","zoneId":"1","queryParam":"test","host_id":"'+ this.hostId +'" }}';
      let paramsData =
        '<paramStr>{"paramStr":{"currentPage":"' +
        this.currentPage8 +
        '","status":'+'"'+this.exception_status1+'"'+',"severity":"7","pageSize":"' +
        this.pageSize8 +
        '","host_id":"' +
        this.hostId +
        '","queryParam":""}}</paramStr>';
      integrityEventList(ser, paramsData)
        .then(res => {
          let itd = res.hostList;
          for(var key in itd){
            itd[key].full_log = itd[key].full_log.replace(/&lt;/g, "<");
            itd[key].full_log = itd[key].full_log.replace(/&gt;/g, ">");
            if(itd[key].checkTime!=''&&itd[key].checkTime.indexOf(':')==-1){
                itd[key].checkTime = itd[key].checkTime + '分钟';
              }
          }
          this.integrityData = itd;

          this.totalPageIE = res.totalElements;
          this.loading12 = false;
        })
        .catch(err => {
          console.log("获取存储数据失败", err);
        });
    },
    // 文件一致性检测详情
    getDetails(){
        this.loading13 = true;
        let ser = 'getIntegrityEventById',
            paramStr = '<integrityEventID>'+ this.IntegrityEventID +'</integrityEventID>';
        
        updateIntegerityEventStatus(ser,paramStr).then(res=>{
          console.log(123,res)
          if(res.whatchanged!=''){
            let aa = res.whatchanged
            // let aa1 = aa.replace(/---/g,"");
            let arr = aa.replace(/&lt;/g, "<");
            let arr1 = arr.replace(/&gt;/g, ">");
            this.whatchangedLi = arr1;
          }
           
          this.result = res;
          this.loading13 = false;
          }).catch( err => {
            console.log('获取存储数据失败', err );
          })
      },
    //文件一致性标记为已处理
    markDispose1() {
      // if (this.multipleSelection.length == 0) {
      //   this.$message({
      //     message: "请选择一项数据进行处理"
      //   });
      // } else if (this.multipleSelection.length > 1) {
      //   this.$message({
      //     message: "只能选择一条数据进行处理，请重新选择"
      //   });
      // } else 
      if (this.multipleSelection[0].status == 0) {
        this.$message({
          message: "您所选择的数据已处理过，请重新选择"
        });
      } else {
        this.markPose = this.multipleSelection[0].IntegrityEventID;
        this.dialogUpdateVisiblePose1 = true;
      }
    },
    getModel1(IntegrityEventID) {
      this.dialogUpdateVisiblePose1 = true;
      this.markPose = IntegrityEventID;
    },
    getUpdateIntegerityEventBtnStatus() {
      let ser = "remoteUpdateIntegrityEvent";
      let paramStr = "<ids>" + this.markPose + "</ids>";
      updateIntegerityEventStatus(ser, paramStr)
        .then(res => {
          //调接口刷新表格
          this.dialogUpdateVisiblePose1 = false;
          this.$message({
            message: res
          });
          this.getIntegrityEventList();
        })
        .catch(err => {
          this.$message({
            message: "标记失败"
          });
        });
    },
    // 异常登录标记为已处理
    markDispose() {
      // if (this.multipleSelection.length == 0) {
      //   this.$message({
      //     message: "请选择一项数据进行处理"
      //   });
      // } else if (this.multipleSelection.length > 1) {
      //   this.$message({
      //     message: "只能选择一条数据进行处理，请重新选择"
      //   });
      // } else 
      if (this.multipleSelection[0].status == 1) {
        this.$message({
          message: "您所选择的数据已处理过，请重新选择"
        });
      } else {
        this.markPose = this.multipleSelection[0].sshexceptioneventid;
        this.dialogUpdateVisiblePose = true;
      }
    },
    getModel(sshexceptioneventid) {
      this.dialogUpdateVisiblePose = true;
      this.markPose = sshexceptioneventid;
    },
    getUpdateExceptionStatus() {
      //调接口刷新表格
      let ser = "remoteUpdateExceptionStatus",
        paramStr = "<Ids>" + this.markPose + "</Ids>";
      updateIntegerityEventStatus(ser, paramStr)
        .then(res => {
          this.dialogUpdateVisiblePose = false;
          this.$message({
            message: "标记成功"
          });
          this.getLogException();
        })
        .catch(err => {
          this.$message({
            message: "标记失败"
          });
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getDetailsCon(val) {
      sessionStorage.setItem("templateType", val);
    },
    //sll添加回车事件
    showDuan: function(ev) {
      // console.log(88888888888)
      if (ev.keyCode == 13) {
        // alert('你按回车键了');
        this.getCatchPort();
      }
    },

    showYun: function(ev) {
      // console.log(88888888888)
      if (ev.keyCode == 13) {
        // alert('你按回车键了');
        this.getRunProcess();
      }
    },

    showUsername: function(ev) {
      // console.log(88888888888)
      if (ev.keyCode == 13) {
        // alert('你按回车键了');
        this.getUserMsg();
      }
    },

    showRuan: function(ev) {
      // console.log(88888888888)
      if (ev.keyCode == 13) {
        // alert('你按回车键了');
        this.getSoftManagement();
      }
    },
   
  },
  computed: {
    isDefault: function() {
      return this.template_type === "default";
    },
    isCustom: function() {
      return this.template_type === "custom";
    },
    isCheck: function() {
      return this.template_type === "check";
    },
    isCheckDetail: function() {
      return this.template_type === "checkDetail";
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<style lang="scss" scoped="scoped">
.ecm_monitor {
  background: #ffffff;
  font-size: 12px;
  .bold-wei {
    font-weight: 600;
    color: #333333;
  }
  .el-radio-group .is-active .el-radio-button__inner{
    border-left: 0px !important; 
    box-shadow: rgb(58, 199, 250) 0px 0px 0px 0px !important;
  }
  .content {
    background: #ffffff;
    .content_top {
      background: #ffffff;
      padding-top: 30px;
      padding-left: 20px;
      padding-bottom: 20px;
    }
  }
  .template_title {
    width: 100%;
    background-color: #f0f2f7;
  }
  .top {
    background: #ffffff;
    min-height: 119px;
    border-bottom: 1px solid #f8f9fb;
    position: relative;
    .head-content {
      width: 30%;
      display: inline-block;
      line-height: 30px;
    }
    .marked-pro {
      background: #f0f2f7;
      width: 100px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      float: left;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 20px;
      &:nth-child(1) {
        margin-left: -10px;
      }
    }
    .changeColor {
      background: #56d6c4;
      color: #ffffff;
    }
    .ownColor {
      background: #f0f2f7;
      color: #606266;
    }
    .content-list {
      height: 35px;
      background: #f0f2f7;
      line-height: 35px;
      span {
        padding: 0 20px;
        display: inline-block;
        height: 100%;
        height: 100%;
      }
    }
    .ser-choose {
      margin-left: 20px;
      line-height: 54px;
    }
    .content-list-1 {
      margin-top: -20px;
      .e-tabs__item {
        padding-left: 20px;
      }
      height: 40px;
      span {
        text-align: center;
        line-height: 40px;
        display: inline-block;
      }
    }
    .input-with-select {
      margin-top: 21px;
    }
    .server-table-content {
      overflow: hidden;
      background: #fff;
      border-top: 1px solid #e8edf5;
      .server-table-f {
        margin: 20px;
        margin-top: 0;
        border: 1px solid #e8edf5;
        .table-left {
          margin: 16px 0 11px 10px;
          .reget-t {
            color: #3ac0f1;
            cursor: pointer;
          }
        }
      }
      .server-table-f-1 {
        border: none;
      }
    }
    .template_default {
      .server-table-content {
        border-top: none;
      }
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
    .mb10 {
      margin-bottom: 10px;
    }
    .left {
      /*width: 65%;*/
      /*float: left;*/
      padding-left: 2%;
      text-align: left;
      .node_name {
        font-size: 14px;
        color: #333333;
        padding: 20px 0px 10px 0;
      }
    }
    .right {
      padding-top: 52px;
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
    .el-col-9 {
      float: right;
      margin-right: -23px;
    }
  }
  .line {
    height: 10px;
    width: 100%;
    background: #f0f2f7;
    background-size: 50% 100%;
    background-repeat: no-repeat;
  }
  .pagination {
    float: right;
    margin: 20px;
  }
}

.itegrityStyle {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-button {
  border-radius: 0;
}

.ind_monitor{
        background: #f6f8fb;
        height:100%;
        .content{
            background:#ffffff;
            padding-bottom:20px;
            padding-left:20px;
            padding-right:20px;
        }
    }   
    .content_top{
            background: #ffffff;
            padding: 20px 20px 10px 20px;
            
            .title{
                font-size:14px;
                position:relative;
                padding-bottom: 20px;
                &::before{
                    display:inline-block;
                    content:'';
                    width:4px;
                    height:15px;
                    background-color:#3ac0f1;
                    margin-right:5px;
                    position: absolute;
                    top: 2px;
                    left: -15px;
                }
            }   
            .con-min{
                line-height:20px;
                padding-bottom: 20px;
                div{
                    display:inline-block;
                    width:480px;
                    margin-left: -15px;
                }
                label{
                    display:inline-block;
                    min-width:30px;
                    font-size:14px;
                }
                span{
                    font-size:12px;
                }
                .right{
                    margin-right:300px;
                }
            } 
        }
    .content_middle{
        margin-top:10px;
        border-top:1px solid #ccc;
        padding: 20px 20px 0 20px;
        p{
            font-size:14px;
            position:relative;
                &::before{
                    display:inline-block;
                    content:'';
                    width:4px;
                    height:15px;
                    background-color:#3ac0f1;
                    margin-right:5px;
                    position: absolute;
                    top: 2px;
                    left: -15px;
                }
        }
        .con-min{
            line-height:40px;
             margin-left: -15px;
            
            label{
                font-size:14px;
            }
            span{
                font-size:12px;
            }
        }
    }
    .bar{
        height:60px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
    .bar1{
        
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
    .footer{
        margin-top:20px;
    }
    .bar_center_aside {


      display:flex;/*Flex布局*/
      display: -webkit-flex; /* Safari */
      align-items:center;/*指定垂直居中*/
      -webkit-box-align: center;
       background-color: #f0f2f7;
        color: #333;
        font-size:14px;

    }
    .in-block {
      display:inline-block;
    }
    .bar_aside{
      background-color: #f0f2f7;
        color: #333;
        text-align: center;
       
        line-height: 60px;
        font-size:14px;
    }
    .el-aside {
        
    }
    .el-main {
        background-color: #fff;
        color: #333;
        padding:0;
        padding-top:10px;
        padding-left: 75px;
       
        div{
            line-height:20px;
            label{
            font-size:14px;   
        }
        span{
                font-size:12px;
            }
        } 


    }
  
   

</style>
<style lang="scss">
.ecm_monitor {
  .template_default {
    .el-tabs__nav {
      .el-tabs__item {
        width: 120px;
        text-align: center;
      }
      .el-tabs__active-bar {
        width: 100px !important;
      }
    }
  }

  .el-dialog__header {
    background-color: #323c4e;
    height: 40px;
    line-height: 40px;
    padding: 0;
    padding-left: 20px;
  }
  .el-dialog__title {
    color: #e4e5e7;
    font-size: 12px;
  }
  .el-dialog__footer {
    padding: 0;
    width: 100%;
    font-size: 0;
    height: 35px;
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
    height: 30px;
    padding: 0;
  }
  .el-input__inner {
    height: 30px;
    /* margin-left: 40px; */
  }
  .el-input--suffix .el-input__inner {
    height: 30px;
    margin-left: 8px;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-table .el-table__body-wrapper tbody tr td {
    height: 35px;
    padding: 2px 0;
  }
  .el-radio-button__inner {
    background: transparent;
    border: none;
    &:nth-child(1) {
      border-left: 0px solid #fff;
    }
  }
  .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0;
  }
  .el-tabs__nav {
    margin-left: 20px;
  }
  .el-input__inner:focus {
    border-color: #dcdfe6;
    outline: none;
  }
  .el-input__inner:hover {
    border-color: #dcdfe6;
    outline: none;
  }
  .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: transparent;
    z-index: 1;
  }
  .template_check {
    .el-tabs__active-bar {
      width: 100% !important;
    }
    .red{
      color:#f6585e;
    }
    .green{
      color:#52ec29;
    }
  }
  .red{
    color:#f6585e;
  }
  .green{
    color:#52ec29;
  }
}
.ecm_monitor .is-active .el-radio-button__inner {
    border-left: 0 !important;
}
.numberInfo .el-table .el-table__body-wrapper tbody tr td {
    height: 35px;
    padding: 2px 0;
  }
</style>