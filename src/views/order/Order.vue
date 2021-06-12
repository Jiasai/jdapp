<template>
     <div class="toptitles">
     <top-title :pageTitle="title" :backHide="true" />
     </div>
      <div class="main">
        <template v-for="(item, index) in shopOrderList" :key="index">
             <shop-order :item="item"/>
        </template>
     </div>
    <tab-bar />
      <div class="pageMainBg"></div>
</template>
<script>
import {ref} from 'vue';
import {get} from '../../utils/request';
//获取组件
import TopTitle from "../../components/topTitle/TopTitle.vue";
import TabBar from '../../components/tabBar/tabBar';
import ShopOrder from "../../components/shopcart/ShopOrder.vue";

//请求获得订单的店铺shopId的 list
const useGetShopIdListEffect = () => {
  const shopOrderList=ref([]);
    //发送get请求，拿到订单数据
    const getshopOrderList=async()=>{
      try{
        const result= await get('/api/order');       
         if (result?.errno === 0&&result?.data?.length) {
           shopOrderList.value = result.data;     
         }
      }catch(err){
        console.log(err);
      }
    } 


  return { shopOrderList,getshopOrderList};
}

export default {
    name:'Cart',
    components:{TabBar,TopTitle,ShopOrder},
    setup(){
        const { shopOrderList,getshopOrderList} = useGetShopIdListEffect();
        const title = `我的订单`;
        getshopOrderList();
        return {shopOrderList,title}
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";

.toptitles {
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