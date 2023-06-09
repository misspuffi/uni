<template>
	<view class="dynamic-follow">
		<!-- https://lbqny.migugu.com/admin/anmo/mine/search.png -->
		<view class="list-item flex-center fill-base mt-md ml-md mr-md pd-lg radius-16 box-shadow"
			v-for="(item,index) in list.data" :key="index">
			<image class="avatar radius" :src="item.work_img"></image>
			<view class="flex-1 flex-between ml-md">
				<view>
					<view class="flex-y-center">
						<view class="f-title c-black text-bold max-200 ellipsis">{{item.coach_name}}</view>
						<view class="flex-y-center f-caption c-caption ml-md"> 粉丝数 <view class="c-title ml-sm">
								{{item.fans_number}}
							</view>
						</view>
					</view>
					<view class="text flex-y-center f-desc">{{item.day_count}}天已接单<view class="ml-md"
							:style="{color:primaryColor}">
							{{item.order_count}}
						</view>
					</view>
				</view>
				<view class="flex-y-baseline f-desc c-black"> <i class="iconfont icondangqianweizhi"
						:style="{color:primaryColor}"></i>
					{{item.distance}}
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<view class="space-footer"></view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				loading: true,
				param: {
					page: 1
				},
				list: {
					data: []
				}

			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
		}),
		onLoad() {
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
			this.initIndex()
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
		methods: {
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.getList();
			},
			handerTabChange(index) {
				this.activeIndex = index
				this.param.status = index
				this.getList();
			},

			initRefresh() {
				this.param.page = 1
				this.initIndex(true)
			},
			async getList() {
				this.$util.showLoading()
				let {
					list: oldList,
					param
				} = this
				let newList = await this.$api.technician.appealList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},

		}
	}
</script>

<style lang="scss">
	.dynamic-follow {
		.list-item {
			.avatar {
				width: 124rpx;
				height: 124rpx;
			}

			.text {
				color: #4D4D4D;
				margin-top: 6rpx;
			}
		}
	}
</style>
