<template>
  <div class="pay-page">
    <div class="pay-scroll">
      <div class="virtual">
        <div class="rest">
          <div class="rest-content">28人</div>
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
                   v-model="code"></div>
          <div class="tiktok" @click="getCode" v-show="show">获取验证码</div> <!---->
          <div v-show="!show" class="tiktok" style="color:#ffffff;">{{count}}秒</div>
        </div>
        <div :v-model="isShow" style="font-size: 0.34rem; color: red;margin-left: 0.8rem;">{{codeMessage}}</div>
      </div>
      <div class="gap"></div>
      <div class="course-info">
        <!--<div class="course-title">课程信息</div>
        <div class="course-desc">21天亲子沟通训练营 (理论基础+育儿技巧+真实案例)</div>
        <div class="course-price">
          <div class="money-icon">￥</div>
          <div class="money">9.9</div>
        </div>
        <div class="line"></div>-->
        <div class="extra">
          <img src="../../static/images/coures_details.jpg" alt="" width="100%">
        </div>
      </div>
    </div>
    <div class="pay-btn">
      <div class="pay-left">
        <div class="money-space">
          <div class="money-icon">￥</div>
          <div class="money">49</div>
        </div>
      </div>
      <button class="pay-right" @click="loginPhone" :disabled="isPay">{{isPayMessage}}</button>
    </div>
  </div>
</template>

<script>
  import "../../static/js/cover.min.js"
  import {isPay, getBindVerCode, loginPhone, createAliPay, getPhoneData, createWXPay} from "../api/home";
  import {track} from "../utils/util.js"
  import wx from "weixin-js-sdk";
  
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
        isAndroid: false,
        isIOS: false,
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
        merID: '1497884262'  // 商户号
      };
    },
    watch: {
      wxCode: {
        handler(val) {
          this.getWxCode(val)
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
      let u = navigator.userAgent, app = navigator.appVersion;
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      
      let phone = localStorage.getItem('phone');
      isPay(phone, 1).then(res => {
        this.isPay = res.status
        this.isPayMessage = res.status ? '已支付' : '确认支付';
      })
      this.getAddress()
    },
    methods: {
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
        let cip = window.returnCitySN.cip;
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
        // 倒计时
        // console.log('nan getCode', this.minutes)
        if (this.minutes === 30) {
          if (!this.isPay) {
            this.add()
          }
        }
        // 获取验证码接口
        getBindVerCode(this.phone).then(res => {
          // console.log('nan ', res)
          if (res.errorCode === 1005) {
            this.message = "验证码发送频繁，请稍候再试"
          }
        }, error => {
        
        })
        // 获取手机号给螳螂
        getPhoneData(this.phone, this.address).then(res => {
        })
      },
      /**
       * 根据手机号登录或者注册
       * @date 2019/6/19
       * @author nan
       */
      loginPhone() {
        // 验证手机号是否正确
        if (!verifyPhone.call(this)) return
        // 验证验证码是否正确
        if (!verifyCode.call(this)) return
        // 保存手机号
        localStorage.setItem('phone', this.phone)
        // 登录注册接口
        loginPhone(this.phone, this.code, 1).then(res => {
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
        meteor.track('form', {convert_id: 1643737926516749})
        // 调起支付
        this.startWxPay()
      },
      getWxCode(val) {
        // console.log('nan getWxCode--->', val)
        // 调用接口
        let params = {
          'phone': this.phone,
          'subject': '21天亲子沟通训练营 (理论基础+育儿技巧+真实案例)',
          'course_id': 1,
          'code': this.wxCode
        }
        createWXPay(params).then(res => {
          // console.log('nan res1------------>', res)
          // console.log('nan res--status-1--------->', res.status)
          // console.log('nan res--result-1--------->', res.result)
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
        })
      },
      startWxPay() {
        let vm = this
        // console.log('nan startWxPay0', docCookies)
        
        this.wxCode = window.__globalCode;
        let openId = window.__globalOpenId;
        let appid = window.__globalAppId;
        let local = window.location.href;
        
        // console.log('nan startWxPay code 1', this.wxCode)
        // console.log('nan startWxPay openId 2', openId)
        // console.log('nan startWxPay appid 3', appid)
        // console.log('nan startWxPay local 4', local)
        
        // 如果没有code 或 openId，则去请求
        if (!this.wxCode && !openId) {
          // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b2a2de1d89dbc61&redirect_uri=
          // http://cps.dianping.com/weiXinRedirect&response_type=code&scope=snsapi_base
          let url = 'http://wechatclass.51nicelearn.com/#/registerPhone'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
          
          // console.log('nan startWxPay-------->', openId)
        } else {
          // 调用接口
          let params = {
            'phone': this.phone,
            'subject': '21天亲子沟通训练营 (理论基础+育儿技巧+真实案例)',
            'course_id': 1,
            'code': this.wxCode
          }
          createWXPay(params).then(res => {
            // console.log('nan res------------>', res)
            // console.log('nan res--parse---------->', res.result)
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
          })
        }
      },
      onBridgeReady(params) {
        // console.log('nan onBridgeReady', params)
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
              window.location.href = 'http://wechatclass.51nicelearn.com/#/coder'
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              // console.log('nan ', '取消了支付')
            } else {
              alert('支付失败')
            }
          });
      }
    }
  };
  // 	window.onload = function () { // 重定向链接，跟微信公众号中获取用户code是一样的链接
  // 	window.location.href="
  // 	https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b2a2de1d89dbc61&redirect_uri=http://http://wechatclass.51nicelearn.com/#/registerPhone&response_type=code&scope=snsapi_userinfo"
  // 	}
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
  window.__globalAppId = 'wx0b2a2de1d89dbc61'
  
  
  // $(function () {
  //   var code = window.__globalCode
  //   var openId = window.__globalOpenId
  //   var appid = window.__globalAppId
  //   var local = window.location.href
  //
  //   // 如果没有code 或 openId，则去请求
  //   if (!code && !openId) {
  //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
  //       + appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
  //   }
  // });
</script>

<style scoped lang="css">
  @import "../../static/css/chunkd.css";
  @import "../../static/css/pay.css";
  
  /*.dialog-wrapper .container{
  @include wh(60%,24%);
    background: #fff;
    z-index: 1;
  }
  .dialog-wrapper .container p{
    line-height: 20px;
    margin: 38px 0 20px 0;
    text-align: center;
    min-height: 20px;
  }
  .dialog-wrapper .container div.confirm {
    line-height: 40px;
    margin-top: 40px;
  }
  .dialog-wrapper .container button {
    display: inline-block;
    @include wh(60px, 30px);
  }
  .dialog-wrapper .container button:nth-of-type(1) {
    margin: 0 20px 0 36px;
  }*/
</style>
