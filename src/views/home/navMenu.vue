<template>
  <div class="nav__layout">
    <div 
    v-for="(item,index) in navMenuList"
    :key='index'
    class="nav__layout__item"
    >
      <span class="nav__layout__item__icon"
        ><img :src="item.imgUrl" alt=""/></span
      ><span class="nav__layout_item__title">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: "navMenu",
  setup(){
    const navMenuList=reactive([
      {imgUrl:'http://css.thinkshe.com/images/chaoshi.png',title:'超市便利'},
      {imgUrl:'http://css.thinkshe.com/images/caichang.png',title:'菜市场'},
      {imgUrl:'http://css.thinkshe.com/images/shuiguo.png',title:'水果店'},
      {imgUrl:'http://css.thinkshe.com/images/xianhua.png',title:'鲜花绿植'},
      {imgUrl:'http://css.thinkshe.com/images/yiyao.png',title:'医药健康'},
      {imgUrl:'http://css.thinkshe.com/images/jiaju.png',title:'家居时尚'},
      {imgUrl:'http://css.thinkshe.com/images/dangao.png',title:'蛋糕烘焙'},
      {imgUrl:'http://css.thinkshe.com/images/qiandao.png',title:'签到'},
      {imgUrl:'http://css.thinkshe.com/images/dapai.png',title:'大牌免运'},
      {imgUrl:'http://css.thinkshe.com/images/hongbao.png',title:'红包套餐'},


    ]);
    return {navMenuList} 
  }
};
</script>
<style lang="scss" scoped>

.nav__layout {
  display: flex;
  flex-flow: row wrap;

  &__item {
    flex: 0 0 20%;
    box-sizing: border-box;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    margin-bottom: 0.4rem;
    &__icon {
      width: 100%;
      height: 0;
      overflow: hidden;
      padding: 0rem 18% 63.2%;
      margin-bottom: 0.1rem;
      text-align: center;
      img {
        width: 100%;
      }
    }
    &__title {
      font-size: 0.24rem;
    }
  }
}
</style>
