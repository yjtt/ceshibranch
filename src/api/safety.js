import safetyRequest from '@/utils/safetyRequest'
import { getsafetyToken } from '@/utils/auth'
// let token = getsafetyToken()
let token = 'BBE5B3A0F6738FCE5D2BF5C283CE95E8'

// 总览页面接口
export function amounts(ser) {
  // params.regionid || (params.regionid = getRegionId());
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/hostService?wsdl',
    method: 'post',
    data: data
  })
}
export function exceptionEvent(ser, paramsData) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramsData +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/hostService?wsdl',
    method: 'post',
    data: data
  })
}
// 进程
export function processEventService(ser, paramsData) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramsData +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/processEventService?wsdl',
    method: 'post',
    data: data
  })
}
// 端口
export function portEventService(ser, paramsData) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramsData +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/portEventService?wsdl',
    method: 'post',
    data: data
  })
}
//云服务器列表
export function serverRegion(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/hostService?wsdl',
    method: 'post',
    data: data
  })
}
//监听端口
export function catchPort(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/portEventService?wsdl',
    method: 'post',
    data: data
  })
}
//运行进程
export function runProcess(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/processEventService?wsdl',
    method: 'post',
    data: data
  })
}
//账户信息
export function userMsg(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/userInfoEventService?wsdl',
    method: 'post',
    data: data
  })
}
//异常登录
export function logException(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/eventService?wsdl',
    method: 'post',
    data: data
  })
}
//文件一致性检测
export function integrityEventList(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/eventService?wsdl',
    method: 'post',
    data: data
  })
}
//异常登录页面接口
export function exceptionRegionNum(ser) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/eventService?wsdl',
    method: 'post',
    data: data
  })
}
export function exceptionList(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/eventService?wsdl',
    method: 'post',
    data: data
  })
}
//登录安全设置
export function loginSecuritySettings(ser, paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<ser:' + ser + '>' +
    '<Token>' + token + '</Token>' + paramStr +
    '</ser:' + ser + '>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>'
  return safetyRequest({
    url: 'services/eventService?wsdl',
    method: 'post',
    data: data
  })
}
// 获取所有地区
export function allArea(ser){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
             '<soapenv:Header/>'+
             '<soapenv:Body>'+
             '<ser:'+ ser +'>'+
             '<Token>'+ token +'</Token>'+
             '</ser:'+ ser +'>'+
             '</soapenv:Body>'+
             '</soapenv:Envelope>'
  return safetyRequest({
    url:'services/hostService?wsdl',
    method:'post',
    data:data
  })
}

// 获取地区数据
export function integrityEventZoneList(ser){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
             '<soapenv:Header/>'+
             '<soapenv:Body>'+
             '<ser:'+ ser +'>'+
             '<Token>'+ token +'</Token>'+
             '</ser:'+ ser +'>'+
             '</soapenv:Body>'+
             '</soapenv:Envelope>'
  return safetyRequest({
    url:'services/eventService?wsdl',
    method:'post',
    data:data
  })
}
// 文件一致性列表
export function integrityEventHostList(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
             '<soapenv:Header/>'+
             '<soapenv:Body>'+
             '<ser:'+ ser +'>'+
             '<Token>'+ token +'</Token>'+ paramStr +
             '</ser:'+ser+'>'+
             '</soapenv:Body>'+
            '</soapenv:Envelope>'
  return safetyRequest({
    url:'services/eventService?wsdl',
    method:'post',
    data:data
  })
}
// 获取规则列表
export function getRuleList(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/strategyService?wsdl',
    method:'post',
    data:data
  })
}

// 删除规则
export function delIntegrityRule(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/strategyService?wsdl',
    method:'post',
    data:data
  })
}

// 添加规则列表
export function addRuleList(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/strategyService?wsdl',
    method:'post',
    data:data
  })
}
//登录安全设置-获取常用登录地（getLegalAreaList） ChenMei
export function exceptionGetAreas(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}

//登录安全设置-获取合法登录IP（getLegalIPList） ChenMei
export function exceptionGetIP(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}
//登录安全设置-获取登录时间（getLegalTimeList） ChenMei
export function exceptionGetTime(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}
//登录安全设置-获取登录账户（getLegalUserList） ChenMei
export function exceptionGetUser(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}

//登录安全设置-添加安全配置（addLegalConfig） ChenMei
export function exceptionAddLegal(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}


//登录安全设置-删除安全配置（deleteLegalConfig） ChenMei
export function exceptionDelLegal(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}

//登录安全设置-修改安全配置（setLegalConfig） ChenMei
export function legalConfigServer(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}

//单个服务器文件一致性（getIntegrityEventListByHostId） ChenMei
export function getIntegrityEventList(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/eventService?wsdl',
    method:'post',
    data:data
  })
}

//文件一致性-标记已处理按钮功能（remoteUpdateIntegrityEvent） ChenMei
export function updateIntegerityEventStatus(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/eventService?wsdl',
    method:'post',
    data:data
  })
}

//添加异地登录配置-获取省份（） ChenMei
export function getProvince(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}
//添加异地登录配置-获取城市（getCity） ChenMei
export function getCity(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}
//软件管理
export function softManage(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/softWareEventService?wsdl',
    method:'post',
    data:data
  })
}
//异常登陆--获取服务器
export function eventService(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/eventService?wsdl',
    method:'post',
    data:data
  })
}
// 修改规则
export function updateIntegrityRule(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/strategyService?wsdl',
    method:'post',
    data:data
  })
}

// 获取配置生效服务器列表
export function getHostListByRule(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/hostService?wsdl',
    method:'post',
    data:data
  })
}

export function useRule(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/hostService?wsdl',
    method:'post',
    data:data
  })
}

export function getToken(ser,paramStr){
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                      paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/indexService?wsdl',
    method:'post',
    data:data
  })
}

//计算机详情信息
export function agentDetails(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/hostService?wsdl',
    method:'post',
    data:data
  })
}

export function setEmail(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<Token>'+token+'</Token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/adminWebService?wsdl',
    method:'post',
    data:data
  })
}
export function IPcity(ser,paramStr) {
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://serviceImpl.api.ydadmin.cts.com/">' +
                '<soapenv:Header/>' +
                '<soapenv:Body>' +
                  '<ser:'+ser+'>' +
                    '<token>'+token+'</token>' + paramStr +
                  '</ser:'+ser+'>' +
                '</soapenv:Body>' +
              '</soapenv:Envelope>'
   return safetyRequest({
    url:'services/customService?wsdl',
    method:'post',
    data:data
  })
}