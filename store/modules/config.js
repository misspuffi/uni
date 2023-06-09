import $api from "@/api/index.js"

export default {
	state: {
		configInfo: {
			id: 0,
			navBarHeight: uni.getSystemInfoSync().statusBarHeight * 1 + 44,
			isIos: uni.getSystemInfoSync().system.includes('iOS'),
			canIUseGetUserProfile: uni.getUserProfile ? true : false,
			refund_img: 'https://lbqny.migugu.com/paotui/errand.png',
			tabBar: [{
				id:1,
				name: '首页',
				default_img: 'iconshouye11',
				selected_img: 'iconshouye21'
			}, {
				id:2,
				name: '技师',
				default_img: 'iconanmo1',
				selected_img: 'iconanmo2'
			}, 
			{
				id:3,
				name: '动态',
				default_img: 'icon-dongtai1',
				selected_img: 'icon-dongtai2'
			}, 
			{
				id:4,
				name: '订单',
				default_img: 'icondingdan3',
				selected_img: 'icondingdan2'
			}, {
				id:5,
				name: '我的',
				default_img: 'iconwode1',
				selected_img: 'iconwode2'
			}],
			curSysHeight: '',
			tabbarHeight: '',
			methodObj: {
				1: 'call',
				2: 'miniProgram',
				3: 'web',
				4: 'navigateTo'
			},
			recommend_type: 1
		},
		plugAuth: {},
		audioBg: {},
		playBg: false,
		isHaveAudio: false
	},
	mutations: {
		//修改信息
		updateConfigItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
			if (key !== 'configInfo') return
			uni.setStorageSync('configInfo', val)
			let {
				countdown_voice
			} = val
			if (state.isHaveAudio) {
				state.audioBg.src = countdown_voice
				return
			}
			state.audioBg = uni.createInnerAudioContext();
			state.isHaveAudio = true
			state.audioBg.src = countdown_voice
			// #ifndef APP-PLUS
			state.audioBg.obeyMuteSwitch = false
			// #endif
			let play_method = [{
				method: 'onPlay',
				msg: '开始播放',
				status: true,
			}, {
				method: 'onStop',
				msg: '结束播放',
				status: false,
			}, {
				method: 'onError',
				msg: '报错Error',
				status: false,
			}, {
				method: 'onEnded',
				msg: '自然结束播放',
				status: false,
			}];
			play_method.map(item => {
				state.audioBg[item.method](() => {
					console.log('bg=>', item.msg)
					state.playBg = item.status;
				})
			})
		}
	},
	actions: {
		// 获取基本配置
		async getConfigInfo({
			commit,
			state
		}, param) {
			let config = await $api.base.configInfo()
			if (!config.primaryColor) {
				config.primaryColor = '#A40035'
			}
			if (!config.subColor) {
				config.subColor = '#F1C06B'
			}
			if (!config.user_image) {
				config.user_image = 'https://lbqny.migugu.com/admin/anmo/mine/bg.png'
			}
			if (!config.coach_image) {
				config.coach_image = 'https://lbqny.migugu.com/admin/anmo/mine/bg.png'
			}
			if (!config.service_btn_color) {
				config.service_btn_color = '#282B34'
			}
			if (!config.service_font_color) {
				config.service_font_color = '#EBDDB1'
			}
			if (!config.user_font_color) {
				config.user_font_color = '#ffffff'
			}
			if (!config.coach_font_color) {
				config.coach_font_color = '#ffffff'
			}
			let data = Object.assign({}, state.configInfo, config)
			commit('updateConfigItem', {
				key: 'configInfo',
				val: data
			})
		},
		// 获取插件授权
		async getPlugAuth({
			commit,
			state
		}, param) {
			let data = await $api.base.plugAuth()
			commit('updateConfigItem', {
				key: 'plugAuth',
				val: data
			})
		},
		toPlayAudio({
			commit,
			state
		}, param) {
			if (state.playBg) {
				state.audioBg.stop()
			}
			state.audioBg.play()
		}
	}
}
