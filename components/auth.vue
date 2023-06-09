<template>
	<view style="width:100%">
		<block v-if="needAuth">
			<view @tap.stop="toShowAuth">
				<slot></slot>
			</view>
		</block>
		<block v-else>
			<view @tap.stop="go(1)">
				<slot></slot>
			</view>
		</block>

		<uni-popup ref="show_auth_item" :maskClick="false">
			<view @tap.stop.prevent class="auth-box fill-base flex-column flex-center text-center radius-26">
				<view class="space-md"></view>
				<block v-if="pType === 'userInfo'">
					<view class="flex-center pd-lg">
						<view class="auth-info" style="overflow: hidden;">
							<open-data class="auth-info" type="userAvatarUrl"></open-data>
						</view>
						<veiw class="auth-info flex-center" style="background:white;padding: 0rpx 40rpx;">
							<i class="iconfont icon-zhuanhuan" style="font-size:40rpx;color:#999"></i>
						</veiw>
						<view class="auth-info flex-center" :style="{backgroundColor:primaryColor}">
							<i class="iconfont icon-xiaochengxu c-base" style="font-size:40rpx;"></i>
						</view>
					</view>
				</block>
				<block v-if="pType == 'phone'">
					<image class="auth-img" :src="`https://lbqny.migugu.com/admin/public/auth.png`">
					</image>
				</block>
				<view class="space-sm"></view>
				<view class="f-caption" :style="{color:primaryColor}">{{contentList[pType][0]}}</view>
				<view class="space-lg"></view>
				<view class="space-lg"></view>
				<block v-if="pType === 'userInfo'">
					<button @tap.stop="authUserProfile" hover-class="btn-hover" class="clear-btn flex-center auth-btn"
						:style="{backgroundColor:primaryColor,color:'white'}">{{btn_text||contentList[pType][1]}}</button>
				</block>
				<block v-if="pType === 'phone'">
					<button open-type="getPhoneNumber" hover-class="btn-hover" @getphonenumber="authPhone"
						class="clear-btn flex-center auth-btn" :style="{backgroundColor:primaryColor,color:'white'}">
						{{btn_text||contentList[pType][1]}}
					</button>
				</block>
				<block v-if="pType === 'setting'">
					<button open-type="openSetting" hover-class="btn-hover" @opensetting="openSetting"
						class="clear-btn flex-center auth-btn" :style="{backgroundColor:primaryColor,color:'white'}">
						{{btn_text||contentList[pType][1]}}
					</button>
				</block>
				<view @tap.stop="go(pType == 'phone' &&  !userInfo.phone ? 2 :  1)" class="f-caption c-caption mt-md"
					v-if="!pMust">{{pType=='userInfo'?'暂不授权':'暂不登录'}}</view>
				<view class="space-md"></view>
			</view>
		</uni-popup>


		<uni-popup ref="show_phone_item" :maskClick="false">
			<view @tap.stop.prevent class="common-popup-content popup-phone pd-lg flex-center flex-column fill-base">
				<view class="f-md-title c-black">请输入手机号</view>
				<view class="space-lg pb-lg"></view>
				<view class="space-lg pb-lg"></view>
				<view class="flex-center mb-lg">
					<view class="input-info sm mr-md radius-16">
						<input v-model="subForm.phone" type="number"
							class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title"
							placeholder-class="c-placeholder" :placeholder="rule[0].errorMsg" />
					</view>
					<view @tap="toSend" class="send-btn flex-center c-base radius-16"
						:style="{background:primaryColor}">
						{{authTime>0?`(${authTime}s)`:'发送'}}
					</view>
				</view>
				<view class="input-info radius-16">
					<input v-model="subForm.short_code" type="number"
						class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title" maxlength="6"
						placeholder-class="c-placeholder" :placeholder="rule[1].errorMsg" />
				</view>
				<view class="button">
					<view @tap.stop="go(3)" class="item-child">
						取消
					</view>
					<view @tap.stop="submit" class="item-child" :style="{background: primaryColor,color:'#fff'}">
						确定
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
		mapMutations,
	} from "vuex"
	export default {
		components: {},
		name: 'auth',
		props: {
			needAuth: {
				type: Boolean,
				default () {
					return false
				}
			},
			must: {
				type: Boolean,
				default () {
					return false
				}
			},
			userMust: {
				type: Boolean,
				default () {
					return true
				}
			},
			showAuth: {
				type: Boolean,
				default () {
					return false
				}
			},
			type: {
				type: String,
				default () {
					return 'phone'
				}
			},
			btn_text: {
				type: String,
				default () {
					return ''
				}
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
			userInfo: state => state.user.userInfo,
		}),
		created() {
			this.init();
		},
		data() {
			return {
				contentList: {
					userInfo: ['尊贵的用户，获取授权是为了能更好的为你服务', '立即授权'],
					phone: ['尊贵的用户，登录后我们才能更好的为你服务', '立即登录'],
					setting: ['为了功能正常使用，你需要打开设置并开启获取相应权限', '打开设置'],
				},
				pType: '',
				pMust: '',
				authTime: 0,
				timer: null,
				subForm: {
					phone: '',
					short_code: ''
				},
				rule: [{
					name: "phone",
					checkType: "isMobile",
					errorMsg: "请输入手机号",
					regText: "手机号"
				}, {
					name: "short_code",
					checkType: "isNotNull",
					errorMsg: "请输入短信验证码",
					regText: "短信验证码"
				}],
				lockTap: false
			}
		},
		methods: {
			...mapActions(['getUserInfo', 'getMineInfo', 'getAuthUserProfile', 'getAuthPhone', ]),
			...mapMutations(['updateConfigItem']),
			init() {
				let {
					type,
					must,
					showAuth
				} = this
				this.$set(this, 'pType', type)
				this.$set(this, 'pMust', must)
				if (!showAuth) return
				this.$refs.show_auth_item.open()
			},
			async authPhone(e) {
				let {
					pMust
				} = this
				let phone = await this.getAuthPhone({
					e,
				})
				if (!phone) {
					this.go(pMust ? 2 : 1)
					return false
				} else {
					let {
						nickName = '',
					} = this.userInfo
					if (nickName) {
						this.go(1)
						return
					}
					this.$set(this, 'pType', 'userInfo')
					this.$set(this, 'pMust', this.userMust)
					if (!this.pMust) return
					this.$refs.show_auth_item.open()
				}
			},
			async authUserProfile(e) {
				// #ifdef APP-PLUS
				uni.getUserInfo({
					provider: 'weixin',
					success: res => {
						let {
							userInfo = {}
						} = res
						this.toUpdateUserInfo(userInfo)
					}
				})
				// #endif
				// #ifndef APP-PLUS
				uni.getUserProfile({
					desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						let {
							userInfo = {},
								encryptedData,
								iv,
						} = res
						let param = Object.assign({}, userInfo, {
							encryptedData,
							iv,
						});
						this.toUpdateUserInfo(param)
					},
					fail: (res) => {
						this.toUpdateUserInfo()
					}
				})
				// #endif
			},
			async toUpdateUserInfo(userInfo = {}) {
				let {
					pMust
				} = this
				if (userInfo.nickName) {
					let {
						coupon_atv_id = 0
					} = this.commonOptions
					userInfo.coupon_atv_id = coupon_atv_id
					await this.getAuthUserProfile(userInfo)
				}
				this.go(pMust && !userInfo.nickName ? 2 : 1);
			},
			toShowAuth() {
				let {
					id: uid = 0,
					phone = '',
				} = this.userInfo
				let type = !phone ? 'phone' : 'userInfo'
				this.$set(this, 'pType', type)
				let refs_key = 'show_auth_item'
				// #ifndef MP-WEIXIN
				refs_key = 'show_phone_item'
				let {
					short_code_status = 0
				} = this.configInfo
				if (!uid || !short_code_status || phone) {
					this.go(1)
					return
				}
				// #endif
				this.$refs[refs_key].open()
			},
			go(type = 1) {
				this.lockTap = false
				this.$emit(type == 1 ? 'go' : 'hide')
				let refs_key = type == 3 ? 'show_phone_item' : 'show_auth_item'
				let {
					id: uid = 0
				} = this.userInfo
				if (uid) {
					this.$refs[refs_key].close();
				}
				this.toResetItem()
			},
			toResetItem() {
				this.timer && clearTimeout(this.timer)
				this.authTime = 0
				this.subForm = {
					phone: '',
					short_code: ''
				}
			},
			//表单验证
			validate(param, is_send = false) {
				// let validate = new this.$util.Validate();
				// this.rule.map(item => {
				// 	let {
				// 		name,
				// 	} = item
				// 	if (name == 'short_code' && is_send) return
				// 	validate.add(param[name], item);
				// })
				// let message = validate.start();
				// return message;
			},
			async toSend() {
				let {
					authTime
				} = this
				if (authTime) return
				let {
					phone = ''
				} = this.subForm
				let msg = this.validate({
					phone
				}, true);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.user.sendShortMsg({
						phone
					})
					this.$util.hideAll()
					this.lockTap = false
					let time = 60
					this.timer = setInterval(() => {
						if (time === 0) {
							clearTimeout(this.timer)
							return
						}
						time--
						this.authTime = time
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			async submit() {
				let param = this.$util.deepCopy(this.subForm)
				let msg = this.validate(param);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}

				if (param.short_code.length != 6) {
					this.$util.showToast({
						title: `请输入6位数短信验证码`
					})
					return
				}

				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.user.bindUserPhone(param)
					this.$util.hideAll()
					this.lockTap = false
					this.$refs.show_phone_item.close()
					this.toResetItem()
					await this.getUserInfo()
					setTimeout(() => {
						this.$emit('go')
					}, 500)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			}
		},
	}
</script>



<style lang="scss">
	.auth-box {
		width: 630rpx;
		height: auto;
		padding: 30rpx;

		.auth-img {
			width: 322rpx;
			height: 341rpx;
			/* background: #f4f6f8; */
		}

		.auth-btn {
			width: 367rpx;
			height: 90rpx;
			border-radius: 90rpx;
		}

		.auth-info {
			width: 80rpx;
			height: 80rpx;
			background: #f4f6f8;
			border-radius: 50%;
		}

	}


	.popup-phone {
		width: 630rpx;

		.input-info {
			width: 570rpx;
			height: 90rpx;
			background: #F7F7F7;

			.item-input {
				height: 90rpx;
				font-size: 32rpx;
				text-align: left;
			}
		}

		.input-info.sm {
			width: 400rpx;
		}

		.send-btn {
			width: 150rpx;
			height: 90rpx;
		}
	}
</style>
