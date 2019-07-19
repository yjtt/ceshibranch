import Layout from '@/views/ecm/ecm'
import EbsList from '@/views/ebs/EbsList'

import i18n from '@/lang'


let router = {
	path:'ebs',
	name:'ecmEbs',
	component:Layout,
	redirect:'ebs/ebsList',
	children:[
		{
      		path:'ebsList',
      		name:'ecmEbsList',
    		component:EbsList,
      	}
	]
}

export default router;
