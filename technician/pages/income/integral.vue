<template>
	<view class="master-income-record">
		<view class="list-item mt-md ml-lg mr-lg pd-lg fill-base radius-16" :class="[{'b-1px-t':index!=0}]"
			v-for="(item,index) in  6" :key="index">
			<!-- 服务完成/服务好评/拒绝服务/差评 -->
			<view class="flex-between f-title c-title">
				<view>服务完成</view>
				<view :class="[{'c-success':index==0},{'c-warning':index!=0}]">
					{{item.status == 2?'+':'-'}}1分
				</view>
			</view>
			<view class="flex-between f-caption c-caption">
				<view>2021-03-22 20:15</view>
				<view>剩余积分：340分</view>
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
		mapMutations
	} from "vuex"
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				color: '#ffffff',
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
				}],
				statusType: {
					1: '未到账',
					2: '已到账',
					3: '已拒绝',
				},
				detail: {},
				param: {
					page: 1,
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
			this.detail = this.$util.getPage(-1).detail
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
				let newList = await this.$api.master.capCashList(param);

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
	.master-income-record {}
</style>
