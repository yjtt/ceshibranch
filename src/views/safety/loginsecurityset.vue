<template>
    <div class="LandingSecuritySetup">
        <el-row>
            <el-col :span="24">
                <span class="loginTitle">登录安全设置</span>
            </el-col>
        </el-row>
        <div class="row1">
            <el-row>
                <div>
                    <el-col class="left" :span="20">
                        <p class="left_name">常用登录地址</p>
                    </el-col>
                    <el-col class="right" :span="4">
                        <el-button class="createButton" @click='addEvent1'>添加</el-button>
                    </el-col>
                </div>
                <el-table
                        border
                        :show-header="false" 
                        :data="tableData1.agentAreaList"
                        style="width: 97%;">
                    <el-table-column
                            prop="legalarea"
                            label="地名">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="数量">
                        <template slot-scope="scope">
                            生效服务器：{{scope.row.count}}台
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                        width="150">
                        <template slot-scope="scope" >
                            <el-button @click="editTable1('1', scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="deletetable('1', scope.row.legalconfigid)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="content-bottom">
                    <el-pagination
                    v-if="totalNum1>2"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize1"
                    :page-count="pageCount1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum1">
                  </el-pagination>
                  <el-pagination
                      v-else
                      layout="">
                  </el-pagination>
                </div>
            </el-row>
        </div>
        <div class="row2">
            <el-row>
                <div>
                    <el-col class="left" :span="20">
                        <p class="left_name">合法登录IP</p>
                        <!-- <div class="left_radio">
                            <el-switch
                                    v-model="value1"
                                    active-color="#56d6c4"
                                    inactive-color="#f2f0f6"
                                    inactive-text="非合法登录IP报警">
                            </el-switch>
                        </div> -->
                    </el-col>
                    <el-col class="right" :span="4">
                        <el-button class="createButton" @click='addEvent2'>添加</el-button>
                    </el-col>
                </div>
                <el-table
                        border
                        :show-header="false"
                        :data="tableData2.agentIPList"
                        style="width: 97%">
                    <el-table-column
                            prop="legalip"
                            label="IP">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="数量">
                        <template slot-scope="scope">
                            生效服务器：{{scope.row.count}}台
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150">
                        <template slot-scope="scope" >
                            <el-button type="text" @click="editTable2('2', scope.row)" size="small">编辑</el-button>
                            <el-button
                                     @click="deletetable('2', scope.row.legalconfigid)"
                                    type="text"
                                    size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="content-bottom">
                  <el-pagination
                    v-if="totalNum2>2"
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize2"
                    :page-count="pageCount2"                    
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum2">
                  </el-pagination>
                  <el-pagination
                      v-else
                      layout="">
                  </el-pagination>
                </div>
            </el-row>
        </div>
        <div class="row3">
            <el-row>
                <div>
                    <el-col class="left" :span="20">
                        <p class="left_name">合法登录时间</p>
                        <!-- <div class="left_radio">
                            <el-switch
                                    v-model="value2"
                                    active-color="#56d6c4"
                                    inactive-color="#f2f0f6"
                                    inactive-text="非合法登录时间报警">
                            </el-switch>
                        </div> -->
                    </el-col>
                    <el-col class="right" :span="4">
                        <el-button class="createButton" @click='addEvent3'>添加</el-button>
                    </el-col>
                </div>
                <el-table
                        border
                        :show-header="false"
                        :data="tableData3.agentTimeList"
                        style="width: 97%">
                    <el-table-column
                            prop="legallogintime"
                            label="时间">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="数量">
                        <template slot-scope="scope">
                            生效服务器：{{scope.row.count}}台
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150">
                        <template slot-scope="scope" >
                            <el-button type="text"  @click="editTable3('3', scope.row)"  size="small">编辑</el-button>
                            <el-button
                                    @click="deletetable('3', scope.row.legalconfigid)"
                                    type="text"
                                    size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="content-bottom">
                    <el-pagination
                    v-if="totalNum3>2"
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    :current-page="currentPage3"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize3"
                    :page-count="pageCount3"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum3">
                  </el-pagination>
                  <el-pagination
                      v-else
                      layout="">
                  </el-pagination>
                </div>
            </el-row>
        </div>
        <div class="row4">
            <el-row>
                <div>
                    <el-col class="left" :span="20">
                        <p class="left_name">合法账号</p>
                        <!-- <div class="left_radio">
                            <el-switch
                                    v-model="value3"
                                    active-color="#56d6c4"
                                    inactive-color="#f2f0f6"
                                    inactive-text="非合法登录账号报警">
                            </el-switch>
                        </div> -->
                    </el-col>
                    <el-col class="right" :span="4">
                        <el-button class="createButton" @click='addEvent4'>添加</el-button>
                    </el-col>
                </div>
                <el-table
                        border
                        :show-header="false"
                        :data="tableData4.agentUserList"
                        style="width: 97%">
                    <el-table-column
                            prop="legaluser"
                            label="账号">
                    </el-table-column>
                        <el-table-column
                            prop="count"
                            label="数量">
                        <template slot-scope="scope">
                            生效服务器：{{scope.row.count}}台
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150">
                        <template slot-scope="scope" >
                            <el-button @click="editTable4('4', scope.row)" type="text" size="small">编辑</el-button>
                            <el-button
                                     @click="deletetable('4', scope.row.legalconfigid)"
                                    type="text"
                                    size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="content-bottom">
                    <el-pagination
                    v-if="totalNum4>2"
                    @size-change="handleSizeChange4"
                    @current-change="handleCurrentChange4"
                    :current-page="currentPage4"
                    :page-sizes="[2, 5, 10, 20]"
                    :page-size="pageSize4"
                    :page-count="pageCount4"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum4">
                  </el-pagination>
                  <el-pagination
                    v-else
                    layout="">
                  </el-pagination>
                </div>
            </el-row>
        </div>
        <el-dialog title="添加常用登录地" :visible.sync="dialogFormVisible1" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <el-form :model="form1">
            <span style="color:red;"> * &nbsp;</span><span style="margin-right:45px;">选择要添加的常用登录地：</span>
            <div class="dialogloginArea1">
              <el-select v-model="addform1.zone1"  placeholder="中国" style="width:132px;height:30px;">
                  <el-option v-for="item1 in form1.zone1" :key="item1.value" :label="item1.label" :value="item1.value" style="width:132px;height:30px;"></el-option>
              </el-select>
              <el-select v-model="addform1.zone2" value-key="id" @change="getCityByProvinceId(addform1.zone2.id)" placeholder="请选择" style="width:132px;height:30px;margin-left:10px;">
                  <el-option v-for="item in form1.zone2" :key="item.id" :label="item.name" :value="item" style="width:132px;height:30px;"> 
                    </el-option>
              </el-select>
              <el-select v-model="addform1.zone3"  placeholder="请选择" :disabled="addform1.zone2.id == ''" style="width:132px;height:30px;margin-left:10px;">
                  <el-option v-for="(item,index) in form1.zone3" :key="index" :label="item.name" :value="item.name" style="width:132px;height:30px;"></el-option>
              </el-select>
            </div>
              <!-- <span style="color:red;"> * &nbsp;</span> -->
              <span style="color:red;">&nbsp;&nbsp;</span>              
              <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform1.AllZone" @change="getAddEventServic('1',addform1.AllZone,'')" placeholder="请选择活动区域" style="width:310px;">
                <el-option v-for="(item,index) in form1.AllZone" :key="index" :label="item.zoneName" :value="item.id" style="width:318px;height:30px;"></el-option>
              </el-select>
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>
              <br>
            <!-- <span style="color:red;"> * &nbsp;</span> -->
            <!-- {{addform1.serve}} -->
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span style="margin-right:-10px;">应用的服务器：</span>
            <el-select v-model="addform1.serve" multiple placeholder="请选择云服务器" :disabled="addform1.AllZone == ''" style="width:318px;">
              <el-option v-for="(item,index) in form1.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
            </el-select><br>
              <!-- <el-checkbox-group 
                v-model="addform1.serve">
                <el-checkbox v-for="(item,index) in form1.serve" :label="item" :key="index">{{ item.gent_ip }}</el-checkbox>
              </el-checkbox-group> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible1 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="addExceptionAddLegalArea()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑常用登录地" :visible.sync="dialogFormVisible11" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <!-- {{editTableRow}}{{editform1}} -->
          <el-form :model="editTableRow">
            <span style="color:red;"> * &nbsp;</span><span style="margin-right:45px;">选择要添加的常用登录地：</span>
            <div class="dialogloginArea1">
              <el-select v-model="editTableRow.zone[0]" disabled placeholder="中国" style="width:132px;height:30px;">
                  <el-option v-for="item1 in editTableRow.zone1" :key="item1.value" :label="item1.label" :value="item1.value" style="width:132px;height:30px;"></el-option>
              </el-select>
              <el-select v-model="editTableRow.zone[1]" disabled value-key="id" @change="getCityByProvinceId(addform1.zone2.id)"  style="width:132px;height:30px;margin-left:10px;">
                  <el-option v-for="item in editTableRow.zone2" :key="item.id" :label="item.name" :value="item" style="width:132px;height:30px;"> 
                    </el-option>
              </el-select>
              <el-select v-model="editTableRow.zone[2]" disabled style="width:132px;height:30px;margin-left:10px;">
                  <el-option v-for="(item,index) in editTableRow.zone3" :key="index" :label="item.name" :value="item.name" style="width:132px;height:30px;"></el-option>
              </el-select>
            </div>
            <!-- {{addform1.AllZone}} -->
              <!-- <span style="color:red;"> * &nbsp;</span> -->
              <span style="color:red;">&nbsp;&nbsp;</span>              
              <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform1.AllZone" @change="getAddEventServic('11',addform1.AllZone)" placeholder="请选择活动区域" style="width:318px;">
                <el-option v-for="(item,index) in form1.AllZone" :key="index" :label="item.zoneName" :value="item.id" style="width:318px;height:30px;"></el-option>
              </el-select>
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip><br>
            <!-- <span style="color:red;"> * &nbsp;</span> -->
            <!-- {{editform1.serve}} -->
            <span style="color:red;">&nbsp;&nbsp;</span>
            <span>应用的服务器：</span>
            <el-select v-model="editform1.serve" multiple placeholder="请选择云服务器" :disabled="addform1.AllZone == ''" style="width:318px;">
              <el-option v-for="(item,index) in form1.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
            </el-select><br>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible11 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="setLegalConfigServer('1',editTableRow.legalconfigid)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加合法登录IP" :visible.sync="dialogFormVisible2" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
         <!-- {{addform2}} -->
          
          <el-form :model="addform2" status-icon :rules="rules2" ref="addform2" label-width="192px">
            <!-- <span style="color:red;display:inline-block;margin-bottom:10px;">输入要添加的合法登录IP：</span> -->
              <!-- <el-input v-model="addform2.IP" auto-complete="off" style="width:350px;margin-left:15px;" placeholder="如:192.168.0.1/27"></el-input><br> -->
            <el-form-item label="输入要添加的合法登录IP：" prop="IP" class="red-star1" style="margin-bottom:8px;">
              <el-input type="IP" v-model="addform2.IP" auto-complete="off"  style="width:250px;margin-left:-10px;" ></el-input>
              <div class='publicIp' style="width:80px;margin-left:-10px;color:#ccc;position:absolute;top:0px;left:120px;" >{{descrip}}</div>
            </el-form-item>
            <span style="color:red;">&nbsp;&nbsp;</span>              
              <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform2.AllZone" @change="getAddEventServic('2',addform2.AllZone)" placeholder="请选择活动区域" style="width:318px;">
                <el-option v-for="(item,index) in form1.AllZone" :key="index" :label="item.zoneName" :value="item.id" style="width:318px;height:30px;"></el-option>
              </el-select>
              <!-- sll添加 -->
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>

              <br>
            <!-- <span style="color:red;">&nbsp;&nbsp;</span>               -->
            <span >应用的服务器：</span>
            <el-select v-model="addform2.serve" multiple placeholder="请选择云服务器" :disabled="addform2.AllZone == ''" style="width:318px;">
              <el-option v-for="(item,index) in form1.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
            </el-select>
            <br>              
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible2 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="addExceptionAddLegalIP('addform2')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑合法登录IP" :visible.sync="dialogFormVisible22" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <el-form :model="addform2" status-icon label-width="192px">
            <el-form-item label="输入要添加的合法登录IP：" prop="IP" class="red-star1" style="margin-bottom:8px;">
              <el-input type="IP" v-model="editTableRow2.legalip" disabled auto-complete="off"  style="width:250px;margin-left:-10px" ></el-input>
            </el-form-item>
            <span style="color:red;">&nbsp;&nbsp;</span>              
              <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform2.AllZone" @change="getAddEventServic2('2',addform2.AllZone)" placeholder="请选择活动区域" style="width:318px;">
                <el-option v-for="(item,index) in form1.AllZone" :key="index" :label="item.zoneName" :value="item.id" style="width:318px;height:30px;"></el-option>
              </el-select>

              <!-- sll添加 -->
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>

              <br>
            <span style="color:red;">&nbsp;&nbsp;</span>              
            <span style="margin-right:-10px;">应用的服务器：</span>
            <el-select v-model="editform2.serve" multiple  placeholder="请选择云服务器" :disabled="addform2.AllZone == ''" style="width:318px;">
              <el-option v-for="(item,index) in form2.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
            </el-select><br>              
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible22 = false">取 消</el-button><el-button class="f_btn f_btn_r"  @click="setLegalConfigServer('2',editTableRow2.legalconfigid)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加合法登录时间" :visible.sync="dialogFormVisible3" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <el-form :model="addform3">
            <span style="color:red;"> * &nbsp;</span><span style="display:inline-block;">输入要添加的合法登录时间：</span>
            <div class="dialogloginArea3" style="display:inline-block;width:220px;">
              <el-time-picker
                is-range
                v-model="addform3.value3"
                value-format="HH:mm" 
                format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </div><br>
            <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform3.AllZone3" placeholder="" @change="getAddEventServic('3',addform3.AllZone3)" style="width:335px;"> 
                <el-option
                v-for="(item,index) in form1.AllZone"
                :key="index"
                :value="item.id"
                :label="item.zoneName" >
                </el-option>
              </el-select>

              <!-- sll添加 -->
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>

              <br>
            <span style="margin-right:-10px;">应用的服务器：</span>
              <el-select v-model="addform3.serve3" placeholder="" multiple  :disabled="addform3.AllZone3==''" style="width:335px;">
                  <!-- <el-option
                  v-for="(item,index) in form3.serve"
                  :key="index"
                  :value="item.agent_guid"
                  :label="item.agent_ip">
                  </el-option> -->
                  <el-option v-for="(item,index) in form1.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
              </el-select>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible3 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="addExceptionAddLegalTime()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑合法登录时间" :visible.sync="dialogFormVisible33" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <el-form :model="addform3">
            <!-- {{editTableRow3}} -->
            <span style="color:red;"> * &nbsp;</span><span style="display:inline-block;">输入要添加的合法登录时间：</span>
            <div class="dialogloginArea3" style="display:inline-block;">
              <el-time-picker
                disabled
                is-range
                v-model="editTableRow3.time"
                value-format="HH:mm" 
                format="HH:mm"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </div><br>
            <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform3.AllZone3" placeholder="" @change="getAddEventServic3('3',addform3.AllZone3)"  style="width:335px;">
                <el-option
                v-for="(item,index) in form1.AllZone"
                :key="index"
                :value="item.id"
                :label="item.zoneName" >
                </el-option>
              </el-select>
              
              <!-- sll添加 -->
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>
              
              <br>
            <span style="margin-right:-10px;">应用的服务器：</span>
              <el-select v-model="editform3.serve" placeholder="" multiple  :disabled="addform3.AllZone3==''"  style="width:335px;">
                  <!-- <el-option
                  v-for="(item,index) in form3.serve"
                  :key="index"
                  :value="item.agent_guid"
                  :label="item.agent_ip">
                  </el-option> -->
                  <el-option v-for="(item,index) in form3.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
              </el-select>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible33 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="setLegalConfigServer('3',editTableRow3.legalconfigid)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加合法登录账号" :visible.sync="dialogFormVisible4" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <el-form :model="addform4">
            <span style="color:red;"> * &nbsp;</span><span style="display:inline-block;margin-bottom:10px;">输入要添加的合法登录账号：</span>
            <el-input v-model="addform4.name4" auto-complete="off" style="width:220px;height:30px;margin-left:15px;" placeholder=""></el-input><br>
            <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform4.AllZone4" placeholder="" @change="getAddEventServic('4',addform4.AllZone4)" style="width:335px;">
                <el-option
                v-for="(item,index) in form1.AllZone"
                :key="index"
                :value="item.id"
                :label="item.zoneName">
                </el-option>
              </el-select>
              
              
              <!-- sll添加 -->
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>
              
              <br>
              <!-- form4.choose4   form4.region4-->
            <span style="margin-right:-10px;">应用的服务器：</span>
              <el-select v-model="addform4.serve4" placeholder="" multiple  :disabled="addform4.AllZone4==''" style="width:335px;">
                <el-option v-for="(item,index) in form1.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
              </el-select><br>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible4 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="addExceptionAddLegalUser()">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="编辑合法登录账号" :visible.sync="dialogFormVisible44" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <!-- {{editTableRow4}} -->
          <el-form :model="addform4">
            <span style="color:red;"> * &nbsp;</span><span style="display:inline-block;margin-bottom:10px;">输入要添加的合法登录账号：</span>
            <el-input v-model="editTableRow4.legaluser" auto-complete="off" style="width:220px;height:30px;margin-left:15px;" placeholder="" disabled></el-input><br>
            <span style="margin-right:45px;">地域：</span>
              <el-select v-model="addform4.AllZone4" placeholder=""  @change="getAddEventServic4('4',addform4.AllZone4)" style="width:335px;">
                <el-option
                v-for="(item,index) in form1.AllZone"
                :key="index"
                :value="item.id"
                :label="item.zoneName"
                >
                </el-option>
              </el-select>
              
              <!-- sll添加 -->
              <el-tooltip class="item" effect="dark" content="切换地域后服务器列表会清空" placement="top-end">
                <span>&nbsp;<i class="el-icon-question"></i>&nbsp;</span>
              </el-tooltip>
              
              <br>
            <span style="margin-right:-10px;">应用的服务器：</span>
              <el-select v-model="editform4.serve" placeholder="" multiple  :disabled="addform4.AllZone4==''"  style="width:335px;">
                  <!-- <el-option
                  v-for="(item,index) in form4.serve"
                  :key="index"
                  :value="item.agent_guid"
                  :label="item.agent_ip"
                  >
                  </el-option> -->
                  <el-option v-for="(item,index) in form4.serve" :key="index" :label="item.agent_ip" :value="item.agent_guid" style="width:318px;">
                <span style="float: left">{{ item.agent_ip }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-right:18px;">{{ item.hostname }}</span>
              </el-option>
              </el-select><br>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="dialogFormVisible44 = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="setLegalConfigServer('4',editTableRow4.legalconfigid)">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog title="" :visible.sync="centerDialogVisible" :close-on-click-modal='false' style='width:80%;margin:0px auto 50px;'>
          <div class="top" style="width:100%;">
              <svg-icon icon-class="warn" style="display:block;margin:0 auto;font-size:50px;color:#f9cd76"></svg-icon>
          </div>
          <div style="text-align:center;">
               <span class="expect_info">此操作将永久删除该配置项，是否继续?</span>
          </div>
         
          <div slot="footer" class="dialog-footer">
            <el-button class="f_btn f_btn_l" @click="centerDialogVisible = false">取 消</el-button><el-button class="f_btn f_btn_r" @click="delExceptionDelLegal(deteleTableUpdate,deteleId)">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { loginSecuritySettings, IPcity} from "@/api/safety";
import moment from "moment";
import {
  exceptionGetAreas,
  exceptionGetIP,
  exceptionGetTime,
  exceptionGetUser,
   exceptionAddLegal,
  exceptionDelLegal,
  legalConfigServer,
  getIntegrityEventList,
  updateIntegerityEventStatus,
  eventService,
  getProvince, getCity, serverRegion 
} from "@/api/safety";
import i18n from "@/lang";
export default {
  data() {
    var checkIP = (rule, value, callback) => {
      // console.log(2222222, value);
      if(value != returnCitySN["cip"]){
        callback(this.descrip = '');
      }
      // value = value.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
      var patt = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/;
      if (!value) {
        return callback(new Error("IP不能为空"));
      }
      setTimeout(() => {
        if (!patt.test(value)) {
          callback(new Error("请输入合法IP"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      descrip: '(本机公网IP)',
      pageCount1: 0,
      pageCount2: 0,
      pageCount3: 0,
      pageCount4: 0,
      rules2: {
        IP: [{ validator: checkIP, trigger: "change" }]
      },
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1,
      pageSize1: 2,
      pageSize2: 2,
      pageSize3: 2,
      pageSize4: 2,
      totalNum1: 0,
      totalNum2: 0,
      totalNum3: 0,
      totalNum4: 0,
      value1: true,
      value2: true,
      value3: true,
      checkbox: false,
      regionNum: [],
      regionEventId: [],
      regionId: "",
      currentId: "",
      zoneSecurityAll: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      dialogFormVisible4: false,
      dialogFormVisible11: false,
      dialogFormVisible22: false,
      dialogFormVisible33: false,
      dialogFormVisible44: false,
      centerDialogVisible: false,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      deteleId: "",
      deteleTableUpdate: "",
      editTableRow: {
        zone: ["", "", ""]
      },
      editTableRow2: {
        zone: ["", "", "", ""]
      },
      editTableRow3: {
        zone: ["", "", ""]
      },
      editTableRow4: {
        zone: ["", "", ""]
      },
      // editTableRow3: '',
      // editTableRow4: '',
      startTime: "",
      endTime: "",
      form1: {
        zone1: [{ label: "中国", value: 0 }],
        zone2: [], //省份
        zone3: [], //城市
        AllZone: "",
        serve: ""
      },
      form2: {
        name2: "",
        region2: "",
        choose2: "",
        AllZone: "",
        serve: ""
      },
      form3: {
        value4: [],
        value5: "",
        Allzone: "",
        serve: ""
      },
      form4: {
        name4: "",
        Allzone: "",
        serve: ""
      },
      addform1: {
        zone1: 0,
        zone2: {
          id: "",
          name: ""
        },
        zone3: "",
        AllZone: "",
        serve: []
      },
      addform2: {
        IP: "",
        AllZone: "",
        serve: ""
      },
      addform3: {
        value3: "",
        AllZone3: "",
        serve3: ""
      },
      addform4: {
        name4: "",
        AllZone4: "",
        serve4: ""
      },
      regionEventId: "",
      writeDialogForm4: false,
      editform1: {
        serve: [],
        legalconfigids: []
      },
      editform2: {
        serve: [],
        legalconfigid: ""
      },
      editform3: {
        serve: [],
        legalconfigid: ""
      },
      editform4: {
        serve: [],
        legalconfigid: ""
      },
      tableData: [
        {
          date: "上海市",
          name: "生效服务器：1台",
          address: "地域:广州"
        },
        {
          date: "上海市",
          name: "生效服务器：1台",
          address: "地域:广州"
        }
      ]
    };
  },
  created() {
    // this.getajax();
    // this.getloginSecuritySetting();
    //图15-异常登录.png
    this.getExceptionGetAreas();
    this.getExceptionGetIP();
    this.getExceptionGetTime();
    this.getExceptionGetUser();
    // this.getAddEventServic();
    //图18-弹出框-添加常用登录地址.png
    // this.addExceptionAddLegalArea();

    //图16-弹出框-添加合法登录时间.png
    // this.addExceptionAddLegalTime();
    //图19-弹出框-添加合法登录账号.png
    // this.addExceptionAddLegalUser();

    //图15-异常登录.png 编辑  设置异常登录的配置（只可修改分配的计算机不可修改配置本身属性）
    // this.setLegalConfigServer();
    // this.getIntegrityEventList();
    // this.defIntegrityEventStauts();

    //图15-异常登录.png 标记为已处理
    // this.getremoteUpdateExceptionStatus();
  },
  mounted() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
    document.body.appendChild(s);
  },
  methods: {
    // 编辑-------表1
    editTable1(num, value) {
      // 每次点击编辑清空之前所选地域及服务器
      this.addform1.AllZone = "";
      this.editform1.serve = []; 
      console.log(123567890, num, value);
      this.dialogFormVisible11 = true;
      this.editTableRow = value;
      console.log(8888888888, value);
    //   常用登陆地字符串转数组
      var strs = new Array(); //定义一数组
      console.log(this.editTableRow, this.editTableRow.legalarea, 66);
      strs = this.editTableRow.legalarea.split("-");
      this.editTableRow.zone = strs;

      console.log(1234567, this.editTableRow);
      this.getExceptionRegion(); //获取地域

      // 编辑时获取已选的服务器
      this.getEditLoginSafty("1", value.legalconfigid);
    },
    // 编辑时获取已经生效的服务器列表
    getEditLoginSafty(zoneId, legalconfigid) {
      let ser = "remoteGetEditLoginSafty";
      let paramsData = "<legalconfigid>" + legalconfigid + "</legalconfigid>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("已经配置的服务器获取成功", res);
          this.editform1.legalconfigids = res;
        })
        .catch(err => {
          console.log("已经配置的服务器获取失败", err);
        });
    },
    // 编辑-------表2
    editTable2(num, value) {
      // 每次点击编辑清空之前所选地域及服务器
      this.addform2.AllZone = "";
      this.editform2.serve = [];
      this.dialogFormVisible22 = true;
      console.log(value, 35547567978078);
      this.editTableRow2 = value;
      console.log(1234567, this.editTableRow2);

      this.getExceptionRegion(); //获取地域
      // 编辑时获取已选的服务器
      this.getEditLoginSafty2("2", value.legalconfigid);
    },

    // 编辑时获取已经生效的服务器列表
    getEditLoginSafty2(zoneId, legalconfigid) {
      let ser = "remoteGetEditLoginSafty";
      let paramsData = "<legalconfigid>" + legalconfigid + "</legalconfigid>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("已经配置的服务器获取成功", res);
          this.editform2.legalconfigid = res;
        })
        .catch(err => {
          console.log("已经配置的服务器获取失败", err);
        });
    },

    // 编辑-------表3
    editTable3(num, value) {
      // 每次点击编辑清空之前所选地域及服务器
      this.addform3.AllZone3 = "";
      this.editform3.serve = [];
      this.dialogFormVisible33 = true;
      this.editTableRow3 = value;
      this.editTableRow3.time = value.legallogintime.split("-");
      console.log(this.editTableRow3, 43658679);
      this.getExceptionRegion();

      // 编辑时获取已选的服务器
      this.getEditLoginSafty3("3", value.legalconfigid);
      // console.log(value.legalconfigid,54444444444444444444444)
    },
    // 编辑时获取已经生效的服务器列表
    getEditLoginSafty3(zoneId, legalconfigid) {
      let ser = "remoteGetEditLoginSafty";
      let paramsData = "<legalconfigid>" + legalconfigid + "</legalconfigid>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("已经配置的服务器获取成功", res);
          this.editform3.legalconfigid = res;
          // console.log(this.editform3.legalconfigid,11111111111111111111)
        })
        .catch(err => {
          console.log("已经配置的服务器获取失败", err);
        });
    },

    // 编辑-------表4
    editTable4(num, value) {
      // 每次点击编辑清空之前所选地域及服务器
      this.addform4.AllZone4 = "";
      this.editform4.serve = [];
      this.dialogFormVisible44 = true;
      this.editTableRow4 = value;
      console.log(1234567888888888, this.editTableRow4);
      // var strs4= new Array(); //定义一数组
      // strs4=this.editTableRow4.legaluser.split("-");
      // this.editTableRow4.zone = strs4
      // console.log(strs4,46586798090776666)
      // this.editTableRow3.time = value.legallogintime.split("-")
      console.log(1234567, this.editTableRow4);
      this.getExceptionRegion();

      // // 编辑时获取已选的服务器
      this.getEditLoginSafty4("4", value.legalconfigid);
    },

    // 编辑时获取已经生效的服务器列表
    getEditLoginSafty4(zoneId, legalconfigid) {
      let ser = "remoteGetEditLoginSafty";
      let paramsData = "<legalconfigid>" + legalconfigid + "</legalconfigid>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("已经配置的服务器获取成功", res);
          this.editform4.legalconfigid = res;
        })
        .catch(err => {
          console.log("已经配置的服务器获取失败", err);
        });
    },

    // 选择地区后，获取服务器列表
    getAddEventServic(tableIndex, zoneId) {
      // 切换地区后清空服务器列表
      if (tableIndex == "1") {
        this.addform1.serve = [];
      } else if (tableIndex == "2") {
        this.addform2.serve = [];
      } else if (tableIndex == "3") {
        this.addform3.serve3 = [];
      } else if (tableIndex == "4") {
        this.addform4.serve4 = [];
      }


      let ser = "remoteGetAddLoginSafty";
      let paramsData = "<zoneId>" + zoneId + "</zoneId>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("添加时服务器获取成功", res);
          this.form1.serve = res;
            let obj = this.editform1.legalconfigids; //总共的
            let arr = [];
            // console.log(obj[zoneId])
            if (obj[zoneId]) {
                for (var j = 0; j < obj[zoneId].length; j++) {
                arr.push(obj[zoneId][j].agent_guid);
                }
                this.editform1.serve = arr;
            } else {
                this.editform1.serve = [];
            }
            })
        .catch(err => {
          console.log("添加时服务器获取失败", err);
        });
    },

    //编辑-----------------2
    // 选择地区后，获取服务器列表
    getAddEventServic2(tableIndex, zoneId) {
      // 切换地区后清空服务器列表
      if (tableIndex == "1") {
        this.addform1.serve = [];
      } else if (tableIndex == "2") {
        this.addform2.serve = [];
      } else if (tableIndex == "3") {
        this.addform3.serve3 = [];
      } else if (tableIndex == "4") {
        this.addform4.serve4 = [];
        // this.editform1.serve =
      }



      let ser = "remoteGetAddLoginSafty";
      let paramsData = "<zoneId>" + zoneId + "</zoneId>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("添加时服务器获取成功", res);
          this.form2.serve = res;
            let obj = this.editform2.legalconfigid; //总共的
            let arr = [];
            if (obj[zoneId]) {
                for (var j = 0; j < obj[zoneId].length; j++) {
                arr.push(obj[zoneId][j].agent_guid);
                }
                this.editform2.serve = arr;
            } else {
                this.editform2.serve = [];
            }
        })
        .catch(err => {
          console.log("添加时服务器获取失败", err);
        });
    },

    //编辑-----------------3
    // 选择地区后，获取服务器列表
    getAddEventServic3(tableIndex, zoneId) {
      console.log(tableIndex, zoneId, 6666666666666666);
      // 切换地区后清空服务器列表
      if (tableIndex == "1") {
        this.addform1.serve = [];
      } else if (tableIndex == "2") {
        this.addform2.serve = [];
      } else if (tableIndex == "3") {
        this.addform3.serve3 = [];
      } else if (tableIndex == "4") {
        this.addform4.serve4 = [];
      }
      let ser = "remoteGetAddLoginSafty";
      let paramsData = "<zoneId>" + zoneId + "</zoneId>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("添加时服务器获取成功", res);
          this.form3.serve = res;
            let obj = this.editform3.legalconfigid; //总共的
            let arr = [];
            if (obj[zoneId]) {
                for (var j = 0; j < obj[zoneId].length; j++) {
                arr.push(obj[zoneId][j].agent_guid);
                }
                this.editform3.serve = arr;
            } else {
                this.editform3.serve = [];
            }
        })
        .catch(err => {
          console.log("添加时服务器获取失败", err);
        });
    },

    //编辑-----------------4
    // 选择地区后，获取服务器列表
    getAddEventServic4(tableIndex, zoneId) {
      // 切换地区后清空服务器列表
      if (tableIndex == "1") {
        this.addform1.serve = [];
      } else if (tableIndex == "2") {
        this.addform2.serve = [];
      } else if (tableIndex == "3") {
        this.addform3.serve3 = [];
      } else if (tableIndex == "4") {
        this.addform4.serve4 = [];
      }

      let ser = "remoteGetAddLoginSafty";
      let paramsData = "<zoneId>" + zoneId + "</zoneId>";
      eventService(ser, paramsData)
        .then(res => {
          console.log("添加时服务器获取成功", res);
          this.form4.serve = res;
            let obj = this.editform4.legalconfigid; //总共的
            let arr = [];
            if (obj[zoneId]) {
                for (var j = 0; j < obj[zoneId].length; j++) {
                arr.push(obj[zoneId][j].agent_guid);
                }
                this.editform4.serve = arr;
            } else {
                this.editform4.serve = [];
            }
        })
        .catch(err => {
          console.log("添加时服务器获取失败", err);
        });
    },
    deletetable(tableIndex, id) {
      console.log(tableIndex, id);
      //图15-异常登录.png  删除
      // this.delExceptionDelLegal(id);
      this.centerDialogVisible = true;
      this.deteleId = id;
      this.deteleTableUpdate = tableIndex;
    },

    handleSizeChange() {},
    handleCurrentChange() {},
    addEvent() {},
    addEvent1() {
      this.dialogFormVisible1 = true;
      // 清空之前所选值
      this.addform1 = {
        zone1: 0,
        zone2: {
          id: "",
          name: ""
        },
        zone3: "",
        AllZone: "",
        serve: []
      };
      this.getProvinceByCountryId();
      this.getExceptionRegion();
      //sll添加
      let ipconfig = returnCitySN["cip"];
      let ser = "getAddressByIP";
      let paramsData = "<ip>" + ipconfig + "</ip>";
  
      IPcity(ser,paramsData)
        .then(res => {
          console.log("获取IP地址所在城市信息数据成功", res);
          console.log(res.province,5555555555)
          this.addform1.zone2 = res.province;
          this.addform1.zone3 = res.city;
        })
        .catch(err => {
          console.log("获取IP地址所在城市信息数据失败", err);
        });
    },
    addEvent2() {
      this.dialogFormVisible2 = true;
      this.addform2 = {
        IP: "",
        AllZone: "",
        serve: ""
      };
      this.getExceptionRegion();
      console.log(returnCitySN["cip"]+','+returnCitySN["cname"]);
      this.addform2.IP = returnCitySN["cip"];

      //图17-弹出框-添加合法登录IP.png
      // this.addExceptionAddLegalIP();
    },
    addEvent3() {
      this.dateFrm();
      this.dialogFormVisible3 = true;
      this.addform3.AllZone3 = "";
      this.addform3.serve3 = "";
      this.getExceptionRegion();
    },
    addEvent4() {
        this.addform4 =  {
            name4: "",
            AllZone4: "",
            serve4: ""
        };
      this.dialogFormVisible4 = true;
      this.getExceptionRegion();
    },
    writeEvent4() {
      this.writeDialogForm4 = true;
      this.getExceptionRegion();
    },
    dateFrm() {
      let startTime = moment(new Date()).format("HH:mm");
      let endTime = moment(new Date())
        .add(1, "hour")
        .format("HH:mm");
      // this.startTime = startTime;
      // this.endTime = startTime + '01:00';
      this.addform3.value3 = [startTime, endTime];
      // this.form3.value5 = endTime;

      console.log(this.startTime, 88);
    },
    getRegionId(val) {
      this.regionId = val;
      this.getRegionEventId();
    },
    //获取服务器
    getRegionEventId() {
      let ser = "remoteGetAddLoginSafty";
      let paramsData = "<zoneId>" + this.regionId + "</zoneId>";
      eventService(ser, paramsData)
        .then(res => {
          console.log(
            "remoteUpdateIntegrityEvent文件一致性已处理数据成功",
            res
          );
          this.regionEventId = res;
        })
        .catch(err => {
          console.log(
            "remoteUpdateIntegrityEvent文件一致性已处理数据失败",
            err
          );
        });
    },
    defIntegrityEventStauts() {
      let ser = "remoteUpdateIntegrityEvent";
      let paramsData = "<ids>" + "89,87" + "</ids>";
      updateIntegerityEventStatus(ser, paramsData)
        .then(res => {
          console.log(
            "remoteUpdateIntegrityEvent文件一致性已处理数据成功",
            res
          );
        })
        .catch(err => {
          console.log(
            "remoteUpdateIntegrityEvent文件一致性已处理数据失败",
            err
          );
        });
    },
    getIntegrityEventList() {
      let ser = "getIntegrityEventListByHostId";
      let paramsData =
        "<hostId>" +
        "267" +
        "</hostId>" +
        "<page>" +
        "1" +
        "</page>" +
        "<onePageSize>" +
        "1" +
        "</onePageSize>";
      getIntegrityEventList(ser, paramsData)
        .then(res => {
          console.log(
            "getIntegrityEventListByHostId获取文件一致性数据成功",
            res
          );
        })
        .catch(err => {
          console.log(
            "getIntegrityEventListByHostId获取文件一致性数据失败",
            err
          );
        });
    },

    // String type: 添加登陆异常的类型
    // {1:非法IP,2:非法时间登录,3:非法账号登录,4:异地登录}
    // String legalConfigMsg：配置信息
    // Ip:需要正确格式  时间：13:12-14:12 账号没有要求
    // 异地：中国-北京市-0，美国-0-0，中国-黑龙江省-哈尔滨市
    // String  hostList：所要分配的计算机guid列表
    //       格式：Guid1,guid2,guid3
    // 添加登录地区
    addExceptionAddLegalArea() {
      let ser = "addLegalConfig";
      let paramsData =
        "<type>" +
        "4" +
        "</type>" +
        "<legalConfigMsg>" +
        "中国-" +
        this.addform1.zone2.name +
        "-" +
        this.addform1.zone3 +
        "</legalConfigMsg>" +
        "<hostList>" +
        this.addform1.serve +
        "</hostList>";
      exceptionAddLegal(ser, paramsData)
        .then(res => {
          console.log(paramsData);
          console.log("addLegalConfig添加登录地区成功", res);
          this.dialogFormVisible1 = false;
          this.$message({
            message: res
          });
          this.getExceptionGetAreas();
        })
        .catch(err => {
          console.log("addLegalConfig添加登录地区失败", err);
        });
    },

    addExceptionAddLegalUser() {
      let ser = "addLegalConfig";
      let paramsData =
        "<type>" +
        "3" +
        "</type>" +
        "<legalConfigMsg>" +
        this.addform4.name4 +
        "</legalConfigMsg>" +
        "<hostList>" +
        this.addform4.serve4 +
        "</hostList>";
      exceptionAddLegal(ser, paramsData)
        .then(res => {
          console.log("addLegalConfig添加登录账户成功", res);
          this.dialogFormVisible4 = false;
          this.$message({
            message: res
          });
          this.getExceptionGetUser();
        })
        .catch(err => {
          console.log("addLegalConfig添加登录账户失败", err);
        });
    },

    addExceptionAddLegalTime() {
      let ser = "addLegalConfig";
      let time = this.addform3.value3.toString().replace(",", "-");
      let paramsData =
        "<type>" +
        "2" +
        "</type>" +
        "<legalConfigMsg>" +
        time +
        "</legalConfigMsg>" +
        "<hostList>" +
        this.addform3.serve3 +
        "</hostList>";
      exceptionAddLegal(ser, paramsData)
        .then(res => {
          console.log("addLegalConfig添加登录时间成功", res);
          this.dialogFormVisible3 = false;
          this.$message({
            message: res
          });
          this.getExceptionGetTime();
        })
        .catch(err => {
          console.log("addLegalConfig添加登录时间失败", err);
        });
    },

    addExceptionAddLegalIP(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible2 = false;
          let ser = "addLegalConfig";
          let paramsData =
            "<type>" +
            "1" +
            "</type>" +
            "<legalConfigMsg>" +
            this.addform2.IP +
            "</legalConfigMsg>" +
            "<hostList>" +
            this.addform2.serve +
            "</hostList>";
          exceptionAddLegal(ser, paramsData)
            .then(res => {
              console.log(paramsData);
              console.log("addLegalConfig添加非法IP成功", res);
              this.$message({
                message: res
              });
              this.getExceptionGetIP();
            })
            .catch(err => {
              console.log("addLegalConfig添加非法IP失败", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除
    delExceptionDelLegal(deteleTableUpdate, id) {
      let ser = "deleteLegalConfig";
      let paramsData = "<legalconfigid>" + id + "</legalconfigid>";
      exceptionDelLegal(ser, paramsData)
        .then(res => {
          console.log("deleteLegalConfig删除配置成功", res);
          this.centerDialogVisible = false;
          this.$message({
            message: res
          });
          if (deteleTableUpdate == 1) {
            if(this.currentPage1 == this.pageCount1 && this.currentPage1>1 && this.tableData1.agentAreaList.length==1){
              this.currentPage1--
            }
            this.getExceptionGetAreas();
          } else if (deteleTableUpdate == 2) {
            if(this.currentPage2 == this.pageCount2 && this.currentPage2>1 && this.tableData2.agentIPList.length==1){
              this.currentPage2--
            }
            this.getExceptionGetIP();
          } else if (deteleTableUpdate == 3) {
            if(this.currentPage3 == this.pageCount3 && this.currentPage3>1 && this.tableData3.agentTimeList.length==1){
              this.currentPage3--
            }
            this.getExceptionGetTime();
          } else {
            if(this.currentPage4 == this.pageCount4 && this.currentPage4>1 && this.tableData4.agentUserList.length==1){
              this.currentPage4--
            }
            this.getExceptionGetUser();
          }
        })
        .catch(err => {
          console.log("deleteLegalConfig删除配置失败", err);
        });
    },
    setLegalConfigServer(num, id) {
      let ser = "setLegalConfig";
      let hostList = "";
      if (num == 1) {
        hostList = this.editform1.serve;
        let zoneId = this.addform1.AllZone;
        let obj = this.editform1.legalconfigids; //总共的
        let arr1 = [];
        for (var i in obj) {
          if (i == zoneId) {
          } else if (i != zoneId) {
            for (var j = 0; j < obj[i].length; j++) {
              arr1.push(obj[i][j].agent_guid);
            }
            console.log("arr1", arr1);
            hostList = hostList.concat(arr1);
          }
        }
        console.log("hostList1", hostList);
      } else if (num == 2) {
        hostList = this.editform2.serve;
        console.log("hostList2", hostList);

        let zoneId = this.addform2.AllZone;
        let obj = this.editform2.legalconfigid; //总共的
        console.log("hostList2", hostList, zoneId, obj);

        let arr1 = [];
        for (var i in obj) {
          if (i == zoneId) {
          } else if (i != zoneId) {
            for (var j = 0; j < obj[i].length; j++) {
              arr1.push(obj[i][j].agent_guid);
            }
            console.log("arr1", arr1);
            hostList = hostList.concat(arr1);
          }
        }
        console.log("hostList2", hostList);
      } else if (num == 3) {
        hostList = this.editform3.serve;
        let zoneId = this.addform3.AllZone3;
        let obj = this.editform3.legalconfigid; //总共的
        let arr1 = [];
        for (var i in obj) {
          if (i == zoneId) {
          } else if (i != zoneId) {
            for (var j = 0; j < obj[i].length; j++) {
              arr1.push(obj[i][j].agent_guid);
            }
            console.log("arr1", arr1);
            hostList = hostList.concat(arr1);
          }
        }
        console.log("hostList3", hostList);
      } else {
        hostList = this.editform4.serve;
        let zoneId = this.addform4.AllZone4;
        let obj = this.editform4.legalconfigid; //总共的
        let arr1 = [];
        for (var i in obj) {
          if (i == zoneId) {
          } else if (i != zoneId) {
            for (var j = 0; j < obj[i].length; j++) {
              arr1.push(obj[i][j].agent_guid);
            }
            console.log("arr1", arr1);
            hostList = hostList.concat(arr1);
          }
        }
        console.log("hostList4", hostList);
      }
      console.log("hostList", hostList);

      // 针对编辑表1

      let paramsData =
        "<legalConfigId>" +
        id +
        "</legalConfigId>" +
        "<hostList>" +
        hostList +
        "</hostList>";
      legalConfigServer(ser, paramsData)
        .then(res => {
          console.log("setLegalConfig修改配置成功", res);
          this.$message({
            message: res
          });
          if (num == 1) {
            this.dialogFormVisible11 = false;
            this.getExceptionGetAreas();
          } else if (num == 2) {
            this.dialogFormVisible22 = false;
            this.getExceptionGetIP();
          } else if (num == 3) {
            this.dialogFormVisible33 = false;
            this.getExceptionGetTime();
          } else {
            this.dialogFormVisible44 = false;
            this.getExceptionGetUser();
          }
        })
        .catch(err => {
          console.log("setLegalConfig修改配置失败", err);
        });
    },

    setLegalConfigServer11(num, id) {
      let ser = "setLegalConfig";
      let hostList = "";
      if (num == 1) {
        hostList = this.editform1.serve;
      } else if (num == 2) {
        hostList = this.editform2.serve;
      } else if (num == 3) {
        hostList = this.editform3.serve;
      } else {
        hostList = this.editform4.serve;
      }


      let paramsData =
        "<legalConfigId>" +
        id +
        "</legalConfigId>" +
        "<hostList>" +
        hostList +
        "</hostList>";
      legalConfigServer(ser, paramsData)
        .then(res => {
          console.log("setLegalConfig修改配置成功", res);
          this.$message({
            message: res
          });
          if (num == 1) {
            this.dialogFormVisible11 = false;
            this.getExceptionGetAreas();
          } else if (num == 2) {
            this.dialogFormVisible22 = false;
            this.getExceptionGetIP();
          } else if (num == 3) {
            this.dialogFormVisible33 = false;
            this.getExceptionGetTime();
          } else {
            this.dialogFormVisible44 = false;
            this.getExceptionGetUser();
          }
        })
        .catch(err => {
          console.log("setLegalConfig修改配置失败", err);
        });
    },
    //图18-弹出框-添加常用登录地址.png   省份
    getProvinceByCountryId() {
      let ser = "getProvince";
      let paramsData = "<countryid>0</countryid>";
      console.log(ser, paramsData);
      getProvince(ser, paramsData)
        .then(res => {
          console.log("获取省份信息数据成功", res);
          this.form1.zone2 = res;
        })
        .catch(err => {
          console.log("获取省份信息数据失败", err);
        });
    },
    //图18-弹出框-添加常用登录地址.png   地区
    getCityByProvinceId(city) {
      console.log(12345, city);
      let ser = "getCity";
      let paramsData = "<provinceid>" + city + "</provinceid>";
      getCity(ser, paramsData)
        .then(res => {
          console.log("获取城市信息数据成功", res);
          if(res.length>0){
            this.form1.zone3 = res;
            this.addform1.zone3 = this.form1.zone3[0].name;
          }else{
            this.form1.zone3 = [{ "name": "0", "pid": "1", "id": "0" }]  
            this.addform1.zone3 = '0'
          }
        })
        .catch(err => {
          console.log("获取城市信息数据失败", err);
        });
    },
    // 获取地域
    getExceptionRegion() {
      let ser = "remoteAllZone";
      serverRegion(ser, "")
        .then(res => {
          console.log("获取地域成功", res);
          this.form1.AllZone = res.zonelist;
          this.form2.AllZone = res.zonelist;
          this.form3.AllZone3 = res.zonelist;
          this.form4.AllZone4 = res.zonelist;
        })
        .catch(err => {
          console.log("获取地域失败", err);
        });
    },
    // 获取常用登录地址
    getExceptionGetAreas() {
      this.loading1 = true;
      let ser = "getLegalAreaList";
      let paramsData =
        "<page>" +
        this.currentPage1 +
        "</page>" +
        "<onePageSize>" +
        this.pageSize1 +
        "</onePageSize>";
      exceptionGetAreas(ser, paramsData)
        .then(res => {
          console.log("getLegalAreaList获取异常登录地数据成功", res);
          this.tableData1 = res;
          this.totalNum1 = res.totalElements;
          this.pageCount1 = res.totalPage
          this.loading1 = false;
        })
        .catch(err => {
          console.log("getLegalAreaList获取异常登录地数据失败", err);
        });
    },
    // 获取合法登录IP
    getExceptionGetIP() {
      this.loading2 = true;
      let ser = "getLegalIPList";
      let paramsData =
        "<page>" +
        this.currentPage2 +
        "</page>" +
        "<onePageSize>" +
        this.pageSize2 +
        "</onePageSize>";
      exceptionGetIP(ser, paramsData)
        .then(res => {
          console.log("getLegalIPList获取登录IP数据成功", res);
          this.tableData2 = res;
          this.totalNum2 = res.totalElements;
          this.pageCount2= res.totalPage
          this.loading2 = false;
        })
        .catch(err => {
          console.log("getLegalIPList获取登录IP数据失败", err);
        });
    },
    // 获取合法登录时间
    getExceptionGetTime() {
      this.loading3 = true;
      let ser = "getLegalTimeList";
      let paramsData =
        "<page>" +
        this.currentPage3 +
        "</page>" +
        "<onePageSize>" +
        this.pageSize3 +
        "</onePageSize>";
      exceptionGetTime(ser, paramsData)
        .then(res => {
          console.log("getExceptionGetTime获取登录时间数据成功", res);
          this.tableData3 = res;
          this.totalNum3 = res.totalElements;
          this.pageCount3 = res.totalPage
          this.loading3 = false;
        })
        .catch(err => {
          console.log("getExceptionGetTime获取登录时间数据失败", err);
        });
    },
    // 获取合法账号
    getExceptionGetUser() {
      this.loading4 = true;
      let ser = "getLegalUserList";
      let paramsData =
        "<page>" +
        this.currentPage4 +
        "</page>" +
        "<onePageSize>" +
        this.pageSize4 +
        "</onePageSize>";
      exceptionGetUser(ser, paramsData)
        .then(res => {
          console.log("getExceptionGetTime获取登录账户数据成功", res);
          this.tableData4 = res;
          this.totalNum4 = res.totalElements;
          this.pageCount4 = res.totalPage
          this.loading4 = false;
        })
        .catch(err => {
          console.log("getExceptionGetTime获取登录账户数据失败", err);
        });
    },
    // 1
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize1 = val;
      this.currentPage1 = 1;
      this.getExceptionGetAreas();
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.getExceptionGetAreas();
    },
    // 2
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize2 = val;
      this.currentPage2 = 1;
      this.getExceptionGetIP();
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      this.getExceptionGetIP();
    },
    // 3
    handleSizeChange3(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize3 = val;
      this.currentPage3 = 1;
      this.getExceptionGetTime();
    },
    handleCurrentChange3(val) {
      console.log(`当前页: ${val}`);
      this.currentPage3 = val;
      this.getExceptionGetTime();
    },

    // 4
    handleSizeChange4(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize4 = val;
      this.currentPage4 = 1;
      this.getExceptionGetUser();
    },
    handleCurrentChange4(val) {
      console.log(`当前页: ${val}`);
      this.currentPage4 = val;
      this.getExceptionGetUser();
    },
  }
};
</script>
<style lang="scss" scoped="scoped">
.LandingSecuritySetup {
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
  .loginTitle {
    float: left;
    font-size: 14px;
    color: #333;
    padding-left: 2%;
    padding-top: 20px;
  }
  .left {
    padding-left: 2%;
    text-align: left;
    .left_name {
      font-size: 12px;
      color: #333;
      padding: 25px 0px;
      display: inline-block;
    }
    .left_radio {
      display: inline-block;
      margin-left: 40px;
      min-width: 50px;
    }
  }
  .right {
    padding-left: 5%;
    text-align: right;
    line-height: 62px;
    .createButton {
      width: 60px;
      height: 35px;
      background: #56d6c4;
      border-color: #ffffff;
      color: #ffffff;
      font-size: 12px;
      margin-right: 20px;
      &:hover {
        background: #56d6c4;
      }
    }
  }
  .block {
    float: right;
    padding: 20px 0;
  }
  .el-table {
    margin: 0 auto;
    /*border:1px solid #e8edf5;*/
  }
  .el-checkbox {
    margin-left: 5px;
  }
  .el-pagination {
    margin-right: 10px;
  }
  .row1,
  .row2,
  .row3,
  .row4 {
    border-bottom: 1px solid #f2f0f6;
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
</style>
<style lang="scss">
.LandingSecuritySetup {
  .el-select {
    margin-left: 10px;
  }
  .el-table--border td,
  .el-table--border th {
    border-right: none;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #e8edf5;
  }
  .el-switch__label * {
    line-height: 1;
    font-size: 12px;
    display: inline-block;
  }
  .el-pagination.is-background .el-pager li.active {
    background-color: #f9cd76;
    color: #fff;
  }
  .el-dialog__header {
    background-color: #323c4e;
    height: 40px;
    line-height: 40px;
    /*color:#e4e5e7;*/
    padding: 0;
    padding-left: 20px;
  }
  .el-dialog__title {
    color: #e4e5e7;
    font-size: 12px;
  }
  .el-dialog__body {
    padding: 25px 0 25px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
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
  .el-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 150px;
    overflow: auto;
    margin: 0;
  }
  .el-input__inner {
    height: 30px;
    // margin-left: 10px;
  }
  .el-select {
    margin-top: 15px;
  }
  .el-input__prefix {
    display: none;
  }
}
.content-bottom {
  float: right;
  margin: 20px;
  .el-select {
    margin-top: 0px;
  }
  .el-input__inner {
    margin-left: 0;
    // width:220px;
  }
  /*弹出框样式*/
  .el-message-box {
    border: none;
    padding-bottom: 0px;
    width: auto;
    min-width: 400px;
    .el-message-box__header {
      background-color: #fefefe;
      .el-message-box__title {
        color: #ffffff;
        font-size: 14px;
      }
      .el-message-box__headerbtn {
        .el-icon-close {
          color: #ffffff;
        }
      }
    }
  }
  .el-message-box .el-message-box__header {
  }
  .el-message-box
    .el-message-box__header
    .el-message-box__headerbtn
    .el-icon-close {
    color: #909399;
  }
  .el-message-box .el-message-box__content {
    padding: 40px 15px;
  }
  .el-message-box--center .el-message-box__status {
    position: relative;
    top: 45px;
    padding-right: 5px;
    text-align: center;
    -webkit-transform: translateY(-1px);
    -ms-transform: translateY(-1px);
    transform: translateY(-1px);
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__error {
    margin-left: 3px;
  }
}
.red-star1 .el-form-item__label::before {
  content: "*";
  color: #ff4949;
  margin-right: 6px;
}
.el-date-editor .el-range-input {
  height: 18px !important;
}
.el-range-editor.el-input__inner {
    padding-top: 0px;
    width: 220px;
}
.f_btn {
  border-radius : 0px;
}
.f_btn_r{
  color: #fff;
}
.f_btn_r:hover{
  color: #fff;
}
</style>