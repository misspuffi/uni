<template>
	<view class="technician-info" v-if="detail.id">
		<view :style="{background:primaryColor,height:'196rpx'}"></view>
		<view class="fill-base ml-lg mr-lg flex-center pt-md pb-md pl-lg pr-lg radius-16 rel"
			style="margin-top: -100rpx;">
			<image @tap.stop="toPreviewImage(index,'work_img')" mode="aspectFill" class="avatar radius abs"
				:src="detail.work_img"></image>
			<view class="flex-1 ml-lg" style="margin-left: 180rpx;">
				<view class="flex-y-baseline f-caption c-title">
					<view class="f-title text-bold mr-lg">{{detail.coach_name}}</view>
					<view class="sex-tag flex-center f-icontext radius">
						<i class="iconfont" :class="['iconnan-xiaotu','iconnv-xiaotu'][detail.sex]"
							:style="{color:detail.sex===1?'#ee6faa':'#1296db'}"></i>
						{{['男','女'][detail.sex]}}
					</view>
				</view>
				<view class="flex-between">
					<view class="f-paragraph c-paragraph">从业{{detail.work_time}}年</view>
					<view @tap.stop="toShield" class="shield-btn flex-y-center f-caption rel">
						<view class="bg radius-10 abs" :style="{background:primaryColor}"></view>
						<view class="text flex-center abs" :style="{color:primaryColor}"><i
								class="iconfont icon-shield"></i>不喜欢TA
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="ml-lg mr-lg">
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold">生活照</view>
				<view class="flex-warp img-list">
					<image @tap.stop="toPreviewImage(index,'self_img')" mode="aspectFill"
						class="img-item-mini radius-16" :src="item" v-for="(item,index) in detail.self_img"
						:key="index">
					</image>
				</view>
			</view>
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold mb-md">基本信息</view>
				<view class="flex-y-baseline f-paragraph c-caption">工作城市<view class="c-paragraph ml-lg">
						{{detail.city}}
					</view>
				</view>
				<view class="c-caption text-bold mt-md mb-md">技师简介</view>
				<text class="c-paragraph" decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
			</view>
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold">技师资质证书</view>
				<view class="flex-warp img-list">
					<image @tap.stop="toPreviewImage(index,'license')" mode="aspectFill" class="img-item-mini radius-16"
						:src="item" v-for="(item,index) in detail.license" :key="index">
					</image>
				</view>
			</view>
			<!-- <view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold">平台资质证书</view>
				<view class="flex-warp img-list">
					<image @tap.stop="toPreviewImage(index,'sys_license')" mode="aspectFill" class="img-item-mini radius-16"
						:src="detail.sys_license"></image>
				</view>
			</view> -->
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16">
				<view class="f-title c-title text-bold">商家资质证书</view>
				<view class="flex-warp img-list">
					<!-- <image @tap.stop="toPreviewImage(index,'admin_license')" mode="aspectFill" class="img-item-mini radius-16"
						:src="detail.admin_license"></image> -->
					<image @tap.stop="toPreviewImage(index,'admin_license')" mode="aspectFill" class="img-item-mini radius-16"
						:src="item" v-for="(item,index) in detail.admin_license" :key="index">
					</image>
				</view>
			</view>
			
			<view class="fill-base mt-md pd-lg f-paragraph c-paragraph radius-16" v-if="detail.video">
				<view class="f-title c-title text-bold">视频介绍</view>
				<video class="item-video mt-md radius-16" style="overflow: hidden;" :controls="true" :loop="false"
					enable-play-gesture enable-progress-gesture :src="detail.video" @waiting="onWaiting"
					@progress="onProgress" @loadedmetadata="onLoadedMetaData">
				</video>
			</view>
		</view>
		<view class="space-footer"></view>
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
				detail: {},
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
		methods: {
			...mapMutations(['updateUserItem']),
			async initIndex() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				await this.getDetail()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			async getDetail() {
				let {
					id
				} = this.options
				let data = await this.$api.service.coachInfo({
					id
				});
				//data.id_code = data.id_code.substring(0, 4) + '**********' + data.id_code.substring(data.id_code.length - 4, data.id_code.length)
				this.detail = data
				this.$util.hideAll()
			},
			async toShield() {
				let {
					id
				} = this.options
				await this.$api.mine.shieldCoachAdd({
					type: 2,
					coach_id: id
				})
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 2
				})
				this.$util.back()
				setTimeout(() => {
					this.$util.goUrl({
						url: 1,
						openType: `navigateBack`
					})
				}, 1000)
			},
			onPlay(e) {},
			onPause(e) {},
			onWaiting(e) {},
			onProgress(e) {},
			onLoadedMetaData(e) {},
			toPreviewImage(index, key = 0) {
				let urls = this.detail[key]
				if (key == 'work_img'  || key == 'sys_license') {
					urls = [urls]
				}
				
				this.$util.previewImage({
					current: urls[index],
					urls
				})
			},
		}
	}
</script>


<style lang="scss">
	.technician-info {
		.avatar {
			width: 148rpx;
			height: 148rpx;
			border: 2rpx solid #fff;
			transform: rotateZ(360deg);
			top: -32rpx;
			left: 32rpx;
		}

		.shield-btn {
			width: 150rpx;
			height: 56rpx;

			.bg {
				width: 150rpx;
				height: 56rpx;
				opacity: 0.1;
				top: 0;
				left: 0;
				z-index: 1;
			}

			.text {
				width: 150rpx;
				height: 56rpx;
				top: 0;
				left: 0;
				z-index: 2;

				.iconfont {
					font-size: 26rpx;
					margin-right: 5rpx;
				}

			}
		}

		.sex-tag {
			width: 80rpx;
			min-width: 80rpx;
			height: 40rpx;
			border: 1px solid #CCCCCC;
			transform: rotateZ(360deg);

			.iconfont {
				margin-right: 8rpx;
				font-size: 28rpx;
			}
		}

		.line {
			width: 2rpx;
			height: 20rpx;
			background: #ccc;
		}

		.img-list {
			margin-top: 15rpx;

			.img-item {
				width: 305rpx;
				height: 190rpx;
				border: 1rpx solid #f4f6f8;
				transform: rotateZ(360deg);
				margin-top: 16rpx;

				.img {
					width: 300rpx;
					height: 190rpx;
				}
			}

			.img-item:nth-child(2n-1) {
				margin-right: 16rpx;
			}

			.img-item.abs {
				top: -16rpx;
				left: 0;
				background: rgba(0, 0, 0, 0.5);
			}

			.img-item-mini {
				width: 199rpx;
				height: 199rpx;
				margin-top: 16rpx;
			}

			.img-item-mini:nth-child(3n-1) {
				margin-right: 16rpx;
				margin-left: 16rpx;
			}
		}

		.item-video {
			width: 630rpx;
			height: 380rpx;
			display: block;
		}
	}
</style>
