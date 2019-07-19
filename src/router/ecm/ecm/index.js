import i18n from '@/lang'

import Layout from '@/views/Layout'
import EcmList from '@/views/ecm/EcmList'

let Router ={
	path:'/ecm',
	name:'ecm',
	component:Layout,
	redirect:'/ecm/ecmDashboard',
	children:[
      	{
      		path:'ecmList',
      		name:'ecmList',
      		component:EcmList,
      		props: { name: i18n.ecm.ecmPathName, buttonText: i18n.ecm.ecmButtonName }
      	},
	]
};



export default Router;