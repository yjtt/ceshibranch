import Cookies from 'js-cookie'

const TokenKey = 'csrftoken'
const SafetyToken = 'safetytoken'
const SafetyUsername = 'admin'
const SafetyUserid = ''

const ReginonId = 'regionid'
const ZoneId = 'zoneid'
const Vnc = 'hasVnc'
const RegionType = 'regionType'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 存云安全token
export function setsafetyToken(token) {
  return Cookies.set(SafetyToken, token)
}
export function setsafetyUsername(token) {
  return Cookies.set(SafetyUsername, token)
}
export function setsafetyUserid(token) {
  return Cookies.set(SafetyUserid, token)
}
// 取云安全token
export function getsafetyToken() {
  return Cookies.get(SafetyToken)
}
export function getsafetyUsername() {
  return Cookies.get(SafetyUsername)
}
export function getsafetyUserid() {
  return Cookies.get(SafetyUserid)
}


export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRegionId(uuid){
	return localStorage.setItem(ReginonId,uuid)
}

export function getRegionId(){
	return localStorage.getItem(ReginonId)
}

export function SetZoneId(zoneid){
	return localStorage.setItem(ZoneId,zoneid)
}

export function getZoneId(){
	return localStorage.getItem(ZoneId)
}

export function GetVnc(){
	return localStorage.getItem(Vnc)
}
export function SetVnc(hasVnc){
	return localStorage.setItem(Vnc,hasVnc)
}

export function SetRegionType(type){
	return localStorage.setItem(RegionType,type)
}
export function getRegionType(){
	return localStorage.getItem(RegionType)
}
export function setRoute(route){
  return localStorage.setItem('route',route)
}
export function getRoute(){
  return localStorage.getItem('route')
}
