
import Layout from '@/views/Layout'
import Ecm from '@/views/monitor/ecmMonitor'

let Router ={
	path:'/monitor',
	name:'monitor',
	component: Layout,
	redirect: '/monitor/dashboard',//'/monitor/overview',
	children:[
      	{
      		path: 'ecmMonitor',
      		name: 'ecmMonitor',
      		component: Ecm,
      	}
	]
};
export default Router;