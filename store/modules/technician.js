import $api from "@/api/index.js"
export default {
	state: {
		pageActive: false,
		activeIndex: 0,
		haveOperItem: false,
		tabList: [{
			title: '全部',
			id: 0,
		}, {
			title: '优选',
			id: 1,
		}, {
			title: '金牌推荐',
			id: 2
		}, {
			title: '可预约',
			id: 3
		}],
		cityId: 0,
		cityIndex: -1,
		cityList: [],
		param: {
			page: 1,
			ser_id: 0,
			coach_name: ''
		},
		list: {
			data: [],
			last_page: 1,
			current_page: 1
		}
	},
	mutations: {
		async updateTechnicianItem(state, item) {
			let {
				key,
				val
			} = item
			state[key] = val
		}
	},
	actions: {
		async getCityList({
			commit,
			state
		}, param) {
			let {
				refresh
			} = param
			let params = JSON.parse(JSON.stringify(param))
			delete params.refresh
			let d = await $api.base.getCity(params);
			let {
				cityId = 0
			} = state
			let ind = d.findIndex(v => {
				return cityId ? v.id == cityId : refresh || !cityId ? v.is_select : v.id == cityId
			})
			commit('updateTechnicianItem', {
				key: 'cityList',
				val: d
			})
			let cityIndex = ind === -1 ? 0 : ind
			commit('updateTechnicianItem', {
				key: 'cityIndex',
				val: cityIndex
			})
			commit('updateTechnicianItem', {
				key: 'cityId',
				val: d && d.length > 0 ? d[cityIndex].id : 0
			})
		},
		async getServiceCoachList({
			commit,
			state
		}, param) {
			let d = await $api.service.serviceCoachList(param)
			let oldList = state.list;
			let newList = d;
			let list = {}
			if (param.page == 1) {
				list = newList;
			} else {
				newList.data = oldList.data.concat(newList.data)
				list = newList;
			}
			commit('updateTechnicianItem', {
				key: 'list',
				val: list
			})
		}
	},
}
