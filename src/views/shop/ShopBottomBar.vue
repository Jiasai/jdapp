<template>
  <transition
    enter-active-class="animation__opacityEnter"
    leave-active-class="animation__opacityLevae"
    appear
  >
    <div
      class="mask"
      v-show="cartShow && totalChecked"
      @click="changCartShow"
    ></div>
  </transition>
  <transition
    enter-active-class="animation__flyEnter"
    leave-active-class="animation__flyLevae"
    appear
  >
    <div class="productList" v-show="cartShow && totalChecked">
      <div class="productList__top">
        <div class="productList__top__selecAll">
          <div class="productList__top__selecAll__icon">
            <span
              class="iconfont icon-xuanzhongduigou"
              @click="() => unSelecAllCart(shopId)"
              v-if="calculations.selectAll"
            ></span>
            <span
              class="iconfont icon-unchecked"
              @click="() => SelecAllCart(shopId)"
              v-if="!calculations.selectAll"
            ></span>
          </div>
          全选
        </div>
        <div class="productList__top__clear" @click="() => clearCart(shopId)">
          清空购物车
        </div>
      </div>
       <div class="productList__main__layout">
      <div
        class="productList__layout_item"
        v-for="item in productList"
        :key="item._id"
      >
        <div class="productList__layout_item_checked" v-if="item?._id">
          <span
            class="iconfont icon-xuanzhongduigou"
            @click="() => CartItemUnCheck(shopId, item._id)"
            v-if="item?.checked"
          ></span>
          <span
            class="iconfont icon-unchecked"
            @click="() => CartItemChecked(shopId, item._id)"
            v-if="!item?.checked"
          ></span>
        </div>
        <div class="productList__item" v-if="item?._id">
          <BabyItem :item="item" :noneSales="true" :smallImg="true" />
          <AddBay :productId="item._id" :item="item" :layoutRight="true" />
        </div>
      </div>
      </div>
    </div>
  </transition>

  <div class="shopBootomBar">
    <div class="shopBootomBar__cartImg" @click="changCartShow">
      <img src="../../assets/images/cartImg.png" alt="" />
      <span
        class="shopBootomBar__cartImg__num"
        v-show="calculations.total ? true : false"
        >{{ calculations.total }}</span
      >
      <div
        :class="{
          shopBootomBar__cartImg__open: true,
          cartclose: cartShow && totalChecked ? true : false
        }"
      >
        <span class="iconfont icon-shang"></span>
      </div>
    </div>
    <div class="shopBootomBar__cartTotal">
      总计：<span><i>&yen;</i>{{ calculations.price }}</span>
    </div>
    <div
      class="shopBootomBar__orderButton"
      v-if="calculations.isPush ? true : false"
      @click="() => handleOrderCreation(shopId)"
    >
      去结算
    </div>
    <div
      class="shopBootomBar__orderGrey"
      v-if="calculations.isPush ? false : true"
    >
      去结算
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from "../../components/effects/cartEffect";

import BabyItem from "./BabyItem";
import AddBay from "./AddBay";

export default {
  name: "ShopBottomBar",
  components: { BabyItem, AddBay },
  setup() {
    const {
      shopId,
      calculations,
      productList,
      cartShow,
      changCartShow,
      totalChecked,
      CartItemChecked,
      CartItemUnCheck,
      clearCart,
      SelecAllCart,
      unSelecAllCart,
      handleOrderCreation
    } = useCommonCartEffect();

    return {
      shopId,
      calculations,
      productList,
      cartShow,
      changCartShow,
      totalChecked,
      CartItemChecked,
      CartItemUnCheck,
      clearCart,
      SelecAllCart,
      unSelecAllCart,
      handleOrderCreation
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";

//飞入飞出动画
@keyframes flyEnter {
  0% {
    transform: translateY(1200px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes flyLevae {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(1200px);
  }
}

//淡隐淡现动画
@keyframes opacityEnter {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes opacityLevae {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animation__opacityEnter {
  animation: opacityEnter 0.5s;
}
.animation__opacityLevae {
  animation: opacityLevae 0.5s;
}
.animation__flyEnter {
  animation: flyEnter 0.3s ease-out;
}
.animation__flyLevae {
  animation: flyLevae 0.3s linear;
}

.shopBootomBar {
  position: relative;
  @include bottomBar();
  padding: 0rem;
  &__cartImg {
    width: 1.52rem;
    height: 100%;
    padding: 0.2rem 0rem;
    text-align: center;
    position: relative;
    img {
      width: 0.56rem;
    }
    &__num {
      background: $redColor;
      color: #fff;
      @include fontSize8px();
      min-width: 0.68rem;
      min-height: 0.28rem;
      padding: 0.08rem;
      border-radius: 0.6rem;
      position: absolute;
      top: -0.14rem;
      transform-origin: left center;
      left: 0.96rem;
    }
    &__open {
      position: absolute;
      left: 1.1rem;
      top: 32%;
      font-size: 0.24rem;
      color: $searchbox-color;
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
    }
    .cartclose {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
      -o-transform: rotate(180deg);
    }
  }
  &__cartTotal {
    font-size: 0.24rem;
    flex: 1;
    padding: 0rem 0.3rem 0rem 0.4rem;
    span {
      font-size: 0.36rem;
      color: $redColor;
      font-weight: bold;
      i {
        font-size: 0.28rem;
      }
    }
  }
  &__orderButton {
    background: $blueColor;
    color: #fff;
    font-size: 0.28rem;
    height: 100%;
    width: 2rem;
    text-align: center;
    line-height: 0.96rem;
    position: relative;
    &__a {
      display: block;
      width: 100%;
      height: 100%;
      color: #fff;
    }
  }
}
.shopBootomBar__orderGrey {
  height: 100%;
  width: 2rem;
  font-size: 0.28rem;
  background: $blueColor;
  color: #fff;
  text-align: center;
  line-height: 0.98rem;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  opacity: 0.45;
}
.productList {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.98rem;
  background: #fff;
  z-index: 49;
  border-top-left-radius: .2rem;
  border-top-right-radius: .2rem;
     &__main__layout{
       max-height: 8.3rem;
      overflow-y: auto; 
     }

  &__item {
    display: flex;
    flex: 1;
    align-content: center;
    padding: 0.2rem 0.16rem;
  }
  &__top {
    padding: 0.2rem 0.36rem 0.2rem 0.28rem;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $border-color;
    &__selecAll {
      display: flex;
      align-items: center;
      &__icon {
        width: 0.44rem;
        height: 0.54rem;
        position: relative;
        margin-right: 0.16rem;
        padding-top: 0.04rem;
        .iconfont {
          position: absolute;
        }
        .icon-xuanzhongduigou {
          color: $blueColor;
        }
        .icon-unchecked {
          color: $searchbox-color;
        }
      }
    }
    &__clear {
      color: $searchbox-color;
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 48;
}
.productList__layout_item {
  display: flex;
  align-items: center;
  padding: 0rem 0.2rem 0rem 0rem;
  &_checked {
    padding: 0.16rem 0.06rem 0.16rem 0.3rem;
    position: relative;
    width: 0.84rem;
    height: 0.84rem;
    .iconfont {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .icon-unchecked {
      color: $searchbox-color;
    }
    .icon-xuanzhongduigou {
      color: $blueColor;
    }
  }
}
</style>
