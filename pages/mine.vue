<template>
	<view class="pages-mine" v-if="isLoad">
		<!-- #ifndef H5 -->
		<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true" :title="userPageType == 2?'我是技师':'我的'"
			color="#ffffff" :backgroundColor="primaryColor">
		</uni-nav-bar>
		<view :style="{height:`${configInfo.navBarHeight}px`}"></view>
		<!-- #endif -->
		<image mode="aspectFill" lazy-load class="mine-bg abs" :src="configInfo[image_type[userPageType]]"></image>

		<!-- 用户 -->
		<!-- coach_status 1申请中，2已通过，3已取消授权，4已拒绝 -->
		<block v-if="userPageType == 1">
			<view class="pd-lg" style="height: 292rpx">
				<view class="pt-lg rel"
					:class="[{ 'flex-warp': userInfo.nickName }, { 'flex-center': !userInfo.nickName } ]">
					<view @tap.stop="authUserProfile" class="avatar_view">
						<image mode="aspectFill" class="avatar radius"
							:src="userInfo.avatarUrl || `/static/mine/default_user.png`">
						</image>
						<view class="text" :style="{color:primaryColor}" v-if="userInfo.id && mineInfo.is_admin == 1">
							代理商
						</view>
					</view>
					<view @tap.stop="authUserProfile" class="flex-1 f-md-title text-bold ml-md"
						v-if="!userInfo || (userInfo && !userInfo.id)"
						:style="{color:configInfo[font_type[userPageType]]}">登录</view>
					<view class="flex-1 ml-md mt-sm rel" :style="{color:configInfo[font_type[userPageType]]}" v-else>
						<view class="flex-between">
							<view @tap.stop="authUserProfile" class="flex-y-center f-title text-bold">
								<view class="mr-sm max-500 ellipsis">
									{{ userInfo.nickName || '默认用户' }}
								</view>
								<!-- #ifdef MP-WEIXIN -->
								<i class="flex-1 iconfont icon-shuaxin"></i>
								<!-- #endif -->
							</view>
							<view @tap.stop="$util.goUrl({url:`/user/pages/setting`})" class="notice-item ml-md">
								<i class="iconfont icon-xitong text-bold"></i>
							</view>
						</view>
						<view class="flex-between">
							<view class="member-tag flex-center mt-sm pl-md pr-md f-caption radius ">
								<i class="iconfont iconhuiyuanka mr-sm"></i>
								{{ mineInfo.coach_status === 2 ? mineInfo.coach_level.title || '技师' : '普通用户' }}
							</view>
							<view class="f-desc">
								<block v-if=" mineInfo.coach_status === 2 && mineInfo.service_time_long * 1 > 0 ">
									{{ `已服务${mineInfo.service_time_long}分钟` }}
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>


			<!-- 卡券/关注/收藏 -->
			<view class="share-collect-list flex-x-center pd-lg mt-sm ml-md mr-md fill-base box-shadow radius-20 rel">
				<view @tap.stop="$util.toCheckLogin({ url: `/user/pages/coupon/list` })"
					class="share-item flex-center flex-column">
					<view class="f-sm-title text-bold">{{ mineInfo.coupon_count || 0 }}</view>
					<view class="f-caption c-caption">卡券</view>
				</view>
				<view @tap.stop="$util.toCheckLogin({ url: `/user/pages/follow` })"
					class="share-item flex-center flex-column" v-if="plugAuth.dynamic">
					<view class="f-sm-title text-bold">{{ mineInfo.follow_count || 0 }}</view>
					<view class="f-caption c-caption">关注</view>
				</view>
				<view @tap.stop="$util.toCheckLogin({ url: `/user/pages/collect` })"
					class="share-item flex-center flex-column">
					<view class="f-sm-title text-bold">{{ mineInfo.collect_count || 0 }}</view>
					<view class="f-caption c-caption">收藏</view>
				</view>
			</view>


			<!-- 我的余额 -->
			<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
				:type="!userInfo.phone ? 'phone' : 'userInfo'"
				@go="$util.toCheckLogin({url:`/user/pages/stored/list`})">
				<view class="flex-center pd-lg mt-md ml-md mr-md fill-base box-shadow radius-20 rel">
					<view class="flex-1 mr-lg c-title">
						<view class="f-paragraph">我的余额</view>
						<view class="f-big-title text-bold">{{ mineInfo.balance || 0 }}</view>
					</view>
					<view class="store-btn flex-center f-paragraph c-base radius" :style="{background:primaryColor}">
						立即充值
					</view>
				</view>
			</auth>

			<!-- <view class="share-collect-list flex-between mt-md">
				<view @tap.stop="$util.toCheckLogin({ url: `/user/pages/coupon/list` })"
					class="item-child flex-between ml-lg mr-sm pt-lg pb-lg pl-md pr-sm fill-base f-caption c-desc box-shadow radius-16">
					<view>
						<view class="f-title text-bold mb-sm" :style="{ color: primaryColor }">我的卡券</view>
						<view class="c-desc">已有{{mineInfo.coupon_count || 0}}卡券</view>
					</view>
					<view class="item-icon rel flex-center">
						<view class="item-icon radius abs" :style="{background:primaryColor}"></view>
						<i class="iconfont iconwodekaquan" :style="{color:primaryColor}"></i>
					</view>
				</view>
				<view @tap.stop="$util.toCheckLogin({ url: `/user/pages/collect` })"
					class="item-child flex-between ml-sm mr-lg pt-lg pb-lg pl-md pr-sm fill-base f-caption c-desc box-shadow radius-16 ">
					<view>
						<view class="f-title text-bold mb-sm" :style="{ color: primaryColor }">我的收藏</view>
						<view class="c-desc">已收藏{{mineInfo.collect_count || 0}}位技师</view>
					</view>
					<view class="item-icon rel flex-center">
						<view class="item-icon radius abs" :style="{background:primaryColor}"></view>
						<i class="iconfont iconwodeshoucang" :style="{color:primaryColor}"></i>
					</view>
				</view>
			</view> -->

			<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
				:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toAtv" style="width: 100%"
				v-if="mineInfo.is_atv_status === 1">
				<view style="height: 14rpx;"></view>
				<image class="share-atv-img" src="https://lbqny.migugu.com/admin/anmo/mine/share_atv.png"></image>
			</auth>

			<view class="mine-menu-list box-shadow fill-base radius-16"
				:style="{margin:mineInfo.is_atv_status === 1 ? '10rpx 30rpx 0 30rpx' : ''}">
				<view @tap="$util.toCheckLogin({url:`/pages/order`})"
					class="menu-title flex-between pl-lg pr-md b-1px-b">
					<view class="f-paragraph c-title text-bold">我的订单</view>
					<view class="flex-y-center f-caption c-paragraph">全部订单<i class="iconfont icon-right"></i></view>
				</view>
				<view class="flex-warp pt-lg pb-lg">
					<view @tap.stop="toJump('orderList', index)"
						class="item-child flex-center flex-column f-caption c-paragraph"
						v-for="(item, index) in orderList" :key="index">
						<i class="iconfont" :class="item.icon" :style="{color:primaryColor}"></i>
						<view class="mt-sm">{{ item.text }}</view>
					</view>
				</view>
			</view>

			<view class="mine-menu-list box-shadow fill-base radius-16" v-if="mineInfo.id">
				<view class="menu-title flex-between pl-lg pr-md b-1px-b">
					<view class="f-paragraph c-title text-bold">其他</view>
				</view>
				<view class="flex-warp pt-lg pb-lg">
					<view @tap.stop="toJump(mineInfo.is_fx ?'distributionList':'distributionApplyList', index)"
						class="item-child flex-center flex-column f-caption c-paragraph"
						v-for="(item, index) in mineInfo.is_fx ? distributionList : distributionApplyList" :key="index"
						v-if="item.text == '绑定技师'?mineInfo.is_admin == 1?true:false:true">
						<view class="item-img flex-center radius" style="background: #F8F8F8;">
							<i class="iconfont c-title" :class="item.icon"></i>
						</view>
						<view class="mt-sm">{{ item.text }}</view>
					</view>
					
				</view>
			</view>

			<view class="mine-tool-list fill-base radius-16">
				<block v-for="(item, index) in toolList" :key="index">
					<!-- #ifdef MP-WEIXIN -->
					<button :open-type="configInfo.im_type == 2 ?'contact':''" class="clear-btn"
						v-if="item.text == '联系客服' && configInfo.im_type == 2">
						<view class="list-item pt-lg pb-lg ml-lg mr-lg  flex-center"
							:class="[{ 'b-1px-t': index != 0 }]">
							<i class="left-icon flex-center iconfont" :class="item.icon"
								:style="{color:primaryColor}"></i>
							<view class="flex-1 flex-between ml-md">
								<view class="f-paragraph c-title">{{ item.text }}</view>
								<i class="iconfont icon-right"></i>
							</view>
						</view>
					</button>
					<block v-else>
						<auth :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
							:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toJump('toolList', index)">
							<view class="list-item pt-lg pb-lg ml-lg mr-lg flex-center"
								:class="[{ 'b-1px-t': index != 0 }]">
								<i class="left-icon flex-center iconfont" :class="item.icon"
									:style="{color:primaryColor}"></i>
								<view class="flex-1 flex-between ml-md">
									<view class="f-paragraph c-title">{{ item.text }}</view>
									<i class="iconfont"
										:class="[{'iconbodadianhua text-bold':item.text == '联系客服'},{'icon-right':item.text != '联系客服'}]"
										:style="{fontSize:item.text == '联系客服'?'50rpx':'',color:item.text == '联系客服'?primaryColor:''}">
									</i>
								</view>
							</view>
						</auth>
					</block>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view @tap.stop="toJump('toolList', index)" class="list-item pt-lg pb-lg ml-lg mr-lg flex-center"
						:class="[{ 'b-1px-t': index != 0 }]">
						<i class="left-icon flex-center iconfont" :class="item.icon" :style="{color:primaryColor}"></i>
						<view class="flex-1 flex-between ml-md">
							<view class="f-paragraph c-title">{{ item.text }}</view>
							<i class="iconfont"
								:class="[{'iconbodadianhua text-bold':item.text == '联系客服'},{'icon-right':item.text != '联系客服'}]"
								:style="{fontSize:item.text == '联系客服'?'50rpx':'',color:item.text == '联系客服'?primaryColor:''}">
							</i>
						</view>
					</view>
					<!-- #endif -->
				</block>
				<view @tap.stop="toChange" class="list-item pd-lg flex-center b-1px-t"
					v-if="mineInfo.coach_status == 2 || mineInfo.coach_status == 3">
					<i class="left-icon flex-center iconfont iconqiehuanjishiduan" :style="{color:primaryColor}"></i>
					<view class="flex-1 flex-between ml-md">
						<view class="f-paragraph c-title">切换技师端</view>
						<i class="iconfont icon-switch c-caption"></i>
					</view>
				</view>
			</view>
		</block>
		<!-- 技师 -->
		<block v-if="userPageType == 2">

			<view class="addr-time-help-list flex-x-center f-desc rel"
				:style="{color:configInfo[font_type[userPageType]]}">
				<view @tap.stop="toChooseLocation(false)" class="flex-center flex-column">
					<i class="iconfont iconweizhigengxin1"></i>
					<view>位置更新</view>
				</view>
				<view @tap.stop="$util.goUrl({url:`/technician/pages/time-manage`})" class="flex-center flex-column">
					<i class="iconfont iconshijianguanli2"></i>
					<view>上班时间</view>
				</view>
				<view @tap.stop="toHelp" class="flex-center flex-column">
					<i class="iconfont iconyijianbaojing"></i>
					<view>一键报警</view>
				</view>
			</view>


			<view class="coach-info fill-base ml-lg mr-lg pd-lg radius-16 rel" v-if="coachInfo.id">
				<view class="flex-center pb-lg">
					<!-- #ifdef H5 -->
					<view class="avatar radius">
						<view @tap.stop="toPreviewImage(index,1)" class="h5-image avatar radius"
							:style="{ backgroundImage : `url('${coachInfo.work_img}')`}">
						</view>
					</view>
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image mode="aspectFill" class="avatar radius" :src="coachInfo.work_img">
					</image>
					<!-- #endif -->
					<view class="flex-1 ml-md">
						<view class="flex-between">
							<view class="coach-name text-bold max-300 ellipsis">{{coachInfo.coach_name}}</view>
							<view @tap.stop="$util.goUrl({url:`/technician/pages/apply?is_edit=1`})"
								class="coach-text f-paragraph flex-y-center">个人信息<i class="iconfont icon-right"></i>
							</view>
						</view>
						<view class="flex-warp mt-sm">
							<view class="tag-item flex-center"
								:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">
								已认证</view>
							<view class="tag-item flex-center ml-sm"
								:style="{color:coachInfo.is_work?primaryColor:'#5A677E',border:`1rpx solid ${coachInfo.is_work?primaryColor:`#5A677E`}`}"
								v-if="mineInfo.coach_status === 2">
								{{coachInfo.is_work ? textType[coachInfo.text_type] : '请假中'}}
							</view>
							<view class="tag-item flex-center ml-sm"
								:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">
								{{coachInfo.coach_level.title}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex-center pt-lg b-1px-t">
					<view class="map-addr flex-center rel">
						<view class="map-addr radius abs" :style="{background:primaryColor}"></view>
						<view class="flex-y-center f-desc" :style="{color:primaryColor}">
							<i class="iconfont icondangqianweizhi"></i>
							当前
						</view>
					</view>
					<view class="flex-1 ml-md ellipsis">
						{{coachInfo.address}}
					</view>
				</view>

			</view>


			<view class="mine-count-list flex-between mt-md rel">
				<view class="cancel-auth iconfont icon-biaoqian c-caption flex-center abs"
					v-if="mineInfo.coach_status == 3">
					<view class="text-bold f-icontext abs">取消授权</view>
				</view>

				<view @tap.stop="$util.goUrl({ url: `/technician/pages/income/index`})"
					class="item-child ml-lg mr-sm fill-base f-caption box-shadow radius-16">
					<view class="flex-y-baseline" :style="{color:primaryColor}">¥<view class="f-sm-title">
							{{coachInfo.service_price || 0}}
						</view>
					</view>
					<view class="flex-between mt-sm">
						<view class="text f-paragraph">服务收入</view>
						<view class="cash-btn flex-center f-desc c-base radius" :style="{ background: primaryColor}">去提现
						</view>
					</view>
				</view>
				<view @tap.stop="$util.goUrl({ url: `/user/pages/cash-out?type=carfee` })"
					class="item-child ml-sm mr-lg pt-lg pb-lg pl-md pr-sm fill-base f-caption c-desc box-shadow radius-16 ">
					<view class="flex-y-baseline" :style="{color:primaryColor}">¥<view class="f-sm-title">
							{{coachInfo.car_price || 0}}
						</view>
					</view>
					<view class="flex-between mt-sm">
						<view class="text f-paragraph">车费</view>
						<view class="cash-btn flex-center f-desc c-base radius" :style="{ background: primaryColor }">
							去提现</view>
					</view>
				</view>
			</view>


			<view class="mine-menu-list box-shadow fill-base radius-16">
				<view class="menu-title flex-between pl-lg pr-sm">
					<view class="f-paragraph c-title text-bold">我的订单</view>
				</view>
				<view class="flex-warp pb-lg">
					<view @tap.stop="toJump('orderList2', index)"
						class="item-child flex-center flex-column f-caption c-title" style="width: 25%"
						v-for="(item, index) in orderList2" :key="index">
						<view class="item-img rel flex-center radius">
							<view class="abs item-child-number flex-center" v-if="item.number > 0">
								{{item.number < 100 ? item.number : '99+'}}
							</view>
							<view class="item-img radius abs" :style="{background:primaryColor}"></view>
							<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
						</view>
						<view class="mt-sm">{{ item.text }}</view>
					</view>
					
					<view   @tap.stop="$util.toCheckLogin({url:`/user/pages/article?id=2`})"
						class="item-child flex-center flex-column f-caption c-title" style="width: 25%" >
						<view class="item-img rel flex-center radius">
							<view class="item-img radius abs" :style="{background:primaryColor}"></view>
							<i class="iconfont iconyijianbaojing" :style="{color:primaryColor}"></i>
						</view>
						<view class="mt-sm">系统消息</view>
					</view>
					
				
					
				</view>
			</view>


			<view class="mine-menu-list box-shadow fill-base radius-16">
				<view class="menu-title flex-between pl-lg pr-sm">
					<view class="f-paragraph c-title text-bold">其他功能</view>
				</view>
				<view class="flex-warp pb-sm">
					<view @tap.stop="toJump('toolList2', index)"
						class="item-child flex-center flex-column f-caption c-title"
						style="width: 25%;margin:10rpx 0 20rpx 0" v-for="(item, index) in toolList2" :key="index">
						<i class="iconfont c-title" :class="item.icon" :style="{color:primaryColor}"></i>
						<view class="mt-sm">{{ item.text }}</view>
					</view>
				</view>
			</view>

		</block>

		<view class="space-footer"></view>
		<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
		<tabbar :cur="5"></tabbar>

		<!-- #ifdef APP-PLUS -->
		<login-info></login-info>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				isLoad: false,
				options: {},
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约'
				},
				is_share: true,
				// 我的订单
				orderList: [{
					icon: 'icondaizhifu',
					text: '待支付',
					url: '/pages/order?tab=1'
				}, {
					icon: 'icondaifuwu',
					text: '待服务',
					url: '/pages/order?tab=2'
				}, {
					icon: 'iconanmo2',
					text: '服务中',
					url: '/pages/order?tab=3'
				}, {
					icon: 'icondaipingjia',
					text: '待评价',
					url: '/pages/order?tab=4'
				}, {
					icon: 'icontuikuan',
					text: '退款/售后',
					url: '/user/pages/refund/list'
				}],
				orderList2: [{
					icon: 'icondaijiedan',
					text: '待接单',
					url: '/technician/pages/order/list',
					number: 0
				}, {
					icon: 'iconyijiedan',
					text: '待服务',
					url: '/technician/pages/order/list?tab=1',
					number: 0
				}, {
					icon: 'iconfuwuzhong',
					text: '服务中',
					url: '/technician/pages/order/list?tab=2',
					number: 0
				}],
				// 其他
				distributionList: [{
					icon: 'iconwodeshouyi',
					text: '我的收益',
					url: '/user/pages/distribution/income'
				}, {
					icon: 'icontuiguanghaibao',
					text: '推广海报',
					url: '/user/pages/distribution/poster'
				}, {
					icon: 'iconwodetuandui1',
					text: '我的粉丝',
					url: '/user/pages/distribution/team'
				}, {
					icon: 'iconbangdingjishi',
					text: '绑定技师',
					url: '/user/pages/distribution/bind-technician'
				}
				],
				distributionApplyList: [
				//	{
				//	icon: 'iconwodeshouyi',
				//	text: '申请分销商',
				//	url: '/user/pages/distribution/apply'
				//}, 
				{
					icon: 'iconbangdingjishi',
					text: '绑定技师',
					url: '/user/pages/distribution/bind-technician'
				},
				/* {
					icon: 'iconwodetuandui1',
					text: '技师列表',
					url: '/user/pages/distribution/team-technician'
				},{
					icon: 'iconwodeshouyi',
					text: '商户信息',
					url: '/user/pages/shanghu-info'
				},{
					icon: 'icondaijiedan',
					text: '订单',
					url: '/user/pages/shanghu-order'
				}, */
				],
				toolList: [
					{
						icon: 'iconwodeshouyi',
						text: '商户申请',
						url: '/user/pages/distribution/applysahng'
					}, {
					icon: 'icondizhiguanli',
					text: '地址管理',
					url: '/user/pages/address/list'
				}, {
					icon: 'iconwentifankui',
					text: '问题反馈',
					url: '/user/pages/feedback/box'
				},{
					icon: 'iconlianxikefu',
					text: '联系客服',
					url: ''
				}],
				toolList2: [{
						icon: 'icondengjiguanli',
						text: '等级管理',
						url: '/technician/pages/level'
					},
					{
						icon: 'iconchefeimingxi',
						text: '车费明细',
						url: '/technician/pages/car-fare'
					},
					{
						icon: 'iconchefeitixianjilu',
						text: '车费提现记录',
						url: '/technician/pages/income/car-fee-record'
					},
					{
						icon: 'iconwuliaoshangcheng',
						text: '物料商城',
						url: '/technician/pages/shop/list'
					},
					{
						icon: 'iconchapingshensu',
						text: '差评申诉',
						url: '/technician/pages/bad-comments/box'
					},
          {
            icon: 'iconweizhigengxin',
            text: '拉黑',
            url: '/technician/pages/black/box'
          },
					{
						icon: 'iconqiehuanjishiduan',
						text: '切换用户端',
						url: 'change'
					}
				],
				image_type: {
					1: 'user_image',
					2: 'coach_image'
				},
				font_type: {
					1: 'user_font_color',
					2: 'coach_font_color'
				},
				showAuth: false,
				offsetL: 360,
				offsetT: 0
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			plugAuth: state => state.config.plugAuth,
			commonOptions: state => state.user.commonOptions,
			userInfo: state => state.user.userInfo,
			userPageType: state => state.user.userPageType,
			mineInfo: state => state.user.mineInfo,
			coachInfo: state => state.user.coachInfo,
		}),
		onLoad(options) {
			this.options = options
			let {
				type = 1
			} = options
			if (type) {
				this.updateUserItem({
					key: 'userPageType',
					val: type
				})
			}
			let {
				id: mine_id = -1
			} = this.mineInfo
			if (mine_id == -1) {
				this.$util.showLoading()
			}
			this.initIndex()
		},
		async onShow() {
			// #ifndef H5
			await this.initIndex(true)
			// #endif
		},
		onPullDownRefresh() {
			// #ifndef APP-PLUS
			uni.showNavigationBarLoading()
			// #endif
			this.initRefresh();
			uni.stopPullDownRefresh()
		},
		methods: {
			...mapActions(['getConfigInfo', 'getPlugAuth', 'getUserInfo', 'getMineInfo', 'getCoachInfo',
				'getAuthUserProfile', 'updateCommonOptions', 'toPlayAudio'
			]),
			...mapMutations(['updateUserItem']),
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
				await Promise.all([this.getPlugAuth(), this.getMineInfo()])
				this.isLoad = true

				let {
					fx_check
				} = this.configInfo
				let {
					coach_status,
					fx_status
				} = this.mineInfo

				if (coach_status == 2 || coach_status == 3) {
					await this.getCoachInfo()
				}
				if (this.userPageType == 2) {
					this.getOrderNumCall()
				}
				this.updateUserItem({
					key: 'userPageType',
					val: coach_status == 2 || coach_status == 3 ? this.userPageType : 1
				})

				let arr = ['coach_status']
				//let arr = ['coach_status', 'channel_status']
				let textArr = {
					coach_status: {
						text: '申请技师',
						list: {
							icon: 'iconshenqingjishi',
							text: '申请技师',
							url: '/user/pages/apply'
						}
					},
					//channel_status: {
					//	text: '申请渠道商',
					//	list: {
					//		icon: 'icon-zuzhi',
					//		text: '申请渠道商',
					//		url: '/user/pages/channel/apply'
					//	},
					//	list2: {
					//		icon: 'icon-zuzhi',
					//		text: '我是渠道商',
					//		url: '/user/pages/channel/income'
					//	}
					//}
				}
				arr.map(item => {
					if (this.mineInfo[item] != 2) {
						let arr = this.toolList.filter(aitem => {
							return aitem.text === textArr[item].text
						})
						if (arr.length === 0) {
							this.toolList.unshift(textArr[item].list)
						}
						if (item === 'channel_status') {
							let aindex = this.toolList.findIndex(aitem => {
								return aitem.text === '我是渠道商'
							})
							if (aindex != -1) {
								this.toolList.splice(aindex, 1)
							}
						}
					} else {
						this.toolList.map((aitem, aindex) => {
							if (aitem.text === textArr[item].text) {
								this.toolList.splice(aindex, 1)
							}
						})
						if (item === 'channel_status') {
							let arr = this.toolList.filter(aitem => {
								return aitem.text === '我是渠道商'
							})
							if (arr.length === 0) {
								this.toolList.unshift(textArr[item].list2)
							}
						}
					}
				})

				let dynamicInd = this.toolList2.findIndex(item => {
					return item.text == '动态发布'
				})
				if (this.plugAuth.dynamic && dynamicInd == -1) {
					let badInd = this.toolList2.findIndex(item => {
						return item.text == '差评申诉'
					})
					this.toolList2.splice(badInd + 1, 0, {
						icon: 'icon-dongtai1',
						text: '动态发布',
						url: '/dynamic/pages/technician/list'
					})
				}
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			async getOrderNumCall() {
				let data = await this.$api.technician.getOrderNum()
				this.orderList2[0].number = data.wait //待接单
				this.orderList2[1].number = data.start //待服务
				this.orderList2[2].number = data.progress //服务中
			},
			// 更新用户信息
			async authUserProfile() {
				let {
					id: uid = 0
				} = this.userInfo

				if (!uid) {
					// #ifndef MP-WEIXIN
					this.$util.toCheckLogin({
						url: `/pages/mine`
					})
					// #endif
					return
				}

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
				// #ifdef MP-WEIXIN
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
					this.$util.showLoading({
						title: '更新中'
					})
					let {
						coupon_atv_id = 0
					} = this.commonOptions
					userInfo.coupon_atv_id = coupon_atv_id
					await this.getAuthUserProfile(userInfo)
					setTimeout(() => {
						this.$util.hideAll()
					}, 1000)
				}
			},
			// 选择地区
			async toChooseLocation(type) {
				if (this.userPageType == 2 && type) return
				await this.$util.checkAuth({
					type: 'userLocation'
				})
				let [, {
					address = '',
					longitude,
					latitude
				}] = await uni.chooseLocation();
				if (!address) return
				await this.$api.technician.coachUpdate({
					address,
					lng: longitude,
					lat: latitude
				})
				let data = this.$util.deepCopy(this.coachInfo)
				data.address = address
				this.updateUserItem({
					key: 'coachInfo',
					val: data
				})
				this.$util.showToast({
					title: `更新成功`
				})
			},
			toJump(key, index) {
				let {
					url,
					text
				} = this[key][index]
				if (['申请技师', '申请分销商', '申请渠道商'].includes(text)) {
					this.toApply(text == '申请技师' ? 1 : text == '申请分销商' ? 2 : 3)
					return
				}
				if (text == '切换用户端') {
					this.toChange()
					return
				}
				if (text == '联系客服') {
					let {
						mobile: url,
						im_type
					} = this.configInfo
					// #ifdef MP-WEIXIN
					if (im_type == 2) return
					// #endif
					this.$util.goUrl({
						url,
						openType: 'call'

					})
					return
				}
				let openType = key == 'orderList' && index !== 4 ? `reLaunch` : 'navigateTo'
				this.$util.log(url)
				this.$util.toCheckLogin({
					url,
					openType
				})
			},
			async toAtv() {
				if (!this.mineInfo.is_atv) {
					this.$util.showToast({
						title: `暂无活动`
					})
					return
				}
				let options = this.commonOptions
				options.coupon_atv_id = 0
				await this.updateCommonOptions(options)
				this.$util.toCheckLogin({
					url: `/user/pages/coupon/share`
				})
			},
			// 申请技师/分销商/渠道商
			async toApply(type) {
				let {
					coach_status = -1,
						fx_status = -1,
						channel_status = -1
				} = this.mineInfo
				let status = type == 1 ? coach_status : type == 2 ? fx_status :
					channel_status
				let page = {
					1: `/technician/pages/apply`,
					2: `/user/pages/distribution/apply`,
					3: `/user/pages/channel/apply`
				}
				// -1未申请，1审核中，2审核通过，3取消授权，4审核失败
				let url = status == -1 ? page[type] :
					`/user/pages/apply-result?type=${type}`
				this.$util.log(url)
				this.$util.toCheckLogin({
					url
				})
			},
			// 切换用户/技师端
			async toChange() {
				uni.pageScrollTo({
					duration: 500,
					scrollTop: 0
				})
				let {
					userPageType = 1
				} = this
				if (userPageType == 2) {
					await this.getCoachInfo()
				}
				if (userPageType == 1) {
					this.getOrderNumCall()
				}
				this.updateUserItem({
					key: 'userPageType',
					val: userPageType == 2 ? 1 : 2
				})
			},
			onChange(e) {
				let {
					x,
					y
				} = e.detail
				this.$nextTick(() => {
					this.offsetL = x
					this.offsetT = y
				})
			},
			// 求助
			async toHelp() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					this.$util.showLoading()
					await this.$jweixin.wxReady2();
					let {
						latitude: lat = 0,
						longitude: lng = 0
					} = await this.$jweixin.getWxLocation()
					if (!lat) {
						this.$util.hideAll()
						this.$util.showToast({
							title: `请授权定位当前地址`
						})
						return
					}
					if (lat && lng) {
						let key = `${lat},${lng}`
						let data = await this.$api.base.getMapInfo({
							location: key
						})
						let {
							status,
							result
						} = JSON.parse(data)
						if (status == 0) {
							this.$util.hideAll()
							let {
								address
							} = result
							this.toPolice({
								lat,
								lng,
								address
							})
						}
					}
				}
				// #endif
				// #ifndef H5
				this.$util.showLoading()
				let {
					lat = '',
						lng = '',
						address = ''
				} = await this.$util.getBmapLocation()
				if (!lat) {
					this.$util.hideAll()
					this.$util.showToast({
						title: `请授权定位当前地址`
					})
					return
				}
				this.toPolice({
					lat,
					lng,
					address
				})
				// #endif
			},
			async toPolice(param) {
				await this.$api.technician.police(param)
				this.$util.hideAll()
				this.$util.showToast({
					title: `求救成功`
				})
			}
		}
	}
</script>

<style lang="scss">
	.pages-mine {
		.mine-bg {
			width: 100%;
			height: 368rpx;
			/* #ifdef H5 */
			z-index: 0;
			/* #endif */
			/* #ifndef H5 */
			z-index: -1;
			/* #endif */
		}

		.mine-master-bg {
			width: 100%;
			height: 514rpx;
			z-index: -1;
		}

		.avatar_view {
			width: 120rpx;
			height: 120rpx;

			.avatar {
				width: 120rpx;
				height: 120rpx;
				overflow: hidden;

				open-data {
					width: 120rpx;
					height: 120rpx;
				}
			}

			.text {
				width: 110rpx;
				position: absolute;
				bottom: -5rpx;
				left: 5rpx;
				height: 36rpx;
				line-height: 36rpx;
				background: #FFFFFF;
				border-radius: 18rpx;
				font-size: 24rpx;
				text-align: center;
			}
		}


		.member-tag {
			min-width: 168rpx;
			height: 42rpx;
			background: rgba(255, 255, 255, 0.5);

			.iconfont {
				font-size: 28rpx;
			}
		}

		.icon-shuaxin,
		.icon-xitong {
			font-size: 40rpx;
		}

		// 定位/时间/求救
		.addr-time-help-list {
			width: 100%;
			padding: 40rpx 0;

			.flex-center {
				width: 33.33%;

				.iconfont {
					font-size: 60rpx;
					margin-bottom: 10rpx;
				}
			}

		}

		// 技师信息
		.coach-info {
			.avatar {
				width: 140rpx;
				height: 140rpx;
			}

			.coach-name {
				font-size: 34rpx;
				color: #142C57
			}

			.coach-text {
				color: #5A677E
			}

			.icon-right {
				font-size: 22rpx
			}

			.tag-item {
				min-width: 92rpx;
				height: 36rpx;
				padding: 0 10rpx;
				font-size: 24rpx;
				border-radius: 6rpx;
				transform: rotateZ(360deg);
			}

			.map-addr {
				width: 102rpx;
				height: 46rpx;
				padding-right: 6rpx;

				.iconfont {
					margin-right: 2rpx
				}
			}

			.map-addr.abs {
				top: 0;
				left: 0;
				opacity: 0.1;
			}
		}

		// 收入
		.mine-count-list {
			.cancel-auth {
				width: 110rpx;
				height: 100rpx;
				font-size: 100rpx;
				top: -20rpx;
				right: 55rpx;

				.text-bold {
					height: 26rpx;
					transform: rotate(-32deg);
				}
			}

			.item-child {
				width: 50%;
				padding: 28rpx;

				.text {
					color: #5A677E;
				}

				.cash-btn {
					width: 108rpx;
					height: 46rpx;
					transform: rotateZ(360deg);
				}
			}

		}

		// 卡券/关注/收藏
		.share-collect-list {
			.share-item {
				width: 50%;
				height: 105rpx;
			}

			.item-child {
				width: 50%;

				.item-icon {
					width: 70rpx;
					height: 70rpx;

					.iconfont {
						font-size: 38rpx;
					}

					.item-icon {
						top: 0;
						left: 0;
						opacity: 0.1;
					}
				}
			}

		}

		.store-btn {
			width: 182rpx;
			height: 62rpx
		}

		// 分享-卡券
		.share-atv-img {
			width: 716rpx;
			height: 190rpx;
			margin: 0 auto;
		}

		// 我的订单/其他
		.mine-menu-list {
			margin: 20rpx 30rpx 0 30rpx;

			.menu-title {
				height: 90rpx;

				.iconfont {
					font-size: 24rpx;
				}
			}

			.item-child {
				width: 20%;
				margin: 10rpx 0;

				.iconfont {
					font-size: 52rpx;
				}

				.item-img {
					width: 88rpx;
					height: 88rpx;

					.iconfont {
						font-size: 44rpx;
					}

					.item-img {
						top: 0;
						left: 0;
						opacity: 0.1;
					}
				}

				.item-child-number {
					right: 0;
					top: 0;
					width: 24rpx;
					height: 24rpx;
					border-radius: 24rpx;
					background-color: #F1381F;
					color: #fff;
					font-size: 18rpx;
				}

			}
		}

		// 工具
		.mine-tool-list {
			margin: 20rpx 30rpx 0 30rpx;
			box-shadow: 0px 3px 6px 0px rgba(227, 227, 227, 0.47);

			.list-item {
				.left-icon {
					width: 42rpx;
					font-size: 42rpx;
				}

				.icon-right {
					font-size: 28rpx;
				}

				.icon-switch {
					font-size: 70rpx;
					line-height: 48rpx;
				}
			}

			.list-item.b-1px-t:before {
				left: 60rpx;
			}
		}

	}
</style>
