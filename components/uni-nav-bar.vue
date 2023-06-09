<template>
	<view class="uni-navbar" :class="{'uni-navbar-fixed':isFixed,'uni-navbar-shadow':hasShadow}"
		:style="{backgroundColor:backgroundColor,height:navBarHeight+'px'}">
		<uni-status-bar v-if="insertStatusBar"></uni-status-bar>
		<view class="uni-navbar-header" :style="{color:color}">
			<view class="uni-navbar-header-btns" @tap="onClickLeft">
				<view v-if="leftText.length" class="uni-navbar-btn-text">{{leftText}}</view>
				<slot name="left"></slot>
			</view>
			<block v-if="!onlyLeft">
				<view class="uni-navbar-container">
					<view v-if="title.length" class="uni-navbar-container-title">{{title}}</view>
					<!-- 标题插槽 -->
					<slot></slot>
				</view>
				<view class="uni-navbar-header-btns" @tap="onClickRight">
					<view v-if="rightText.length" class="uni-navbar-btn-text">{{rightText}}</view>
					<slot name="right"></slot>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-status-bar.vue';
	export default {
		components: {
			uniStatusBar
		},
		props: {
			/**
			 * 标题文字
			 */
			title: {
				type: String,
				default: ''
			},
			/**
			 * 左侧按钮文本
			 */
			leftText: {
				type: String,
				default: ''
			},
			/**
			 * 右侧按钮文本
			 */
			rightText: {
				type: String,
				default: ''
			},
			/**
			 * 是否固定在顶部
			 */
			fixed: {
				type: [Boolean, String],
				default: false
			},
			/**
			 * 按钮图标和文字颜色
			 */
			color: {
				type: String,
				default: '#000000'
			},
			/**
			 * 背景颜色
			 */
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			/**
			 * 是否仅有左侧
			 */
			onlyLeft: {
				type: [Boolean],
				default: false
			},
			/**
			 * 是否包含状态栏，默认固定在顶部时包含
			 */
			statusBar: {
				type: [Boolean, String],
				default: ''
			},
			/**
			 * 是否使用阴影，默认根据背景色判断
			 */
			shadow: {
				type: Boolean,
				default () {
					return false
				}
			},
		},
		computed: {
			isFixed() {
				return String(this.fixed) === 'true'
			},
			insertStatusBar() {
				switch (String(this.statusBar)) {
					case 'true':
						return true
					case 'false':
						return false
					default:
						return this.isFixed
				}
			},
			hasShadow() {
				var backgroundColor = this.backgroundColor
				switch (this.shadow) {
					case true:
						return true
					case false:
						return false
					default:
						return backgroundColor !== 'transparent' && backgroundColor.indexOf('rgba') < 0
				}
			}
		},
		data() {
			return {
				navBarHeight: uni.getSystemInfoSync().statusBarHeight * 1 + 44
			}
		},
		methods: {
			/**
			 * 左侧按钮点击事件
			 */
			onClickLeft() {
				this.$emit('clickLeft')
				this.$emit('click-left')
			},
			/**
			 * 右侧按钮点击事件
			 */
			onClickRight() {
				this.$emit('clickRight')
				this.$emit('click-right')
			}
		}
	}
</script>

<style>
	.uni-navbar {
		display: block;
		position: relative;
		width: 100%;
		/* background-color: #FFFFFF; */
		overflow: hidden;
	}

	.uni-navbar-shadow {
		box-shadow: 0 1px 6px #ccc;
	}

	.uni-navbar.uni-navbar-fixed {
		position: fixed;
		z-index: 999999999;
	}

	.uni-navbar-header {
		display: flex;
		flex-direction: row;
		width: 100%;
		/* #ifdef MP-BAIDU */
		height: 38px;
		line-height: 38px;
		font-size: 15px;
		/* #endif */
		/* #ifndef MP-BAIDU */
		height: 44px;
		line-height: 44px;
		font-size: 16px;
		/* #endif */
	}

	.uni-navbar-header .uni-navbar-header-btns {
		display: inline-flex;
		flex-wrap: nowrap;
		flex-shrink: 0;
		width: 100px;
	}

	.uni-navbar-container {
		width: 100%;
		margin: 0 5px;
	}

	.uni-navbar-container-title {
		/* #ifdef MP-BAIDU */
		height: 38px;
		line-height: 38px;
		/* #endif */
		/* #ifndef MP-BAIDU */
		height: 44px;
		line-height: 44px;
		/* #endif */
		font-size: 15px;
		text-align: center;
		padding-right: 30px;
	}
</style>
