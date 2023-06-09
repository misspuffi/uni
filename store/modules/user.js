import $util from "@/utils/index.js"
import $api from "@/api/index.js"
import $store from "@/store/index.js"
import {
	req
} from '@/utils/req.js';
export default {
	state: {
		autograph: '',
		userInfo: {},
		appLogin: '',
		loginType: '',
		loginPage: '',
		isGzhLogin: false,
		commonOptions: {},
		location: {},
		wxlocation: {},
		isShowAuth: true,
		mineInfo: {}, // 用户个人中心
		userPageType: 1, // 1用户，2技师
		coachInfo: {},
		haveShieldOper: 0
	},
	mutations: {
		//更新内容
		async updateUserItem(state, item) {
			let {
				key,
				val
			} = item
			if (key == 'userInfo' && val.id) {
				let {
					phone = '',
						create_time,
				} = val
				if (phone) {
					val.split_phone = phone.substring(0, 3) + '****' + phone.substring(7, 11)
				}
				val.create_date = $util.formatTime(create_time * 1000, 'YY-M-D')
			}

			if (key == 'mineInfo') {
				let {
					id: mine_id = -1
				} = val

				if (mine_id == -1) {
					let stoerArr = ['userInfo', 'location', 'appLogin', 'loginType', 'isShowLogin',
						'isGzhLogin'
					]
					stoerArr.map(key => {
						state[key] = key == 'isShowLogin' ? true : ''
						uni.setStorageSync(key, key == 'isShowLogin' ? true : '')
					})
				}
			}

			if (['autograph', 'userInfo', 'location', 'appLogin', 'loginType', 'isShowLogin', 'isGzhLogin']
				.includes(key)) {
				uni.setStorageSync(key, val)
			}

			state[key] = val
		}
	},
	actions: {
		//获取个人信息
		async getUserInfo({
			commit,
			state
		}, param) {
			let data = await $api.user.userInfo()
			commit('updateUserItem', {
				key: 'userInfo',
				val: data
			})
		},
		//获取用户个人中心数据
		async getMineInfo({
			commit,
			state
		}, param) {
			let data = await $api.mine.index()
			let {
				id = 0,
					fx_status
			} = data
			if (!id) {
				data = {
					id: -1
				}
			}
			let {
				fx_check = 0
			} = $store.state.config.configInfo
			data.is_fx = !fx_check || (fx_check && fx_status == 2)
			commit('updateUserItem', {
				key: 'mineInfo',
				val: data
			})
		},
		//获取技师信息
		async getCoachInfo({
			commit,
			state
		}, param) {
			let data = await $api.technician.coachInfo()
			commit('updateUserItem', {
				key: 'coachInfo',
				val: data
			})
		},
		// 获取用户信息
		async getAuthUserProfile({
			commit,
			state
		}, param) {
			let {
				nickName,
				avatarUrl
			} = param
			await $api.user.userUpdate(param)
			let data = Object.assign({}, state.userInfo, {
				nickName,
				avatarUrl
			})
			commit('updateUserItem', {
				key: 'userInfo',
				val: data
			})
		},
		// 获取手机号
		async getAuthPhone({
			commit,
			state
		}, {
			e = {
				detail: {}
			},
			must = false
		} = {}) {
			let {
				encryptedData = '', iv = ''
			} = e.detail;
			let phone = ''
			if (encryptedData && iv) {
				let phone = await $api.user.reportPhone({
					encryptedData,
					iv
				})
				let data = Object.assign({}, state.userInfo, {
					phone
				})
				commit('updateUserItem', {
					key: 'userInfo',
					val: data
				})
				return phone;
			}
		},
		// 更新公共参数
		async updateCommonOptions({
			commit,
			state
		}, param) {
			let target = {}
			if (param.scene) {
				let res = await $api.base.getWxCodeData({
					code_id: param.scene
				})
				target = Object.assign({}, state.commonOptions, res.data)
			} else {
				target = Object.assign({}, state.commonOptions, param)
			}
			let data = $util.pick(target, ['id', 'pid', 'coupon_atv_id', 'admin_id', 'channel_id', 'coach_id'])
			commit('updateUserItem', {
				key: 'commonOptions',
				val: data
			})
			return target
		}
	}
}
