

//密码复杂程度验证
export function analyzePasswordSecurityLevel(password,length) {
    var securityLevelFlag = 0;
    if (password.length < (length || 6)) {
        return 0;
    }
    else {
        if (/[a-z]/.test(password)){
            securityLevelFlag++;    //lowercase
        }
        if (/[A-Z]/.test(password)){
            securityLevelFlag++;    //uppercase
        } 
        if(/[0-9]/.test(password)){
            securityLevelFlag++;    //digital
        }
        if(containSpecialChar(password)){
            securityLevelFlag++;    //specialcase
        }
        return securityLevelFlag;
    }
}

function containSpecialChar(str)   
{   
    var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
    return (containSpecial.test(str));   
}

//vpc 各种检测

//ip地址合法检测
export function ipValidatorSelf(ip){
	let data, i;
	try {
		data = ip.split(".");
		if (4 == data.length) {
			for (i = 0; i < 4; i++)
				if ("" === data[i] || data[i] !== "" + parseInt(data[i])) return !1;
			return !0
		}
		return !1
	} catch (e) {
		return !1
	}
	
}
//掩码转换
export function prefix2mask(prefix){
	let i, j, mask, k, value, maskBits = "";
	for (i = 0; i < prefix; i++) maskBits += "1";
	for (j = prefix; j < 32; j++) maskBits += "0";
	mask = "";
	for (k = 0; k < 32; k += 8) {
		value = parseInt(maskBits.substr(k, 8), 2);
		mask += value;
		k < 24 && (mask += ".")
	}
	return mask
}
//校验掩码和IP合法
export function maskAndSubnetValidator(mask,ip){
	let maskData, ipData;
	try {
		maskData = mask.split(".");
		ipData = ip.split(".");
		return (parseInt(ipData[0]) & parseInt(maskData[0])) === parseInt(ipData[0]) && (parseInt(ipData[1]) & parseInt(maskData[1])) === parseInt(ipData[1]) && (parseInt(ipData[2]) & parseInt(maskData[2])) === parseInt(ipData[2]) && (parseInt(ipData[3]) & parseInt(maskData[3])) === parseInt(ipData[3])
	} catch (e) {
		console.log(e)
		return !1
	}
}
//子网检查
export function subnetValidator(mask,ip,cidr){
	let ipData,maskData,subnetData;
	try {
		ipData = ip.split(".");
		maskData = mask.split(".");
		subnetData = cidr.split(".");
		return (parseInt(ipData[0]) & parseInt(maskData[0])) === parseInt(subnetData[0]) && (parseInt(ipData[1]) & parseInt(maskData[1])) === parseInt(subnetData[1]) && (parseInt(ipData[2]) & parseInt(maskData[2])) === parseInt(subnetData[2]) && (parseInt(ipData[3]) & parseInt(maskData[3])) === parseInt(subnetData[3])
	} catch (e) {
		console.log(e)
		return !1
	}
}
//网关检查
export function broadcastValidator(subnet, prefix, ip){
	 var subnetOf2, preStr, i, broadcastId, k, value;
    try {
        subnetOf2 = (parseInt(subnet.split(".")[0]) + 256).toString(2).substring(1) + (parseInt(subnet.split(".")[1]) + 256).toString(2).substring(1) + (parseInt(subnet.split(".")[2]) + 256).toString(2).substring(1) + (parseInt(subnet.split(".")[3]) + 256).toString(2).substring(1);
        preStr = subnetOf2.split("");
        for (i = parseInt(prefix); i < preStr.length; i++)
            preStr[i] = "1";
        preStr = preStr.join("");
        broadcastId = "";
        for (k = 0; k < 32; k += 8) {
            value = parseInt(preStr.substr(k, 8), 2);
            broadcastId += value;
            k < 24 && (broadcastId += ".")
        }
        return broadcastId != ip
    } catch (e) {
        return !1
    }
}

//ip转换
export function getIpValue(inputIp){
	let inputIps, inputIpValue, i;
	if (!inputIp) return 0;
	inputIps = inputIp.split(".");
	if (4 !== inputIps.length) return !1;
	inputIpValue = 0;
	for (i = 0; i < 4; i++) inputIpValue = 256 * inputIpValue + parseInt(inputIps[i], 10);
	return inputIpValue
}
//ip转换
export function ipValue2Str(ipValue) {
	let i, ipStr = "",
		dividend = 16777216;
	for (i = 0; i < 4; i++) {
		ipStr = 0 === i ? ipStr : ipStr + ".";
		ipStr += parseInt(ipValue / dividend);
		ipValue -= parseInt(ipValue / dividend) * dividend;
		dividend /= 256
	}
	return ipStr
}
//云硬盘正则
export function nameRule(name) {
	let nameRule = /[\u4E00-\u9FA5]+/;
	return nameRule.test(name)
}
/*安全组端口 检测*/
export function digitReg(port){
	let digitReg = /^(0|[1-9][0-9]*)(-(0|[1-9][0-9]*))?$/;
	return digitReg.test(port);
}
/*安全组掩码检测*/
export function maskReg(mask){
	let maskReg = /^([0-9]|[1-2][0-9]|3[0-2])$/;
	return maskReg.test(mask)
}

/*安全组IP检测 及 掩码检测*/
export function secMaskCheck(ip,mask){
	let i, tmp, tail, k, maskBinary, f, j, m, ipBit, maskBit, ips,
		ipBinary = "",
		ipLen = 4,
		totalBits = 8;
	ips = ip.split(".");
	mask = parseInt(mask, 10);
	for (i = 0; i < ipLen; i++) {
		tmp = parseInt(ips[i], 10).toString(2);
		tail = "";
		if (tmp.length < totalBits)
			for (k = 0; k < totalBits - tmp.length; k++) tail += "0";
		tmp = tail + tmp;
		ipBinary += tmp
	}
	maskBinary = "";
	f = 0;
	for (; f < mask; f++) maskBinary += "1";
	for (j = f; j < 32; j++) maskBinary += "0";
	for (m = 0; m < 32; m++) {
		ipBit = parseInt(ipBinary[m], 10);
		maskBit = parseInt(maskBinary[m], 10);
		if (ipBit !== (ipBit && maskBit)) return !1
	}
	return !0
}
