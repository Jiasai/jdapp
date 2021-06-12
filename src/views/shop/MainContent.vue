<template>
  <div class="main__content">
    <div
      class="main__content__ItemLayout"
      v-for="item in itemList"
      :key="item._id"
    >
      <BabyItem 
      :item="item" 
      :noneSales='false'
      :smallImg='false'
      />
      <AddBay 
      :productId='item._id' 
      :item='item' 
      :layoutRight='false'
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { get,setStorage,getStorage} from "../../utils/request";

import BabyItem from "./BabyItem";
import AddBay from "./AddBay";


//获取content-item数据
const useGetContentDataEffect = () => {
  const data = reactive({ itemList: [] });
  const id = useRoute().params.id;
  const getContentData = async tab => {
    try {
      //请求url
      const Urlpath=`/api/shop/${id}/products?tab=${tab}`;
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
        data.itemList = result.data;
        setStorage(Urlpath,result.data);//临时存储，减少请求
      }

    } catch (err) {
      console.log(err);
    }
  };
  const { itemList } = toRefs(data);
  return { itemList, getContentData };
};

export default {
  name: "MainContent",
  components: { BabyItem, AddBay },
  props: ["tab"],
  setup(props) {
    const { itemList, getContentData } = useGetContentDataEffect();
    watchEffect(() => {
      //watchEffect侦听器,自动感知对外部代码的依赖，外部数据变化，watchEffect就会立即执行；
      getContentData(props.tab);
    });

    return { itemList};
  }
};
</script>

<style lang="scss" scoped>
.main__content {
  flex: 1;
  overflow-y: auto;
  padding: 0rem 0.36rem 0rem;
  &__ItemLayout {
    position: relative;
    padding: 0.24rem 0rem;
    border-bottom: .02rem solid #f1f1f1;
  }
}
</style>
