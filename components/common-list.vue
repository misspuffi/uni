<template>
	<view>
		<!-- 品牌 brand -->
		<view class="brand-box fill-base pt-lg pb-lg flex-warp"
			v-if="type == 'brand' || type =='brand-collect' || type == 'brand-tracks'">
			<image mode="aspectFill" class="cover radius-5" :src="info.logo || info.merchant.logo"></image>
			<view class="flex-1 ml-md" :class="[{'flex-between':type != 'brand'}]">
				<view :style="{width: type == 'brand' ? '530rpx' : '400rpx'}">
					<view class="brand-title base-line f-title c-title ellipsis" :class="[{'mt-sm': type !='brand'}]">
						{{info.short_name || info.merchant.short_name}}</view>
					<view class="base-line f-caption c-caption ellipsis">
						企业名称：{{info.mer_name || info.merchant.mer_name}}</view>
					<block v-if="type == 'brand'">
						<view class="flex-warp" v-if="info.categories.length > 0">
							<block v-for="(item,index) in info.categories" :key="index">
								<view class="tag-text flex-center pl-md pr-md f-little" :class="[{'ml-md':index!=0}]"
									:style="{background:subColor,color:primaryColor}">{{item}}</view>
							</block>
						</view>
						<!-- <view class="flex-warp">
							<block v-for="(item,index) in 5" :key="index">
								<image class="mini-cover radius-5" :class="[{'ml-sm':index!=0}]" :src="info.cover"></image>
							</block>
						</view> -->
					</block>
					<block v-else>
						<view class="brand-map flex-y-center f-caption c-caption ellipsis"><i
								class="iconfont iconchakan1 mr-sm"></i>{{info.merchant.follows || info.merchant.views}}人浏览
						</view>
					</block>
				</view>
				<view @tap.stop="toClickItem('toCollect')" class="collect-btn flex-center f-caption radius"
					:class="[{'c-caption': type=='brand-collect' || info.is_follow == 1 },{'c-base': info.is_follow == 0 }]"
					:style="{background: type=='brand-collect' || info.is_follow == 1? '#eee' : primaryColor}"
					v-if="type != 'brand'">{{type=='brand-collect' || info.is_follow == 1 ? '已关注' : '关注'}}</view>
			</view>
		</view>
		<!-- 短视频 video -->
		<view class="video-box fill-base" v-if="type == 'video'">
			<image mode="aspectFill" class="cover radius-5" :src="info.cover"></image>
			<view class="item-title pt-lg base-line f-title c-title ellipsis">{{info.title}}</view>
			<view class="flex-center pt-md pb-md">
				<image mode="aspectFill" class="brand-logo radius" :src="info.mer_logo"></image>
				<view class="flex-1 ml-sm flex-between f-caption c-caption">
					<view class="brand-name ellipsis">{{info.mer_name}}</view>
					<view class="flex-y-center f-caption c-caption"><i
							class="iconfont icondianzan mr-sm"></i>{{info.likes_people}}</view>
				</view>
			</view>
		</view>
		<!-- 直播 live -->
		<view class="live-box fill-base" v-if="type == 'live'">
			<view class="item-title pt-lg pb-md base-line f-title c-title ellipsis">{{info.name}}</view>
			<image mode="aspectFill" class="cover radius-5" :src="info.cover_img"></image>
			<view class="flex-center pt-md pb-md">
				<image mode="aspectFill" class="brand-logo radius" :src="info.merchant.logo"></image>
				<view class="flex-1 ml-md flex-between f-caption c-caption">
					<view class="brand-name ellipsis">{{info.merchant.mer_name}}</view>
					<view>{{info.views}}人次观看</view>
				</view>
			</view>
		</view>
		<!-- 活动 activity -->
		<view class="activity-box fill-base" v-if="type == 'activity'">
			<image mode="aspectFill" class="cover radius-5" :src="info.cover"></image>
			<view class="item-title pt-lg base-line f-title c-title ellipsis">{{info.title}}</view>
			<view class="flex-center pt-md pb-md">
				<image mode="aspectFill" class="brand-logo radius" :src="info.mer_logo || info.merchant.logo"></image>
				<view class="flex-1 ml-md flex-between f-caption c-caption">
					<view class="brand-name ellipsis">{{info.mer_name || info.merchant.mer_name}}</view>
					<view class="activity-btn flex-center f-caption c-base radius" :style="{background:primaryColor}">
						点击参与</view>
				</view>
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
		data() {
			return {}
		},
		components: {},
		props: {
			info: {
				type: Object,
				default: {}
			},
			type: {
				type: String,
				default: 'brand'
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			commonOptions: state => state.user.commonOptions,
		}),
		methods: {
			// 点击跳转
			toClickItem(key) {
				this.$emit(key, this.info)
			},
			// 点击参与
			async toJoinActivity() {
				let {
					id = 0,
				} = this.info
				let url = `/activity/pages/info?id=${id}`
				this.$util.log(url)
				this.$util.goUrl({
					url
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	// 品牌
	.brand-box {
		min-height: 140rpx;

		.cover {
			width: 138rpx;
			height: 138rpx;
			border: 1rpx solid #eee;
			transform: rotateZ(360deg);
		}

		.flex-1 {
			max-width: 530rpx;

			.brand-title {
				margin-bottom: 18rpx;
			}

			.tag-text {
				height: 30rpx;
				margin-top: 18rpx;
			}

			.mini-cover {
				width: 45rpx;
				height: 45rpx;
				border-radius: 2rpx;
				margin-top: 18rpx;
			}

			.brand-map {
				margin-top: 18rpx;

				.iconfont {
					font-size: 24rpx;
				}
			}

			.collect-btn {
				width: 120rpx;
				height: 70rpx;
			}
		}

	}

	// 短视频/直播/活动
	.video-box,
	.live-box,
	.activity-box {
		width: 690rpx;

		.cover {
			width: 690rpx;
			height: 340rpx;
			border-radius: 2rpx;
		}

		.brand-logo {
			width: 45rpx;
			height: 45rpx;
		}

		.brand-name {
			max-width: 400rpx;
		}

		.activity-btn {
			width: 130rpx;
			height: 52rpx;
		}

	}

	.video-box {
		width: 330rpx;

		.cover {
			width: 330rpx;
			height: 430rpx;
		}

		.brand-logo {
			width: 35rpx;
			height: 35rpx;
		}

		.brand-name {
			max-width: 150rpx;
		}

		.icondianzan {
			font-size: 24rpx;
		}
	}
</style>
