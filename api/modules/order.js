import {
	req
} from '../../utils/req.js';
export default {
	// 购物车
	carInfo(param) {
		return req.get("massage/app/Index/carInfo", param)
	},
	// 加入购物车
	addCar(param) {
		return req.post("massage/app/Index/addCar", param)
	},
	// 删除购物车数量
	delCar(param) {
		return req.post("massage/app/Index/delCar", param)
	},
	//清空购物车
	delSomeCar(param) {
		return req.post("massage/app/IndexGoods/delSomeCar", param)
	},
	//选择购物车商品
	carUpdate(param) {
		return req.post("massage/app/IndexGoods/carUpdate", param)
	},
	//获取是否能选择 公交/地铁
	getIsBus(param) {
		return req.get("massage/app/IndexOrder/getIsBus", param)
	},
	//下单选择时间
	dayText(param) {
		return req.get("massage/app/IndexOrder/dayText", param)
	},
	//下单选择时间(coach_id,day)
	timeText(param) {
		return req.get("massage/app/IndexOrder/timeText", param)
	},
	//获取升级订单信息
	upOrderInfo(param) {
		return req.post("massage/app/IndexOrder/upOrderInfo", param)
	},
	//升级服务下单
	upOrderGoods(param) {
		return req.post("massage/app/IndexOrder/upOrderGoods", param)
	},
	//获取下单信息(coach_id，有卡券就传 coupon_id)
	payOrderInfo(param) {
		return req.get("massage/app/IndexOrder/payOrderInfo", param)
	},
	//下单
	payOrder(param) {
		return req.post("massage/app/IndexOrder/payOrder", param)
	},
	//可用卡券
	couponList(param) {
		return req.get("massage/app/IndexOrder/couponList", param)
	},
	//订单列表
	orderList(param) {
		return req.get("massage/app/IndexOrder/orderList", param)
	},
	//订单详情
	orderInfo(param) {
		return req.get("massage/app/IndexOrder/orderInfo", param)
	},
	// 升级订单记录
	orderUpRecord(param) {
		return req.get("massage/app/IndexOrder/orderUpRecord", param)
	},
	//刷新二维码
	refreshQr(param) {
		return req.post("massage/app/IndexOrder/refreshQr", param)
	},
	//取消订单
	cancelOrder(param) {
		return req.post("massage/app/IndexOrder/cancelOrder", param)
	},
	//删除订单
	delOrder(param) {
		return req.post("massage/app/IndexOrder/delOrder", param)
	},
	//确认完成订单
	userSignOrder(param) {
		return req.post("massage/app/IndexOrder/userSignOrder", param)
	},
	//重新支付
	rePayOrder(param) {
		return req.post("massage/app/IndexOrder/rePayOrder", param)
	},
	//申请退款
	applyOrder(param) {
		return req.post("massage/app/IndexOrder/applyOrder", param)
	},
	//再来一单
	onceMoreOrder(param) {
		return req.post("massage/app/Index/onceMoreOrder", param)
	},
	//添加评价(order_id,text，star)
	addComment(param) {
		return req.post("massage/app/IndexOrder/addComment", param)
	},
	//标签列表
	lableList(param) {
		return req.get("massage/app/IndexOrder/lableList", param)
	},
	//我的售后
	refundOrderList(param) {
		return req.get("massage/app/IndexOrder/refundOrderList", param)
	},
	//售后详情
	refundOrderInfo(param) {
		return req.get("massage/app/IndexOrder/refundOrderInfo", param)
	},
	//取消退款
	cancelRefundOrder(param) {
		return req.post("massage/app/IndexOrder/cancelRefundOrder", param)
	},
}
