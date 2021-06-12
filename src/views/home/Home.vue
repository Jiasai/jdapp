<template>
  <div class="wrapper">
    <Position />
    <search 
    :placeholder="searchPlaceHolder" 
    :textGrey='true'
    />
    <Slider class="slider__layout" />
    <NavMenu /> 
    <div class="gap"></div>  
    <Nearby />
  </div>
  <TabBar />
</template>

<script>
  import {ref} from 'vue';
    import Slider from "../../components/slider/slider";
    import TabBar from '../../components/tabBar/tabBar';
    import Position from './position';
    import Search from '../../components/search/Search';
    import NavMenu from './navMenu';
    import Nearby from './nearby';
    export default {
        components: { Slider,TabBar,Position,Search,NavMenu,Nearby},
        name: "Home",
        setup() {
          const searchPlaceHolder=ref('山姆会员商店优惠商品');

          return {searchPlaceHolder};
        }
    };
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1rem;
  overflow-y: auto;
  padding:0rem .36rem;
}
.gap{
  height: .2rem;
  background: #f1f1f1;
  margin:0rem -0.36rem
}

</style>
