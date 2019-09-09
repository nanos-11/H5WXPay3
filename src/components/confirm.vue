<template>
    <transition name='comfirm-dialog'>
        <div v-if='isShow' class="confirm-wrapper">
            <slot></slot>
            <div class="wrap" @click='close'></div>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },

  components: {},

  mounted() {},

  computed: {},

  methods: {
    close() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../style/mixin.scss";
.comfirm-dialog-enter,
.comfirm-dialog-leave-to {
  opacity: 0;
}
.comfirm-dialog-enter-active {
  transition: opacity 0.2s linear;
}
.comfirm-dialog-leave-active {
  transition: opacity 0.4s linear;
}

.confirm-wrapper {
  @include fullScreen;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    @include fullScreen;
    background: #ccc;
    opacity: 0.6;
  }
}
</style>




