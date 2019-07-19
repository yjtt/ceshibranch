import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import ConsoleCenter from '@/views/dashboard/consoleCenter'
import Error from '@/views/dashboard/error'

import i18n from '@/lang'

import ecmRouters from './ecm'
import ebsRouters from './ebs'
import monitorRouter from './monitor'
import safety from './safety'

import consoles from '@/views/consoles'


Vue.use(Router)

//定义控制中心 登录 404 页面路由
let routers = [
    {
      path: '/',
      component: Layout,
      redirect:'/safety',
      children:[
      	{
	    	path:'console',
	    	name:'console',
	    	component:consoles
      	}
      ]
    },
    {
    	path:'*',
    	redirect:'/error/404',
    },
    {
      path:'/error/:errorCode',
      name:'error',
      component:Error
    }
];
//添加云安全概述路由
routers.push(ecmRouters)
//添加云服务器列表路由
routers.push(ebsRouters)
//资产清单概览
routers.push(monitorRouter);
routers.push(safety);


export default new Router({
  //mode:'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
})
