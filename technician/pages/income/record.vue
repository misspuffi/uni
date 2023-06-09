<template>
	<view class="master-income-record" v-if="isLoad">
		<view class="mine-menu-list c-base" :style="{background:primaryColor}">
			<view class="space-lg"></view>
			<view class="space-lg"></view>
			<view class="flex-center f-caption mt-sm mb-sm">已累计提现金额(元)</view>
			<view class="money-info flex-center flex-y-baseline">¥<view class="money">{{list.extract_total_price}}
				</view>
			</view>
			<view class="space-md"></view>
			<view class="space-lg"></view>
		</view>
		<view class="fill-base">
			<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1" :activeColor="primaryColor"
				width="25%" height="100rpx"></tab>
			<view class="ml-lg mr-lg b-1px-b"></view>

			<view class="list-item flex-center pd-lg" :class="[{'b-1px-t':index!=0}]" v-for="(item,index) in  list.data"
				:key="index">
				<view class="flex-warp flex-1">
					<view class="item-tag mt-sm mr-md radius"
						:style="{background: item.status == 1 ? '#11C95E' : item.status==2? primaryColor :subColor}">
					</view>
					<view class="f-caption c-caption">
						<view class="f-title c-title text-bold">{{statusType[item.status]}}</view>
						<view class="f-caption c-caption" v-if="item.status == 2">实际到账：{{item.apply_price}}</view>
						<view class="f-caption c-caption">{{item.create_time}}</view>
					</view>
				</view>
				<view class="f-md-title">{{item.status == 2?'+':'-'}}{{item.total_price}}</view>
			</view>
			<!-- <view class="list-item flex-center pd-lg" :class="[{'b-1px-t':index!=0}]" v-for="(item,index) in  6"
				:key="index">
				<view class="flex-warp flex-1">
					<view class="item-tag mt-sm mr-md radius"
						:style="{background: index == 0 ? '#11C95E' : index==1? primaryColor :subColor}"></view>
					<view class="f-caption c-caption">
						<view class="f-title c-title text-bold">{{statusType[index]}}</view>
						<view>今天 11:11</view>
					</view>
				</view>
				<view class="f-md-title">{{item.status == 2?'+':'-'}}{{item.true_cash}}</view>
			</view> -->
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
				activeIndex: 0,
				tabList: [{
					title: '全部',
					id: 0
				}, {
					title: '未到账',
					id: 1,
				}, {
					title: '已到账',
					id: 2
				}, {
					title: '已拒绝',
					id: 3
				}],
				statusType: {
					1: '未到账',
					2: '已到账',
					3: '已拒绝',
				},
				param: {
					page: 1,
					type: 1
				},
				list: {
					data: []
				},
				loading: true,
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		async onLoad() {
			this.$util.showLoading()
			await this.initIndex()
			this.isLoad = true
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
			...mapMutations([]),
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
				this.param.page = 1
				this.initIndex(true)
			},
			async getList() {
				let {
					list: oldList,
					param,
					activeIndex,
					tabList
				} = this
				let status = tabList[activeIndex].id
				param.status = status
				let newList = await this.$api.technician.capCashList(param);

				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.activeIndex = index;
				this.$util.showLoading()
				this.param.page = 1;
				this.getList()
			},
			toCopy(index) {
				let {
					order_code: url
				} = this.list.data[index]
				this.$util.goUrl({
					url,
					openType: 'copy'
				})
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

		.list-item {
			.item-tag {
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
</style>
