import i18n from '@/lang'

export default {
	
	id: 'user',
	name: i18n.common.userCenter,
	subList: [
		{
			title: i18n.common.userInfo,
			path: '/user/userInfo'
		},
		{
			title: i18n.common.editAccount,
			path: '/user/editAccount',
			hide:true
		},
		{
			title: i18n.common.certification,
			path: '/user/certification',
			hide:true
		},
		{
			title: i18n.common.infoAlert,
			path: '/user/infoAlert',
			hide:true
		}
	]
	
	
	
}
