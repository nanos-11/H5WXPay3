<template>
  <div class="pay-page">
    <div class="pay-scroll">
      <div class="virtual">
        <div class="rest">
          <div class="rest-content">24人</div>
          <div class="rest-txt">班级剩余名额</div>
        </div>
        <div class="rest">
          <div class="rest-content">
            {{minute}}:{{second}}
          </div>
          <div class="rest-txt">剩余支付时间</div>
        </div>
      </div>
      <div class="gap"></div>
      <div class="extra">
        <img src="../../static/images/hint.jpg" alt="" width="100%">
      </div>
      <div class="verify-tel">
        <div class="verify-title">验证手机</div>
        <div class="tel-space">
          <div class="tel-icon">
            <img src="../../static/images/tel-icon.png">
          </div>
          <input type="tel" placeholder="手机号" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="phone">
        </div> <!---->
        <div :v-model="isShow" style="font-size: 0.34rem; color: red;margin-left: 0.8rem;">{{message}}</div>
        <div class="code-space">
          <div class="input-space">
            <div class="code-icon"><img src="../../static/images/code-icon.png"></div>
            <input type="number" placeholder="验证码" oninput="value=value.replace(/[^\d]/g,'')" maxlength="6"
                   v-model="code" @blur="inputOnBlur"></div>
          <div class="tiktok" @click="getCode" v-show="show">获取验证码</div> <!---->
          <div v-show="!show" class="tiktok" style="color:#ffffff;">{{count}}秒</div>
        </div>
        <div :v-model="isShow" style="font-size: 0.34rem; color: red;margin-left: 0.8rem;">{{codeMessage}}</div>
      </div>
      <div class="gap"></div>
      <div class="course-info">
        <div class="course-title">支付方式</div>
        <!--        -->
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="微信" clickable @click="radio === '1'">
              <van-radio slot="right-icon" name="1"/>
              <img class='wx' src="../../static/images/wxpay.png" alt="" style="width:0.5rem;height:0.5rem">
            </van-cell>
            
            <!--<van-cell title="支付宝" clickable @click="radio === '2'">
              <van-radio slot="right-icon" name="2"/>
              <img class='al' src="../../static/images/alipay.jpg" alt="" style="width:0.5rem;height:0.5rem">
            </van-cell>-->
          </van-cell-group>
        </van-radio-group>
        <!--        -->
        <div class="line"></div>
        <div class="extra">
          <img src="../../static/images/coures_details.jpg" alt="" width="100%">
        </div>
      </div>
    </div>
    <div class="pay-btn">
      <div class="pay-left">
        <div class="money-space">
          <div class="money-icon">￥</div>
          <div class="money">{{price}}</div>
        </div>
      </div>
      <button class="pay-right" @click="loginPhone">{{isPayMessage}}</button>
    </div>
    <section class="openBox" v-show="dialogPay">
      <div class="codeBox">
        <div class="closeButton" @click="closeCode">
          X
        </div>
        <div class="top">
          添加微信号或长按保存下方二维码添加您的学习专属班
        </div>
        <div class="box">
          <img src="../../static/images/coder3.jpg" alt="">
        </div>
        <div class="bottom">
          微信号：13141204632
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import "../../static/js/cover.min.js"
  import {isPay, getBindVerCode, loginPhone, createAliPay, getPhoneData, createWXPay} from "../api/home";
  
  /**
   * 验证手机号是否正确
   *
   * @date 2019/6/21
   * @author nan
   */
  function verifyPhone() {
    if (this.phone === '') {
      this.message = "请输入手机号";
      this.isShow = true;
      return false
    }
    let pattern = /^1[23456789]\d{9}$/
    if (pattern.test(this.phone) !== true) {
      this.message = "请输入正确的手机号";
      this.isShow = true;
      return false
    }
    return true
  }
  
  /**
   * 验证验证码是否正确
   *
   * @date 2019/6/21
   * @author nan
   */
  function verifyCode() {
    if (this.code === '') {
      this.codeMessage = "请输入验证码";
      this.isShow = true;
      return false
    }
    return true
  }
  
  /**
   * 倒计时60秒
   *
   * @date 2019/6/28
   * @author nan
   */
  function timerCode() {
    // 定义60秒的时间
    const TIME_COUNT = 60
    // 当timer不为空时，显示倒计时
    if (!this.timer) {
      this.count = TIME_COUNT
      this.show = false
      this.timer = setInterval(() => {
        // count从60开始--,到0时清除倒计时，隐藏倒计时，显示文本
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--
        } else {
          this.show = true
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  }
  
  export default {
    name: "RegisterPhone",
    data() {
      return {
        dialogPay: false,
        wxCode: '',
        minutes: 10,
        seconds: 0,
        address: '',//地址
        message: '',  //提示信息
        codeMessage: '',
        isShow: '',  //是否显示提示信息
        // 获取验证码显示
        show: true,
        // 验证码倒计时
        count: '',
        // 时间默认为null
        timer: null,
        
        phone: '',
        code: '',
        /*dialog: {
          isShow: false,
          isLoadingShow: false,
          message: ""
        },*/
        isPay: false,
        isPayMessage: '确认支付',
        merID: '1497884262',  // 商户号
        price: 49,
        type: '1',
        // JSAPI 就是微信内部吊起支付 MWEB 就是微信外
        pay_type: 'JSAPI',
        radio: '1'// 1.微信 2.支付宝
      };
    },
    watch: {
      wxCode: {
        handler(val) {
          let u = navigator.userAgent, app = navigator.appVersion;
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isiOS) {
            this.getWxCode(val)
          } else {
            this.wxCode = val
          }
        }
      },
      second: {
        handler(newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler(newVal) {
          this.num(newVal)
        }
      }
    },
    // components: {confirm},
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    },
    mounted() {
      window.loginPhone = this.loginPhone
      let globalCode = window.__globalCode;
      // console.log('nan mounted1', globalCode)
      // console.log('nan mounted2', this.wxCode)
      this.wxCode = globalCode
    },
    /**
     * 验证手机号是否 支付过
     *
     * @date 2019/6/28
     * @author nan
     */
    created() {
      this.type = decodeURIComponent(this.$route.query.type);
      if (this.type === '2') {
        this.price = 699
      }
      localStorage.setItem('price', this.price);
      
      let phone = localStorage.getItem('phone');
      isPay(phone, 3).then(res => {
        this.isPay = res.status
        this.isPayMessage = res.status ? '已支付' : '确认支付';
      })
      // 倒计时
      if (this.minutes === 10) {
        if (!this.isPay) {
          this.add()
        }
      }
      this.getAddress()
    },
    methods: {
      is_weixin() {
        let ua = navigator.userAgent.toLowerCase();
        let isWinxin = ua.indexOf('micromessenger') !== -1;
        if (isWinxin) {
          return true;
        } else {
          return false;
        }
      },
      inputOnBlur() {
        window.scroll(0, 0);
      },
      add: function () {
        let _this = this;
        let time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            window.clearInterval(time);
          } else {
            _this.seconds -= 1;
          }
        }, 1000);
      },
      num: function (n) {
        return n < 10 ? "0" + n : "" + n
      },
      /**
       * 获取地址信息
       *
       * @date 2019/7/1
       * @author nan
       */
      getAddress() {
        let cip = localStorage.getItem('Ip');
        const KEY = 'DOFBZ-AVFE2-KVAUJ-C4GP3-V4IJ2-GPFAY'; //key 秘钥自己申请
        let url = 'https://apis.map.qq.com/ws/location/v1/ip?ip=' + cip + '&key=' + KEY;
        this.$jsonp(url, {
          callbackName: 'QQmap',
          output: 'jsonp',
        })
        .then(json => {
          // adcode: 110105
          // city: "北京市"
          // district: "朝阳区"
          // nation: "中国"
          // province: "北京市"
          this.address = json.result.ad_info.city;
        })
        .catch(err => {
          console.log(err)
        })
      },
      /**
       * 获取验证码
       *
       * @date 2019/6/21
       * @author nan
       */
      getCode() {
        this.message = ''
        // 验证手机号是否正确
        if (!verifyPhone.call(this)) return
        // 验证码计时器
        timerCode.call(this)
        
        // 获取验证码接口
        getBindVerCode(this.phone).then(res => {
          // console.log('nan ', res)
          if (res.errorCode === 1005) {
            this.message = "验证码发送频繁，请稍候再试"
          }
        })
        // 获取手机号给螳螂
        if(!this.address){
          this.address = 'null'
        }
        getPhoneData(this.phone, this.address).then(res => {
        })
        
        if (this.type === '2') {
          // 699
          meteor.track('form', {convert_id: 1651889116605448})
        } else {
          meteor.track('form', {convert_id: 1651889015433227})
        }
      },
      closeCode() {
        this.dialogPay = false;
      },
      /**
       * 根据手机号登录或者注册
       * @date 2019/6/19
       * @author nan
       */
      loginPhone() {
        if (this.isPay) {
          this.dialogPay = true;
          return;
        }
        // 验证手机号是否正确
        if (!verifyPhone.call(this)) return
        // 验证验证码是否正确
        if (!verifyCode.call(this)) return
        // 保存手机号
        localStorage.setItem('phone', this.phone)
        // 登录注册接口
        loginPhone(this.phone, this.code, 3).then(res => {
          // 开始支付
          // console.log('nan re', res)
          if (res === undefined) {
            return
          }
          if (res.errorCode === 1006) {
            this.codeMessage = "验证码错误";
            return
          }
          if (res.pay_type) {
            this.isPay = true
            this.isPayMessage = '已支付'
            return
          }
          this.startAliPay();
        })
      },
      /**
       * 设置支付宝支付参数
       *
       * @date 2019/6/21
       * @author nan
       */
      startAliPay() {
        // 调起支付 true.微信 false.支付宝
        if (this.radio === '1') {
          this.startWxPay()
        } else {
          this.getAliOrder()
        }
      },
      /**
       * 支付宝支付
       * 绑定订单
       *
       * @date 2019/7/1
       * @author nan
       */
      getAliOrder() {
        // 绑定订单
        let params = {
          'phone': this.phone,
          'subject': '愈见心理课',
          'course_id': 3,
          'status': this.price === 49 ? 1 : 2,
        }
        createAliPay(params).then(res => {
          if (res === undefined) {
            return
          }
          const div = document.createElement('div');
          div.innerHTML = res;
          document.body.appendChild(div);
          document.forms[0].submit();
        }, error => {
          // console.log('nan 绑定订单失败', error)
          window.alert("支付失败")
        })
      },
      
      
      /**
       * 微信支付
       *
       * @date 2019/11/26
       * @author nan
       */
      getWxCode(val) {
        this.phone = localStorage.getItem('phone');
        // console.log('nan getWxCode---2>', this.phone)
        this.price = localStorage.getItem('price');
        // console.log('nan getWxCode---3>', this.price)
        // 调用接口
        this.createOrder(val, 'JSAPI')
      },
      startWxPay() {
        if (this.is_weixin()) {
          if (!this.wxCode) {
            this.wxCode = window.__globalCode;
          }
          let openId = window.__globalOpenId;
          let appid = window.__globalAppId;
          let local = window.location.href;
          // console.log('nan startWxPay code 1', this.wxCode)
          // console.log('nan startWxPay openId 2', openId)
          // console.log('nan startWxPay appid 3', appid)
          // console.log('nan startWxPay local 4', local)
          // 如果没有code 或 openId，则去请求
          if (!this.wxCode && !openId) {
            let url = 'http://yujianzky.51nicelearn.com/onlinebuy/#/registerPhone?type=' + this.type
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
              + appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            
            // console.log('nan startWxPay-------->', openId)
          } else {
            // 调用接口 微信内部打开微信支付
            this.createOrder(this.wxCode, 'JSAPI')
          }
        } else {
          // 调用接口 浏览器打开微信支付
          this.createOrder(this.wxCode, 'MWEB')
        }
      },
      /**
       * 创建订单
       *
       * @date 2019/11/26
       * @author nan
       */
      createOrder(code, pay_type) {
        console.log('nan createOrder--->', code, pay_type)
        let params = {
          'phone': this.phone,
          'subject': '7天带你了解心理学',
          'course_id': 3,
          'code': code,
          'status': this.price === 49 ? 1 : 2,
          'pay_type': pay_type
        }
        createWXPay(params).then(res => {
          if (pay_type === 'MWEB') {
            if (res.status) {
              window.location.href = res.result
            } else {
              this.isPay = !res.status
              this.isPayMessage = !res.status ? '已支付' : '确认支付';
            }
          } else {
            if (res.status === true) {
              const pay_params = res.result
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady);
                }
              } else {
                this.onBridgeReady(pay_params);
              }
            } else {
              alert('微信支付调起失败!');
            }
          }
        })
      },
      onBridgeReady(params) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": params.appId,  //公众号名称，由商户传入
            "timeStamp": params.timeStamp.toString(),  //时间戳，自1970年以来的秒数
            "nonceStr": params.nonceStr,  //随机串
            "package": params.package,
            "signType": params.signType,  //微信签名方式：
            "paySign": params.paySign  //微信签名
          },
          function (res) {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              // console.log('nan ', '支付成功！');
              window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/coder'
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              // console.log('nan ', '取消了支付')
            } else {
              alert('支付失败')
            }
          });
      }
    }
  };
  let docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"
        + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue)
        + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) {
        return false;
      }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }
      return aKeys;
    }
  };
  
  let utils = {
    getUrlQuery: function (name) {
      var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
      if (result == null || result.length < 1) {
        return "";
      }
      return result[1];
    }
  };
  window.__globalCode = utils.getUrlQuery('code')
  window.__globalOpenId = docCookies.getItem('opendId')
  //wx0b2a2de1d89dbc61  wxfd55afcce06c6405
  window.__globalAppId = 'wx4a597f8c6a839610'
</script>

<style scoped lang="css">
  @import "../../static/css/chunkd.css";
  @import "../../static/css/pay.css";
  @import "../../static/css/wxse.css";
  
  /deep/ .van-cell {
    font-size: 0.32rem;
    line-height: 1rem;
  }
  
  /deep/ .van-cell-group {
    padding: 0 0.5rem;
  }
  
  /deep/ .van-radio__icon {
    font-size: 0.5rem;
  }
  
  /deep/ .van-cell__value {
    position: absolute;
    left: 0;
    top: .2rem;
  }
  
  /deep/ .van-cell__title {
    padding-left: 0.7rem;
  }
</style>
