<template>
	<view class="master-income-record rel">
		<!-- #ifdef H5 -->
		<view @tap="$util.goUrl({url:`/pages/service`,openType:`reLaunch`})" class="abs"
			:class="[{'back-user-ios none': configInfo.isIos},{'back-user-android none': !configInfo.isIos}]"
			style="z-index: 1;" v-if="options.pid">
			<view class="iconshouye iconfont"></view>
			<view class="back-user_text">回到首页</view>
		</view>
		<!-- #endif -->
		<view class="mine-menu-list c-base" :style="{background:primaryColor}">
			<view class="space-lg"></view>
			<view class="space-lg"></view>
			<view class="flex-center f-caption mt-sm mb-sm">当前余额(元)</view>
			<view class="money-info flex-center flex-y-baseline">¥<view class="money">{{mineInfo.balance || 0}}
				</view>
			</view>
			<view class="space-md"></view>
			<view class="space-lg"></view>
		</view>
		<view class="flex-center fill-base pd-lg f-paragraph b-1px-b">
			<view @tap.stop="$util.goUrl({url:`/user/pages/stored/commission`})"
				class="item-record-btn flex-center c-base mr-lg radius"
				:style="{background:primaryColor,border:`1rpx solid ${primaryColor}`}">返佣记录</view>
			<view @tap.stop="$util.goUrl({url:`/user/pages/stored/record`})"
				class="item-record-btn flex-center ml-lg mr-lg radius"
				:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">充值记录</view>
			<view @tap.stop="$util.goUrl({url:`/user/pages/stored/consume`})"
				class="item-record-btn flex-center ml-lg radius"
				:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">消费明细</view>
		</view>

		<view @tap.stop="toChangeItem('chooseInd',index)"
			class="list-item fill-base flex-between mt-md ml-lg mr-lg pd-lg radius-16" v-for="(item,index) in list.data"
			:key="index">
			<view class="flex-1">
				<view class="f-title c-warning">¥{{item.price}}</view>
				<view class="f-caption c-caption">{{item.title}}</view>
			</view>
			<view>
				<view class="item-btn flex-center f-caption c-base radius-5" :style="{background:primaryColor}">立即充值
				</view>
				<view @tap.stop="toShare(index)" class="share-text flex-center f-caption mt-sm"
					:style="{color:primaryColor}" v-if="mineInfo.coach_status === 2">邀请充值</view>
			</view>
		</view>

		<view class="list-item fill-base mt-md ml-lg mr-lg radius-16">
			<view class="pd-lg b-1px-b">
				<view class="pl-md f-paragraph" :style="{lineHeight: 1.1,borderLeft: `5rpx solid ${primaryColor}`}">充值说明
				</view>
			</view>
			<view class="pd-lg f-caption c-caption">
				<view>1.充值的本金和赠送金额均不可提现、转移、转赠</view>
				<view>2.使用范围：本平台所有项目皆可购买，以及交通费支付</view>
			</view>
		</view>
		<view class="space-footer"></view>


		<uni-popup ref="choose_item" type="bottom" :custom="true">
			<view @touchmove.stop.prevent class="popup-choose-item fill-base pt-lg pb-lg radius-top-34">
				<view @tap.stop="$refs.choose_item.close()" class="flex-between pl-lg pr-lg pb-lg" style="width: 100%;">
					<view class="flex-center f-title c-title text-bold">选择支付方式</view>
					<i class="iconfont icon-add-circle rotate-45" :style="{color:subColor}"></i>
				</view>

				<view @tap.stop="toChangeItem('payInd',index)" class="flex-between ml-md mr-md pl-sm pr-sm pt-lg pb-lg"
					:class="[{'b-1px-t':index>0}]" v-for="(item,index) in payList" :key="index">
					<view class="pay-item flex-y-center"><i class="iconfont mr-md" :class="[item.icon]"
							:style="{color:item.id==1?primaryColor:'#01AAF2'}"></i>
						<view class="flex-y-baseline">{{item.title}}
						</view>
					</view>
					<i class="pay-icon iconfont c-caption"
						:class="[{'icon-xuanze':payInd != index},{'icon-radio-fill':payInd == index}]"
						:style="{color:payInd==index?primaryColor:''}"></i>
				</view>
				<view class="space-lg"></view>
				<view @tap="toPay" class="pay-btn flex-center f-title c-base radius" :style="{background:primaryColor}">
					立即支付</view>
				<view class="space-lg"></view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>


		<uni-popup ref="show_share_item" type="bottom">
			<view class="popup-share pd-lg f-desc c-desc fill-base">
				<view class="flex-center">
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="clear-btn list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/wechat.png"></image>
						<view style="font-size: 26rpx;color:#666;">分享给好友</view>
					</button>
					<view @tap.stop="toPoster" class="list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/picture.png"></image>
						<view>生成海报码</view>
					</view>
					<!-- #endif -->
					<!-- #ifdef H5 -->
					<view @tap.stop="toAppShare" class="list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/wechat.png"></image>
						<view style="font-size: 26rpx;color:#666;">分享给好友</view>
					</view>
					<view @tap.stop="toPoster" class="list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/picture.png"></image>
						<view>生成海报码</view>
					</view>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<view @tap.stop="toAppShare(1)" class="list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/wechat.png"></image>
						<view style="font-size: 26rpx;color:#666;">分享给好友</view>
					</view>
					<view @tap.stop="toAppShare(2)" class="list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/wechat-moments.png"></image>
						<view>分享到朋友圈</view>
					</view>
					<view @tap.stop="toPoster" class="list-item flex-center flex-column">
						<image class="item-image" src="/static/coupon/picture.png"></image>
						<view>生成海报码</view>
					</view>
					<!-- #endif -->
				</view>
				<view class="space-footer"></view>
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
	import siteInfo from '@/siteinfo.js';
	export default {
		components: {},
		data() {
			return {
				options: {},
				color: '#ffffff',
				payList: [{
					id: 1,
					icon: 'iconweixinzhifu1',
					title: '微信支付'
				}],
				payInd: 0,
				chooseInd: 0,
				qr_code: '',
				imageUrl: 'https://lbqny.migugu.com/admin/anmo/mine/balance-wechat-share.png',
				param: {
					page: 1,
					limit: 10
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false,
				shareInd: 0
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
			userInfo: state => state.user.userInfo,
			mineInfo: state => state.user.mineInfo,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			options = await this.updateCommonOptions(options)
			this.options = options
			// #ifdef MP-WEIXIN
			uni.hideShareMenu()
			// #endif
			await this.initIndex()
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh();
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.list.current_page >= this.list.last_page || this.loading) return;
			this.param.page = this.param.page + 1;
			this.loading = true;
			this.getList();
		},
		onShareAppMessage(e) {
			if (e.from === 'button') {
				let {
					imageUrl
				} = this
				let {
					id,
					title,
				} = this.list.data[0]
				let {
					id: pid = 0
				} = this.userInfo
				let {
					coach_id
				} = this.mineInfo
				let path = `/user/pages/stored/list?id=${id}&pid=${pid}&coach_id=${coach_id}`
				this.$util.log(path)
				this.$refs.show_share_item.close()
				return {
					title,
					imageUrl,
					path,
				}
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getMineInfo', 'updateCommonOptions']),
			...mapMutations(['updateOrderItem']),
			async initIndex(refresh = false) {
				let {
					id: uid = 0
				} = this.userInfo
				if (!uid) {
					await this.getUserInfo()
				}
				await Promise.all([this.getConfigInfo(), this.getMineInfo(), this.getList()])
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.toAppShare()
				}
				// #endif

				let {
					alipay_status = 0
				} = this.configInfo
				if (alipay_status && this.payList.length == 1) {
					// #ifndef MP-WEIXIN
					this.payList.push({
						id: 3,
						icon: 'icon-alipay c-alipay',
						title: '支付宝支付'
					})
					// #endif
				}
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getList() {
				let {
					list: oldList,
					param,
				} = this
				let newList = await this.$api.mine.cardList(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			toChangeItem(key, val) {
				this[key] = val
				this.lockTap = false
				if (key === 'payInd') return
				this.$refs.choose_item.open()
			},
			// 去支付
			async toPay() {
				let {
					chooseInd,
					payInd
				} = this
				let {
					id: card_id,
					true_price
				} = this.list.data[chooseInd]
				let {
					coach_id = 0
				} = this.commonOptions
				let {
					id: pay_model
				} = this.payList[payInd]
				let param = {
					card_id,
					coach_id,
					pay_model
				}

				// #ifdef H5
				if (pay_model == 3) {
					this.$refs.choose_item.close()
					this.updateOrderItem({
						key: 'alipayOrderParams',
						val: {
							order_id: '',
							card_id,
							coach_id,
							orderInfo: ''
						}
					})
					this.$util.goUrl({
						url: `/user/pages/alipay-result`
					})
					setTimeout(() => {
						this.getMineInfo()
						this.$util.back()
					}, 3000)
					return
				}

				// #endif

				if (this.lockTap) return;
				this.lockTap = true;
				this.$util.showLoading()
				this.$refs.choose_item.close()
				try {
					let {
						pay_list
					} = await this.$api.mine.payBalanceOrder(param)
					this.$util.hideAll()
					if (pay_list) {
						if (pay_model == 3) {
							pay_list = {
								orderInfo: pay_list,
								provider: 'alipay'
							}
						}
						try {
							await this.$util.pay(pay_list)
							this.$util.showToast({
								title: `支付成功`
							})
							await this.getMineInfo()
							setTimeout(() => {
								this.lockTap = false;
								this.$util.back()
							}, 1000)
						} catch (e) {
							this.lockTap = false;
							return;
						}
					}
				} catch (e) {
					this.$util.showToast({
						title: `支付失败`
					})
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 1000)
				}
			},
			async toShare(index) {
				this.shareInd = index
				if (!this.qr_code) {
					this.$util.showLoading()
					let qr_code = await this.$api.mine.coachBalanceQr()
					this.$util.hideAll()
					this.qr_code = qr_code
				}
				// #ifndef H5
				this.$refs.show_share_item.open()
				// #endif
				// #ifdef H5
				this.$util.goUrl({
					url: `/user/pages/stored/poster`
				})
				// #endif
			},
			toPoster() {
				this.$refs.show_share_item.close()
				this.$util.goUrl({
					url: `/user/pages/stored/poster`
				})
			},
			toAppShare(type = 1) {
				let {
					shareInd = 0,
						imageUrl
				} = this

				let {
					id: pid = 0
				} = this.userInfo
				let {
					coach_id = 0
				} = this.mineInfo

				let {
					id,
					title,
				} = this.list.data[shareInd]
				let summary = '邀请你充值有优惠～'

				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/user/pages/stored/list?id=${id}&coach_id=${coach_id}&pid=${pid}`

				// #ifdef H5
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, summary, href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
				// #endif
				// #ifdef APP-PLUS
				this.$refs.show_share_item.close()
				let scene = type == 1 ? 'WXSceneSession' : 'WXSceneTimeline'
				uni.share({
					provider: "weixin",
					scene,
					type: 0,
					href,
					title,
					summary,
					imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				// #endif
			},
		}
	}
</script>


<style lang="scss">
	.master-income-record {

		.mine-menu-list {

			.money-info {
				font-size: 50rpx;

				.money {
					font-size: 70rpx;
				}
			}

		}

		.item-record-btn {
			width: 178rpx;
			height: 58rpx;
			transform: rotateZ(360deg);
		}

		.list-item {
			.item-btn {
				width: 130rpx;
				height: 54rpx;
			}

			.share-text {
				width: 130rpx;
			}
		}



		.stored-item {
			.item-input {
				height: 90rpx;
				border-radius: 15rpx 0 0 15rpx;
			}

			.item-btn {
				width: 130rpx;
				height: 90rpx;
				border-radius: 0 15rpx 15rpx 0;
			}
		}

		.popup-choose-item {
			.icon-add-circle {
				font-size: 50rpx;
			}

			.pay-item {
				.iconfont {
					font-size: 50rpx;
				}
			}

			.pay-icon {
				font-size: 40rpx;
			}

			.pay-btn {
				width: 500rpx;
				height: 88rpx;
				margin: 0 auto;
			}
		}

		.popup-share {
			.list-item {
				width: 50%;

				.item-image {
					width: 66rpx;
					height: 66rpx;
				}
			}
		}


	}
</style>
