<template>
	<view class="pages-dynamic" v-if="isLoad">
		<fixed>
			<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" title="动态" :color="`#fff`"
				:backgroundColor="primaryColor">
			</uni-nav-bar>
			<view class="fix-info fill-body rel">
				<view class="space-top abs" :style="{background:primaryColor}"></view>
				<view class="search-info fill-base pt-lg pl-lg pr-lg pb-md abs">
					<view class="flex-center pb-md">
						<view @tap.stop="$refs.show_item.open()" class="dynamic-btn flex-center f-caption mr-lg radius"
							:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">
							<i class="iconfont icon-jia-bold"></i>
							发动态
						</view>
						<view class="flex-1">
							<search @input="toSearch" type="input" :padding="0" :radius="30" backgroundColor="#F0F0F0"
								placeholder="请输入技师姓名">
							</search>
						</view>
					</view>
					<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1"
						:activeColor="primaryColor" width="50%" height="90rpx" fontSize="28rpx" :numberType="2"
						lineClass="sm"></tab>
				</view>
			</view>
		</fixed>

		<wfalls-flow :list="list.data" :path="1" ref="wfalls" v-if="list.data.length > 0"></wfalls-flow>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>

		<view class="space-footer"></view>
		<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
		<tabbar :cur="3"></tabbar>

		<!-- #ifdef APP-PLUS -->
		<login-info></login-info>
		<!-- #endif -->


		<uni-popup ref="show_item" type="bottom">
			<view class="show-popup pd-lg">
				<view @tap.stop="toAddDynamic(1)" class="show-item flex-center f-paragraph mt-md radius-16">发布图片
				</view>
				<view @tap.stop="toAddDynamic(2)" class="show-item flex-center f-paragraph mt-md radius-16">发布视频
				</view>
				<view @tap.stop="$refs.show_item.close()" class="show-item flex-center f-paragraph mt-md radius-16"
					:style="{color:primaryColor}">取消</view>
				<view class="space-safe"></view>
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
	import tabbar from "@/components/tabbar.vue"
	import wfallsFlow from "@/components/wfalls-flow.vue"
	export default {
		components: {
			tabbar,
			wfallsFlow
		},
		data() {
			return {
				isLoad: false,
				options: {},
				loading: true,
				lockTap: false
			}
		},
		computed: mapState({
			pageActive: state => state.dynamic.pageActive,
			activeIndex: state => state.dynamic.activeIndex,
			tabList: state => state.dynamic.tabList,
			param: state => state.dynamic.param,
			list: state => state.dynamic.list,
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
			// #ifndef H5
			this.$util.showLoading()
			// #endif
			if (this.pageActive) {
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
				return
			}
			await this.initIndex()
		},
		onShow() {
			if (this.haveShieldOper == 1) {
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
			...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions', 'getDynamicIndex',
				'getDynamicList'
			]),
			...mapMutations(['updateUserItem', 'updateDynamicItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.toAppShare()
				}
				// #endif
				let {
					pid = 0
				} = this.options
				let {
					id: uid = 0
				} = this.userInfo
				if (pid && !uid) {
					await this.getUserInfo()
				}
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				await this.getDynamicIndex()
				this.updateDynamicItem({
					key: 'pageActive',
					val: true
				})
				this.isLoad = true
				await this.getList(1)
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
			async handerTabChange(index) {
				this.updateDynamicItem({
					key: 'activeIndex',
					val: index
				})
				this.$util.showLoading()
				uni.pageScrollTo({
					scrollTop: 0
				})
				await this.getList(1)
				if (index == 1) {
					await this.getDynamicIndex()
				}
			},
			async getList(page = 0) {
				if (page) {
					let param = this.$util.deepCopy(this.param)
					param.page = page
					this.updateDynamicItem({
						key: 'param',
						val: param
					})
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
						let {
							latitude: lat = 0,
							longitude: lng = 0
						} = await this.$jweixin.getWxLocation()
						location = {
							lng,
							lat,
							address: '定位失败',
							province: '',
							city: '',
							district: ''
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
					location = await this.$util.getBmapLocation()
					// #endif
					this.updateUserItem({
						key: 'location',
						val: location
					})
				}
				let {
					lat = 0, lng = 0
				} = location

				let {
					list: oldList,
				} = this
				let param = Object.assign({}, this.param, {
					lat,
					lng
				});
				await this.getDynamicList(param)
				this.loading = false
				this.$util.hideAll()
			},
			toAddDynamic(type) {
				this.$refs.show_item.close()
				this.$util.goUrl({
					url: `/dynamic/pages/technician/edit?type=${type}`
				})
			}
		}
	}
</script>


<style lang="scss">
	.pages-dynamic {
		.fix-info {
			height: 225rpx;

			.space-top {
				width: 100%;
				height: 40rpx;
				top: 0;
			}

			.search-info {
				width: 100%;
				top: 0;
				border-radius: 40rpx;

				.dynamic-btn {
					width: 134rpx;
					height: 56rpx;

					.iconfont {
						font-size: 24rpx;
						margin-right: 6rpx;
					}
				}
			}
		}

		.show-popup {
			width: 750rpx;
			background: #F3F3F5;
			border-radius: 30rpx 30rpx 0 0;

			.avatar {
				width: 84rpx;
				height: 84rpx;
			}

			.show-item {
				color: #222;
				height: 100rpx;
				background: #fff;
			}
		}

	}
</style>
