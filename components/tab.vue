<template>
	<view>
		<scroll-view scroll-x class='tab-list' :scroll-into-view="'tab'+(activeIndex-1)" :scroll-with-animation="true"
			:style="{background: bgColor,fontSize: fontSize}">
			<view class='tab-item rel' v-for="(item,index) in list" :key="index" @tap='handerTabChange(index)'
				data-index="index" :id="'tab'+index"
				:style='{width,height,lineHeight:height,color:index==activeIndex?activeColor:color}'>
				<view class="flex-y-baseline flex-x-center rel">
					<view v-if="item.number && numberType == 2">
						<text class="rel">
							{{item.title || item}}
							<text class="abs tab-label c-base fill-warning"
								:style="{width: item.number<10 ? '26rpx' : '50rpx',right:item.number<10 ? '-13rpx' : '-38rpx'}">{{item.number < 100 ? item.number : '99+'}}</text>
						</text>
					</view>
					<block v-else>{{item.title || item}}</block>
					<block v-if="item.is_sign == 1">
						<view class="tab-item-sanjao abs" :style="{right: item.title.length == 3 ? '-20rpx' : ''}">
							<view class="up iconfont icon-up-fill rel"
								:style="{color:index==activeIndex && item.sign == 1?activeColor:'#ccc',}"></view>
							<view class="down iconfont icon-down-fill rel"
								:style="{color:index==activeIndex && item.sign == 0?activeColor:'#ccc',}"></view>
						</view>
					</block>
				</view>
				<view class="abs line" :class="[lineClass]" :style="{background: activeColor}"
					v-if="isLine && index==activeIndex && !item.is_sign">
				</view>
				<view v-if="item.number && numberType == 1" class="item-msg c-base f-icontext abs"
					:style="{width: item.number<10 ? '30rpx' : '50rpx',right: msgRight }">
					{{item.number < 100 ? item.number : '99+'}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'tab',
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default () {
					return 0
				}
			},
			color: {
				type: String,
				default () {
					return '#333'
				}
			},
			activeColor: {
				type: String,
				default () {
					return '#e73535'
				}
			},
			bgColor: {
				type: String,
				default () {
					return '#fff'
				}
			},
			width: {
				type: String,
				default () {
					return ''
				}
			},
			height: {
				type: String,
				default () {
					return '100rpx'
				}
			},
			isLine: {
				type: Boolean,
				default () {
					return true
				}
			},
			lineClass: {
				type: String,
				default () {
					return ''
				}
			},
			msgRight: {
				type: String,
				default () {
					return '5rpx'
				}
			},
			fontSize: {
				type: String,
				default () {
					return '30rpx'
				}
			},
			numberType: {
				type: Number,
				default () {
					return 1
				}
			}
		},
		created() {

		},
		data() {
			return {

			}
		},
		methods: {
			handerTabChange(index) {
				this.$emit('change', index);
			}
		},
	}
</script>

<style lang="scss">
	.tab-list {
		white-space: nowrap;
		background: #fff;
		width: 100%;

		.tab-label {
			width: 26rpx;
			height: 26rpx;
			font-size: 18rpx;
			text-align: center;
			line-height: 26rpx;
			top: -13rpx;
			border-radius: 26rpx;
			right: -13rpx;
		}
	}

	.tab-item {
		display: inline-block;
		text-align: center;
		padding: 0 20rpx;
		border-color: #fff;
		box-sizing: border-box;

		.line {
			width: 80rpx;
			height: 6rpx;
			border-radius: 6rpx;
			left: 50%;
			bottom: 0rpx;
			margin-left: -40rpx;
		}

		.line.sm {
			width: 60rpx;
			height: 6rpx;
			border-radius: 6rpx;
			left: 50%;
			bottom: 0rpx;
			margin-left: -30rpx;
		}
	}

	.tab-item-sanjao {
		top: 18rpx;
		right: -6rpx;
		width: 30rpx;
		height: 50rpx;
		transform: scale(0.6);

		.iconfont {
			font-size: 28rpx;
		}

		.up {
			top: 0;
			left: 0;
		}

		.down {
			bottom: 10rpx;
			left: 0;
		}
	}

	.item-msg {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-radius: 15rpx 15rpx 15rpx 0;
		background: #f12c20;
		right: 5rpx;
		top: 5rpx;
	}
</style>
