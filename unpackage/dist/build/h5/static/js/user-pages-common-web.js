(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-pages-common-web"],{"40da":function(n,t,r){"use strict";r.d(t,"b",(function(){return e})),r.d(t,"c",(function(){return u})),r.d(t,"a",(function(){}));var e=function(){var n=this.$createElement,t=this._self._c||n;return t("v-uni-view",[t("v-uni-web-view",{attrs:{src:this.url}})],1)},u=[]},9339:function(n,t,r){"use strict";r.r(t);var e=r("40da"),u=r("d1a7");for(var a in u)["default"].indexOf(a)<0&&function(n){r.d(t,n,(function(){return u[n]}))}(a);var o=r("f0c5"),i=Object(o["a"])(u["default"],e["b"],e["c"],!1,null,"c6d05044",null,!1,e["a"],void 0);t["default"]=i.exports},"9a50":function(n,t,r){"use strict";r("7a82");var e=r("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=e(r("c7eb")),a=e(r("1da1")),o=r("26cb"),i={data:function(){return{url:""}},computed:(0,o.mapState)({primaryColor:function(n){return n.config.configInfo.primaryColor},subColor:function(n){return n.config.configInfo.subColor}}),onLoad:function(n){var t=this;return(0,a.default)((0,u.default)().mark((function r(){var e;return(0,u.default)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:t.$util.setNavigationBarColor({bg:t.primaryColor}),e=n.url,t.url=decodeURIComponent(e);case 3:case"end":return r.stop()}}),r)})))()}};t.default=i},d1a7:function(n,t,r){"use strict";r.r(t);var e=r("9a50"),u=r.n(e);for(var a in e)["default"].indexOf(a)<0&&function(n){r.d(t,n,(function(){return e[n]}))}(a);t["default"]=u.a}}]);