<template>
  <top-title pageTitle="地址管理" />
  <div class="main">
    地址管理
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
}
</style>
