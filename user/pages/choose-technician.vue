<template>
	<view class="pages-technician">
		<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" :onlyLeft="true" :color="`#fff`"
			:backgroundColor="primaryColor">
			<view @tap.stop="toChooseLocation" class="map-info flex-y-center" slot="left">
				<view class="flex-y-center pl-md c-base">
					<i class="iconfont iconjuli mr-sm"></i>
					<view class="map-text max-400 ellipsis">
						{{location.address ?location.address : isLoad ? '定位失败' : '定位中...'}}
					</view>
					<i class="iconfont icon-down"></i>
				</view>
			</view>
		</uni-nav-bar>
		<search @input="toSearch" type="input" placeholder="请输入技师姓名"></search>
		<view class="space-md"></view>

		<view class="list-item flex-center pd-lg mt-md ml-md mr-md fill-base radius-16 rel"
			v-for="(item,index) in list.data" :key="index">
			<image class="king-img abs" src="https://lbqny.migugu.com/admin/anmo/mine/king.gif"
				v-if="item.coach_type_status==1">
			</image>
			<view class="flex-center flex-column">
				<view class="item-img rel">
					<!-- #ifdef H5 -->
					<view class="item-img radius">
						<view @tap.stop="toPreviewImage(index,1)" class="h5-image item-img radius"
							:style="{ backgroundImage : `url('${item.work_img}')`}">
						</view>
					</view>
			<!--		<view @tap.stop="item.coach_type_status==1?toPreviewImage(index,1):''" class="h5-image abs"
						:class="[`${imgType[item.coach_type_status]}-img`]"
						:style="{ backgroundImage :  item.coach_type_status === 3? `url('https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.png')` : `url('https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.gif')`}"
						v-if="item.coach_type_status">
					</view> -->
					<!-- #endif -->
					<!-- #ifndef H5 -->
					<image @tap.stop="toPreviewImage(index,1)" mode="aspectFill" class="item-img radius"
						:src="item.work_img">
					</image>
			<!--		<image @tap.stop="item.coach_type_status==1?toPreviewImage(index,1):''" class="abs"
						:class="[`${imgType[item.coach_type_status]}-img`]"
						:src=" item.coach_type_status === 3 ? `https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.png` : `https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.gif`"
						v-if="item.coach_type_status">
					</image> -->
					<!-- #endif -->
				</view>
				<view class="item-tag flex-center f-icontext c-base radius-20"
					:style="{background: item.text_type === 1 ? configInfo.service_btn_color : item.text_type == 3?primaryColor:'',color:item.text_type === 1 ? configInfo.service_font_color :item.text_type === 3 ? '#fff' : ''}">
					{{textType[item.text_type]}}
				</view>
			</view>
			<view class="flex-1 ml-md max-510">
				<view class="flex-between">
					<view class="flex-y-center f-title c-title">
						<view class="text-bold max-200 ellipsis">{{item.coach_name}}</view>
						<view @tap.stop="toPreviewImage(index)" class="more-img flex-center ml-sm f-icontext"
							:style="{color:primaryColor,border:`1rpx solid ${primaryColor}`}">更多照片</view>
					</view>
					<view class="flex-y-center f-icontext c-caption" v-if="item.near_time">最早可约<view
							class="can-service-btn flex-center rel">
							<view class="bg abs" :style="{background:primaryColor}"></view>
							<view class="text flex-center abs" :style="{color:primaryColor}"> {{item.near_time}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex-between mt-sm mb-md pb-md b-1px-b">
					<view class="flex-y-center f-icontext">
						<view class="flex-y-center"><i class="iconfont iconyduixingxingshixin icon-font-color"></i>
							<view class="star-text">{{item.star}}</view>
						</view>
						<view class="order-num">
							已服务 {{item.order_num > 9999 ? '9999+' : item.order_num}}单</view>
					</view>
                    <view @tap.stop="toShowPopup(index,'message')" class="flex-y-center"><i class="iconfont iconpinglun mr-sm"></i>{{item.comment_num}} </view>
					<view class="flex-center">
						<i class="iconfont iconjuli" :style="{color:primaryColor}"></i>
						<view class="f-desc c-title">{{item.distance}}</view>
					</view>
				</view>
				<view class="flex-between">
					<view class="flex-y-center f-desc c-caption">
					<!--	<view @tap.stop="toShowPopup(index,'message')" class="flex-y-center"><i class="iconfont iconpinglun mr-sm"></i>{{item.comment_num}} </view>
						<view @tap.stop="toCollect(index)" class="flex-y-center ml-md"><i class="iconfont mr-sm" :class="[{'iconshoucang1':!item.is_collect},{'iconshoucang2':item.is_collect}]" :style="{color:item.is_collect ? primaryColor :''}"></i>{{item.collect_num}} </view>  -->
						<i class="iconfont iconshouye mr-sm"></i>
						<view class="f-icontext">{{item.username ==null ? '九点按摩' : item.username}} </view>
						
						<view @tap.stop="goInfo(index)" class="flex-y-center ml-md">
							<i class="iconfont iconxiangqing mr-sm"></i>
							<view class="f-icontext">详情</view>
						</view>
					</view>

					<view @tap.stop="toOrder(index , item.is_work)" class="item-btn flex-center f-desc c-base"
						:style="{background:item.user_id? item.is_work == 0 ? '#ccc' : primaryColor:'#888'}">立即预约
					</view>
				</view>
			</view>
		</view>

		<!-- #ifdef H5 -->
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0&&location.lng" :loading="loading"
			v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1&&location.address"></abnor>
		<abnor @confirm="toOpenLocation" :tip="[{ text: '定位失败，请开启地理位置授权后刷新页面重试~', color: 0 }]"
			:button="[{ text: '开启定位' , type: 'confirm' }]" btnSize="" v-if="!loading && !location.address"> </abnor>
		<!-- #endif -->

		<view class="space-footer"></view>

		<uni-popup ref="technician_item" type="bottom">
			<view class="technician-popup fill-base" v-if="showInd!=-1">
				<view class="pd-lg"
					:class="[{'flex-center': showType == 'technician'},{'flex-warp': showType == 'message'}]">
					<image class="item-avatar radius" :src="list.data[showInd].work_img"></image>
					<view @tap.stop="$refs.technician_item.close()" class="flex-1 ml-md">
						<view class="flex-between">
							<view class="flex-y-baseline f-caption c-caption">
								<view class="f-title c-title text-bold mr-sm max-350 ellipsis">
									{{list.data[showInd].coach_name}}
								</view>从业{{list.data[showInd].work_time}}年
							</view>
							<i class="iconfont icon-close"></i>
						</view>
						<scroll-view scroll-y @touchmove.stop.prevent class="technician-text f-caption c-caption mt-sm"
							v-if="showType == 'message'">
							{{list.data[showInd].text}}
						</scroll-view>
					</view>
				</view>
				<view class="space-sm fill-body"></view>
				<scroll-view scroll-y @touchmove.stop.prevent class="list-content">
					<block v-if="showType == 'message'">
						<view class=" list-message flex-warp pd-lg" :class="[{'b-1px-t':index!=0}]"
							v-for="(item,index) in commentList.data" :key="index">
							<image class="item-avatar radius" :src="item.avatarUrl"></image>
							<view class="flex-1 ml-md">
								<view class="flex-between">
									<view class="flex-y-center">
										<view class="f-paragraph c-title mr-md">{{item.nickName}}</view>
										<view class="flex-warp">
											<i class="iconfont iconyduixingxingshixin icon-font-color"
												:style="{backgroundImage: aindex< item.star?`-webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%)`:`-webkit-linear-gradient(270deg, #f4f6f8 0%, #ccc 100%)`}"
												v-for="(aitem,aindex) in 5" :key="aindex"></i>
										</view>
									</view>
									<view class="f-icontext c-caption">{{item.create_time}}</view>
								</view>
								<view class="flex-warp mt-sm">
									<view class="pt-sm pb-sm pl-md pr-md mt-sm mr-sm radius fill-body f-caption c-desc"
										v-for="(item,index) in item.lable_text" :key="index">{{item}}</view>
								</view>
								<view class="f-caption c-caption mt-md">
									<text decode="emsp" style="word-break:break-all;">{{item.text}}</text>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
				<view style="margin: 0 100rpx;" v-if="!loading&&(showType == 'message' && commentList.data.length<=0)">
					<abnor></abnor>
				</view>
				<block v-if="showType == 'message' && commentList.last_page > 1">
					<view class="space-lg b-1px-t"></view>
					<view
						@tap.stop="$refs.technician_item.close(),$util.goUrl({url:`/user/pages/comment?index=${showInd}`})"
						class="more-btn flex-center f-paragraph c-base radius"
						style="width:300rpx;height: 80rpx;margin:0 auto" :style="{background:primaryColor}">查看更多
					</view>
					<view class="space-lg"></view>
				</block>
				<view class="space-safe" v-if="commentList.data.length > 0 && commentList.last_page == 1"></view>
			</view>
		</uni-popup>


		<view class="space-max-footer"></view>
		<fix-bottom-button @confirm="toBack" :text="[{type:'confirm',text:pageLen>1?`返回上页`:`返回首页`}]" bgColor="#fff">
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
				imgType: {
					1: 'top',
					2: 'hot',
					3: 'new'
				},
				textType: {
					1: '可服务',
					2: '服务中',
					3: '可预约'
				},
				param: {
					page: 1,
					ser_id: 0,
					coach_name: ''
				},
				list: {
					data: []
				},
				loading: true,
				showInd: -1,
				showType: '',
				lockTap: false,
				serviceList: [],
				commentList: [],
				pageLen: 1
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			loginType: state => state.user.loginType,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
		}),
		async onLoad(options) {
			this.options = options
			// #ifndef H5
			this.$util.showLoading()
			// #endif
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
			...mapMutations(['updateUserItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				this.pageLen = getCurrentPages().length
				this.getList()
			},
			initRefresh() {
				this.showInd = -1
				this.param.page = 1
				this.initIndex(true)
			},
			toOpenLocation() {
				this.$util.checkAuth({
					type: 'userLocation'
				})
				// #ifdef APP-PLUS
				uni.getSystemInfo({
					success: (sys) => {
						if (sys.platform == 'ios') {
							plus.runtime.openURL("app-settings://");
						} else {
							var main = plus.android.runtimeMainActivity();
							var Intent = plus.android.importClass(
								"android.content.Intent");
							//可能应该直接进入应用列表的权限设置？=> android.settings.APPLICATION_SETTINGS  
							var mIntent = new Intent(
								'android.settings.LOCATION_SOURCE_SETTINGS'
							);
							main.startActivity(mIntent);
						}
					}
				})
				// #endif
			},
			toSearch(val) {
				this.param.page = 1
				this.param.coach_name = val
				this.getList()
			},
			// 选择地区
			async toChooseLocation(e) {
				await this.$util.checkAuth({
					type: 'userLocation'
				})

				let [, {
					address = '',
					longitude: lng,
					latitude: lat,
					province = '',
					city = '',
					district = '',
				}] = await uni.chooseLocation();
				if (!lng) return
				let location = {
					lng,
					lat,
					address,
					province,
					city,
					district
				}
				this.updateUserItem({
					key: 'location',
					val: location
				})
				this.param.page = 1
				this.getList()
			},
			async getList() {
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
					id: ser_id
				} = this.options
				let {
					list: oldList,
					param,
				} = this
				let {
					lng = 0,
						lat = 0
				} = location
				param = Object.assign({}, param, {
					ser_id,
					lng,
					lat
				})
				let newList = await this.$api.service.serviceCoachList(param);

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
				this.showInd = -1
				this.$util.showLoading()
				this.param.page = 1;
				this.getList()
			},
			toPreviewImage(index, key = 0) {
				let {
					self_img: urls,
					work_img
				} = this.list.data[index]
				if (key) {
					urls = [work_img]
				}
				this.$util.previewImage({
					current: urls[0],
					urls
				})
			},
			async toShowPopup(index, key) {
				this.showInd = index
				this.showType = key
				await this.getCommentList()
				this.$refs.technician_item.open()
			},
			async getCommentList() {
				let {
					id: coach_id
				} = this.list.data[this.showInd]
				let param = {
					coach_id,
					page: 1,
				}
				this.commentList = await this.$api.service.commentList(param)
			},
			async toCollect(index) {
				let {
					id,
					is_collect,
					collect_num
				} = this.list.data[index]
				let methodModel = is_collect ? 'delCollect' : 'addCollect'
				await this.$api.mine[methodModel]({
					coach_id: id
				})
				this.$util.showToast({
					title: is_collect ? '取消成功' : '收藏成功'
				})
				this.list.data[index].is_collect = is_collect == 1 ? 0 : 1
				this.list.data[index].collect_num = is_collect == 1 ? collect_num - 1 : collect_num + 1
			},
			// 技师详情
			goInfo(index) {
				let {
					id
				} = this.list.data[index]
				this.$util.goUrl({
					url: `/user/pages/technician-info?id=${id}`
				})
			},
			// 预约
			async toOrder(index, is_work) {
				if (is_work == 0) return
				let {
					id: coach_id,
					user_id = 0
				} = this.list.data[index]
				if (!user_id) return
				let {
					id: service_id
				} = this.options
				if (this.lockTap) return;
				this.lockTap = true;
				try {
					await this.$api.order.addCar({
						service_id,
						coach_id,
						num: 1,
						is_top: 1
					})
					this.lockTap = false
					let url = `/user/pages/order?id=${coach_id}&ser_id=${service_id}`
					this.$util.goUrl({
						url
					})
				} catch (e) {
					this.lockTap = false
				}
			},
			toBack() {
				let {
					pageLen
				} = this
				let url = pageLen > 1 ? 1 : `/pages/service`
				let openType = pageLen > 1 ? `navigateBack` : `reLaunch`
				this.$util.goUrl({
					url,
					openType
				})
			}
		}
	}
</script>


<style lang="scss">
	.pages-technician {}
</style>
