<template>
  <div class="fjdp">
    <div class="fjdp__layout">
      <h3 class="fjdp__layout__title">附近店铺</h3>
      <router-link
        v-for="item in nearByList"
        :key="item._id"
        :to="`/shop/${item._id}`"
      >
        <Shopinfo :item="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref} from "vue";
import { get, setStorage, getStorage } from "../../utils/request";
import Shopinfo from "../../components/shoinfo/Shopinfo";
const useGetDataEffect = () => {
  const nearByList = ref([]);
  const getNearbyList = async () => {
    try {
      //请求url
      const Urlpath = `/api/shop/hot-list`;
      //获取数据
      let result = {};
      if (getStorage(Urlpath)) {
        result.errno = 0;
        result.data = getStorage(Urlpath);
      } else {
        result = await get(Urlpath);
      }
      //使用数据
      if (result?.errno === 0 && result?.data?.length) {
        nearByList.value = result.data;        
        setStorage(Urlpath, result.data); //临时存储，减少请求
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { nearByList, getNearbyList };
};

export default {
  name: "Nearby",
  components: { Shopinfo },
  setup() {
    const { nearByList, getNearbyList } = useGetDataEffect();
    getNearbyList();
    return { nearByList };
  }
};
</script>

<style lang="scss" scoped>
.fjdp {
  &__layout {
    padding: 0.4rem 0rem 0.02rem;
    &__title {
      font-size: 0.36rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
