import {
	req
} from '../../utils/req.js';
export default {
	// 个人中心页面
	index(param) {
		return req.get("massage/app/IndexUser/index", param)
	},
	// 认证技师
	attestationCoach(param) {
		return req.post("massage/app/IndexUser/attestationCoach", param)
	},
	//申请分销商
	applyReseller(param) {
		return req.post("massage/app/IndexUser/applyReseller", param)
	},
	//申请商户
	applyDl(param) {
		return req.post("massage/app/IndexUser/applyDl", param)
	},
	//分销商详情
	resellerInfo(param) {
		return req.get("massage/app/IndexUser/resellerInfo", param)
	},
	//我的收益
	capCashInfo(param) {
		return req.get("massage/app/IndexUser/userCashInfo", param)
	},
	//申请提现
	applyWallet(param) {
		return req.post("massage/app/IndexUser/applyWallet", param)
	},
	//提现记录
	walletList(param) {
		return req.get("massage/app/IndexUser/walletList", param)
	},
	//我的团队
	myTeam(param) {
		return req.get("massage/app/IndexUser/myTeam", param)
	},
	//技师列表
	myTechnician(param) {
		return req.get("massage/app/IndexUser/myTechnician", param)
	},
	// 商户信息-分销商信息
	shanghuInfo(param) {
		return req.get("massage/app/IndexUser/shanghuInfo", param)
	},
	// 订单-分销商订单
	shanghuOrder(param) {
		return req.get("massage/app/IndexUser/shanghuOrder", param)
	},
		
	//我的团队
	userCommQr(param) {
		return req.get("massage/app/IndexUser/userCommQr", param)
	},
	//绑定及技师
	adminCoachQr(param) {
		return req.get("massage/app/IndexUser/adminCoachQr", param)
	},
	// 获取默认地址
	getDefultAddress(param) {
		return req.get("massage/app/IndexUser/getDefultAddress", param)
	},
	// 地址列表
	addressList(param) {
		return req.get("massage/app/IndexUser/addressList", param)
	},
	// 地址详情
	addressInfo(param) {
		return req.get("massage/app/IndexUser/addressInfo", param)
	},
	// 新增地址
	addressAdd(param) {
		return req.post("massage/app/IndexUser/addressAdd", param)
	},
	// 修改地址
	addressUpdate(param) {
		return req.post("massage/app/IndexUser/addressUpdate", param)
	},
	// 删除地址
	addressDel(param) {
		return req.post("massage/app/IndexUser/addressDel", param)
	},
	// 收藏技师
	coachCollectList(param) {
		return req.get("massage/app/IndexUser/coachCollectList", param)
	},
	// 新增收藏
	addCollect(param) {
		return req.post("massage/app/IndexUser/addCollect", param)
	},
	// 删除收藏
	delCollect(param) {
		return req.post("massage/app/IndexUser/delCollect", param)
	},
	//卡券列表
	userCouponList(param) {
		return req.get("massage/app/IndexUser/userCouponList", param)
	},
	//删除卡券
	couponDel(param) {
		return req.post("massage/app/IndexUser/couponDel", param)
	},
	//卡券活动
	couponAtvInfo(param) {
		return req.post("massage/app/IndexUser/couponAtvInfo", param)
	},
	//卡券二维码
	atvQr(param) {
		return req.post("massage/app/IndexUser/atvQr", param)
	},
	//技师分享储值套餐
	coachBalanceQr(param) {
		return req.get("massage/app/IndexCoach/coachBalanceQr", param)
	},
	//储值充值卡列表
	cardList(param) {
		return req.get("massage/app/IndexBalance/cardList", param)
	},
	//充值余额(card_id)
	payBalanceOrder(param) {
		return req.post("massage/app/IndexBalance/payBalanceOrder", param)
	},
	//充值订单列表(时间筛选 start_time,end_time)
	balaceOrder(param) {
		return req.get("massage/app/IndexBalance/balaceOrder", param)
	},
	//消费明细
	payWater(param) {
		return req.get("massage/app/IndexBalance/payWater", param)
	},
	//佣金明细
	commList(param) {
		return req.get("massage/app/IndexUser/commList", param)
	},
	// 提交反馈
	addFeedback(param) {
		return req.post("massage/app/IndexCoach/addFeedback", param)
	},
	// 反馈记录
	listFeedback(param) {
		return req.get("massage/app/IndexCoach/listFeedback", param)
	},
	// 反馈详情 
	feedbackInfo(param) {
		return req.get("massage/app/IndexCoach/feedbackInfo", param)
	},
	// 屏蔽列表
	shieldCoachList(param) {
		return req.get("massage/app/IndexUser/shieldCoachList", param)
	},
	// 新增屏蔽
	shieldCoachAdd(param) {
		return req.post("massage/app/IndexUser/shieldCoachAdd", param)
	},
	// 删除屏蔽
	shieldCoachDel(param) {
		return req.post("massage/app/IndexUser/shieldCoachDel", param)
	},
}
