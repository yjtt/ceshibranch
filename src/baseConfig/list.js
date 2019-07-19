import i18n from '@/lang'
import router from '@/router'

let list = [
	{
		id:"ecm",
		name:i18n.common.security,
		subList:[
			{
				title:i18n.common.dashboard,
				path:'/safety/overview',
				id:'ecmSub'
			},
			{
				title:i18n.common.serverList,
				path:'/safety/cds/serverList',
				id:'ecmEbsSub'
			},
			{
				title:i18n.common.inventory,
				path:'/safety/assetInventory/portCount',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '监听端口',
						path: '/safety/assetInventory/portCount',
						index: '1-0',
					},
					{
						title: '运行进程',
						path: '/safety/assetInventory/porcessCount',
						index: '1-0',
					},
					{
						title: '账号清点',
						path: '/safety/assetInventory/numberCount',
						index: '1-0',
					},
					{
						title: '软件清点',
						path: '/safety/assetInventory/softCount',
						index: '1-0',
					}
				]
			},
			{
				title:i18n.common.intrusionDetection,
				path:'/ecm/ebs/ebsList',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '异常登录',
						path: '/safety/indList',
						index: '1-0',
					}
				]
			},
			{
				title:i18n.common.integrity,
				path:'/safety/fileCheck/checkRule',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '检测事件',
						path: '/safety/fileCheck/checkEvent',
						index: '1-0',
					},
					{
						title: '检测规则',
						path: '/safety/fileCheck/checkRule',
						index: '1-0',
					}
				]
			},
			{
				title:i18n.common.setting,
				path:'/safety/waringSetting',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '告警设置',
						path: '/safety/waringSetting',
						index: '1-0',
					}
				]
			},
		]
	},
]

export default list
