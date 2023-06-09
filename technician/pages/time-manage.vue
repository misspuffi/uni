<template>
  <view class="technician-time-manage">

    <view class="fill-base pd-lg flex-between">
      <view class="flex-1 flex-y-baseline f-title c-title">是否接单<view class="f-paragraph ml-sm"
                                                                         :style="{color:form.is_work==1?primaryColor:'#999'}">
        {{form.is_work==1?'接单':'休息'}}
      </view>
      </view>
      <view @tap.stop="toChangeItem">
        <i class="iconfont icon-switch c-caption ml-sm" :class="[{'icon-switch-on':form.is_work==1}]"
           :style="{ color: form.is_work==1 ? primaryColor : ''}"></i>
      </view>
    </view>
    <view class="flex-center fill-base f-paragraph c-desc pt-lg pb-lg b-1px-b">
      <view class="countDown">{{ countDown }}</view>
    </view>
    <view class="flex-center fill-base f-paragraph c-desc pt-lg pb-lg b-1px-b">
      <view  class="item-time flex-center flex-column">
        <view>工作照</view>
        <upload @upload="imgUpload" :imagelist="work_img" lazy-load class="logo-img radius"  text="上传图片" :imgsize="1"></upload>
      </view>
      <view  class="item-time flex-center flex-column  b-1px-l">
        <view>刷脸照</view>
        <image  @click="check()" mode="aspectFill" lazy-load class="logo-img radius" :src="face_img"></image>
        <view>点击照片进行核验</view>
      </view>
    </view>
    <view class="container">
      <view class="strip">
        <view class="progress">相似度：{{progress}}%</view>
        <view class="blue" :style="'width:'+progress+'%'"></view>
      </view>
    </view>

    <view class="fill-base mt-md b-1px-b">
      <view class="f-title c-title pd-lg">选择接单时间</view>
    </view>
    <view class="flex-center fill-base f-paragraph c-desc pt-lg pb-lg b-1px-b">
      <view @tap.stop="toShowTime('start_time')" class="item-time flex-center flex-column">
        <view>开始时间</view>
        <view class="mt-sm" :style="{color:form.start_time ? primaryColor : '#999'}">
          {{form.start_time || '选择时间'}}
        </view>
      </view>
      <view @tap.stop="toShowTime('end_time')" class="item-time flex-center flex-column  b-1px-l">
        <view>结束时间</view>
        <view class="mt-sm" :style="{color:form.end_time ? primaryColor : '#999'}">
          {{is_next_day?'次日':''}}{{form.end_time || '选择时间'}}
        </view>
      </view>
    </view>
    <!-- <view class="fill-base pb-lg" style="border-bottom-left-radius: 32rpx;border-bottom-right-radius: 32rpx;">
      <view class="flex pl-md pr-md pt-lg pb-lg">
        <view class="f-min-title">设置不可接单时间</view>
        <view class="f-paragraph c-disable">（只能设置近{{dayList.length}}天的时间）</view>
      </view>
      <tab @change="handerTabChange" :list="dayList" :activeIndex="dayCurrent*1" :activeColor="primaryColor"
        width="150rpx" height="80rpx"></tab>
    </view>
    <view class="date-list flex pt-md" v-if="dayList.length > 0">
      <view class="date-item radius-16 flex-center ml-md mt-md" @tap="getDateTime(index)"
        :style="{ background : form.coach_status != 3 && item.status == 0 && item.is_order==0 && !isTimes(item.time_str) ? primaryColor : '' , color:item.status == 0 && item.is_order==0 && !isTimes(item.time_str) ? '#fff' : ''}"
        :class="isTimes(item.time_str) || item.is_order==1 || form.coach_status == 3 ? 'date-item-prohibit c-disable' : 'fill-base c-5A677E'"
        v-for="(item,index) in dayList[dayCurrent].sub" :key="index">
        <view class="text-center">
          <view class="f-min-title">{{item.time_text}}</view>
          <view class="f-caption">{{isTimes(item.time_str) || item.status == 0 ? '不可预约' : '可预约'}}</view>
        </view>
      </view>
    </view> -->
    <view class="space-max-footer"></view>
    <w-picker :visible.sync="showTime" mode="time" :value="toDayTime" :current="false" :second="false"
              :themeColor="primaryColor" @confirm="onConfirm" ref="time"></w-picker>

    <fix-bottom-button @confirm="submit" :text="[{text:'保存',type:'confirm',isAuth:true}]" bgColor="#fff"
                       v-if="form.coach_status !=3 "></fix-bottom-button>

  </view>
</template>

<script>
import {
  mapState,
  mapMutations
} from "vuex"
import wPicker from "@/components/w-picker/w-picker.vue";
import tab from "@/components/tab.vue"
import sha1 from "../../utils/sha1";
import {randomString} from "../../utils/utils";
const face = uni.requireNativePlugin('DC-WBFaceServiceV2');
export default {
  components: {
    wPicker,
    tab
  },
  data() {
    return {
      countDown:'',
      toDay: '',
      toDayTime: '',
      showKey: '',
      progress: 0,
      showTime: false,
      form: {
        id: 0,
        is_work: 0,
        start_time: '',
        end_time: '',
        coach_status: 0,
        time_unit: ''
      },
      is_next_day: false,
      dayList: [],
      face_img: '',
      face_img_base64: '',
      work_img: [],
      id_code: '',
      signTickets: '',
      coach_name: '',
      dayCurrent: 0,
      status: false,
      appid: 'IDAdoIMa',
      secret: 'eRdoxMnzou4SNlJ7yLVkRKtqAblzbBaWGOSyspntasIKU5BYNelxPCKfPY587cj3',
      userId: randomString(8),
      orderNo: randomString(9),
      nonce: randomString(32),
      version: '1.0.0',
      licence: 'RWdRqRVm3ngdlc0+KR+1yYNEX5h4Op5MGLHxWUqRb5UVUIr0D6RabSkaqFIFHA8s2fiD9xkHy50kMJG+KByXuMpQkYoCgIRyzsFytMBB05S2lG+dOCnc95zk7nBVdwGsWs5ibjNod/TO/xRFyKXyGAjeBTgIFXdFZnhQ1G1T9c9T+bTJGSu5R6DHqRvah+weVQiUfu/GpCZh6EXFbn5JwUEm+PDpF6KN9YZngFjIo2nN1MgQZqWunDSHgqhFV2TM/gfjmgXLn4ZG5pDwTxVQsNjZm3aGFuF9TXbEHQjUP1TQevbzXG2Hg4sS5IJFwpPB0xKrw6tVphGgZsZOhDO0cQ==',
    }
  },
  computed: mapState({
    primaryColor: state => state.config.configInfo.primaryColor,
    subColor: state => state.config.configInfo.subColor,
    userInfo: state => state.user.userInfo,
  }),
  onLoad() {
    this.initIndex()
  },
  methods: {
    ...mapMutations(['updateTechnicianItem']),
    imgUpload(e) {
      let {
        imagelist,
      } = e;
      this.work_img = imagelist;
      const param = {
        work_img: imagelist[0]['path'],
        type: 2,
      };
      console.log(param)
      let result=this.$api.technician.setFaceCheck(param)
      console.log(result)
      this.$util.hideAll()
      this.$util.showToast({
        title: `更新成功`
      });
      this.initIndex()
    },
    /**
     * 1.获取Access Token
     */
    getAccessToken(){
      uni.request({
        method: 'GET',
        url: 'https://miniprogram-kyc.tencentcloudapi.com/api/oauth2/access_token',
        data: {
          app_id: this.appid,
          secret: this.secret,
          grant_type: 'client_credential',
          version: this.version,
        },
        success: (res) => {
          if(!res.code){
            let access_token = res.data.access_token;
            uni.setStorage({
              key: 'access_token',
              value: access_token,
              expires: 7200 * 1000
            })
            this.getSIGNticket(access_token);
          }else{
            uni.removeStorage({
              key: 'signTickets'
            });
            uni.showToast({
              icon: 'none',
              title: res.msg
            });
          }
        },
      });
    },
    /**
     * 2.获取SIGNticket
     * @param access_token
     */
    getSIGNticket(access_token){
      uni.request({
        method: 'GET',
        url: 'https://miniprogram-kyc.tencentcloudapi.com/api/oauth2/api_ticket',
        data: {
          app_id: this.appid,
          access_token: access_token,
          type: 'SIGN',
          version: this.version,
        },
        success: (res) => {
          if(!res.code){
            let signTickets = res.data.tickets[0].value;
            this.signTickets= signTickets;
            uni.setStorage({
              key: 'signTickets',
              value: signTickets,
              expires: 20*60 * 1000
            })
            this.getFaceIdSign(signTickets)
          }else{
            uni.showToast({
              icon: 'none',
              title: res.msg
            });
          }
        },
      });
    },
    /**
     * 3.获取sign
     * @param signTickets
     */
    getFaceIdSign(signTickets) {
      let dataArray = [this.appid, this.nonce, this.userId, signTickets, this.version]
      dataArray.sort()
      let sb = ''
      for (let v of dataArray) {
        sb += `${v}`
      }
      let sign=sha1(sb).toUpperCase()
      this.getFaceId(sign);
    },
    getFaceIdSign1(signTickets) {
      let dataArray = [this.appid, this.nonce, this.orderNo, signTickets, this.version]
      console.log(dataArray)
      dataArray.sort()
      let sb = ''
      for (let v of dataArray) {
        sb += `${v}`
      }
      return sha1(sb).toUpperCase()
    },
    /**
     * 4.获取faceid
     * @param sign
     */
    getFaceId(sign) {
      let srcPhotoSrc = this.face_img_base64;
      let srcPhotoType = "2"; //1是水纹照  2是高清照
      let that=this;
      uni.request({
        method: 'POST',
        url: 'https://miniprogram-kyc.tencentcloudapi.com/api/server/getAdvFaceId?orderNo='+that.orderNo,
        data: {
          webankAppId: that.appid,
          orderNo: that.orderNo,
          userId: that.userId,
          version: that.version,
          sign: sign,
          nonce: that.nonce,
          sourcePhotoStr: srcPhotoSrc,
          sourcePhotoType: srcPhotoType,
        },
        success: (res) => {
          if(res.data.code==0){
            let result = res.data.result;
            let faceId = result.faceId;
            this.startWbFaceVerifyService(sign, faceId);
          }else{
            uni.showToast({
              icon: 'none',
              title: res.data.msg
            });
          }
        }
      })
    },
    /**
     * 5.拉起face SDK
     * @param sign
     * @param faceId
     */
    startWbFaceVerifyService(sign, faceId) {
      let that=this;
      try {
        // 调起 SDK
        face.startAdvanceWbFaceVerifyService({
          apiVersion: "1.0.0",
          appId: this.appid,
          nonce: this.nonce,
          userId: this.userId,
          sign: sign,
          orderNo: this.orderNo,
          licence: this.licence,
          faceId: faceId,
          compareType: "1",
          sdkConfig: {
            //和iOS共有的配置参数
            showSuccessPage: false, //是否展示成功页面,默认不展示
            showFailurePage: false, //是否展示失败页面,默认不展示
            recordVideo: false, //是否录制视频,默认不录制
            checkVideo:false,//是否检查视频大小
            playVoice: false, //是否播放语音提示，默认不播放
            theme: '1', //sdk皮肤设置，0黑色，1白色
            customerTipsLoc:'0',//自定义提示的位置，0在预览框下面，1在预览框上面
            customerTipsInLive:'',//检测时的自定义提示语
            customerTipsInUpload:'',//上传时的自定义提示语
            customerLongTip:'',//自定义长提示语
            //android独有的配置参数
            isEnableLog: true, //是否打开刷脸native日志，请release版本关闭！！！
            //iOS独有的配置参数
            windowLevel: '1', //sdk中拉起人脸活体识别界面中使用UIWindow时的windowLevel配置
            manualCookie: true ,//是否由SDK内部处理sdk网络请求的cookie
            useWindowScene: false,
            useAdvanceCompare: true
          }
        }, result => {
          console.log(result)
          let scene = result.scene;
          uni.hideLoading()
          if (scene == 'wb_face_callback_login_failure') {
            uni.removeStorage({
              key: 'signTickets'
            });
            uni.showModal({
              title: '刷脸失败',
              content: '刷脸失败，请重试?',
              success: (res) => {
                if (res.confirm) {
                  that.check();
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            });
            return;
          }
          //返回刷脸结果
          if (scene == "wb_face_callback_verify_result") {
            let res = result.res;
            let success = res.success;
            if (success) {
              uni.showToast({
                icon: 'none',
                title: "人脸核验成功:活体可能性：" + res.liveRate + "%; 人脸相似度：=" + res.similarity + "%"
              });
              that.orderNo=res.orderNo;
              let sign=that.getFaceIdSign1(that.signTickets)
              let data={
                appId: that.appid,
                sign: sign,
                version: that.version,
                nonce: that.nonce,
                orderNo: that.orderNo,
                getFile: 2,
              }
              uni.request({
                method: 'POST',
                url: 'https://miniprogram-kyc.tencentcloudapi.com/api/v2/base/queryfacerecord?orderNo='+that.orderNo,
                data: data,
                success: (result) => {
                  console.log(result)
                  if(result.data.code==0){
                    this.submit(param)
                    const param = {
                      face_img: result.data.result.photo,
                      similarity: res.similarity,
                      type: 1,
                    };
                    this.$api.technician.setFaceCheck(param)
                    this.$util.hideAll()
                    this.$util.showToast({
                      title: `更新成功`
                    });
                    this.updateTechnicianItem({
                      key: 'haveOperItem',
                      val: true
                    })
                    setTimeout(() => {
                      this.$util.back()
                      this.$util.goUrl({
                        url: 1,
                        openType: `navigateBack`
                      })
                    }, 2000)
                  }else{
                    uni.showToast({
                      icon: 'none',
                      title: result.msg
                    });
                  }
                },
              });

            } else {
              //刷脸失败
              let error = res.error;
              let domain = error.domain;
              if (domain == "WBFaceErrorDomainCompareServer") {
                uni.showModal({
                  title: '对比失败',
                  content: "与工作照对比失败，请重试",
                  success: (res) => {
                    if (res.confirm) {
                      that.check();
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                });
                return;
              }
              uni.showToast({
                icon: 'none',
                title: "刷脸失败，请重试"
              });
            }
          }
        });
      } catch (error) {
        console.log("【uni log】startWbFaceVerifyService error", error);
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    check(){
      uni.showLoading({
        mask: true,
        title: "即将进入人脸核验..."
      });
      setTimeout(() => {
        uni.hideLoading()
        uni.showLoading({
          mask: true,
          title: "等待中..."
        });
        let signTickets = uni.getStorage('signTickets');
        if(signTickets &signTickets!='' ){
          this.getFaceIdSign(signTickets);
        }else{
          this.getAccessToken();
        }
      }, 3500)
    },
    async initIndex() {
      // #ifdef H5
      if (this.$jweixin.isWechat()) {
        await this.$jweixin.initJssdk();
        this.$jweixin.wxReady(() => {
          this.$jweixin.hideOptionMenu()
        })
      }
      // #endif
      let cur_time = new Date(Math.ceil(new Date().getTime()))
      this.toDay = this.$util.formatTime(cur_time, 'YY-M-D')
      this.toDayTime = this.$util.formatTime(cur_time, 'h:m')
      let data = await this.$api.technician.timeConfig()
      for (let key in this.form) {
        this.form[key] = data[key]
      }
      data.day_list.forEach((item, index) => {
        item.title = index == 0 ? '今天' : item.dat_text
        item.sub = []
      })
      this.form.time_unit = data.time_unit
      this.dayList = data.day_list
      this.$util.setNavigationBarColor({
        bg: this.primaryColor
      })
      this.face_img = data.face_img
      this.face_img_base64 = data.face_img_base64
      this.userId = data.user_id
      this.progress = data.similarity
      this.work_img = data.work_img
      this.work_img = [{
        path: data.work_img
      }]
      this.id_code = data.id_code
      this.coach_name = data.coach_name
      if(data.is_out){
        // 定义倒计时结束时间
        let endTime = new Date(data.check_time).getTime()
        // 设置倒计时
        let timer = setInterval(() => {
          // 获取当前时间
          let now = new Date().getTime()
          // 计算时间差
          let distance = endTime - now

          // 计算时分秒
          let days = Math.floor(distance / (1000 * 60 * 60 * 24))
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          let seconds = Math.floor((distance % (1000 * 60)) / 1000)

          // 更新倒计时
          this.countDown = `核验倒计时：${days}天 ${hours}时 ${minutes}分 ${seconds}秒`

          // 判断倒计时是否结束
          if (distance < 0) {
            clearInterval(timer) // 停止计时器
            this.countDown = '核验已过期'
          }
        }, 1000)
      }else{
        this.countDown = '核验已过期'
      }
      this.toCount()
    },
    toChangeItem() {
      if (this.form.coach_status == 3) return
      this.form.is_work = this.form.is_work == 1 ? 0 : 1
    },
    toShowTime(key) {
      if (this.form.coach_status == 3) return
      this.showKey = key
      this.showTime = true
    },
    onConfirm(val) {
      this.form[this.showKey] = val.result;
      this.toCount()
    },
    toCount() {
      let {
        toDay = ''
      } = this
      let {
        start_time = '',
        end_time = ''
      } = this.form
      if (toDay && start_time && end_time) {
        let start = `${toDay} ${start_time}`
        let end = `${toDay} ${end_time}`
        this.is_next_day = this.$util.DateToUnix(start) >= this.$util.DateToUnix(end)
        this.dayList.forEach(item => {
          item.sub = []
        })
        this.getTimeCall()
      }
    },
    async getTimeCall() {
      this.$util.showLoading()
      let {
        start_time = '',
        end_time = ''
      } = this.form
      let {
        dayCurrent,
        dayList
      } = this
      let data = await this.$api.technician.getTime({
        start_time,
        end_time,
        dat_str: dayList[dayCurrent].dat_str
      })
      this.dayList[dayCurrent].sub = data
      this.$util.hideAll()
    },
    async submit() {
      let param = this.$util.deepCopy(this.form)
      if (!param.start_time || !param.end_time) {
        this.$util.showToast({
          title: !param.start_time ? `请选择开始时间` : `请选择结束时间`
        })
        return
      }

      delete param.coach_status
      param.time_text = this.dayList
      this.$util.showLoading()
      await this.$api.technician.setTimeConfig(param)
      this.$util.hideAll()
      this.$util.showToast({
        title: `保存成功`
      });
      this.updateTechnicianItem({
        key: 'haveOperItem',
        val: true
      })
      setTimeout(() => {
        this.$util.back()
        this.$util.goUrl({
          url: 1,
          openType: `navigateBack`
        })
      }, 1000)

    },
    setDate(index) {
      this.dayCurrent = index
    },
    getDateTime(index) {
      if (this.form.coach_status == 3) return
      let {
        dayCurrent
      } = this
      if (this.dayList[dayCurrent].sub && this.dayList[dayCurrent].sub[index].is_order == 1) return
      this.dayList[dayCurrent].sub[index].is_click = this.dayList[dayCurrent].sub[index].is_click == 0 ? 1 : 0
      this.dayList[dayCurrent].sub[index].status = this.dayList[dayCurrent].sub[index].status == 0 ? 1 : 0
    },
    handerTabChange(index) {
      if (this.form.coach_status == 3) return
      this.dayCurrent = index
      if (this.dayList[index].sub && this.dayList[index].sub.length) return
      this.getTimeCall()
    },
    isTimes(value) {
      // let {
      // 	start_time = ''
      // } = this.form
      let date = new Date()
      //let time = this.$util.formatTime(new Date(), 'YY/M/D') + " " + start_time + ":00"
      //|| value < new Date(time).getTime() / 1000
      return date.getTime() / 1000 > value
    }
  }
}
</script>


<style lang="scss">
.technician-time-manage {
  .iconfont {
    font-size: 80rpx;
    line-height: 34rpx;
  }

  .item-time {
    width: 50%;
  }

  .date-title {
    padding-bottom: 60rpx;

    text {
      border-bottom: 3px solid transparent;
    }
  }

  .date-list {
    word-break: break-all;
    flex-flow: wrap;

    .date-item {
      width: 163rpx;
      height: 110rpx;
      border: 1px solid #E5E5E5;
    }

    .date-item-prohibit {
      background: #F6F7F7;
    }

    .c-5A677E {
      color: #5A677E;
    }
  }
  .logo-img{
    width: 250rpx;
    height: 250rpx;
  }
  .countDown{
    font-size: 40rpx;
    color: #fd0101;
  }
  .container{ padding: 20upx 20upx; }

  .strip {
    position: relative;
    width: 100%;
    height: 30upx;
    color: rgba(80, 80, 80, 1);
    background-color: #F5F5F5;
    font-size: 28rpx;
    line-height: 150%;
    text-align: center;
    margin-bottom: 12upx;
    border-radius: 20upx;
  }
  .progress{
    font-size: 35rpx;
    color: #008EF6;
  }
  .yellow {
    height: 24upx;
    color: rgba(80, 80, 80, 1);
    background-color: #FA8C16;
    border-radius: 20upx;
    font-size: 28rpx;
    line-height: 150%;
    text-align: center;
  }
  .red {
    height: 24upx;
    color: rgba(80, 80, 80, 1);
    background-color:#E02020;
    border-radius: 20upx;
    font-size: 28rpx;
    line-height: 150%;
    text-align: center;
  }
  .blue{
    height: 24upx;
    color: rgba(80, 80, 80, 1);
    background-color:#008EF6;
    border-radius: 20upx;
    font-size: 28rpx;
    line-height: 150%;
    text-align: center;
  }
}
</style>
