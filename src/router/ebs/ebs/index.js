import Layout from '@/views/Layout'
import EbsList from '@/views/ebs/EbsList'

import i18n from '@/lang'


let router = {
	path:'/ebs',
	name:'ebs',
	component:Layout,
	redirect:'/ebs/ebsList',
	children:[
		{
      		path:'ebsList',
      		name:'ebsList',
    		component:EbsList,
      	},
	]
}

export default router;
