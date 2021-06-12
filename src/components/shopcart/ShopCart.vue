<template>
  <div class="shopCart">
    <div class="shopCart__title">
      <router-link
        class="shoptoLink"
        v-if="showLink ? true : false"
        :to="`/shop/${shopId}`"
      >
      </router-link>
      <div class="shopCart__title__shopname">{{ ShopInfos.shopName }}</div>
      <div class="shopCart__title__right">
        <div class="shopCart__title__shopimg">
          <img :src="ShopInfos.shopImg" alt="" />
        </div>
        <div class="shopCart__title__icon" v-if="showLink ? true : false">
          <span class="iconfont icon-fanhui1"></span>
        </div>
      </div>
    </div>
    <template
      v-for="(item,index) in cartProductList"
      :key="item?._id"
    >
    <div
      class="productList__layout_item"
      v-if='index>=showNum?showList:true'
    >
      <div class="productList__item" v-if="item?._id">
        <div class="babyItem">
          <div :class="{ babyItem__img: true, smallImg: true }">
            <img :src="item.imgUrl" :alt="item.name" />
          </div>
          <div class="babyItem__text">
            <div class="babyItem__text__title">{{ item.name }}</div>
            <p class="babyItem__text__price">
              <span class="babyItem__text__price_now"
                ><i>&yen;</i>{{ item.price }} /件 , 共{{ item.count }}件</span
              >
              <span class="babyItem__text__price_total">
                <i>&yen;</i>{{ (item.price * item.count).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <div class="showAlllist" v-show="showNum?true:false"  v-if='showList?false:true' @click="handleShowList">
    <p>共计{{cartCalc.total}}件，展开</p>
    <span class="iconfont icon-fanhui1"></span>
  </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import { useCommonCartEffect ,useShopCartEffect} from "../../components/effects/cartEffect";


export default {
  name: "ShopCart",
  props: ["shopId", "showLink",'showNum'],
  setup(props) {
    const { cartList} = useCommonCartEffect();

    const { ShopInfos, cartProductList,cartCalc} = useShopCartEffect( props.shopId,
cartList );

    //列表隐藏和展开
    const showList=ref(false);
    if(cartProductList.value.length>props.showNum){ //当购物车商品数量 大于 showNum时，才显示
        showList.value=false;
    }else{
        showList.value=true;
    }
    const handleShowList=()=>{
      showList.value = true;
    }

    return { ShopInfos,showList,handleShowList, cartProductList,cartCalc };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.shopCart {
  margin: 0rem 0.36rem 0.32rem;
  background: #fff;
  padding: 0.32rem 0.32rem 0.32rem;
  border-radius: .08rem;
  &__title {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 0.08rem;
    position: relative;
    &__right {
      display: flex;
      align-items: center;
    }
    &__shopname {
      font-size: 0.32rem;
      font-weight: bold;
      line-height: 0.56rem;
    }
    &__shopimg {
      width: 0.56rem;
      height: 0.56rem;
      background: $searchBgcolor;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    &__icon {
      color: $searchbox-color;
      margin-left: 0.1rem;
      height: 0.56rem;
      line-height: 0.56rem;
    }
    .shoptoLink {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .productList__layout_item {
    position: relative;
    padding: 0.2rem 0rem;
  }
  .babyItem {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    &__img {
      width: 1.36rem;
      height: 1.36rem;
      margin-right: 0.24rem;
      img {
        width: 100%;
      }
    }
    &__img.smallImg {
      width: 0.92rem;
      height: 0.92rem;
    }
    &__text {
      flex: 1;
      &__title {
        font-size: 0.28rem;
        line-height: 0.36rem;
        margin-bottom: 0.14rem;
        @include ellipsis(1);
      }

      &__price {
        color: $content-notice-fontColor;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 0.44rem;
        &_now {
          font-size: 0.24rem;
          margin-right: 0.16rem;
          
        }
        &_total {
          font-size: 0.28rem;
          color: $content-fontColor-black;
        }
        i {
          font-size: 0.2rem;
        }
      }
    }
  }
  .showAlllist{
    display: flex;
    justify-content: center;
    align-content: center;
    color:$content-notice-fontColor;
    background: $pageBgColor;
    line-height: .72rem;
    font-size: .28rem;
    .iconfont{
       transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      -o-transform: rotate(90deg);
      color: $searchbox-color;
    }
  }
}
</style>
