(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["technician-pages-apply"],{2111:function(e,t,i){"use strict";var n=i("e162"),a=i.n(n);a.a},"305c":function(e,t,i){"use strict";(function(e){i("7a82");var n=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("c7eb")),r=n(i("1da1"));i("d9e2"),i("d401"),i("fb6a");var s=i("dfcf");function o(){}function c(t){return t||new Error("请传入人脸核身对应Action名称"),function(){var i=(0,r.default)((0,a.default)().mark((function i(n){var r,o,c;return(0,a.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,r=(0,s.toUpperCase)(n),i.next=4,e.callFunction({name:"tencentcloud-plugin",data:{module:"FACEID",action:"getFaceidResult",name:t,payload:r}});case 4:return o=i.sent,c=o.result,i.abrupt("return",c);case 9:throw i.prev=9,i.t0=i["catch"](0),new Error(i.t0);case 12:case"end":return i.stop()}}),i,null,[[0,9]])})));return function(e){return i.apply(this,arguments)}}()}for(var l=["LivenessRecognition","LivenessCompare","ImageRecognition","GetLiveCode","GetActionSequence","CheckIdCardInformation","PhoneVerification","IdCardOCRVerification"],u=0;u<l.length;u++){var d=l[u];o[d.charAt(0).toLowerCase()+d.slice(1)]=c(l[u])}var p=o;t.default=p}).call(this,i("a9ff")["default"])},"34c8":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page-height[data-v-c25af07e]{width:100%;height:100vh;background:#fff}',""]),e.exports=t},"3a87":function(e,t,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,i("caad"),i("4e82"),i("d81d"),i("a434"),i("c740"),i("99af");var a=n(i("3835")),r=n(i("5530")),s=n(i("c7eb")),o=n(i("1da1")),c=n(i("436d")),l=i("6aa4"),u=i("6170"),d=n(i("a849")),p=i("26cb"),f=(n(i("b356")),{components:{wPicker:d.default},data:function(){return{isLoad:!1,options:{},cityList:[],cityIndex:-1,tipArr:{"-1":[{text:"审核中不可编辑资料",color:0}],2:[{text:"快去管理订单吧",color:0}],3:[{text:"请联系平台管理人员询问原因",color:0}]},buttonArr:{"-1":[{text:"返回",type:"cancel"}],2:[{text:"去管理",type:"confirm"}],3:[{text:"再次申请",type:"confirm"},{text:"个人中心",type:"cancel"}]},title:{"-1":"您已经成功提交申请",2:"您已经是技师了",3:"平台管理员已取消授权"},image:{"-1":"https://lbqny.migugu.com/admin/public/apply_wait.jpg",2:"https://lbqny.migugu.com/admin/public/apply_suc.jpg",3:"https://lbqny.migugu.com/admin/public/apply_fail.jpg"},status:!1,is_update:0,coach_status:0,videoContext:null,form:{id:0,coach_name:"",mobile:"",sex:0,nick_name:"",work_time:"",lng:"",lat:"",address:"",text:"",id_code:"",id_card:[],id_card_fan:[],id_card_people:[],license:[],work_img:[],self_img:[],city_id:"",video:[]},rule:[{name:"coach_name",checkType:"isNotNull",errorMsg:"输入您的姓名",regType:2},{name:"mobile",checkType:"isMobile",errorMsg:"输入手机号"},{name:"work_time",checkType:"isNotNull",errorMsg:"请输入从业年份，例如：5"},{name:"city_id",checkType:"isNotNull",errorMsg:"请选择意向工作城市"},{name:"address",checkType:"isNotNull",errorMsg:"请选择所在地址"},{name:"text",checkType:"isNotNull",errorMsg:"请输入技师简介",regType:2},{name:"id_code",checkType:"isIdCard",errorMsg:"输入您的身份证号码"},{name:"id_card",checkType:"isNotNull",errorMsg:"请上传身份证人像面"},{name:"id_card_fan",checkType:"isNotNull",errorMsg:"请上传身份证国徽面"},{name:"id_card_people",checkType:"isNotNull",errorMsg:"请上传手持身份证照片"},{name:"license",checkType:"isNotNull",errorMsg:"请上传资格证书"},{name:"work_img",checkType:"isNotNull",errorMsg:"请上传工作形象照"},{name:"self_img",checkType:"isNotNull",errorMsg:"请上传个人生活照"},{name:"nick_name",checkType:"isNotNull",errorMsg:"请输入您的昵称"}],lockTap:!1,RuleId:1,appid:"IDAdoIMa",secret:"eRdoxMnzou4SNlJ7yLVkRKtqAblzbBaWGOSyspntasIKU5BYNelxPCKfPY587cj3",userId:(0,l.randomString)(8),orderNo:(0,l.randomString)(9),nonce:(0,l.randomString)(32),version:"1.0.0",signTickets:"",licence:"RWdRqRVm3ngdlc0+KR+1yYNEX5h4Op5MGLHxWUqRb5UVUIr0D6RabSkaqFIFHA8s2fiD9xkHy50kMJG+KByXuMpQkYoCgIRyzsFytMBB05S2lG+dOCnc95zk7nBVdwGsWs5ibjNod/TO/xRFyKXyGAjeBTgIFXdFZnhQ1G1T9c9T+bTJGSu5R6DHqRvah+weVQiUfu/GpCZh6EXFbn5JwUEm+PDpF6KN9YZngFjIo2nN1MgQZqWunDSHgqhFV2TM/gfjmgXLn4ZG5pDwTxVQsNjZm3aGFuF9TXbEHQjUP1TQevbzXG2Hg4sS5IJFwpPB0xKrw6tVphGgZsZOhDO0cQ=="}},computed:(0,p.mapState)({primaryColor:function(e){return e.config.configInfo.primaryColor},subColor:function(e){return e.config.configInfo.subColor},configInfo:function(e){return e.config.configInfo},userInfo:function(e){return e.user.userInfo},location:function(e){return e.user.location}}),onLoad:function(e){var t=this;return(0,o.default)((0,s.default)().mark((function i(){var n,a,r,o,c,l,u;return(0,s.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n=e,a=n.is_edit,r=void 0===a?0:a,e.is_edit=r,i.next=4,t.updateCommonOptions(e);case 4:return e=i.sent,t.options=e,t.$util.showLoading(),i.next=9,t.initIndex();case 9:o=e,c=o.admin_id,l=void 0===c?0:c,u=t.coach_status,uni.setNavigationBarTitle({title:r?"编辑资料":l&&[2,3].includes(u)?"":"申请技师"}),t.isLoad=!0;case 13:case"end":return i.stop()}}),i)})))()},methods:(0,r.default)((0,r.default)((0,r.default)({},(0,p.mapActions)(["getConfigInfo","getUserInfo","updateCommonOptions"])),(0,p.mapMutations)(["updateUserItem"])),{},{startDetect:function(e){var t=this;return(0,o.default)((0,s.default)().mark((function i(){var n;return(0,s.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:try{uni.showLoading({mask:!0,title:"稍等..."}),n=uni.getStorage("signTickets"),n&""!=n?(t.signTickets=n,t.getFaceIdSign(n,e)):t.getAccessToken(e)}catch(a){uni.showToast({icon:"none",title:a.message})}finally{t.status=!1}case 1:case"end":return i.stop()}}),i)})))()},getAccessToken:function(e){var t=this;uni.request({method:"GET",url:"https://miniprogram-kyc.tencentcloudapi.com/api/oauth2/access_token",data:{app_id:this.appid,secret:this.secret,grant_type:"client_credential",version:this.version},success:function(i){if(i.code)uni.showToast({icon:"none",title:i.msg});else{var n=i.data.access_token;uni.setStorage({key:"access_token",value:n,expires:72e5}),t.getSIGNticket(n,e)}}})},getSIGNticket:function(e,t){var i=this;uni.request({method:"GET",url:"https://miniprogram-kyc.tencentcloudapi.com/api/oauth2/api_ticket",data:{app_id:this.appid,access_token:e,type:"SIGN",version:this.version},success:function(e){if(e.code)uni.showToast({icon:"none",title:e.msg});else{var n=e.data.tickets[0].value;i.signTickets=n,uni.setStorage({key:"signTickets",value:n,expires:12e5}),i.getFaceIdSign(n,t)}}})},getFaceIdSign:function(e,t){var i=[this.appid,this.nonce,this.userId,e,this.version];i.sort();for(var n="",a=0,r=i;a<r.length;a++){var s=r[a];n+="".concat(s)}var o=(0,c.default)(n).toUpperCase();this.getFaceId(o,t)},getFaceIdSign1:function(e){var t=[this.appid,this.nonce,this.orderNo,e,this.version];t.sort();for(var i="",n=0,a=t;n<a.length;n++){var r=a[n];i+="".concat(r)}return(0,c.default)(i).toUpperCase()},getFaceId:function(e,t){var i=this;uni.request({method:"POST",url:"https://miniprogram-kyc.tencentcloudapi.com/api/server/getAdvFaceId?orderNo="+this.orderNo,data:{webankAppId:this.appid,orderNo:this.orderNo,name:this.form.coach_name,idNo:this.form.id_code,userId:this.userId,version:this.version,sign:e,nonce:this.nonce},success:function(n){if(0==n.data.code){var a=n.data.result,r=a.faceId;i.startWbFaceVerifyService(e,r,t)}else uni.showToast({icon:"none",title:n.data.msg})}})},startWbFaceVerifyService:function(e,t,i){var n=this;try{var a=this,r=uni.requireNativePlugin("DC-WBFaceServiceV2");console.log(t),r.startAdvanceWbFaceVerifyService({apiVersion:"1.0.0",appId:a.appid,nonce:a.nonce,userId:a.userId,sign:e,orderNo:a.orderNo,licence:a.licence,faceId:t,compareType:"0",sdkConfig:{showSuccessPage:!1,showFailurePage:!1,recordVideo:!1,checkVideo:!1,playVoice:!1,theme:"1",customerTipsLoc:"0",customerTipsInLive:"",customerTipsInUpload:"",customerLongTip:"",isEnableLog:!0,windowLevel:"1",manualCookie:!0,useWindowScene:!1,useAdvanceCompare:!0}},(function(e){console.log("startWbFaceVerifyService",e);var t=e.scene;if("wb_face_callback_login_failure"!=t){if("wb_face_callback_verify_result"==t){var r=e.res,s=r.success;if(s){uni.showToast({icon:"none",title:"刷脸成功:活体可能性："+r.liveRate+"%; 人脸相似度：="+r.similarity+"%"}),a.orderNo=r.orderNo;var o=a.getFaceIdSign1(a.signTickets),c={appId:a.appid,sign:o,version:a.version,nonce:a.nonce,orderNo:a.orderNo,getFile:2};uni.request({method:"POST",url:"https://miniprogram-kyc.tencentcloudapi.com/api/v2/base/queryfacerecord?orderNo="+a.orderNo,data:c,success:function(e){0==e.data.code?(i["face_img"]=e.data.result.photo,i["similarity"]=r.similarity,n.submit(i)):uni.showToast({icon:"none",title:e.msg})}})}else{var l=r.error,u=l.domain;if("WBFaceErrorDomainCompareServer"==u)return void uni.showToast({icon:"none",title:"对比失败，活体可能性："+r.liveRate+"%; 人脸相似度："+r.similarity+"%"});uni.showToast({icon:"none",title:"刷脸失败，请重试"})}}}else{uni.removeStorage({key:"signTickets"});uni.showToast({icon:"none",title:"刷脸失败，请重试"})}}))}catch(s){console.log(s),uni.showToast({icon:"none",title:s.message})}},PhoneVerification:function(e){var t=this;return(0,o.default)((0,s.default)().mark((function i(){var n,a;return(0,s.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,t.status=!0,n="",uni.showLoading({mask:!0,title:"身份证核验中..."}),a={idCard:e.id_code,name:e.coach_name},i.next=7,(0,u.IdCardOCRVerification)(a);case 7:if(n=i.sent,0!=n.Result){i.next=14;break}uni.showToast({title:n.Description}),uni.showLoading({mask:!0,title:"即将进入人脸核验..."}),setTimeout((function(){uni.hideLoading(),t.startDetect(e)}),3500),i.next=16;break;case 14:return uni.showToast({icon:"none",title:n.Description}),i.abrupt("return",!1);case 16:i.next=22;break;case 18:return i.prev=18,i.t0=i["catch"](0),uni.showToast({icon:"none",title:i.t0.message}),i.abrupt("return",!1);case 22:return i.prev=22,t.status=!1,i.finish(22);case 25:case"end":return i.stop()}}),i,null,[[0,18,22,25]])})))()},initIndex:function(){var e=arguments,t=this;return(0,o.default)((0,s.default)().mark((function i(){var n,a,r;return(0,s.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(n=e.length>0&&void 0!==e[0]&&e[0],n||!t.$jweixin.isWechat()){i.next=5;break}return i.next=4,t.$jweixin.initJssdk();case 4:t.$jweixin.wxReady((function(){t.$jweixin.hideOptionMenu()}));case 5:if(t.configInfo.id&&!n){i.next=8;break}return i.next=8,t.getConfigInfo();case 8:return i.next=10,t.getCityList();case 10:return i.next=12,t.$api.technician.coachInfo();case 12:if(a=i.sent,t.$util.setNavigationBarColor({bg:t.primaryColor}),!a||a.id){i.next=17;break}return t.$util.hideAll(),i.abrupt("return");case 17:for(r in a.id_card=a.id_card.map((function(e){return{path:e}})),a.id_card_fan=[a.id_card[1]],a.id_card_people=[a.id_card[2]],a.id_card.splice(1,3),a.license=a.license.map((function(e){return{path:e}})),a.work_img=[{path:a.work_img}],a.self_img=a.self_img.map((function(e){return{path:e}})),a.video=a.video&&a.video.length>0?[{path:a.video}]:[],t.cityIndex=t.cityList.findIndex((function(e){return e.id==a.city_id})),t.form)t.form[r]=a[r];t.coach_status=1==a.is_update?-1:a.status,t.is_update=a.is_update,t.$util.hideAll();case 30:case"end":return i.stop()}}),i)})))()},initRefresh:function(){this.initIndex(!0)},getCityList:function(){var e=this;return(0,o.default)((0,s.default)().mark((function t(){var i,n,a,r,o,c,l,u,d,p,f,m,v,g,h,w,x,b,_,y,C,k;return(0,s.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i=e.location,i.lat){t.next=22;break}if(!e.$jweixin.isWechat()){t.next=21;break}return e.$util.showLoading(),t.next=6,e.$jweixin.wxReady2();case 6:return t.next=8,e.$jweixin.getWxLocation();case 8:if(n=t.sent,a=n.latitude,r=void 0===a?0:a,o=n.longitude,c=void 0===o?0:o,i={lng:c,lat:r,address:"定位失败",province:"",city:"",district:""},!r||!c){t.next=21;break}return l="".concat(r,",").concat(c),t.next=18,e.$api.base.getMapInfo({location:l});case 18:u=t.sent,d=JSON.parse(u),p=d.status,f=d.result,0==p&&(m=f.address,v=f.address_component,g=v.province,h=v.city,w=v.district,i={lng:c,lat:r,address:m,province:g,city:h,district:w});case 21:e.updateUserItem({key:"location",val:i});case 22:if(x=i,b=x.lng,_=void 0===b?0:b,y=x.lat,C=void 0===y?0:y,!C||!_){t.next=30;break}return t.next=26,e.$api.base.getCity({lng:_,lat:C});case 26:k=t.sent,e.$util.hideAll(),e.cityList=k,e.form.city_id=k.length>0?k[0].id:0;case 30:case"end":return t.stop()}}),t)})))()},pickerChange:function(e,t){this.cityIndex=e.target.value,this.form.city_id=this.cityList[this.cityIndex].id},imgUpload:function(e){var t=e.imagelist,i=e.imgtype;this.form[i]=t},toChooseLocation:function(e){var t=this;return(0,o.default)((0,s.default)().mark((function e(){var i,n,r,o,c,l,u;return(0,s.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$util.checkAuth({type:"userLocation"});case 2:return e.next=4,uni.chooseLocation();case 4:if(i=e.sent,n=(0,a.default)(i,2),r=n[1],o=r.address,c=void 0===o?"":o,l=r.longitude,u=r.latitude,c){e.next=13;break}return e.abrupt("return");case 13:t.form.address=c,t.form.lng=l,t.form.lat=u;case 16:case"end":return e.stop()}}),e)})))()},confirm:function(){var e=this;return(0,o.default)((0,s.default)().mark((function t(){var i,n,a;return(0,s.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:i=e.coach_status,n={2:"/pages/mine",3:"/technician/pages/apply"},a=n[i],e.$util.log(a),e.$util.goUrl({url:a,openType:"reLaunch"});case 5:case"end":return t.stop()}}),t)})))()},validate:function(e){var t=new this.$util.Validate;this.rule.map((function(i){var n=i.name;t.add(e[n],i)}));var i=t.start();return i},check:function(){var e=this;return(0,o.default)((0,s.default)().mark((function t(){var i,n,a;return(0,s.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(i=e.$util.deepCopy(e.form),n=["id_card","id_card_fan","id_card_people","work_img","video"],n.map((function(e){i[e]=i[e].length>0?i[e][0].path:""})),i.license=i.license.map((function(e){return e.path})),i.self_img=i.self_img.map((function(e){return e.path})),a=e.validate(i),!a){t.next=9;break}return e.$util.showToast({title:a}),t.abrupt("return");case 9:if(!e.status){t.next=12;break}return e.$util.showToast({title:"请不要重复提交"}),t.abrupt("return");case 12:return t.next=14,e.PhoneVerification(i);case 14:case"end":return t.stop()}}),t)})))()},submit:function(e){var t=this;return(0,o.default)((0,s.default)().mark((function i(){var n,a,r,o,c,l;return(0,s.default)().wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(n=t.options.admin_id,a=void 0===n?0:n,a&&(e.admin_id=a),e.id_card=[e.id_card,e.id_card_fan,e.id_card_people],delete e.id_card_fan,delete e.id_card_people,!t.lockTap){i.next=7;break}return i.abrupt("return");case 7:return t.lockTap=!0,t.$util.showLoading(),i.prev=9,r=t.options.is_edit,o=void 0===r?0:r,c=e.id&&o?"coachUpdateV2":"coachApply",i.next=14,t.$api.technician[c](e);case 14:t.$util.hideAll(),l=e.id&&o?"":",即将跳转个人中心",t.$util.showToast({title:"提交成功".concat(l)}),setTimeout((function(){if(e.id&&o)return t.coach_status=-1,void(t.is_update=1);getCurrentPages().length>1&&t.$util.back(),t.$util.goUrl({url:"/pages/mine",openType:"reLaunch"})}),1500),i.next=23;break;case 20:i.prev=20,i.t0=i["catch"](9),setTimeout((function(){t.lockTap=!1,t.$util.hideAll()}),2e3);case 23:case"end":return i.stop()}}),i,null,[[9,20]])})))()}})});t.default=f},"5ede":function(e,t,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.getActionSequence=function(){return a.default.getActionSequence({})},t.getLiveCode=function(){return a.default.getLiveCode({})},t.imageRecognition=function(e){if(!e.idCard||!e.name||!e.imageBase64)throw new Error("请传入必传参数");return a.default.imageRecognition(e)},t.livenessCompare=function(e){if(!e.imageBase64||!e.videoBase64||!e.livenessType)throw new Error("请传入必传参数");return a.default.livenessCompare(e)},t.livenessRecognition=function(e){if(!e.idCard||!e.name||!e.videoBase64||!e.livenessType)throw new Error("请传入必传参数");return a.default.livenessRecognition(e)},i("d9e2"),i("d401");var a=n(i("305c"))},6170:function(e,t,i){"use strict";i("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"IdCardOCRVerification",{enumerable:!0,get:function(){return a.IdCardOCRVerification}}),Object.defineProperty(t,"PhoneVerification",{enumerable:!0,get:function(){return a.PhoneVerification}}),Object.defineProperty(t,"checkIdCardInformation",{enumerable:!0,get:function(){return a.checkIdCardInformation}}),Object.defineProperty(t,"getActionSequence",{enumerable:!0,get:function(){return n.getActionSequence}}),Object.defineProperty(t,"getLiveCode",{enumerable:!0,get:function(){return n.getLiveCode}}),Object.defineProperty(t,"imageRecognition",{enumerable:!0,get:function(){return n.imageRecognition}}),Object.defineProperty(t,"livenessCompare",{enumerable:!0,get:function(){return n.livenessCompare}}),Object.defineProperty(t,"livenessRecognition",{enumerable:!0,get:function(){return n.livenessRecognition}});var n=i("5ede"),a=i("be04")},"82f81":function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){}));var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.isLoad?i("v-uni-view",{staticClass:"apply-pages"},[e.options.admin_id&&[2,3].includes(e.coach_status)||e.is_update?i("v-uni-view",{staticClass:"page-height"},[i("abnor",{attrs:{percent:"150%",title:e.title[e.coach_status],tip:e.tipArr[e.coach_status],button:e.buttonArr[e.coach_status],image:e.image[e.coach_status]},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.confirm.apply(void 0,arguments)},cancel:function(t){arguments[0]=t=e.$handleEvent(t),e.$util.goUrl({url:1,openType:"navigateBack"})}}})],1):[i("v-uni-view",{staticClass:"apply-form"},[i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg b-1px-b"},[i("v-uni-view",{staticClass:"item-text"},[e._v("姓名")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{type:"text",maxlength:"20",placeholder:e.rule[0].errorMsg},model:{value:e.form.coach_name,callback:function(t){e.$set(e.form,"coach_name",t)},expression:"form.coach_name"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg b-1px-b"},[i("v-uni-view",{staticClass:"item-text"},[e._v("昵称")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{type:"text",maxlength:"20",placeholder:e.rule[13].errorMsg},model:{value:e.form.nick_name,callback:function(t){e.$set(e.form,"nick_name",t)},expression:"form.nick_name"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg b-1px-b"},[i("v-uni-view",{staticClass:"item-text"},[e._v("性别")]),i("v-uni-view",{staticClass:"item-input flex-1 flex-y-center"},e._l(["男","女"],(function(t,n){return i("v-uni-view",{key:n,staticClass:"flex-y-center",class:[{"mr-lg":0==n}],style:{color:e.form.sex==n?e.primaryColor:""},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.form.sex=n}}},[i("i",{staticClass:"iconfont icon-xuanze mr-sm",class:[{"icon-xuanze-fill":e.form.sex==n}]}),e._v(e._s(t))])})),1)],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg b-1px-b"},[i("v-uni-view",{staticClass:"item-text"},[e._v("手机号")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{type:"text",placeholder:e.rule[1].errorMsg},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg b-1px-b"},[i("v-uni-view",{staticClass:"item-text"},[e._v("从业年份")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{type:"number",placeholder:e.rule[2].errorMsg},model:{value:e.form.work_time,callback:function(t){e.$set(e.form,"work_time",t)},expression:"form.work_time"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg b-1px-b"},[i("v-uni-view",{staticClass:"item-text"},[e._v("工作城市")]),i("v-uni-view",{staticClass:"item-input text"},[i("v-uni-picker",{attrs:{value:e.cityIndex,range:e.cityList,"range-key":"title"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.pickerChange(t)}}},[i("v-uni-view",{staticClass:"flex-y-center"},[e._v(e._s(-1!=e.cityIndex?e.cityList[e.cityIndex].title:"请选择")),i("i",{staticClass:"iconfont icon-right ml-sm",staticStyle:{"font-size":"28rpx"}})])],1)],1)],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("所在地址")]),i("v-uni-view",{staticClass:"item-input text flex-1"},[i("v-uni-view",{staticClass:"flex-y-center text-right",on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.toChooseLocation.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"flex-1 text-right"},[e._v(e._s(e.form.address||"点击右边图标设置"))]),i("i",{staticClass:"iconfont iconjuli ml-sm",style:{color:e.primaryColor}})],1)],1)],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("身份证号")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{type:"text",placeholder:e.rule[6].errorMsg},model:{value:e.form.id_code,callback:function(t){e.$set(e.form,"id_code",t)},expression:"form.id_code"}})],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("身份证照片")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{disabled:!0,type:"text"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg pb-md"},[i("upload",{attrs:{imagelist:e.form.id_card,imgtype:"id_card",imgclass:"md",text:"身份证人像面",imgsize:1},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}}),i("upload",{attrs:{imagelist:e.form.id_card_fan,imgtype:"id_card_fan",imgclass:"md",text:"身份证国徽面",imgsize:1},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg pb-md"},[i("upload",{attrs:{imagelist:e.form.id_card_people,imgtype:"id_card_people",imgclass:"md",text:"手持身份证照片",imgsize:1},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("资格证书")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{disabled:!0,type:"text"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg pb-md"},[i("upload",{attrs:{imagelist:e.form.license,imgtype:"license",text:"上传图片",imgsize:15},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)},del:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("工作形象照")]),i("v-uni-view",{staticClass:"item-input flex-1"},[e._v("图片建议尺寸: 216 * 216")])],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg pb-md"},[i("upload",{attrs:{imagelist:e.form.work_img,imgtype:"work_img",text:"上传图片",imgsize:1},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("个人生活照")]),i("v-uni-view",{staticClass:"item-input flex-1"},[e._v("图片建议尺寸: 750 * n")])],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg pb-md"},[i("upload",{attrs:{imagelist:e.form.self_img,filetype:"picture",imgtype:"self_img",text:"上传图片",imgsize:9},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)},del:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("个人视频介绍")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{disabled:!0,type:"text"}})],1),i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg pb-md"},[i("upload",{attrs:{imagelist:e.form.video,filetype:"video",imgtype:"video",text:"上传视频",imgsize:1},on:{upload:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)},del:function(t){arguments[0]=t=e.$handleEvent(t),e.imgUpload.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"fill-base mt-md radius-16"},[i("v-uni-view",{staticClass:"flex-between pl-lg pr-lg"},[i("v-uni-view",{staticClass:"item-text"},[e._v("技师简介")]),i("v-uni-input",{staticClass:"item-input flex-1",attrs:{disabled:!0,type:"text"}})],1),i("v-uni-textarea",{staticClass:"item-textarea pd-lg",staticStyle:{height:"25px"},attrs:{maxlength:"300",placeholder:"输入技师简介"},model:{value:e.form.text,callback:function(t){e.$set(e.form,"text",t)},expression:"form.text"}}),i("v-uni-view",{staticClass:"text-right pb-lg pr-lg"},[e._v(e._s(e.form.text.length>300?300:e.form.text.length)+"/300")])],1),i("br"),i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"100%",height:"350px"},attrs:{src:"http://qiqi.jiudiananmo.com/image/666/23/06/sPV4Gz9Tcyic5H3YTIgjaMlS1sABcwyb.png"}})],1),i("v-uni-view",{staticClass:"flex-center f-caption c-caption pd-lg"},[e._v(e._s(1==e.options.is_edit?"编辑资料将进入重新审核，审核通过之前将显示原资料":"平台不会通过任何渠道泄露您的个人信息，请放心输入"))])],1),i("v-uni-view",{staticClass:"space-max-footer"}),i("fix-bottom-button",{attrs:{text:[{text:"确定申请",type:"confirm",isAuth:!0}],bgColor:"#fff"},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.check.apply(void 0,arguments)}}})]],2):e._e()},a=[]},b019:function(e,t,i){"use strict";i.r(t);var n=i("3a87"),a=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},be04:function(e,t,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.DetectAuth=function(e){if(!e.ruleId)throw new Error("RuleId必须传");return a.default.DetectAuth(e)},t.IdCardOCRVerification=function(e){if((!e.idCard||!e.name)&&!e.imageBase64&&!e.imageUrl)throw new Error("姓名和身份证号、imageBase64、imageUrl三者必须传一个");return a.default.idCardOCRVerification(e)},t.PhoneVerification=function(e){if(!e.phone||!e.idCard||!e.name)throw new Error("姓名、身份证号和手机号必须都传");return a.default.phoneVerification(e)},t.checkIdCardInformation=function(e){if(!e.imageBase64&&!e.imageUrl)throw new Error("imageBase64和imageUrl必须传一个");return a.default.checkIdCardInformation(e)},i("d9e2"),i("d401");var a=n(i("305c"))},dfcf:function(e,t,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.blob2Base64=function(e){return c.apply(this,arguments)},t.filePath2Base64=function(e){return o.apply(this,arguments)},t.toUpperCase=function(e){if("object"===(0,s.default)(e)){var t=Object.keys(e).reduce((function(t,i){var n=i.substring(0,1).toUpperCase()+i.substring(1);return t[n]=e[i],t}),{});return t}throw new Error("参数需要为object类型")},i("13d5"),i("d3b7"),i("b64b"),i("d9e2"),i("d401");var a=n(i("c7eb")),r=n(i("1da1")),s=n(i("53ca"));function o(){return o=(0,r.default)((0,a.default)().mark((function e(t){return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,i){try{plus.io.resolveLocalFileSystemURL(t,(function(t){t.file((function(t){var i=new plus.io.FileReader;i.readAsDataURL(t,"utf-8"),i.onloadend=function(t){e(t.target.result)}}))}),(function(e){i(e.message)}))}catch(n){i(n)}})));case 1:case"end":return e.stop()}}),e)}))),o.apply(this,arguments)}function c(){return c=(0,r.default)((0,a.default)().mark((function e(t){return(0,a.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,i){try{var n=new FileReader;n.onloadend=(0,r.default)((0,a.default)().mark((function t(){return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e(n.result);case 1:case"end":return t.stop()}}),t)}))),n.readAsDataURL(t)}catch(s){i(s)}})));case 1:case"end":return e.stop()}}),e)}))),c.apply(this,arguments)}},e162:function(e,t,i){var n=i("34c8");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("33e4b732",n,!0,{sourceMap:!1,shadowMode:!1})},f4c8:function(e,t,i){"use strict";i.r(t);var n=i("82f81"),a=i("b019");for(var r in a)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(r);i("2111");var s=i("f0c5"),o=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"c25af07e",null,!1,n["a"],void 0);t["default"]=o.exports}}]);