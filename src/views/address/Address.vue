<template>
  <top-title pageTitle="地址管理" />
  <div class="main">
    
    <div class="addressList">
        <div class="addressList__item">
            这是第1个地址
        </div>
        <div class="addressList__item">
            这是第2个地址
        </div>
    </div>
  </div>
</template>
<script>
import TopTitle from "../../components/topTitle/TopTitle.vue";
export default {
  name: "Address",
  components: { TopTitle }
};
</script>
<style lang="scss" scoped>
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.1rem;
  padding-top: .24rem;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  background: #f5f5f5;
  .addressList{
    margin:.24rem .72rem 0rem;
    &__item{
      line-height: .72rem;
      background: #fff;
      padding: 0rem .36rem;
      font-size: .28rem;
    }
  }
}
</style>
