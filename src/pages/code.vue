<template>
  <div>
    <div class="line code">
      添加微信号或长按保存下方二维码添加您的学习专属班
    </div>
    <div class="box">
      <img src="../../static/images/coder3.jpg" alt="">
    </div>
    <div class="line">
      微信号：13141204632
    </div>
  </div>
</template>

<script>
  import {pushHistory} from '../utils/util.js' // 引入工具类
  export default {
    name: "coder",
    mounted() {
      pushHistory()
      // 监听历史记录点, 添加返回事件监听
      window.onpopstate = () => {
        this.$router.push("/home")  //输入要返回的上一级路由地址
      }
    },
  }
</script>

<style scoped>
  .box {
    width: 60%;
    height: auto;
    margin: 0 auto
  }
  
  .box img {
    width: 100%;
    height: 100%;
  }
  
  .line {
    width: 100%;
    /*height: 3rem;*/
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.4rem;
  }
  
  .code {
    padding: 0 0.5rem;
    margin-top: 1rem;
  }
</style>
