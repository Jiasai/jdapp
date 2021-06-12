<template>
  <div class="searchbox__layout">
    <div class="searchbox">
      <i class="iconfont icon-search"></i>
      <div class="searchbox__from">
        <input
          :class="{'searchbox__from__input':true,'searchbox__from__inputHolder':textGrey?true:false}"
          type="text"
          :placeholder="placeholder"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props:{placeholder:String,textGrey:null}
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
.searchbox__layout{flex:1}
.searchbox {
  height: 0.64rem;
  background-color: $searchBgcolor;
  border-radius: 28px;
  display: flex;
  align-items: center;
  padding: 0 0.24rem;
  margin-bottom: $layout-margin-bottom;
  .iconfont {
    color: $searchbox-color;
  }
  &__from {
    flex: 1;
    margin-left: 0.1rem;
    &__input {
      width: 100%;
      background: none;
      font-size: 0.28rem;
      color: $content-fontColor;
    }
    &__input::-webkit-input-placeholder {
      color: $content-fontColor;
    }
    &__input:-moz-placeholder {
      color: $content-fontColor;
    }
    &__input::-moz-placeholder {
      color: $content-fontColor;
    }
    &__input:-ms-input-placeholder {
      color: $content-fontColor;
    }
    &__inputHolder::-webkit-input-placeholder {
      color: $searchbox-color;
    }
    &__inputHolder:-moz-placeholder {
      color: $searchbox-color;
    }
    &__inputHolder::-moz-placeholder {
      color: $searchbox-color;
    }
    &__inputHolder:-ms-input-placeholder {
      color: $searchbox-color;
    }
  }
}
</style>
