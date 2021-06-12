<template>
      <div class="position">
      <i class="iconfont icon-position"></i>
      <div class="position__text">
        北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
      </div>
      <i class="iconfont icon-remind"></i>
    </div>
</template>

<script>
export default {
    name:'position'
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.position {
  display: flex;
  align-items: center;
  padding-top: .36rem;
  margin-bottom: $layout-margin-bottom;
  &__text {
    flex: 1;
    font-size: 0.32rem;
    line-height: 0.44rem;
    margin-left: 0.06rem;
    @include ellipsis(1);
  }
  .iconfont {
    font-size: 0.52rem;
  }
}

</style>