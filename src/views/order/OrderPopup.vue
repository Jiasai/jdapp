<template>
   <div class="mask" @click="()=>closeMask()" v-if="showmask"></div>
   <div class="popup" v-if="showmask">
       <div class="popup__title">进入收银台</div>
       <div class="popup__notice">请尽快完成支付，否则将被取消</div>
       <div class="popup__button">
           <div class="popup__button__cancel" @click="()=>handleSubmitOrder(false)">待会支付</div>
           <div class="popup__button__confirm" @click="()=>handleSubmitOrder(true)">立即支付</div>
       </div>
   </div>
     <Toast v-if="show" :message="toastMessage" :iconstate='iconstate' :showIcon='showIcon' />
</template>
<script>
import {ref} from 'vue';
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import {
  useCommonCartEffect,
  useShopCartEffect
} from "../../components/effects/cartEffect";

import Toast, { useToastEffect } from "../../components/toast/Toast";

//点击创建订单逻辑
const useSubmitOrderEffect=(shopId,ShopInfos,cartProductList,clearCart,showToast)=>{
    const router =  useRouter();
    const showmask=ref(true);
    const handleSubmitOrder=async(isCanceled)=>{
        const products=[];
        for (const item of cartProductList) {
            const productItem={};
            productItem.id=item._id;
            productItem.num=item.count;
            products.push(productItem);
        }
        try{
            const result = await post('/api/order',{
                addressId:'1',
                shopId,
                shopName:ShopInfos.shopName,
                isCanceled,
                products
            });
            if(result?.errno===0){
                showmask.value=false;
                localStorage.shopNull=true; //不让此页面进入（通过路径或浏览器返回）
                if(isCanceled){
                    showToast("支付成功",'success');
                }else{
                    showToast("订单已提交，请尽快支付",'success');                  
                }                   
                clearCart(shopId);
                setTimeout(()=>{
                    if(isCanceled){
                        router.push({ name: "Order" });
                    }else{
                        router.push(`/shop/${shopId}`) 
                    }                       
                },1800);   
            }else{
                showToast("提交失败",'defeat');
            }
        }catch(err){
            showToast("订单提交失败",'defeat');
        }

    }
    return {handleSubmitOrder,showmask}
}

export default {
    name:'OrderPopup',
    props:['closeMask'],
    components:{Toast},
    setup(){
        
    const { shopId, cartList,clearCart} = useCommonCartEffect();

    const { ShopInfos, cartProductList } = useShopCartEffect( shopId,
cartList);

    const { show, toastMessage, showToast,iconstate,showIcon} = useToastEffect();

    const  {handleSubmitOrder,showmask} = useSubmitOrderEffect(shopId,ShopInfos.value,cartProductList.value,clearCart,showToast);

    

    return { handleSubmitOrder,showmask,show, toastMessage, showToast,iconstate,showIcon };
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 60;
}
.popup{
    border-radius:.12rem ;
    background: #fff;
    padding: 0.56rem .72rem;
    position: fixed;
    z-index: 61;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-align: center;
    &__title{
        font-size: .36rem;
        font-weight: bold;
        margin-bottom: .2rem;
    }
    &__notice{
        color: $content-fontColor-grey;
        font-size: .28rem;
        margin-bottom: .2rem;
        white-space: nowrap;
    }
    &__button{
        display: flex;
        align-items: center;
        justify-content: center;
        
        &__cancel{
            font-size: .28rem;
            line-height: .68rem;
            height: .72rem;
            width: 1.8rem;
            margin: 0.2rem .1rem 0rem;
            border:.02rem solid #ccc;
            color: $content-notice-fontColor;
            border-radius: .36rem;
        }
        &__confirm{
            font-size:.28rem;
            line-height: .68rem;
            height: .72rem;
            width: 1.8rem;
            margin: 0.2rem .1rem 0rem;
            color:#fff;
            background: $blueColor;
            border-radius: .36rem;
        }
    }
}


</style>