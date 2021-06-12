<template>
  <div class="wrapper">
  <div class="shop__top" >
    <back-button :whiteColor="false" />
    <search :placeholder="searchPlaceHolder" :textGrey="false" />
  </div>
  <div class="shop__details__top" >
    <shop-info :item="item" :hideBorder="true" v-show="item.imgUrl" />
  </div>

  <div class="main">
    <main-tab @changContentData="handleChangContent" />
    <main-content :tab="tab" />
      
  </div>
</div>
<shop-bottom-bar />
</template>

<script>
import {
  ref,
  reactive,
  toRefs,
  provide,
  onRenderTracked
} from "vue";

import { get,setStorage,getStorage } from "../../utils/request";
import { useRoute } from "vue-router";
import { useStore } from 'vuex'; 
//使用本地存储
import { useLocalStorageEffect } from "../../components/effects/cartEffect";

//获取组件
import ShopInfo from "../../components/shoinfo/Shopinfo";
import BackButton from "../../components/Back";
import Search from "../../components/search/Search";
import MainTab from "./MainTab";
import MainContent from "./MainContent";
import ShopBottomBar from "./ShopBottomBar";

//ref对DOM节点操作和 onRenderTracked生命周期函数
const useonRenderTrackedEffect = () => {
  //设置dom节点获取
  const shopDetailsTop = ref(null);
  const shopTop = ref(null);
  const Main = ref(null);
  onRenderTracked(() => {
    //每次页面渲染之后，重新收集依赖自动执行

    //获取dom,计算高度，设置Main节点style
    if (shopDetailsTop.value && shopTop.value) {
      setTimeout(() => {
        Main.value.style.top = `${shopDetailsTop.value.offsetHeight +
          shopTop.value.offsetHeight}px`;
      }, 100);
    }

  });
  return { shopDetailsTop, shopTop, Main };
};

//点击切换修改tab参数
const usehandleChangContentEffect = () => {
  const tab = ref("all");
  const handleChangContent = values => {
    tab.value = values;
  };
  return { tab, handleChangContent };
};

//头部shopinfo信息和搜索框文字
const useGetDataEffect = () => {
  const data = reactive({ item: {} });
  const searchPlaceHolder = ref("请输入商品名称搜索");

  const store=useStore();

  //获取路由传来的路径id
  const id = useRoute().params.id;

  const getDataShopInfo = async () => {
    try {
      //请求url
      const Urlpath=`/api/shop/${id}`;
       //获取数据
      let result={}
      if(getStorage(Urlpath)){
        result.errno=0;
        result.data=getStorage(Urlpath);
      }else{
          result = await get(Urlpath);
      }
      //使用数据
      if (result?.errno === 0 && result?.data) {
        data.item = result.data;
        setStorage(Urlpath,result.data);//临时存储，减少请求
        //存储店铺信息
        const shopId = id;
        const shopName = data.item.name;
        const shopImg = data.item.imgUrl;
        store.dispatch('setShopInfo',{shopId,shopName,shopImg});       
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { item } = toRefs(data);
  return { item, searchPlaceHolder, getDataShopInfo };
};

export default {
  name: "Shop",
  components: {
    ShopInfo,
    BackButton,
    Search,
    MainTab,
    MainContent,
    ShopBottomBar
  },
  setup() {
    useLocalStorageEffect(); //打开页面时，从本地获取数据
    const {
      item,
      searchPlaceHolder,
      getDataShopInfo
    } = useGetDataEffect();
    getDataShopInfo(); //获取店铺shop信息

    const { tab, handleChangContent } = usehandleChangContentEffect(); //点击切换修改tab参数


    return {
      item,
      tab,
      handleChangContent,
      searchPlaceHolder
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1rem;
  display: flex;
  flex-flow: column;
}

.shop__details__top {
  padding: 0.2rem 0.36rem 0rem;
}
.shop__top {
  display: flex;
  align-items: center;
  padding: 0.28rem 0.36rem 0rem;
}
.main {
  position: relative;
  flex:1;
  display: flex;
  overflow-y: scroll;
}
</style>
