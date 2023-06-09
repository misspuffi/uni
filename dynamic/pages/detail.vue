<template>
	<view class="dynamic-detail" v-if="detail.id">
		<view class="banner-info rel">
			<!-- #ifdef H5 -->
			<view @tap="$util.goUrl({url:`/pages/service`})" class="abs"
				:class="[{'back-user-ios': configInfo.isIos},{'back-user-android': !configInfo.isIos}]"
				style="margin-top:25rpx;z-index: 1;" v-if="options.pid">
				<view class="iconshouye iconfont"></view>
				<view class="back-user_text">回到首页</view>
			</view>
			<!-- #endif -->
			<view @tap.stop="$refs.show_item.open()" class="menu-info flex-center c-base abs radius">
				<i class="iconfont icon-caidan"></i>
			</view>
			<banner :list="detail.imgs" :margin="0" :autoplay="true" :indicatorActiveColor="primaryColor" :dotWidth="20"
				:dotBottom="30" :height="654" v-if="detail.imgs.length > 0">
			</banner>
		</view>
		<view class="pd-lg">
			<view class="dynamic-info flex-center">
				<image class="avatar radius" :src="detail.coach_info.work_img"></image>
				<view class="flex-1 ml-md">
					<view class="flex-between">
						<view>
							<view class="f-min-title c-black text-bold max-400 ellipsis">
								{{detail.coach_info.coach_name}}
							</view>
							<view class="flex-y-center f-icontext c-caption mt-sm" :style="{color:primaryColor}"><i
									class="iconfont" :class="[iconType[detail.coach_info.work_status]]"
									style="font-size: 24rpx;margin-right:5rpx"></i>{{textType[detail.coach_info.work_status]}}
							</view>
						</view>
						<view class="flex-y-center f-caption">
							<view @tap.stop="getServiceList" class="app-follow-btn flex-center radius"
								:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}"
								v-if="detail.coach_info.is_work">预约</view>
							<view @tap.stop="toChangeItem(1)" class="app-follow-btn flex-center radius ml-md"
								:style="{background:detail.follow_status ? primaryColor:'#fff',color:detail.follow_status ? '#fff' :primaryColor,border:`1rpx solid ${primaryColor}`}">
								<i class="iconfont icon-jia-bold"
									v-if="!detail.follow_status"></i>{{detail.follow_status?'已关注':'关注'}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="f-min-title c-black text-bold mt-lg">{{detail.title}}</view>
			<view class="dynamic-content f-paragraph mt-lg mb-lg">
				<text decode="emsp" style="word-break:break-all;">{{detail.text}}</text>
			</view>
			<view class="flex-between">
				<view class="f-caption c-caption">{{detail.friend_time}}</view>
				<view class="flex-y-baseline f-desc c-desc"> <i class="iconfont icondangqianweizhi"
						:style="{color:primaryColor}"></i>
					{{detail.distance}}
				</view>
			</view>
		</view>
		<view class="space-md fill-body"></view>
		<view class="ml-lg mr-lg">
			<view class="flex-y-center f-min-title c-title text-bold b-1px-b" style="height: 95rpx;">全部评论</view>
			<view class="no-data-item flex-center mt-lg pb-lg" v-if="list.data.length == 0">
				<image class="avatar radius" src="https://lbqny.migugu.com/admin/anmo/mine/dynamic-user.png">
				</image>
				<view class="text flex-1 flex-y-center ml-md pl-lg f-icontext radius">评论千万条, 礼貌第一条</view>
			</view>
			<view @longpress="toDel(index)" class="list-item flex-warp fill-base pt-lg"
				v-for="(item,index) in list.data" :key="index">
				<image mode="aspectFill" class="avatar radius" :src="item.avatarUrl"></image>
				<view class="flex-1 ml-md pb-lg" :class="[{'b-1px-b':index != list.total-1}]">
					<view class="flex-between" style="height: 72rpx;">
						<view class="text flex-y-center f-caption max-400 ellipsis">{{item.nickName}}
							<view class="examine-btn flex-center f-icontext ml-md radius" v-if="item.status==1">审核中
							</view>
						</view>
						<view class="f-icontext c-caption">{{item.friend_time}}</view>
					</view>
					<view class="comment f-paragraph mt-sm"> {{item.text}} </view>
				</view>
			</view>
		</view>
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<view class="space-max-footer fill-body"></view>
		<view class="fix bottom-info fill-base b-1px-t">
			<view class="flex-between f-caption pl-lg pr-lg">
				<view class="input-text flex-y-center radius">
					<i class="iconfont icon-edit ml-md mr-sm"></i>
					<input @confirm="toComment" v-model="subForm.text" maxlength="200" class="input" type="text"
						placeholder="说点什么..." />
				</view>
				<view class="flex-y-center">
					<view @tap.stop="toChangeItem(2)" class="thumbs-comment-btn flex-y-center">
						<i class="iconfont"
							:class="[{'icon-shoucang':!detail.thumbs_status},{'icon-shoucang-fill':detail.thumbs_status}]"
							:style="{color:detail.thumbs_status?primaryColor:''}"></i>
						{{!detail.thumbs_num ? '点赞' : detail.thumbs_num}}
					</view>
					<view class="thumbs-comment-btn flex-y-center pl-lg">
						<i class="iconfont icon-pinglun"></i>
						{{!detail.comment_num ? '评论' : detail.comment_num}}
					</view>
				</view>
			</view>
			<view class="space-safe"></view>
		</view>

		<common-popup @confirm="confirmDel" ref="del_item" type="DELETE_ORDER" title="删除评论" desc="请确认是否删除评论，删除后将无法恢复"
			:info="popupInfo"></common-popup>

		<uni-popup ref="show_item" type="bottom">
			<view class="show-popup pd-lg">
				<view class="flex-center mb-lg">
					<image class="avatar radius" :src="detail.coach_info.work_img"></image>
					<view class="flex-1 ml-md f-title c-black">{{detail.coach_info.coach_name}}</view>
				</view>
				<view @tap.stop="toChangeItem(3)" class="show-item flex-center f-paragraph mt-md radius-16">不想看TA的作品
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="clear-btn show-item flex-center f-paragraph mt-md radius-16"
					open-type="share">分享该动态</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view @tap.stop="toAppShare" class="show-item flex-center f-paragraph mt-md radius-16">分享该动态</view>
				<!-- #endif -->
				<view @tap.stop="$refs.show_item.close()" class="show-item flex-center f-paragraph mt-md radius-16"
					:style="{color:primaryColor}">取消</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>

		<uni-popup ref="technician_item" type="bottom">
			<view class="technician-popup fill-base">
				<view @tap.stop="toTechnicianInfo" class="pd-lg flex-center">
					<image class="item-avatar radius" :src="detail.coach_info.work_img"></image>
					<view class="flex-1 flex-between ml-md">
						<view class="flex-y-baseline f-caption c-caption">
							<view class="f-title c-title text-bold mr-sm max-350 ellipsis">
								{{detail.coach_info.coach_name}}
							</view>从业{{detail.coach_info.work_time}}年
						</view>
						<view class="flex-y-center f-caption c-caption">更多详情<i class="iconfont icongengduo"
								style="font-size: 22rpx;"></i></view>
					</view>
				</view>
				<view class="space-sm fill-body"></view>
				<scroll-view scroll-y @touchmove.stop.prevent class="list-content">
					<view class="technician-list-item flex-center pd-lg fill-base radius-16"
						:class="[{'b-1px-t':index != 0}]" v-for="(item,index) in serviceList" :key="index">
						<image @tap.stop="goDetail(index)" mode="aspectFill" class="avatar lg radius-16"
							:src="item.cover"></image>
						<view class="flex-1 ml-md">
							<view @tap.stop="goDetail(index)" class="f-title c-title max-510 ellipsis">
								{{item.title}}
							</view>
							<view class="f-caption c-caption mt-sm mb-sm ellipsis">{{item.total_sale}}人选择</view>
							<view class="flex-between">
								<view class="flex-y-baseline f-desc c-caption max-350 ellipsis">
									<view class="text-delete mr-sm" v-if="item.init_price">¥{{item.init_price}}
									</view>
									<view class="f-title c-warning mr-sm">¥{{item.price}}</view>/
									{{item.time_long}}分钟
								</view>
								<view class="flex-warp">
									<block v-if="item.num">
										<button @tap.stop="changeNum(-1,index)" class="reduce"
											:style="{borderColor:primaryColor,color:primaryColor}"><i
												class="iconfont icon-jian-bold"></i></button>
										<button class="addreduce clear-btn">{{item.num || 0}}</button>
									</block>
									<button @tap.stop="changeNum(1,index)" class="add"
										:style="{background:primaryColor,borderColor:primaryColor}"><i
											class="iconfont icon-jia-bold"></i></button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view style="margin: 0 100rpx;" v-if="!loading&&serviceList.length<=0">
					<abnor></abnor>
				</view>
				<view class="space-sm fill-body"></view>
				<view class="flex-between pd-lg b-1px-t" v-if="carList.car_count > 0">
					<view class="flex-center">合计：<view class="f-title c-warning text-bold ml-sm">
							¥{{carList.car_price}}
						</view>
					</view>
					<view @tap.stop="toOrder" class="order-btn flex-center f-desc c-base radius"
						:style="{background: primaryColor}">提交订单
					</view>
				</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				iconType: {
					1: 'icon-kefuwu',
					2: 'iconjishifuwu',
					3: 'iconkeyuyue'
				},
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约'
				},
				options: {},
				detail: {},
				loading: true,
				param: {
					page: 1
				},
				list: {
					data: []
				},
				serviceList: [],
				subForm: {
					text: ''
				},
				rule: [{
					name: "text",
					checkType: "isNotNull",
					errorMsg: "请输入评论内容",
					regType: 2
				}],
				popupInfo: {},
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			carList: state => state.order.carList,
		}),
		onLoad(options) {
			this.$util.showLoading()
			this.options = options
			this.param.dynamic_id = options.id
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
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let {
				id,
				title,
				cover: imageUrl
			} = this.detail
			let path = `/user/pages/detail?pid=${pid}&id=${id}`
			this.$util.log(path)
			return {
				title,
				imageUrl,
				path,
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getCarList', 'getServiceCoachList']),
			...mapMutations(['updateUserItem']),
			async initIndex(refresh = false) {
				let {
					pid = 0
				} = this.options
				let {
					id: uid = 0
				} = this.userInfo
				if (pid && !uid) {
					await this.getUserInfo()
				}
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				await this.getDetail()
				await this.getList()
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
			},
			initRefresh() {
				this.initIndex(true)
			},
			toAppShare() {
				let {
					id: pid = 0
				} = this.userInfo
				let {
					id,
					title,
					cover: imageUrl
				} = this.detail
				let summary = ''

				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/dynamic/pages/detail?id=${id}&pid=${pid}`

				// #ifdef H5
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, summary, href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
				// #endif
				// #ifdef APP-PLUS
				uni.share({
					provider: "weixin",
					scene: 'WXSceneSession',
					type: 0,
					href,
					title,
					summary,
					imageUrl,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				// #endif
			},
			async getDetail() {
				let {
					id
				} = this.options
				let {
					location
				} = this
				if (!location.lat) {
					// #ifdef H5
					if (this.$jweixin.isWechat()) {
						this.$util.showLoading()
						// await this.$jweixin.initJssdk();
						await this.$jweixin.wxReady2();
						let {
							latitude: lat = 0,
							longitude: lng = 0
						} = await this.$jweixin.getWxLocation()
						location = {
							lng,
							lat,
							address: '定位失败',
							province: '',
							city: '',
							district: ''
						}
						if (lat && lng) {
							let key = `${lat},${lng}`
							let data = await this.$api.base.getMapInfo({
								location: key
							})
							let {
								status,
								result
							} = JSON.parse(data)
							if (status == 0) {
								let {
									address,
									address_component
								} = result
								let {
									province,
									city,
									district
								} = address_component
								location = {
									lng,
									lat,
									address,
									province,
									city,
									district
								}
							}
						}
					}
					// #endif
					// #ifndef H5
					location = await this.$util.getBmapLocation()
					// #endif
					this.updateUserItem({
						key: 'location',
						val: location
					})
				}
				let {
					lat = 0, lng = 0
				} = location
				let data = await this.$api.dynamic.coachDynamicInfo({
					id,
					lat,
					lng
				})
				let {
					type,
					cover
				} = data
				data.imgs = data.imgs.map(item => {
					return {
						img: type == 1 ? item : cover,
						jump_type: type == 1 ? 'picutre' : 'video',
						jump_url: item
					}
				})
				this.detail = data
				this.$util.hideAll()
			},
			async getList() {
				this.$util.showLoading()
				let {
					list: oldList,
					param
				} = this
				let newList = await this.$api.dynamic.commentList(param)
				if (this.param.page == 1) {
					this.list = newList
				} else {
					newList.data = oldList.data.concat(newList.data)
					this.list = newList
				}
				this.loading = false
				this.$util.hideAll()
			},
			async toChangeItem(type) {
				let {
					id
				} = this.options
				let {
					coach_id
				} = this.detail
				let methodArr = ['followAddOrCancek', 'thumbsAddOrCancek', 'shieldCoachAdd']
				let methodKey = type == 3 ? 'mine' : 'dynamic'
				let methodModel = methodArr[type * 1 - 1]
				let param = type == 3 ? {
					type: 1,
					coach_id
				} : {
					dynamic_id: id
				}
				if (type == 1) {
					param.coach_id = coach_id
				}
				await this.$api[methodKey][methodModel](param)
				if (type == 3) {
					this.$util.back()
					setTimeout(() => {
						this.$util.goUrl({
							url: 1,
							openType: `navigateBack`
						})
					}, 1000)
					return
				}
				await this.getDetail()
			},
			//表单验证
			validate(param) {
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					validate.add(param[name], item);
				})
				let message = validate.start();
				return message;
			},
			async toComment() {
				let subForm = this.$util.deepCopy(this.subForm)
				let {
					id
				} = this.options
				subForm.dynamic_id = id
				let msg = this.validate(subForm);
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}
				subForm.text = subForm.text.substring(0, 200)
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.dynamic.commentAdd(subForm)
					this.$util.hideAll()
					this.$util.showToast({
						title: `评论成功`
					})
					this.lockTap = false
					this.subForm.text = ''
					await Promise.all([this.getDetail(), this.getList(1)])
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			toDel(index) {
				let {
					id,
					coach_id,
					user_id,
					cover: image
				} = this.list.data[index]
				let {
					id: uid = 0
				} = this.userInfo
				if (uid != user_id || uid !== coach_id) return
				this.popupInfo = {
					id,
					name: ``,
					image: ``,
					index,
				}
				this.$refs.del_item.open()
			},
			// 确认：删除评论
			async confirmDel() {
				let {
					id,
					index,
				} = this.popupInfo
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.dynamic.commentDel({
						id
					})
					this.lockTap = false
					this.$util.hideAll()
					this.list.data.splice(index, 1)
					this.$util.showToast({
						title: `删除成功`
					})
					this.$refs.del_item.close()
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}
			},
			async getServiceList() {
				let {
					coach_id
				} = this.detail
				await this.getCarList({
					coach_id
				})
				let {
					data
				} = await this.$api.service.coachServiceList({
					coach_id
				})
				let arr = []
				if (this.carList.list && this.carList.list.length > 0) {
					this.carList.list.map(item => {
						arr.push(item.service_id)
					})
				}
				if (data && data.length > 0) {
					data.map(item => {
						if (arr.includes(item.id)) {
							let carInd = arr.findIndex(aitem => {
								return aitem == item.id
							})
							item.num = this.carList.list[carInd].num
							item.cart_id = this.carList.list[carInd].id
						}
					})
				}
				this.serviceList = data
				this.$refs.technician_item.open()
			},
			// 加/减数量
			async changeNum(mol, serInd) {
				let {
					coach_id
				} = this.detail
				let {
					id: service_id,
					cart_id = 0
				} = this.serviceList[serInd]
				if (this.lockTap) return;
				this.lockTap = true;
				let methodModel = mol > 0 ? 'addCar' : 'delCar'
				let param = mol > 0 ? {
					service_id,
					coach_id,
					num: 1
				} : {
					id: cart_id,
					num: 1
				}
				if (methodModel == 'delCar' && !param.id) {
					this.lockTap = false
					return
				}
				try {
					let add_cart_id = await this.$api.order[methodModel](param)
					let {
						num = 0,
							cart_id = 0
					} = this.serviceList[serInd]
					this.serviceList[serInd].num = num + mol
					if (add_cart_id && mol > 0 && !cart_id) {
						this.serviceList[serInd].cart_id = add_cart_id
					}
					if (this.serviceList[serInd].num < 1) {
						this.serviceList[serInd].cart_id = 0
					}
					await this.getCarList({
						coach_id
					})
					this.lockTap = false
				} catch (e) {
					this.lockTap = false
				}
			},
			// 下单
			toOrder() {
				if (this.carList.car_count < 1) {
					this.$util.showToast({
						title: `请选择服务`
					})
					return
				}
				let {
					coach_id: id
				} = this.detail
				this.$refs.technician_item.close()
				this.$util.goUrl({
					url: `/user/pages/order?id=${id}`
				})
			},
			toTechnicianInfo() {
				this.$refs.technician_item.close()
				this.$util.goUrl({
					url: `/user/pages/technician-info?id=${detail.coach_id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.dynamic-detail {
		.banner-info {
			width: 750rpx;
			height: 654rpx;

			.menu-info {
				top: 29rpx;
				right: 29rpx;
				width: 60rpx;
				height: 60rpx;
				background: rgba(2, 2, 2, 0.5);
				z-index: 2
			}
		}

		.dynamic-info {
			.avatar {
				width: 84rpx;
				height: 84rpx;
			}

			.app-follow-btn {
				width: 116rpx;
				height: 56rpx;
				transform: scaleZ(360deg);

				.iconfont {
					font-size: 24rpx;
					margin-right: 6rpx;
				}
			}
		}

		.dynamic-content {
			color: #222;
			line-height: 40rpx;
		}

		.no-data-item {
			.avatar {
				width: 54rpx;
				height: 54rpx;
			}

			.text {
				width: 616rpx;
				height: 56rpx;
				color: #C7C7C7;
				background: #F7F7F7;
			}
		}

		.list-item {
			.avatar {
				width: 72rpx;
				height: 72rpx;
			}

			.text {
				color: #ADADAD;
			}

			.comment {
				color: #3A3A3A;
				line-height: 1.4;
			}

			.examine-btn {
				width: 82rpx;
				height: 34rpx;
				color: #F96246;
				background: rgba(249, 98, 70, 0.1);
			}
		}

		.bottom-info {
			width: 750rpx;
			bottom: 0;

			.flex-between {
				height: 100rpx;

				.input-text {
					width: 372rpx;
					height: 68rpx;
					background: #F6F6F6;

					.iconfont {
						color: #C7C7C7;
						font-size: 24rpx;
					}

					.input {
						width: 294rpx;
					}
				}

				.thumbs-comment-btn {
					min-width: 102rpx;
					color: #343434;

					.iconfont {
						font-size: 44rpx;
						margin-right: 6rpx;
					}
				}
			}
		}

		.show-popup {
			width: 750rpx;
			background: #F3F3F5;
			border-radius: 30rpx 30rpx 0 0;

			.avatar {
				width: 84rpx;
				height: 84rpx;
			}

			.show-item {
				color: #222;
				height: 100rpx;
				background: #fff;
			}
		}

		.technician-popup {
			border-radius: 20rpx 20rpx 0 0;

			.item-avatar {
				width: 90rpx;
				height: 90rpx;
				background: #f4f6f8;
			}

			.icon-close {
				font-size: 50rpx;
			}

			.technician-text {
				max-height: 150rpx;
			}

			.list-content {
				max-height: 50vh;
			}

			.order-btn {
				width: 200rpx;
				height: 72rpx;
			}
		}
	}
</style>
