<template>
  <div>
    <div class="box">
      <img src="../../static/images/erweima.png" alt="">
    </div>
    <div class="line">
      微信号：lubojiaoyu007
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
    width: 100%;
    height: auto;
    margin: 0 auto
  }
  
  .box img {
    width: 100%;
    height: 100%;
  }
  
  .line {
    width: 100%;
    height: 3rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.4rem;
  }
</style>
