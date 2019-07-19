// import i18nException from '@/lang/zh/exception'

export default function (error){
	let response = error.response;
	let data = response.data;
	let status = response.status;
	let code;
	if(data.password_is_wrong){
    	code = 'password_is_wrong'
	}
//	if(data.code==='VPC.0104'){
//	   code = data.code
//	}
	if(data.code && data.code !== 400){
		code = data.code
	}else if(data.code == 400 && data.errstatus){
		console.log(data.errstatus);
		code = data.errstatus;
	}
	console.log(code);
	let msg = i18nException[code] || data.msg;
	return msg
}
