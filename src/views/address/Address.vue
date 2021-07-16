<template>
  <top-title pageTitle="地址管理" buttonText="新建"  okClick="true" />
  <div class="main">
    <div class="address_title" v-if="addressList.length>0?true:false">我的收货地址</div>
    <div class="addressList">

      <router-link 
      v-for="item in addressList"
      :key="item._id"
      :to="`/address/edit/${item._id}`
      ">
        <div class="address">
          <div class="address__left">
            <p class="address__text">
              <span class="address__text__name">{{item.name}}</span
              ><span class="address__text__phone">{{item.phone}}</span>
            </p>
            <p class="address__content">{{`${item.city}${item.department}${item.houseNumber}`}}</p>        
          </div>
          <div class="address__right">
            <span class="iconfont icon-fanhui1"></span>
          </div>
          <div v-if="item.defaultAddress" class="address_default">默认</div>
        </div>
     </router-link>

    </div>
		
	<NullData v-if="addressList.length>0?false:true" text="暂无地址数据"/>
  </div>
</template>
<script>
import NullData from "../../components/toast/NullData.vue";
import {ref} from 'vue';
import {get} from '../../utils/request';
import TopTitle from "../../components/topTitle/TopTitle.vue";
const useAddressEffect=()=>{
    const addressList = ref([]);
    const getAddressList= async()=>{
      try{
        const result= await get('/api/user/address');      
        if (result?.errno === 0&&result?.data?.length) {
          addressList.value = result.data;             
        }
      }catch(err){console.log(err)}
    }

    return {addressList,getAddressList}
}

export default {
  name: "Address",
  components: { TopTitle,NullData},
  setup(){
    const {addressList,getAddressList} = useAddressEffect();
    getAddressList();
    return { addressList}
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";

.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.1rem;
  padding-top: 0.24rem;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  background: #f5f5f5;
  .address_title {
    margin: 0.06rem 0.36rem 0.28rem;
    font-size: 0.28rem;
  }
  .addressList {
    margin: 0.12rem 0.36rem 0rem;
    .address {
      background: #fff;
      padding: 0.32rem 0rem .32rem .1rem;
      font-size: 0.28rem;
      margin-bottom: 0.3rem;
      border-radius: 0.06rem;
      position: relative;
      display: flex;
      align-content: center;
      justify-content: space-between;
      &__left {
        padding: 0rem 0.3rem;
        flex: 1;
      }
      &__right {
        padding: 0rem 0.24rem 0rem 0rem;
        display: flex;
        align-items: center;
        color: $searchbox-color;
      }
      &__title {
        font-size: 0.32rem;
        margin-bottom: $layout-margin-bottom;
        font-weight: bold;
      }
      &__content {
      padding: 0.2rem 0rem 0.05rem;
      font-size: 0.28rem;
      line-height: 1.6;
      }
      &__text {
        font-size: 0.28rem;
        padding-left:.04rem;
        color:$content-notice-fontColor;
        &__name{
          width:1.8rem;
          display: inline-block;
        }
      }
      &_default{
        position: absolute;
        right: 0;
        top: 0;
        background: #0091ff;
        color: #fff;
        padding: .04rem .1rem .08rem .14rem;
        font-size: 0.22rem;
        border-radius: 0rem .06rem 0rem 0.06rem;
      }
    }
  }
}
</style>
