<template>
  <div class="shopCart">
    <div class="shopCart__title">
      <div class="shopCart__title__shopname">{{ item.shopName }}</div>
      <div class="shopCart__title__right">
        {{item.isCanceled?'已完成':'已取消'}}
      </div>
    </div>
    <div class="orderContent">
            <div class="product">
              <div
                class="product__item__img"
                v-for="(proItem, index) in item.products"
                :key="index"
              >
                <img :src="proItem.product.imgUrl" :alt="proItem.product.name" />
              </div>
            </div>
            <div class="orderContent__right">
              <div class="orderContent__right__price">&yen; {{orderCalculations.price}}</div>
              <div class="orderContent__right__count">共{{orderCalculations.count}}件</div>
            </div>
  </div>
  </div>
</template>

<script>
import {computed} from 'vue';
const useOrderCalculations=(productList)=>{
    //计算属性
   const orderCalculations=computed(()=>{
     const result={price:0,count:0}
      for(let i in productList){
        const iPrice = productList[i]?.orderSales*productList[i]?.product.price || 0;
        const counts = productList[i]?.orderSales || 0;
        result.price += iPrice;
        result.count += counts;
      }
      result.price = result.price.toFixed(2);
     return result;
   });

    return {orderCalculations}
}

export default {
  name: "ShopCart",
  props: ["item"],
  setup(props) {
   const {orderCalculations}=useOrderCalculations(props.item.products);
    return {orderCalculations};
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.shopCart {
  margin: 0rem 0.36rem $layout-margin-bottom;
  background: #fff;
  padding: 0.32rem 0.32rem 0.12rem;
  border-radius: 0.08rem;
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
  } 
  .orderContent{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: .3rem 0rem 0rem;
    .product {
    flex: 1;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    &__item__img {
      width: 0.8rem;
      height: 0.8rem;
      margin-right: .28rem;
      margin-bottom: .28rem;

      img {
        width: 100%;
      }
    }
  }
  &__right{
    width:1.2rem;
    height: .7rem;
    display: flex;
    flex-direction: column;
    text-align: right;
    justify-content: space-between;
    &__price{
      font-size: .28rem;
      color:$redColor
    }
    &__count{
      font-size: .24rem;
    }
  }
}


}
</style>
