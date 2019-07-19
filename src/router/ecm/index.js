import ecmRouter from './ecm'
import ebsRouter from './ebs'

//因为嵌套路由问题，把所有云服务器下面的路由嵌套到ecm下面
ecmRouter.children.push(ebsRouter);


export default ecmRouter;
