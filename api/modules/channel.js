import {
	req
} from '../../utils/req.js';
export default {
	// 渠道商下拉
	channelCateSelect(param) {
		return req.get("massage/app/IndexUser/channelCateSelect", param)
	},
	// 申请渠道商
	applyChannel(param) {
		return req.post("massage/app/IndexUser/applyChannel", param)
	},
	// 渠道商信息
	channelInfo(param) {
		return req.get("massage/app/IndexUser/channelInfo", param)
	},
	// 渠道商首页
	index(param) {
		return req.get("massage/app/IndexChannel/index", param)
	},
	// 渠道商二维码
	channelQr(param) {
		return req.get("massage/app/IndexChannel/channelQr", param)
	},
	// 订单列表
	orderList(param) {
		return req.get("massage/app/IndexChannel/orderList", param)
	}
}
