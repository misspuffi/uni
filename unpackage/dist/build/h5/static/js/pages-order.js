(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order"],{2720:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"order-pages"},[n("fixed",[n("tab",{attrs:{list:t.tabList,activeIndex:1*t.activeIndex,activeColor:t.primaryColor,width:100/t.tabList.length+"%",height:"100rpx"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.handerTabChange.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"b-1px-b"})],1),t._l(t.list.data,(function(e,a){return n("v-uni-view",{key:a,staticClass:"item-child mt-md ml-md mr-md pd-lg fill-base radius-16 rel",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goDetail(a,"detail")}}},[e.is_add?n("v-uni-view",[n("v-uni-view",{staticClass:"bell-tag flex-center f-icontext c-base abs",style:{background:t.primaryColor}},[t._v("加钟服务")]),n("v-uni-view",{staticClass:"space-md"})],1):t._e(),n("v-uni-view",{staticClass:"flex-between pb-lg b-1px-b"},[n("v-uni-view",{staticClass:"f-paragraph c-title max-500 ellipsis",on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.$util.goUrl({openType:"copy",url:e.order_code})}}},[t._v("订单号："+t._s(e.order_code))]),n("v-uni-view",{staticClass:"f-caption text-bold",style:{color:1==e.pay_type?t.primaryColor:[2,3,4,5,6].includes(e.pay_type)?t.subColor:7==e.pay_type?"#11C95E":"#333"}},[t._v(t._s(t.statusType[e.pay_type]))])],1),t._l(e.order_goods,(function(a,i){return n("v-uni-view",{key:i,staticClass:"flex-center mt-lg"},[n("v-uni-view",{staticClass:"cover radius-16"},[n("v-uni-view",{staticClass:"h5-image cover radius-16",style:{backgroundImage:"url('"+a.goods_cover+"')"}})],1),n("v-uni-view",{staticClass:"flex-1 ml-md"},[n("v-uni-view",{staticClass:"flex-between"},[n("v-uni-view",{staticClass:"f-title c-title text-bold max-400 ellipsis"},[t._v(t._s(a.goods_name))]),n("v-uni-view",{staticClass:"f-desc c-desc"},[t._v("x"+t._s(a.num))])],1),n("v-uni-view",{staticClass:"flex-center",staticStyle:{"margin-bottom":"5rpx"}},[n("v-uni-view",{staticClass:"flex-1 flex-y-center f-caption c-caption mt-md"},[t._v("服务技师"),n("v-uni-view",{staticClass:"ml-md"},[t._v(t._s(e.coach_info.coach_name))])],1),a.refund_num>0?n("v-uni-view",{staticClass:"f-caption c-warning"},[t._v("已退x"+t._s(a.refund_num))]):t._e()],1),n("v-uni-view",{staticClass:"flex-y-center f-caption c-caption"},[t._v("预约时间"),n("v-uni-view",{staticClass:"ml-md"},[t._v(t._s(e.start_time))])],1)],1)],1)})),n("v-uni-view",{staticClass:"flex-between pt-lg"},[n("v-uni-view",{staticClass:"flex-y-center f-desc c-title"},[t._v("总计："),n("v-uni-view",{staticClass:"f-paragraph c-title text-bold"},[t._v("¥"+t._s(e.pay_price))])],1),n("v-uni-view",{staticClass:"flex-warp"},[1==e.pay_type?[n("v-uni-button",{staticClass:"clear-btn order",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.toCancel(a)}}},[t._v("取消订单")]),n("v-uni-button",{staticClass:"clear-btn order",style:{color:"#fff",background:t.primaryColor,borderColor:t.primaryColor},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.toPay(a)}}},[t._v("去支付")])]:t._e(),-1==e.pay_type?[n("v-uni-button",{staticClass:"clear-btn order",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.toCancel(a)}}},[t._v("删除")])]:t._e(),e.can_refund>0?n("v-uni-button",{staticClass:"clear-btn order",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goDetail(a,"refund")}}},[t._v("申请退款")]):t._e(),6==e.pay_type&&(e.is_add||!e.is_add&&e.can_add_order)?[n("v-uni-button",{staticClass:"clear-btn order",style:{color:"#fff",background:t.primaryColor,borderColor:t.primaryColor},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.$util.goUrl({url:"/user/pages/bell/list?id="+e.id+"&coach_id="+e.coach_id})}}},[t._v(t._s(e.is_add?"升级项目":"升级/加钟"))])]:t._e(),7!=e.pay_type||e.is_add?t._e():[e.is_comment?t._e():n("v-uni-button",{staticClass:"clear-btn order",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goDetail(a,"evaluate")}}},[t._v("去评价")]),n("v-uni-button",{staticClass:"clear-btn order",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.goDetail(a,"refund")}}},[t._v("投诉退款")]),n("v-uni-button",{staticClass:"clear-btn order",style:{color:"#fff",background:t.primaryColor,borderColor:t.primaryColor},on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.toAgain(a)}}},[t._v("再来一单")])]],2)],1)],2)})),t.loading?n("load-more",{attrs:{noMore:t.list.current_page>=t.list.last_page&&t.list.data.length>0,loading:t.loading}}):t._e(),!t.loading&&t.list.data.length<=0&&1==t.list.current_page?n("abnor"):t._e(),n("v-uni-view",{staticClass:"space-footer"}),n("common-popup",{ref:"cancel_item",attrs:{type:"CANCEL_ORDER",info:t.popupInfo},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmCancel.apply(void 0,arguments)}}}),n("common-popup",{ref:"del_item",attrs:{type:"DELETE_ORDER",info:t.popupInfo},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmDel.apply(void 0,arguments)}}}),n("v-uni-view",{style:{height:t.configInfo.tabbarHeight+"px"}}),n("tabbar",{attrs:{cur:4}})],2)},i=[]},3316:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.custom-tabbar[data-v-67cc264a]{height:%?98?%;bottom:0;height:calc(%?98?% + env(safe-area-inset-bottom) / 2);padding-bottom:calc(env(safe-area-inset-bottom) / 2)}.custom-tabbar .iconfont[data-v-67cc264a]{font-size:%?40?%}.custom-tabbar .text[data-v-67cc264a]{font-size:%?22?%;margin-top:%?5?%;height:%?32?%}',""]),t.exports=e},4661:function(t,e,n){"use strict";n.r(e);var a=n("5683"),i=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},5683:function(t,e,n){"use strict";n("7a82");var a=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("a434"),n("99af");var i=a(n("5530")),r=a(n("c7eb")),o=a(n("1da1")),c=n("26cb"),s=a(n("ef96")),u={components:{tabbar:s.default},data:function(){return{options:{},statusType:{"-1":"已取消",1:"待支付",2:"待服务",3:"技师接单",4:"技师出发",5:"技师到达",6:"服务中",7:"已完成"},loading:!0,popupInfo:{},lockTap:!1}},computed:(0,c.mapState)({activeIndex:function(t){return t.order.activeIndex},tabList:function(t){return t.order.tabList},param:function(t){return t.order.param},list:function(t){return t.order.list},primaryColor:function(t){return t.config.configInfo.primaryColor},subColor:function(t){return t.config.configInfo.subColor},configInfo:function(t){return t.config.configInfo},userInfo:function(t){return t.user.userInfo}}),onLoad:function(t){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,i;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.tab,i=void 0===a?0:a,e.updateOrderItem({key:"activeIndex",val:i}),n.next=4,e.initIndex();case 4:case"end":return n.stop()}}),n)})))()},onPullDownRefresh:function(){uni.showNavigationBarLoading(),this.initRefresh(),uni.stopPullDownRefresh()},onReachBottom:function(){this.list.current_page>=this.list.last_page||this.loading||(this.loading=!0,this.getList(this.param.page+1))},methods:(0,i.default)((0,i.default)((0,i.default)({},(0,c.mapActions)(["getConfigInfo","getOrderList"])),(0,c.mapMutations)(["updateOrderItem"])),{},{initIndex:function(){var t=arguments,e=this;return(0,o.default)((0,r.default)().mark((function n(){var a;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=t.length>0&&void 0!==t[0]&&t[0],a||!e.$jweixin.isWechat()){n.next=5;break}return n.next=4,e.$jweixin.initJssdk();case 4:e.$jweixin.wxReady((function(){e.$jweixin.hideOptionMenu()}));case 5:if(e.configInfo.id&&!a){n.next=8;break}return n.next=8,e.getConfigInfo();case 8:return n.next=10,e.getList(1);case 10:case"end":return n.stop()}}),n)})))()},initRefresh:function(){this.initIndex(!0)},getList:function(){var t=arguments,e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,i,o,c,s;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:0,a&&(i=e.$util.deepCopy(e.param),i.page=a,e.updateOrderItem({key:"param",val:i})),e.list,o=e.param,c=e.tabList,s=e.activeIndex,o.pay_type=c[s].id,n.prev=4,n.next=7,e.getOrderList(o);case 7:e.loading=!1,e.$util.hideAll(),n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](4),e.loading=!1,e.$util.hideAll();case 15:case"end":return n.stop()}}),n,null,[[4,11]])})))()},handerTabChange:function(t){this.updateOrderItem({key:"activeIndex",val:t}),uni.pageScrollTo({scrollTop:0}),this.$util.showLoading(),this.getList(1)},toCancel:function(t){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,i,o,c,s,u,l;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=e.list.data[t],i=a.id,o=a.order_code,c=a.order_goods,s=a.pay_type,u=c[0].goods_cover,e.popupInfo={id:i,name:"系统单号：".concat(o),image:u,index:t},l=-1==s?"del_item":"cancel_item",e.$refs[l].open();case 5:case"end":return n.stop()}}),n)})))()},confirmCancel:function(){var t=this;return(0,o.default)((0,r.default)().mark((function e(){var n,a,i;return(0,r.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.popupInfo,a=n.id,i=n.index,e.next=3,t.$api.order.cancelOrder({id:a});case 3:0==t.activeIndex?t.list.data[i].pay_type=-1:t.list.data.splice(i,1),t.$util.showToast({title:"取消成功"}),t.$refs.cancel_item.close();case 6:case"end":return e.stop()}}),e)})))()},confirmDel:function(){var t=this;return(0,o.default)((0,r.default)().mark((function e(){var n,a,i;return(0,r.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.popupInfo,a=n.id,i=n.index,e.next=3,t.$api.order.delOrder({id:a});case 3:t.list.data.splice(i,1),t.$util.showToast({title:"删除成功"}),t.$refs.del_item.close();case 6:case"end":return e.stop()}}),e)})))()},toPay:function(t){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,i,o,c,s;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e.lockTap){n.next=2;break}return n.abrupt("return");case 2:return e.lockTap=!0,e.$util.showLoading(),a=e.list.data[t],i=a.id,o=a.pay_model,n.prev=5,n.next=8,e.$api.order.rePayOrder({id:i});case 8:if(c=n.sent,s=c.pay_list,e.$util.hideAll(),!s){n.next=33;break}if(3==o&&(s={orderInfo:s,provider:"alipay"}),3!=o){n.next=20;break}return s=Object.assign({},s,{order_id:i,page_url:"/pages/order?tab=2"}),e.updateOrderItem({key:"alipayOrderParams",val:s}),e.$util.goUrl({url:"/user/pages/alipay-result"}),e.lockTap=!1,setTimeout((function(){e.initRefresh()}),3e3),n.abrupt("return");case 20:return n.prev=20,n.next=23,e.$util.pay(s);case 23:e.$util.showToast({title:"支付成功"}),0==e.activeIndex?e.list.data[t].pay_type=2:e.list.data.splice(t,1),e.lockTap=!1,n.next=33;break;case 28:return n.prev=28,n.t0=n["catch"](20),e.$util.showToast({title:"支付失败"}),e.lockTap=!1,n.abrupt("return");case 33:n.next=38;break;case 35:n.prev=35,n.t1=n["catch"](5),setTimeout((function(){e.lockTap=!1,e.$util.hideAll()}),2e3);case 38:case"end":return n.stop()}}),n,null,[[5,35],[20,28]])})))()},toHx:function(t){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,i,o;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:a=e.list.data[t],i=a.id,o=a.qr,e.popupInfo={id:i,image:o},e.$refs.hx_item.open();case 3:case"end":return n.stop()}}),n)})))()},goDetail:function(t,e){var n=this.list.data[t].id,a="/user/pages/order/".concat(e,"?id=").concat(n);this.$util.goUrl({url:a})},toAgain:function(t){var e=this;return(0,o.default)((0,r.default)().mark((function n(){var a,i,o;return(0,r.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.list.data[t],i=a.id,o=a.coach_id,n.next=3,e.$api.order.onceMoreOrder({order_id:i});case 3:e.$util.goUrl({url:"/user/pages/order?id=".concat(o)});case 4:case"end":return n.stop()}}),n)})))()}})};e.default=u},"61b3":function(t,e,n){"use strict";var a=n("9cf0"),i=n.n(a);i.a},"93d5":function(t,e,n){"use strict";n.r(e);var a=n("cb40"),i=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"9cf0":function(t,e,n){var a=n("3316");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("4844f88a",a,!0,{sourceMap:!1,shadowMode:!1})},cb40:function(t,e,n){"use strict";n("7a82");var a=n("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("5530"));n("a9e3"),n("e9c4"),n("ac1f");var r=n("26cb"),o={components:{},props:{cur:{type:Number||String,default:function(){return"0"}}},data:function(){return{}},computed:(0,r.mapState)({primaryColor:function(t){return t.config.configInfo.primaryColor},subColor:function(t){return t.config.configInfo.subColor},configInfo:function(t){return t.config.configInfo},commonOptions:function(t){return t.user.commonOptions},activeIndex:function(t){return t.order.activeIndex}}),mounted:function(){var t=this,e=uni.getSystemInfoSync().windowHeight,n=JSON.parse(JSON.stringify(this.configInfo)),a=n.navBarHeight;setTimeout((function(){var i=uni.createSelectorQuery().in(t);i.select(".custom-tabbar").boundingClientRect((function(i){var r=e-i.height-a;n.curSysHeight=r,n.tabbarHeight=i.height,t.updateConfigItem({key:"configInfo",val:n})})).exec()}),200)},methods:(0,i.default)((0,i.default)({},(0,r.mapMutations)(["updateConfigItem"])),{},{changeTab:function(t){var e=this.activeIndex,n={1:"/pages/service",2:"/pages/technician",3:"/pages/dynamic",4:"/pages/order?tab=".concat(e),5:"/pages/mine"};t!=this.cur&&this.$util.goUrl({url:n[t],openType:"reLaunch"})}})};e.default=o},d2ce:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"custom-tabbar fix flex-center fill-base b-1px-t"},t._l(t.configInfo.tabBar,(function(e,a){return n("v-uni-view",{key:a,staticClass:"flex-center flex-column mt-sm",style:{width:100/t.configInfo.tabBar.length+"%",color:t.cur==e.id?t.primaryColor:"#666"},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.changeTab(e.id)}}},[n("i",{staticClass:"iconfont",class:t.cur==e.id?e.selected_img:e.default_img}),n("v-uni-view",{staticClass:"text"},[t._v(t._s(e.name))])],1)})),1)},i=[]},e1ad:function(t,e,n){"use strict";n.r(e);var a=n("2720"),i=n("4661");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);var o=n("f0c5"),c=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"25e8c09c",null,!1,a["a"],void 0);e["default"]=c.exports},ef96:function(t,e,n){"use strict";n.r(e);var a=n("d2ce"),i=n("93d5");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("61b3");var o=n("f0c5"),c=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"67cc264a",null,!1,a["a"],void 0);e["default"]=c.exports}}]);