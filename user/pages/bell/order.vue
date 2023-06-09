<template>
	<view class="order-pages" v-if="isLoad">

		<view v-if="orderInfo.order_goods && orderInfo.order_goods.length > 0">
			<view class="mt-md ml-lg mr-lg  fill-base radius-16">
				<view class="list-item flex-center pd-lg" :class="[{'b-1px-t':index!=0}]"
					v-for="(item,index) in orderInfo.order_goods" :key="index">
					<!-- #ifdef H5 -->
					<view class="item-img radius-16">
						<view class="h5-image item-img radius-16" :style="{ backgroundImage : `url('${item.cover}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" class="item-img radius-16" :src="item.cover"></image>
					<!-- #endif -->
					<view class="flex-1 ml-md">
						<view :class="[{'flex-between':bellOrderParams.order_type==0}]">
							<view class="f-title c-title text-bold ellipsis"
								:class="[{'max-400':bellOrderParams.order_type==0},{'max-470':bellOrderParams.order_type==1}]">
								{{item.title}}
							</view>
							<view class="f-caption c-caption" v-if="bellOrderParams.order_type ==0">x{{item.num}}
							</view>
						</view>
						<view class="flex-y-center f-desc c-caption">
							<view class="f-title c-warning mr-sm">
								¥{{bellOrderParams.order_type ==0?item.pay_price:item.price}}</view>
							<view class="text-delete mr-sm" v-if="bellOrderParams.order_type ==0">¥{{item.price}}</view>
							{{`/ ${item.time_long}`}}分钟
						</view>
						<view class="f-caption c-caption mt-sm mb-sm max-450 ellipsis">
							服务技师：{{orderInfo.coach_info.coach_name}}
						</view>
					</view>
				</view>
			</view>
			<view class="mt-md ml-lg mr-lg fill-base radius-16">
				<view class="flex-between pd-lg b-1px-b">
					<view class="f-title c-title text-bold">服务开始时间</view>
					<view class="f-paragraph c-caption">
						{{orderInfo.order_start_time}}
					</view>
				</view>
				<view class="flex-between pd-lg">
					<view class="f-title c-title text-bold">服务结束时间</view>
					<view class="f-paragraph c-caption">
						{{orderInfo.order_end_time}}
					</view>
				</view>
			</view>

			<view class="mt-md ml-lg mr-lg fill-base radius-16">
				<block v-for="(item,index) in payList" :key="index">
					<view @tap.stop="toChangeItem(index,2)" class="flex-between pt-lg pb-lg pl-lg pr-md b-1px-b"
						v-if="(bellOrderParams.order_type == 0 &&orderInfo.pay_model == item.id ) || bellOrderParams.order_type == 1">
						<view class="flex-y-center f-title c-title">
							<i class="iconfont mr-md" :class="item.icon"
								:style="{color:item.id==1?primaryColor:'',fontSize:'50rpx'}"></i>
							{{item.title}}
							<view class="f-paragraph c-caption ml-md" v-if="item.id == 2">余额{{balance || 0}}元</view>
						</view>
						<view class="flex-y-center" :style="{color:payInd == index ? primaryColor:''}">
							<i class="pay-icon iconfont icon-xuanze mr-sm"
								:class="[{'icon-xuanze-fill':item.is_disabled || payInd == index}]"></i>
						</view>
					</view>
				</block>
			</view>

			<view @tap.stop="isAgree=!isAgree"
				class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-title flex-y-center radius-16"
				v-if="configInfo.trading_rules && configInfo.trading_rules.length>0">
				<i class="iconfont mr-sm" :class="isAgree?'icon-xuanze-fill':'icon-xuanze'"
					:style="{color:isAgree?primaryColor:''}"></i>
				我已阅读并同意<view @tap.stop="$refs.show_rule_item.open()" :style="{color:primaryColor}">《平台交易规则》</view>
			</view>

			<view class="space-max-footer"></view>

			<view class="pay-info fix flex-between text-right pl-lg pr-lg fill-base">
				<view class="flex-y-center f-paragraph c-title text-bold ml-sm mr-lg">合计：
					<view class="flex-y-baseline f-title c-warning">¥{{orderInfo.pay_price}}</view>
				</view>
				<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
					:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toPay" style="width: 182rpx;">
					<view class="pay-btn flex-center f-paragraph c-base radius" :style="{background:primaryColor}">
						立即支付</view>
				</auth>
			</view>

		</view>

		<uni-popup ref="show_rule_item" type="center" :maskClick="false">
			<view class="popup-rule">
				<view class="fill-base pd-lg radius-26">
					<view class="f-title c-title text-bold flex-center pd-lg">平台交易规则</view>
					<scroll-view scroll-y @touchmove.stop.prevent class="rule-text">
						<parser :html="configInfo.trading_rules" @linkpress="linkpress" show-with-animation lazy-load>
							加载中...
						</parser>
					</scroll-view>
				</view>
				<view @tap="$refs.show_rule_item.close()" class="flex-center pd-lg"><i
						class="iconfont icon-close c-base"></i></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import parser from "@/components/jyf-Parser/index"
	export default {
		components: {
			parser
		},
		data() {
			return {
				isLoad: false,
				options: {},
				// 1微信支付；2余额支付；3支付宝支付
				payList: [{
					id: 1,
					icon: 'iconweixinzhifu1',
					title: '微信支付'
				}, {
					id: 2,
					icon: 'iconqianbao c-balance',
					title: '账户余额',
					is_disabled: false
				}],
				payInd: 0,
				balanceInd: 1,
				balance: 0,
				send_info: {
					time_index: 0,
					time: {}
				},
				orderInfo: {
					coupon_id: 0,
					address_info: {
						id: 0
					}
				},
				lockTap: false,
				isBus: 0,
				isAgree: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
			userInfo: state => state.user.userInfo,
			mineInfo: state => state.user.mineInfo,
			bellOrderParams: state => state.order.bellOrderParams,
		}),
		async onLoad() {
			await this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getMineInfo']),
			...mapMutations(['updateUserItem', 'updateOrderItem']),
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
					alipay_status = 0
				} = this.configInfo

				if (alipay_status) {
					// #ifndef MP-WEIXIN
					let pay = this.payList.findIndex(item => {
						return item.id == 3
					})
					if (pay === -1) {
						this.payList.splice(1, 0, {
							id: 3,
							icon: 'icon-alipay c-alipay',
							title: '支付宝支付'
						})
						this.balanceInd = 2
					}
					// #endif
				}
				let param = this.$util.deepCopy(this.bellOrderParams)
				let {
					order_type = 0
				} = param
				delete param.order_type
				let methodModel = order_type == 0 ? 'upOrderInfo' : 'payOrderInfo'
				let [data, mineInfo] = await Promise.all([this.$api.order[methodModel](param), this.getMineInfo()])
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				this.orderInfo = data
				let {
					balance
				} = this.mineInfo
				let {
					balanceInd
				} = this
				this.payList[balanceInd].is_disabled = balance * 1 < data.pay_price * 1
				this.balance = balance
				if (order_type == 0) {
					this.payInd = this.payList.findIndex(item => {
						return item.id == data.pay_model
					})
				}
				this.isLoad = true
			},
			initRefresh() {
				this.initIndex(true)
			},
			linkpress(res) {
				// #ifdef APP-PLUS
				this.$util.goUrl({
					url: res.href,
					openType: 'web'
				})
				// #endif
			},
			// 选择支付方式
			async toChangeItem(index, key = 1) {
				let {
					balanceInd
				} = this
				if (index == balanceInd && this.payList[balanceInd].is_disabled) return
				this.payInd = index
			},
			async toPay() {
				let {
					trading_rules
				} = this.configInfo
				if (trading_rules && trading_rules.length > 0 && !this.isAgree) {
					this.$util.showToast({
						title: `请先阅读并同意《平台交易规则》`
					})
					return
				}
				let param = this.$util.deepCopy(this.bellOrderParams)
				let {
					order_type = 0
				} = param
				let {
					payList,
					payInd,
				} = this
				let {
					id: pay_model
				} = payList[payInd]

				delete param.order_type
				param.pay_model = pay_model
				let methodModel = order_type == 0 ? 'upOrderGoods' : 'payOrder'

				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					let {
						pay_list,
						order_id
					} = await this.$api.order[methodModel](param)
					this.$util.hideAll()
					// 微信/支付宝支付
					if (pay_list) {

						if (pay_model == 3) {
							pay_list = {
								orderInfo: pay_list,
								provider: 'alipay'
							}
						}

						// #ifdef H5
						if (pay_model == 3) {
							pay_list = Object.assign({}, pay_list, {
								order_id,
								page_url: `/pages/order?tab=2`
							})
							this.updateOrderItem({
								key: 'alipayOrderParams',
								val: pay_list
							})
							this.$util.goUrl({
								url: '/user/pages/alipay-result',
								openType: `redirectTo`
							})
							return
						}
						// #endif

						try {
							await this.$util.pay(pay_list)
							this.$util.showToast({
								title: `支付成功`
							})
							setTimeout(() => {
								this.lockTap = false
								this.$util.goUrl({
									url: '/pages/order?tab=2',
									openType: `reLaunch`
								})
							}, 1000)
						} catch (e) {
							this.$util.showToast({
								title: `支付失败`
							})
							setTimeout(() => {
								this.lockTap = false
								this.$util.goUrl({
									url: '/pages/order?tab=1',
									openType: `reLaunch`
								})
							}, 1000)
						}
						return
					}
					// 余额支付/零元支付
					this.$util.showToast({
						title: `支付成功`
					})
					setTimeout(() => {
						this.lockTap = false
						this.$util.goUrl({
							url: '/pages/order?tab=2',
							openType: `reLaunch`
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
	.order-pages {
		.list-item {
			.item-img {
				width: 140rpx;
				height: 140rpx;
			}

			.item-tag {
				width: 100rpx;
				height: 36rpx;
				margin-top: -18rpx;
			}

			.iconyduixingxingshixin {
				font-size: 28rpx;
			}

			.item-btn {
				width: 129rpx;
				height: 54rpx;
			}
		}

		.pay-info {
			height: 110rpx;
			bottom: 0;
			height: calc(110rpx + env(safe-area-inset-bottom) / 2);
			padding-bottom: calc(env(safe-area-inset-bottom) / 2);

			.pay-btn {
				width: 182rpx;
				height: 74rpx;
			}
		}

		.popup-rule {
			width: 680rpx;
			height: auto;

			.rule-text {
				min-height: 300rpx;
				max-height: 60vh;
			}

			.iconfont {
				font-size: 60rpx;
			}
		}
	}
</style>
