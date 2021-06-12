<template>
  <div class="toptitles">
     <top-title :pageTitle="title" :backHide="true" />
  </div>
  <div class="main">
    <template v-for="(id, index) in shopIdList" :key="index">
      <shop-cart :shopId="id" :showLink="true" showNum='3' />
    </template>

    <div class="nullCart" v-if="isNull?true:false">
      <div class="nullCart__img"><img src="../../assets/images/nullCartGrey.png" alt=""></div>
      <div class="nullCart__title">购物车还空空如也哦~</div> 
      <div class="nullCart__button">
        <router-link to='/'>
        去逛逛
        </router-link>
      </div>
    </div>

  </div>

  <tab-bar />
  <div class="pageMainBg"></div>
</template>
<script>
import { ref, computed } from "vue";
import {
  useLocalStorageEffect,
  useCommonCartEffect
} from "../../components/effects/cartEffect";
//获取组件
import TopTitle from "../../components/topTitle/TopTitle.vue";
import TabBar from "../../components/tabBar/tabBar";
import ShopCart from "../../components/shopcart/ShopCart.vue";

//获得购物车店铺shopId的 list
const useGetShopIdListEffect = cartList => {
  const isNull=ref(true);
  const shopIdList = computed(() => {
    const shopidList = [];
    for (let i in cartList) {
      const nullobj= JSON.stringify(cartList[i]?.productList)==='{}';//是否是空对象
      if(!nullobj){
        shopidList.push(i);
        isNull.value=false;
      } 
    }
    return shopidList;
  });
  const num = ref(shopIdList.value.length);
  const title = `我的全部购物车(${num.value})`;

  return { shopIdList, title,isNull };
}

export default {
  name: "Cart",
  components: { TabBar, TopTitle, ShopCart },
  setup() {
    useLocalStorageEffect(); //打开页面时，从本地获取数据

    const { cartList } = useCommonCartEffect();
    const { shopIdList, title,isNull } = useGetShopIdListEffect(cartList);

    return { shopIdList, title,isNull };
  }
};
</script>
<style lang="scss"  scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";

.toptitles{
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  height: 1rem;
  overflow: hidden;
  position: fixed;
  z-index: 50;
}
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.1rem;
  padding-top: $layout-margin-bottom;
  bottom: 0.99rem;
  z-index: 10;
  overflow-y: auto;
}

.nullCart{
  text-align: center;
  position: relative;
  top:50%;
  transform: translateY(-85%);
  &__img{
    opacity: .35;
    width:1.8rem;
    display: inline-block;
    margin-bottom:.14rem;
    img{width:100%}
  }
  &__title{
    font-size: .3rem;
    color:$content-fontColor-grey;
    margin-bottom: .36rem;
  }
  &__button{
    display: inline-block;
    width: 1.8rem;
    height: .64rem;
    line-height: .64rem;
    font-size: .28rem;
    border-radius: .32rem;
    background: $redColor;
    a{
      display: block;
      color:#fff;
      height: 100%;
    }
  }
}


.pageMainBg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $pageBgColor;
  z-index: 1;
}
</style>
