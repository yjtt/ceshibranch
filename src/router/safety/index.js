import Layout from '@/views/Layout'
import overview from '@/views/safety/overview' //认证页

import portCount from '@/views/safety/assetInventory/MonitorPortCount'  //监听端口清点
import porcessCount from '@/views/safety/assetInventory/porcessCount'   //运行进程清点
import checkRule from '@/views/safety/fileCheck/checkRule' //检测规则
import checkEvent from '@/views/safety/fileCheck/checkEvent' //检测规则
//服务器列表，详情
import serverList from '@/views/safety/cds/ServerList'
import serverDetails from '@/views/safety/cds/ServerDetails'
import waringSetting from '@/views/safety/waringSetting'  //告警设置
import indList from '@/views/safety/IndList'     //异常登录
import loginsecurityset from '@/views/safety/loginsecurityset'    //登陆安全设置

import checkServer from '@/views/safety/fileCheck/checkServer' //配置生效服务器
import checkTime from '@/views/safety/fileCheck/checkTime' // 配置检测频率
import fileDetails from '@/views/safety/fileCheck/fileDetails'  //文件详情
import numberCount from '@/views/safety/assetInventory/numberCount'  //账号清点
import softCount from '@/views/safety/assetInventory/softCount'  //软件清点
import echartsMap from '@/views/safety/echarts'  //软件清点
import map from '@/views/safety/map'  //软件清点


let Router ={
	path:'/safety',
	name:'safety',
	component: Layout,
	redirect: '/safety/overview',//'/monitor/overview',
	children:[
      	{
      		path: 'overview',
      		name: 'overview',
      		component: overview,
		},
		{
			path: 'assetInventory/portCount',
			name: 'portCount',
			component: portCount,
		},
		{
			path: 'assetInventory/porcessCount',
			name: 'porcessCount',
			component: porcessCount,
		},
		{
			path: 'fileCheck/checkRule',
			name: 'checkRule',
			component: checkRule,
		},
		{
			path: 'cds/serverList',
			name: 'serverlist',
			component: serverList,
		},
		{
			path: 'cds/serverDetails/:ip/:id/:zone_id/:guid/:integrityEventID/:atype',
			name: 'serverdetails',
			component: serverDetails,
		},
		{
			path: 'waringSetting',
			name: 'waringSetting',
			component: waringSetting,
		},
		{
			path: 'indList',
			name: 'indList',
			component: indList,
		},{
            path: 'loginsecurityset',
            name: 'loginsecurityset',
            component: loginsecurityset,
        },
		{
			path: 'fileCheck/checkEvent',
			name: 'checkEvent',
			component: checkEvent,
		},
		{
			path: 'fileCheck/checkServer/:IntegrityRuleID',
			name: 'checkServer',
			component: checkServer,
			
		},
		{
			path: 'fileCheck/checkTime',
			name: 'checkTime',
			component: checkTime,
		},
		{
			path: 'fileCheck/fileDetails/:integrityEventID',
			name: 'fileDetails',
			component: fileDetails,
		},
		{
			path: 'assetInventory/numberCount',
			name: 'numberCount',
			component: numberCount,
		},
		{
			path: 'assetInventory/softCount',
			name: 'softCount',
			component: softCount,
		},
		{
			path: 'echarts',
			name: 'echartsMap',
			component: echartsMap,
		},
		{
			path: 'map',
			name: 'map',
			component: map,
		}
	]
};
export default Router;