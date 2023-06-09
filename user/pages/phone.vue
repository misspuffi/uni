<template>
	<view class="mine-pages-phone flex-center flex-column">
		<view class="title c-black">请输入手机号</view>
		<view class="confirm-btn radius-16">
			<input v-model="subForm.phone" type="number" class="item-input flex-y-center pl-lg pr-lg f-sm-title c-title"
				placeholder-class="c-placeholder" :placeholder="rule[0].errorMsg" />
		</view>

		<view @tap="submit" class="confirm-btn flex-center f-sm-title text-bold c-base radius-16"
			:style="{background:subForm.phone.length > 0 ? primaryColor:'#CCE9DD'}">下一步
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				isLoad: false,
				options: {},
				subForm: {
					phone: ''
				},
				rule: [{
					name: "phone",
					checkType: "isMobile",
					errorMsg: "请输入手机号",
					regText: "手机号"
				}],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
		}),
		async onLoad(options) {
			this.$util.setNavigationBarColor({
				bg: this.primaryColor
			})
		},
		methods: {
			...mapActions(['getUserInfo']),
			...mapMutations(['updateUserItem']),
			async initIndex() {

			},
			//表单验证
			validate(param) {
				let validate = new this.$util.Validate();
				this.rule.map(item => {
					let {
						name,
					} = item
					validate.add(param[name], item);
				})
				let message = validate.start();
				return message;
			},
			async submit() {
				let param = this.$util.deepCopy(this.subForm)
				let msg = this.validate(param);
				if (msg) {
					this.$util.showToast({
						title: msg
					})
					return
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				try {
					await this.$api.user.sendShortMsg(param)
					this.$util.hideAll()
					this.lockTap = false
					setTimeout(() => {
						this.$util.goUrl({
							url: `/user/pages/phone-code?phone=${param.phone}`
						})
					}, 1000)
				} catch (e) {
					setTimeout(() => {
						this.lockTap = false
						this.$util.hideAll()
					}, 2000)
				}

			}
		}
	}
</script>


<style lang="scss">
	page {
		background: #fff;
	}

	.mine-pages-phone {
		.title {
			font-size: 54rpx;
			margin: 80rpx 0;

		}

		.confirm-btn {
			width: 630rpx;
			height: 110rpx;
			background: #F7F7F7;
			margin-top: 40rpx;

			.item-input {
				height: 110rpx;
			}
		}
	}
</style>
