<template>
  <div class="pay-page">
    
    <div class="footerbox">
      <div class="logobox"><img src="../../static/images/yujianlogo.png" alt=""></div>
      <div class="fon1box">·支付中心</div>
    </div>
    <div class="centerbox">
      <div class="bacimg">
        <img src="../../static/images/bacimg.png" alt="">
      </div>
      <div class="verify-tel">
        <div class="tel-space">
          <span>手机号:</span>
          <div class="tel-icon">
            <img src="../../static/images/tel-icon.png">
          </div>
          <input type="tel" placeholder="手机号" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" v-model="phone">
        </div>
        <div class="code-space">
          <span>验证码:</span>
          <div class="input-space">
            <div class="code-icon"><img src="../../static/images/code-icon.png"></div>
            <input type="number" placeholder="验证码" oninput="value=value.replace(/[^\d]/g,'')" maxlength="6"
                   v-model="code"></div>
          <div class="tiktok" @click="getCode" v-show="show">获取验证码</div>
          <div v-show="!show" class="tiktok" style="color:#ffffff;">{{count}}秒</div>
        </div>
      </div>
      <div class="amountbox">
        <div class="amountbox_left" @click="payOrder(2)" style="cursor:pointer">
          <div class="font1">¥2099</div>
          <div class="font2">原价购买</div>
        </div>
        <div class="amountbox_right" @click="payOrder(1)" style="cursor:pointer">
          <div class="font1">¥49</div>
          <div class="font2">拼团购</div>
        </div>
      </div>
      <div class="paybox">
        <div class="jiner">
          <span>应付金额：</span><span>¥{{payPrice}}元</span><span>&nbsp;&nbsp;&nbsp;请选择支付方式</span>
        </div>
        <div class="jiner_box">
          <div class="weixin">
            <div @click="loginPhone(1)">
              <div class="icon">
                <img src="../../static/images/wxpay.png" alt="">
              </div>
              微信支付
            </div>
          </div>
          <div class="zhifubao">
            <div @click="loginPhone(2)">
              <div class="icon">
                <img src="../../static/images/alipay.jpg" alt="">
              </div>
              支付宝支付
            </div>
          </div>
          <div id="canvas"></div>
        </div>
      </div>
      <div class="kechen">
        <img src="../../static/images/bacimg2.png" alt="">
      </div>
    </div>
    <div style="background:#333333;margin-top: 40px" class="footer">
      <div class="column">
        <div class="f-l ">
          <p class="mar-t-5">愈见幸福(北京)教育科技有限公司</p>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
  import "../../static/js/cover.min.js"
  import QRCode from 'qrcodejs2'  // 引入qrcode
  import {isPay, getBindVerCode, loginPhone, createAliPay, getPhoneDataPC, createWXPay} from "../api/home";
  
  /**
   * 验证手机号是否正确
   *
   * @date 2019/6/21
   * @author nan
   */
  function verifyPhone() {
    if (this.phone === '') {
      this.message = "请输入手机号";
      alert(this.message)
      return false
    }
    let pattern = /^1[23456789]\d{9}$/
    if (pattern.test(this.phone) !== true) {
      this.message = "请输入正确的手机号";
      alert(this.message)
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
      alert(this.codeMessage)
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
    name: "PayPC",
    data() {
      return {
        // 二维码对象
        index: 0,
        qrcode: null,
        minutes: 10,
        seconds: 0,
        address: '',//地址
        message: '',  //提示信息
        codeMessage: '',
        // 获取验证码显示
        show: true,
        // 验证码倒计时
        count: '',
        // 时间默认为null
        timer: null,
        timerPay: null,
        phone: '',
        code: '',
        type: '1',
        payPrice: 0
      };
    },
    watch: {
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
    /**
     * 验证手机号是否 支付过
     *
     * @date 2019/6/28
     * @author nan
     */
    created() {
      this.type = this.$route.params.type;
      this.getAddress()
      this.payPrice = this.type === 1 ? 49 : 2099
    },
    mounted() {
      this.setStyle(this.type)
    },
    methods: {
      payOrder(type) {
        // 1->49 2->2099
        this.type = type
        this.payPrice = type === 1 ? 49 : 2099
        this.setStyle(type)
      },
      // 设置样式
      setStyle(type) {
        if (type === 1) {
          $('.amountbox_right').css('border', '2px solid #f95731')
          $('.amountbox_left').css('border', '2px solid #f3f3f3')
        } else {
          $('.amountbox_right').css('border', '2px solid #f3f3f3')
          $('.amountbox_left').css('border', '2px solid #f95731')
        }
      },
      // 选择支付方式
      payWxAli(type) {
        // 1->wx 2->ali
        if (type === 1) {
          this.createOrder()
        } else {
          this.getAliOrder()
        }
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
            alert(this.message)
          }
        })
        // 获取手机号给螳螂
        getPhoneDataPC(this.phone, this.address).then(res => {
        })
      },
      /**
       * 根据手机号登录或者注册
       * @date 2019/6/19
       * @author nan
       */
      loginPhone(type) {
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
            alert(this.codeMessage)
            return
          }
          if (res.pay_type) {
            alert('该用户已完成支付')
            return
          }
          this.payWxAli(type);
        })
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
          'subject': '7天带你了解心理学',
          'course_id': 3,
          'status': this.type
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
       * 创建订单
       *
       * @date 2019/11/26
       * @author nan
       */
      createOrder() {
        let params = {
          'phone': this.phone,
          'subject': '7天带你了解心理学',
          'course_id': 3,
          'status': this.type,
          'pay_type': 'NATIVE'
        }
        createWXPay(params).then(res => {
          if (res && res.status) {
            this.setQRcode(res.result)
            this.timerPay = setInterval(this.isUserPay, 1000)
          }
        })
      },
      // 生成二维码
      setQRcode(url) {
        if (!this.qrcode) {
          this.qrcode = new QRCode('canvas', {
            width: 132,
            height: 132,
            text: url, // 二维码地址
            colorDark: "#000",
            colorLight: "#fff",
            paddingTop: "23px",
            border: "1px solid #e9e9e9",
          })
        }
        console.log('nan setQRcode', this.qrcode)
      },
      isUserPay() {
        let phone = localStorage.getItem('phone');
        isPay(phone, 3).then(res => {
          if (res && res.status) {
            clearInterval(this.timerPay)
            window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/codePC'
          }
        })
      }
    },
    destroyed() {
      clearInterval(this.timerPay)
    }
  }
</script>

<style scoped lang="css">
  @import "../../static/css/chunkd.css";
  @import "../../static/css/stylepc.css";

</style>
