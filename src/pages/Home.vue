<template>
  <div>
    <section class="page1" onclick="mantis.requestChat()">
      <div class="banner"><img src="../../static/images/banner.jpg" alt="" width="100%"></div>
    </section>
    <section class="baominfon">
      8人正在拼团，可直接参团
    </section>
    <section class="tuan">
      <div class="leftbox">
        <div class="imgs"><img src="../../static/images/iconimg.png" alt=""></div>
        <div style="font-size:.3rem;line-height: 1rem">韩亦如</div>
      </div>
      <div class="rightbox">
        <div class="timesbox ">
          <h3 class="h1s">还剩 <span style="color: crimson">1</span> 人成团</h3>
          <h3 class="h1s">
            剩余 00:{{minute}}:{{second}}
          </h3>
        </div>
        
        <div class="btn">
          <div class="btns" @click="intentRegister(1)">去参团</div>
        </div>
      
      </div>
    </section>
    <section class="baominfon" style="border-top: none">
      报名流程
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac1.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac2.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac3.jpg" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac42.jpg" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac43.jpg" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac5.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac6.jpg" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac7.jpg" alt="" width="100%"></div>
      <div><br></div>
    </section>
    <section class="buybox">
      <div class="footerbox">
        <div class="buyleft" @click="intentRegister(2)">
          <div class="fon1">¥699</div>
          <div class="fon2">原价购买</div>
        </div>
        <div class="buyright" @click="intentRegister(1)">
          <div class="fon1">¥49</div>
          <div class="fon2">一键参团</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        minutes: 30,
        seconds: 0,
      }
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
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    },
    created() {
      this.add()
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
      intentRegister(type) {
        if (this.is_weixin()) {
          let u = navigator.userAgent, app = navigator.appVersion;
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          let appid = 'wx4a597f8c6a839610'
          // console.log('nan intentRegister', isiOS)
          if (isiOS) {
            window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/registerPhone?type=' + type
          } else {
            // http://yujianzky.51nicelearn.com/onlinebuy/#/registerPhone/
            let url = 'http://yujianzky.51nicelearn.com/onlinebuy/#/registerPhone?type=' + type;
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
              + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
            // this.$router.push({name: 'registerPhone', params: {type: type}})
          }
        } else {
          window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/registerPhone?type=' + type
        }
      }
    }
  }
</script>
<style scoped>
  @import "../../static/css/main.css";
</style>


