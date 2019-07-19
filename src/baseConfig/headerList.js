import i18n from '@/lang'

let headerList = [
	{
		id: 'order',
		name: i18n.common.order,
		subList: [
			{
				title: i18n.common.myOrder,
				path: ''
			},
			{
				title: i18n.common.submitOrder,
				path: ''
			}
		],
		hide:true
	},
	{
		id: 'cost',
		name: i18n.common.charge,
		hide:true,
		subList: [
			{
				title: i18n.common.orderAdmin,
				path: '/cost/order',
				index: '0-0',
				subList: [
					{
						title: i18n.common.orderList,
						path: '/cost/order',
						index: '0-0'
					}
				]
			},
			{
				title: i18n.common.bill,
				path: '/cost/bill',
				index: '1-0',
				subList: [
					{
						title: i18n.common.Billing,
						path: '/cost/bill',
						index: '1-0'
					},
					{
						title: i18n.common.billInfo,
						path: '/cost/billInfo',
						index: '1-1'
					}
				]
			},
			{
				title: i18n.common.renewAdmin,
				path: '/cost/renew',
				index: '2-0',
				subList: [
					{
						title: i18n.common.renewEcm,
						path: '/cost/renew',
						index: '2-0'
					},
					{
						title: i18n.common.renewEip,
						path: '/cost/EipRenew',
						index: '2-1'
					}
				]
			}
		]
	},
	{
		id: 'message',
		name: i18n.common.message,
		subList: [
			{
				title: i18n.common.allMessage,
				path: ''
			}
		],
		hide:true
	}
	
]


export default headerList
