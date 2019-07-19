<template>
  <div class="ecm_monitor server-list">
    <div class="top">
      <el-row>
          <el-col :span="24">
            <div class="left">
              <p class="node_name">{{name}}</p>
              <span class="areaButton" :class="{'areaButton-bg': currentId == area.id}" @click="changeRegion(area,index)" v-for="(area,index) in areas" :key="index">
                {{area.zoneName}} ( {{area.count}} )
              </span>
            </div>
          </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="content">
      <el-row>
        <el-col :span="15">
          <div class="content-top left">
            <span @click="openInstallAgent" :class="{'changeColor':isChangeColor,'ownColor':!isChangeColor}">安装Agent</span>
            <span @click="openUninstallAgent" :class="{'changeColor':isChangeColor1,'ownColor':!isChangeColor1}">卸载Agent</span>
            <span @click="openProtection" :class="{'changeColor':isChangeColor2,'ownColor':!isChangeColor2}">开启防护</span>
            <span @click="closeProtection" :class="{'changeColor':isChangeColor3,'ownColor':!isChangeColor3}">关闭防护</span>

            <!-- <span @click="ProtectionKq11" :class="{'changeColor':isChangeColor5,'ownColor':!isChangeColor5}">开启主动防御</span> -->

            <!-- <span @click="ProtectionGb11" :class="{'changeColor':isChangeColor4,'ownColor':!isChangeColor4}">关闭主动防御</span> -->

            <!-- <span @click="TableScanClick" :class="{'changeColor':isChangeColor6,'ownColor':!isChangeColor6}">文件一致性扫描</span> -->
          </div>
        </el-col>
        <el-col :span="9">
          <div class="content_top right">
            <el-input placeholder="请输入云服务器IP或名称" v-model="input5" class="input-with-select" size="small" style="width:350px" @keyup.native='show'>
                <el-button slot="append" icon="el-icon-search" v-on:click="getServiceListSearch"></el-button>
              </el-input>
          </div>
        </el-col>
      </el-row>
      <div class="mainTable" v-loading="loading">
        <el-table
            :show-overflow-tooltip="true"
            @selection-change="handleSelectionChange"
            @filter-change="filterChange"
            
            :data="ecmListData"
            style="width: 100%">
            <el-table-column
                  type="selection"
                  width="50">
          </el-table-column>
          <el-table-column
            label="云服务器名称"
            prop="hostname"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <router-link :to='{ name: "serverdetails",params: {ip:scope.row.agent_ip,id:scope.row.host_id,zone_id: currentId,guid: scope.row.agent_guid,integrityEventID:"1130",atype:atype}}'>
                <!-- <el-button size="mini" type="text">
                  {{scope.row.agent_ip}}
                </el-button> -->
                <div class="serviceName">{{scope.row.hostname}}</div>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="os_type"
            :show-overflow-tooltip="true"
            width="50"
            label="">
            <template slot-scope="scope">
              <!--<el-tooltip placement="top" class="item" effect="dark">-->
                <i class="aside-icon icon20"
              v-if="scope.row.os_type.indexOf('CentOS') == 0"><svg-icon icon-class='centos'></svg-icon></i>
              <i class="aside-icon icon20"
              v-if="scope.row.os_type.indexOf('Red Hat') == 0"><svg-icon icon-class='redhat'></svg-icon></i>
              <i class="aside-icon icon20"
              v-if="scope.row.os_type.indexOf('Ubuntu') == 0"><svg-icon icon-class='ubuntu'></svg-icon></i>
              <i class="aside-icon icon20"
              v-if="scope.row.os_type.indexOf('Linux') == 0"><svg-icon icon-class='linux'></svg-icon></i> 
              <span class="icon-hide " slot="content">{{scope.row.os_type}}</span> 
              <!--</el-tooltip>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="防护状态"
            width="100"
            :filters="[{ text: '未激活', value: '{a:14,b:2}' }, { text: '离线', value: '{a:13,b:3}' },{text: '防护中', value: '{a:12,b:1}'},{text: '关闭防护', value: '{a:12,b:0}'}]"
            column-key = 'filter1'
            :filter-multiple="false">
            <template slot-scope="scope">
            <span :class="{'addWarn redWarn ': scope.row.statusName=='离线','addWarn greenWarn': scope.row.statusName=='防护中','addWarn grayWarn': scope.row.statusName=='未激活'||scope.row.statusName=='关闭防护'}"></span>
              <span>{{scope.row.statusName}}</span>
            </template>
            
          </el-table-column>
          <el-table-column
            prop="publicip"
            label="IP地址"
            :show-overflow-tooltip="true"
            width="130">
            <template slot-scope="scope">
              <!-- {{scope.row}} -->
              <p v-if="scope.row.ipaddress=='' && scope.row.publicip==''">
                --
              </p>
              <p v-else-if= "scope.row.ipaddress || scope.row.publicip"> 
              <!-- if= -->
                <span size="mini" type="text" class="serverIpStyle serverIpStyle-i">
                  {{scope.row.ipaddress == '' ? '' : scope.row.ipaddress + '(内)'}}
                </span>
                <span size="mini" type="text" class="serverIpStyle">
                  {{scope.row.publicip == '' ? '' : scope.row.publicip + '(外)'}}
                </span>
              </p>
              <p v-else>加载中</p>
              
            </template>
          </el-table-column>
          <el-table-column
            prop="protect_level"
            label="防护级别"
            width="100"
            :filters="[{ text: '基础版', value: '2' }, { text: '专业版', value: '1' }]"
            column-key = 'filter2'
            :filter-multiple="false">
            <template slot-scope="scope">
              {{scope.row.protect_level == 1 ? "专业版" : "基础版"}}
            </template>
          </el-table-column>
          <el-table-column
            label="异常登录">
            <template slot-scope="scope">
              {{scope.row.legalLoginTotal==""?"--":scope.row.legalLoginTotal}}
            </template>
          </el-table-column>
          <el-table-column
            label="进程数">
            <template slot-scope="scope">
              {{scope.row.processTotal==""?"--":scope.row.processTotal}}
            </template>
          </el-table-column>
          <el-table-column
            label="端口数">
            <template slot-scope="scope">
              {{scope.row.portTotal==""?"--":scope.row.portTotal}}
            </template>
          </el-table-column>
          <el-table-column
            label="文件一致性检测"
            width="110">
            <template slot-scope="scope">
              {{scope.row.integrityEventCount==""?"--":scope.row.integrityEventCount}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                :disabled="scope.row.statusName == '关闭防护'||scope.row.statusName == '防护中'"
                @click="installAgent(scope.row.agent_guid)">安装
              </el-button>
              <el-popover trigger="hover" placement="bottom">
                <p :class="{'server-btn-hover':scope.row.statusName != '未激活','server-btn-hover-i':scope.row.statusName == '未激活'}">
                  <el-button
                    size="mini"
                    type="text"
                    :disabled="scope.row.statusName == '未激活'"
                    @click="uninstallAgent(scope.row)"
                     class="serverBtnColor">卸载
                  </el-button>
                </p>
                <p :class="{'server-btn-hover':scope.row.statusName == '关闭防护','server-btn-hover-i':scope.row.statusName != '关闭防护'}">
                  <el-button
                    size="mini"
                    type="text"
                    class="serverBtnColor"
                    :disabled="scope.row.statusName != '关闭防护'"
                    @click="openProtectionBtn(scope.row)"
                    >开启防护
                  </el-button>
                </p>
                <p :class="{'server-btn-hover':scope.row.statusName == '防护中','server-btn-hover-i':scope.row.statusName != '防护中'}">
                  <el-button
                    size="mini"
                    type="text"
                    :disabled="scope.row.statusName != '防护中'"
                    @click="closeProtectionBtn(scope.row)"
                    class="serverBtnColor">关闭防护
                  </el-button>
                </p>
                <p :class="{'server-btn-hover':scope.row.statusName == '防护中'&&scope.row.activersps_status==0,'server-btn-hover-i':scope.row.statusName != '防护中'||scope.row.activersps_status==1}">
                  <el-button
                    size="mini"
                    type="text"
                    :disabled="scope.row.statusName != '防护中'||scope.row.activersps_status==1"
                    @click="ProtectionBtnKq(scope.row)"
                    class="serverBtnColor">开启主动防御
                  </el-button>
                </p>
                <p :class="{'server-btn-hover':scope.row.statusName == '防护中'&&scope.row.activersps_status==1,'server-btn-hover-i':scope.row.statusName != '防护中'||scope.row.activersps_status==0}">
                  <el-button
                    size="mini"
                    type="text"
                    :disabled="scope.row.activersps_status==0||scope.row.statusName != '防护中'"
                    @click="ProtectionBtnGb(scope.row)"
                    class="serverBtnColor">关闭主动防御
                  </el-button>
                </p>
                <p :class="{'server-btn-hover':scope.row.statusName == '防护中','server-btn-hover-i':scope.row.statusName != '防护中'}">
                  <el-button
                    size="mini"
                    type="text"
                    :disabled="scope.row.statusName != '防护中'"
                    @click="protectionBtnScan(scope.row)"
                    class="serverBtnColor">文件一致性扫描
                  </el-button>
                </p>
                <div slot="reference" class="name-wrapper" style="display:inline-block">
                  <el-tag size="mini" class="get-more">更多</el-tag>
                </div>
              </el-popover>
              <!--<el-button
                size="mini"
                type="text"
                @click="uninstallAgent(scope.row)">更多
              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
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
      <el-dialog
        title="卸载"
        :visible.sync="dialogTableUninstall"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器进行卸载吗？</p>
          </div>
        </div>
        <el-table
          :data="uninstallData"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <p style="color:#fd3434;margin-top:20px">
          提示 : 卸载Agent，会使服务器失去安全监控，处于安全风险中，请您谨慎操作！
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn1 f_btn_l" @click="uninstallDisappear1">取 消</el-button><el-button
            class="f_btn1 f_btn_c" >手动卸载</el-button><el-button
            type="primary"
            class="f_btn1 f_btn_r" @click="uninstallDisappear">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="安装"
        :visible.sync="dialogTableInstall"
        >
        <div class="content">
          <span style="color:#333">{{this.agentData.agent_ip}}</span>
          <span style="color:#333">{{this.agentData.hostname}}</span>
          <span style="margin-left:10px;color:#333">( 在您的服务器中以管理员权限执行以下命令进行安装 ) </span>
          <div class="agent_key" style="float:left;margin-right:20px; word-break:break-all;">
            {{this.agentData.useKey}}
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" v-clipboard:copy="agentData.useKey"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复 制</el-button><el-button
            type="primary"
            class="f_btn f_btn_r"
            @click="closeInstallAgent">关 闭</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="开启防护"
        :visible.sync="dialogTableOpenPro"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器开启防护吗？</p>
          </div>
        </div>
        <el-table
          :data="openProtectionData"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope"> 
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="openProDisappear">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="openProDisappear1">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="关闭防护"
        :visible.sync="dialogTableClosePro"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器关闭防护吗？</p>
          </div>
        </div>
        <el-table
          :data="closeProtectionData"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="closeProDisappear">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="closeProDisappear1">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 开启主动防御 -->
      <el-dialog
        title="开启主动防御"
        :visible.sync="dialogTableCloseProKq"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器开启主动防御？</p>
          </div>
        </div>
        <el-table
          :data="ProtectionDataKq"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="dialogTableCloseProKq=false">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="kqProDisappear">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 关闭主动防御 -->
      <el-dialog
        title="关闭主动防御"
        :visible.sync="dialogTableCloseProGb"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器关闭主动防御？</p>
          </div>
        </div>
        <el-table
          :data="ProtectionDataGb"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="dialogTableCloseProGb=false">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="gbProDisappear">确 定</el-button>
        </div>
      </el-dialog>
       <!-- 文件一致性扫描 -->
      <el-dialog
        title="文件一致性扫描"
        :visible.sync="dialogTableScan"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器进行文件一致性扫描？</p>
          </div>
        </div>
        <el-table
          :data="ProtectionDataGb"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="dialogTableScan=false">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="flieScan">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="dialogTableConfirm"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="width:100%;text-align: center;margin-top: 20px; margin-bottom: 20px;">
            请选择要操作的计算机！
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="install_key_agent" @click="dialogTableConfirm = false">关 闭</el-button>
        </div>
      </el-dialog>
      <!-- 多选开启防护 -->
      <el-dialog
        title="开启防护"
        :visible.sync="dialogTableOpenPro11"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器开启防护吗？</p>
          </div>
        </div>
        <el-table
          :data="openProtectionData11"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope"> 
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="openProDisappear11">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="openProDisappear12">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 多选关闭防护 -->
      <el-dialog
        title="关闭防护"
        :visible.sync="dialogTableClosePro22"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器关闭防护吗？</p>
          </div>
        </div>
        <el-table
          :data="closeProtectionData22"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="closeProDisappear22">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="closeProDisappear21">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 多选文件一致性扫描 -->
      <el-dialog
        title="文件一致性扫描"
        :visible.sync="dialogTableScan11"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器进行文件一致性扫描？</p>
          </div>
        </div>
        <el-table
          :data="ProtectionDataGb11"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="dialogTableScan11=false">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="flieScan11">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 多选开启主动防御 -->
      <el-dialog
        title="开启主动防御"
        :visible.sync="dialogTableCloseProKq11"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器开启主动防御？</p>
          </div>
        </div>
        <el-table
          :data="ProtectionDataKq11"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="dialogTableCloseProKq11=false">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="kqProDisappear11">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 多选关闭主动防御 -->
      <el-dialog
        title="关闭主动防御"
        :visible.sync="dialogTableCloseProGb11"
        >
        <div class="content" style="overflow:hidden;">
          <div class="left" style="float:left;margin-right:20px;">
            <i class="">
              <svg-icon icon-class="warn" style="font-size:50px;color:#f9cd76"></svg-icon>
            </i>
          </div>
          <div class="right" style="float:left;margin-bottom:20px;">
            <p>确定对所选服务器关闭主动防御？</p>
          </div>
        </div>
        <el-table
          :data="ProtectionDataGb22"
          style="width: 100%">
          <el-table-column
            label="服务器名称">
            <template slot-scope="scope">
              {{ scope.row.hostname }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作系统">
            <template slot-scope="scope">
              {{ scope.row.os_type }}
            </template>
          </el-table-column>
          <el-table-column
            label="防护状态">
            <template slot-scope="scope">
              {{scope.row.statusName}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="f_btn f_btn_l" @click="dialogTableCloseProGb11=false">取 消</el-button><el-button
            type="primary"
            class="f_btn f_btn_r" @click="gbProDisappear11">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>



<script>
  import RegionList from '@/components/RegionList'
  import ConsoleTable from '@/components/ConsoleTable'
  import {serverRegion,agentDetails} from '@/api/safety'
  import $ajax from 'axios'
  import i18n from '@/lang'
  import VueClipboard from 'vue-clipboard2'

  export default {
    components:{
      RegionList,
      ConsoleTable,
    },
    data (){
      return {
        name: i18n.common.serverList,
        input5: '',
        currentId: 1,
        atype: 1,
        areas: [],
        isChangeColor: false,
        isChangeColor1: false,
        isChangeColor2: false,
        isChangeColor3: false,
        isChangeColor4: false,
        isChangeColor5: false,
        isChangeColor6: false,
        isOffline:false,
        isInPro:false,
        isOutPro:false,
        agentStateCode:[],
        uninstallData: [],
        installData: [],
        openProtectionData: [],
        closeProtectionData: [],
        ProtectionDataKq:[],
        ProtectionDataKq11:[],
        ProtectionDataGb:[],
        currentPage: 1,
        totalPage: 1,
        agentData:[],
        agentKey:'',
        agentGuid: '',
        agentGuid1: '',
        agentGuidOpenPro: '',
        dialogTableUninstall: false,
        dialogTableUninstall1: false,
        dialogTableInstall: false,
        dialogTableInstall1: false,
        dialogTableConfirm: false,
        dialogTableOpenPro:false,
        dialogTableClosePro: false,
        dialogTableScan: false,
        protectStatus:'',
        pageSize: 10,
        ecmListData:[],
        selectionChange: '',
        tableStatus:'12,13,14',
        protect_level: '1,2',
        protect_status: '0,1',
        dialogTableCloseProKq:false,
        dialogTableCloseProKq11:false,
        dialogTableCloseProGb:false,
        dialogTableCloseProGb11:false,
        loading:true,
        dialogTableOpenPro11:false,
        dialogTableClosePro22:false,
        dialogTableScan11:false,
        openProtectionData11:[],
        closeProtectionData22:[],
        ProtectionDataGb11:[],
        ProtectionDataGb22:[],
        strProtect_status:'',
        strAgent_guid:'',
        strActiversps_status:'',
      }
    },
    created(){
        this.getServerRegion();
        // this.getServiceList();
    },
    methods: {
      //sll添加
      show:function(ev){
        if(ev.keyCode == 13){
          this.getServiceList();
        }
      },

      getServiceListSearch(){
        this.currentPage = 1;
        this.getServiceList()
      },
      dedupe(array){
        return Array.from(new Set(array));
      },
      // 开启主动防御
      ProtectionBtnKq(val){
        this.dialogTableCloseProKq = true;
        this.ProtectionDataKq[0] = val;
      },
      kqProDisappear(){
        this.dialogTableCloseProKq = false;
        let ser = 'changeActiveRspsStatus',
            paramStr = '<agent_guid>'+this.ProtectionDataKq[0].agent_guid+'</agent_guid>'+'<activersps_status>'+'1'+'</activersps_status>'
        serverRegion(ser,paramStr).then( res => {
          // this.$message('开启主动防御成功');
          if(res.status){
            this.$message({
              message: res.description
            });
          }else{
            this.$message({
              message: res
            });
          }
        }).catch( err => {
          console.log('开启主动防御失败', err )
        })
      },
      // 关闭主动防御
      ProtectionBtnGb(val){
        this.dialogTableCloseProGb = true;
        this.ProtectionDataGb[0] = val;
      },
      gbProDisappear(){
        this.dialogTableCloseProGb = false;
        let ser = 'changeActiveRspsStatus',
            paramStr = '<agent_guid>'+this.ProtectionDataGb[0].agent_guid+'</agent_guid>'+'<activersps_status>'+'0'+'</activersps_status>'
        serverRegion(ser,paramStr).then( res => {
          console.log(res);
          // this.$message('关闭主动防御成功');
          if(res.status){
            this.$message({
              message: res.description
            });
          }else{
            this.$message({
              message: res
            });
          }
          this.ProtectionDataGb[0].activersps_status = 0;
        }).catch( err => {
          console.log('关闭主动防御失败', err )
        })
      },
      // 文件一致性扫描
      protectionBtnScan(val){
        console.log(val,999);
        this.dialogTableScan = true;
        this.ProtectionDataGb[0] = val;
      },
      flieScan(){
        this.dialogTableScan = false;
        let ser = 'integrityScan',
            paramStr = '<agent_guid>'+this.ProtectionDataGb[0].agent_guid+'</agent_guid>'
        serverRegion(ser,paramStr).then( res => {
          console.log(res);
          // this.$message('关闭主动防御成功');
          if(res.status){
            this.$message({
              message: res.description
            });
          }else{
            this.$message({
              message: res
            });
          }
        }).catch( err => {
          console.log('关闭主动防御失败', err )
        })
      },
      // 表头筛选
      filterChange(value) {

        if(value.filter1){
          let arr = [],arr1=[],arr2=[],arr3=[]
          // 筛选状态
          if(value.filter1.length>0){
            for(var i=0;i<value.filter1.length;i++){
              arr = eval('(' + value.filter1[i] + ')'),
              arr1.push(arr)
              arr2.push(arr1[i].a)
              arr3.push(arr1[i].b)
              var filterResult = arr3.filter(function(item,index,array){
                return (item<2)
              })
              console.log(123456,filterResult)
              this.tableStatus = this.dedupe(arr2).join(',')
              this.protect_status = this.dedupe(filterResult).join(',')
            }
          }else{
            this.tableStatus = '12,13,14';
            this.protect_status = '0,1'
          }
        }else if(value.filter2){
          // 筛选告警类型
          if(value.filter2.length>0){
            this.protect_level = value.filter2.join(',')
            console.log(this.protect_level,999)
          }else{
            this.protect_level = '1,2'
          }
        }
        this.currentPage = 1;
        this.getServiceList()
      },
      // 获取列表数据
      getServiceList(){
        this.loading = true;
        let ser2 = 'remoteGetHostList',
            paramStr = '<paramStr>{"paramStr":{ "currentPage":"'+
                  this.currentPage +'","agent_statecode":"'+this.tableStatus+'","protect_level":"'+this.protect_level+'" ,"protect_status":"'+this.protect_status+'" ,"pageSize":"'+this.pageSize+'","zoneId":"'+ this.currentId +'","queryParam":"'+
                  this.input5 +'" }}</paramStr>'
        serverRegion(ser2,paramStr).then( res => {
          console.log(res);
          let serverContent = res.hostList;
          this.ecmListData = serverContent;
          this.totalPage = res.totalElements;
          this.loading = false;
          for(var key in this.ecmListData){
            this.getIp(this.ecmListData[key])
          }
        }).catch( err => {
          console.log('获取存储数据失败', err )
        })
      },
      //获取内外网
      getIp(value){
        console.log(value,2323)
        let ser = 'queryVMDetailByhost',
            paramStr = '<zoneId>'+this.currentId+'</zoneId>'+'<agentGuid>'+value.agent_guid +'</agentGuid>'
        agentDetails(ser,paramStr).then( res => {
          if (res.vmDetail) {
            let serDetail = eval("(" + res.vmDetail + ")");   
            for(var key in this.ecmListData){
              if(this.ecmListData[key].agent_guid == value.agent_guid){
                let ipaddress = '';
                if(serDetail.ipaddress){
                  ipaddress = serDetail.ipaddress;
                }
                let publicip = '';
                if(serDetail.publicip){
                  publicip = serDetail.publicip;
                }
                this.$set(this.ecmListData[key],"ipaddress",ipaddress)
                this.$set(this.ecmListData[key],"publicip",publicip)
              }
            }
          }
        
        }).catch( err => {
          console.log('获取内外网失败', err )
        })
      },
      // 没有选中时，弹出提示框
      handleSelectionChange(val){
        this.selectionChange = val;
        if(val.length != 1 || val[0].agent_statecode == '12'){
          this.isChangeColor = false;
        }else{
          this.isChangeColor = true;
        }
        if(val.length != 1 || val[0].statusName == '未激活'){
          this.isChangeColor1 = false;
        }else{
          this.isChangeColor1 = true;
        }
        // if(val.length != 1 || val[0].statusName != '关闭防护'){
        //   this.isChangeColor2 = false;
        // }else{
        //   this.isChangeColor2 = true;
        // }
        // if(val.length != 1 || val[0].statusName != '防护中'){
        //   this.isChangeColor3 = false;
        // }else{
        //   this.isChangeColor3 = true;
        // }

        // this.isChangeColor = val.length == 1 ? true : false;
        let arrProtect_status = [];
        let arrAgent_statecode = [];
        let arrAgent_guid = [];
        let arrActiversps_status = [];
        for (var i=0;i<this.selectionChange.length;i++){
          arrProtect_status.push(this.selectionChange[i].protect_status)
          arrAgent_guid.push(this.selectionChange[i].agent_guid)
          arrAgent_statecode.push(this.selectionChange[i].agent_statecode)
          arrActiversps_status.push(this.selectionChange[i].activersps_status)
        }
        console.log(arrProtect_status,arrAgent_guid,arrAgent_statecode,12)
        let strProtect_status = arrProtect_status.toString();
        let strAgent_statecode = arrAgent_statecode.toString();
        let strAgent_guid = arrAgent_guid.toString();
        let strActiversps_status = arrActiversps_status.toString();

        
        // 关闭防护
        if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1||strProtect_status.indexOf('0')!=-1){
          this.isChangeColor3 = false;
        }else{
          if(this.selectionChange.length==0){
            this.isChangeColor3 = false;
          }else {
            this.isChangeColor3 = true;
          }
          
        }
        // 开启防护
        if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1||strProtect_status.indexOf('1')!=-1){
          this.isChangeColor2 = false;
        }else{
          if(this.selectionChange.length==0){
            this.isChangeColor2 = false;
          }else {
            this.isChangeColor2 = true;
          }
        }
        // 文件一致性扫描
        if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1){
          this.isChangeColor6 = false;
        }else{
          if(this.selectionChange.length==0){
            this.isChangeColor6 = false;
          }else {
            this.isChangeColor6 = true;
          }
        }
        // 开启主动防御
        if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1||strActiversps_status.indexOf('1')!=-1){
          this.isChangeColor5 = false;
        }else{
          if(this.selectionChange.length==0){
            this.isChangeColor5 = false;
          }else{
            this.isChangeColor5 = true;
          }
        }
        // 关闭主动防御
        if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1||strActiversps_status.indexOf('0')!=-1){
          this.isChangeColor4 = false;
        }else{
          if(this.selectionChange.length==0){
            this.isChangeColor4 = false;
          }else{
            this.isChangeColor4 = true;
          }
        }
      },
      onCopy(){
        this.$message({
          message: "复制成功"
        })
      },
      onError(e){
        this.$message({
          message: "复制失败"
        })
      },
      // 行
      // 打开卸载的弹框
      uninstallAgent(val){
        let uninstallDataList = [];
        uninstallDataList.push(val);
        this.uninstallData = uninstallDataList;
        this.agentGuid1 = val.agent_guid;
        this.dialogTableUninstall = true;
      },
      // 关闭卸载的弹框-确定
      uninstallDisappear(){
        this.dialogTableUninstall = false;
        this.getUninstallAgent();
        this.agentGuid1 = '';
        this.uninstallData = []
      },
      // 关闭卸载的弹框-取消
      uninstallDisappear1(){
        this.dialogTableUninstall = false;
        this.agentGuid1 = '';
        this.uninstallData = []
      },
      // 总卸载
      openUninstallAgent(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择一项数据进行处理'
          });
        }else if(this.selectionChange.length > 1){
          this.$message({
            message: '只能选择一项数据进行处理'
          });
        }else{
          let uninstallDataList = [];
          uninstallDataList.push(this.selectionChange);
          this.uninstallData = uninstallDataList[0];
          if(this.uninstallData[0].agent_statecode == '14'){
            this.$message({
              message: '该计算机处于未激活状态'
            });
          }else{
            this.agentGuid1 = this.selectionChange[0].agent_guid;
            this.dialogTableUninstall = true;
          }
        }
      },
      //安装
      installAgent(val){
        this.agentGuid = val;
        this.dialogTableInstall = true;
        this.getInstallAgent();
      },
      // 关闭安装
      closeInstallAgent(){
        this.dialogTableInstall = false;
        this.agentGuid = '';
      },
      // 总安装
      openInstallAgent(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择一项数据进行处理'
          });
        }else if(this.selectionChange.length > 1){
          this.$message({
            message: '只能选择一项数据进行处理'
          });
        }else{
          let installDataList = [];
          installDataList.push(this.selectionChange);
          this.installData = installDataList[0];
          console.log(this.installData)
          if(this.installData[0].statusName == '关闭防护'){
            this.$message({
              message: '该计算机处于关闭防护状态'
            });
          }else if(this.installData[0].statusName == '防护中'){
            this.$message({
              message: '该计算机处于防护状态'
            });
          }else{
            this.agentGuid = this.selectionChange[0].agent_guid;
            this.dialogTableInstall = true;
            this.getInstallAgent();
          }
        }
      },
      // 安装接口
      getInstallAgent(){
        let ser = 'getComputerKeyByGuid',
            paramStr = '<hostguid>'+ this.agentGuid +'</hostguid>';
        serverRegion(ser,paramStr).then( res => {
          let agentDataList = res;
          agentDataList.useKey = res.key.replace(/&amp;/g,'&').replace(/\n/,'');
          this.agentData = agentDataList;
        }).catch( err => {
          console.log( '获取数据失败',err)
        })
      },
      // 卸载
      getUninstallAgent(){
        let ser = 'uninstallagent',
            paramStr = '<uninstallStr>{"agent_guid":"'+ this.agentGuid1 +'"}</uninstallStr>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          });
        }).catch( err => {
          console.log( '获取数据失败',err)
        })
      },
      // 开启防护
      // 开启防护-打开弹框
      openProtectionBtn(val){
        this.dialogTableOpenPro = true;
        let openProtectionBtnList = [];
        openProtectionBtnList.push(val);
        this.openProtectionData = openProtectionBtnList;
        this.agentGuidOpenPro = openProtectionBtnList[0].agent_guid;
        this.protectStatus = '1';
      },
      // 开启防护-多选-打开弹框
      openProtection(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择数据进行处理'
          });
        }else{
          // let openProtectionList = [];
          // openProtectionList.push(this.selectionChange);
          // this.agentGuidOpenPro = this.selectionChange[0].agent_guid;
          // this.openProtectionData = openProtectionList[0];
          // console.log(this.openProtectionData,9)
          // if(this.openProtectionData[0].agent_statecode == "13"){
          //   this.$message({
          //     message: '该机器处于离线状态'
          //   })
          // }else if(this.openProtectionData[0].statusName == "防护中"){
          //   this.$message({
          //     message: '该计算机已在防护中！'
          //   })
          // }else{
          //   this.dialogTableOpenPro = true;
          //   this.protectStatus = '1';
          // }
          console.log(this.selectionChange,3333);
          let arrProtect_status = [];
          let arrAgent_statecode = [];
          let arrAgent_guid = [];
          for (var i=0;i<this.selectionChange.length;i++){
            arrProtect_status.push(this.selectionChange[i].protect_status)
            arrAgent_guid.push(this.selectionChange[i].agent_guid)
            arrAgent_statecode.push(this.selectionChange[i].agent_statecode)
          }
          console.log(arrProtect_status,arrAgent_guid,12)
          let strProtect_status = arrProtect_status.toString();
          let strAgent_statecode = arrAgent_statecode.toString();
          let strAgent_guid = arrAgent_guid.toString();
          console.log(this.strProtect_status,this.strAgent_statecode,23)
          if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1){
            this.$message('存在机器处于离线或未激活状态');
          }else if(strProtect_status.indexOf('1')!=-1){
            this.$message('已有机器处于防护中');
          }else {
            this.openProtectionData11 = this.selectionChange;
            this.dialogTableOpenPro11 = true;
            this.strAgent_guid = strAgent_guid;
            this.strProtect_status = '1';
            // this.isChangeColor2 = true;
          }
          console.log(strProtect_status.indexOf('1'))
          
        }
      },
      // 开启防护-多选-确定
      openProDisappear12(){
        console.log(11111,)
        // console.log(this.strAgent_guid,this.strProtect_status,222)
        console.log(typeof(this.strAgent_guid),typeof(this.strProtect_status),333)
        let ser = 'remoteUpdateProtectStatusHostList',
            paramStr = '<guidStr>'+ this.strAgent_guid +'</guidStr>'+
                       '<protectStatus>'+ this.strProtect_status +'</protectStatus>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          console.log(res,3434)
          // this.isChangeColor2 = false;
          this.dialogTableOpenPro11 = false;
          this.strProtect_status = '';
          this.strAgent_guid = '';
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 开启防护-多选-取消
      openProDisappear11(){
        this.dialogTableOpenPro11 = false;
        // this.selectionChange = [];
        // this.isChangeColor2 = false;
      },
      // 关闭防护-多选-打开弹框
      closeProtection(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择一项数据进行处理'
          });
        }else{
          // let closeProtectionList = [];
          // closeProtectionList.push(this.selectionChange);
          // this.agentGuidOpenPro = this.selectionChange[0].agent_guid;
          // this.closeProtectionData = closeProtectionList[0];
          // if(this.closeProtectionData[0].agent_statecode == "13"){
          //   this.$message({
          //     message: '该机器处于离线状态'
          //   })
          // }else if(this.closeProtectionData[0].statusName == "关闭防护"){
          //   this.$message({
          //     message: '该计算机已关闭防护！'
          //   })
          // }else{
          //   this.dialogTableClosePro = true;
          //   this.protectStatus = '0';
          // }
          console.log(this.selectionChange,3333);
          let arrProtect_status = [];
          let arrAgent_statecode = [];
          let arrAgent_guid = [];
          for (var i=0;i<this.selectionChange.length;i++){
            arrProtect_status.push(this.selectionChange[i].protect_status)
            arrAgent_guid.push(this.selectionChange[i].agent_guid)
            arrAgent_statecode.push(this.selectionChange[i].agent_statecode)
          }
          console.log(arrProtect_status,arrAgent_guid,arrAgent_statecode,12)
          let strProtect_status = arrProtect_status.toString();
          let strAgent_statecode = arrAgent_statecode.toString();
          let strAgent_guid = arrAgent_guid.toString();
          console.log(strProtect_status,strAgent_statecode,strAgent_guid,23)
          if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1){
            this.$message('存在机器处于离线或未激活状态');
          }else if(strProtect_status.indexOf('0')!=-1){
            this.$message('已有机器处于关闭防护状态');
          }else {
            this.closeProtectionData22 = this.selectionChange;
            this.dialogTableClosePro22 = true;
            this.strAgent_guid = strAgent_guid;
            this.strProtect_status = '0';
            // this.isChangeColor3 = true;
          }
        }
      },
      // 关闭防护-多选-确定
      closeProDisappear21(){
        let ser = 'remoteUpdateProtectStatusHostList',
            paramStr = '<guidStr>'+ this.strAgent_guid +'</guidStr>'+
                       '<protectStatus>'+ this.strProtect_status +'</protectStatus>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          console.log(res,3434)
          this.isChangeColor3 = false;
          this.dialogTableClosePro22 = false;
          this.strProtect_status = '';
          this.strAgent_guid = '';
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 关闭防护-多选-取消
      closeProDisappear22(){
        this.dialogTableClosePro22 = false;
        // this.isChangeColor3 = false;
        // this.selectionChange = [];
        // console.log(this.selectionChange,999)
      },
      // 开启防护-关闭弹框-关闭
      openProDisappear(){
        this.dialogTableOpenPro = false;
        this.agentGuidOpenPro = '';
        this.openProtectionData = []
        this.protectStatus = ''
      },
      // 开启防护-关闭弹框-确定
      openProDisappear1(){
        this.dialogTableOpenPro = false;
        this.getOpenProtection();
        this.agentGuidOpenPro = '';
        this.openProtectionData = []
        this.protectStatus = ''
      },
      // 关闭防护
      // 关闭防护-打开弹框
      closeProtectionBtn(val){
        this.dialogTableClosePro = true;
        let closeProtectionBtnList = [];
        closeProtectionBtnList.push(val);
        this.closeProtectionData = closeProtectionBtnList;
        this.agentGuidOpenPro = closeProtectionBtnList[0].agent_guid;
        this.protectStatus = '0';
      },
      
      // 关闭防护-关闭弹框-关闭
      closeProDisappear(){
        this.dialogTableClosePro = false;
        this.agentGuidOpenPro = '';
        this.closeProtectionData = []
        this.protectStatus = ''
      },
      // 关闭防护-关闭弹框-确定
      closeProDisappear1(){
        this.dialogTableClosePro = false;
        this.getCloseProtection();
        this.agentGuidOpenPro = '';
        this.closeProtectionData = []
        this.protectStatus = ''
      },
      // 开启防护-接口
      getOpenProtection(){

        console.log(this.protectStatus)
        let ser = 'remoteUpdateProtectStatusHost',
            paramStr = '<agent_guid>'+ this.agentGuidOpenPro +'</agent_guid>'+
                       '<protectStatus>'+ this.protectStatus +'</protectStatus>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 关闭防护-接口
      getCloseProtection(){
        let ser = 'remoteUpdateProtectStatusHost',
            paramStr = '<agent_guid>'+ this.agentGuidOpenPro +'</agent_guid>'+
                       '<protectStatus>'+ this.protectStatus +'</protectStatus>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 多选文件一致性扫描-打开弹框
      TableScanClick(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择一项数据进行处理'
          });
        }else{
         
          let arrAgent_statecode = [];
          let arrAgent_guid = [];
          for (var i=0;i<this.selectionChange.length;i++){
           
            arrAgent_guid.push(this.selectionChange[i].agent_guid)
            arrAgent_statecode.push(this.selectionChange[i].agent_statecode)
          }
          console.log(arrAgent_guid,arrAgent_statecode,12)
        
          let strAgent_statecode = arrAgent_statecode.toString();
          let strAgent_guid = arrAgent_guid.toString();
          console.log(strAgent_statecode,strAgent_guid,23)
          if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1){
            this.$message('存在机器处于离线或未激活状态');
         
          }else {
            this.ProtectionDataGb11 = this.selectionChange;
            this.dialogTableScan11 = true;
            this.strAgent_guid = strAgent_guid;
          }
        }
      },
      // 多选文件一致性扫描-确定
      flieScan11(){
        let ser = 'integrityScanList',
            paramStr = '<guidStr>'+ this.strAgent_guid +'</guidStr>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          console.log(res,3434)
          this.strAgent_guid = '';
          this.dialogTableScan11 = false;
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 开启主动防御-多选-打开弹框
      ProtectionKq11(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择一项数据进行处理'
          });
        }else{
          console.log(this.selectionChange,3333);
          let arrActiversps_status = [];
          let arrAgent_statecode = [];
          let arrAgent_guid = [];
          for (var i=0;i<this.selectionChange.length;i++){
            arrActiversps_status.push(this.selectionChange[i].activersps_status)
            arrAgent_guid.push(this.selectionChange[i].agent_guid)
            arrAgent_statecode.push(this.selectionChange[i].agent_statecode)
          }
          console.log(arrActiversps_status,arrAgent_guid,arrAgent_statecode,12)
          let strActiversps_status = arrActiversps_status.toString();
          let strAgent_statecode = arrAgent_statecode.toString();
          let strAgent_guid = arrAgent_guid.toString();
          console.log(strActiversps_status,strAgent_statecode,strAgent_guid,23)
          if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1){
            this.$message('存在机器处于离线或未激活状态');
          }else if(strActiversps_status.indexOf('1')!=-1){
            this.$message('已有机器处于开启主动防御状态');
          }else {
            this.ProtectionDataKq11 = this.selectionChange;
            this.dialogTableCloseProKq11 = true;
            this.strAgent_guid = strAgent_guid;
            this.strActiversps_status = '1';
            // this.isChangeColor5 = true;
          }
        }
      },
      // 开启主动防御-多选-确定
      kqProDisappear11(){
        console.log(this.strAgent_guid,6767)
        let ser = 'changeActiveRspsStatusList',
            paramStr = '<guidStr>'+ this.strAgent_guid +'</guidStr>'+
                       '<activersps_status>'+ this.strActiversps_status +'</activersps_status>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          console.log(res,3434)
          // this.isChangeColor5 = false;
          this.dialogTableCloseProKq11 = false;
          this.strActiversps_status = '';
          this.strAgent_guid = '';
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 关闭主动防御-多选-打开弹框
      ProtectionGb11(){
        if(this.selectionChange.length == '0'){
          this.$message({
            message: '请选择一项数据进行处理'
          });
        }else{
          console.log(this.selectionChange,3333);
          let arrActiversps_status = [];
          let arrAgent_statecode = [];
          let arrAgent_guid = [];
          for (var i=0;i<this.selectionChange.length;i++){
            arrActiversps_status.push(this.selectionChange[i].activersps_status)
            arrAgent_guid.push(this.selectionChange[i].agent_guid)
            arrAgent_statecode.push(this.selectionChange[i].agent_statecode)
          }
          console.log(arrActiversps_status,arrAgent_guid,arrAgent_statecode,12)
          let strActiversps_status = arrActiversps_status.toString();
          let strAgent_statecode = arrAgent_statecode.toString();
          let strAgent_guid = arrAgent_guid.toString();
          console.log(strActiversps_status,strAgent_statecode,strAgent_guid,23)
          if(strAgent_statecode.indexOf('13')!=-1||strAgent_statecode.indexOf('14')!=-1){
            this.$message('存在机器处于离线或未激活状态');
          }else if(strActiversps_status.indexOf('0')!=-1){
            this.$message('已有机器处于关闭主动防御状态');
          }else {
            this.ProtectionDataGb22 = this.selectionChange;
            this.dialogTableCloseProGb11 = true;
            this.strAgent_guid = strAgent_guid;
            this.strActiversps_status = '0';
            // this.isChangeColor6 = true;
          }
        }
      },
      // 关闭主动防御-多选-确定
      gbProDisappear11(){
        let ser = 'changeActiveRspsStatusList',
            paramStr = '<guidStr>'+ this.strAgent_guid +'</guidStr>'+
                       '<activersps_status>'+ this.strActiversps_status +'</activersps_status>';
        serverRegion(ser,paramStr).then( res => {
          this.$message({
            message: res
          })
          this.dialogTableCloseProGb11 = false;
          this.strActiversps_status = '';
          this.strAgent_guid = '';
          this.getServiceList();
        }).catch( err => {
          console.log('获取数据失败',err)
        })
      },
      // 多选文件一致性扫描-取消
      getAgentCode(value,row){
        return row.agent_statecode == value;
      },
      getAgentCode1(value,row){
        return row.protect_level == value;
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
        this.getServiceList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getServiceList();
      },
      changeRegion(zone,index) {
        this.currentPage = 1;
        this.currentId = zone.id;
        this.input5 = '';
        this.getServiceList();
      },
      // getServerRegion(){
      //     let ser = 'remoteAllZone',
      //         ser1 = 'remoteGetHostZoneList';
      //     serverRegion(ser).then( res => {
      //       let areaName = res.zonelist;
      //       // for(var key in areaName){
      //       //       areaName[key].count = 0;
      //       //     }
      //           this.areas = areaName;
      //     }).catch( err => {
      //       console.log('获取存储数据失败', err )
      //     })
      //     serverRegion(ser1).then( res => {
      //       for(let key in this.areas){
      //         let areaCount = res.zoneList;
      //           for(let i in areaCount){
      //             if(this.areas[key].id === areaCount[i].zoneId){
      //               this.areas[key].count = areaCount[i].count;
      //             }
      //           }
      //         }
      //     }).catch( err => {
      //       console.log('获取存储数据失败', err )
      //     })
      // },
    // 获取地区
    getServerRegion() {
      let ser = "remoteAllZone";
      serverRegion(ser)
        .then(res => {
          console.log("获取地区成功", res);
          // let areaName = res.zonelist;
          //   // for(var key in areaName){
          //   //       areaName[key].count = 0;
          //   //     }
          //       this.areas = areaName;
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
      let ser1 = "remoteGetHostZoneList";
      serverRegion(ser1)
        .then(res => {
          console.log("获取地区数量成功", res);
          if (res.zoneList.length == 0) {
            this.currentId = zoneAll[0].id;
            this.areas = zoneAll;
            this.getServiceList();
          } else {
            for (var item in zoneAll) {
              let zoneAllNum = res.zoneList;
              for (var num in zoneAllNum) {
                if (zoneAll[item].id === zoneAllNum[num].zoneId) {
                  zoneAll[item].count = zoneAllNum[num].count;
                }
              }
            }
            this.areas = zoneAll;
            for (var i = 0; i < zoneAll.length; i++) {
              if (zoneAll[i].count > 0) {
                this.currentId = zoneAll[i].id;
                this.getServiceList();
                return;
              }
            }
          }
        })
        .catch(err => {
          console.log("获取地区数量失败", err);
        });
      },

    },

    computed:{
      
    }

  }
</script>

<style lang="scss" scoped="scoped">
  .ecm_monitor{
      background: #f6f8fb;
      .el-input{
        float:right;
        margin-right:20px;
      }
     .content{
      background: #ffffff;
      .content_top{
        background: #ffffff;
        padding-top: 34px;
        padding-left: 20px;
        padding-bottom: 20px;
        overflow:hidden;
      }
      .content-top{
        width:100%;
        height:100%;
        line-height:82px;
        background:#ffffff;
        padding-top:30px;
        padding-left:20px;
        padding-bottom:22px;
        overflow:hidden;
        span{
          display: block;
          height: 34px;
          background: #f0f2f7;
          float: left;
          text-align: center;
          line-height: 34px;
          border-radius: 5px;
          margin-right: 10px;
          font-size: 12px;
          padding: 0 10px;
          cursor: pointer;
          -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;

        }
        .changeColor{
          background:#56d6c4;
          color:#ffffff;
        }
        .ownColor{
          background:#f0f2f7;
          color:#606266
        }
      }
    }
    .top{
      background: #ffffff;
      border-bottom: 1px solid #f8f9fb;
      position: relative;
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
        padding-left: 2%;
        text-align: left;
        .node_name{
        font-size: 14px;
        color: #333333;
        padding: 20px 0px;
      }
    }
    .right{
        padding-top: 52px;
        .createButton{
        width: 120px;
        height: 36px;
        background: #3ac0f1;
        border-color: #3ac0f1;
        color: #ffffff;
        font-size: 12px;
        margin-right: 15px;
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
      .pagination{
        float:right;
        margin: 20px;
      }
    .serviceStyle{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el-button{
      border-radius:0;
    }
    .el-checkbox-group{
      text-align:left;
    }
    .el-table .cell{
      text-overflow:useset !important
    }
  }
</style>
<style lang="scss">
.server-list{
  .el-table .cell{
    text-overflow:unset
  }
  .el-table .icon20{
    margin-left:10px;
  }
  .serverIpStyle{
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    display: block;
    line-height:13px;
  }
  .serverIpStyle-i{
    margin-top: 0px;
  }
}
.el-popover {
    min-width: 0px;
    padding:0;
    position:absolute;
    left:90% !important;
    .popper__arrow{
      left:70% !important;
    }
}
.server-btn-hover-i{
  text-align:center;
  padding:0px 10px;
}
.server-btn-hover{
  text-align:center;
  padding:0px 10px;
  display:block;
  .serverBtnColor{
    color:#333;
  }
  &:hover{
    background:#edf5ff;
    .serverBtnColor{
      color:#409EFF;
    }
  }
}

.ecm_monitor{
  .el-dialog__header {
    background-color: #323c4e;
    height:40px;
    line-height: 40px;
    padding: 0;
    padding-left: 20px;
    &:nth-child(3){
      background-color: #fff !important;
    }
  }
  
  .el-dialog__title {
    color:#e4e5e7;
    font-size: 12px;
  }
  .el-dialog__footer {
    padding:0;
    width: 100%;
    font-size: 0;
  }
  .el-dialog__footer .f_btn {
    margin: 0;
    background-color: #0f0;
    width: 50%;
    border: none;
  }
  .el-dialog__footer .f_btn1 {
    margin: 0;
    background-color: #0f0;
    width: 33.3%;
    border: none;
  }
  .el-dialog__footer .f_btn_l,
  .el-dialog__footer .f_btn_c {
    background-color: #f0f2f7;
  }
  .agent_key{
    margin-bottom: 25px;
    margin-top: 10px;
    border: 1px solid #eee;
    padding: 10px;
  }
  .install_key_agent{
    width:100%;
    background-color: #f9cd76;
    border:none;
  }
  .el-dialog__footer .f_btn_r {
    background-color: #f9cd76;
  }
  .el-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  
  .el-table .el-table__body-wrapper tbody tr td{
    padding: 2px 0;
  }
  .servername{
    padding: 0 !important;
  }
  .server-hostname{
    line-height: 15px;
  }
  .el-input__inner:focus {
    border-color: #dcdfe6;
    outline: none;
  }
  .el-input__inner:hover {
    border-color: #dcdfe6;
    outline: none;
  }
  .el-radio-button__inner {
    border-left: 1px solid #f0f2f7!important;
  }
  .el-button--mini{
    padding:0;
  }
  .serviceName{
    // overflow:hidden;
    // white-space:nowrap;
    // text-overflow:ellipsis;
    line-height:15px;
    font-size:12px;
    margin:8px 0;
  }
  .mainTable {
    background-color: #ffffff;
    padding: 20px;
    padding-top:4px;
    overflow:hidden;
  }
  .dialog-footer{
    background:#fff;
  }
  .addWarn{
    width:10px;
    height:10px;
    margin-bottom:-1px;
    display:inline-block;
    border-radius:50%;
  }
  .redWarn{
    background:#f6585e;
    border:1px solid #f8a8ab;
  }
  .greenWarn{
    background:#52ec29;
    border:1px solid #aaf595;
  }
  .grayWarn{
    background:#cccccc;
    border:1px solid #ccc;
  }
  .icon-hide{
    color:transparent;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:none
  }
  .get-more{
    border:0;
    background:transparent;
    cursor:pointer;
  }

  
}
</style> 