(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-pages-order-detail"],{"0199":function(e,t,i){"use strict";var a=i("648c"),n=i.n(a);n.a},"0758":function(e,t,i){"use strict";i.r(t);var a=i("0c54"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"0c54":function(e,t,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(i("c7eb")),s=a(i("1da1"));i("a9e3");var r=i("26cb"),l={name:"timeline",props:{list:{type:Array,default:function(){return{}}},info:{type:Object,default:function(){return{}}},type:{type:Number,default:function(){return 0}}},data:function(){return{}},computed:(0,r.mapState)({primaryColor:function(e){return e.config.configInfo.primaryColor},subColor:function(e){return e.config.configInfo.subColor}}),methods:{toPreviewImage:function(e){var t=this.info[e];this.$util.previewImage({curent:t,urls:[t]})},toMap:function(e){var t=this;return(0,s.default)((0,n.default)().mark((function i(){var a;return(0,n.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return a=t.info,i.next=3,t.$util.checkAuth({type:"userLocation"});case 3:return i.next=5,uni.getLocation({type:"gcj02"});case 5:return i.next=7,uni.openLocation({latitude:1*a["".concat(e,"_lat")],longitude:1*a["".concat(e,"_lng")],name:a["".concat(e,"_address")],scale:28});case 7:case"end":return i.stop()}}),i)})))()},toSign:function(){var e=this.info.id,t="/user/pages/order/sign?id=".concat(e);this.$util.goUrl({url:t})}}};t.default=l},2779:function(e,t,i){"use strict";var a=i("b5ab"),n=i.n(a);n.a},"2e58":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.record-item[data-v-01116cbe]{padding:0 0 %?30?% %?30?%}.record-item .item-tag[data-v-01116cbe]{width:14px;height:14px;display:block;background:#fff;border-radius:50%;top:0;left:-7px;-webkit-transform:rotate(1turn);transform:rotate(1turn)}.record-item .item-text[data-v-01116cbe]{line-height:%?34?%}.record-item .item-img[data-v-01116cbe]{width:%?180?%;min-height:%?118?%}.record-item .item-btn[data-v-01116cbe]{width:%?160?%;height:%?64?%;background:#eee}.record-item.b-1px-l[data-v-01116cbe]::before{border-left:2px solid #ccc}.record-item[data-v-01116cbe]:last-child{padding-bottom:0}',""]),e.exports=t},"2eec":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.common-popup-content .refund-text[data-v-37631ee2]{width:%?540?%;min-height:%?200?%;max-height:50vh}.d-copy[data-v-37631ee2]{border:1px solid transparent;width:%?70?%;border-radius:%?8?%}',""]),e.exports=t},"3def":function(e,t,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("99af");var n=a(i("c7eb")),s=a(i("1da1")),r=a(i("5530")),l=i("26cb"),o=a(i("6bd8")),c={components:{timeline:o.default},data:function(){return{options:{},statusPayType:[-1,1],statusType:{"-1":"已取消",1:"待支付",2:"待服务",3:"技师接单",4:"技师出发",5:"技师到达",6:"服务中",7:"已完成",8:"已评价"},carType:{0:"公交/地铁",1:"出租车"},payType:{1:"微信支付",2:"余额支付",3:"支付宝支付"},lineList:[],base_service:[{pay_type:3,title:"技师接单",time:"receiving_time",icon:"iconjishijiedan"},{pay_type:4,title:"技师出发",time:"serout_time",icon:"iconjishichufa"},{pay_type:5,title:"技师到达",time:"arrive_time",icon:"iconjishidaoda"},{pay_type:6,title:"开始服务",time:"start_service_time",icon:"iconjishifuwu"},{pay_type:7,title:"服务完成",time:"order_end_time",icon:"iconjishiwancheng"},{pay_type:7,title:"签字确认",time:"sign_time",icon:""}],base_bell:[{pay_type:3,title:"技师接单",time:"receiving_time",icon:"iconjishijiedan"},{pay_type:6,title:"开始服务",time:"start_service_time",icon:"iconjishifuwu"},{pay_type:7,title:"服务完成",time:"order_end_time",icon:"iconjishiwancheng"}],detail:{pay_type:0},popupInfo:{},lockTap:!1}},computed:(0,l.mapState)({primaryColor:function(e){return e.config.configInfo.primaryColor},subColor:function(e){return e.config.configInfo.subColor},configInfo:function(e){return e.config.configInfo},userInfo:function(e){return e.user.userInfo},over_time_text:function(){return(new Date).getTime()+1e3*this.detail.over_time}}),onLoad:function(e){this.options=e,this.initIndex()},methods:(0,r.default)((0,r.default)((0,r.default)({},(0,l.mapActions)(["getConfigInfo"])),(0,l.mapMutations)(["updateUserItem","updateOrderItem"])),{},{initIndex:function(){var e=arguments,t=this;return(0,s.default)((0,n.default)().mark((function i(){var a,s,r;return(0,n.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(a=e.length>0&&void 0!==e[0]&&e[0],a||!t.$jweixin.isWechat()){i.next=5;break}return i.next=4,t.$jweixin.initJssdk();case 4:t.$jweixin.wxReady((function(){t.$jweixin.hideOptionMenu()}));case 5:if(t.configInfo.id&&!a){i.next=8;break}return i.next=8,t.getConfigInfo();case 8:return s=t.options.id,i.next=11,t.$api.order.orderInfo({id:s});case 11:r=i.sent,t.$util.setNavigationBarColor({bg:t.primaryColor}),r.is_balance=1*r.balance>0?1:0,t.lineList=r.is_add?t.base_bell:t.base_service,t.detail=r;case 16:case"end":return i.stop()}}),i)})))()},initRefresh:function(){this.initIndex(!0)},countEnd:function(){var e=this;this.$util.log("倒计时完了"),setTimeout((function(){e.initRefresh(),e.$util.back()}),1e3)},toCancel:function(){var e=this;return(0,s.default)((0,n.default)().mark((function t(){var i,a,s,r,l,o;return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:i=e.detail,a=i.order_code,s=i.order_goods,r=i.pay_type,l=s[0].goods_cover,e.popupInfo={name:"系统单号：".concat(a),image:l},o=-1==r?"del_item":"cancel_item",e.$refs[o].open();case 5:case"end":return t.stop()}}),t)})))()},confirmCancel:function(){var e=this;return(0,s.default)((0,n.default)().mark((function t(){var i;return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.detail.id,t.next=3,e.$api.order.cancelOrder({id:i});case 3:e.$util.showToast({title:"取消成功"}),e.detail.pay_type=-1,e.$refs.cancel_item.close(),e.$util.back();case 7:case"end":return t.stop()}}),t)})))()},confirmDel:function(){var e=this;return(0,s.default)((0,n.default)().mark((function t(){var i;return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.detail.id,t.next=3,e.$api.order.delOrder({id:i});case 3:e.$util.showToast({title:"删除成功"}),e.$refs.del_item.close(),e.$util.back(),setTimeout((function(){e.$util.goUrl({url:1,openType:"navigateBack"})}),1e3);case 7:case"end":return t.stop()}}),t)})))()},toPay:function(e){var t=this;return(0,s.default)((0,n.default)().mark((function e(){var i,a,s,r,l;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.lockTap){e.next=2;break}return e.abrupt("return");case 2:return t.lockTap=!0,t.$util.showLoading(),i=t.detail,a=i.id,s=i.pay_model,e.prev=5,e.next=8,t.$api.order.rePayOrder({id:a});case 8:if(r=e.sent,l=r.pay_list,t.$util.hideAll(),!l){e.next=34;break}if(3==s&&(l={orderInfo:l,provider:"alipay"}),3!=s){e.next=20;break}return l=Object.assign({},l,{order_id:a,page_url:"/user/pages/order/detail?id=".concat(a)}),t.updateOrderItem({key:"alipayOrderParams",val:l}),t.$util.goUrl({url:"/user/pages/alipay-result"}),t.lockTap=!1,setTimeout((function(){t.initRefresh(),t.$util.back()}),3e3),e.abrupt("return");case 20:return e.prev=20,e.next=23,t.$util.pay(l);case 23:t.$util.showToast({title:"支付成功"}),t.initRefresh(),t.lockTap=!1,t.$util.back(),e.next=34;break;case 29:return e.prev=29,e.t0=e["catch"](20),t.$util.showToast({title:"支付失败"}),t.lockTap=!1,e.abrupt("return");case 34:e.next=39;break;case 36:e.prev=36,e.t1=e["catch"](5),setTimeout((function(){t.lockTap=!1,t.$util.hideAll()}),2e3);case 39:case"end":return e.stop()}}),e,null,[[5,36],[20,29]])})))()},goDetail:function(e){var t=this.options.id,i="/user/pages/order/".concat(e,"?id=").concat(t);this.$util.goUrl({url:i})},toAgain:function(){var e=this;return(0,s.default)((0,n.default)().mark((function t(){var i,a,s;return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=e.detail,a=i.id,s=i.coach_id,t.next=3,e.$api.order.onceMoreOrder({order_id:a});case 3:e.$util.goUrl({url:"/user/pages/order?id=".concat(s)});case 4:case"end":return t.stop()}}),t)})))()}})};t.default=c},"430c":function(e,t,i){"use strict";i.r(t);var a=i("814d"),n=i("7e64");for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("0199");var r=i("f0c5"),l=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"37631ee2",null,!1,a["a"],void 0);t["default"]=l.exports},"648c":function(e,t,i){var a=i("2eec");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("34d23b68",a,!0,{sourceMap:!1,shadowMode:!1})},"6bd8":function(e,t,i){"use strict";i.r(t);var a=i("9538"),n=i("0758");for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);i("2779");var r=i("f0c5"),l=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"01116cbe",null,!1,a["a"],void 0);t["default"]=l.exports},"7e64":function(e,t,i){"use strict";i.r(t);var a=i("3def"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);t["default"]=n.a},"814d":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.detail.id?i("v-uni-view",{staticClass:"order-pages"},[i("v-uni-view",{staticClass:"item-child pd-lg fill-base f-paragraph c-base",style:{background:e.primaryColor}},[i("v-uni-view",{staticClass:"flex-y-baseline"},[i("v-uni-view",{staticClass:"text-bold"},[e._v(e._s(e.statusType[e.detail.pay_type]))]),-1==e.detail.pay_type&&e.detail.coach_refund_time?i("v-uni-view",{staticClass:"ml-md",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$refs.refuse_item.open()}}},[e._v("技师拒单，查看原因")]):e._e()],1),1==e.detail.pay_type&&e.detail.end_time>0?i("v-uni-view",{staticClass:"f-caption mt-sm"},[e._v("请在"),i("min-countdown",{attrs:{targetTime:e.over_time_text},on:{callback:function(t){arguments[0]=t=e.$handleEvent(t),e.countEnd.apply(void 0,arguments)}}}),e._v("内完成支付，逾期未支付，订单将自动取消")],1):e._e(),i("v-uni-view",{staticClass:"space-lg"})],1),i("v-uni-view",{staticClass:"menu-list flex-warp rel ml-lg mr-lg pt-lg pb-lg pl-md pr-md fill-base f-paragraph c-caption radius-16",class:[{"add-bell":e.detail.is_add}]},[i("v-uni-view",{staticClass:"menu-line abs b-1px-b"}),e._l(e.lineList,(function(t,a){return[t.icon?i("v-uni-view",{key:a+"_0",staticClass:"item-child flex-center flex-column f-icontext c-paragraph",style:{color:e.detail.pay_type>t.pay_type-1?e.primaryColor:""}},[i("v-uni-view",{staticClass:"item-img fill-base flex-center mb-sm radius",style:{borderColor:e.detail.pay_type>t.pay_type-1?e.primaryColor:""}},[i("i",{staticClass:"iconfont",class:t.icon})]),i("v-uni-view",[e._v(e._s(t.title))])],1):e._e()]}))],2),i("v-uni-view",{staticClass:"item-child mt-md ml-lg mr-lg pd-lg fill-base radius-16"},[i("v-uni-view",{staticClass:"flex-between pb-lg"},[i("v-uni-view",{staticClass:"f-paragraph c-title max-380 ellipsis"},[e._v("服务内容")])],1),e._l(e.detail.order_goods,(function(t,a){return i("v-uni-view",{key:a,staticClass:"flex-center",class:[{"mb-lg":a!=e.detail.order_goods.length-1}]},[i("v-uni-view",{staticClass:"avatar lg radius-16"},[i("v-uni-view",{staticClass:"h5-image avatar lg radius-16",style:{backgroundImage:"url('"+t.goods_cover+"')"}})],1),i("v-uni-view",{staticClass:"flex-1 ml-md"},[i("v-uni-view",{staticClass:"flex-between"},[i("v-uni-view",{staticClass:"f-title c-title ellipsis",class:[{"max-300":t.refund_num>0},{"max-450":0==t.refund_num}]},[e._v(e._s(t.goods_name))]),t.refund_num>0?i("v-uni-view",{staticClass:"f-caption c-warning"},[e._v("已退x"+e._s(t.refund_num))]):e._e()],1),i("v-uni-view",{staticClass:"f-caption c-caption"},[e._v("服务技师："+e._s(e.detail.coach_info.coach_name))]),i("v-uni-view",{staticClass:"f-caption c-caption"},[e._v("服务时长："+e._s(t.time_long)+"分钟")]),i("v-uni-view",{staticClass:"flex-between"},[i("v-uni-view",{staticClass:"flex-y-baseline f-caption c-warning"},[e._v("¥"),i("v-uni-view",{staticClass:"f-title text-bold"},[e._v(e._s(t.price))])],1),i("v-uni-view",{staticClass:"c-paragraph"},[e._v("x"+e._s(t.num))])],1)],1)],1)}))],2),i("v-uni-view",{staticClass:"mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16"},[i("v-uni-view",{staticClass:"flex-between"},[i("v-uni-view",[e._v("下单人")]),i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.address_info.user_name))])],1),i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("联系方式")]),i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.address_info.mobile))])],1),i("v-uni-view",{staticClass:"mt-md"},[i("v-uni-view",[e._v("服务地址")]),i("v-uni-view",{staticClass:"c-title mt-sm"},[e._v(e._s(""+e.detail.address_info.address+e.detail.address_info.address_info))])],1),e.detail.text?i("v-uni-view",{staticClass:"mt-md"},[i("v-uni-view",[e._v("订单备注")]),i("v-uni-view",{staticClass:"c-title mt-sm"},[e._v(e._s(e.detail.text))])],1):e._e()],1),i("v-uni-view",{staticClass:"mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16"},[i("v-uni-view",{staticClass:"flex-between"},[i("v-uni-image",{staticClass:"avatar sm radius",attrs:{src:e.detail.coach_info.work_img}}),i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.coach_info.coach_name))])],1),i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("下单时间")]),i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.create_time))])],1),i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("服务时间")]),i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.start_time))])],1),i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("服务时长")]),i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.time_long)+"分钟")])],1),e.detail.is_add?e._e():[i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("车费详情")]),i("v-uni-view",{staticClass:"flex-y-center c-title"},[e._v(e._s(e.carType[e.detail.car_type])),1==e.detail.car_type?i("v-uni-view",{staticClass:"ml-md"},[e._v("全程"+e._s(e.detail.distance))]):e._e()],1)],1),1==e.detail.car_type?i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("出行费用")]),i("v-uni-view",{staticClass:"c-warning"},[e._v("出租车 ¥"+e._s(e.detail.car_price))])],1):e._e()],i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("服务项目费用")]),i("v-uni-view",{staticClass:"c-warning"},[e._v("¥"+e._s(e.detail.init_service_price))])],1),1*e.detail.discount>0?i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("卡券优惠")]),i("v-uni-view",{staticClass:"c-warning"},[e._v("-¥"+e._s(e.detail.discount))])],1):e._e(),i("v-uni-view",{staticClass:"flex-between mt-md"},[i("v-uni-view",[e._v("支付方式")]),i("v-uni-view",{staticClass:"flex-y-baseline c-title"},[e._v(e._s(e.payType[e.detail.pay_model]))])],1),i("v-uni-view",{staticClass:"flex-between mt-md pt-md b-1px-t"},[i("v-uni-view"),i("v-uni-view",{staticClass:"flex-y-baseline c-title"},[e._v("总计："),i("v-uni-view",{staticClass:"c-warning"},[e._v("¥"+e._s(e.detail.pay_price))])],1)],1)],2),i("v-uni-view",{staticClass:"mt-md ml-lg mr-lg pd-lg fill-base f-paragraph c-caption radius-16"},[i("v-uni-view",{staticClass:" flex-y-center pb-lg flex-warp"},[i("v-uni-view",{staticClass:"flex-between c-title"},[e._v("订单编号：")]),i("v-uni-view",{staticClass:"flex-between flex-1 "},[i("v-uni-view",{staticClass:"c-title"},[e._v(e._s(e.detail.order_code))]),i("v-uni-view",{staticClass:"f-icontext d-copy text-center",style:{borderColor:e.primaryColor,color:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$util.goUrl({openType:"copy",url:e.detail.order_code})}}},[e._v("复制")])],1)],1),i("timeline",{attrs:{list:e.lineList,info:e.detail,type:1}})],1),i("v-uni-view",{staticClass:"space-max-footer"}),i("v-uni-view",{staticClass:"footer-info fix fill-base"},[i("v-uni-view",{staticClass:"flex-between pd-lg"},[i("v-uni-view"),i("v-uni-view",{staticClass:"flex-center f-desc c-title"},[-1!=e.detail.pay_type?i("v-uni-view",{staticClass:"item-btn flex-center f-desc radius",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$util.goUrl({url:e.configInfo.mobile,openType:"call"})}}},[e._v("联系客服")]):e._e(),e.statusPayType.includes(e.detail.pay_type)||1*e.detail.can_refund>0||6==e.detail.pay_type&&(e.detail.is_add||!e.detail.is_add&&e.detail.can_add_order)||7==e.detail.pay_type&&!e.detail.is_add||e.detail.is_add||e.detail.add_order_id&&e.detail.add_order_id.length>0?[1==e.detail.pay_type?[i("v-uni-view",{staticClass:"item-btn flex-center ml-md radius",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toCancel.apply(void 0,arguments)}}},[e._v("取消订单")]),i("v-uni-view",{staticClass:"item-btn flex-center ml-md c-base radius",style:{background:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toPay.apply(void 0,arguments)}}},[e._v("去支付")])]:e._e(),-1==e.detail.pay_type?[i("v-uni-view",{staticClass:"item-btn flex-center ml-md radius",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toCancel.apply(void 0,arguments)}}},[e._v("删除")])]:e._e(),1*e.detail.can_refund>0?i("v-uni-view",{staticClass:"item-btn flex-center ml-md radius",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.goDetail("refund")}}},[e._v("申请退款")]):e._e(),6==e.detail.pay_type&&(e.detail.is_add||!e.detail.is_add&&e.detail.can_add_order)?i("v-uni-view",{staticClass:"item-btn flex-center ml-md c-base radius",style:{background:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$util.goUrl({url:"/user/pages/bell/list?id="+e.detail.id+"&coach_id="+e.detail.coach_id})}}},[e._v(e._s(e.detail.is_add?"升级项目":"升级/加钟"))]):e._e(),7!=e.detail.pay_type||e.detail.is_add?e._e():[e.detail.is_comment?e._e():i("v-uni-view",{staticClass:"item-btn flex-center ml-md radius",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.goDetail("evaluate")}}},[e._v("去评价")]),i("v-uni-view",{staticClass:"item-btn flex-center ml-md c-base radius",style:{background:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toAgain.apply(void 0,arguments)}}},[e._v("再来一单")]),i("v-uni-view",{staticClass:"item-btn flex-center ml-md radius",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.goDetail("refund")}}},[e._v("投诉并退款")])],e.detail.is_add?i("v-uni-view",{staticClass:"item-btn flex-center ml-md c-base radius",style:{background:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$util.goUrl({url:"/user/pages/order/detail?id="+e.detail.add_pid.id,openType:"redirectTo"})}}},[e._v("查看主订单")]):e._e(),e.detail.add_order_id&&e.detail.add_order_id.length>0?i("v-uni-view",{staticClass:"item-btn flex-center ml-md c-base radius",style:{background:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$util.goUrl({url:"/user/pages/order/detail?id="+e.detail.add_order_id[0].id,openType:"redirectTo"})}}},[e._v("查看加钟")]):e._e()]:e._e()],2)],1),i("v-uni-view",{staticClass:"space-safe"})],1),i("common-popup",{ref:"cancel_item",attrs:{type:"CANCEL_ORDER",info:e.popupInfo},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.confirmCancel.apply(void 0,arguments)}}}),i("common-popup",{ref:"del_item",attrs:{type:"DELETE_ORDER",info:e.popupInfo},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.confirmDel.apply(void 0,arguments)}}}),i("uni-popup",{ref:"refuse_item",attrs:{type:"center",custom:!0}},[i("v-uni-view",{staticClass:"common-popup-content fill-base pd-lg radius-34"},[i("v-uni-view",{staticClass:"title"},[e._v("拒单原因")]),i("v-uni-scroll-view",{staticClass:"refund-text mt-lg",attrs:{"scroll-y":!0},on:{touchmove:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t)}}},[i("v-uni-view",[i("v-uni-text",{staticStyle:{"word-break":"break-all"},attrs:{decode:"emsp"}},[e._v(e._s(e.detail.coach_refund_text||"没有填写原因哦"))])],1)],1),i("v-uni-view",{staticClass:"button"},[i("v-uni-view",{staticClass:"item-child c-base",style:{background:e.primaryColor,color:"#fff"},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.$refs.refuse_item.close()}}},[e._v("知道了")])],1)],1)],1)],1):e._e()},n=[]},9538:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticClass:"record-box fill-base"},e._l(e.list,(function(t,a){return i("v-uni-view",{key:a,staticClass:"record-item rel ml-sm b-1px-l",style:{padding:a==e.list.length-1?"0 0 0 30rpx":""}},[i("v-uni-text",{staticClass:"item-tag abs",class:[{cur:e.info.pay_type>t.pay_type-1}],style:{border:"2rpx solid "+e.primaryColor,background:e.info.pay_type>t.pay_type-1?e.primaryColor:""}}),i("v-uni-view",{staticClass:"c-title"},[i("v-uni-view",{staticClass:"item-text f-paragraph flex-y-baseline"},[e._v(e._s(t.title)),i("v-uni-view",{staticClass:"ml-md f-caption c-caption",style:{color:("签字确认"!=t.title||e.info.sign_img)&&e.info.pay_type>t.pay_type-1?e.primaryColor:""}},[e._v(e._s("签字确认"!=t.title||e.info.sign_img?e.info.pay_type>t.pay_type-1?"":"状态未开始":"暂未签字确认"))])],1),e.info[t.time]?i("v-uni-view",{staticClass:"c-caption"},[e._v(e._s(e.info[t.time]))]):e._e()],1),"技师出发"==t.title&&!e.info.is_add&&e.info.pay_type>3?[e.info.serout_address?i("v-uni-view",{staticClass:"flex-y-center mt-md f-caption c-title",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toMap("serout")}}},[i("i",{staticClass:"iconfont iconjuli mr-sm",style:{color:e.primaryColor}}),e._v(e._s(e.info.serout_address))]):e._e()]:e._e(),"技师到达"==t.title&&!e.info.is_add&&e.info.pay_type>4?[e.info.arrive_img?i("v-uni-view",{staticClass:"item-img mt-md radius-5",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toPreviewImage("arrive_img")}}},[i("v-uni-view",{staticClass:"h5-image item-img mt-md radius-5",style:{backgroundImage:"url('"+e.info.arrive_img+"')"}})],1):e._e(),e.info.arr_address?i("v-uni-view",{staticClass:"flex-y-center mt-md f-caption c-title",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toMap("arr")}}},[i("i",{staticClass:"iconfont iconjuli mr-sm",style:{color:e.primaryColor}}),e._v(e._s(e.info.arr_address))]):e._e()]:e._e(),"服务完成"==t.title&&7==e.info.pay_type?[e.info.end_img?i("v-uni-view",{staticClass:"item-img mt-md radius-5",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toPreviewImage("end_img")}}},[i("v-uni-view",{staticClass:"h5-image item-img mt-md radius-5",style:{backgroundImage:"url('"+e.info.end_img+"')"}})],1):e._e(),e.info.end_address?i("v-uni-view",{staticClass:"flex-y-center mt-md f-caption c-title",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toMap("end")}}},[i("i",{staticClass:"iconfont iconjuli mr-sm",style:{color:e.primaryColor}}),e._v(e._s(e.info.end_address))]):e._e()]:e._e(),"签字确认"==t.title&&7==e.info.pay_type?[e.info.sign_img?[i("v-uni-view",{staticClass:"item-img mt-md radius-5",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toPreviewImage("sign_img")}}},[i("v-uni-view",{staticClass:"h5-image item-img mt-md radius-5",style:{backgroundImage:"url('"+e.info.sign_img+"')"}})],1)]:e._e(),1!=e.type||e.info.is_add||e.info.sign_img?e._e():i("v-uni-view",{staticClass:"flex-between"},[i("v-uni-view",{staticClass:"item-btn flex-center mt-md c-base radius",style:{background:e.primaryColor},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toSign.apply(void 0,arguments)}}},[e._v("签字确认")]),i("v-uni-view")],1)]:e._e()],2)})),1)],1)},n=[]},b5ab:function(e,t,i){var a=i("2e58");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=i("4f06").default;n("2e03b23c",a,!0,{sourceMap:!1,shadowMode:!1})}}]);