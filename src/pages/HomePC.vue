<template>
  <div>
    <div id="bannerss">
      <ul id="banner_img">
        <img src="../../static/images/yj_banner.jpg" width="100%"/>
      </ul>
    </div>
    <div class="wrap">
      <div class="content">
        <section class="baominfon">
          8人正在拼团，可直接参团
        </section>
        <section class="tuan">
          <div class="leftbox">
            <div class="imgs"><img src="../../static/images/iconimg.png" alt=""></div>
            <div>韩亦如</div>
          </div>
          <div class="rightbox">
            <div class="timesbox ">
              <h3 class="h1s">还剩 <span style="color: crimson">1</span> 人成团</h3>
              <h3 class="h1s">
                剩余 00:{{minute}}:{{second}}
              </h3>
            </div>
            <div class="btn">
              <div class="btns" @click="intentRegister(1)" style="cursor:pointer">去参团</div>
            </div>
          </div>
        </section>
        <section class="baominfon" style="border-top: none">
          报名流程
        </section>
      </div>
      <div id="ly" style="position: fixed; bottom: 0px; display: block;">
        <div style="width: 1000px;margin: 0 auto">
          <div class="ly_left">
            <div class="font1">¥699</div>
            <div class="font2" @click="intentRegister(2)">原价购买</div>
          </div>
          <div class="ly_right">
            <div class="font1">¥49</div>
            <div class="font2" @click="intentRegister(1)">拼团购</div>
          </div>
        </div>
      </div>
    </div>
    <div class="advertising">
      <img src="../../static/images/yj_center.jpg" alt="" width="100%">
    </div>
    
    <div style="background:#333333;" class="footer ">
      <div class="column">
        <div class="f-l ov mar-l-10">
          <p class="mar-t-5">愈见幸福（北京）教育科技有限公司</p>
        </div>
      </div>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: "HomePC",
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
        this.$router.push({name: 'payPc', params: {type: type}})
      }
    }
  }
</script>
<style scoped>
  @import "../../static/css/stylepc.css";
</style>


