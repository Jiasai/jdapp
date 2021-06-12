<template>
  <div :class="{ addBay: true, layoutRight: layoutRight ? true : false }">
    <span
      class="iconfont icon-jianshao reduce"
      v-if="cartList?.[shopId]?.productList?.[productId]?.count ? true : false"
      @click="reduceCartItemInfo(shopId, productId, item)"
    ></span>
    <span>{{ cartList?.[shopId]?.productList?.[productId]?.count || 0 }}</span>
    <span
      class="iconfont icon-tianjia1 add"
      @click="addCartItemInfo(shopId, productId, item)"
    ></span>
  </div>
</template>

<script>
//购物车相关逻辑
import { useCommonCartEffect } from "../../components/effects/cartEffect";

export default {
  name: "AddBay",
  props: ["productId", "item", "layoutRight"],
  setup() {
    const {
      cartList,
      shopId,
      addCartItemInfo,
      reduceCartItemInfo
    } = useCommonCartEffect();

    return {
      cartList,
      shopId,
      addCartItemInfo,
      reduceCartItemInfo
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.addBay {
  position: absolute;
  right: 0;
  bottom: 0.3rem;
  display: flex;
  span {
    display: inline-block;
    width: 0.52rem;
    height: 0.48rem;
    text-align: center;
    line-height: 0.48rem;
    font-size: 0.28rem;
  }
  .reduce {
    color: #888;
    font-size: 0.38rem;
  }
  .add {
    color: $blueColor;
    font-size: 0.44rem;
  }
}
.layoutRight {
  position: relative;
  width: 1.6rem;
  justify-content: flex-end;
  bottom: initial;
  align-items: center;
}
</style>
