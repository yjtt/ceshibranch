<template>
    <div class="navAside" :style="{width: navAsideWidth + 'px'}" v-if='!aisdeHide'>
        <el-aside>
            <div class="aside-flex" :style="{width: isOpenSubMenu ? 'auto' : isOpen ? 'auto' : '150px'}">
              <el-row>
                <el-col :span="!isOpen ? 12 : 7" class='Menu'>
                <!-- <el-menu :collapse='isOpen' class='aside-width' :default-active="routerName"> -->
                  <el-menu :collapse='isOpen' class='aside-width' :class="{'el-menu-collapse' : isOpen}" :default-active="''+5">
                     <li class="el-menu-item" @click='toggle("isOpen")' style="padding-left: 20px; text-align: center;">
                        <i class="aside-icon" >
                        <svg-icon icon-class="menu" v-if="isOpen"></svg-icon>
                        <svg-icon icon-class="menu" style="transform: rotate(90deg);" v-if="!isOpen"></svg-icon>
                        </i>
                        <span slot="title" v-show="isOpen">切换开关</span>
                    </li>

                      <!-- sll添加 -->
                      <!-- {{navListTwo}} -->
                    <el-tooltip v-for='(items ,index) in navListTwo' :key='index' :disabled="!isOpen" :enterable='false' :content="items.name" placement="right">
                        <el-menu-item @click="showListDetail(index)" :index='""+index'>
                            <i class="aside-icon"><span :class="'vip-icon vip-icon-'+items.icon"></span></i>
                            <span slot="title">{{items.title}}</span>
                        </el-menu-item>
                    </el-tooltip>

                  </el-menu>
                  <!-- </el-menu> -->
                </el-col>
                <el-col :span="!isOpen ? 12 : 17" class='subMenu'>
                  <transition name='aniFadeInout'>
                    <ul class="sub-menu" v-if="isOpenSubMenu" >
                        <li class="sub-menu-title">{{subTitle}}</li>
                        <!-- {{subList}} -->
                        <template v-if="isTwo">
                            <el-menu :default-active="''+activeIndex" class="el-menu-vertical-demo" background-color="#fff"  text-color="#606266" active-text-color="#ffd04b" v-show="isTwo">
                                 <el-submenu v-for="(item,index) in subList" :index="''+index" :key="index">
                                    <template slot="title">
                                        <span>{{item.title }}</span>
                                    </template>                                    
                                    <el-menu-item v-for="(subItem,index) in item.subList" :index="item.title+'-'+index" :key="index">
                                        <router-link class="sub-menu-list" tag='li' :to='subItem.path'>
                                            {{ subItem.title }}
                                        </router-link>
                                    </el-menu-item>
                                 </el-submenu>
                            </el-menu>
                        </template>
                        <template v-else>
                            <router-link class="sub-menu-list"
                                tag='li'
                                :to='item.path'
                                :key='index'
                                v-if="!item.hide"
                                v-for="(item,index) in subList"
                                :class="{'router-link-active':item.id && item.id == metaDepend }"
                            >
                                {{ item.title}}
                            </router-link>
                            <el-menu :default-active="''+defaultIndex" class="el-menu-vertical-demo"
                                     background-color="#fff" text-color="#606266" 
                                     active-text-color="#ffd04b" v-else-if="item.isSub"  @select='handleSelect'>
                                <el-submenu :index="''+index" :key="index" class="el-menu-vertical-demo" :collapse="isCollapse">
                                    <template slot="title">
                                        <svg-icon icon-class="next" class="el-submenu__icon-arrow"></svg-icon>
                                        <span class="f_s_12">{{item.title}}</span>
                                    </template>

                                    <!-- 二级导航子项 -->
                                    <el-menu-item v-for="(subItem,index2) in item.subList" class="el-menu-vertical-demo" :collapse="isCollapse"
                                                  :index="index+'-'+index2" :key="index+'-'+index2">
                                        <router-link class="sub-menu-list p_l_20" tag='li' :to='subItem.path'>
                                            {{ subItem.title}}
                                        </router-link>
                                    </el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </template>
                        <div class="toggle-subMenu"  v-if="isOpenSubMenu" @click="toggle('isOpenSubMenu')" :class="{'toggle-subMenuRight' : !isOpenSubMenu}">
                            <svg-icon icon-class="submenu"></svg-icon>
                            </div>
                        </ul>
                    </transition>
                    </el-col>
                </el-row>
                </div>
                <!--<transition name="fadeIn">  v-if="subMenuShow"  -->
                <!-- 左侧菜单收回按钮 -->
                    <div class="toggle-subMenu toggle-subMenu-aside" v-if="!isOpenSubMenu" @click="toggle('isOpenSubMenu')" :class="{ 'toggle-subMenuLeft' :isOpen && !isOpenSubMenu ,'toggle-subMenuRight': !isOpen && !isOpenSubMenu}">
                        <svg-icon icon-class="submenu" style="transform: rotate(180deg);" v-if="!isOpenSubMenu" ></svg-icon>
                    </div>
                <!--</transition>-->
            </el-aside>

        </div>
</template>

<script>
    import list from '@/baseConfig/list'
    import headerList from '@/baseConfig/headerList'
    import userList from '@/baseConfig/userList'
    import { getRegionType } from '@/utils/auth'
    import {platformList} from '@/api/login'

    export default {
                data (){

            return {
                isOpen:false,
                isOpenSubMenu:true,
                // navList:list,
                navListTwo:[
                    // {name:'云服务器',id:'ecm',},
                    // {name:'云硬盘',id:'ebs',},
                    // {name:'虚拟私有云',id:'vpc',},
                    // {name:'负载均衡',id:'elb',},
                    // {name:'云监控',id:'monitor',},
                    // {name:'云安全',id:'safe',},
                    // {name:'云骨干',id:'chs',},
                    // {name:'云压测',id:'dtp',},
                    // {name:'云容器 ',id:'caas',}
                ],
                subList:[],
                subTitle:'',
                isTwo:true,
                aisdeHide:false,
                routerName:'',
                metaDepend:'',
                subMenuShow:false,
                defaultIndex: '0-0',
                activeIndex: 0 ,
                isCollapse: false
            }
        },
        created(){
            this.getPlatformList()
        },
        methods:{
            toggle(el){
                if(el=='isOpen'){
                    this.isOpen = !this.isOpen
                }
                if(el == 'isOpenSubMenu'){
                    this.isOpenSubMenu = !this.isOpenSubMenu
                }
            },
            //获取侧边栏
            getPlatformList() {
                console.log(121343)
                platformList().then(res => {
                    console.log(1236543245643,res)
                    this.navListTwo = res.results
                }).catch(err => {
                    console.log("获取数据存储失败", err);
                });
            },
            handleSelect(index){
                sessionStorage.setItem('Index',index);           
            },
            jumpPush(index){
                console.log(index,'jump')
                if(this.navListTwo.length>0){
                    window.location.href= this.navListTwo[index].url
                }
                
                // for(var i=0;i<this.navListTwo.length;i++){
                //     if(index == i){
                //         //window.location.href= this.navListTwo[i].url
                //         window.open(this.navListTwo[i].url)
                //     }
                // }

                // let baseUrl = 'https://vip.ctyun.cn/'
                // if(index == 0){
                //     window.location.href= baseUrl + 'console/index/#/ecm/ecmDashboard'
                // }else if(index == 1){
                //     window.location.href= baseUrl + 'console/index/#/ebs/ebsList'
                // }else if(index == 2){
                //     window.location.href= baseUrl + 'console/index/#/vpc/vpcList'
                // }else if(index == 3){
                //     window.location.href= baseUrl + 'console/index/#/elb/elbList'
                // }else if(index == 4){
                //     window.location.href= baseUrl + 'console/index/#/monitor/overview'
                // }else if(index == 6){
                //     window.location.href= baseUrl + 'console/index/#/ch/chList'
                // }else if(index == 7){
                //     window.location.href= 'https://dtp.ctyun.cn/cas/login'
                // }else if(index == 8){
                //     window.location.href= 'https://caas.ctyun.cn/'
                // }
                // if(index == 5){
                //     this.isOpenSubMenu = true;
                // }else {
                //     this.isOpenSubMenu = false;
                // }
            },
            showListDetail(index){
                this.jumpPush(index)

                // console.log(this.isOpen)
                index = 0;
                this.isTwo = false;
                // this.subTitle = this.navList[index].label||this.navList[index].name;
                this.subTitle = this.navList[index].name;
                this.subList = this.navList[index].subList ? this.navList[index].subList : [];
                if(index == 0){
                    this.subList.id = this.subList == [] ? 'safe' : '';
                }
                console.log(this.navList, this.subList)
                // console.log(this.navList,909090909090909)//二级导航子菜单
                // this.$router.push(this.subList[0].path);
            },
            isTab(){
                this.defaultIndex = sessionStorage.getItem('Index');
                this.showListDetail(5);  //让下标为5的有一个默认样式
                
                this.routerName = this.$route.matched[0].name;
                /*console.log(this.$route.matched)
                console.log(this.routerName)*/
                /*判断子视图属于哪个模块*/
                this.metaDepend = this.$route.meta.dependOn;
                /*判断是否隐藏侧边栏*/
                this.aisdeHide = this.$route.meta.aisdeHide;
                //初次加载 清空 echart 状态
                this.$store.commit('CLEAR_ECHARTS',[]);

                if(this.$route.name === 'safety'){
                    this.isOpen = true;
                    this.isOpenSubMenu = true;
                    this.isTwo = true;
                    this.subMenuShow = true;
                }else if(this.$route.matched[0].name == 'user'){
                    // this.subTitle = userList.label || userList.name;
                    this.subTitle = userList.name;
                    this.routerName = this.$route.matched[0].name;
                    this.subList = userList.subList || [];
                    this.isOpen = true;
                    this.isTwo = false;
                    this.isOpenSubMenu = true;
                    this.subMenuShow = true
                }else{
                    var selectedList = this._.find(this.navList,{id:this.$route.matched[0].name});
                    if(selectedList){
                        // this.subTitle = selectedList.label || selectedList.name;
                        this.subTitle = selectedList.name;
                        this.routerName = this.$route.matched[0].name;
                        this.subList = selectedList.subList || [];
                        this.isOpen = false;
                        this.isTwo = false;
                    }else{
                        var selectedHeaderList = this._.find(headerList,{id:this.$route.matched[0].name});
                        // console.log(selectedHeaderList);
                        // this.subTitle = selectedHeaderList.label || selectedHeaderList.name;
                        this.subTitle = selectedHeaderList.name;
                        this.subList = selectedHeaderList.subList || [];
                        this.isOpen = true;
                        this.isTwo = true;
                    }
                    let selectSubList = this._.find(this.subList, {path: this.$route.path});
                    if (!selectSubList) {
                        this.subList.map((item, index, array) => {
                            var timeSub = this._.find(item.subList, {path: this.$route.path});
                            if (timeSub) {
                                selectSubList = timeSub;
                            }
                        });
                    }
                    this.defaultIndex = selectSubList && selectSubList.index;
                    this.isOpenSubMenu = true;
                    this.subMenuShow = true
                }
            },
            filterType(item){
                let regionType = this.$store.getters.regionType;
                let _ = this._;
                //console.log(item2)
                return _.map(item,(item2,key2)=>{
                    item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
                })
                return item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
            }
        },
        mounted: function(){
            // this.showListDetail(5)
            // this.jumpPush(5);      
            // window.location.hash = '#'+'/safety/overview?ticket=';      
            this.isTab();   
        },
        computed: {
            navAsideWidth: function(){
                let widthValue;
                if (this.isOpenSubMenu && !this.isOpen) {
                    widthValue = 231;
                } else if (!this.isOpen && !this.isOpenSubMenu) {
                    widthValue = 121;
                } else if (this.isOpenSubMenu && this.isOpen) {
                    widthValue = 161;
                } else {
                    widthValue = 51;
                }
                this.$emit('paddingValue', widthValue);
                return widthValue
            },
            navList(){
                //console.log(this.$store.getters.regionType);
                let regionType = this.$store.getters.regionType;
                //console.log(list)
                let _ = this._;
                /*let aa = _.map(list,'subList');
                let bb = _.map(aa,(item,key)=>{
                    return _.map(item,(item2,key2)=>{
                        item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
                    })
                })*/
                _.map(_.map(list,'subList'),this.filterType)
                //console.log(aa)
                return list;
            }

        },
        watch:{
          '$route':'isTab'
        },

    }
</script>

<style lang="scss" scoped="scoped">
    @import 'src/styles/variables.scss';

    $subMenuListTitle: 45px;
    $subMenuListHeight: 36px;
    .el-menu-vertical-demo {
        border-right: solid 0;
        height:auto !important;
    }

    .navAside {
        position: relative;
        .el-aside {
            width: auto !important;
            height: 100%;
            position: fixed;
            z-index: 3;
            overflow: hidden;
        }
        .aside-flex {
            /*display: flex;*/
            height: 100%;
            .f_s_12{
                font-size: 12px;
                padding-left: 3px;
            }
            .sub-menu {
                background-color: $subMenuBackground;
                width: 110px;
                text-align: left;
                font-size: 12px;
                .sub-menu-title {
                    height: $subMenuListTitle;
                    line-height: $subMenuListTitle;
                    background-color: $subMenuTitleBg;
                    color: #333;
                    font-weight: bold;
                }
                .sub-menu-list {
                    height: $subMenuListHeight;
                    line-height: $subMenuListHeight;
                    background-color: #fff;
                    &:hover{
                        cursor: pointer;
                        background-color: $mainBackground;
                    }
                }
                .router-link-active {
                    background-color: $mainBackground;
                }

            }

        }
        .aside-width {
            background-color: $navBackground;
            /*min-height: 730px;*/
        }
        .aside-width:not(.el-menu--collapse) {
            width: 120px;
        }

        .el-menu-item {
            height: $elItemHeight;
            line-height: $elItemHeight;
            font-size: 12px;
            color: $navDefaultColor;
            background-color: $navBackground;
            i {
                color: $navDefaultColor;
            }
            &visited, &focus, &:hover, &:active {
                background-color: $headerBackground;
                color: $navActive;
                border: none;
                outline: none;
                i {
                    background-color: $headerBackground;
                    color: $navActive;
                    border: none;
                }
            }
            .aside-icon {
                padding-right: 10px;
                font-size: 16px;
                margin-left: -3px;
            }
        }
        .is-active {
            background-color: $headerBackground;
            color: $navActive;
            border: none;
            i {
                background-color: $headerBackground;
                color: $navActive;
            }
        }
        .el-menu--collapse {
            width: 50px;
        }
        .toggle-subMenu {
            font-size: 60px;
            position: absolute;
            right: 0;
            text-align: right;
            width: 39px;
            top: 50%;
            overflow: hidden;
            cursor: pointer;
            z-index: 99999;
        }
        .toggle-subMenu-aside {
            top: calc(50% + 45px);
            /*transition: all .45s cubic-bezier(.42,0,.25,1);*/
        }
        .toggle-subMenuLeft {
            left: 30px;
            position: fixed;
        }
        .toggle-subMenuRight {
            left: 100px;
            position: fixed;
        }
        .p_l_20 {
            padding-left: 20px;
        }
    }
</style>
<style>
    .navAside .el-menu > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow {
        right: auto;
        margin-top: -4px;
        left: 10px;
    }
    .sub-menu > li{
        padding-left: 23px;
    }
    .navAside .el-menu > .el-submenu > .el-submenu__title {
        height: 36px;
        line-height: 36px;
    }
    .navAside .el-menu > .el-submenu > .el-submenu__title {
        height: 36px;
        line-height: 36px;
    }

    .navAside .el-menu > .el-submenu > .el-menu > .el-menu-item {
        height: 36px;
        line-height: 36px;
        padding: 0px !important;
        min-width: 110px;
        color: #666 !important;
    }
    .navAside i.el-icon-arrow-down {
        display: none;
    }

    .aside-flex .el-row, .aside-flex .el-col, .aside-flex .el-col ul {
        height: 100%;
    }

    .aside-flex .subMenu, .aside-flex .subMenu ul {
        z-index: 9999;
    }

    .aside-flex .Menu, .aside-flex .Menu ul {
        z-index: 10000;
    }
    /*.navAside .el-icon-arrow-down:before{content: "\25BC";}
    .navAside .el-icon-arrow-down{font-size: 6px;color: #d6deec;}*/
</style>
<style scoped="scoped">
    .aniFadeInout-enter-active {
        animation: slideOut 0.3s;
    }

    .aniFadeInout-leave-active {
        animation: slideOut 0.2s reverse;
    }

    .fadeIn-enter {
        animation: fadeIn 2s;
    }

    .fadeIn-leave {
        animation: fadeIn 2s reverse;
    }

    @keyframes slideOut {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            width: 110px;
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from {
            left: 30px;
        }
        to {
            left: 100px;
        }
    }

</style>