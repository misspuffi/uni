(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-pages-article"],{"28a0":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.user-pages-info .form-info .item-input[data-v-b673fef6]{color:#333;background:#f7f8fa}',""]),e.exports=t},"29fd":function(e,t,n){"use strict";n.r(t);var i=n("dd9b"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);t["default"]=a.a},"984d":function(e,t,n){"use strict";n.r(t);var i=n("fe2e"),a=n("29fd");for(var r in a)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("fa98");var o=n("f0c5"),s=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"b673fef6",null,!1,i["a"],void 0);t["default"]=s.exports},aa0c:function(e,t,n){var i=n("28a0");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("d939c076",i,!0,{sourceMap:!1,shadowMode:!1})},dd9b:function(e,t,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("d81d"),n("ac1f"),n("5319"),n("00b4"),n("99af"),n("4de4"),n("d3b7"),n("ddb0");var a=i(n("c7eb")),r=i(n("1da1")),o=i(n("5530")),s=n("26cb"),u=i(n("37e4")),l={components:{parser:u.default},data:function(){return{options:{},isLoad:!1,detail:{},pageLen:1}},computed:(0,s.mapState)({primaryColor:function(e){return e.config.configInfo.primaryColor},subColor:function(e){return e.config.configInfo.subColor},configInfo:function(e){return e.config.configInfo},userInfo:function(e){return e.user.userInfo},loginPage:function(e){return e.user.loginPage}}),onLoad:function(e){this.options=e,this.$util.showLoading(),this.initIndex()},methods:(0,o.default)((0,o.default)((0,o.default)({},(0,s.mapActions)(["getConfigInfo","getUserInfo"])),(0,s.mapMutations)(["updateUserItem"])),{},{initIndex:function(){var e=arguments,t=this;return(0,r.default)((0,a.default)().mark((function n(){var i,r;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.length>0&&void 0!==e[0]&&e[0],i=t.options.id,n.next=4,t.$api.service.articleInfo({id:i});case 4:r=n.sent,r.is_form&&r.field.map((function(e){e.field_value=""})),t.detail=r,t.$util.setNavigationBarColor({bg:t.primaryColor}),t.$util.hideAll(),t.isLoad=!0,t.pageLen=getCurrentPages().length;case 11:case"end":return n.stop()}}),n)})))()},initRefresh:function(){this.initIndex(!0)},linkpress:function(e){},submit:function(){var e=this;return(0,r.default)((0,a.default)().mark((function t(){var n,i,r,o,s,u,l,f,c,d,p,v,g,m,b,h,_,x,w,k,y,$;return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.userInfo,i=n.id,r=void 0===i?0:i,o=n.phone,s=void 0===o?"":o,u=e.loginType,l=e.configInfo.short_code_status,r&&("weixin"!==u||!l||s)){t.next=8;break}return f=e.options,c=f.id,f.type,e.updateUserItem({key:"loginPage",val:"/user/pages/article?id=".concat(c)}),e.$util.goUrl({url:"/pages/login"}),t.abrupt("return");case 8:if(d=e.detail,p=d.is_form,v=d.field,1!=p){t.next=23;break}v=e.$util.deepCopy(v),g=/^(1[0-9]{10})$/,t.t0=(0,a.default)().keys(v);case 13:if((t.t1=t.t0()).done){t.next=23;break}if(m=t.t1.value,1*m+1,b=v[m],h=b.is_required,_=b.field_value,x=b.field_type,w=b.title,1===x&&(_=_?_.replace(/(^\s*)|(\s*$)/g,""):_),!(h&&!_||2===x&&(h||_)&&!g.test(_))){t.next=21;break}return e.$util.showToast({title:2===x&&_&&!g.test(_)?"".concat(_," ").concat(w,"无效"):"请输入".concat(w)}),t.abrupt("return");case 21:t.next=13;break;case 23:if(k=e.options.id,y=e.detail.field.map((function(e){return{field_id:e.field_id,field_type:e.field_type,key:e.title,value:e.field_value}})),$=y.filter((function(e){return e.value})),0!==$.length){t.next=29;break}return e.$util.showToast({title:"至少填写一项哦"}),t.abrupt("return");case 29:if(!e.lockTap){t.next=31;break}return t.abrupt("return");case 31:return e.lockTap=!0,e.$util.showLoading(),t.prev=33,t.next=36,e.$api.service.subArticleForm({article_id:k,sub_data:y});case 36:e.lockTap=!1,e.$util.hideAll(),e.$util.showToast({title:"提交成功"}),setTimeout((function(){var t=e.pageLen,n=t>1?1:"/pages/service",i=t>1?"navigateBack":"reLaunch";e.$util.goUrl({url:n,openType:i})}),2e3),t.next=45;break;case 42:t.prev=42,t.t2=t["catch"](33),setTimeout((function(){e.lockTap=!1,e.$util.hideAll()}),2e3);case 45:case"end":return t.stop()}}),t,null,[[33,42]])})))()}})};t.default=l},fa98:function(e,t,n){"use strict";var i=n("aa0c"),a=n.n(i);a.a},fe2e:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isLoad?n("v-uni-view",{staticClass:"user-pages-article"},[n("v-uni-view",{staticClass:"pd-lg f-paragraph fill-base"},[n("parser",{attrs:{html:e.detail.text,"show-with-animation":!0,"lazy-load":!0},on:{linkpress:function(t){arguments[0]=t=e.$handleEvent(t),e.linkpress.apply(void 0,arguments)}}},[e._v("加载中...")])],1),e.detail.is_form?[n("v-uni-view",{staticClass:"form-info mt-lg ml-md mr-md pd-lg fill-base radius-20"},e._l(e.detail.field,(function(t,i){return n("v-uni-view",{key:i,staticClass:"mt-md mb-lg"},[n("v-uni-view",{staticClass:"item-text flex-y-center"},[n("i",{staticClass:"iconfont icon-required",class:[{"c-warning":t.is_required},{"c-base":!t.is_required}]}),e._v(e._s(t.title))]),n("v-uni-input",{staticClass:"item-input mt-md pd-lg radius-16",attrs:{type:"text",placeholder:"请输入"+t.title},model:{value:t.field_value,callback:function(n){e.$set(t,"field_value",n)},expression:"item.field_value"}})],1)})),1),n("fix-bottom-button",{attrs:{text:[{text:"提交",type:"confirm",isAuth:!0}],bgColor:"#fff"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}})]:e._e(),n("v-uni-view",{class:[{"space-footer":!e.detail.is_form},{"space-max-footer":e.detail.is_form}]})],2):e._e()},a=[]}}]);