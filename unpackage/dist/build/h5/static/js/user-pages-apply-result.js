(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-pages-apply-result"],{"030b":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-794df433]{background:#fff}body.?%PAGE?%[data-v-794df433]{background:#fff}',""]),t.exports=n},"1ac0":function(t,n,e){"use strict";var i=e("d246"),a=e.n(i);a.a},"2b3e":function(t,n,e){"use strict";e.r(n);var i=e("d712"),a=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},d246:function(t,n,e){var i=e("030b");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("4e2dca6c",i,!0,{sourceMap:!1,shadowMode:!1})},d6d3:function(t,n,e){"use strict";e.r(n);var i=e("f5dc"),a=e("2b3e");for(var o in a)["default"].indexOf(o)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("1ac0");var r=e("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"794df433",null,!1,i["a"],void 0);n["default"]=u.exports},d712:function(t,n,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("5530")),o=i(e("c7eb")),r=i(e("1da1")),u=e("26cb"),c={components:{},data:function(){return{options:{},tipArr:{1:[],2:[],3:[{text:"平台管理员已取消授权",color:0}],4:[{text:"请联系平台管理人员询问失败原因",color:0}]},buttonArr:{1:[{text:"返回",type:"cancel"}],2:[{text:"",type:"confirm"}],3:[{text:"返回",type:"cancel"}],4:[{text:"再次申请",type:"confirm"},{text:"返回",type:"cancel"}]},title:{1:"等待审核",2:"",3:"取消授权",4:"申请失败"},image:{1:"https://lbqny.migugu.com/admin/public/apply_wait.jpg",2:"https://lbqny.migugu.com/admin/public/apply_suc.jpg",3:"https://lbqny.migugu.com/admin/public/apply_fail.jpg",4:"https://lbqny.migugu.com/admin/public/apply_fail.jpg"},isLoad:!1,status:1}},computed:(0,u.mapState)({primaryColor:function(t){return t.config.configInfo.primaryColor},subColor:function(t){return t.config.configInfo.subColor},configInfo:function(t){return t.config.configInfo},mineInfo:function(t){return t.user.mineInfo}}),onLoad:function(t){var n=this;return(0,r.default)((0,o.default)().mark((function e(){return(0,o.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.$util.showLoading(),n.options=t,n.initIndex();case 3:case"end":return e.stop()}}),e)})))()},onPullDownRefresh:function(){uni.showNavigationBarLoading(),this.initRefresh(),uni.stopPullDownRefresh()},methods:(0,a.default)((0,a.default)((0,a.default)({},(0,u.mapActions)(["getUserInfo","getMineInfo"])),(0,u.mapMutations)(["updateUserItem"])),{},{initIndex:function(){var t=arguments,n=this;return(0,r.default)((0,o.default)().mark((function e(){var i,a,r,u,c,s,l,p,f,d,g;return(0,o.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(i=t.length>0&&void 0!==t[0]&&t[0],i||!n.$jweixin.isWechat()){e.next=5;break}return e.next=4,n.$jweixin.initJssdk();case 4:n.$jweixin.wxReady((function(){n.$jweixin.hideOptionMenu()}));case 5:return e.next=7,n.getMineInfo();case 7:a=n.options.type,r=n.mineInfo,u=r.coach_status,c=r.sh_text,s=r.fx_status,l=r.fx_text,p=r.channel_status,f=r.channel_text,d=1==a?u:2==a?s:p,g=1==a?c:2==a?l:f,n.status=d,1==d&&(n.tipArr[d]=1==a?[{text:"审核成功后将直接入驻平台",color:0}]:[{text:"您已经成功提交申请",color:0},{text:"审核将在3个工作日内出结果，请耐心等待",color:0}]),2==d&&(n.tipArr[d]=1==a?[{text:"恭喜您，审核通过！",color:0}]:2==a?[{text:"您已具备分销商资格，快去分享体验吧~",color:0}]:[{text:"您已具备渠道商资格，快去分享体验吧~",color:0}],n.buttonArr[d][0].text=1==a?"去管理":"去分享",n.title[d]=1==a?"入驻成功":"审核通过"),4==d&&g&&(n.tipArr[d][0].text=g),n.$util.hideAll(),n.$util.setNavigationBarColor({bg:n.primaryColor}),n.isLoad=!0,uni.setNavigationBarTitle({title:n.title[d]});case 19:case"end":return e.stop()}}),e)})))()},initRefresh:function(){this.isLoad=!1,this.initIndex(!0)},confirm:function(){var t=this;return(0,r.default)((0,o.default)().mark((function n(){var e,i,a,r;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:e=t.status,i=t.options.type,a={1:"/technician/pages/apply",2:"/user/pages/distribution/apply",3:"/user/pages/channel/apply"},r=2==e?1==i?"/pages/mine":"/pages/service":a[i],t.$util.log(r),t.$util.goUrl({url:r,openType:2==e?"reLaunch":"redirectTo"});case 6:case"end":return n.stop()}}),n)})))()},cancel:function(){if(getCurrentPages().length>1)return this.$util.back(),void this.$util.goUrl({url:1,openType:"navigateBack"});this.$util.goUrl({url:"/pages/mine",openType:"reLaunch"})}})};n.default=c},f5dc:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.isLoad?e("v-uni-view",{staticClass:"user-apply-result"},[e("abnor",{attrs:{percent:"150%",title:t.title[t.status],tip:t.tipArr[t.status],button:t.buttonArr[t.status],image:t.image[t.status],tipMax:4==t.status?"690rpx":""},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.confirm.apply(void 0,arguments)},cancel:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}})],1):t._e()},a=[]}}]);