<template>
	<view class="pages-technician">
		<fixed>
			<uni-nav-bar :fixed="false" :shadow="false" :statusBar="true" :onlyLeft="true" :color="`#fff`"
				:backgroundColor="primaryColor">
				<view @tap.stop="toChooseLocation" class="map-info flex-y-center" slot="left">
					<view class="flex-y-center pl-md c-base">
						<i class="iconfont iconjuli mr-sm"></i>
						<view class="map-text max-400 ellipsis">
							{{location&&location.address ?location.address : isLoad ? '定位失败' : '定位中...'}}
						</view>
						<i class="iconfont icon-down"></i>
					</view>
				</view>
			</uni-nav-bar>
			<view class="fix-info fill-body rel">
				<view class="space-top abs" :style="{background:primaryColor}"></view>
				<view class="search-info fill-base pt-lg pl-lg pr-lg pb-md abs">
					<view class="flex-center pb-md">
						<view class="city-info">
							<picker @change="pickerChange($event)" :value="cityIndex" :range="cityList"
								range-key="title">
								<view class="city-info flex-y-center">
									<view>
										<block v-if="cityList&&cityList.length > 0">
											{{cityList[cityIndex].title.length > 3 ? cityList[cityIndex].title.substring(0,3) + '...':cityList[cityIndex].title}}
										</block>
										<block v-else>请选择</block>
									</view>
									<i class="iconfont iconshaixuanxia-1 ml-sm"></i>
								</view>
							</picker>
						</view>
						<view class="flex-1">
							<search @input="toSearch" type="input" :keyword="param.coach_name" :padding="0" :radius="30"
								backgroundColor="#F0F0F0" placeholder="请输入技师姓名">
							</search>
						</view>
					</view>
					<tab @change="handerTabChange" :list="tabList" :activeIndex="activeIndex*1"
						:activeColor="primaryColor" width="25%" height="90rpx" fontSize="28rpx"></tab>
				</view>
			</view>
		</fixed>

		<block v-if="list.data && list.data.length>0">
			<view class="list-item flex-center pd-lg mt-md ml-md mr-md fill-base radius-16 rel"
				v-for="(item,index) in list.data" :key="index">
				<!-- <view class="top-tag flex-center f-icontext abs" v-if="item.coach_type_status==1">优</view> -->
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
					<!--	<view @tap.stop="item.coach_type_status==1?toPreviewImage(index,1):''" class="h5-image abs"
							:class="[`${imgType[item.coach_type_status]}-img`]"
							:style="{ backgroundImage :  item.coach_type_status === 3? `url('https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.png')` : `url('https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.gif')`}"
							v-if="item.coach_type_status">
						</view>  -->
						<!-- #endif -->
						<!-- #ifndef H5 -->
						<image @tap.stop="toPreviewImage(index,1)" mode="aspectFill" class="item-img radius"
							:src="item.work_img">
						</image>
					<!--	<image @tap.stop="item.coach_type_status==1?toPreviewImage(index,1):''" class="abs"
							:class="[`${imgType[item.coach_type_status]}-img`]"
							:src=" item.coach_type_status === 3 ? `https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.png` : `https://lbqny.migugu.com/admin/anmo/mine/${imgType[item.coach_type_status]}.gif`"
							v-if="item.coach_type_status">
						</image>  -->
						<!-- #endif -->
					</view>
					<!--<view class="item-tag flex-center f-icontext c-base radius-20"
						:style="{background: item.text_type === 1 ? configInfo.service_btn_color : item.text_type == 3?primaryColor:'',color:item.text_type === 1 ? configInfo.service_font_color :item.text_type === 3 ? '#fff' : ''}">
						{{textType[item.text_type]}}
					</view>  -->
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
							<view @tap.stop="toCollect(index)" class="flex-y-center ml-md"><i class="iconfont mr-sm":class="[{'iconshoucang1':!item.is_collect},{'iconshoucang2':item.is_collect}]":style="{color:item.is_collect ? primaryColor :''}"></i>{{item.collect_num}} </view>-->
							<i class="iconfont iconshouye mr-sm"></i>
							<view class="f-icontext">{{item.username ==null ? '九点按摩' : item.username}} </view>
							
							<view @tap.stop="goInfo(index)" class="flex-y-center ml-md"> 
								<i class="iconfont iconxiangqing mr-sm"></i>
								<view class="f-icontext">详情</view>
							</view>
						</view>
						<auth @tap.stop.prevent :needAuth="userInfo && (!userInfo.phone || !userInfo.nickName)"
							:must="true" :type="!userInfo.phone ? 'phone' : 'userInfo'"
							@go="toShowPopup(index,'technician', item.is_work == 0 && item.text_type ==2 )"
							style="width:130rpx;">
							<view class="item-btn flex-center f-desc c-base"
								:style="{background:item.user_id? item.is_work == 0 && item.text_type ==2 ? '#ccc' : primaryColor:'#888'}">
								立即预约
							</view>
						</auth>
					</view>
				</view>
			</view>
		</block>

		<!-- #ifdef H5 -->
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0" :loading="loading" v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1"></abnor>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<load-more :noMore="list.current_page>=list.last_page&&list.data.length>0&&location.lng" :loading="loading"
			v-if="loading">
		</load-more>
		<abnor v-if="!loading&&list.data.length<=0&&list.current_page==1&&location.lng"></abnor>
		<abnor @confirm="toOpenLocation" :tip="[{ text: '定位失败，请开启地理位置授权后刷新页面重试~', color: 0 }]"
			:button="[{ text: '开启定位' , type: 'confirm' }]" btnSize="" v-if="!loading && !location.lng"> </abnor>
		<!-- #endif -->

		<view class="space-footer"></view>

		<uni-popup ref="technician_item" type="bottom">
			<view class="technician-popup fill-base" v-if="showInd!=-1 && list.data.length > showInd">
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
					<block v-if="showType == 'technician'">
						<view class="list-item flex-center pd-lg fill-base radius-16" :class="[{'b-1px-t':index != 0}]"
							v-for="(item,index) in serviceList" :key="index">
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
					</block>
					<block v-if="showType == 'message'">
						<view class="list-message flex-warp pd-lg" :class="[{'b-1px-t':index!=0}]"
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
				<view style="margin: 0 100rpx;"
					v-if="!loading&&((showType == 'technician' && serviceList.length<=0) || (showType == 'message' && commentList.data.length<=0))">
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
				<view class="flex-between pd-lg b-1px-t" v-if="showType == 'technician' && carList.car_count > 0">
					<view class="flex-center">合计：<view class="f-title c-warning text-bold ml-sm">¥{{carList.car_price}}
						</view>
					</view>
					<view @tap.stop="toOrder" class="order-btn flex-center f-desc c-base radius"
						:style="{background: primaryColor}">提交订单
					</view>
				</view>
				<view class="space-safe"></view>
			</view>
		</uni-popup>

		<view :style="{height: `${configInfo.tabbarHeight}px`}"></view>
		<tabbar :cur="2"></tabbar>

		<!-- #ifdef APP-PLUS -->
		<login-info></login-info>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	import siteInfo from '@/siteinfo.js';
	import tabbar from "@/components/tabbar.vue"
	export default {
		components: {
			tabbar
		},
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
					1: '优选',
					2: '金牌推荐',
					3: '可预约'
				},
				loading: true,
				showInd: -1,
				showType: '',
				lockTap: false,
				serviceList: [],
				commentList: []
			}
		},
		computed: mapState({
			pageActive: state => state.technician.pageActive,
			haveOperItem: state => state.technician.haveOperItem,
			cityId: state => state.technician.cityId,
			cityIndex: state => state.technician.cityIndex,
			cityList: state => state.technician.cityList,
			activeIndex: state => state.technician.activeIndex,
			tabList: state => state.technician.tabList,
			param: state => state.technician.param,
			list: state => state.technician.list,
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			loginType: state => state.user.loginType,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,
			haveShieldOper: state => state.user.haveShieldOper,
			carList: state => state.order.carList,
		}),
		async onLoad(options) {
			this.options = options
			let {
				city_id = 0,
					coach_id = 0,
					coach_name = ''
			} = options
			if (coach_id) {
				let param = this.$util.deepCopy(this.param)
				param.coach_id = coach_id
				param.coach_name = coach_name
				this.updateTechnicianItem({
					key: 'param',
					val: param
				})
				this.updateTechnicianItem({
					key: 'cityId',
					val: city_id
				})
			}
			// #ifdef H5
			uni.setNavigationBarTitle({
				title: '技师'
			})
			// #endif
			// #ifndef H5
			this.$util.showLoading()
			// #endif
			if (this.pageActive && !coach_id) {
				this.isLoad = true
				this.loading = false
				this.$util.hideAll()
				return
			}
			await this.initIndex()
		},
		async onShow() {
			if (this.haveShieldOper == 2) {
				this.initIndex()
				this.updateUserItem({
					key: 'haveShieldOper',
					val: 0
				})
			}
			// #ifndef H5
			if (!this.pageActive || this.haveOperItem) {
				this.initIndex()
				this.updateTechnicianItem({
					key: 'haveOperItem',
					val: false
				})
				return
			}
			if (!this.isLoad || this.location.lat) return
			// #ifndef APP-PLUS
			let [err, result] = await uni.getSetting()
			if (err || !result.authSetting[`scope.userLocation`]) return
			// #endif
			this.initIndex()
			// #endif
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
			this.loading = true;
			this.getList(this.param.page + 1);
		},
		onShareAppMessage(e) {
			let {
				id: pid = 0
			} = this.userInfo
			let path = `/pages/technician?pid=${pid}`
			this.$util.log(path)
			return {
				title: '',
				imageUrl: '',
				path,
			}
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo', 'getCarList', 'getCityList', 'getServiceCoachList']),
			...mapMutations(['updateUserItem', 'updateTechnicianItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.toAppShare()
				}
				// #endif
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
				
				//定位
				/* let {
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
					lng = 0,
						lat = 0
				} = location */
				//结束
				
				await this.getList(1, true)
				this.updateTechnicianItem({
					key: 'pageActive',
					val: true
				})
			},
			pickerChange(e, val) {
				let ind = e.target.value
				this.updateTechnicianItem({
					key: 'cityIndex',
					val: ind
				})
				this.updateTechnicianItem({
					key: 'cityId',
					val: this.cityList[ind].id
				})
				this.getList(1)
			},
			initRefresh() {
				this.showInd = -1
				this.param.page = 1
				this.initIndex(true)
			},
			toAppShare() {
				let {
					id: pid = 0
				} = this.userInfo
				let title = '技师'
				let {
					siteroot
				} = siteInfo
				let url = siteroot.split('/index.php')[0]
				let href = `${url}/h5/#/pages/techbician?pid=${pid}`
				let imageUrl = ''
				this.$jweixin.wxReady(() => {
					this.$jweixin.showOptionMenu()
					this.$jweixin.shareAppMessage(title, '', href, imageUrl)
					this.$jweixin.shareTimelineMessage(title, href, imageUrl)
				})
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
				let param = this.$util.deepCopy(this.param)
				param.coach_id = ''
				param.page = 1
				param.coach_name = val
				this.updateTechnicianItem({
					key: 'param',
					val: param
				})
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
				await this.getList(1, true)
			},
			async getList(page = 0, refresh = false) {
				if (page) {
					let param = this.$util.deepCopy(this.param)
					param.page = page
					this.updateTechnicianItem({
						key: 'param',
						val: param
					})
				}
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
					lng = 0,
						lat = 0
				} = location

				if (refresh) {
					await this.getCityList({
						lng,
						lat,
						refresh
					})
				}

				let {
					list: oldList,
					param,
					tabList,
					activeIndex,
					cityList,
					cityIndex,
					cityId: city_id
				} = this
				let {
					id: type
				} = tabList[activeIndex]

				let ind = cityList.findIndex(item => {
					return item.id == city_id
				})
				city_id = ind == -1 ? 0 : city_id
				cityIndex = ind == -1 ? 0 : ind


				this.updateTechnicianItem({
					key: 'cityIndex',
					val: cityIndex
				})

				this.updateTechnicianItem({
					key: 'cityId',
					val: city_id
				})

				param = Object.assign({}, param, {
					lng,
					lat,
					type,
					city_id
				})
				await this.getServiceCoachList(param)
				this.loading = false
				this.$util.hideAll()
			},
			handerTabChange(index) {
				this.updateTechnicianItem({
					key: 'activeIndex',
					val: index
				})
				this.showInd = -1
				this.$util.showLoading()
				uni.pageScrollTo({
					scrollTop: 0
				})
				this.getList(1)
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
			async toShowPopup(index, key, type) {
				if (type) return
				this.showInd = index
				this.showType = key
				if (key == 'technician') {
					let {
						user_id = 0
					} = this.list.data[index]
					if (!user_id) return
					await this.getServiceList()
				} else {
					await this.getCommentList()
				}
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
			async getServiceList() {
				let {
					id: coach_id
				} = this.list.data[this.showInd]
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
				this.list.data[index].collect_num = is_collect == 1 ? collect_num - 1 :
					collect_num + 1
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
			// 服务详情
			goDetail(index) {
				let {
					id
				} = this.serviceList[index]
				let url = `/user/pages/detail?id=${id}`
				this.$util.goUrl({
					url
				})
			},
			// 加/减数量
			async changeNum(mol, serInd) {
				let {
					id: coach_id
				} = this.list.data[this.showInd]
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
					id
				} = this.list.data[this.showInd]
				this.$refs.technician_item.close()
				this.$util.goUrl({
					url: `/user/pages/order?id=${id}`
				})
			},
		}
	}
</script>


<style lang="scss">
	.pages-technician {
		.fix-info {
			height: 225rpx;

			.space-top {
				width: 100%;
				height: 40rpx;
				top: 0;
			}

			.search-info {
				width: 100%;
				top: 0;
				border-radius: 40rpx;

				.city-info {
					width: 170rpx;

					.iconfont {
						font-size: 20rpx;
						transform: scale(0.5);
					}
				}
			}
		}

		.list-item {
			.top-tag {
				width: 40rpx;
				height: 30rpx;
				color: #B75E1D;
				background: linear-gradient(90deg, #DFB885 0%, #FCE0AD 100%);
				border-radius: 8rpx 0 8rpx 0;
				top: 0;
				left: 0;
			}

			.item-img {
				width: 224rpx;
				height: 224rpx;
			}

			.king-img {
				width: 90rpx;
				height: 90rpx;
				top: 210rpx;
				left: -15rpx;
				z-index: 1;
			}


			.top-img {
				width: 180rpx;
				height: 180rpx;
				top: -32rpx;
				left: -27rpx;
				// width: 146rpx;
				// height: 140rpx;
				// top: -7rpx;
				// left: -11rpx;
			}

			.hot-img {
				width: 100rpx;
				height: 100rpx;
				top: 60rpx;
				left: 12rpx;
				// width: 75rpx;
				// height: 51rpx;
				// top: 77rpx;
				// left: 25rpx;
			}

			.new-img {
				width: 38rpx;
				height: 52rpx;
				top: 83rpx;
				left: 78rpx;
			}

			.item-tag {
				width: 100rpx;
				height: 32rpx;
				color: #000;
				background: rgba(216, 216, 216, 0.3);
				margin-top: 19rpx;
				margin-bottom: 6rpx;
			}

			.more-img {
				width: 104rpx;
				height: 33rpx;
				border-radius: 3px;
				transform: rotateZ(360deg);
			}

			.can-service-btn {
				width: 64rpx;
				height: 28rpx;
				margin-left: 8rpx;

				.bg {
					width: 64rpx;
					height: 28rpx;
					opacity: 0.1;
					border-radius: 3rpx;
					top: 0;
					left: 0;
					z-index: 1;
				}

				.text {
					width: 64rpx;
					height: 28rpx;
					top: 0;
					left: 0;
					z-index: 2
				}
			}

			.iconyduixingxingshixin {
				font-size: 28rpx;
				background-image: -webkit-linear-gradient(270deg, #FAD961 0%, #F76B1C 100%);
			}

			.star-text {
				color: #FF9519;
				margin-left: 6rpx;
			}

			.order-num {
				color: #4D4D4D;
				margin-left: 16rpx;
			}

			.item-btn {
				width: 130rpx;
				height: 52rpx;
				border-radius: 8rpx;
			}
		}

		.technician-popup {
			border-radius: 20rpx 20rpx 0 0;

			.item-avatar {
				width: 88rpx;
				height: 88rpx;
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

				.list-message {
					.item-avatar {
						width: 52rpx;
						height: 52rpx;
						background: #f4f6f8;
					}

					.iconyduixingxingshixin {
						font-size: 28rpx;
						margin-right: 5rpx;
						font-size: 28rpx;
					}
				}
			}

			.order-btn {
				width: 200rpx;
				height: 72rpx;
			}


		}
	}
</style>
