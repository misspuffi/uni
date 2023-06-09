import Vue from 'vue'
import App from './App'

import api from "api/index.js"
import util from "@/utils/index.js"
// #ifdef H5
import jweixin from "@/utils/jweixin.js"
// #endif
import store from "@/store/index.js"
import banner from '@/components/banner.vue'
import column from '@/components/column.vue'
import fixed from '@/components/fixed.vue'
import search from '@/components/search.vue'
import auth from '@/components/auth.vue'
import tab from '@/components/tab.vue'
import abnor from '@/components/abnor.vue'
import loadMore from '@/components/load-more.vue'
import upload from '@/components/upload.vue'
import minCountdown from '@/components/min-countdown.vue'
import uniNavBar from '@/components/uni-nav-bar.vue'
import uniPopup from '@/components/uni-popup.vue'
import commonPopup from "@/components/common-popup.vue"
import commonList from "@/components/common-list.vue"
import loginInfo from "@/components/login-info.vue"
import fixBottomButton from "@/components/fix-bottom-button.vue"
import uniSegmentedControl from "@/components/uni-segmented-control.vue"
Vue.component('banner', banner)
Vue.component('column', column)
Vue.component('fixed', fixed)
Vue.component('search', search)
Vue.component('auth', auth)
Vue.component('tab', tab)
Vue.component('abnor', abnor)
Vue.component('loadMore', loadMore)
Vue.component('upload', upload)
Vue.component('minCountdown', minCountdown)
Vue.component('uniNavBar', uniNavBar)
Vue.component('uniPopup', uniPopup)
Vue.component('commonPopup', commonPopup)
Vue.component('commonList', commonList)
Vue.component('loginInfo', loginInfo)
Vue.component('fixBottomButton', fixBottomButton)
Vue.component('uniSegmentedControl', uniSegmentedControl)

Vue.prototype.$api = api
Vue.prototype.$util = util
// #ifdef H5
Vue.prototype.$jweixin = jweixin
// #endif
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
