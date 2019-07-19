<template>
	<!-- <header class="vip-header">
		<div class="header-left">
			<div class="logo" @click="logoClick">
					<img width="100%" src="../../../assets/logo.png"/>
			</div>
			<div class="console-center hoverClass" @click='quit'>
				<router-link :to='console.path'>{{console.title}}</router-link>
			</div>
		</div>
		<div class="hedaer-right">
			<el-dropdown v-for="item in headerList" :class=" 'header-' + item.id" :key="item.id" trigger="click" v-if="!item.hide" class="hoverClass">
		        <span class="el-dropdown-link">1234{{item.name}}</span>
		        <el-dropdown-menu slot="dropdown">
		          <el-dropdown-item v-for="(subItem,index) in item.subList" :key="index">
		          	<router-link tag='div' :to='subItem.path'>{{subItem.title}}</router-link>
		          </el-dropdown-item>
		        </el-dropdown-menu>
	      	</el-dropdown>
				<el-dropdown @command="userFun"  class="header-user hoverClass">
				  <span class="el-dropdown-link user-name" style="outline-width: 0px; outline-style: none;">
					<img height="20" :src="user.img"/>
				    {{user.name}}
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item v-for="(userItem,index) in userList" :key="index" :command="userItem.fun">{{userItem.title}}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
		</div>
	</header> -->
 <div id="service-menus" class="container-fluid ng-scope" style="left:0px;">
    <div id="console-top-menu" class="console-top-menu common-page-header common-font-size-big1 ng-scope">
      <div class="menu console-content-padding common-content-screen custom-header" id="menu">
        <div class="frame-menu-left common-link-inherit-color">
          <a class="console-menu-logo pull-left user-application-a-no-outline ng-scope" target="_blank" href="http://www.ctyun.cn/"></a>
          <div class="pull-left console-menu-home">
            <a class="console-topbar-btn ctc-home-page-show">
              <span style="cursor:pointer;" class="console-menu-home-link-other">
                <span class="pull-left ng-binding">控制中心</span>
              </span>
            </a>
          </div>
          <!-- 服务列表 -->
          <div class="dropdown pull-left menu-dropdown framework-service-list margin-left-20">

            <a href="javascript:;" class="dropdown-toggle console-topbar-btn console-menu-service-link ng-scope" style="display: inline-block;">
              <span class="pull-left padding-left-5 ng-binding">服务列表</span>
              <span class="hwsicon-frame-image-caret menu-hwsicon-frame-main-caret console-topbar-fixed-width-div"></span>
            </a>
            <!-- 下拉列表 -->
            <div class="dropdown-menu common-dropdown-menu console-menu-nav-list-wrapper" style="left: 20px;">
              <div class="ng-scope">
                <div class="console-menu-nav-list common-dropdown-menu">
                  <div class="row service-list">
                    <div class="dropdown-submenu ng-scope service-detail-zh-cn">
                      <div class="console-menu-nav-item">
                        <legend class="console-topbar-nav-item-title common-content-title-service-catalog common-font-size-big2">
                          <span class="ng-binding">计算</span></legend>
                          <ul class="margin-top-1">
                            <li class="clearfix ng-scope" style="position:relative">
                              <div class="pull-left dropdown-list-item-width">
                                <a target="_self" class="dropdown-menu-list-text" href="">
                                  <span class="margin-left-1 ng-binding" title="弹性云主机">弹性云主机</span>
                                </a>
                              </div>
                              <div class="pull-right padding-left-10 collection">
                                <a href="" class="service-list-item-icon">
                                  <div class="ng-scope ng-isolate-scope">
                                    <div class="placeholder-div"></div>
                                    <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                  </div><!-- end ngIf: !endpoint.isFavorite -->
                                </a>
                              </div>
                              <div class="ti-tooltip ti-tooltip-bottom-right frame-dropdown-tinyTip" style="top: 40px; right: 5px; display: none;height:42px;line-height:42px;padding:0px 9px"><div class="ti-tooltip-content" style="max-height: 165px; overflow-y: auto; padding: 1px;">收藏</div><div class="ti-tooltip-bottom-right-sqr"></div></div>
                            </li>
                            <li class="clearfix ng-scope" style="position:relative">
                              <div class="pull-left dropdown-list-item-width">
                                <a target="_self" class="dropdown-menu-list-text" href="">
                                  <span class="margin-left-1 ng-binding" title="快照">快照</span>
                                </a>
                              </div>
                              <div class="pull-right padding-left-10 collection">
                                <a href="" class="service-list-item-icon">
                                  <div class="ng-scope ng-isolate-scope">
                                    <div class="placeholder-div ng-scope ng-isolate-scope"></div>
                                    <span class="hwsicon-frame-image-favorite-true menu-hwsicon-frame-service-favorite common-font-size-big2"></span>
                                  </div><!-- end ngIf: !endpoint.isFavorite -->
                                </a>
                              </div>
                              <div class="ti-tooltip ti-tooltip-bottom-right frame-dropdown-tinyTip" style="top: 40px; right: 5px; display: none;height:42px;line-height:42px;padding:0px 9px"><div class="ti-tooltip-content" style="max-height: 165px; overflow-y: auto; padding: 1px;">取消收藏</div><div class="ti-tooltip-bottom-right-sqr"></div></div>
                            </li>

                          </ul>
                        </div>
                      </div>
                      <div class="dropdown-submenu ng-scope service-detail-zh-cn">
                        <div class="console-menu-nav-item">
                          <legend class="console-topbar-nav-item-title common-content-title-service-catalog common-font-size-big2">
                            <span class="ng-binding">存储</span></legend>
                            <ul class="margin-top-1">
                              <li class="clearfix ng-scope">
                                <div class="pull-left dropdown-list-item-width">
                                  <a target="_self" class="dropdown-menu-list-text" href="">
                                    <span class="margin-left-1 ng-binding" title="云硬盘">云硬盘</span>
                                  </a>
                                </div>
                                <div class="pull-right padding-left-10 collection">
                                  <a href="" class="service-list-item-icon">
                                    <div class="ng-scope ng-isolate-scope">
                                      <div class="placeholder-div"></div>
                                      <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                    </div><!-- end ngIf: !endpoint.isFavorite -->
                                  </a>
                                </div>
                              </li>
                              <li class="clearfix ng-scope">
                                <div class="pull-left dropdown-list-item-width">
                                  <a target="_self" class="dropdown-menu-list-text" href="">
                                    <span class="margin-left-1 ng-binding" title="对象存储">对象存储</span>
                                  </a>
                                </div>
                                <div class="pull-right padding-left-10 collection">
                                  <a href="" class="service-list-item-icon">
                                    <div class="ng-scope ng-isolate-scope">
                                      <div class="placeholder-div ng-scope ng-isolate-scope"></div>
                                      <span class="hwsicon-frame-image-favorite-true menu-hwsicon-frame-service-favorite common-font-size-big2"></span>
                                    </div><!-- end ngIf: !endpoint.isFavorite -->
                                  </a>
                                </div>
                              </li>

                            </ul>
                          </div>
                        </div>
                        <div class="dropdown-submenu ng-scope service-detail-zh-cn">
                          <div class="console-menu-nav-item">
                            <legend class="console-topbar-nav-item-title common-content-title-service-catalog common-font-size-big2">
                              <span class="ng-binding">网络</span></legend>
                              <ul class="margin-top-1">
                                <li class="clearfix ng-scope">
                                  <div class="pull-left dropdown-list-item-width">
                                    <a target="_self" class="dropdown-menu-list-text" href="">
                                      <span class="margin-left-1 ng-binding" title="弹性云主机">弹性云主机</span>
                                    </a>
                                  </div>
                                  <div class="pull-right padding-left-10 collection">
                                    <a href="" class="service-list-item-icon">
                                      <div class="ng-scope ng-isolate-scope">
                                        <div class="placeholder-div"></div>
                                        <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                      </div><!-- end ngIf: !endpoint.isFavorite -->
                                    </a>
                                  </div>
                                </li>
                                <li class="clearfix ng-scope">
                                  <div class="pull-left dropdown-list-item-width">
                                    <a target="_self" class="dropdown-menu-list-text" href="">
                                      <span class="margin-left-1 ng-binding" title="弹性云主机">弹性云主机</span>
                                    </a>
                                  </div>
                                  <div class="pull-right padding-left-10 collection">
                                    <a href="" class="service-list-item-icon">
                                      <div class="ng-scope ng-isolate-scope">
                                        <div class="placeholder-div ng-scope ng-isolate-scope"></div>
                                        <span class="hwsicon-frame-image-favorite-true menu-hwsicon-frame-service-favorite common-font-size-big2"></span>
                                      </div><!-- end ngIf: !endpoint.isFavorite -->
                                    </a>
                                  </div>
                                </li>
                                <li class="clearfix ng-scope">
                                  <div class="pull-left dropdown-list-item-width">
                                    <a target="_self" class="dropdown-menu-list-text" href="">
                                      <span class="margin-left-1 ng-binding" title="弹性云主机">弹性云主机</span>
                                    </a>
                                  </div>
                                  <div class="pull-right padding-left-10 collection">
                                    <a href="" class="service-list-item-icon">
                                      <div class="ng-scope ng-isolate-scope">
                                        <div class="placeholder-div"></div>
                                        <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                      </div><!-- end ngIf: !endpoint.isFavorite -->
                                    </a>
                                  </div>
                                </li>
                              </ul>
                            </div>
                        </div>
                          <div class="dropdown-submenu ng-scope service-detail-zh-cn">
                            <div class="console-menu-nav-item">
                              <legend class="console-topbar-nav-item-title common-content-title-service-catalog common-font-size-big2">
                                <span class="ng-binding">应用服务</span></legend>
                                <ul class="margin-top-1">
                                  <li class="clearfix ng-scope">
                                    <div class="pull-left dropdown-list-item-width">
                                      <a target="_self" class="dropdown-menu-list-text" href="">
                                        <span class="margin-left-1 ng-binding" title="云备份">云备份</span>
                                      </a>
                                    </div>
                                    <div class="pull-right padding-left-10 collection">
                                      <a href="" class="service-list-item-icon">
                                        <div class="ng-scope ng-isolate-scope">
                                          <div class="placeholder-div"></div>
                                          <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                        </div><!-- end ngIf: !endpoint.isFavorite -->
                                      </a>
                                    </div>
                                  </li>
                                  <li class="clearfix ng-scope">
                                    <div class="pull-left dropdown-list-item-width">
                                      <a target="_self" class="dropdown-menu-list-text" href="">
                                        <span class="margin-left-1 ng-binding" title="技术服务">技术服务</span>
                                      </a>
                                    </div>
                                    <div class="pull-right padding-left-10 collection">
                                      <a href="" class="service-list-item-icon">
                                        <div class="ng-scope ng-isolate-scope">
                                          <div class="placeholder-div ng-scope ng-isolate-scope"></div>
                                          <span class="hwsicon-frame-image-favorite-true menu-hwsicon-frame-service-favorite common-font-size-big2"></span>
                                        </div><!-- end ngIf: !endpoint.isFavorite -->
                                      </a>
                                    </div>
                                  </li>
                                  <li class="clearfix ng-scope">
                                    <div class="pull-left dropdown-list-item-width">
                                      <a target="_self" class="dropdown-menu-list-text" href="">
                                        <span class="margin-left-1 ng-binding" title="360安全防护">360安全防护</span>
                                      </a>
                                    </div>
                                    <div class="pull-right padding-left-10 collection">
                                      <a href="" class="service-list-item-icon">
                                        <div class="ng-scope ng-isolate-scope">
                                          <div class="placeholder-div"></div>
                                          <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                        </div><!-- end ngIf: !endpoint.isFavorite -->
                                      </a>
                                    </div>
                                  </li>
                                  <li class="clearfix ng-scope">
                                    <div class="pull-left dropdown-list-item-width">
                                      <a target="_self" class="dropdown-menu-list-text" href="">
                                        <span class="margin-left-1 ng-binding" title="域名服务">域名服务</span>
                                      </a>
                                    </div>
                                    <div class="pull-right padding-left-10 collection">
                                      <a href="" class="service-list-item-icon">
                                        <div class="ng-scope ng-isolate-scope">
                                          <div class="placeholder-div"></div>
                                          <span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-false"></span>
                                        </div><!-- end ngIf: !endpoint.isFavorite -->
                                      </a>
                                    </div>
                                  </li>
                                </ul>
                            </div>
                          </div>
                        </div>
                          <div class="service-list-item-tr">
                            <div class="div-tr"></div>
                          </div>
                          <div class="row favorite-menu-nav-tips">
                            <div class="col-md-12 console-menu-nav-tips common-font-size-common padding-left-30 ng-scope">
                              <span class="ng-binding">单击<span class="hwsicon-frame-image-favorite-new menu-hwsicon-frame-service-favorite-tip"></span>可收藏服务，您还可以收藏7个</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 收藏 -->
                  <div class="dropdown pull-left menu-dropdown frame-favorite-service-list favorite-margin-left">
                    <a href="javascript:;" class="dropdown-toggle console-topbar-btn favorite-service-list-menu ng-scope"  style="display: inline-block;">
                      <span class="pull-left padding-left-5 ng-binding">收藏</span>  <span class="hwsicon-frame-image-caret menu-hwsicon-frame-main-caret console-topbar-fixed-width-div"></span>
                    </a>
                    <div class="dropdown-menu common-dropdown-menu frame-favorite-service-list-options common-favorite-menu ng-scope" style="display:none;">  
                      <a class="pull-left console-menu-favorite-item favorite-service-list common-font-size-common common-font-size-big1 ng-scope" target="_self" href="https://console2.ctyun.cn/ecm/#/ecs/manager/vmList" title="弹性云主机">
                        <span class="console-menu-favorite-item-text ng-binding" id="frameFavoriteEndpointIdecm0">弹性云主机</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="frame-menu-right common-page-header custom-header">
                  <div class="default-style common-link-inherit-color">
                    <!-- 帮助 -->
                    <a href="javascript:;" class="pull-right console-topbar-btn console-topbar-btn-help default-style common-help margin-left-7 ng-scope ng-isolate-scope" target="_blank">
                      <span class="hwsicon-frame-image-help-new"></span>
                    </a>
                    <!-- 配额 -->
                    <div class="dropdown pull-right  nav-menu-dropdown cmc-style">
                      <a href="https://console2.ctyun.cn/?locale=zh-cn#/quota" class="console-topbar-btn margin-left-2 ng-scope" target="_blank" title="我的配额">
                        <span class="hwsicon-frame-image-quota"></span>
                      </a>
                    </div>
                    <!-- 消息 -->
                    <div class="dropdown menu-dropdown console-menu-notice message-menu-dropdown pull-right cmc-style">
                      <a href="" class="console-topbar-btn dropdown-toggle console-topbar-btn-notice console-menu-message" title="消息">
                        <span class="hwsicon-frame-image-message hwsicon-frame-email"></span>
                        <div class="frame-message-round"></div>
                      </a>
                    </div>
                    <!-- 个人中心 -->
                    <div class="pull-right cmc-style">
                      <div class="dropdown pull-right menu-dropdown margin-right-14 margin-right-0 ng-scope">
                        <a href="javascript:;" class="console-topbar-btn dropdown-toggle console-topbar-username-text no-animate ng-scope" :title="user.name" style="display: inline-block;">
                          <!-- <img class="menu-hwsicon-frame-user-head" src="https://console2.ctyun.cn/static/framework/4.3.8/theme/default/images/user-head.png?ttf=1474723040"> -->
                          <img class="menu-hwsicon-frame-user-head" :src="user.img"/>
                            
                          <span class="console-topbar-fixed-width-username ng-binding ng-scope" >{{user.name}}</span>
                          <!-- ctyunbbs1@123.com -->
                          <span class="hwsicon-frame-image-caret menu-hwsicon-frame-user-caret console-topbar-fixed-width-div"></span>
                        </a>
                        <ul class="dropdown-menu user-dropdown-menu common-dropdown-menu common-font-size-common">
                          <li class="dropdown-menu-li-height frame-user-center ng-scope">
                            <a target="_self" href="http://www.ctyun.cn/user/account">
                              <span class="user-center-dropdown-text ng-binding" >用户中心</span>
                            </a>
                          </li>
                          <li class="dropdown-menu-li-height frame-user-center ng-scope">
                            <a target="_self" href="http://www.ctyun.cn/order/order">
                              <span class="user-center-dropdown-text ng-binding" >我的订单</span>
                            </a>
                          </li>
                          <li class="dropdown-menu-li-height frame-user-center ng-scope">
                            <a target="_self" href="http://www.ctyun.cn/user/services_request">
                              <span class="user-center-dropdown-text ng-binding" >提交工单</span>
                            </a>
                          </li>
                          <li class="dropdown-menu-li-height frame-user-center ng-scope">
                            <a target="_self" href="http://www.ctyun.cn/beian/mybeian">
                              <span class="user-center-dropdown-text ng-binding" >备案中心</span>
                            </a>
                          </li>
                          <li class="dropdown-menu-li-height frame-user-center ng-scope">
                            <a target="_self" href="javascript:;">
                              <span class="user-center-dropdown-text ng-binding" >退出</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- 选择城市 -->
                    <div class="pull-right common-link-inherit-color cmc-style ng-scope" style="margin-right: 20px">
                      <div class="dropdown menu-dropdown region-menu-dropdown console-menu-region ng-scope">
                        <a href="javascript:;" class="dropdown-toggle console-topbar-btn console-topbar-region dis-inline" style="display: none;">
                          <span class="hwsicon-frame-image-position hwsicon-frame-position" style="color: rgb(255, 209, 128);"></span>
                          <span class="console-topbar-fixed-width-region ng-binding" title="">上海</span>
                          <span class="hwsicon-frame-image-caret menu-hwsicon-frame-region-caret console-topbar-fixed-width-div"></span>
                        </a>
                        <a href="javascript:;" class="dropdown-toggle console-topbar-btn-click console-topbar-region drodown-radius-click-bg" style="display: none;">
                          <span class="hwsicon-frame-image-position hwsicon-frame-position" style="color: rgb(255, 209, 128);"></span>
                          <span class="console-topbar-fixed-width-region ng-binding">上海</span>
                          <span class="hwsicon-frame-image-caret-up menu-hwsicon-frame-region-caret console-topbar-fixed-width-div"></span>
                        </a>
                        <ul role="menu" class="dropdown-menu dropdown-menu-region dropdown-menu-region-new common-dropdown-menu region-tiled-menu clearfix">

                          <li class="phonetic-row clearfix ng-scope" style="">
                            <ul>
                              <li class="region-tiled-alphabet pull-left ng-binding">A-G</li>
                              <li class="pull-left region-tiled-ascription ng-scope ng-isolate-scope current">
                                <a href="javascript:void(0);" class="sub-region-name-link">
                                  <span class="region-name ng-binding">贵州</span>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="phonetic-row clearfix ng-scope" style="">
                            <ul>
                              <li class="region-tiled-alphabet pull-left ng-binding">H-K</li>
                              <li class="pull-left region-tiled-ascription ng-scope ng-isolate-scope current">
                                <a href="javascript:void(0);" class="sub-region-name-link">
                                  <span class="region-name ng-binding">杭州</span>
                                </a>
                              </li>
                              <!-- ngRepeat: ascription in phonetic.ascriptionList -->
                            </ul>

                          </li>
                          <li class="phonetic-row clearfix ng-scope">
                            <ul>
                              <li class="region-tiled-alphabet pull-left ng-binding">L-S</li>
                              <li class="pull-left region-tiled-ascription ng-scope ng-isolate-scope current">
                                <a href="javascript:void(0);" class="sub-region-name-link">
                                  <span class="region-name ng-binding"></span>
                                </a>
                              </li>
                              <!-- ngRepeat: ascription in phonetic.ascriptionList -->
                            </ul>

                          </li>
                          <li class="phonetic-row clearfix ng-scope">
                            <ul>
                              <li class="region-tiled-alphabet pull-left ng-binding">T-Z</li>
                              <li class="pull-left region-tiled-ascription ng-scope ng-isolate-scope current">
                                <a href="javascript:void(0);" class="sub-region-name-link">
                                  <span class="region-name ng-binding"></span>
                                </a>
                              </li>
                              <!-- ngRepeat: ascription in phonetic.ascriptionList -->
                            </ul>
                          </li>
                          <li class="region-tiled-submenu" style="min-height: 52px;">
                            <div class="region-tiled-bread" >
                              <span class="current-ascription ng-binding" ng-bind="selectAscription.displayName" id="parentName"></span>
                              <a class="submenu-back" href="#"><span class="icon-cloud-action-goback"></span><span class="submenu-back-text ng-binding" ng-bind="i18n.console_term_goBack_button">返回</span></a>
                            </div>
                            <div class="clearfix">
                              <ul class="ng-scope" style="" id="zone">

                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  </div>
</template>

<script>
import i18n from "@/lang";
import { getToken } from "@/api/safety";
import userImg from "@/assets/user.png";
import headerList from "@/baseConfig/headerList";
import SvgIcon from "../../../components/SvgIcon/index";
import navList from "@/baseConfig/navList";
import ConsoleRegionList from "@/components/ConsoleRegionList";
import {getsafetyUsername,getsafetyUserid} from '@/utils/auth'
import {
  getRegionId,
  setRegionId,
  SetZoneId,
  SetVnc,
  SetRegionType,
  getRegionType
} from "@/utils/auth";
export default {
  components: { SvgIcon, ConsoleRegionList },
  data() {
    let i18nCommon = i18n.common;
    return {
      console: {
        title: i18nCommon.console,
        path: "/console"
      },
      userList: [
        {
          // title: i18nCommon.userCenter,
          title: '用户中心',
          path: "",
          fun: () => {
            // this.$router.push("/user/userInfo");
            window.location.href = 'https://vip.ctyun.cn/console/index/#/user/userInfo'
          }
        },
        {
          // title: i18nCommon.exitLogon,
          title: '退出登录',          
          path: "",
          fun: () => {
            return this.fadeOut();
          }
        }
      ],
      headerList: headerList,
      user: {
        name: "admin",
        img: userImg
      }
    };
  },
  mounted: function() {
    this.getUser()
    // this.user.name = this.$store.state.user.user.customer_name || this.user.name;
  },
  methods: {
    getUser(){
      let name = getsafetyUsername(),
       id = getsafetyUserid();
       console.log('user',name,id)
      this.user.name = name;
    },
    toRouter(path) {
      this.$router.push(path);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    userFun(fun) {
      fun();
    },

    quit(){
      
    },
    fadeOut() {
       getToken('logout','').then(res => {
         console.log(res)
        window.location.href = res;  
      }).catch(err => {
        console.log("获取错误");
      })

      // this.$store.dispatch("FedLogOut").then(res => {
      //   console.log(res);
      //   //location.reload()
      //   location.href = "/logout";
      // });
    },
    logoClick() {
      this.$router.push("/console");
    },
    filterType(item) {
      //        let regionType;
      //        if(getRegionType()!=='undefined'){
      //          regionType=getRegionType();
      //        }else{
      //          let region=this.$store.state.user.regionList[0];
      //          regionType = '1' == region.type ? 'cs' : '2' == region.type && 'os';
      //        }
      let regionType = this.$store.state.user.regionType;
      regionType = regionType == "1" ? "cs" : "os";
      let _ = this._;
      return _.map(item, (item2, key2) => {
        item2.type &&
          (item2.type == regionType
            ? (item2.hide = false)
            : (item2.hide = true));
      });
    }
  },
  computed: {
    navList() {
      let _ = this._;
      _.map(_.map(navList, "sub"), this.filterType);
      return navList;
    }
  },
  beforeCreate() {
    this.stack = this.$store.state.user.stack;
  }
};

  $(function(){
  //header的点击效果
  $(".frame-menu-left>.menu-dropdown").click(function(e){
    $(".dropdown-menu").not($(".dropdown-menu").eq($(this).index()-2)).hide().siblings().removeClass('console-topbar-btn-click')
    $(".dropdown-menu").eq($(this).index()-2).toggle().siblings().toggleClass('console-topbar-btn-click')
    //$(this).children('a').toggleClass('console-topbar-btn')
    $(document).click(function(e){
      $(".dropdown-menu").hide()
      $(".frame-menu-left>.menu-dropdown").children('a').addClass('console-topbar-btn').removeClass('console-topbar-btn-click')
    })
     e.stopPropagation();
  })
  $(".frame-menu-right .menu-dropdown").click(function(e){
    $(".frame-menu-right .menu-dropdown>ul").not($(this).children('ul')).hide()

    $(this).children('ul').toggle()
    $(document).click(function(){
      $(".frame-menu-right .menu-dropdown>ul").hide()
    })
     e.stopPropagation();
  })

  // 资源池平铺
  function docuZy(){
    $(".console-topbar-btn").addClass('dis-inline')
    $(".console-topbar-btn-click").removeClass('dis-inline')
  }
  $(".console-menu-region").click(function(e){
    $(this).children('a').toggleClass('dis-inline')
    $(document).click(function(){
      docuZy()
    })
     e.stopPropagation();
  })
  $(".sub-region-name-link").click(function(e){
      $('.region-tiled-submenu').show();
      var parentName = $(this).find('span').html();
      $('#parentName').html(parentName);
      
      $('.region-tiled-submenu').siblings().hide()
      $(document).click(function(){
      docuZy()

    })
     e.stopPropagation();
    })
    $(".submenu-back").click(function(e){
      $('.region-tiled-submenu').hide()
      $('.region-tiled-submenu').siblings().show()
      $(document).click(function(e){
      docuZy()
    })
     e.stopPropagation();
    })
  //帮助中心的hover效果
  $(".console-topbar-btn-help").hover(function(){
    $(this).children(".coM_hellp").stop().toggle()
  })
  //其他节点的hover效果
  $(".console-topbar-btn-oldConsole").hover(function(){
    $(".frame-dropdown-tinyTip").toggle()
  })
  //控制中心的tab切换
  $(".home-submenu-items>li").click(function(){
    $(".home-submenu-items>li").removeClass("curr")
    $(this).addClass('curr')
    $(".home-responsive-screen>div").eq($(this).index()).removeClass('con-hide')
    $($(".home-responsive-screen>div").eq($(this).index()).siblings().addClass('con-hide'))
  })
  //控制台tab切换
  /*$(".ti-leftmenu-level1").click(function(){
    $(".service-content-view").addClass('ng-hide')
    $(".service-content-view").eq($(this).index()-1).removeClass('ng-hide')
  })*/
  //云硬盘备份的tab切换
  $(".ti-tabs>li").click(function(){
    $(".ng-isolate-scope").removeClass("ti-tab-active")
    $(this).addClass("ti-tab-active")
    $(".coM_table").css("display","none")
    $(".ecsVmDetailVolumesDiv").css("display","none")
    $(".coM_table").eq($(this).index()).css("display","block")
    $(".ecsVmDetailVolumesDiv").eq($(this).index()).css("display","block")
  })
  //弹性云主机提示语点击关闭
  $(".frame-cloud-close").click(function(){
    $(this).parent().parent().hide()
  })
  //弹性云主机所有运行状态
  $(".coM-state_act").click(function(e){
    $(this).find('.coM_running-state').toggle()
    $(this).find('.coM-label-selected').toggle()
    $(this).children().eq(0).toggleClass("ti-select-container-down")
    name()
    $(document).click(function(){
      state()
    })
     e.stopPropagation();

  })
  //刷新hover效果
  $(".coM_Refresh").hover(function(){
    $(this).children().children().eq(1).stop(true).toggle()
  })
  //下拉菜单更换内容
  $(".coM_running-state li").click(function(){
    $(this).parent().parent().prev().prev().html($(this).children().html())
    $(".coM_running-state li").removeClass('ti-dropdown-option-selected')
    $(this).addClass('ti-dropdown-option-selected')
  })
  //添加网卡的下拉菜单
  $(".coM-label-selected li").click(function(){
    $(this).find().toggleClass('ti-icon ti-icon-checkmark')
    $(this).parent().parent().prev().prev().children().after("<div class='ti-multiselect-box-cell ng-scope'><span class='ti-box-cell-key ng-binding'>"+$(this).children().next().html()+"</span><span class='ti-icon ti-icon-close ti-icon-close-staic'></span></div>")
    $(this).toggleClass('ti-dropdown-option-selected')
    $(".coM_ct-aq").children().addClass('ti-select-container-down')
  })
  function state(){
    $(".coM_running-state").hide()
    $(".coM-label-selected").hide()
    $(".coM-state_act").children().removeClass('ti-select-container-down')
  }

  //收藏hover
  $(".collection").hover(function(){
    $(this).next().stop(true).toggle()
  })
  //弹性云主机下名称下拉菜单
  $(".coM_name").click(function(e){
    $(".coM_select-name").toggle()
    $(this).toggleClass("ti-select-container-focused")
    state()
    $(document).click(function(){
      name()
    })
     e.stopPropagation();
  })
  function name(){
    $(".coM_select-name").hide()
    $(".coM_name").removeClass('ti-select-container-focused')
  }
  $(".coM_ul li").click(function(){
    $(this).parent().parent().prev().children().eq(0).html($(this).children().html())
    $(".coM_ul li").removeClass('ti-dropdown-option-selected')
    $(this).addClass('ti-dropdown-option-selected')

    $(".coM_select-name").toggle()
    $('.coM_name').toggleClass("ti-select-container-focused")
  })
  //弹性云主机跳转详情
  $(".coM_target").click(function(){
    $("#vmList").parent().parent().prev().show()
    $("#vmList").parent().parent().hide()
  })
  //云硬盘备份-备份表格下拉效果
  $(".ti-odd-tr *[details-icon-column]").click(function(){
    $(this).parent().next().toggle()
    $(this).children().children().toggleClass("ti-icon-angle-transform-up-thin")
  })
    $("#ebsDiv").on('click',".ti-accordion-panel",function(){
      $(this).next().slideToggle()
      $(this).find(".ti-icon").toggleClass("ti-icon-angle-transform-up")
    })
    $("#ipList").on('click',".ti-accordion-panel",function(){
      $(this).next().slideToggle()
      $(this).find(".ti-icon").toggleClass("ti-icon-angle-transform-up")
    })
  //全选
  $(".coM_select").click(function(){
    if(this.checked==true){
      $("*[ti-checkbox]").each(function(){
        this.checked=true
      })
    }else{
      $("*[ti-checkbox]").each(function(){
        this.checked=false
      })
    }
  })
  
  //弹性云主机更多下拉
  $(".coM_more").click(function(e){
    $(".coM_more").not($(this)).parent().next().hide()
    $(this).parent().next().toggle()
    $(document).click(function(e){
      
      $(".coM_more").parent().next().hide()

    })
     e.stopPropagation();
  })
  //页码显示条数
  $(".ti-page-size-option").click(function(e){
    $(this).toggleClass("ti-select-container-focused")
    $(this).toggleClass("ti-select-container-down")
    $(this).children().next().next().toggle()
    $(document).click(function(e){
      $(".ti-page-size-option").children().next().next().hide()
      $(".ti-page-size-option").removeClass('ti-select-container-focused')
      $(".ti-page-size-option").removeClass("ti-select-container-down")
    })
     e.stopPropagation();
  })
  $(".coM_page-num li").click(function(){
    $(this).parent().parent().parent().children().eq(0).html($(this).children().html())
    $(".coM_page-num li").removeClass("ti-dropdown-option-selected")
    $(this).addClass("ti-dropdown-option-selected")
  })
  //帮助图标的hover
  $(".cti-helpTip-icon").hover(function(){
    $(this).children().toggle()
  })
  //备份策略名称hover
  $(".coM_names-hover").hover(function(){
    $(this).children().children(".ti-tooltip").stop(true).toggle()
  })
  //日历
  $(".ti-icon-calendar").click(function(e){
    $(this).parent().next().show()
    $(".ti-date-picker").click(function(e){

      $(document).click(function(e){
        $(".ti-icon-calendar").parent().next().hide()
      })
       e.stopPropagation();
    })
    $(document).click(function(e){
      $(".ti-icon-calendar").parent().next().hide()
    })
     e.stopPropagation();
  })
  $(".ti-date-picker-footer-right>.ti-date-picker-footer-btn").click(function(){
    $(".ti-icon-calendar").parent().next().hide()
  })
  $(".ti-date-picker-table .ti-date-default-day").click(function(){
    $(".ti-date-picker-table .ti-date-default-day").removeClass("ti-date-current-day")
    $(this).addClass("ti-date-current-day")
    
  })
  //日历月份下拉
  $(".ti-date-picker-year-month").click(function(){
    $(this).parent().toggleClass("ti-header-year-month-picker-expand")
    $(this).siblings().toggle()
  })
  //日历选择年月
  $(".ti-header-month-default-state").click(function(){
    $(this).addClass("ti-date-picker-selected-year-month")
    $(this).siblings().removeClass("ti-date-picker-selected-year-month")
  })
  //监控下的选择时间
  $(".ti-btn-group>.ti-btn-item-container").click(function(){
    $(this).addClass("ti-active")
    $(this).siblings().removeClass("ti-active")
  })
  function setAll(_this){
    var This=_this.parent().parent().parent()
    if(!$(".ng-pristine").checked){
      This.parent().find(".coM_select").prop("checked",false); // 子复选框某个不选择，全选也被取消
    }
    var choicelength=This.find(".ng-pristine").length;

    var choiceselect=This.find(".ng-pristine:not(:disabled):checked").length;
    if(choicelength==choiceselect){
      This.parent().find(".coM_select").prop("checked",true); 
    }
  }
  $(".ng-pristine").click(function(){
    setAll($(this))
  })
  //当页面滚动时更多效果消失页码数效果消失
  $(document).scroll(function(){
    $(".ti-page-size-option").removeClass("ti-select-container-focused")
    $(".ti-page-size-option").removeClass("ti-select-container-down")
    $(".ti-page-size-option").children().next().next().hide()
    $(".coM_more").parent().next().hide()
  })  
  //标签搜索的下拉
  $(".advanced-search button").click(function(){
    $(this).toggleClass("cti-advancedSearch-btn-active")
    $(".cti-advancedSearch-panel").slideToggle()
    $(this).children().toggleClass("icon-cloud-action-double-fold")
  })
  
  
  //网卡开关
  $(".ti-switch").click(function(){
    $(this).toggleClass('ti-switch-off')
  })
  
  function getMaxValue(arr){
    var a=arr[0]
    for(var k in arr){
      a=arr[k]
    }
    return a;
  }
  $('.ti-modal-dialog').each(function(index){
      // $(this).width($(this).parent().width())
      $(this).myDrag({
        parent:".vms_Box",
        randomPosition:false,
        direction:'all',
        handler:'.ti-modal-header'
        
      });
    });

})
</script>

<style scoped lang="scss">
@import "src/styles/variables.scss";
$stack: $stack !default;
.hoverClass {
  &:hover {
    background: $headerHover;
  }
}
.vip-header {
  position: fixed;
  width: 100%;
  height: 45px;
  top: 0;
  z-index: 1000000;
  background: $headerBackground;
  /*display:flex;*/
  /*justify-content:space-between;*/
  font-size: $headerFontSize;
  color: $headerColor;
  .header-left {
    float: left;
    > div {
      display: table-cell;
      vertical-align: middle;
    }
    .logo {
      width: 50px;
      height: $headerHeight;
      padding: 0 10px 0 10px;
      box-sizing: border-box;
      border-right: $header-border-right;
      cursor: pointer;
    }
    .console-center {
      width: 121px;
      text-align: center;
      line-height: $headerHeight;
      height: $headerHeight;
      border-left: $header-border-left;
      border-right: $header-border-left;
      a {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-right: $header-border-right;
      }
    }
  }
  .hedaer-right {
    float: right;
    border-left: $header-border-right;
    > div {
      height: $headerHeight;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      line-height: $headerHeight;
    }
    .header-order {
      width: 70px;
      border-left: $header-border-left;
      color: #fff;
    }
    .header-cost,
    .header-message {
      width: 90px;
      border-left: $header-border-left;
      border-right: $header-border-right;
      color: #fff;
    }
    /*.user-img{

				width:20px;
				display: inline-block;
				img{
					width:100%;
					border-radius: 50%;
					vertical-align: middle;
				}
			}*/

    .header-user {
      border-left: $header-border-left;
      padding-left: 20px;
      min-width: 130px;
      padding-right: 10px;

      box-sizing: border-box;
      .user-name {
        display: inline-block;
        text-align: left;
        box-sizing: border-box;
        color: #fff;
        width: 100%;
        line-height: $headerHeight;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        img {
          width: 20px;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
  }
}

.console-header {
  position: fixed;
  width: 100%;
  height: 61px;
  top: 0;
  z-index: 1000000;
  background: $headerBackground;
  /*display:flex;*/
  /*justify-content:space-between;*/
  font-size: $headerFontSize;
  color: $headerColor;
  .navlabel {
    display: block;
    width: 60px;
    height: 61px;
    text-align: center;
  }
  .icon {
    font-size: 24px;
    width: 18px;
    height: 18px;
  }
  .header-left {
    float: left;
    margin-left: 20px;
    > div {
      display: table-cell;
      vertical-align: middle;
    }
    .logo {
      width: 150px;
      height: 61px;
      box-sizing: border-box;
      border-right: $header-border-right;
      cursor: pointer;
    }
    .console-center {
      font-size: 20px;
      line-height: 61px;
      width: 121px;
      text-align: center;
      line-height: $headerHeight;
      height: $headerHeight;
      border-left: $header-border-left;
      border-right: $header-border-left;
      a {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 61px;
        box-sizing: border-box;
        border-right: $header-border-right;
      }
    }
    .nav {
      height: 61px;
      li {
        float: left;
        font-size: 14px;
        line-height: 61px;
        margin-right: 20px;
        height: 61px;
        color: #aaa;
        .secondNav {
          display: none;
          width: 80%;
          /*height: 200px;*/
          position: absolute;
          top: 61px;
          left: 10%;
          background-color: #6c6c6c;
          color: #fff;
          padding: 20px;
          div {
            float: left;
            margin-right: 30px;
            width: 15%;
            color: #fff;
            /*height: 200px;*/
            label {
              display: block;
              border-bottom: 1px solid #c8c9cc;
              height: 30px;
              line-height: 30px;
            }
            .sub-router {
              display: block;
              height: 30px;
              line-height: 30px;
              .nav-svg {
                font-size: 18px;
                color: #ffffff;
              }
            }
            .sub-router:hover {
              cursor: pointer;
              color: #f5b840;
              .nav-svg {
                font-size: 18px;
                color: #f5b840;
              }
            }
          }
          .dashboard {
            margin-left: 10px;
            width: 5%;
            line-height: 150px;
          }
        }
        .secondNav > div:first-child {
          width: 8%;
          height: 100%;
          position: relative;
          span {
            margin-top: 30px;
          }
        }
      }
      li:hover {
        background-color: #6c6c6c;
        color: #fff;
        .secondNav {
          display: block;
        }
      }
    }
  }
  .hedaer-right {
    float: right;
    height: 61px;
    line-height: 61px;
    border-left: $header-border-right;
    > div {
      height: $headerHeight;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
      line-height: $headerHeight;
    }
    .header-order {
      width: 70px;
      border-left: $header-border-left;
      color: #fff;
    }
    .header-cost,
    .header-message {
      width: 90px;
      border-left: $header-border-left;
      border-right: $header-border-right;
      color: #fff;
    }
    /*.user-img{

                width:20px;
                display: inline-block;
                img{
                    width:100%;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }*/

    .header-user {
      border-left: $header-border-left;
      padding-left: 20px;
      min-width: 130px;
      padding-right: 10px;

      box-sizing: border-box;
      .user-name {
        display: inline-block;
        text-align: left;
        box-sizing: border-box;
        color: #fff;
        width: 100%;
        line-height: $headerHeight;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        img {
          width: 20px;
          border-radius: 50%;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
  }
  .el-input__inner {
    background-color: #1b202b !important;
    color: #fff !important;
  }
}
</style>
