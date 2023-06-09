
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/service","pages/technician","pages/dynamic","pages/order","pages/mine","pages/login","user/pages/detail","user/pages/article","user/pages/protocol","user/pages/information","user/pages/collect","user/pages/technician-info","user/pages/shanghu-order","user/pages/shanghu-info","user/pages/comment","user/pages/cart","user/pages/order","user/pages/choose-time","user/pages/choose-technician","user/pages/address/list","user/pages/address/edit","user/pages/order/sign","user/pages/order/detail","user/pages/order/refund","user/pages/order/evaluate","user/pages/refund/list","user/pages/refund/detail","user/pages/channel/apply","user/pages/channel/income","user/pages/channel/poster","user/pages/common/web","user/pages/common/video","user/pages/coupon/list","user/pages/coupon/use","user/pages/coupon/share","user/pages/coupon/poster","user/pages/stored/list","user/pages/stored/commission","user/pages/stored/record","user/pages/stored/consume","user/pages/stored/poster","user/pages/distribution/apply","user/pages/distribution/income","user/pages/distribution/record","user/pages/distribution/team","user/pages/distribution/poster","user/pages/distribution/applysahng","user/pages/distribution/bind-technician","user/pages/distribution/team-technician","user/pages/cash-out","user/pages/alipay-result","user/pages/apply-result","user/pages/phone-code","user/pages/phone","user/pages/setting","user/pages/shield","user/pages/logout","user/pages/feedback/box","user/pages/feedback/list","user/pages/feedback/detail","user/pages/feedback/success","user/pages/bell/list","user/pages/bell/order","user/pages/gzh","technician/pages/apply","technician/pages/time-manage","technician/pages/income/index","technician/pages/income/record","technician/pages/income/car-fee-record","technician/pages/income/integral","technician/pages/order/label","technician/pages/order/list","technician/pages/order/detail","technician/pages/car-fare","technician/pages/shop/detail","technician/pages/shop/list","technician/pages/bad-comments/box","technician/pages/bad-comments/list","technician/pages/bad-comments/choice","technician/pages/bad-comments/success","technician/pages/black/box","technician/pages/black/list","technician/pages/black/choice","technician/pages/black/success","technician/pages/level","dynamic/pages/technician/edit","dynamic/pages/technician/comment","dynamic/pages/technician/detail","dynamic/pages/technician/follow","dynamic/pages/technician/list","dynamic/pages/technician/thumbs","dynamic/pages/detail","dynamic/pages/follow","dynamic/pages/search"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8","onReachBottomDistance":140},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"九点按摩app","compilerVersion":"3.8.4","entryPagePath":"pages/service","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/service","meta":{"isQuit":true},"window":{"navigationBarTitleText":"首页","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/technician","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/dynamic","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/order","meta":{},"window":{"navigationBarTitleText":"订单","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/mine","meta":{},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/login","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#ffffff"}},{"path":"/user/pages/detail","meta":{},"window":{"navigationBarTitleText":"服务详情"}},{"path":"/user/pages/article","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/user/pages/protocol","meta":{},"window":{"navigationBarTitleText":"用户隐私协议"}},{"path":"/user/pages/information","meta":{},"window":{"navigationBarTitleText":"个人信息保护指引"}},{"path":"/user/pages/collect","meta":{},"window":{"navigationBarTitleText":"收藏技师","enablePullDownRefresh":true}},{"path":"/user/pages/technician-info","meta":{},"window":{"navigationBarTitleText":"技师详情"}},{"path":"/user/pages/shanghu-order","meta":{},"window":{"navigationBarTitleText":"订单"}},{"path":"/user/pages/shanghu-info","meta":{},"window":{"navigationBarTitleText":"商户信息"}},{"path":"/user/pages/comment","meta":{},"window":{"navigationBarTitleText":"评论","enablePullDownRefresh":true}},{"path":"/user/pages/cart","meta":{},"window":{"navigationBarTitleText":"购物车"}},{"path":"/user/pages/order","meta":{},"window":{"navigationBarTitleText":"下单"}},{"path":"/user/pages/choose-time","meta":{},"window":{"navigationBarTitleText":"选择时间"}},{"path":"/user/pages/choose-technician","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/user/pages/address/list","meta":{},"window":{"navigationBarTitleText":"地址列表","enablePullDownRefresh":true}},{"path":"/user/pages/address/edit","meta":{},"window":{"navigationBarTitleText":"添加新地址"}},{"path":"/user/pages/order/sign","meta":{},"window":{"navigationBarTitleText":"签名确认"}},{"path":"/user/pages/order/detail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/user/pages/order/refund","meta":{},"window":{"navigationBarTitleText":"申请退款"}},{"path":"/user/pages/order/evaluate","meta":{},"window":{"navigationBarTitleText":"评价"}},{"path":"/user/pages/refund/list","meta":{},"window":{"navigationBarTitleText":"售后/退款","enablePullDownRefresh":true}},{"path":"/user/pages/refund/detail","meta":{},"window":{"navigationBarTitleText":"售后详情"}},{"path":"/user/pages/channel/apply","meta":{},"window":{"navigationBarTitleText":"申请渠道商"}},{"path":"/user/pages/channel/income","meta":{},"window":{"navigationBarTitleText":"我是渠道商","enablePullDownRefresh":true}},{"path":"/user/pages/channel/poster","meta":{},"window":{"navigationBarTitleText":"渠道码"}},{"path":"/user/pages/common/web","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/user/pages/common/video","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/user/pages/coupon/list","meta":{},"window":{"navigationBarTitleText":"我的卡券","enablePullDownRefresh":true}},{"path":"/user/pages/coupon/use","meta":{},"window":{"navigationBarTitleText":"选择卡券","enablePullDownRefresh":true}},{"path":"/user/pages/coupon/share","meta":{},"window":{"navigationBarTitleText":"分享有奖","enablePullDownRefresh":true}},{"path":"/user/pages/coupon/poster","meta":{},"window":{"navigationBarTitleText":"我的邀请码"}},{"path":"/user/pages/stored/list","meta":{},"window":{"navigationBarTitleText":"余额充值","enablePullDownRefresh":true}},{"path":"/user/pages/stored/commission","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/user/pages/stored/record","meta":{},"window":{"navigationBarTitleText":"充值记录","enablePullDownRefresh":true}},{"path":"/user/pages/stored/consume","meta":{},"window":{"navigationBarTitleText":"消费明细","enablePullDownRefresh":true}},{"path":"/user/pages/stored/poster","meta":{},"window":{"navigationBarTitleText":"邀请好友"}},{"path":"/user/pages/distribution/apply","meta":{},"window":{"navigationBarTitleText":"商户申请"}},{"path":"/user/pages/distribution/income","meta":{},"window":{"navigationBarTitleText":"我的收入","enablePullDownRefresh":true}},{"path":"/user/pages/distribution/record","meta":{},"window":{"navigationBarTitleText":"提现记录","enablePullDownRefresh":true}},{"path":"/user/pages/distribution/team","meta":{},"window":{"navigationBarTitleText":"我的粉丝","enablePullDownRefresh":true}},{"path":"/user/pages/distribution/poster","meta":{},"window":{"navigationBarTitleText":"推广海报"}},{"path":"/user/pages/distribution/applysahng","meta":{},"window":{"navigationBarTitleText":"商户申请"}},{"path":"/user/pages/distribution/bind-technician","meta":{},"window":{"navigationBarTitleText":"邀请绑定技师"}},{"path":"/user/pages/distribution/team-technician","meta":{},"window":{"navigationBarTitleText":"技师列表"}},{"path":"/user/pages/cash-out","meta":{},"window":{"navigationBarTitleText":"提现"}},{"path":"/user/pages/alipay-result","meta":{},"window":{"navigationBarTitleText":"支付宝支付","enablePullDownRefresh":true}},{"path":"/user/pages/apply-result","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true}},{"path":"/user/pages/phone-code","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/user/pages/phone","meta":{},"window":{"navigationBarTitleText":"绑定手机号"}},{"path":"/user/pages/setting","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/user/pages/shield","meta":{},"window":{"navigationBarTitleText":"屏蔽列表","enablePullDownRefresh":true}},{"path":"/user/pages/logout","meta":{},"window":{"navigationBarTitleText":"注销账户"}},{"path":"/user/pages/feedback/box","meta":{},"window":{"navigationBarTitleText":"问题反馈"}},{"path":"/user/pages/feedback/list","meta":{},"window":{"navigationBarTitleText":"反馈记录","enablePullDownRefresh":true}},{"path":"/user/pages/feedback/detail","meta":{},"window":{"navigationBarTitleText":"反馈详情"}},{"path":"/user/pages/feedback/success","meta":{},"window":{"navigationBarTitleText":"提交结果"}},{"path":"/user/pages/bell/list","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/user/pages/bell/order","meta":{},"window":{"navigationBarTitleText":"下单"}},{"path":"/user/pages/gzh","meta":{},"window":{"navigationBarTitleText":"关注公众号"}},{"path":"/technician/pages/apply","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/technician/pages/time-manage","meta":{},"window":{"navigationBarTitleText":"上班时间"}},{"path":"/technician/pages/income/index","meta":{},"window":{"navigationBarTitleText":"服务费提现","enablePullDownRefresh":true}},{"path":"/technician/pages/income/record","meta":{},"window":{"navigationBarTitleText":"提现记录","enablePullDownRefresh":true}},{"path":"/technician/pages/income/car-fee-record","meta":{},"window":{"navigationBarTitleText":"车费提现记录","enablePullDownRefresh":true}},{"path":"/technician/pages/income/integral","meta":{},"window":{"navigationBarTitleText":"积分明细","enablePullDownRefresh":true}},{"path":"/technician/pages/order/label","meta":{},"window":{"navigationBarTitleText":"评价客户"}},{"path":"/technician/pages/order/list","meta":{},"window":{"navigationBarTitleText":"订单管理","enablePullDownRefresh":true}},{"path":"/technician/pages/order/detail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/technician/pages/car-fare","meta":{},"window":{"navigationBarTitleText":"车费明细"}},{"path":"/technician/pages/shop/detail","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/technician/pages/shop/list","meta":{},"window":{"navigationBarTitleText":"物料商城","enablePullDownRefresh":true}},{"path":"/technician/pages/bad-comments/box","meta":{},"window":{"navigationBarTitleText":"差评申诉"}},{"path":"/technician/pages/bad-comments/list","meta":{},"window":{"navigationBarTitleText":"申诉记录","enablePullDownRefresh":true}},{"path":"/technician/pages/bad-comments/choice","meta":{},"window":{"navigationBarTitleText":"选择订单","enablePullDownRefresh":true}},{"path":"/technician/pages/bad-comments/success","meta":{},"window":{"navigationBarTitleText":"提交结果"}},{"path":"/technician/pages/black/box","meta":{},"window":{"navigationBarTitleText":"来黑用户"}},{"path":"/technician/pages/black/list","meta":{},"window":{"navigationBarTitleText":"黑名单记录","enablePullDownRefresh":true}},{"path":"/technician/pages/black/choice","meta":{},"window":{"navigationBarTitleText":"选择订单","enablePullDownRefresh":true}},{"path":"/technician/pages/black/success","meta":{},"window":{"navigationBarTitleText":"提交结果"}},{"path":"/technician/pages/level","meta":{},"window":{"navigationBarTitleText":"等级管理"}},{"path":"/dynamic/pages/technician/edit","meta":{},"window":{"navigationBarTitleText":"发布动态"}},{"path":"/dynamic/pages/technician/comment","meta":{},"window":{"navigationBarTitleText":"收获的评论","enablePullDownRefresh":true}},{"path":"/dynamic/pages/technician/detail","meta":{},"window":{"navigationBarTitleText":"动态详情"}},{"path":"/dynamic/pages/technician/follow","meta":{},"window":{"navigationBarTitleText":"新增关注","enablePullDownRefresh":true}},{"path":"/dynamic/pages/technician/list","meta":{},"window":{"navigationBarTitleText":"动态发布","enablePullDownRefresh":true}},{"path":"/dynamic/pages/technician/thumbs","meta":{},"window":{"navigationBarTitleText":"收获的赞","enablePullDownRefresh":true}},{"path":"/dynamic/pages/detail","meta":{},"window":{"navigationBarTitleText":"动态详情","enablePullDownRefresh":true}},{"path":"/dynamic/pages/follow","meta":{},"window":{"navigationBarTitleText":"我的关注","enablePullDownRefresh":true}},{"path":"/dynamic/pages/search","meta":{},"window":{"navigationBarTitleText":"查找技师","enablePullDownRefresh":true}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
