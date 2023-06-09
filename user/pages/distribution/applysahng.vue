<template>
	<view class="apply-pages" v-if="isLoad">
		<view class="apply-form">
			<view class="fill-base mt-md radius-16">
				<view class="flex-between pl-lg pr-lg b-1px-b">
					<view class="item-text">您的姓名</view>
					<input v-model="form.user_name" type="text" class="item-input flex-1" maxlength="20"
						:placeholder="rule[0].errorMsg" />
				</view>
				<view class="flex-between pl-lg pr-lg b-1px-b">
					<view class="item-text">手机号码</view>
					<input v-model="form.mobile" type="text" class="item-input flex-1"
						:placeholder="rule[1].errorMsg" />
				</view>
			</view>
			
			<view class="fill-base mt-md radius-16">
				<view class="flex-between pl-lg pr-lg">
					<view class="item-text">营业执照</view>
					<input :disabled="true" type="text" class="item-input flex-1" />
				</view>
				<view class="flex-between pl-lg pr-lg pb-md">
					<upload @upload="imgUpload" @del="imgUpload" :imagelist="form.license" imgtype="license"
						text="上传图片" :imgsize="15">
					</upload>
				</view>
			</view>
		
			<view class="fill-base mt-md radius-16">
				<view class="flex-between pl-lg pr-lg">
					<view class="item-text">身份证照片</view>
					<input :disabled="true" type="text" class="item-input flex-1" />
				</view>
				<view class="flex-between pl-lg pr-lg pb-md">
					<upload @upload="imgUpload" :imagelist="form.id_card" imgtype="id_card" imgclass="md"
						text="身份证人像面" :imgsize="1"></upload>
					<upload @upload="imgUpload" :imagelist="form.id_card_fan" imgtype="id_card_fan" imgclass="md"
						text="身份证国徽面" :imgsize="1"></upload>
				</view>
				<view class="flex-between pl-lg pr-lg pb-md">
					<upload @upload="imgUpload" :imagelist="form.id_card_people" imgtype="id_card_people"
						imgclass="md" text="手持身份证照片" :imgsize="1"></upload>
				</view>
			</view>
			
			
			<view class="fill-base mt-md radius-16">
				<view class="flex-between pl-lg pr-lg">
					<view class="item-text">备注信息</view>
					<input :disabled="true" type="text" class="item-input flex-1" />
				</view>
				<textarea v-model="form.text" class="item-textarea pd-lg" maxlength="300" placeholder="输入备注信息" />
				<view class="text-right pb-lg pr-lg">
					{{form.text.length>300?300:form.text.length}}/300
				</view>
			</view>
		</view>
        <view >加盟条件</view>
        <view >1.有行业经验者优先</view>
        <view >2.需要有相关行业的营业执照</view>
        <view >3.提交申请后3个工作日内客服会与您联系</view>
        <view >4.请准确填写你的联系方式</view>
        <view class="space-max-footer"></view>
		<view class="space-max-footer"></view>

		<fix-bottom-button @confirm="submit" :text="[{text:'确定申请',type:'confirm',isAuth:true}]" bgColor="#fff">
		</fix-bottom-button>

	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex"
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				cityIndex: 0,
				cityList: [],
				isLoad: false,
				options: {},
				
				form: {
					id: 0,
					user_name: '', //姓名 
					mobile: '', //手机号  
					text: '', //备注 
					id_card: [], //身份证
					id_card_fan: [], // 身份证反面
					id_card_people: [], //手持身份证
					license: [], //资格证书
				},
				rule: [{
						name: "user_name",
						checkType: "isNotNull",
						errorMsg: "请输入您的真实姓名",
						regType: 2
					},
					{
						name: "mobile",
						checkType: "isMobile",
						errorMsg: "请输入常用手机号码"
					},
					{
						name: "id_card",
						checkType: "isNotNull",
						errorMsg: "请上传身份证人像面"
					},
					{
						name: "id_card_fan",
						checkType: "isNotNull",
						errorMsg: "请上传身份证国徽面"
					},
					{
						name: "license",
						checkType: "isNotNull",
						errorMsg: "请上传营业执照"
					}
				],
				lockTap: false
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			userInfo: state => state.user.userInfo,
			location: state => state.user.location,

		}),
		async onLoad(options) {
			this.$util.showLoading()
			this.options = options
			await this.initIndex()
			this.isLoad = true
		},
		methods: {
			...mapActions(['getConfigInfo', 'getUserInfo']),
			...mapMutations(['updateUserItem']),
			async initIndex(refresh = false) {
				// #ifdef H5
				if (!refresh && this.$jweixin.isWechat()) {
					await this.$jweixin.initJssdk();
					this.$jweixin.wxReady(() => {
						this.$jweixin.hideOptionMenu()
					})
				}
				// #endif
				if (!this.configInfo.id || refresh) {
					await this.getConfigInfo()
				}
				let data = await this.$api.mine.resellerInfo()
				this.$util.setNavigationBarColor({
					bg: this.primaryColor
				})
				if (!data.id) {
					this.$util.hideAll()
					return
				}
				
				
				data.id_card = data.id_card.map(item => {
					return {
						path: item
					}
				})
				data.id_card_fan = [data.id_card[1]]
				data.id_card_people = [data.id_card[2]]
				data.id_card.splice(1, 3)
				data.license = data.license.map(item => {
					return {
						path: item
					}
				})
				
				
				
				
				for (let key in this.form) {
					this.form[key] = data[key]
				}
				this.$util.hideAll()
			},
			initRefresh() {
				this.initIndex(true)
			},
			
			imgUpload(e) {
				let {
					imagelist,
					imgtype
				} = e;
				this.form[imgtype] = imagelist;
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
				let arr = ['id_card', 'id_card_fan', 'id_card_people']
				let param = this.$util.deepCopy(this.form)
				let msg = this.validate(param);
				
				arr.map(item => {
					param[item] = param[item].length > 0 ? param[item][0].path : ''
				})
				param.license = param.license.map(item => {
					return item.path
				})
				
				param.id_card = [param.id_card, param.id_card_fan, param.id_card_people]
				delete param.id_card_fan
				delete param.id_card_people
				
				if (msg) {
					this.$util.showToast({
						title: msg
					});
					return;
				}
				if (this.lockTap) return
				this.lockTap = true
				this.$util.showLoading()
				param.text = param.text.length > 300 ? param.text.substring(0, 300) : param.text
				param.goods = 1
				try {
					await this.$api.mine.applyDl(param)
					this.$util.hideAll()
					this.$util.showToast({
						title: `提交成功`
					});
					setTimeout(() => {
						if (getCurrentPages().length > 1) {
							this.$util.back()
						}
						this.$util.goUrl({
							url: '/user/pages/apply-result?type=2',
							openType: `redirectTo`
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
</style>
