<template>
    <div class="address">
      <div class="address__left">
        <div class="address__title">收货地址</div>
        <p class="address__content">北京理工大学国防科技园2号楼10层</p>
        <p class="address__text">
          <span class="address__textP__name">瑶妹（先生）</span
          ><span class="address__text__phone">18911024266</span>
        </p>
      </div>
      <div class="address__right">
        <span class="iconfont icon-fanhui1"></span>
      </div>
    </div>
</template>

<script>
export default {
    name:'Address'
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.address {
  margin: 0rem 0.36rem 0.3rem;
  background: #fff;
  border-radius: 0.08rem;
  padding: 0.32rem 0rem 0.32rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
  &__left {
    padding: 0rem 0.3rem;
    flex: 1;
  }
  &__right {
    padding: 0rem 0.24rem 0rem 0rem;
    display: flex;
    align-items: center;
    color: $searchbox-color;
  }
  &__title {
    font-size: 0.32rem;
    margin-bottom: $layout-margin-bottom;
    font-weight: bold;
  }
  &__content {
    padding: 0rem 0rem 0.16rem;
    font-size: 0.28rem;
    line-height: 1.4;
  }
  &__text {
    font-size: 0.24rem;
    color: $content-fontColor-grey;
  }
}

</style>