import Validate from './validate.js';
import $store from "@/store/index.js"
export default {
	Validate,
	log: console.log,
	// log: () => {},
	//格式化时间
	formatTime(date, format) {
		let newFormat = format || 'YY-M-D h:m:s';
		let formatNumber = this.formatNumber;
		let newDate = date || new Date();
		if (Object.prototype.toString.call(newDate).slice(8, -1) !== "Date") {
			newDate = new Date(date);
		}
		let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三',
			'四',
			'五', '六'
		];
		return newFormat.replace(/YY|Y|M|D|h|m|s|week|星期/g, function(a) {
			switch (a) {
				case 'YY':
					return newDate.getFullYear();
				case 'Y':
					return (newDate.getFullYear() + '').slice(2);
				case 'M':
					return formatNumber(newDate.getMonth() + 1);
				case 'D':
					return formatNumber(newDate.getDate());
				case 'h':
					return formatNumber(newDate.getHours());
				case 'm':
					return formatNumber(newDate.getMinutes());
				case 's':
					return formatNumber(newDate.getSeconds());
				case '星期':
					return "星期" + week[newDate.getDay() + 7];
				case 'week':
					return week[newDate.getDay()];
			}
		})
	},
	// 日期转时间戳
	DateToUnix: function(string) {
		var f = string.split(' ', 2);
		var d = (f[0] ? f[0] : '').split('-', 3);
		var t = (f[1] ? f[1] : '').split(':', 3);
		return (new Date(
			parseInt(d[0], 10) || null,
			(parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null,
			parseInt(t[0], 10) || null,
			parseInt(t[1], 10) || null,
			parseInt(t[2], 10) || null
		)).getTime() / 1000;
	},
	//格式化数字
	formatNumber(n) {
		n = n.toString();
		return n[1] ? n : '0' + n
	},
	// 保留小数 （不四舍五入）
	formatDecimal(num, decimal) {
		num = num.toString()
		let index = num.indexOf('.')
		if (index !== -1) {
			num = num.substring(0, decimal + index + 1)
		} else {
			num = num.substring(0)
		}
		return parseFloat(num).toFixed(decimal)
	},
	// 实时检测输入金额
	formatMoney(val) {
		if (val.slice(0, 1) == "0" && val.slice(1, 2) > 0) {
			val = val.slice(1, 2);
		}
		if (val.slice(0, 1) == ".") {
			val = '0.';
		}
		if (val == "0.00") {
			val = '0.0';
		}
		return val.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(
			/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0')
	},
	toWeiXinString(date) {
		let str;
		let newDate = date || new Date();
		if (Object.prototype.toString.call(newDate).slice(8, -1) !== "Date") {
			newDate = new Date(date);
		}
		const now = newDate;
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
		const beforeYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
		const monday = new Date(today);
		monday.setDate(today.getDate() - (today.getDay() ? today.getDay() - 1 : 6));
		//注意：date初始化默认是按本地时间初始的，但打印默认却是按GMT时间打印的，也就是说打印出的不是本地现在的时间
		//LocaleString的打印也有点问题，"0点"会被打印为"上午12点"
		if (now.getTime() > today.getTime()) {
			str = "";
		} else if (now.getTime() > yesterday.getTime()) {
			str = "昨天";
		} else if (now.getTime() > beforeYesterday.getTime()) {
			str = "前天";
		} else if (now.getTime() > monday.getTime()) {
			const week = {
				"0": "周日",
				"1": "周一",
				"2": "周二",
				"3": "周三",
				"4": "周四",
				"5": "周五",
				"6": "周六"
			};
			str = week[now.getDay() + ""];
		} else {
			const hour = ["凌晨", "早上", "下午", "晚上"];
			const h = now.getHours();
			if (h == 12) str = "中午";
			else str = hour[parseInt(h / 6)];
			str = now.format("MM月dd ") + str;
		}
		str += now.format("HH:ss");
		return str;
	},
	//返回类型
	typeOf(param) {
		return Object.prototype.toString.call(param).slice(8, -1)
	},
	//判断是否为空
	isEmpty(param) {
		//基本类型为空
		let condition1 = param === '' || param === null || param === undefined || param === "NaN";
		let condition2;
		let condition3
		//引用类型为空
		if (!condition1) {
			condition2 = this.typeOf(param) === "Object" && Object.keys(param).length < 1;
			condition3 = this.typeOf(param) === "Array" && param.length < 1;
		}
		return condition1 || condition2 || condition3;
	},
	showLoading({
		title = "加载中",
		mask = true
	} = {}) {
		uni.showLoading({
			title,
			mask
		});
	},
	showToast({
		title,
		icon = "none"
	} = {}) {
		uni.showToast({
			title,
			icon,
			duration: 2000
		});
	},
	hideAll() {
		uni.hideLoading();
		uni.stopPullDownRefresh();
		uni.hideNavigationBarLoading();
	},
	showModal({
		title = "提示",
		content = "没有返回值,检查服务器是否正常"
	}) {
		uni.showModal({
			title,
			content,
			showCancel: false
		});
	},
	setNavigationBarColor({
		color = '#ffffff',
		bg
	}) {
		uni.setNavigationBarColor({
			frontColor: color,
			backgroundColor: bg,
			// animation: {
			// 	duration: 100,
			// 	timingFunc: 'easeIn'
			// }
		})
	},
	getQueryString(name) {
		let reg = new RegExp("([^?&]*)" + name + "=([^&]*)(&|$)");
		let r = window.location.href.match(reg);
		if (r !== null) return unescape(r[2]);
		return null
	},
	getHostname(url) {
		var reg = /^http(s)?:\/\/(.*?)\//
		// 必须是http开头或者https开头，结尾为'/'
		var ToReplace = 'Host/'
		url.replace(reg, ToReplace)
		url = reg.exec(url)[2];
		return url;
	},
	//获取标签上data
	getDataSet(e) {
		return e.currentTarget.dataset
	},
	//获表单控件值
	getValue(e) {
		return e.detail.value
	},
	async getNavBarHeight() {
		var {
			statusBarHeight,
			navigationBarHeight
		} = await uni.getSystemInfoSync()

		let navBarHeight = statusBarHeight * 1 + 44
		// #ifdef MP-BAIDU
		navBarHeight = statusBarHeight * 1 + navigationBarHeight * 1
		// #endif
		return navBarHeight
	},
	pick(obj, arr) {
		return arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
	},
	getUrlToStr(url, params) {
		let text = url
		if (params) {
			text = `${url}?` + Object.keys(params)
				.filter(key => params[key] || params[key] === 0) // 删除无值的字段，可根据需要进行保留或删除
				.map(key => `${key}=${params[key]}`)
				.toString().replace(/,/g, '&')
		}
		return text
	},
	toCheckLogin(param) {
		let {
			loginType = 'weixin',
				userInfo
		} = $store.state.user
		let {
			id: uid = 0,
			phone = ''
		} = userInfo
		let {
			short_code_status = 0
		} = $store.state.config.configInfo

		let checkLogin = true

		// #ifdef H5
		loginType = 'weixin'
		// #endif

		// #ifndef MP-WEIXIN
		if (!uid || (loginType === 'weixin' && short_code_status && !phone)) {
			checkLogin = false
			let pages = getCurrentPages()
			let {
				route,
				options = {}
			} = pages[pages.length - 1]
			let routeUrl = this.getUrlToStr(`/${route}`, options)
			let url = !uid ? `/pages/login` : `/user/pages/phone`
			$store.commit('updateUserItem', {
				key: 'loginPage',
				val: routeUrl
			})
			this.goUrl({
				url
			})
		}
		// #endif

		if (checkLogin) {
			this.goUrl(param)
		}
	},
	goUrl({
		url = "",
		openType = "navigateTo",
		path = "",
		query = ""
	} = {}) {
		let that = this;
		if (!url) return;
		if (this.typeOf(query) == 'Object') {
			let queryStr = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
			url = `${url}&${queryStr}`
		}
		let list = ["navigateTo", "redirectTo", "switchTab", "reLaunch"];
		if (list.includes(openType)) {
			if (openType == 'navigateTo' && getCurrentPages().length > 9) {
				uni.redirectTo({
					url
				})
			} else {
				uni[openType]({
					url
				})
			}
		}
		//返回
		openType == "navigateBack" && uni.navigateBack({
			delta: url
		})
		//跳转小程序
		openType == "miniProgram" && uni.navigateToMiniProgram({
			appId: url,
			path
		})
		//打电话
		openType == "call" && uni.makePhoneCall({
			phoneNumber: url
		})
		// 复制文本
		openType == 'copy' && uni.setClipboardData({
			data: url,
			success: function(res) {
				uni.getClipboardData({
					success: function(res) {
						// #ifdef MP-BAIDU 
						that.showToast({
							title: '复制成功'
						})
						// #endif
						console.log('复制文本成功 ==>', res.data);
					}
				});
			}
		})
		//跳转网页/播放视频
		if (openType == "web" || openType == 'video') {
			let encode_url = encodeURIComponent(url)
			uni.navigateTo({
				url: `/user/pages/common/${openType}?url=${encode_url}`
			})
		}
	},
	// 刷新上页数据
	back() {
		let pages = getCurrentPages(); //当前页面栈
		if (pages.length > 1) {
			var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象  
			//触发父页面中的方法change()  
			beforePage.$vm.initRefresh()
		}
	},
	//获取页面对象，0时为当前页面
	getPage(index = 0) {
		let pages = getCurrentPages();
		let page = pages[pages.length - 1 + index]
		return page.$vm
	},
	// 预览图片
	previewImage(param) {
		let {
			current,
			urls
		} = param;
		uni.previewImage({
			current,
			urls,
		})
	},
	// 根据type获取数据字符串 
	getItems(o, type = 'id', sign = ',') {
		let items = [];
		o = o || [];
		o.forEach((item) => {
			items.push(item[type])
		})
		return items.join(sign);
	},
	// 检查授权
	async checkAuth({
		type = "userLocation",
		tip = ""
	} = {}) {
		// #ifdef MP-WEIXIN
		let contentList = {
			phone: "授权获取手机号",
			userLocation: "你的地理位置",
			address: "你的通讯地址",
			invoiceTitle: "发票抬头",
			invoice: "获取发票",
			werun: "微信运动步数",
			record: "你的录音功能",
			writePhotosAlbum: "你的保存到相册功能",
			camera: "摄像头"
		}
		tip = tip || `您暂未开启${contentList[type]}的授权，是否开启?`
		// 声明
		let err, result;
		[err, result] = await uni.getSetting();
		//获取配置失败
		if (err) {
			return Promise.reject(err);
		}
		//如果已授权
		if (result.authSetting[`scope.${type}`]) {
			return true
		}
		// 调用获取权限
		[err, result] = await uni.authorize({
			scope: `scope.${type}`
		})
		//获取成功
		if (!err) {
			return true
		}
		uni.hideLoading()
		//提示去设置
		return new Promise((resove, reject) => {
			uni.showModal({
				content: tip,
				success(res) {
					if (res.confirm) {
						uni.openSetting({
							success(result) {
								if (result.authSetting[`scope.${type}`]) {
									resove(true)
								} else {
									reject()
								}
							}
						})
					} else {
						reject()
					}
				}
			})
		})
		// #endif
	},
	//深拷贝
	deepCopy(o) {
		let that = this;
		if (o instanceof Array) {
			var n = [];
			for (var i = 0; i < o.length; ++i) {
				n[i] = that.deepCopy(o[i]);
			}
			return n;
		} else if (o instanceof Function) {
			var n = new Function("return " + o.toString())();
			return n
		} else if (o instanceof Object) {
			var n = {}
			for (var i in o) {
				n[i] = that.deepCopy(o[i]);
			}
			return n;
		} else {
			return o;
		}
	},
	getOptions(options, comminOptions = {}) {
		return Object.assign({}, comminOptions, this.formatOptions(options))
	},
	//获取用户端公共参数
	getCommonOptions(options) {
		return this.pick(options, ["staff_id"])
	},
	// 微信支付
	async pay(pay_list) {
		let that = this;
		let param = {}

		// #ifdef H5
		param = that.pick(pay_list, ['appId', 'timeStamp', 'nonceStr', 'package', 'signType',
			'paySign'
		])
		if (typeof WeixinJSBridge != "undefined") {
			return new Promise((resove, reject) => {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', param,
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							setTimeout(() => {
								resove(true)
							}, 1000)
						} else {
							that.showToast({
								title: `支付失败`
							})
							setTimeout(() => {
								reject("支付失败")
							}, 1000)
						}
					})
			});
		}
		// #endif


		let {
			provider = 'wxpay',
				orderInfo = ''
		} = pay_list

		// #ifdef MP-WEIXIN
		param = that.pick(pay_list, ['nonceStr', 'package', 'signType', 'paySign', 'timeStamp'])
		// #endif
		// #ifdef APP-PLUS
		if (provider == 'wxpay') {
			orderInfo = that.pick(pay_list, ['appid', 'noncestr', 'package', 'partnerid', 'prepayid',
				'timestamp'
			])
			orderInfo.sign = pay_list.paySign
			orderInfo = JSON.stringify(orderInfo)
		}
		param = {
			provider,
			orderInfo
		}
		// #endif
		// #ifndef H5
		let [err, res] = await uni.requestPayment(param)
		if (err) {
			console.log("=======pay err", err)
			that.showToast({
				title: `支付失败`
			})
			await Promise.reject("支付失败")
		} else {
			return true
		}
		// #endif
	},
	//小程序自带获取定位
	getLocation() {
		let that = this;
		return new Promise((resove, reject) => {
			uni.getLocation({
				success: function(res) {
					resove(res)
				},
				fail: function(e) {
					console.log(e)
					reject(e)
				}
			})
		})
	},
	//百度地图获取定位
	getBmapLocation: function(ak = 'GoI7BxLpfvBEyf1TcMXCloi99Vov7flZ', openLocation = false) {
		//定位
		let that = this;
		let bmap = require('./bmap-wx.min.js');
		let BMap = new bmap.BMapWX({
			ak
		});
		return new Promise((resove, reject) => {
			BMap.regeocoding({
				success: function(data) {
					let addressInfo = data.originalData.result;
					let {
						lat,
						lng
					} = addressInfo.location;
					let {
						formatted_address: address,
						addressComponent
					} = addressInfo;
					let {
						province,
						city,
						district
					} = addressComponent
					//只返回需要的数据
					let locationInfo = {
						lat,
						lng,
						address,
						province,
						city,
						district,
					}
					// console.log(locationInfo, "====util locationInfo");
					//成功回调
					resove(locationInfo)
				},
				fail: function(res) {
					//失败返回默认的数据
					let locationInfo = {
						name: '',
						latitude: 0,
						longitude: 0,
						address: '',
						city: ''
					}
					resove(locationInfo)
					that.hideAll()
					//失败后的提示
					let errMsg = res.errMsg;
					// #ifdef APP-PLUS
					let {
						isIos = false
					} = $store.state.config.configInfo
					if (!isIos || openLocation) {
						if (errMsg.includes("domain")) {
							uni.showModal({
								title: "获取定位失败",
								content: `请在小程序公众平台添加百度域名api.map.baidu.com`,
								showCancel: false
							})
							return;
						}
						if (errMsg.includes("Referer")) {
							uni.showModal({
								title: "获取定位失败",
								content: `登录百度开放平台给ak添加白名单`,
								showCancel: false
							})
							return;
						}
						uni.showModal({
							title: '提示',
							content: '获取定位失败，是否授权打开定位',
							success: (res) => {
								if (res.confirm) {
									uni.getSystemInfo({
										success: (sys) => {
											if (sys.platform ==
												'ios') {
												plus.runtime
													.openURL(
														"app-settings://"
													);
											} else {
												var main = plus
													.android
													.runtimeMainActivity();
												var Intent = plus
													.android
													.importClass(
														"android.content.Intent"
													);
												//可能应该直接进入应用列表的权限设置？=> android.settings.APPLICATION_SETTINGS  
												var mIntent =
													new Intent(
														'android.settings.LOCATION_SOURCE_SETTINGS'
													);
												main.startActivity(
													mIntent);
											}
										}
									})
								}
							}
						})
					}
					// #endif
					// #ifndef APP-PLUS
					if (errMsg.includes("domain")) {
						uni.showModal({
							title: "获取定位失败",
							content: `请在小程序公众平台添加百度域名api.map.baidu.com`,
							showCancel: false
						})
						return;
					}
					if (errMsg.includes("Referer")) {
						uni.showModal({
							title: "获取定位失败",
							content: `登录百度开放平台给ak添加白名单`,
							showCancel: false
						})
						return;
					}
					uni.showModal({
						title: "地理位置授权",
						content: "为了更好的为您服务，请开启您手机中的定位授权",
						confirmText: "去授权",
						success(res) {
							if (res.confirm) {
								uni.openSetting({
									success(result) {
										if (result.authSetting[
												`scope.userLocation`]) {
											resove(true)
										} else {
											reject()
										}
									}
								})
							} else {
								uni.showModal({
									title: "提示",
									content: "您取消了授权，是否重新设置【位置信息】权限",
									confirmText: "去授权",
									success(res) {
										if (!res.confirm) return
										uni.openSetting({
											success(result) {
												if (result.authSetting[
														`scope.userLocation`
													]) {
													resove(true)
												} else {
													reject()
												}
											}
										})
									}
								})
							}
						}
					})
					// #endif
				}
			})
		})
	},
}
