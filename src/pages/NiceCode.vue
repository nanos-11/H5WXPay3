<template>
  <div>
    <div class="box" style="margin-top: 100px">
      <div class="line code">
        添加微信号或长按保存下方二维码添加您的学习专属班
      </div>
      <img src="../../static/images/codewx_1.jpg" alt="">
    </div>
    <div class="line">
    </div>
  </div>
</template>

<script>
  import {pushHistory} from '../utils/util.js' // 引入工具类
  export default {
    name: "NiceCode",
    mounted() {
      pushHistory()
      // 监听历史记录点, 添加返回事件监听
      window.onpopstate = () => {
        this.$router.push("/nicehome")  //输入要返回的上一级路由地址
      }
    },
    created() {
      // 取随机数进行倒计时
      // this.codeImg = this.commentsContent(1)[0]
      this.getCodeImg()
    },
    methods: {
      /**
       * 读取json文件
       *
       * @date 2019/9/24
       * @author nan
       */
      getCodeImg() {
        // let imgList = require('../../static/js/pca-code')
      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: auto;
    margin: 0 auto
  }
  
  .box img {
    width: 80%;
    height: 80%;
    padding: 0 0.8rem;
  }
  
  .line {
    width: 100%;
    /*height: 3rem;*/
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.4rem;
  }
  .code {
    padding: 0 0.7rem;
  }
</style>
