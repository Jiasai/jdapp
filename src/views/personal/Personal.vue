<template>
    <div class="main">
        <div class="personal">
            <div class="personal__pic">
                <img src="../../assets/images/personalImg.png" alt="">
            </div>
            <h3 class="personal__name">热心市民张先生</h3>
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
<!--             <div class="menu__item">
                <div class="menu__item__left">
                <div class="menu__item__img">
                    <img src="../../assets/images/personal_03.jpg" alt=""></div>
                <p class="menu__item__title">我的钱包</p>
                </div>
                <div class="menu__item__ico">
                    <span class="iconfont icon-fanhui1"></span>
                </div>
            </div> -->
            <router-link to="/address">
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
            </router-link>
            <div class="menu__item" @click="logoutToggle">
                 <div class="menu__item__left">
                <div class="menu__item__img">
                    <img src="../../assets/images/personal_09.jpg" alt="">
                </div>
                <p class="menu__item__title">退出登录</p>
                 </div>
                <div class="menu__item__ico">
                    <span class="iconfont icon-fanhui1"></span>
                </div>
            </div>
        </div>
    </div>
  <tab-bar />
  <div class="pagetopBg"></div>
  <div class="logout" v-if="isLogout">
        <div class="logout_text">退出后将不能访问个人主页，<br/>确定退出吗？</div>
        <div class="logout_button">
            <div class="logout_button_box" @click="logoutToggle">取消</div>
            <div class="logout_button_box" @click="handleLogout">确定</div>
        </div>
  </div>
  <div class="logout_bg" v-if="isLogout" @click="logoutToggle"></div>
</template>
<script>
import { useRouter } from "vue-router";
import { get } from "../../utils/request";
import {getCookieValue,setCookie} from "../../utils/cookie.js";
import TabBar from '../../components/tabBar/tabBar';
import {ref} from 'vue';

const useLogoutEffect=()=>{
    const router = useRouter();
    const isLogout = ref(false);

    const logoutToggle = ()=>{
        isLogout.value = !isLogout.value 
    }

    const handleLogout = async() =>{
        const url = "/api/user/logout";
        const result = await get(url);      
        if(result?.errno===10003){
            isLogout.value = !isLogout.value
            setTimeout(()=>{
                    router.push({name:'Login'});
              },400);              
        }
    }

    return {isLogout,logoutToggle,handleLogout}
}

export default {
    name:'Cart',
    components:{TabBar},
    setup(props){
        const {isLogout,logoutToggle,handleLogout} = useLogoutEffect();
        return {isLogout,logoutToggle,handleLogout}
    }
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
.logout{
    position:absolute;
    z-index:101;
    background:#fff;
    border-radius:.06rem;
    left:11%;
    right:11%;
    top:50%;
    transform: translate(0%, -50%);
    padding:.5rem .3rem 0.2rem .5rem ;
    font-size:.32rem;
    line-height:1.6;
    font-weight:bold;
    &_button{
        display:flex;
        float:right;
        
        font-size:.28rem;
        color:$blueColor;
        &_box{
            padding:0.25rem .25rem 0.25rem;
        }
    }
    &_bg{
        position:absolute;
        background:rgba(0,0,0,.65);
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:100;
    }
}
</style>