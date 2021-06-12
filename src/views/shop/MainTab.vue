<template>
  <div class="main__tab">
    <div
      v-for="(item, index) in tabList"
      :key="index"
      @click.self="handleActiveData(item.tab)"
      :class="{
        'main__tab__item': true,
        'main__tab__item--active': currentTab === item.tab ? true : false
      }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
//tab列表数据
const useTabListEffect = emit => {
  const data = reactive({
    tabList: [
      { title: "全部商品", tab: "all" },
      { title: "乳品烘培", tab: "cake" },
      { title: "新鲜水果", tab: "fruit" },
      { title: "品质蔬菜", tab: "vegetables" },
      { title: "肉禽蛋类", tab: "meat" },
      { title: "速冻食品", tab: "frozen"}
    ],
    currentTab: "all"
  });

  const handleActiveData = tabValue => {
    //修改active
    data.currentTab = tabValue;
    //点击后，获得tab,向外出发事件信号,并传参
    emit("changContentData", tabValue);
  };
  const { tabList, currentTab } = toRefs(data);
  return { tabList, currentTab, handleActiveData };
};
export default {
  name: "MainTab",
  setup(props, context) {
    const { emit } = context;
    const { tabList, currentTab, handleActiveData } = useTabListEffect(emit);
    return { tabList, currentTab, handleActiveData };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
.main__tab {
  
  width: 1.52rem;
  background: $searchBgcolor;
  &__item {
    font-size: 0.28rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    &--active {
      background: #fff;
      color: $content-fontColor;
      border-left: .02rem solid $blueColor;
    }
  }
}
</style>
