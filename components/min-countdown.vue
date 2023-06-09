<template>
	<view class="min-countdown" :class="countdownClass">
		<rich-text :nodes="time" v-if="type == 1"></rich-text>
		<view class="flex-y-center" :style="{color:primaryColor}" v-if="type == 2">
			<view class="count-tag flex-center">{{time.d}}</view>天<view class="count-tag flex-center">{{time.h}}</view>时
			<view class="count-tag flex-center">{{time.m}}</view>分<view class="count-tag flex-center">{{time.s}}</view>秒
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex';
	export default {
		name: 'min-countdown',
		props: {
			type: {
				type: Number,
				default: 1
			},
			targetTime: {
				type: Number,
				default: 0
			},
			format: {
				type: String,
				default: '{%d}天{%h}小时{%m}分{%s}秒'
			},
			countdownClass: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: ''
			},
			isPlay: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				time: '00:00:00',
				audioBg: {},
				playBg: false,
			}
		},
		async mounted() {
			this.getTime()
			if (this.isPlay && !this.configInfo.id) {
				await this.getConfigInfo()
			}
		},
		computed: mapState({
			primaryColor: state => state.config.configInfo.primaryColor,
			subColor: state => state.config.configInfo.subColor,
			configInfo: state => state.config.configInfo,
			isHaveAudio: state => state.user.isHaveAudio,
		}),
		methods: {
			...mapActions(['getConfigInfo', 'toPlayAudio']),
			...mapMutations(['updateUserItem']),
			initIndex() {
				setTimeout(() => {
					this.getTime()
				}, 1000)
			},
			getTime() {
				let time = {}
				let format = this.format

				function formatNumber(num) {
					return num > 9 ? `${num}` : `0${num}`
				}
				const gapTime = Math.ceil((this.targetTime - new Date().getTime()) / 1000)
				if (gapTime >= 0) {
					time.d = formatNumber(parseInt(gapTime / 86400))
					let lastTime = gapTime % 86400;
					time.h = formatNumber(parseInt(lastTime / 3600))
					lastTime = lastTime % 3600;
					time.m = formatNumber(parseInt(lastTime / 60))
					time.s = formatNumber(lastTime % 60);
					['d', 'h', 'm', 's'].forEach(item => {
						const day = time[item].split('');
						format = format.replace('{%' + item + '}', time[item])
						format = format.replace('{%' + item + '0}', day[0])
						format = format.replace('{%' + item + '1}', day[1])
						format = format.replace('{%' + item + '2}', day[2] ? day[2] : '0')
					})
					this.time = this.type == 1 ? format : time
					this.initIndex()
					if (this.isPlay && gapTime == 60 * 5) {
						this.toPlayAudio()
					}
				} else {
					this.$emit('callback')
				}
			},
			async toInitPlay() {
				if (!this.configInfo.id) {
					await this.getConfigInfo()
				}
				console.log("======toInitPlay")

				let {
					countdown_voice
				} = this.configInfo
				this.audioBg = uni.createInnerAudioContext();
				this.audioBg.src = countdown_voice
				this.audioBg.obeyMuteSwitch = false
				this.updateUserItem({
					key: 'isHaveAudio',
					val: true
				})
				console.log(this.audioBg, "=======this.audioBg")

				this.audioBg.onPlay(() => {
					console.log('onPlay')
					this.playBg = true
				})
				this.audioBg.onStop(() => {
					console.log('onStop')
					this.playBg = false
				})
				this.audioBg.onError(() => {
					console.log('onError')
					this.playBg = false
					this.audioBg.destroy()
				})
				this.audioBg.onEnded(() => {
					console.log('onEnded')
					this.playBg = false
				})
			},
			toPlay() {
				console.log("=====toPlay", this.playBg, this.audioBg)
				if (this.playBg) {
					this.audioBg.stop()
				}
				this.audioBg.play()
			}
		}
	}
</script>

<style scoped>
	.min-countdown {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.count-tag {
		width: 56rpx;
		height: 56rpx;
		margin: 0 10rpx;
		background: linear-gradient(0deg, #F7D9AD 0%, #FBEACB 100%);
		border-radius: 8rpx;
	}
</style>
