<template>
  <div>
    <div class="box">
      <div class="line code">
        添加老师微信，发送支付凭证，确认支付有效后，等待老师拉入班级群
      </div>
      <div class="img">
        <img src="../../static/images/coder3.jpg" alt="">
      </div>
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
  import {pushHistory} from '../utils/util.js' // 引入工具类
  export default {
    name: "CodePc",
    mounted() {
      pushHistory()
      // 监听历史记录点, 添加返回事件监听
      window.onpopstate = () => {
        //输入要返回的上一级路由地址
        window.location.href = 'http://yujianzky.51nicelearn.com/onlinebuy/#/homePc'
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
  @import "../../static/css/stylepc.css";
  .box {
    width: 500px;
    height: 500px;
    border: 1px solid #e9e9e9;
    margin: 100px auto;
    padding: 50px;
  }
  
  .box .line {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
  }
  
  .box .img {
    width: 300px;
    height: 300px;
    margin: auto;
  }
  
  .box .img img {
    width: 100%;
    height: 100%;
  }
</style>
