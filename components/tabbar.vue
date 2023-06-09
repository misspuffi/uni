<template>
	<view class="custom-tabbar fix flex-center fill-base b-1px-t">
		<view @tap.stop="changeTab(item.id)" class="flex-center flex-column mt-sm"
			:style="{width: 100/configInfo.tabBar.length + '%',color:cur == item.id ? primaryColor : '#666'}"
			v-for="(item,index) in configInfo.tabBar" :key="index">
			<i class="iconfont" :class="cur == item.id ? item.selected_img : item.default_img"></i>
			<view class="text">{{item.name}}</view>
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
		props: {
			cur: {
				type: Number || String,
				default () {
					return '0'
				}
			},
		},
		data() {
			return {}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
			activeIndex: state => state.order.activeIndex,
		}),
		mounted() {
			let that = this;
			let sysheight = uni.getSystemInfoSync().windowHeight
			let configInfo = JSON.parse(JSON.stringify(this.configInfo))
			let {
				navBarHeight,
			} = configInfo
			setTimeout(()=>{
				const query = uni.createSelectorQuery().in(this);
				query.select('.custom-tabbar').boundingClientRect(data => {
					let curSysHeight = sysheight - data.height - navBarHeight
					configInfo.curSysHeight = curSysHeight
					configInfo.tabbarHeight = data.height
					this.updateConfigItem({
						key: 'configInfo',
						val: configInfo
					})
				}).exec();
			},200)
		},
		methods: {
			...mapMutations(['updateConfigItem']),
			// 点击跳转
			changeTab(index) {
				let {
					activeIndex
				} = this
				let page = {
					1: `/pages/service`,
					2: `/pages/technician`,
					3: `/pages/dynamic`,
					4: `/pages/order?tab=${activeIndex}`,
					5: `/pages/mine`,
				}
				if (index == this.cur) return
				this.$util.goUrl({
					url: page[index],
					openType: `reLaunch`
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.custom-tabbar {
		height: 98rpx;
		bottom: 0;
		height: calc(98rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);

		.iconfont {
			font-size: 40rpx;
		}

		.text {
			font-size: 22rpx;
			margin-top: 5rpx;
			height: 32rpx;
		}
	}
</style>
