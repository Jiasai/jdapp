<template>
  <div class="shop">
    <div class="shop_img">
      <img :src="item.imgUrl" :alt="item.name" class="shop_pic" />
    </div>
    <div
      :class="{
        shop_text: true,
        'shop_text--border': hideBorder ? false : true
      }"
    >
      <div class="shop_text_title">{{ item.name }}</div>
      <p class="shop_text_subtitle">
        <span v-if="item.sales ? true : false"> 月售{{ item.sales }}+ </span>
        <span v-if="item.expressLimit ? true : false">
          起送￥{{ item.expressLimit }}
        </span>
        <span v-if="item.expressPrice ? true : false">
          基础运费￥{{ item.expressPrice }}
        </span>
      </p>
      <p class="shop_text_Youhui">
        {{ item.slogan }}
      </p>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
export default {
  name: "Shopinfo",
  props: ["item", "hideBorder"]
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.shop {
  display: flex;
  justify-content: flex-start;
  
  &_img {
    flex: 0 0 20%;
    img {
      width: 100%;
    }
  }
  &_text {
    flex: 0 0 76%;
    margin-left: 4%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    &_title {
      font-size: 0.32rem;
      margin-bottom: 0.2rem;
      @include ellipsis(1);
    }
    &_subtitle {
      font-size: 0.24rem;
      margin-bottom: 0.2rem;
      span {
        display: inline-block;
        margin-right: 0.26rem;
      }
    }
    &_Youhui {
      font-size: 0.26rem;
      color: $redColor;
      margin-bottom: 0.3rem;

      @include ellipsis(1);
    }
    &--border:after {
      content: "";
      display: block;
      border-bottom: .02rem solid #f1f1f1;
      margin-bottom: 0.3rem;
    }
  }
}
</style>
