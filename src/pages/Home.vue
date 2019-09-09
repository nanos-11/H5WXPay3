<template>
  <div>
    <section class="page11">
      <img src="../../static/images/boringbanner.png" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring1.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring2.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring3.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring4.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring5.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring6.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring7.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring8.jpg" alt="" width="100%">
    </section>
    <section class="page12">
      <img src="../../static/images/boring9.jpg" alt="" width="100%">
    </section>
    <section class="footer">
      <div class="box">
        <div class="left">
          <img src="../../static/images/price.jpg" alt="" width="100%">
        </div>
        <div class="right" id="btn" @click="intentRegister">
          立即报名
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "RegisterPhone",
    methods: {
      intentRegister() {
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let appid = 'wx0b2a2de1d89dbc61'
        if (isAndroid) {
          let url = 'http://wechatclass.51nicelearn.com/#/registerPhone'
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
            + appid + '&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        } else {
          this.$router.push('registerPhone')
        }
      }
    }
  }
</script>
<style scoped>
  @import "../../static/css/main.css";
</style>


