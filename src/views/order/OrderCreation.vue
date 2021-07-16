<template>
    <top-title :whiteColor="true" pageTitle="确认订单" />
  <div class="main">
    <Address :address="address" :handlePushTo="handlePushTo" />
    <shop-cart :shopId="shopId" />
  </div>
  <order-popup v-if="showMask" :closeMask="handleShowMask" :addressId="addressId" />

  <div class="shopBootomBar">
    <div class="shopBootomBar__cartTotal">
      实付金额：<span><i>&yen;</i>{{ calculations.price }}</span>
    </div>
        <div
      class="shopBootomBar__orderButton nullClick"
      v-if="!address?.city"
    >
      提交订单
    </div>
    <div
      class="shopBootomBar__orderButton"
      v-if="address?.city"
      @click="() => handleShowMask()"
    >
      提交订单
    </div>
  </div>
  <div class="pagetopBg"></div>
  <div class="pageMainBg"></div>
</template>

<script>
import { useRouter } from "vue-router";

import {ref} from 'vue';
import {
  useLocalStorageEffect,
  useCommonCartEffect
} from "../../components/effects/cartEffect";

//获取组件
import TopTitle from "../../components/topTitle/TopTitle.vue";
import ShopCart from "../../components/shopcart/ShopCart.vue";
import Address from './Address.vue';
import OrderPopup from './OrderPopup.vue';

//默认地址相关
import {get} from '../../utils/request';
const useAddressEffect=()=>{
  const router = useRouter();
    const address = ref({});
    const addressId = ref('')
    const getAddressList= async()=>{
      try{
        const result= await get('/api/user/address');      
        if (result?.errno === 0&&result?.data?.length>=1) {
          for (const addressItem of result.data) {
              if(addressItem?.defaultAddress){
                address.value = addressItem;
                addressId.value = addressItem._id;
              }
          }                     
        }
      }catch(err){console.log(err)}
    }
    const handlePushTo = () =>{
      router.push(`/address`);
    }
    return {address,getAddressList,handlePushTo,addressId}
}

//展示隐藏弹窗相关逻辑
const useShowMaskEffect=()=>{
    const showMask = ref(false);
    const handleShowMask=()=>{
        showMask.value = !showMask.value;
    }
    return {showMask,handleShowMask}
}


export default {
  name: "OrderCreation",
  components: { TopTitle, ShopCart,Address,OrderPopup},
  setup() {

    useLocalStorageEffect(); //打开页面时，从本地获取数据

    const { shopId, cartList, calculations } = useCommonCartEffect();

    const {showMask,handleShowMask}=useShowMaskEffect();

    //获取默认地址
    const {address,getAddressList,handlePushTo,addressId}= useAddressEffect()
    getAddressList();

    return { shopId, cartList, calculations,showMask,handleShowMask,address,handlePushTo,addressId};
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.15rem;
  bottom: 0.99rem; 
  z-index: 10;
  overflow-y: auto;
}

.shopBootomBar {
  position: relative;
  @include bottomBar();
  padding: 0rem;
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
    &.nullClick{
      opacity:.45;      
    }
    &__a {
      display: block;
      width: 100%;
      height: 100%;
      color: #fff;
    }
  }
}
.pagetopBg {
  height: 3.2rem;
  background-image: linear-gradient(0deg, $pageBgColor 4%, #0091ff 50%);
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.pageMainBg {
  position: absolute;
  top: 3.2rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: $pageBgColor;
  z-index: 1;
}
</style>
