import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import exception from '@/utils/exception'

// 测试地址
// let baseUrl = 'http://172.18.208.18:8091';   
// 上线地址
// let baseUrl = 'http://ctcss.ctyun.cn:8091';
// 
// 本地运行
let baseUrl = process.env.NODE_ENV === "production" ? '/' : '/safety/';

// baseUrl += 'Yidun_admin/'
// 创建axios实例
let cancelToken = axios.CancelToken;
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 50000, // 请求超时时间
  dataType: "xml",
  withCredentials: true,
})

service.cancle = null;
// request拦截器
service.interceptors.request.use(config => {
  config.cancelToken = new cancelToken((c) => {
    /*	console.log(config.url);*/
    service.cancle = c;//将取消的方法绑定到service的cancle上，以便能够调用
  });
  // Do something before request is sent
  if (store.getters.token) {

    if (config.method == 'get') {
      let newDate = (new Date()).getTime()
      config.params ? (config.params.timeStamp = newDate) : (config.params = {
        timeStamp: newDate,
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

// var flag = true;
// respone拦截器
service.interceptors.response.use(
  // response => response ,
  res => {
    let firstI = res.data.indexOf('{'),
      lastI = res.data.lastIndexOf('}'),
      result = JSON.parse(res.data.slice(firstI, lastI + 1));
    if (result.status == -2) {
      console.log('拦截器--登录失效')
      firstGetToken()
      // flag = false;
    } else if (result.description == '没有查询到数据！') {
      return []
    } else if (result.status == 0 || result.status == -1) {
      return result.description
    } else {
      console.log(111);
      return result
    }
  },
)
// ticket失效时重新登陆
function firstGetToken() {
  console.log('fi')
  let date = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:index>' +
    '<ticket></ticket>' +
    '</ser:index>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  axios({
    method: 'post',
    data: date,
    url: baseUrl + '/services/indexService?wsdl',
  }).then(res => {
    console.log('获取登录成功', res);
    var str = res.data.slice(res.data.indexOf('<return>') + 8, res.data.indexOf('</return>'))
    var result = JSON.parse(str)
    if (result.status < 0) {
      console.log('登录失败')
    } else if (result.status == 0) {
      console.log(result.description)
      window.location.href = result.description
    }
  }).catch(err => {
    console.log('获取登录失败', err);
  })
}
export default service
