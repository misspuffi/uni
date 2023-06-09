<template>
  <view class="apply-pages" v-if="isLoad">

    <view class="page-height" v-if="options.admin_id && [2,3].includes(coach_status) || is_update">
      <abnor percent="150%" @confirm="confirm" @cancel="$util.goUrl({ url: 1, openType: `navigateBack` })"
             :title="title[coach_status]" :tip="tipArr[coach_status]" :button="buttonArr[coach_status]"
             :image="image[coach_status]"></abnor>
    </view>
    <block v-else>
      <view class="apply-form">
        <view class="fill-base mt-md radius-16">
          <view class="flex-between pl-lg pr-lg b-1px-b">
            <view class="item-text">姓名</view>
            <input v-model="form.coach_name" type="text" class="item-input flex-1" maxlength="20"
                   :placeholder="rule[0].errorMsg" />
          </view>
          <view class="flex-between pl-lg pr-lg b-1px-b">
            <view class="item-text">昵称</view>
            <input v-model="form.nick_name" type="text" class="item-input flex-1" maxlength="20"
                   :placeholder="rule[13].errorMsg" />
          </view>
          <view class="flex-between pl-lg pr-lg b-1px-b">
            <view class="item-text">性别</view>
            <view class="item-input flex-1 flex-y-center">
              <view @tap.stop="form.sex = index" class="flex-y-center" :class="[{'mr-lg':index==0}]"
                    :style="{color:form.sex == index ? primaryColor:''}" v-for="(item,index) in ['男','女']"
                    :key="index"><i class="iconfont icon-xuanze mr-sm"
                                    :class="[{'icon-xuanze-fill':form.sex == index}]"></i>{{item}}
              </view>
            </view>
          </view>
          <view class="flex-between pl-lg pr-lg b-1px-b">
            <view class="item-text">手机号</view>
            <input v-model="form.mobile" type="text" class="item-input flex-1"
                   :placeholder="rule[1].errorMsg" />
          </view>
          <view class="flex-between pl-lg pr-lg b-1px-b">
            <view class="item-text">从业年份</view>
            <input v-model="form.work_time" type="number" class="item-input flex-1"
                   :placeholder="rule[2].errorMsg" />
          </view>
          <view class="flex-between pl-lg pr-lg b-1px-b">
            <view class="item-text">工作城市</view>
            <view class="item-input text">
              <picker @change="pickerChange($event)" :value="cityIndex" :range="cityList"
                      range-key="title">
                <view class="flex-y-center">
                  {{cityIndex!=-1?cityList[cityIndex].title:'请选择'}}
                  <i class="iconfont icon-right ml-sm" style="font-size: 28rpx;"></i>
                </view>
              </picker>
            </view>
          </view>
          <view class="flex-between pl-lg pr-lg">
            <view class="item-text">所在地址</view>
            <view class="item-input text flex-1">
              <view @tap.stop="toChooseLocation" class="flex-y-center text-right">
                <view class="flex-1 text-right">{{form.address || `点击右边图标设置`}}</view><i
                  class="iconfont iconjuli ml-sm" :style="{color: primaryColor}"></i>
              </view>
            </view>
          </view>
        </view>

        <view class="fill-base mt-md radius-16">
          <view class="flex-between pl-lg pr-lg">
            <view class="item-text">身份证号</view>
            <input v-model="form.id_code" type="text" class="item-input flex-1"
                   :placeholder="rule[6].errorMsg" />
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
            <view class="item-text">资格证书</view>
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
            <view class="item-text">工作形象照</view>
            <view class="item-input flex-1">图片建议尺寸: 216 * 216</view>
          </view>
          <view class="flex-between pl-lg pr-lg pb-md">
            <upload @upload="imgUpload" :imagelist="form.work_img" imgtype="work_img" text="上传图片"
                    :imgsize="1">
            </upload>
          </view>
        </view>
        <view class="fill-base mt-md radius-16">
          <view class="flex-between pl-lg pr-lg">
            <view class="item-text">个人生活照</view>
            <view class="item-input flex-1">图片建议尺寸: 750 * n</view>
          </view>
          <view class="flex-between pl-lg pr-lg pb-md">
            <upload @upload="imgUpload" @del="imgUpload" :imagelist="form.self_img" filetype="picture"
                    imgtype="self_img" text="上传图片" :imgsize="9">
            </upload>
          </view>
        </view>
        <view class="fill-base mt-md radius-16">
          <view class="flex-between pl-lg pr-lg">
            <view class="item-text">个人视频介绍</view>
            <input :disabled="true" type="text" class="item-input flex-1" />
          </view>
          <view class="flex-between pl-lg pr-lg pb-md">
            <upload @upload="imgUpload" @del="imgUpload" :imagelist="form.video" filetype="video"
                    imgtype="video" text="上传视频" :imgsize="1">
            </upload>
          </view>
        </view>
        <view class="fill-base mt-md radius-16">
          <view class="flex-between pl-lg pr-lg">
            <view class="item-text">技师简介</view>
            <input :disabled="true" type="text" class="item-input flex-1" />
          </view>
          <textarea v-model="form.text" class="item-textarea pd-lg" maxlength="300" placeholder="输入技师简介" style="height: 25px;" />
          <view class="text-right pb-lg pr-lg">
            {{form.text.length>300?300:form.text.length}}/300
          </view>
        </view>
        </br>
        <view >
          <image   src="http://qiqi.jiudiananmo.com/image/666/23/06/sPV4Gz9Tcyic5H3YTIgjaMlS1sABcwyb.png" style="width: 100%;height: 350px;"></image>
        </view>
        <view class="flex-center f-caption c-caption pd-lg">
          {{options.is_edit == 1 ? '编辑资料将进入重新审核，审核通过之前将显示原资料' : '平台不会通过任何渠道泄露您的个人信息，请放心输入'}}
        </view>
      </view>

      <view class="space-max-footer"></view>

      <fix-bottom-button @confirm="check" :text="[{text:'确定申请',type:'confirm',isAuth:true}]" bgColor="#fff"></fix-bottom-button>
      <!--			<fix-bottom-button @confirm="startDetect" :text="[{text:'确定申请',type:'confirm',isAuth:true}]" bgColor="#fff"></fix-bottom-button>-->
    </block>
  </view>
</template>

<script>
import sha1 from '../../utils/sha1.js';
import {
  randomString
} from '../../utils/utils.js';
import { IdCardOCRVerification } from "@/js_sdk/tencentcloud-plugin-faceid";
import wPicker from "@/components/w-picker/w-picker.vue";
import {
  mapState,
  mapActions,
  mapMutations
} from "vuex"
import f from "../../uni_modules/lime-painter/components/l-painter/painter";
export default {
  components: {
    wPicker
  },
  data() {
    return {
      isLoad: false,
      options: {},
      cityList: [],
      cityIndex: -1,
      // -1未申请，1审核中，2审核通过，3取消授权，4审核失败(可再次申请)
      tipArr: {
        '-1': [{
          text: '审核中不可编辑资料',
          color: 0
        }],
        '2': [{
          text: '快去管理订单吧',
          color: 0
        }],
        '3': [{
          text: '请联系平台管理人员询问原因',
          color: 0
        }]
      },
      buttonArr: {
        '-1': [{
          text: '返回',
          type: 'cancel'
        }],
        '2': [{
          text: '去管理',
          type: 'confirm'
        }],
        '3': [{
          text: '再次申请',
          type: 'confirm'
        }, {
          text: '个人中心',
          type: 'cancel'
        }]
      },
      title: {
        '-1': '您已经成功提交申请',
        '2': '您已经是技师了',
        '3': '平台管理员已取消授权'
      },
      image: {
        '-1': 'https://lbqny.migugu.com/admin/public/apply_wait.jpg',
        '2': 'https://lbqny.migugu.com/admin/public/apply_suc.jpg',
        '3': 'https://lbqny.migugu.com/admin/public/apply_fail.jpg'
      },
      status: false,
      is_update: 0,
      coach_status: 0,
      videoContext: null,
      form: {
        id: 0,
        coach_name: '', //姓名
        mobile: '', //手机号
        sex: 0, //性别
        nick_name: '', //昵称
        work_time: '', //从业年份
        // city: '', //城市
        lng: '',
        lat: '',
        address: '', //详细地址
        text: '', //备注
        id_code: '', //身份证号
        id_card: [], //身份证
        id_card_fan: [], // 身份证反面
        id_card_people: [], //手持身份证
        license: [], //资格证书
        work_img: [], // 工作照
        self_img: [], // 生活照
        city_id: '', // 城市 id
        video: []
      },
      rule: [{
        name: "coach_name",
        checkType: "isNotNull",
        errorMsg: "输入您的姓名",
        regType: 2
      },
        {
          name: "mobile",
          checkType: "isMobile",
          errorMsg: "输入手机号"
        }, {
          name: "work_time",
          checkType: "isNotNull",
          errorMsg: "请输入从业年份，例如：5"
        }, {
          name: "city_id",
          checkType: "isNotNull",
          errorMsg: "请选择意向工作城市"
        },
        {
          name: "address",
          checkType: "isNotNull",
          errorMsg: "请选择所在地址"
        }, {
          name: "text",
          checkType: "isNotNull",
          errorMsg: "请输入技师简介",
          regType: 2
        }, {
          name: "id_code",
          checkType: "isIdCard",
          errorMsg: "输入您的身份证号码"
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
          name: "id_card_people",
          checkType: "isNotNull",
          errorMsg: "请上传手持身份证照片"
        },
        {
          name: "license",
          checkType: "isNotNull",
          errorMsg: "请上传资格证书"
        },
        {
          name: "work_img",
          checkType: "isNotNull",
          errorMsg: "请上传工作形象照"
        },
        {
          name: "self_img",
          checkType: "isNotNull",
          errorMsg: "请上传个人生活照"
        },{
          name: "nick_name",
          checkType: "isNotNull",
          errorMsg: "请输入您的昵称"
        },
      ],
      lockTap: false,
      RuleId: 1,
      appid: 'IDAdoIMa',
      secret: 'eRdoxMnzou4SNlJ7yLVkRKtqAblzbBaWGOSyspntasIKU5BYNelxPCKfPY587cj3',
      userId: randomString(8),
      orderNo: randomString(9),
      nonce: randomString(32),
      version: '1.0.0',
      signTickets: '',
      licence: 'RWdRqRVm3ngdlc0+KR+1yYNEX5h4Op5MGLHxWUqRb5UVUIr0D6RabSkaqFIFHA8s2fiD9xkHy50kMJG+KByXuMpQkYoCgIRyzsFytMBB05S2lG+dOCnc95zk7nBVdwGsWs5ibjNod/TO/xRFyKXyGAjeBTgIFXdFZnhQ1G1T9c9T+bTJGSu5R6DHqRvah+weVQiUfu/GpCZh6EXFbn5JwUEm+PDpF6KN9YZngFjIo2nN1MgQZqWunDSHgqhFV2TM/gfjmgXLn4ZG5pDwTxVQsNjZm3aGFuF9TXbEHQjUP1TQevbzXG2Hg4sS5IJFwpPB0xKrw6tVphGgZsZOhDO0cQ==',

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
    let {
      is_edit = 0
    } = options
    options.is_edit = is_edit
    options = await this.updateCommonOptions(options)
    this.options = options
    this.$util.showLoading()
    await this.initIndex()
    let {
      admin_id = 0,
    } = options
    let {
      coach_status
    } = this
    uni.setNavigationBarTitle({
      title: is_edit ? '编辑资料' : admin_id && [2, 3].includes(coach_status) ? `` : `申请技师`
    })
    this.isLoad = true
  },
  methods: {
    ...mapActions(['getConfigInfo', 'getUserInfo', 'updateCommonOptions']),
    ...mapMutations(['updateUserItem']),
    /**
     * 开始人脸核算检测
     * @returns {Promise<void>}
     */
    async startDetect(param) {
      try {
        uni.showLoading({
          mask: true,
          title: "稍等..."
        });
        // let nonceTickets = uni.getStorage('nonceTickets');
        // if(nonceTickets &nonceTickets!='' ){
        //   const params = {
        //     ruleId: this.RuleId,
        //     idCard: param.id_code,
        //     name: param.coach_name,
        //   };
        //   let detectResult = await DetectAuth(params);
        //   if(detectResult.Result==0){
        //     uni.setStorage({
        //       key: 'BizToken',
        //       value: detectResult.BizToken,
        //       expires: 100 * 1000
        //     })
        //     let url = detectResult.Url
        //     uni.navigateTo({
        //       url: '/pages/common/web?url=' + url
        //     })
        //   }else{
        //     uni.showToast({
        //       icon: 'none',
        //       title: detectResult.Description
        //     });
        //     return false;
        //   }
        // }else{
        //   this.getAccessToken(0, 1);
        // }
        let signTickets = uni.getStorage('signTickets');
        if(signTickets &signTickets!='' ){
          this.signTickets = signTickets;
          this.getFaceIdSign(signTickets,param);
        }else{
          this.getAccessToken(param);
        }
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      } finally {
        this.status = false;
      }
    },
    /**
     * 1.获取Access Token
     */
    getAccessToken(param){
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
            this.getSIGNticket(access_token,param);
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
     * 2.获取SIGNticket
     * @param access_token
     * @param param
     */
    getSIGNticket(access_token,param){
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
            this.getFaceIdSign(signTickets,param)
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
     * @param param
     */
    getFaceIdSign(signTickets,param) {
      let dataArray = [this.appid, this.nonce, this.userId, signTickets, this.version]
      dataArray.sort()
      let sb = ''
      for (let v of dataArray) {
        sb += `${v}`
      }
      let sign=sha1(sb).toUpperCase()
      this.getFaceId(sign,param);
    },
    getFaceIdSign1(signTickets) {
      let dataArray = [this.appid, this.nonce, this.orderNo, signTickets, this.version]
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
     * @param param
     */
    getFaceId(sign,param) {
      let that=this;
      uni.request({
        method: 'POST',
        url: 'https://miniprogram-kyc.tencentcloudapi.com/api/server/getAdvFaceId?orderNo='+that.orderNo,
        data: {
          webankAppId: that.appid,
          orderNo: that.orderNo,
          name: that.form.coach_name,
          idNo: that.form.id_code,
          userId: that.userId,
          version: that.version,
          sign: sign,
          nonce: that.nonce,
        },
        success: (res) => {
          if(res.data.code==0){
            let result = res.data.result;
            let faceId = result.faceId;
            this.startWbFaceVerifyService(sign, faceId,param);
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
     * @param param
     */
    startWbFaceVerifyService(sign, faceId,param) {
      try {
        let that=this;
		    const face = uni.requireNativePlugin('DC-WBFaceServiceV2');
        console.log(faceId)
        // 调起 SDK
        face.startAdvanceWbFaceVerifyService({
          apiVersion: "1.0.0",
          appId: that.appid,
          nonce: that.nonce,
          userId: that.userId,
          sign: sign,
          orderNo: that.orderNo,
          licence: that.licence,
          faceId: faceId,
          compareType: "0",
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
          console.log('startWbFaceVerifyService',result)
          let scene = result.scene;
          if (scene == 'wb_face_callback_login_failure') {
            uni.removeStorage({
              key: 'signTickets'
            });
            let tip = "刷脸失败，请重试";
            uni.showToast({
              icon: 'none',
              title: tip
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
                title: "刷脸成功:活体可能性：" + res.liveRate + "%; 人脸相似度：=" + res.similarity + "%"
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
                  if(result.data.code==0){
                    param['face_img']=result.data.result.photo;
                    param['similarity']=res.similarity;
                    this.submit(param)
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
                uni.showToast({
                  icon: 'none',
                  title: "对比失败，活体可能性：" + res.liveRate + "%; 人脸相似度：" + res.similarity + "%"
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
		console.log(error)
        uni.showToast({
          icon: 'none',
          title: error.message
        });
      }
    },
    /**
     * 手机号核验
     * @param param
     * @returns {Promise<boolean>}
     * @constructor
     */
    async PhoneVerification(param) {
      try {
        this.status = true;
        let detectResult = '';
        uni.showLoading({
          mask: true,
          title: "身份证核验中..."
        });
        const params = {
          idCard: param.id_code,
          name: param.coach_name,
          // phone: param.mobile,
        };
        detectResult = await IdCardOCRVerification(params);
        if(detectResult.Result==0){
          uni.showToast({
            title: detectResult.Description,
          });
          uni.showLoading({
            mask: true,
            title: "即将进入人脸核验..."
          });
          setTimeout(() => {
            uni.hideLoading()
            this.startDetect(param)
          }, 3500)
        }else{
          uni.showToast({
            icon: 'none',
            title: detectResult.Description
          });
          return false;
        }
      } catch (error) {
        uni.showToast({
          icon: 'none',
          title: error.message
        });
        return false;
      } finally {
        this.status = false;
      }
    },
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
      await this.getCityList()
      let data = await this.$api.technician.coachInfo()
      this.$util.setNavigationBarColor({
        bg: this.primaryColor
      })
      if (data && !data.id) {
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
      data.work_img = [{
        path: data.work_img
      }]
      data.self_img = data.self_img.map(item => {
        return {
          path: item
        }
      })
      data.video = data.video && data.video.length > 0 ? [{
        path: data.video
      }] : []
      this.cityIndex = this.cityList.findIndex(item => {
        return item.id == data.city_id
      })
      for (let key in this.form) {
        this.form[key] = data[key]
      }
      this.coach_status = data.is_update == 1 ? -1 : data.status
      this.is_update = data.is_update
      this.$util.hideAll()
    },
    initRefresh() {
      this.initIndex(true)
    },
    async getCityList() {
      let {
        location
      } = this
      if (!location.lat) {
        // #ifdef H5
        if (this.$jweixin.isWechat()) {
          this.$util.showLoading()
          // await this.$jweixin.initJssdk();
          await this.$jweixin.wxReady2();
          let {
            latitude: lat = 0,
            longitude: lng = 0
          } = await this.$jweixin.getWxLocation()
          location = {
            lng,
            lat,
            address: '定位失败',
            province: '',
            city: '',
            district: ''
          }
          if (lat && lng) {
            let key = `${lat},${lng}`
            let data = await this.$api.base.getMapInfo({
              location: key
            })
            let {
              status,
              result
            } = JSON.parse(data)
            if (status == 0) {
              let {
                address,
                address_component
              } = result
              let {
                province,
                city,
                district
              } = address_component
              location = {
                lng,
                lat,
                address,
                province,
                city,
                district
              }
            }
          }
        }
        // #endif
        // #ifndef H5
        location = await this.$util.getBmapLocation()
        // #endif

        this.updateUserItem({
          key: 'location',
          val: location
        })
      }

      let {
        lng = 0,
        lat = 0
      } = location
      if (lat && lng) {
        let city = await this.$api.base.getCity({
          lng,
          lat
        })
        this.$util.hideAll()
        this.cityList = city
        this.form.city_id = city.length > 0 ? city[0].id : 0
      }
    },
    pickerChange(e, val) {
      this.cityIndex = e.target.value
      this.form.city_id = this.cityList[this.cityIndex].id
    },
    imgUpload(e) {
      let {
        imagelist,
        imgtype
      } = e;
      this.form[imgtype] = imagelist;
    },
    // 选择地区
    async toChooseLocation(e) {
      await this.$util.checkAuth({
        type: 'userLocation'
      })
      let [, {
        address = '',
        longitude,
        latitude
      }] = await uni.chooseLocation();
      if (!address) return
      this.form.address = address
      this.form.lng = longitude
      this.form.lat = latitude
    },
    // 去管理/再次申请
    async confirm() {
      let {
        coach_status
      } = this
      let page = {
        2: `/pages/mine`,
        3: `/technician/pages/apply`,
      }
      let url = page[coach_status]
      this.$util.log(url)
      this.$util.goUrl({
        url,
        openType: `reLaunch`
      })
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
    async check() {
      let param = this.$util.deepCopy(this.form)
      let arr = ['id_card', 'id_card_fan', 'id_card_people', 'work_img', 'video']
      arr.map(item => {
        param[item] = param[item].length > 0 ? param[item][0].path : ''
      })
      param.license = param.license.map(item => {
        return item.path
      })
      param.self_img = param.self_img.map(item => {
        return item.path
      })
      let msg = this.validate(param);
      if (msg) {
        this.$util.showToast({
          title: msg
        });
        return;
      }

      if(this.status){
        this.$util.showToast({
          title: `请不要重复提交`,
        })
        return;
      }
      await this.PhoneVerification(param)
    },
    async submit(param) {
      let {
        admin_id = 0
      } = this.options
      if (admin_id) {
        param.admin_id = admin_id
      }
      param.id_card = [param.id_card, param.id_card_fan, param.id_card_people]
      delete param.id_card_fan
      delete param.id_card_people
      if (this.lockTap) return
      this.lockTap = true
      this.$util.showLoading()
      try {
        let {
          is_edit = 0
        } = this.options
        let methodModel = param.id && is_edit ? 'coachUpdateV2' : 'coachApply'
        await this.$api.technician[methodModel](
            param)
        this.$util.hideAll()
        let msg = param.id && is_edit ? `` : `,即将跳转个人中心`
        this.$util.showToast({
          title: `提交成功${msg}`,
        })

        setTimeout(() => {
          if (param.id && is_edit) {
            this.coach_status = -1
            this.is_update = 1
            return
          }
          if (getCurrentPages().length > 1) {
            this.$util.back()
          }
          this.$util.goUrl({
            url: '/pages/mine',
            openType: `reLaunch`
          })
        }, 1500)
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
.page-height {
  width: 100%;
  height: 100vh;
  background: #fff;
}
</style>
