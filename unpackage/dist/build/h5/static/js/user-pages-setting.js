(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-pages-setting"],{"51bd":function(e,t,n){"use strict";var i=n("8fda"),a=n.n(i);a.a},"626e":function(e,t,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("d81d");var a=i(n("5530")),o=i(n("c7eb")),s=i(n("1da1")),r=n("26cb"),u=i(n("32f7")),c={data:function(){return{isLoad:!1,options:{},infoList:[{text:"用户隐私协议",url:"/user/pages/protocol"},{text:"个人信息保护指引",url:"/user/pages/information"},{text:"屏蔽列表",url:"/user/pages/shield"}],user_info:{},authTime:0,timer:null,subForm:{phone:"",short_code:""},rule:[{name:"phone",checkType:"isMobile",errorMsg:"请输入手机号",regText:"手机号"},{name:"short_code",checkType:"isNotNull",errorMsg:"请输入短信验证码",regText:"短信验证码"}],lockTap:!1}},computed:(0,r.mapState)({primaryColor:function(e){return e.config.configInfo.primaryColor},subColor:function(e){return e.config.configInfo.subColor},configInfo:function(e){return e.config.configInfo},userInfo:function(e){return e.user.userInfo}}),onLoad:function(){var e=this;return(0,s.default)((0,o.default)().mark((function t(){return(0,o.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.initIndex();case 1:case"end":return t.stop()}}),t)})))()},methods:(0,a.default)((0,a.default)((0,a.default)({},(0,r.mapActions)(["getUserInfo"])),(0,r.mapMutations)(["updateConfigItem","updateServiceItem","updateTechnicianItem","updateOrderItem","updateUserItem"])),{},{initIndex:function(){var e=this;return(0,s.default)((0,o.default)().mark((function t(){return(0,o.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$jweixin.isWechat()){t.next=4;break}return t.next=3,e.$jweixin.initJssdk();case 3:e.$jweixin.wxReady((function(){e.$jweixin.hideOptionMenu()}));case 4:e.$util.setNavigationBarColor({bg:e.primaryColor}),e.user_info=e.$util.deepCopy(e.userInfo);case 6:case"end":return t.stop()}}),t)})))()},toResetPhone:function(){var e=this.configInfo.short_code_status,t=void 0===e?0:e;t&&this.$refs.show_phone_item.open()},toResetItem:function(){this.$refs.show_phone_item.close(),this.timer&&clearTimeout(this.timer),this.authTime=0,this.subForm={phone:"",short_code:""}},validate:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=new this.$util.Validate;this.rule.map((function(i){var a=i.name;"short_code"==a&&t||n.add(e[a],i)}));var i=n.start();return i},toSend:function(){var e=this;return(0,s.default)((0,o.default)().mark((function t(){var n,i,a,s,r;return(0,o.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.authTime,!n){t.next=3;break}return t.abrupt("return");case 3:if(i=e.subForm.phone,a=void 0===i?"":i,s=e.validate({phone:a},!0),!s){t.next=8;break}return e.$util.showToast({title:s}),t.abrupt("return");case 8:if(!e.lockTap){t.next=10;break}return t.abrupt("return");case 10:return e.lockTap=!0,e.$util.showLoading(),t.prev=12,t.next=15,e.$api.user.sendShortMsg({phone:a});case 15:e.$util.hideAll(),e.lockTap=!1,r=60,e.timer=setInterval((function(){0!==r?(r--,e.authTime=r):clearTimeout(e.timer)}),1e3),t.next=24;break;case 21:t.prev=21,t.t0=t["catch"](12),setTimeout((function(){e.lockTap=!1,e.$util.hideAll()}),2e3);case 24:case"end":return t.stop()}}),t,null,[[12,21]])})))()},submit:function(){var e=this;return(0,s.default)((0,o.default)().mark((function t(){var n,i;return(0,o.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.$util.deepCopy(e.subForm),i=e.validate(n),!i){t.next=5;break}return e.$util.showToast({title:i}),t.abrupt("return");case 5:if(6==n.short_code.length){t.next=8;break}return e.$util.showToast({title:"请输入6位数短信验证码"}),t.abrupt("return");case 8:if(!e.lockTap){t.next=10;break}return t.abrupt("return");case 10:return e.lockTap=!0,e.$util.showLoading(),t.prev=12,t.next=15,e.$api.user.bindUserPhone(n);case 15:return e.$util.hideAll(),e.lockTap=!1,e.toResetItem(),t.next=20,e.getUserInfo();case 20:t.next=25;break;case 22:t.prev=22,t.t0=t["catch"](12),setTimeout((function(){e.lockTap=!1,e.$util.hideAll()}),2e3);case 25:case"end":return t.stop()}}),t,null,[[12,22]])})))()},goDetail:function(e,t){var n=this[t][e].url;this.$util.goUrl({url:n})},toLoginOut:function(){var e=this;["updateServiceItem","updateTechnicianItem"].map((function(t){e[t]({key:"pageActive",val:!1})}));["autograph","userInfo","location","appLogin","loginType","isGzhLogin","isShowLogin","mineInfo","coachInfo","userPageType","commonOptions"].map((function(t){e.updateUserItem({key:t,val:"isShowLogin"===t||("userPageType"===t?1:"")})})),this.$util.showToast({title:"退出登录"}),setTimeout((function(){var e=u.default.siteroot,t=e.split("/index.php")[0],n="".concat(t,"/h5/#/pages/service");window.location.href=n}),1e3)}})};t.default=c},"82c5":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"mine-pages-setting"},[n("v-uni-view",{staticClass:"flex-center flex-column pd-lg fill-base"},[n("v-uni-view",{staticClass:"space-lg"}),n("v-uni-view",{staticClass:"space-lg"}),n("v-uni-view",{staticClass:"avatar radius"},[n("v-uni-view",{staticClass:"h5-image avatar radius",style:{backgroundImage:"url('"+e.user_info.avatarUrl+"')"}})],1),e.user_info.phone?n("v-uni-view",{staticClass:"flex-y-center f-title c-caption mt-md",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toResetPhone.apply(void 0,arguments)}}},[e._v(e._s(e.user_info.split_phone)),e.configInfo.short_code_status?n("v-uni-view",{staticClass:"ml-md f-caption",style:{color:e.primaryColor}},[e._v("更换手机号")]):e._e()],1):e._e()],1),n("v-uni-view",{staticClass:"flex-between pd-lg fill-base f-paragraph"},[n("v-uni-view",[e._v("昵称")]),n("v-uni-view",{staticClass:"c-caption"},[e._v(e._s(e.user_info.nickName))])],1),n("v-uni-view",{staticClass:"flex-between pd-lg fill-base f-paragraph"},[n("v-uni-view",[e._v("注册时间")]),n("v-uni-view",{staticClass:"c-caption"},[e._v(e._s(e.user_info.create_date||"-"))])],1),n("v-uni-view",{staticClass:"space-md"}),e._l(e.infoList,(function(t,i){return n("v-uni-view",{key:i,staticClass:"flex-between pd-lg fill-base f-paragraph",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.goDetail(i,"infoList")}}},[n("v-uni-view",[e._v(e._s(t.text))]),n("i",{staticClass:"iconfont icon-right"})],1)})),n("v-uni-view",{staticClass:"space-max-footer"}),n("fix-bottom-button",{attrs:{text:[{text:"退出登录",type:"confirm"}],bgColor:"#fff"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.toLoginOut.apply(void 0,arguments)}}}),n("uni-popup",{ref:"show_phone_item",attrs:{maskClick:!1}},[n("v-uni-view",{staticClass:"common-popup-content popup-phone pd-lg flex-center flex-column fill-base",on:{click:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t)}}},[n("v-uni-view",{staticClass:"f-md-title c-black"},[e._v("请输入手机号")]),n("v-uni-view",{staticClass:"space-lg pb-lg"}),n("v-uni-view",{staticClass:"space-lg pb-lg"}),n("v-uni-view",{staticClass:"flex-center mb-lg"},[n("v-uni-view",{staticClass:"input-info sm mr-md radius-16"},[n("v-uni-input",{staticClass:"item-input flex-y-center pl-lg pr-lg f-sm-title c-title",attrs:{type:"number","placeholder-class":"c-placeholder",placeholder:e.rule[0].errorMsg},model:{value:e.subForm.phone,callback:function(t){e.$set(e.subForm,"phone",t)},expression:"subForm.phone"}})],1),n("v-uni-view",{staticClass:"send-btn flex-center c-base radius-16",style:{background:e.primaryColor},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.toSend.apply(void 0,arguments)}}},[e._v(e._s(e.authTime>0?"("+e.authTime+"s)":"发送"))])],1),n("v-uni-view",{staticClass:"input-info radius-16"},[n("v-uni-input",{staticClass:"item-input flex-y-center pl-lg pr-lg f-sm-title c-title",attrs:{type:"number",maxlength:"6","placeholder-class":"c-placeholder",placeholder:e.rule[1].errorMsg},model:{value:e.subForm.short_code,callback:function(t){e.$set(e.subForm,"short_code",t)},expression:"subForm.short_code"}})],1),n("v-uni-view",{staticClass:"button"},[n("v-uni-view",{staticClass:"item-child",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toResetItem.apply(void 0,arguments)}}},[e._v("取消")]),n("v-uni-view",{staticClass:"item-child",style:{background:e.primaryColor,color:"#fff"},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("确定")])],1)],1)],1)],2)},a=[]},"8fda":function(e,t,n){var i=n("e208");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("080236a6",i,!0,{sourceMap:!1,shadowMode:!1})},c109:function(e,t,n){"use strict";n.r(t);var i=n("626e"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},d75d:function(e,t,n){"use strict";n.r(t);var i=n("82c5"),a=n("c109");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("51bd");var s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"33b5375e",null,!1,i["a"],void 0);t["default"]=r.exports},e208:function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.mine-pages-setting .iconfont[data-v-33b5375e]{color:#999}.mine-pages-setting .popup-phone[data-v-33b5375e]{width:%?630?%}.mine-pages-setting .popup-phone .input-info[data-v-33b5375e]{width:%?570?%;height:%?90?%;background:#f7f7f7}.mine-pages-setting .popup-phone .input-info .item-input[data-v-33b5375e]{height:%?90?%;font-size:%?32?%;text-align:left}.mine-pages-setting .popup-phone .input-info.sm[data-v-33b5375e]{width:%?400?%}.mine-pages-setting .popup-phone .send-btn[data-v-33b5375e]{width:%?150?%;height:%?90?%}',""]),e.exports=t}}]);