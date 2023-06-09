<template>
	<view class="technician-income-cash-out" v-if="isLoad">
		<view class="mt-md ml-lg mr-lg f-paragraph fill-base radius-16" style="overflow: hidden;">
			<view class="fill-space pd-lg b-1px-b">
				<view class="flex-between pt-md pb-md">
					<view class="f-title c-title text-bold">支付宝帐号</view>
					<input v-model="text" class="flex-1 f-paragraph ml-md" type="text" placeholder="请输入支付宝帐号" />
				</view>
			</view>
			<view class="fill-space pd-lg b-1px-b">
				<view class="flex-between pt-md pb-md">
					<view class="f-title c-title text-bold">支付宝姓名</view>
					<input v-model="tname" class="flex-1 f-paragraph ml-md" type="text" placeholder="请输入支付宝姓名" />
				</view>
			</view>
			
			
			<view class="pd-lg">
				<view class="f-title c-title text-bold">提现金额</view>
				<view class="flex-y-center pt-lg pb-md b-1px-b">
					<view class="text-bold">¥</view>
					<input v-on:input="checkInput($event,'apply_price')" v-model="apply_price"
						class="flex-1 f-paragraph ml-sm" type="digit" placeholder="请输入提现金额" />
				</view>
				<view @tap.stop="withAll" class="flex-y-center f-caption c-caption pt-md">可提现余额￥{{cash}}
					<view class="ml-md c-warning">全部提现
					</view>
				</view>
				<view class="flex-y-center f-caption c-caption pt-sm">最低提现额度<view class="ml-md c-warning">
						￥{{configInfo.cash_mini || 0}}
					</view>
				</view>
				<view class="space-lg"></view>
				<view class="space-lg"></view>
				<view @tap.stop="submit" class="cash-out-btn flex-center f-title c-base radius-16"
					:style="{background:primaryColor}">提现</view>
				<!-- <view class="flex-center f-caption c-caption mt-md" v-if="options.type == 'technician'">
					每笔订单收取{{balance}}%手续费</view> -->
					
					
			</view>
			
		</view>
		<view>提现说明</view>
		<view>1.提现到账时间为一个工作日</view>
		<view>2.单笔提现金额最高2000元，最低100元</view>
		<view>3.本平台提现为工作人员线下审核打款，当前无法实时到帐，后期可实现，敬请等待</view>
		<view>4.提现申请提交三个工作日后，如有提现未到帐情况，请联系客服处理！</view>
		<view>5.提现申请处理时间为：周一到周五，10：00-18：00</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				options: {},
				isLoad: false,
				detail: {},
				balance: '',
				cash: '',
				apply_price: '',
				text: '',
				tname: '',
				type: 1,
				lockTap: false,

			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			coachInfo: state => state.user.coachInfo,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			await this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getCoachInfo']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getConfigInfo()
				let {
					type
				} = this.options
				// type technician 技师；carfee 车费；distribution 分销商
				switch (type) {
					case 'technician':
						let {
							detail
						} = await this.$util.getPage(-1)
						let {
							cap_cash = 0
						} = detail
						let {
							balance = 0
						} = detail.coach_level
						this.balance = 100 - balance
						this.cash = cap_cash
						break
					case 'carfee':
						let {
							id: cid = 0
						} = this.coachInfo
						if (!cid) {
							await this.getCoachInfo()
						}
						this.cash = this.coachInfo.car_price
						break
					case 'distribution':
						let {
							new_cash = 0
						} = await this.$util.getPage(-1).detail
						this.cash = new_cash
						break
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.$util.hideAll()
				this.isLoad = true
			},
			initRefresh() {
				this.initIndex(true)
			},
			withAll() {
				this.apply_price = this.cash
			},
			checkInput(e, key) {
				let val = this.$util.formatMoney(e.detail.value)
				this.$nextTick(() => {
					this[key] = val
				})
			},
			async submit() {
				if (this.apply_price == '0.0') {
					this.$nextTick(() => {
						this.apply_price = '0'
					})
				}
				let {
					cash,
					apply_price,
					text,
					tname,
				} = this
				let {
					cash_mini
				} = this.configInfo
				text = text ? text.replace(/(^\s*)|(\s*$)/g, "") : ''
				if (!text || !apply_price) {
					this.$util.showToast({
						title: !text ? `请输入支付宝帐号` : `请输入提现金额`
					})
					return
				}
				//20230530
				//if (!tname ) {
				//	this.$util.showToast({
				//		title:  `请输入支付宝姓名` 
				//	})
				//	return
				//}
				
				if (parseFloat(apply_price) < parseFloat(cash_mini)) {
					this.$util.showToast({
						title: `提现金额不能低于最低提现金额${cash_mini}`
					})
					return
				}
				if (parseFloat(apply_price) > parseFloat(cash)) {
					this.$util.showToast({
						title: `提现金额不能大于可提现金额${cash}`
					})
					return
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					let {
						type
					} = this.options
					let methodModel = type == 'distribution' ? 'mine' : 'technician'
					await this.$api[methodModel].applyWallet(type == 'distribution' ? {
						apply_price,
						tname,
						text
						
					} : {
						apply_price,
						text,
						tname,
						type: type == 'technician' ? 1 : 2
						
					})
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`,
					});
					setTimeout(() => {
						this.$util.back()
						this.$util.goUrl({
							url: 1,
							openType: 'navigateBack'
						})
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			}
		}
	}
</script>


<style lang="scss">
	.technician-income-cash-out {
		.cash-out-btn {
			width: 622rpx;
			height: 88rpx;
			margin: 0 auto;
		}
	}
</style>
