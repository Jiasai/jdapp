<template>
  <div class="top">
    <back-button
      :whiteColor="whiteColor"
      :position="true"
      v-if="backHide ? false : true"
    />
    <div :class="{ top__title: true, titleWhite: whiteColor ? true : false }">
      {{ pageTitle }}
    </div>
  </div>
</template>
<script>
//获取组件
import BackButton from "../../components/Back";
export default {
  name: "TopTitle",
  props: ["whiteColor", "pageTitle", "backHide"],
  components: { BackButton }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
.top {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  z-index: 55;
  justify-content: flex-start;
  padding: 0.2rem 0rem $layout-margin-bottom;
  &__title {
    flex: 1;
    height: 0.7rem;
    line-height: 0.7rem;

    font-size: 0.32rem;
    text-align: center;
  }
  .titleWhite {
    color: #fff;
  }
}
</style>
