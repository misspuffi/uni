<template>
	<view class="pages-home" v-if="isLoad">
		<!-- #ifndef H5 -->
		<uni-nav-bar :fixed="true" :shadow="false" :statusBar="true" title="首页" color="#ffffff"
			:backgroundColor="primaryColor">
		</uni-nav-bar>
		<view :style="{height:`${configInfo.navBarHeight}px`}"></view>
		<!-- #endif -->
		<view :class="[{'rel':banner.length >0}]" :style="{height:banner.length > 0?`464rpx`:`84rpx`}">
			<banner @change="goBanner" :list="banner" :margin="0" :autoplay="true" :indicatorActiveColor="primaryColor"
				:dotWidth="20" :dotBottom="30" v-if="banner.length > 0">
			</banner>
			<view class="search-box flex-center fill-base ml-md mr-md radius"
				:class="[{'mt-md':banner.length ==0},{'abs':banner.length>0}]">
				<view style="width: 92%;">
					<tab @change="handerTabChange" :isLine="false" :list="tabList" :activeIndex="activeIndex*1"
						:activeColor="primaryColor" :width="100/tabList.length + '%'" height="84rpx"></tab>
				</view>
				<view style="width: 8%;"></view>
			</view>
		</view>

		<view class="fill-base mt-md ml-md mr-md pt-lg pl-lg pr-md pb-lg radius-16"
			v-if="recommend_list && recommend_list.length > 0">
			<view @tap.stop="$util.goUrl({url: `/pages/technician`,openType: `reLaunch`})" class="flex-between pb-lg">
				<view class="f-paragraph c-black text-bold">推荐技师</view>
				<view class="flex-y-center f-caption c-caption">查看更多<i class="iconfont icon-right"
						style="font-size: 24rpx;"></i></view>
			</view>
			<scroll-view scroll-x class="recommend-technician">
				<block v-for="(item,index) in recommend_list" :key="index">
					<view @tap.stop="toTechnician(index)" class="recommend-item type-1" v-if="recommend_style == 1">
						<!-- #ifdef H5 -->
						<view class="cover radius-16">
							<view class="h5-image cover radius-16"
								:style="{ backgroundImage : `url('${item.work_img}')`}">
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<image mode="aspectFill" lazy-load class="cover radius-16" :src="item.work_img"></image>
						<!-- #endif -->
						<view class="flex-center f-desc c-title mt-md">
							<view class="ellipsis">{{item.coach_name}}</view>
						</view>
					</view>
					<view @tap.stop="toTechnician(index)" class="recommend-item type-2 pd-md"
						v-if="recommend_style == 2">
						<view class="flex-center pb-sm">
							<!-- #ifdef H5 -->
							<view class="cover radius">
								<view class="h5-image cover radius"
									:style="{ backgroundImage : `url('${item.work_img}')`}">
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifndef H5 -->
							<image mode="aspectFill" lazy-load class="cover radius" :src="item.work_img"></image>
							<!-- #endif -->
							<view class="flex-1 ml-sm">
								<view class="f-desc ellipsis">{{item.coach_name}}</view>
								<view class="flex-y-baseline" style="margin-top: 4rpx;">
									<i class="iconfont iconyduixingxingshixin icon-font-color"></i>
									<view class="star-text flex-y-center f-caption">{{item.star}}</view>
								</view>
							</view>
						</view>
						<view class="flex-center">
							<view class="new-technician flex-center f-icontext"
								:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}" v-if="item.is_new">新人
							</view>
							<view class="f-icontext c-caption" v-else>30天接单{{item.order_count||0}}
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

		<view @tap.stop="goDetail(index)" class="list-item flex-center mt-md ml-md mr-md pd-lg fill-base radius-16"
			v-for="(item, index) in list.data" :key="index">
			<!-- #ifdef H5 -->
			<view class="cover radius-16">
				<view class="h5-image cover radius-16" :style="{ backgroundImage : `url('${item.cover}')`}">
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<image mode="aspectFill" lazy-load class="cover radius-16" :src="item.cover"></image>
			<!-- #endif -->


			<view class="flex-1 ml-md" style="max-width: 450rpx;">
				<view class="flex-between">
					<view class="f-title c-title text-bold max-270 ellipsis">{{ item.title }}</view>
					<view class="f-caption c-caption">{{ item.total_sale }}人已预约</view>
				</view>
				<view class="f-caption c-caption mt-sm mb-sm ellipsis" style="height: 36rpx;">{{ item.sub_title || '' }}
				</view>
				<view class="flex-between mt-md">
					<view class="flex-y-center f-desc c-caption max-350 ellipsis">
						<view class="time-long flex-center">{{ item.time_long }}分钟</view>
						<view class="flex-y-baseline f-icontext c-warning ml-sm mr-sm">¥<view class="f-sm-title">
								{{ item.price }}
							</view>
						</view>
						<view class="text-delete" v-if="item.init_price">¥{{ item.init_price }}</view>
					</view>
					<auth @tap.stop.prevent :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)" :must="true"
						:type="!userInfo.phone ? 'phone' : 'userInfo'" @go="toChoose(index)" style="width:130rpx;">
						<view class="item-btn flex-center f-caption c-base" :style="{ background: primaryColor }">
							选择技师
						</view>
					</auth>
				</view>
			</view>
		</view>

		<load-more :noMore="list.current_page >= list.last_page && list.data.length > 0" :loading="loading"
			v-if="loading">
		</load-more>
		<abnor v-if="!loading && list.data.length <= 0 && list.current_page == 1"></abnor>

		<view class="space-footer"></view>


		<uni-popup ref="coupon_item" type="center" :maskClick="false">
			<view class="coupon-popup f_r_c_c">
				<!-- #ifdef H5 -->
				<view class="h5-image bg-img"
					:style="{ backgroundImage : `url('https://lbqnyv2.migugu.com/bianzu3.png')`}">
				</view>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<image mode="aspectFill" lazy-load class="bg-img" src="https://lbqnyv2.migugu.com/bianzu3.png"></image>
				<!-- #endif -->

				<i @tap.stop="$refs.coupon_item.close()" class="iconfont icon-close c-base"></i>
				</image>
				<view class="coupon-info f_c_m_c">
					<view class="tops f_c_m_c">
						<view class="">
							成功领取
						</view>
						<view class="">
							卡券将放入“我的-我的卡券”
						</view>
					</view>
					<view class="lists f_r_c_c">
						<scroll-view scroll-y style="width: 420rpx;height:100%;">
							<view class="list f_r_sb_c" v-for="(item, index) in couponList" :key="index">
								<image src="/static/coupon/coupon.png" mode="aspectFill"></image>
								<view class="f_r_sb_c">
									<view class="f_c_m_c">
										<view class="price">
											{{item.discount}}
										</view>
										<view class="price_text">
											{{item.full*1>0?`满${item.full}可用`:`立减`}}
										</view>
									</view>
									<view class="title f_r_m_c">
										<view class="ellipsis-3">
											{{item.title}}
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="btns f_r_c_c" @tap.stop="userGetCoupon">
					<view class="f_r_c_c">
						领取到卡包
					</view>
				</view>
			</view>
		</uni-popup>
		<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
		<tabbar :cur="1"></tabbar>

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
	import siteInfo from '@/siteinfo.js';
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				couponList: [], //优惠券
				isLoad: false,
				options: {},
				loading: true,
				lockTap: false
			}
		},
		computed: mapState({
			pageActive: state => state.service.pageActive,
			activeIndex: state => state.service.activeIndex,
			tabList: state => state.service.tabList,
			param: state => state.service.param,
			list: state => state.service.list,
			banner: state => state.service.banner,
			recommend_list: state => state.service.recommend_list,
			recommend_style: state => state.service.recommend_style,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			autograph: state => state.user.autograph,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			haveShieldOper: state => state.user.haveShieldOper,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			options = await this.updateCommonOptions(options)
			this.options = options
			if (this.pageActive) {
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
				return
			}
			uni.onNetworkStatusChange((res) => {
				let {
					isConnected
				} = res
				if (isConnected && !this.pageActive) {
					this.initIndex()
					return
				}
			})
			await this.initIndex()
		},
		onShow() {
			if (this.haveShieldOper == 2) {
				this.initIndex()
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 0
				})
			}
			// #ifndef H5
			if (this.pageActive) return
			this.initIndex()
			// #endif
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
			this.loading = true;
			this.getList(this.param.page + 1);
		},
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let path = `/pages/service?pid=${pid}`
			this.$util.log(path)
			return {
				title: '',
				imageUrl: '',
				path,
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions', 'getServiceIndex', 'getServiceList']),
			...mapMutations(['updateServiceItem', 'updateTechnicianItem', 'updateUserItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.toAppShare()
				}
				// #endif
				let {
					pid = 0,
						channel_id = 0
				} = this.options
				let {
					id: uid = 0
				} = this.userInfo
				if ((pid || channel_id) && !uid) {
					await this.getUserInfo()
				}
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}

				let {
					location
				} = this
				if (!location.lat) {
					// #ifdef H5
					if (this.$jweixin.isWechat()) {
						this.$util.showLoading()
						// await this.$jweixin.initJssdk();
						await this.$jweixin.wxReady2();
					//	let {
					//		latitude: lat = 0,
					//		longitude: lng = 0
					//	} = await this.$jweixin.getWxLocation()
					//	location = {
					//		lng,
					//		lat,
					//		address: '定位失败',
					//		province: '',
					//		city: '',
					//		district: ''
					//	}
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
								let {
									address,
									address_component
								} = result
								let {
									province,
									city,
									district
								} = address_component
								location = {
									lng,
									lat,
									address,
									province,
									city,
									district
								}
							}
						}
					}
					// #endif
					// #ifndef H5
					//location = await this.$util.getBmapLocation()
					// #endif
					this.updateUserItem({
						key: 'location',
						val: location
					})
				}
				let {
					lng = 0,
						lat = 0
				} = location

				await this.getServiceIndex({
					lat,
					lng
				})
				this.updateServiceItem({
					key: 'pageActive',
					val: true
				})
				this.isLoad = true
				await Promise.all([this.getList(1), this.getCouponList()])
			},
			initRefresh() {
				this.initIndex(true)
			},
			toAppShare() {
				let {
					id: pid = 0
				} = this.userInfo
				let title = '首页'
				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/pages/service?pid=${pid}`
				let imageUrl = ''
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, '', href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
			},
			// 轮播图/广告图跳转
			goBanner(e) {
				// connect_type 1查看大图，2文章
				let {
					connect_type,
					type_id: id = 0,
					img: current
				} = e
				switch (connect_type) {
					case 1:
						this.$util.previewImage({
							current,
							urls: [current]
						})
						break;
					case 2:
						this.$util.goUrl({
							url: `/user/pages/article?id=${id}`
						})
						break;
				}
			},
			async userGetCoupon() {
				let ids = []
				this.couponList.forEach(v => {
					ids.push(v.id)
				})
				let res = await this.$api.service.userGetCoupon({
					coupon_id: ids
				})
				this.$util.showToast({
					title: `领取成功`
				})
				setTimeout(() => {
					this.$util.goUrl({
						url: '/user/pages/coupon/list'
					})
				}, 1000)
				this.$refs.coupon_item.close()
				this.loading = false
				this.$util.hideAll()
			},
			async getCouponList() {
				let list = await this.$api.service.couponList()
				this.couponList = list
				if (list.length > 0 && this.isLoad) {
					this.$refs.coupon_item.open()
				}
				this.loading = false
				this.$util.hideAll()
			},
			async getList(page = 0) {
				if (page) {
					let param = this.$util.deepCopy(this.param)
					param.page = page
					this.updateServiceItem({
						key: 'param',
						val: param
					})
				}
				let {
					list: oldList,
					param,
					tabList,
					activeIndex
				} = this
				let {
					sort,
					sign
				} = tabList[activeIndex]
				let desc = activeIndex == 0 || sign == 1 ? '' : 'desc'
				param.sort = `${sort} ${desc}`
				await this.getServiceList(param)
				this.loading = false
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.updateServiceItem({
					key: 'activeIndex',
					val: index
				})
				let tabList = this.$util.deepCopy(this.tabList)
				let {
					is_sign,
					sign,
				} = tabList[index];
				if (is_sign) {
					tabList[index].sign = sign == 0 ? 1 : 0;
				}
				this.updateServiceItem({
					key: 'tabList',
					val: tabList
				})
				this.$util.showLoading()
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.getList(1)
			},
			// 详情
			goDetail(index) {
				let {
					id
				} = this.list.data[index]
				let url = `/user/pages/detail?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 选择技师
			toChoose(index) {
				let {
					id
				} = this.list.data[index]
				let url = `/user/pages/choose-technician?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			toTechnician(index) {
				let {
					id,
					city_id,
					coach_name
				} = this.recommend_list[index]
				this.updateTechnicianItem({
					key: 'pageActive',
					val: false
				})
				this.$util.goUrl({
					url: `/pages/technician?coach_id=${id}&coach_name=${coach_name}&city_id=${city_id}`,
					openType: `reLaunch`
				})
			}
		}
	}
</script>


<style lang="scss">
	.pages-home {
		.search-box {
			width: 710rpx;
			bottom: 0;
			z-index: 9;
			overflow: hidden;
		}

		.recommend-technician {
			white-space: nowrap;
			width: 650rpx;

			.recommend-item {
				display: inline-block;
			}

			.recommend-item.type-1 {
				width: 143rpx;
				margin-left: 26rpx;

				.cover {
					width: 143rpx;
					height: 143rpx;
				}

				.ellipsis {
					max-width: 143rpx;
				}
			}

			.recommend-item.type-2 {
				width: 203rpx;
				height: 151rpx;
				background: #F4F6F7;
				border-radius: 12rpx;
				margin-left: 20rpx;

				.cover {
					width: 70rpx;
					height: 70rpx;
				}

				.ellipsis {
					max-width: 82rpx;
				}

				.iconyduixingxingshixin {
					font-size: 26rpx;
					background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
				}

				.star-text {
					height: 26rpx;
					color: #FF9519;
					margin-left: 6rpx;
				}

				.new-technician {
					width: 67rpx;
					height: 30rpx;
					border-radius: 8rpx;
					transform: rotateZ(360deg);
				}
			}

			.recommend-item:nth-child(1) {
				margin-left: 0;
			}
		}

		.list-item {
			.cover {
				width: 180rpx;
				height: 180rpx;
			}

			.time-long {
				min-width: 72rpx;
				height: 30rpx;
				padding: 0 5rpx;
				background: linear-gradient(270deg, #4C545A 0%, #282B34 100%);
				border-radius: 4rpx;
				font-size: 20rpx;
				color: #FFEEB9;
				margin-right: 16rpx;
			}

			.f-icontext {
				font-size: 18rpx;
			}

			.text-delete {
				font-size: 20rpx;
				color: #B9B9B9;
			}

			.item-btn {
				width: 130rpx;
				height: 52rpx;
				border-radius: 8rpx;
			}
		}
	}

	.coupon-popup {
		width: 658rpx;
		height: 865rpx;
		position: relative;

		.bg-img {
			width: 100%;
			height: 100%;
		}

		.icon-close {
			font-size: 60rpx;
			position: absolute;
			top: 50rpx;
			right: 60rpx;
			z-index: 999;
		}

		.coupon-info {
			position: absolute;
			width: 100%;
			height: 100%;
			bottom: 0;
			left: 0;

			.tops {
				width: 480rpx;
				color: #FB4523;
				position: absolute;
				top: 260rpx;

				>view:nth-child(1) {
					font-weight: bold;
					font-size: 30rpx;
				}
			}

			.lists {
				width: 500rpx;
				height: 300rpx;
				padding: 10rpx;
				overflow-x: hidden;
				position: absolute;
				bottom: 222rpx;

				.list {
					width: 420rpx;
					height: 130rpx;
					margin-bottom: 10rpx;
					margin-top: 5rpx;
					position: relative;

					>image {
						width: 100%;
						height: 100%;
					}

					>view {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 8rpx;

						>view:nth-child(1) {
							width: 38%;
						}

						>view:nth-child(2) {
							display: flex;
							justify-content: center;
							flex: 1;
							padding: 0 15rpx;
							box-sizing: border-box;
						}

						.price {
							font-size: 30rpx;
							color: #FB4523;
						}

						.title {
							font-size: 30rpx;
							line-height: 36rpx;
							font-weight: bold;
						}

						.price_text {
							color: #ccc;
						}
					}
				}
			}

		}

		view.btns {
			width: 100%;
			position: absolute;
			height: 82rpx;
			bottom: 0rpx;
			left: 0;

			>view {
				width: 422rpx;
				height: 82rpx;

				border-radius: 40rpx;
				font-size: 34rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
