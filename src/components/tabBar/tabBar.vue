<template>
  <div class="tabBar">
    <div
      v-for="(item, index) in tabBarList"
      :key="index"
      :class="{
        tabBar__item: true,
        'tabBar__item--active': currentPage === index
      }"
      @click="handleTab(index, item.path)"
    >
      <i :class="item.icon"></i>
      <span class="tabBar__item__title">{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
import { computed, reactive} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";



//tabBar 点击
const useTabBarHandleEffect = () => {
  const store = useStore();
  const router = useRouter();
  let tabBarList = reactive([
    { icon: "iconfont icon-home", title: "首页", path:"Home",page:0},
    { icon: "iconfont icon-cart", title: "购物车", path:"Cart",page:1},
    { icon: "iconfont icon-icon-test", title: "订单", path:"Order",page:2},
    { icon: "iconfont icon-icon-test2", title: "我的", path:"Personal",page:3}
  ]);

  //计算属性：当前页面
  const currentPage=computed(()=>{
    let page = 0;
    const pathname = localStorage.pathName;
    for (const item of tabBarList) {
      if(pathname===item.path){
        page=item.page;
      }
    }
    return page;
  });
  
  const handleTab = (index, path) => {
    router.push({ name: path });
  };

  return { tabBarList, currentPage, handleTab };
}

export default {
  name: "tabBar",
  setup() {
    const { tabBarList, currentPage, handleTab } = useTabBarHandleEffect();
    return { tabBarList, currentPage, handleTab };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.tabBar {
  @include bottomBar();
  &__item {
    flex: 1;
    display: flex;
    align-items: center;
    flex-flow: column wrap;

    .iconfont {
      font-size: 0.4rem;
      margin: 0rem 0rem 0.04rem 0rem;
    }

    &--active {
      color: $redColor;
    }
    &__title {
      @include fontSize10px();
    }
  }
}
</style>
