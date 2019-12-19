<template>
  <div class="main">
    <section class="page1">
      <div class="header">
        <div class="lefts">
          <div class="imgbox">
            <div class="imgs"><img src="../../static/images/logo.png" alt=""></div>
            <div class="fonts">亲子关系课</div>
          </div>
        </div>
        <div class="centers">
          <div>
            <span><img src="../../static/images/ren.png" alt=""></span>剩余名额
          </div>
          <div class="number">
            <countTo :startVal='startVal' :endVal='endVal' :duration='9000000'></countTo>
          </div>
        </div>
        <div class="rights" @click="startWxPay">
          <div>限时</div>
          <div>8.9</div>
          <div>元</div>
        </div>
      </div>
      <div class="banner"><img src="../../static/images/banner.jpg" alt="" width="100%"></div>
    </section>
    <section class="page2" onclick="mantis.requestChat()">
      <img src="../../static/images/wenti.jpg" alt="" width="100%">
    </section>
    
    <section class="page2" onclick="mantis.requestChat()">
      <img src="../../static/images/chengzhnag.jpg" alt="" width="100%">
    </section>
    
    
    <section class="page2" onclick="mantis.requestChat()">
      <img src="../../static/images/dedao.jpg" alt="" width="100%">
    </section>
    
    
    <section class="page2" onclick="mantis.requestChat()">
      <img src="../../static/images/laoshi.jpg" alt="" width="100%">
    </section>
    
    <section class="page2" onclick="mantis.requestChat()">
      <img src="../../static/images/pingjia.jpg" alt="" width="100%">
    </section>
    
    <section class="page2" onclick="mantis.requestChat()">
      <img src="../../static/images/fangshi.jpg" alt="" width="100%">
    </section>
    <div class="footer">
      <div class="content" @click="startWxPay">
        <div v-if="isPay">您已购课，去学习</div>
        <div v-else>
          ¥8.9元 立即报名{{minute}}:{{second}}
        </div>
      </div>
    </div>
    <section class="openBox" v-show="dialogPay">
      <div class="top">
        <div class="text1" style="font-size:.4rem;margin-bottom: .1rem">你真的要放弃吗？</div>
        <div class="text2" style="font-size: .3rem">只要一瓶酱油的钱，就能影响孩子的一生</div>
      </div>
      <div class="bottom">
        <div @click="cancelDialog">残忍拒绝</div>
        <div @click="startWxPay">改变孩子</div>
      </div>
    </section>
  </div>
</template>

<script>
  import {createWXPay2, getUserIsPay, isPay} from "../api/home";
  import countTo from 'vue-count-to';
  
  export default {
    name: "NiceHome",
    components: {countTo},
    data() {
      return {
        openId: '',
        dialogPay: false,
        minutes: 10,
        seconds: 0,
        startVal: 254,
        endVal: 0,
        wxCode: '',
        isPay: false,
        isPayMessage: '￥8.9 立即报名',
        delayClick: 2,
        delayIsClick: false
      }
    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    },
    watch: {
      wxCode: {
        handler(val) {
          this.getWxCode(val)
        }
      }
    },
    created() {
      this.wxCode = window.__globalCode
      // console.log('nan created  this.wxCode=================>', this.wxCode)
      this.intentRegister()
      // 取随机数进行倒计时
      this.startVal = this.commentsContent(1)[0]
      // 支付时间倒计时
      this.add()
      // 按钮倒计时后可点击
      // this.goGroupRecord()
    },
    methods: {
      cancelDialog() {
        this.dialogPay = false
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
      goGroupRecord() {
        // 已经支付成功
        if (this.isPay) {
          return
        }
        let _this = this;
        let time = window.setInterval(function () {
          if (_this.delayClick > 0) {
            _this.delayClick--;
          } else {
            clearInterval(time);
            _this.startWxPay()
          }
        }, 1000);
      },
      /**
       * 取随机数
       *
       * @date 2019/9/22
       * @author nan
       */
      commentsContent(count) {
        // 引入json数据
        let commentsJsonList = []
        commentsJsonList.push(245)
        commentsJsonList.push(123)
        commentsJsonList.push(189)
        commentsJsonList.push(173)
        commentsJsonList.push(223)
        commentsJsonList.push(166)
        commentsJsonList.push(99)
        commentsJsonList.push(278)
        commentsJsonList.push(208)
        // 防止出现重复的数据set
        let set = new Set()
        while (set.size < count) {
          // 取随机数
          let number = Math.round(Math.random() * commentsJsonList.length)
          if (number === commentsJsonList.length) {
            // 它不是退出一个循环，而是开始循环的一次新迭代
            continue
          }
          set.add(number)
        }
        let commentsList = []
        set.forEach(n => {
          // 随机数push到数组里面
          commentsList.push(commentsJsonList[n])
        })
        return commentsList
      },
      /**
       * 获取code
       *
       * @date 2019/9/22
       * @author nan
       */
      intentRegister() {
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        // wx0b2a2de1d89dbc61
        let appid = 'wx4a597f8c6a839610'
        
        // if (isAndroid) {
        // console.log('nan intentRegister--------->', this.wxCode === '')
        if (this.wxCode === '') {
          let url = 'http://yujianzky.51nicelearn.com/onlinebuy/#/nicehome'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        }
        // }
      },
      startWxPay() {
        // 已经支付成功
        if (this.isPay) {
          window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/nicecode';
          return
        }
        // 等界面刷新后可点击按钮
        // if (!this.delayIsClick) {
        //   return
        // }
        // this.wxCode = window.__globalCode;
        // let openId = window.__globalOpenId;
        let appid = window.__globalAppId;
        let local = window.location.href;
        //
        // console.log('nan startWxPay code 1', this.wxCode)
        // console.log('nan startWxPay openId 2', openId)
        // console.log('nan startWxPay appid 3', appid)
        // console.log('nan startWxPay local 4', local)
        
        // 如果没有code 或 openId，则去请求
        // console.log('nan startWxPay', !this.wxCode)
        if (!this.wxCode) {
          // console.log('nan startWxPay', '走这了？')
          // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0b2a2de1d89dbc61&redirect_uri=
          // http://cps.dianping.com/weiXinRedirect&response_type=code&scope=snsapi_base
          // let url = 'http://yujianzky.51nicelearn.com/onlinebuy/#/nicehome'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
          
          // console.log('nan startWxPay-------->', openId)
        } else {
          // 调用接口
          let vm = this
          // 调用接口
          let params = {
            'subject': '亲子关系课',
            'course_id': 2,
            'openid': this.openId
          }
          createWXPay2(params).then(res => {
            console.log('nan res1------>', res)
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
      getWxCode(val) {
        console.log('nan getWxCode--=======================->', val)
        if (this.wxCode !== '') {
          let data = {}
          data.code = this.wxCode
          getUserIsPay(data).then(res => {
            console.log('nan 获取openId--->', res)
            if (res.status) {
              this.openId = res.result.openid
              isPay(this.openId, 2).then(res => {
                console.log('nan res 是否购买', res)
                this.isPay = res.status
                this.isPayMessage = res.status ? '您已购课，去学习' : '￥8.9 立即报名';
              })
            }
          })
        }
      },
      onBridgeReady(params) {
        // console.log('nan onBridgeReady', params)
        let vm = this
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
              window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/nicecode'
            } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
              // console.log('nan ', '取消了支付')
              vm.dialogPay = true
            } else {
              alert('支付失败')
            }
          });
      },
    }
  }
  
  
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
  window.__globalOpenId = docCookies.getItem('openId')
  // wx0b2a2de1d89dbc61
  window.__globalAppId = 'wx4a597f8c6a839610'
</script>
<style scoped>
  @import "../../static/css/wxse.css";
</style>


