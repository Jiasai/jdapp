<template>
    <div class="nullCart" >
      <div class="nullCart__img"><img src="../../assets/images/nullDataGrey.png" alt=""></div>
      <div class="nullCart__title">{{text}}~</div> 
    </div>
</template>
<script>
	export default {
		name:'NullData',
		props:["text"]
	}
</script>
<style lang="scss"  scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";

.nullCart{
  text-align: center;
  position: relative;
  top:50%;
  transform: translateY(-85%);
  &__img{
    opacity: .35;
    width:1.8rem;
    display: inline-block;
    margin-bottom:.14rem;
    img{width:100%}
  }
  &__title{
    font-size: .3rem;
    color:$content-fontColor-grey;
    margin-bottom: .36rem;
  }
  &__button{
    display: inline-block;
    width: 1.8rem;
    height: .64rem;
    line-height: .64rem;
    font-size: .28rem;
    border-radius: .32rem;
    background: $redColor;
    a{
      display: block;
      color:#fff;
      height: 100%;
    }
  }
}



</style>