<template>
	<view class="order-pages" v-if="detail.id">

		<view class="item-child pd-lg fill-base f-paragraph c-base" :style="{background:primaryColor}">
			<view class="flex-y-baseline">
				<view class="text-bold">{{statusType[detail.pay_type]}}</view>
				<view @tap.stop="$refs.refuse_item.open()" class="ml-md"
					v-if="detail.pay_type == -1 && detail.coach_refund_time"> 技师拒单，查看原因</view>
			</view>
			<view class="f-caption mt-sm" v-if="detail.pay_type == 1 && detail.end_time > 0">请在<min-countdown
					:targetTime="over_time_text" @callback="countEnd"></min-countdown>内完成支付，逾期未支付，订单将自动取消</view>
			<view class="space-lg"></view>
		</view>

		<!-- // pay_type 1待支付，2待服务，3技师接单，4技师出发，5技师到达，6服务中，7服务完成，8待评价 -->
		<view
			class="menu-list flex-warp rel ml-lg mr-lg pt-lg pb-lg pl-md pr-md fill-base f-paragraph c-caption radius-16"
			:class="[{'add-bell':detail.is_add}]">
			<view class="menu-line abs b-1px-b"></view>
			<block v-for="(item,index) in lineList" :key="index">
				<view class="item-child flex-center flex-column f-icontext c-paragraph"
					:style="{color:detail.pay_type > item.pay_type -1?primaryColor:''}" v-if="item.icon">
					<view class="item-img fill-base flex-center mb-sm radius"
						:style="{borderColor:detail.pay_type > item.pay_type -1?primaryColor:''}">
						<i class="iconfont" :class="item.icon"></i>
					</view>
					<view>{{item.title}}</view>
				</view>
			</block>
		</view>


		<view class="item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16">
			<view class="flex-between pb-lg">
				<view class="f-paragraph c-title max-380 ellipsis">服务内容</view>
			</view>
			<view class="flex-center" :class="[{'mb-lg':aindex != detail.order_goods.length -1}]"
				v-for="(aitem,aindex) in detail.order_goods" :key="aindex">
				<!-- #ifdef H5 -->
				<view class="avatar lg radius-16">
					<view class="h5-image avatar lg radius-16"
						:style="{ backgroundImage : `url('${aitem.goods_cover}')`}">
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<image mode="aspectFill" class="avatar lg radius-16" :src="aitem.goods_cover"></image>
				<!-- #endif -->
				<view class="flex-1 ml-md">
					<view class="flex-between">
						<view class="f-title c-title ellipsis"
							:class="[{'max-300':aitem.refund_num>0},{'max-450':aitem.refund_num == 0}]">
							{{aitem.goods_name}}
						</view>
						<view class="f-caption c-warning" v-if="aitem.refund_num>0">已退x{{aitem.refund_num}}</view>
					</view>
					<view class="f-caption c-caption">服务技师：{{detail.coach_info.coach_name}}</view>
					<view class="f-caption c-caption">服务时长：{{aitem.time_long}}分钟</view>
					<view class="flex-between">
						<view class="flex-y-baseline f-caption c-warning">¥<view class="f-title text-bold">
								{{aitem.price}}
							</view>
						</view>
						<view class="c-paragraph">x{{aitem.num}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16">
			<view class="flex-between">
				<view>下单人</view>
				<view class="c-title">{{detail.address_info.user_name}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>联系方式</view>
				<view class="c-title">{{detail.address_info.mobile}}</view>
			</view>
			<view class="mt-md">
				<view>服务地址</view>
				<view class="c-title mt-sm">{{`${detail.address_info.address}${detail.address_info.address_info}`}}
				</view>
			</view>
			<view class="mt-md" v-if="detail.text">
				<view>订单备注</view>
				<view class="c-title mt-sm">{{detail.text}}</view>
			</view>
		</view>

		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16">
			<view class="flex-between">
				<image class="avatar sm radius" :src="detail.coach_info.work_img"></image>
				<view class="c-title">{{detail.coach_info.coach_name}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>下单时间</view>
				<view class="c-title">{{detail.create_time}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>服务时间</view>
				<view class="c-title">{{detail.start_time}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>服务时长</view>
				<view class="c-title">{{detail.time_long}}分钟</view>
			</view>
			<block v-if="!detail.is_add">
				<view class="flex-between mt-md">
					<view>车费详情</view>
					<view class="flex-y-center c-title">{{carType[detail.car_type]}}
						<view class="ml-md" v-if="detail.car_type == 1">全程{{detail.distance}}</view>
					</view>
				</view>
				<view class="flex-between mt-md" v-if="detail.car_type == 1">
					<view>出行费用</view>
					<view class="c-warning">出租车 ¥{{detail.car_price}}</view>
				</view>
			</block>
			<view class="flex-between mt-md">
				<view>服务项目费用</view>
				<view class="c-warning">¥{{detail.init_service_price}}</view>
			</view>
			<view class="flex-between mt-md" v-if="detail.discount*1 > 0">
				<view>卡券优惠</view>
				<view class="c-warning">-¥{{detail.discount}}</view>
			</view>
			<view class="flex-between mt-md">
				<view>支付方式</view>
				<view class="flex-y-baseline c-title">{{payType[detail.pay_model]}}</view>
			</view>
			<view class="flex-between mt-md pt-md b-1px-t">
				<view></view>
				<view class="flex-y-baseline c-title">总计：<view class="c-warning">¥{{detail.pay_price}}</view>
				</view>
			</view>
		</view>

		<view class="mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16">
			<view class=" flex-y-center pb-lg flex-warp">
				<view class="flex-between c-title">订单编号：</view>
				<view class="flex-between flex-1 ">
					<view class="c-title">{{detail.order_code}}</view>
					<view class="f-icontext d-copy text-center"
						@tap.stop="$util.goUrl({openType:'copy',url:detail.order_code})"
						:style="{borderColor:primaryColor ,color:primaryColor}">复制</view>
				</view>
			</view>
			<timeline :list="lineList" :info="detail" :type="1"></timeline>
		</view>

		<view class="space-max-footer"></view>
		<view class="footer-info fix fill-base">
			<view class="flex-between pd-lg">
				<view></view>
				<view class="flex-center f-desc c-title">
					<!-- #ifdef MP-WEIXIN -->
					<button :open-type="configInfo.im_type == 2?'contact':''"
						@tap.stop="configInfo.im_type == 1 ? $util.goUrl({url:configInfo.mobile,openType:'call'}) : ''"
						class="clear-btn item-btn flex-center f-desc" style="border-radius: 100rpx;"
						v-if="detail.pay_type != -1">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view @tap.stop="$util.goUrl({url:configInfo.mobile,openType:'call'})"
						class="item-btn flex-center f-desc radius" v-if="detail.pay_type != -1">联系客服</view>
					<!-- #endif -->
					<block
						v-if="statusPayType.includes(detail.pay_type) || detail.can_refund*1>0  || (detail.pay_type == 6 && (detail.is_add || (!detail.is_add && detail.can_add_order))) || (detail.pay_type == 7 && !detail.is_add) || detail.is_add || (detail.add_order_id && detail.add_order_id.length > 0)">
						<!-- 待支付 -->
						<block v-if="detail.pay_type == 1">
							<view @tap.stop="toCancel" class="item-btn flex-center ml-md radius">取消订单</view>
							<view @tap.stop="toPay" class="item-btn flex-center ml-md c-base radius"
								:style="{background:primaryColor}">
								去支付
							</view>
						</block>
						<!-- 支付超时 -->
						<block v-if="detail.pay_type == -1">
							<view @tap.stop="toCancel" class="item-btn flex-center ml-md radius">删除</view>
						</block>
						<!-- 待服务 -->
						<view @tap.stop="goDetail('refund')" class="item-btn flex-center ml-md radius"
							v-if="detail.can_refund*1>0">
							申请退款</view>
						<!-- 服务中 -->
						<view
							@tap.stop="$util.goUrl({url:`/user/pages/bell/list?id=${detail.id}&coach_id=${detail.coach_id}`})"
							class="item-btn flex-center ml-md c-base radius" :style="{background:primaryColor}"
							v-if="detail.pay_type == 6 && (detail.is_add || (!detail.is_add && detail.can_add_order))">
							{{detail.is_add?'升级项目':'升级/加钟'}}
						</view>
						<!-- 已完成 -->
						<block v-if="detail.pay_type == 7 && !detail.is_add">
							<view @tap.stop="goDetail('evaluate')" class="item-btn flex-center ml-md radius"
								v-if="!detail.is_comment">
								去评价</view>
							<view @tap.stop="toAgain" class="item-btn flex-center ml-md c-base radius"
								:style="{background:primaryColor}">
								再来一单
							</view>
							<view @tap.stop="goDetail('refund')" class="item-btn flex-center ml-md radius"
								>
								投诉并退款</view>
						</block>
						<view
							@tap.stop="$util.goUrl({url:`/user/pages/order/detail?id=${detail.add_pid.id}`,openType:`redirectTo`})"
							class="item-btn flex-center ml-md c-base radius" :style="{background:primaryColor}"
							v-if="detail.is_add">
							查看主订单
						</view>
						<view
							@tap.stop="$util.goUrl({url:`/user/pages/order/detail?id=${detail.add_order_id[0].id}`,openType:`redirectTo`})"
							class="item-btn flex-center ml-md c-base radius" :style="{background:primaryColor}"
							v-if="detail.add_order_id && detail.add_order_id.length > 0">
							查看加钟
						</view>
					</block>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>

		<common-popup @confirm="confirmCancel" ref="cancel_item" type="CANCEL_ORDER" :info="popupInfo"></common-popup>
		<common-popup @confirm="confirmDel" ref="del_item" type="DELETE_ORDER" :info="popupInfo"></common-popup>

		<uni-popup ref="refuse_item" type="center" :custom="true">
			<view class="common-popup-content fill-base pd-lg radius-34">
				<view class="title">拒单原因</view>
				<scroll-view scroll-y @touchmove.stop.prevent class="refund-text mt-lg">
					<view>
						<text decode="emsp"
							style="word-break:break-all;">{{detail.coach_refund_text || '没有填写原因哦'}}</text>
					</view>
				</scroll-view>
				<view class="button">
					<view @tap.stop="$refs.refuse_item.close()" class="item-child c-base"
						:style="{background: primaryColor,color:'#fff'}">知道了</view>
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
	} from "vuex"
	import timeline from '@/components/timeline.vue'
	export default {
		components: {
			timeline
		},
		data() {
			return {
				options: {},
				statusPayType: [-1, 1],
				statusType: {
					'-1': '已取消',
					1: '待支付',
					2: '待服务',
					3: '技师接单',
					4: '技师出发',
					5: '技师到达',
					6: '服务中',
					7: '已完成',
					8: '已评价',
				},
				carType: {
					0: '公交/地铁',
					1: '出租车'
				},
				payType: {
					1: '微信支付',
					2: '余额支付',
					3: '支付宝支付'
				},
				lineList: [],
				base_service: [{
					pay_type: 3,
					title: '技师接单',
					time: 'receiving_time',
					icon: 'iconjishijiedan'
				}, {
					pay_type: 4,
					title: '技师出发',
					time: 'serout_time',
					icon: 'iconjishichufa'
				}, {
					pay_type: 5,
					title: '技师到达',
					time: 'arrive_time',
					icon: 'iconjishidaoda'
				}, {
					pay_type: 6,
					title: '开始服务',
					time: 'start_service_time',
					icon: 'iconjishifuwu'
				}, {
					pay_type: 7,
					title: '服务完成',
					time: 'order_end_time',
					icon: 'iconjishiwancheng'
				}, {
					pay_type: 7,
					title: '签字确认',
					time: 'sign_time',
					icon: ''
				}],
				base_bell: [{
					pay_type: 3,
					title: '技师接单',
					time: 'receiving_time',
					icon: 'iconjishijiedan'
				}, {
					pay_type: 6,
					title: '开始服务',
					time: 'start_service_time',
					icon: 'iconjishifuwu'
				}, {
					pay_type: 7,
					title: '服务完成',
					time: 'order_end_time',
					icon: 'iconjishiwancheng'
				}],
				detail: {
					pay_type: 0
				},
				popupInfo: {},
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			over_time_text() {
				return new Date().getTime() + this.detail.over_time * 1000
			}
		}),
		onLoad(options) {
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapActions(['getConfigInfo']),
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
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				let {
					id
				} = this.options
				let data = await this.$api.order.orderInfo({
					id
				})
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				data.is_balance = data.balance * 1 > 0 ? 1 : 0
				this.lineList = data.is_add ? this.base_bell : this.base_service
				this.detail = data
			},
			initRefresh() {
				this.initIndex(true)
			},
			countEnd() {
				this.$util.log("倒计时完了")
				setTimeout(() => {
					this.initRefresh()
					this.$util.back()
				}, 1000)
			},
			// 取消/删除订单
			async toCancel() {
				let {
					order_code,
					order_goods,
					pay_type
				} = this.detail
				let {
					goods_cover: image,
				} = order_goods[0]
				this.popupInfo = {
					name: `系统单号：${order_code}`,
					image,
				}
				let refs_key = pay_type == -1 ? 'del_item' : 'cancel_item'
				this.$refs[refs_key].open()
			},
			// 确认：取消订单
			async confirmCancel() {
				let {
					id,
				} = this.detail
				await this.$api.order.cancelOrder({
					id
				})
				this.$util.showToast({
					title: `取消成功`
				})
				this.detail.pay_type = -1
				this.$refs.cancel_item.close()
				this.$util.back()
			},
			// 确认：删除订单
			async confirmDel() {
				let {
					id,
				} = this.detail
				await this.$api.order.delOrder({
					id
				})
				this.$util.showToast({
					title: `删除成功`
				})
				this.$refs.del_item.close()
				this.$util.back()
				setTimeout(() => {
					this.$util.goUrl({
						url: 1,
						openType: 'navigateBack'
					})
				}, 1000)
			},
			// 去支付
			async toPay(index) {
				if (this.lockTap) return;
				this.lockTap = true;
				this.$util.showLoading()
				let {
					id,
					pay_model
				} = this.detail

				try {
					let {
						pay_list
					} = await this.$api.order.rePayOrder({
						id
					})
					this.$util.hideAll()
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
								order_id: id,
								page_url: `/user/pages/order/detail?id=${id}`
							})
							this.updateOrderItem({
								key: 'alipayOrderParams',
								val: pay_list
							})
							this.$util.goUrl({
								url: '/user/pages/alipay-result'
							})
							this.lockTap = false;
							setTimeout(() => {
								this.initRefresh()
								this.$util.back()
							}, 3000)
							return
						}
						// #endif


						try {
							await this.$util.pay(pay_list)
							this.$util.showToast({
								title: `支付成功`
							})
							this.initRefresh()
							this.lockTap = false;
							this.$util.back()
						} catch (e) {
							this.$util.showToast({
								title: `支付失败`
							})
							this.lockTap = false;
							return;
						}
					}
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			// 订单详情/申请退款/去评价/签字确认
			goDetail(page) {
				let {
					id
				} = this.options
				let url = `/user/pages/order/${page}?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 再来一单
			async toAgain() {
				let {
					id: order_id,
					coach_id
				} = this.detail

				await this.$api.order.onceMoreOrder({
					order_id
				})
				this.$util.goUrl({
					url: `/user/pages/order?id=${coach_id}`
				})
			}
		}
	}
</script>


<style lang="scss">
	.order-pages {}

	.common-popup-content {
		.refund-text {
			width: 540rpx;
			min-height: 200rpx;
			max-height: 50vh;
		}
	}

	.d-copy {
		border: 1px solid transparent;
		width: 70rpx;
		border-radius: 8rpx;
	}
</style>
