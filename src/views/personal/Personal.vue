<template>
    <div class="main">
        <div class="personal">
            <div class="personal__pic">
                <img src="../../assets/images/personalImg.png" alt="">
            </div>
            <h3 class="personal__name">热心市民李先生</h3>
            <p class="personal__id">ID: 1069643013</p>
            <div class="personal__data">
                <div class="personal__data__item">
                <span class="personal__data__item__notice">红包</span>
                <span class="personal__data__item__num">218</span>
                </div>
                <div class="personal__data__item">
                    <span class="personal__data__item__notice">优惠券</span><span class="personal__data__item__num">12张</span></div>
                <div class="personal__data__item">
                    <span class="personal__data__item__notice">鲜豆</span><span class="personal__data__item__num">88</span></div>
                <div class="personal__data__item">
                    <span class="personal__data__item__notice">白条</span><span class="personal__data__item__num">1000</span></div>
            </div>
        </div>
        <div class="menu">
            <div class="menu__item">
                <div class="menu__item__left">
                <div class="menu__item__img">
                    <img src="../../assets/images/personal_03.jpg" alt=""></div>
                <p class="menu__item__title">我的钱包</p>
                </div>
                <div class="menu__item__ico">
                    <span class="iconfont icon-fanhui1"></span>
                </div>
            </div>
            <div class="menu__item">
                  <div class="menu__item__left">
                <div class="menu__item__img">
                    <img src="../../assets/images/personal_06.jpg" alt="">
                </div>
                <p class="menu__item__title">我的地址</p>
                </div>
                <div class="menu__item__ico">
                    <span class="iconfont icon-fanhui1"></span>
                </div>
            </div>
            <div class="menu__item">
                 <div class="menu__item__left">
                <div class="menu__item__img">
                    <img src="../../assets/images/personal_08.jpg" alt="">
                </div>
                <p class="menu__item__title">客服与帮助</p>
                 </div>
                <div class="menu__item__ico">
                    <span class="iconfont icon-fanhui1"></span>
                </div>
            </div>
        </div>
    </div>
  <tab-bar />
  <div class="pagetopBg"></div>
</template>
<script>
import TabBar from '../../components/tabBar/tabBar';

export default {
    name:'Cart',
    components:{TabBar},
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
@import "../../assets/style/mixins.scss";
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.99rem; 
  z-index: 10;
  overflow-y: auto;
}
.personal{
    background: #FFFFFF;
    box-shadow: 0 .16rem .32rem 0 rgba(0,0,0,0.08);
    border-radius: .16rem;
    margin:1.75rem .36rem .32rem;
    min-height: 4rem;
    text-align: center;
    &__pic{
        width:1.8rem;
        height: 1.8rem;
        border-radius: 50%;
        overflow:hidden;
        margin:0 auto -.65rem;
        transform: translateY(-.9rem);
        img{width:101%}
    }
    &__name{
        font-size: .48rem;
        line-height: .72rem;
        margin-bottom: .1rem;
    }
    &__id{
        font-size: .28rem;
        color: $content-notice-fontColor;
        margin-bottom: .2rem;
    }
    &__data{
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-top:.02rem solid $border-color;
        padding:.28rem .2rem 0rem;
        &__item{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: .85rem;
            &__notice{color: $content-notice-fontColor; 
            font-size: .24rem;}
            &__num{
                font-size: .4rem;               
            }
        }
    }
}
.menu{
    background: #FFFFFF;
    box-shadow: 0 .16rem .32rem 0 rgba(0,0,0,0.08);
    border-radius: .16rem;
    margin:0rem .36rem .32rem;
    padding:0.07rem 0rem;
    &__item{
        display: flex;
        padding: .24rem .36rem;
        align-items: center;
        &__left{
            display: flex;
            align-items: center;
            flex: 1;
        }
        &__img{
            width:.52rem;
            height: .52rem;
            img{width:100%}
        }
        &__title{
            font-size: .28rem;
            margin-left:.2rem
        }
        &__ico{
            color: $searchbox-color;
            .iconfont{font-size: .38rem;}
        }
    }
}
.pagetopBg {
  height:3.8rem;
background-image: linear-gradient(240deg, #3A6FF3 0%, #50C7FB 100%);
border-bottom-left-radius:15%;
border-bottom-right-radius:15%;
  background-size: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

</style>