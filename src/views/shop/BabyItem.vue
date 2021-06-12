<template>
     <div class="babyItem">
        <div 
        :class="{'babyItem__img':true,'smallImg':smallImg?true:false} ">
          <img :src="item.imgUrl" :alt="item.name" />
        </div>
        <div class="babyItem__text">
          <div class="babyItem__text__title">{{item.name}}</div>
          <p class="babyItem__text__subtitle"
          v-if="noneSales?false:true"
          >月售{{item.sales}}件</p>
          <p class="babyItem__text__price">
            <span class="babyItem__text__price_now"><i>&yen;</i>{{item.price}}</span>
            <span class="babyItem__text__price_old"><i>&yen;</i>{{item.oldPrice}}</span>
          </p>
        </div>
    </div>
</template>

<script>
export default {
    name:'BabyItem',
    props:['item','noneSales','smallImg']
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.babyItem {
  flex: 1;
    display: flex;
    justify-content: flex-start;
    &__img {
      width: 1.36rem;
      height: 1.36rem;
      margin-right: 0.24rem;
      img {
        width: 100%;
      }
    }
    &__img.smallImg{
      width: 0.92rem;
      height: 0.92rem;
    }
    &__text {
      flex: 1;
      &__title {
        font-size: 0.28rem;
        line-height: .36rem;
        margin-bottom: 0.14rem;
        @include ellipsis(1);
      }
      &__subtitle {
        font-size: 0.24rem;
        margin-bottom: 0.14rem;
      }
      &__price {
        color: $redColor;
        display: flex;
        align-items: center;
        line-height: 0.44rem;
        &_now {
          font-size: 0.28rem;
          margin-right: 0.16rem;
          i{font-size: .24rem;}
        }
        &_old {
          @include fontSize10px();
          color: #999;
          transform-origin: left center;
          text-decoration: line-through;
        }
      }
    }
  }
</style>