<template>
	<view class="wf-list-container">
		<view id="wf-list" class="wf-list" v-for="(list,listIndex) of viewList" :key="listIndex">
			<view @tap="goDetail(listIndex,index)" :data-id="item.id" class="wf-item-child rel"
				v-for="(item,index) of list.list" :key="index">
				<view class="examin-btn flex-center f-icontext c-base radius abs"
					:style="{background:item.status==1?'#FC8218':'#FF6262'}" v-if="path==2&& item.status!=2">
					{{item.status==1?'审核中':'已驳回'}}
				</view>
				<image class="cover" :id="'id'+item.id" @load="handleViewRender" @error="handleViewRender"
					:src="item.cover" mode="widthFix"></image>
				<view class="play-video-info flex-center c-base abs" v-if="item.type == 2">
					<view class="play-video flex-center c-base radius">
						<i class="iconfont icon-play-video"></i>
					</view>
				</view>
				<view class="wf-item">
					<view class="f-desc c-black text-bold">{{item.title}}</view>
					<view class="flex-between mt-sm">
						<view class="flex-center">
							<image class="avatar" :src="item.work_img"></image>
							<view class="coach f-caption c-desc ellipsis">{{item.coach_name}}</view>
						</view>
						<view class="flex-y-baseline f-caption c-desc"> <i class="iconfont icondangqianweizhi"
								:style="{color:primaryColor}"></i>
							{{item.distance}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		props: {
			list: {
				type: Array, //实际请求获取的列表数据
			},
			path: {
				type: String || Number, //跳转页面类型  1用户端；2技师端
			}
		},
		data() {
			return {
				viewList: [{
					list: []
				}, {
					list: []
				}], //展示到视图的列表数据
				everyNum: 2
			}
		},
		mounted() {
			if (this.list.length) {
				this.viewList = [{
					list: []
				}, {
					list: []
				}];
				setTimeout(() => {
					this.init()
				}, 600)
			}
		},
		watch: {
			list(newlist, oldlist) {
				this.viewList = [{
					list: []
				}, {
					list: []
				}];
				setTimeout(() => {
					this.init()
				}, 600)
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		methods: {
			...mapActions(),
			init() {
				setTimeout(() => {
					this.handleViewRender(0, 0)
				}, 0)
			},
			handleViewRender(x, y) {
				const index = this.viewList.reduce((total, current) => total + current.list.length, 0)
				if (index > this.list.length - 1) {
					// 加载完成触发事件并返回加载过的图片数
					this.$emit('finishLoad', index)
					return
				};
				const query = uni.createSelectorQuery().in(this);
				let listFlag = 0;
				query.selectAll('#wf-list').boundingClientRect(data => {
					listFlag = data[0].bottom - data[1].bottom <= 0 ? 0 : 1;
					this.viewList[listFlag].list.push(this.list[index])
				}).exec()
			},
			async goDetail(a, b) {
				console.log(a, b, this.viewList)
				let {
					id
				} = this.viewList[a].list[b]
				let {
					path
				} = this

				let url = path == 1 ? `/dynamic/pages/detail?id=${id}` :
					`/dynamic/pages/technician/detail?id=${id}`
				this.$util.goUrl({
					url,
				})
			}
		}
	}
</script>

<style lang="scss">
	.wf-list-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 0 20rpx;
		padding-top: 20rpx;
	}

	.wf-list {
		width: calc(50% - 10rpx);
		display: flex;
		flex-direction: column;
	}

	.wf-item-child {
		background: white;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
		overflow: hidden;

		.examin-btn {
			top: 20rpx;
			left: 15rpx;
			width: 89rpx;
			height: 37rpx;
		}

		.play-video-info {
			top: 0rpx;
			width: 100%;
			height: calc(100% - 128rpx);
			z-index: 9;

			.play-video {
				width: 66rpx;
				height: 66rpx;
				background: rgba(2, 2, 2, 0.5);

				.iconfont {
					font-size: 28rpx;
				}
			}
		}
	}


	.cover {
		width: 100%;
		height: 100rpx;
	}

	.wf-item {
		padding: 20rpx;

		.avatar {
			width: 40rpx;
			height: 40rpx;
			border-radius: 40rpx;
			margin-right: 6rpx;
		}

		.coach {
			max-width: 100rpx;
		}

		.iconfont {
			font-size: 24rpx;
		}
	}
</style>
