132132
<template>
	<view>
		<!-- <view class="partner-list b-1px-t" > -->
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold mb-md">基本信息</view>
				<view class="flex-y-baseline f-paragraph c-caption">名称<view class="c-paragraph ml-lg">
						{{list.username}}
					</view>
				</view>
				<view class="flex-y-baseline f-paragraph c-caption">联系电话<view class="c-paragraph ml-lg">
						{{list.tel}}
					</view>
				</view>

			</view>
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold">营业执照信息</view>
				<view class="flex-warp img-list">
					<image @tap.stop="toPreviewImage(index,'license')" mode="aspectFill" class="img-item-mini radius-16"
						:src="item" v-for="(item,index) in list.license" :key="index">
					</image>
				</view>

		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		components: {},
		data() {
			return {
				options: {},
				param: {
					page: 1,
				},
				list: {
					data: []
				},
				loading: true,
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			userInfo: state => state.user.userInfo,
		}),
		onLoad(options) {
			this.options = options
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
			...mapMutations(['']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getList()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.param.page = 1;
				this.initIndex(true)
			},
			async getList() {
				let {
					list: oldList,
					param,
				} = this
				let newList = await this.$api.mine.shanghuInfo(param);
				if (this.param.page == 1) {
					this.list = newList
				} 
				
				this.loading = false
				this.$util.hideAll()
			}
		}
	}
</script>


<style lang="scss">
	.partner-list {
		height: 150rpx;
		display: flex;
		align-items: center;
		background: #fff;
		padding-right: 32rpx;
	}

	.partner-price {
		font-size: 40rpx;
	}

	.partner-price:before {
		content: '￥';
		font-size: 24rpx;
	}

	.partner-sort {
		font-size: 40rpx;
		width: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
