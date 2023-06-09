import $api from "@/api/index.js"
export default {
	state: {
		pageActive: false,
		activeIndex: 0,
		tabList: [{
			title: '全部',
			sort: 'top desc',
		}, {
			title: '价格',
			sort: 'price',
			sign: 0,
			is_sign: 1,
		}, {
			title: '销量',
			sort: 'total_sale',
			sign: 0,
			is_sign: 1,
		}, {
			title: '好评度',
			sort: 'star',
			sign: 0,
			is_sign: 1,
		}],
		param: {
			page: 1,
			sort: ''
		},
		list: {
			data: [],
			last_page: 1,
			current_page: 1
		},
		banner: [],
		recommend_list: [],
		recommend_style: 1
	},
	mutations: {
		async updateServiceItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
		}
	},
	actions: {
		async getServiceIndex({
			commit,
			state
		}, param) {
			let d = await $api.service.index(param);
			let {
				banner = [],
					recommend_list = [],
					recommend_style = 1
			} = d
			commit('updateServiceItem', {
				key: 'banner',
				val: banner
			})
			commit('updateServiceItem', {
				key: 'recommend_list',
				val: recommend_list
			})
			commit('updateServiceItem', {
				key: 'recommend_style',
				val: recommend_style
			})
		},
		async getServiceList({
			commit,
			state
		}, param) {
			let d = await $api.service.serviceList(param)
			let oldList = state.list;
			let newList = d;
			let list = {}
			if (param.page == 1) {
				list = newList;
			} else {
				newList.data = oldList.data.concat(newList.data)
				list = newList;
			}
			commit('updateServiceItem', {
				key: 'list',
				val: list
			})
		}
	},
}
