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
          <div class="btns" @click="intentRegister">去参团</div>
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
      <div class="banner"><img src="../../static/images/bac3.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac4.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac5.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac6.png" alt="" width="100%"></div>
    </section>
    <section class="page1">
      <div class="banner"><img src="../../static/images/bac7.png" alt="" width="100%"></div>
    </section>
    <section class="buybox">
      <div class="buyleft" @click="intentRegister(1)">
        <div class="fon1">¥199</div>
        <div class="fon2">单独购买</div>
      </div>
      <div class="buyright" @click="intentRegister">
        <div class="fon1">¥49</div>
        <div class="fon2">一键参团</div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "RegisterPhone",
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
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let appid = 'wx0b2a2de1d89dbc61'
        if (isAndroid) {
          let url = 'http://yujianzky.51nicelearn.com/onlinebuy/registerPhone'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        } else {
          this.$router.push({name: 'registerPhone', params: type})
        }
      }
    }
  }
</script>
<style scoped>
  @import "../../static/css/main.css";
</style>


