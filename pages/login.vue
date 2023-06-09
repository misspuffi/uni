<template>
	<view class="pages-user-login" v-if="isLoad">
		<view class="page-height flex-center flex-column">

			<!-- #ifdef H5 -->
			<view class="logo-img mb-md">
				<view class="h5-image logo-img" :style="{ backgroundImage : `url('${configInfo.app_logo}')`}">
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<image mode="aspectFill" lazy-load class="logo-img mb-md" :src="configInfo.app_logo"></image>
			<!-- #endif -->

			<view class="f-caption c-caption">{{configInfo.app_text}}</view>
			<view style="height: 200rpx;"></view>
			<view @tap.stop="toChooseLogin('weixin')" class="login-btn wechat flex-center f-title c-base radius" :style="{
			background: `linear-gradient(90deg, ${primaryColor} 0%, ${subColor} 99%)`}"><i
					class="iconfont icon-weixin mr-md"></i>微信登录
			</view>
			<!-- #ifdef APP-PLUS -->
			<view @tap.stop="toChooseLogin('apple')" class="login-btn apple flex-center f-title c-black radius"
				v-if="is_ios_login"><i class="iconfont icon-apple mr-sm"></i>Sign in with Apple
			</view>
			<!-- #endif -->
		</view>

		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">温馨提示</view>				
				<view class="f-desc c-title mt-lg">
					登录即表示您已详细阅读并同意<span @tap.stop="$util.goUrl({url:`/user/pages/protocol`})"
						:style="{color:primaryColor}">
						《用户隐私协议》
					</span>与<span @tap.stop="$util.goUrl({url:`/user/pages/information`})"
						:style="{color:primaryColor}">
						《个人信息保护指引》
					</span>
				</view>
				<view class="button">
					<view @tap.stop="$refs.show_rule_item.close()" class="item-child">取消</view>
					<view @tap.stop="toConfirm" class="item-child" :style="{background: primaryColor,color:'#fff'}">确定
					</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	import siteInfo from '@/siteinfo.js';
	export default {
		components: {},
		data() {
			return {
				isLoad: false,
				is_ios_login: false
			}
		},
		async onLoad(options) {
			let [syserr, sysinfo] = await uni.getSystemInfo()
			let {
				browserVersion = '',
					platform
			} = sysinfo
			this.is_ios_login = platform === 'ios' && browserVersion.split('.')[0] * 1 > 12
			if (!this.configInfo.id) {
				await this.getConfigInfo()
			}
			this.isLoad = true
		},
        
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
			autograph: state => state.user.autograph,
			appLogin: state => state.user.appLogin,
			loginType: state => state.user.loginType,
			loginPage: state => state.user.loginPage,
			userInfo: state => state.user.userInfo,
		}),
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations(['updateConfigItem', 'updateUserItem', 'updateOrderItem']),
			toChooseLogin(type) {
				this.updateUserItem({
					key: 'loginType',
					val: type
				})
				this.$refs.show_rule_item.open()
			},


			toConfirm() {
				this.$refs.show_rule_item.close()
				// #ifdef H5
				this.toGzhLogin()
				// #endif	
				// #ifdef APP-PLUS
                this.toAppLogin()
					
				// #endif
			},
			
			// 公众号登录
			async toGzhLogin() {
				let {
					siteroot,
					gzh_appid
				} = siteInfo
				this.updateUserItem({
					key: 'isGzhLogin',
					val: true
				})
				this.updateUserItem({
					key: 'autograph',
					val: ''
				})
				this.updateUserItem({
					key: 'commonOptions',
					val: this.commonOptions
				})
				let {
					loginPage
				} = this
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#${loginPage}`
				let pageUrl = window.location.href;
				let redirect_uri = encodeURIComponent(href)
				let authUrl =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gzh_appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`;
				window.location.href = authUrl
			},
			//APP登录
			async toAppLogin() {
				this.$refs.show_rule_item.close()
				let {
					loginType: provider
				} = this

				try {
					let [providerErr, providerData] = await uni.getProvider({
						service: 'oauth',
					});
					if (providerErr) {
						this.$util.showToast({
							title: providerErr
						})
						return
					}
					let [loginErr, loginData] = await uni.login({
						provider
					});
					if (loginErr) {
						this.$util.showToast({
							title: loginErr
						})
						return
					}
					let [infoErr, infoData] = await uni.getUserInfo({
						provider
					})
					if (infoErr) {
						this.$util.showToast({
							title: infoErr
						})
						return
					}

					let {
						userInfo = {}
					} = infoData
					let {
						openId = ''
					} = userInfo
					if (!openId) return
					this.$util.showLoading({
						title: "登录中..."
					})
					try {
						let param = {
							type: provider == 'weixin' ? 2 : 3,
							param: {
								data: userInfo
							},
							init: 1
						}
						this.toConfirmLogin(param)
					} catch (e) {
						this.$util.hideAll()
					}
				} catch (e) {
					this.$util.showToast({
						title: `没有获取到用户信息，请确认已登录`
					});
				}
			},
			async toConfirmLogin(login_params) {
				let {
					loginType
				} = this

				let {
					type,
					param,
					init = 0
				} = login_params

				let methodType = {
					1: 'webLogin',
					2: 'appLogin',
					3: 'iosLogin'
				}

				let methodModel = methodType[type]
				let user_info = await this.$api.base[methodModel](param)
				if (init == 1) {
					this.updateUserItem({
						key: 'appLogin',
						val: param.data
					})
				}
				let {
					autograph,
					data
				} = user_info
				this.$util.hideAll()
				this.updateUserItem({
					key: 'isShowLogin',
					val: false
				})
				this.updateUserItem({
					key: 'userInfo',
					val: data
				})
				this.updateUserItem({
					key: 'autograph',
					val: autograph
				})

				let {
					phone = ''
				} = data

				let {
					short_code_status = 0
				} = this.configInfo

				let isToPhone = loginType == 'weixin' && short_code_status && !phone
				let url = isToPhone ? `/user/pages/phone` : this.loginPage || `/pages/service`
				let pageArr = ['/pages/service', '/pages/technician', '/pages/order', '/pages/mine']
				let openType = isToPhone || pageArr.includes(url) ? `reLaunch` : `navigateBack`
				this.$util.goUrl({
					url: (isToPhone || pageArr.includes(url)) ? url : 1,
					openType
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		height: 100%;
	}

	.pages-user-login {

		.page-height {
			height: 100vh;
		}

		.logo-img {
			width: 160rpx;
			height: 160rpx;
		}


       /* .checkbox {
			width: 92%;
			//margin: 20upx auto;
			font-size: 28upx;
	
			.user {
				color: #0096FF;
			}
		} */

		.login-btn {
			width: 220pt;
			height: 44pt;
			font-size: 15pt;
			border: 1rpx solid #000;
			transform: rotateZ(360deg);

			.iconfont {
				font-size: 19pt;
			}
		}

		.wechat {
			border: none;
			font-size: 13pt;
			box-shadow: 0 18rpx 9rpx 0 rgba(0, 188, 82, 0.07);
		}

		.apple {
			margin-top: 40rpx;
		}

		.banner-info {
			width: 100%;

			.banner-img {
				width: 100%;
				height: 100%;
			}

			.swiper-to-home {
				width: 122rpx;
				height: 47rpx;
				z-index: 999;
				right: 40rpx;
				top: 80rpx;
				background: rgba(0, 0, 0, 0.3);
			}
		}
	}
</style>
