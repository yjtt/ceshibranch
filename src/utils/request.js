import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import exception from '@/utils/exception'

// import router from '../router'


// let baseUrl = process.env.NODE_ENV === "production" ? '/' : '/api/';
// let baseUrl = "https://vip.ctyun.cn/";
let baseUrl = "http://172.18.143.236:8777/";


// 创建axios实例
let cancelToken = axios.CancelToken;
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 50000, // 请求超时时间
})

service.cancle = null;
// request拦截器
service.interceptors.request.use(config => {
     config.cancelToken = new cancelToken((c)=>{
     /*	console.log(config.url);*/
     	service.cancle = c;//将取消的方法绑定到service的cancle上，以便能够调用
				
    });
  // Do something before request is sent
  if (store.getters.token) {

		if(config.method == 'get'){
			let newDate = (new Date()).getTime()
			config.params ? (config.params.timeStamp = newDate ) : (config.params  = {
				timeStamp:newDate,
			})
		}
  	config.headers['X-CSRFToken'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  // response => response ,
  response => {
    // alert(111)
  // console.log(response)
        return response.data;
    
  },
  // console.log(response),
  // alert(this.$router),
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    if (error.response) {
    	let errorMsg = exception(error) || error.message;
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      /*console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);*/
      if(error.response.status == 401){
      	console.log(error.response.data);
      	console.log(error.response.status);
      	console.log(error.response.headers);

      	// store.dispatch('FedLogOut').then(() => {
       //      Message.error('登录已过期，请重新登录')
       //      location.href='#/login'
       //  })
      }else{
	      Message({
		      message: errorMsg,
		      type: 'error',
		      duration: 5 * 1000,
		      showClose:true
		    })
      }


    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      if(error.message == 'CancelToken'){
      	
      }else{
      	Message({
		      message: "连接超时，请稍后重试",
		      type: 'error',
		      duration: 5 * 1000,
		      showClose:true
		    })
      }
    }
    /*console.log(error.config);*/

    return Promise.reject(error)
  })

export default service
