export default {
	ecmPathName:'云服务器列表',
	ecmButtonName:'创建云服务器',
	telnet:'远程登录',
	changeSpc:'升级',
	makeIms:'制作镜像',
	makeSnapshot:'创建快照',
	resetPw:'重置密码',
	reinstall:'一键重装',
	changeOs:'切换系统',
	getPwd:'获取密码',
	reback:'回滚',
	attachVolume:'挂载磁盘',
	imsUuid:'镜像Uuid',
	ReleaseStatus:'发布状态',
	imsSize:'镜像大小',
	imsSourece:'源',
	
	/*弹窗文字*/
	snapshotName:'快照名称',
	ecmName:'云服务器名称',
	systemName:'操作系统',
	snapshotId:'快照ID',
	refundOrder:'退订云服务器',

	/*操作提示*/
	actionStartTip:'确定要对以下云服务器进行开机操作吗',
	actionStopTip:'确定要对以下云服务器进行关机操作吗',
	actionStopTip2:'云服务器关机会导致未保存的文件丢失，请确保文件保存',
	actionRebootTip:'确定要对以下云服务器进行重启操作吗',
	actionRebootTip2:'重启前确保文件已保存',
	actionRenewTip:'以下云服务器将进行续订操作，续订将产生续订订单，请于48小时内支付订单，否则续订操作失败',
  telnetTip:'确定要对以下云服务器进行远程登录操作吗',
  resetPwTip:'确定要对以下云服务器进行重置密码操作吗',
	/*切换操作系统*/
	changeSpcTip:'以下云服务器将进行升级操作，升级将产生升级订单，请于48小时内支付订单，否则升级操作失败，数据将被清空，暂不支持降级操作，请谨慎进行操作升级',

	/*一键重装提示*/
	reinstallTip:'重装后IP地址不变，但系统盘会清空，所以请预先做好备份。</br>Linux系统下使用了LVM的用户，LVM如果加入了数据盘，请先从LVM卸载掉数据盘，再一键重装，否则会导致主机重装后无法使用。</br>',
	reinstallTip2:'每间隔2个小时只能重装一次',

	/*退订提示*/
	refundOrderTip:'在申请退订前，请做好主机数据备份工作，退订成功后，相关数据将不予保留。</br>退订成功后，仅返还现金支付金额。代金券支付部分，将不予返还。',

	/*创建快照提示*/
	snapshotTip:'快照功能仅用于应用迭代时使用',
	snapshot:'快照',
	makeSnapshotTip:'快照功能仅用于应用迭代时使用，不能用作数据备份，每台云服务器可以同时创建3份快照，每份快照建议创建后7天内删除，若超时一个月未删除会被系统自动删除',
	makeSnapshotTip2:'选择要制作快照的云服务器',
	rebackTip:'确认要回滚快照？',
	rebackTip2:'回滚快照后原有磁盘将被覆盖，请提前备份数据',
	deleteSnapshotTip:'确认要删除快照？',
	//验证规则提醒

	/*快照规则验证*/
	snapshotNameTip:'请输入快照名称',
	snapshotLengthTip:'长度在 2 到 16 个字符',
	ecmNameTip:'只能由数字、字母、-组成,不能以数字和-开头、以-结尾,且长度为2-63字符',
  bindingTip:'选择要绑定的弹性公网IP（已绑定的弹性公网IP不能绑定）',
  ipaddress:'IP地址',
  lastStartTime:'上次启动时间',
  runningTime:'稳定运行',


}
