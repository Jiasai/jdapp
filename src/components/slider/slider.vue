<template>
  <swiper
    :slides-per-view="1"
    :space-between="10"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: false
    }"
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    virtual
  >
    <swiper-slide
      v-for="(item, index) in sliderList"
      :key="item.title"
      :virtualIndex="index"
    >
      <img :src="item.src" />
    </swiper-slide>
  </swiper>
</template>
<script>
import "swiper/swiper.scss";

import SwiperCore, { Virtual, Autoplay, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/vue";

SwiperCore.use([Virtual, Autoplay, Pagination]);

export default {
  data() {
    return {
      sliderList: [
        {
          title: "图1",
          src:
            "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/167245/17/13432/149823/60540ceeE0a928512/677088217d8a00aa.jpg!cr_1053x420_4_0!q70.jpg.dpg"
        },
        {
          title: "图2",
          src:
            "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/139395/11/2556/216011/5f085a41Ef8f8d003/9dc3a8aea49effd4.jpg!cr_1125x449_0_166!q70.jpg.dpg"
        },
        {
          title: "图3",
          src:
            "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/173040/7/11745/172181/60af1393Ef285e463/a1bcd8dde3ee775b.jpg!cr_1125x449_0_166!q70.jpg.dpg"
        },
        {
          title: "图4",
          src:
            "https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/173119/1/10181/89612/60a22858E3a68ab07/10c5d6e89f951de7.jpg!cr_1053x420_4_0!q70.jpg.dpg"
        },
        {
          title: "图5",
          src:
            "https://imgcps.jd.com/ling4/4448073/5rex5bGC5ruL5YW7/5a6M576O6IKM6IKk/p-5d91a49642dd5b7c7d5289a5-618/6a797557/cr_1053x420_4_0/s1125x690/q70.jpg"
        }
      ]
    };
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    onSwiper(swiper) {
      //console.log(swiper);
    },
    onSlideChange() {
      //console.log('slide change');
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/style/variables.scss";
@import "../../assets/style/swiper-pagination.scss";

.slider__layout {
  height: 0;
  overflow: hidden;
  padding-bottom: 39.9%;
  margin-bottom: 0.3rem;
  /*通过padding-bottom占位防抖动*/
  img {
    width: 100%;
    border-radius: 0.1rem;
  }
  .swiper-pagination-bullet-active {
  background: #f43535;
}
  .swiper-pagination-bullet{
    width:.16rem;
    height: .16rem;
  }
}




</style>
