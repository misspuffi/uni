import {
	req
} from '../../utils/req.js';
export default {
	// 申请技师
	coachApply(param) {
		return req.post("massage/app/IndexUser/coachApply", param)
	},
	// 技师信息
	coachInfo(param) {
		return req.get("massage/app/IndexUser/coachInfo", param)
	},
	// 编辑技师
	coachUpdate(param) {
		return req.post("massage/app/IndexCoach/coachUpdate", param)
	},
	// 编辑技师
	coachUpdateV2(param) {
		return req.post("massage/app/IndexCoach/coachUpdateV2", param)
	},
	// 技师等级
	coachLevel(param) {
		return req.get("massage/app/IndexCoach/coachLevel", param)
	},
	// 技师首页
	coachIndex(param) {
		return req.get("massage/app/IndexCoach/coachIndex", param)
	},
	// 技师报警
	police(param) {
		return req.post("massage/app/IndexCoach/police", param)
	},
	// 订单列表
	orderList(param) {
		return req.get("massage/app/IndexCoach/orderList", param)
	},
	// 订单详情
	orderInfo(param) {
		return req.get("massage/app/IndexCoach/orderInfo", param)
	},
	// 修改订单状态(type,order_id)
	updateOrder(param) {
		return req.post("massage/app/IndexCoach/updateOrder", param)
	},
	//佣金信息
	capCashInfo(param) {
		return req.get("massage/app/IndexCoach/capCashInfo", param)
	},
	//佣金信息（车费）
	capCashInfoCar(param) {
		return req.get("massage/app/IndexCoach/capCashInfoCar", param)
	},
	//申请提现 (apply_price,text,type：1服务费提现，2车费提现)
	applyWallet(param) {
		return req.post("massage/app/IndexCoach/applyWallet", param)
	},
	//提现记录
	capCashList(param) {
		return req.get("massage/app/IndexCoach/capCashList", param)
	},
	//时间管理回显
	timeConfig(param) {
		return req.get("massage/app/IndexCoach/timeConfig", param)
	},
	//时间管理设置
	setTimeConfig(param) {
		return req.post("massage/app/IndexCoach/timeConfig", param)
	},
	uploadFaceVideo(param) {
		return req.post("massage/app/IndexCoach/uploadFaceVideo", param)
	},
	setFaceCheck(param) {
		return req.post("massage/app/IndexCoach/setFaceCheck", param)
	},
	//根据接单时间获取时间节点
	getTime(param) {
		return req.get("massage/app/IndexCoach/getTime", param)
	},
	//根据接单时间获取时间节点
	getOrderNum(param) {
		return req.get("massage/app/IndexCoach/getOrderNum", param)
	},
	//物料商城-商品列表
	goodsList(param) {
		return req.get("massage/app/IndexCoach/goodsList", param)
	},
	//物料商城-分类列表
	carteList(param) {
		return req.get("massage/app/IndexCoach/carteList", param)
	},
	//物料商城-商品详情
	goodsInfo(param) {
		return req.get("massage/app/IndexCoach/goodsInfo", param)
	},
	//车费明细列表
	carMoneyList(param) {
		return req.get("massage/app/IndexCoach/carMoneyList", param)
	},
	//差评申诉 订单列表
	appealOrder(param) {
		return req.get("massage/app/IndexCoach/appealOrder", param)
	},
	//差评申诉 提交申诉
	addAppeal(param) {
		return req.post("massage/app/IndexCoach/addAppeal", param)
	},
	//差评申诉 申诉记录列表
	appealList(param) {
		return req.get("massage/app/IndexCoach/appealList", param)
	},
	//拉黑
	addBlack(param) {
		return req.post("massage/app/IndexCoach/addBlack", param)
	},
	//更新拉黑
	updateBlack(param) {
		return req.post("massage/app/IndexCoach/updateBlack", param)
	},
	//拉黑列表
	blackList(param) {
		return req.get("massage/app/IndexCoach/blackList", param)
	},
	coachOrder(param) {
		return req.get("massage/app/IndexCoach/coachOrder", param)
	},
	//标签列表
	labelList(param) {
		return req.get("massage/app/IndexCoach/labelList", param)
	},
	//添加用户评价
	userLabelAdd(param) {
		return req.post("massage/app/IndexCoach/userLabelAdd", param)
	},
	//获取用户当前标签
	userLabelList(param) {
		return req.get("massage/app/IndexCoach/userLabelList", param)
	},
}
