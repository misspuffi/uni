(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dynamic-pages-technician-follow"],{1995:function(t,n,a){"use strict";a.r(n);var i=a("e520"),e=a.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(n,t,(function(){return i[t]}))}(s);n["default"]=e.a},"4f3f":function(t,n,a){"use strict";a.r(n);var i=a("6228"),e=a("1995");for(var s in e)["default"].indexOf(s)<0&&function(t){a.d(n,t,(function(){return e[t]}))}(s);a("8aa6");var o=a("f0c5"),r=Object(o["a"])(e["default"],i["b"],i["c"],!1,null,"79f0a770",null,!1,i["a"],void 0);n["default"]=r.exports},"60f0":function(t,n,a){var i=a("8951");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var e=a("4f06").default;e("51df284f",i,!0,{sourceMap:!1,shadowMode:!1})},6228:function(t,n,a){"use strict";a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return e})),a.d(n,"a",(function(){}));var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",{staticClass:"dynamic-technician-follow"},[t._l(t.list.data,(function(n,i){return a("v-uni-view",{key:i,staticClass:"list-item flex-center ml-lg mr-lg pt-lg pb-lg",class:[{"b-1px-t":0!==i}]},[a("v-uni-image",{staticClass:"avatar radius",attrs:{mode:"aspectFill",src:n.avatarUrl}}),a("v-uni-view",{staticClass:"flex-1 flex-between ml-md"},[a("v-uni-view",[a("v-uni-view",{staticClass:"f-paragraph c-title text-bold max-470 ellipsis"},[t._v(t._s(n.nickName))]),a("v-uni-view",{staticClass:"text f-caption"},[t._v("开始关注了你")])],1),a("v-uni-view",{staticClass:"time f-icontext"},[t._v(t._s(n.friend_time))])],1)],1)})),t.loading?a("load-more",{attrs:{noMore:t.list.current_page>=t.list.last_page&&t.list.data.length>0,loading:t.loading}}):t._e(),!t.loading&&t.list.data.length<=0&&1==t.list.current_page?a("abnor"):t._e(),a("v-uni-view",{staticClass:"space-footer"})],2)},e=[]},8951:function(t,n,a){var i=a("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-79f0a770]{background:#fff}body.?%PAGE?%[data-v-79f0a770]{background:#fff}.dynamic-technician-follow .list-item .avatar[data-v-79f0a770]{width:%?72?%;height:%?72?%}.dynamic-technician-follow .list-item .text[data-v-79f0a770]{color:#adadad;margin-top:%?6?%}.dynamic-technician-follow .list-item .time[data-v-79f0a770]{color:#9b9b9b}',""]),t.exports=n},"8aa6":function(t,n,a){"use strict";var i=a("60f0"),e=a.n(i);e.a},e520:function(t,n,a){"use strict";a("7a82");var i=a("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,a("99af");var e=i(a("c7eb")),s=i(a("1da1")),o=a("26cb"),r={data:function(){return{loading:!0,param:{page:1},list:{data:[]}}},computed:(0,o.mapState)({primaryColor:function(t){return t.config.configInfo.primaryColor},subColor:function(t){return t.config.configInfo.subColor},configInfo:function(t){return t.config.configInfo},userInfo:function(t){return t.user.userInfo}}),onLoad:function(){this.$util.setNavigationBarColor({bg:this.primaryColor}),this.initIndex()},onUnload:function(){this.$util.getPage(-1).getDynamicData()},onPullDownRefresh:function(){uni.showNavigationBarLoading(),this.initRefresh(),uni.stopPullDownRefresh()},onReachBottom:function(){this.list.current_page>=this.list.last_page||this.loading||(this.param.page=this.param.page+1,this.loading=!0,this.getList())},methods:{initIndex:function(){var t=arguments,n=this;return(0,s.default)((0,e.default)().mark((function a(){var i;return(0,e.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(i=t.length>0&&void 0!==t[0]&&t[0],i||!n.$jweixin.isWechat()){a.next=5;break}return a.next=4,n.$jweixin.initJssdk();case 4:n.$jweixin.wxReady((function(){n.$jweixin.hideOptionMenu()}));case 5:n.getList();case 6:case"end":return a.stop()}}),a)})))()},handerTabChange:function(t){this.activeIndex=t,this.param.status=t,this.getList()},initRefresh:function(){this.param.page=1,this.initIndex(!0)},getList:function(){var t=this;return(0,s.default)((0,e.default)().mark((function n(){var a,i,s;return(0,e.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.$util.showLoading(),a=t.list,i=t.param,n.next=4,t.$api.dynamic.followList(i);case 4:s=n.sent,1==t.param.page||(s.data=a.data.concat(s.data)),t.list=s,t.loading=!1,t.$util.hideAll();case 8:case"end":return n.stop()}}),n)})))()}}};n.default=r}}]);