<template>
	<view class="user-order-evaluate" v-if="isLoad">
		<view class="fill-base pd-lg">
			<view class="f-title c-title pb-md">总体评价</view>
			<view class="flex-between">
				<view class="flex-warp">
					<block v-for="(item,index) in 5" :key="index">
						<i @tap="checkStar(1,index*1+1)" class="star-icon text-bold iconfont mr-sm"
							:class="[{'iconyduixingxingkongxin':star<index*1+1},{'iconyduixingxingshixin':star>=index*1+1}]"
							:style="{color:primaryColor}"></i>
					</block>
				</view>
				<view class="f-paragraph c-caption">{{star ? startObj[star - 1] : '请选择星级'}}</view>
			</view>
		</view>
		<view class="fill-base pd-lg">
			<view class="f-title c-title">服务项目</view>
			<block v-for="(aitem,aindex) in service_star" :key="aindex">
				<view class="f-paragraph c-paragraph pt-md pb-md">{{aitem.title}}</view>
				<view class="flex-between">
					<view class="flex-warp">
						<block v-for="(item,index) in 5" :key="index">
							<i @tap="checkStar(2,index*1+1,aindex)" class="star-icon text-bold iconfont mr-sm"
								:class="[{'iconyduixingxingkongxin':aitem.star<index*1+1},{'iconyduixingxingshixin':aitem.star>=index*1+1}]"
								:style="{color:primaryColor}"></i>
						</block>
					</view>
				</view>
			</block>
		</view>
		<view class="fill-body pt-md pb-md pl-lg f-caption c-caption">您的评价对我们很重要哦</view>
		<view class="fill-body radius-5 mt-lg ml-lg mr-lg pd-lg">
			<textarea v-model="text" class="f-paragraph c-caption" style="width: auto;" maxlength="300"
				placeholder="请输入评价内容"></textarea>
			<view class="pt-md f-caption c-nodata text-right">已输入{{text.length > 300 ? 300 : text.length}}/300
			</view>
		</view>
		<view class="flex-warp f-caption c-title pd-lg">
			<view @tap.stop="toChangeItem(index)"
				class="label-item fill-body flex-center mr-md mb-md pl-lg pr-lg radius"
				:class="[{'c-base':item.is_check}]" :style="{background:item.is_check ? primaryColor : ''}"
				v-for="(item,index) in lableList" :key="index">
				{{item.title}}
			</view>
		</view>

		<view class="space-max-footer"></view>
		<fix-bottom-button @confirm="toSubmit" :text="[{type:'confirm',text:'提交'}]" bgColor="#fff">
		</fix-bottom-button>
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
				isLoad: false,
				options: {},
				startObj: ['不满意', '一般', '满意', '很满意', '非常满意'],
				star: 0,
				service_star: [],
				lableList: [],
				text: '',
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			this.initIndex()
		},
		methods: {
			...mapMutations([]),
			async initIndex() {
				// #ifdef H5
				if (this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				let {
					id
				} = this.options
				let [order, label] = await Promise.all([this.$api.order.orderInfo({
					id
				}), this.$api.order.lableList()])
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				let service_star = order.order_goods.map(item => {
					return {
						service_id: item.goods_id,
						star: 5,
						title: item.goods_name
					}
				})
				label.map(item => {
					item.is_check = false
				})
				this.lableList = label
				this.service_star = service_star
				this.$util.hideAll()
				this.isLoad = true
			},
			checkStar(type, star, index = 0) {
				if (type == 1) {
					this.star = star * 1
				} else {
					let service_star = this.$util.deepCopy(this.service_star)
					service_star[index].star = star * 1
					this.service_star = service_star
				}
			},
			toChangeItem(index) {
				let {
					is_check
				} = this.lableList[index]
				this.lableList[index].is_check = !is_check
			},
			async toSubmit() {
				let {
					options,
					star,
					text
				} = this
				let {
					id: order_id
				} = options
				if (!star) {
					this.$util.showToast({
						title: '请选择总体评价星级'
					})
					return
				}
				if (!text) {
					this.$util.showToast({
						title: '请输入评价内容'
					})
					return
				}
				let lable = []
				this.lableList.map(item => {
					if (!item.is_check) return
					lable.push(item.id)
				})
				let service_star = this.$util.deepCopy(this.service_star)
				service_star.map(item => {
					delete item.title
				})
				let param = {
					order_id,
					star,
					service_star,
					text,
					lable
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.order.addComment(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `评论成功`,
					});
					this.lockTap = false
					setTimeout(() => {
						this.$util.back()
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.user-order-evaluate {
		.star-icon {
			font-size: 40rpx;
		}

		.label-item {
			height: 60rpx;
		}

	}
</style>
