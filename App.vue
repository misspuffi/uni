<script>
	import $api from "@/api/index.js"
	import $store from "@/store/index.js"
	export default {
		async mounted() {
			// #ifdef H5
			if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
				window.entryUrl = window.location.href.split('#')[0]
			}
			if (window.location.href.indexOf('?#') < 0) {
				window.location.href = window.location.href.replace("#", "?#");
			}
			// #endif
			console.log('App mounted')
		},
		async onLaunch() {
			let configInfo = uni.getStorageSync('configInfo') || ''
			if (configInfo) {
				$store.commit('updateConfigItem', {
					key: 'configInfo',
					val: configInfo
				})
			}
			let isGzhLogin = uni.getStorageSync('isGzhLogin') || ''
			$store.commit('updateUserItem', {
				key: 'isGzhLogin',
				val: isGzhLogin
			})
			let arr = ['autograph', 'userInfo', 'location', 'appLogin', 'loginType']
			arr.map(key => {
				let val = uni.getStorageSync(key) || ''
				// #ifdef H5
				val = isGzhLogin ? val : ''
				// #endif
				$store.commit('updateUserItem', {
					key,
					val
				})
				// #ifdef APP-PLUS
				if (key == 'userInfo') {
					$store.commit('updateUserItem', {
						key: 'isShowLogin',
						val: val && val.id ? false : true
					})
				}
				// #endif
			})
			let commonOptions = $store.state.user.commonOptions
			let {
				channel_id = 0,
					coach_id = 0
			} = commonOptions
			if (channel_id || coach_id) {
				commonOptions.channel_id = 0
				commonOptions.coach_id = 0
				$store.commit('updateUserItem', {
					key: 'commonOptions',
					val: commonOptions
				})
			}
			let {
				primaryColor = ''
			} = $store.state.config.configInfo
			if (primaryColor) return
			await this.getBaseConfig()
		},
		onShow() {
			uni.onNetworkStatusChange((res) => {
				let {
					isConnected
				} = res
				if (isConnected) return
				let methodArr = ['updateServiceItem', 'updateTechnicianItem']
				methodArr.map(item => {
					$store.commit(item, {
						key: 'pageActive',
						val: false
					})
				})
			})
		},
		onHide() {
			console.log('App Hide')
		},
		methods: {
			async getBaseConfig() {
				let config = await $api.base.getConfig()
				if (!config.primaryColor) {
					config.primaryColor = '#A40035'
				}
				if (!config.subColor) {
					config.subColor = '#F1C06B'
				}
				let configInfo = Object.assign({}, $store.state.config.configInfo, config)
				$store.commit('updateConfigItem', {
					key: 'configInfo',
					val: configInfo
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "/styles/index.wxss";

	/* #ifdef H5 */
	uni-page-head {
		display: none;
	}
	/* #endif */

	page {
		font-size: 28rpx;
		color: #222;
		line-height: 1.5;
		background: #F6F6F6;
		font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
	}

	input {
		// font-family: PingFangSC-Medium, PingFang SC, -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
	}

	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #A9A9A9;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #A9A9A9;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #A9A9A9;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #A9A9A9;
	}

	view {
		box-sizing: border-box;
	}

	image {
		display: block;
	}

	.h5-image {
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	/*隐藏滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	/* #ifdef MP-BAIDU */
	.swan-button.swan-button-radius-ios {
		border-radius: 0;
	}

	/* #endif */
</style>
