<template>
  <div class="wrapper">
    <div class="wrapper__img">
      <img src="../../assets/images/user.png" alt="" />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
        v-model="password"
      />
    </div>
    <div @click="handleLogin" class="wrapper__login-button">登录</div>
    <div @click="handleToRegister" class="wrapper__login-link">立即注册</div>
    <Toast v-if="show" :message="toastMessage" :iconstate='iconstate' :showIcon='showIcon' />
  </div>
</template>

<script>
//主动跳转，用useRouter的 push方法
import { reactive, toRefs  } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import axios from 'axios';
import {setCookie,removeCookie} from "../../utils/cookie.js";
import Toast, { useToastEffect } from "../../components/toast/Toast";

//判断是否发送请求
const isPost=(data,showToast)=>{
  /*--这里可以做一系列验证方法，比如不能是空格，密码格式等等---*/
  if(data.username.length<3||data.password.length<3){
    showToast("输入字符长度不足");
    return false;
  }else{return true}
  
}

//登录相关逻辑
const useLoginEffect = showToast => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  const handleLogin = async () => {
    try {
      
      //验证输入
      if(!isPost(data,showToast)) return;
	  const {username,password} = data;
	  /* const url = '/api/user/login';
      const result = await post(url, {
        username: data.username,
        password: data.password
      }); */
	  
	  //本地nodejs自建服务端 localhost:3000
	  const url = '/api/user/login';
	  const result = await post(url,{username,password},{withCredentials:true});
	      
      if (result?.errno === 0) {
		  
		 //之所以使用cookie，是因为到期失效（15天），跟服务器保持一致（服务器登录设置的cookie就是15天），
		 //cookie失效，重新登录，触发服务器重新设置返回cookie
		 
		setCookie("isLogin",true,{maxAge:15*24*60*60})////有效期15天,maxAge单位：秒
    removeCookie("errno") //删除errno

        showToast("登录成功",'success');
        setTimeout(()=>{
          router.push({ name: "Home" });
        },1200);   

      } else {
		const message = result.message || "登录失败";
        showToast(message,'defeat');
      }
    } catch (err) {
      showToast("请求失败",'defeat');
    }
  };
  const { username, password } = toRefs(data);
  return { handleLogin, username, password };
};
//路由跳转注册页
const useToRegisterEffect = () => {
  const router = useRouter();
  const handleToRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleToRegister };
};

export default {
  name: "Login",
  components: { Toast },
  //setup函数的职责：就是告诉你，代码执行的一个流程，细节代码统统是引入
  setup() {
    const { show, toastMessage, showToast,iconstate,showIcon} = useToastEffect();
    const { handleLogin, username, password } = useLoginEffect(showToast);
    const { handleToRegister } = useToRegisterEffect();
/*     watchEffect(()=>{
        //首次渲染展示就执行内部所有代码，自动侦听到外部依赖变化，也执行
        console.log("username输入发生变化，watchEffect执行了")
        console.log(username.value) 
    }) */

    return {
      handleLogin,
      username,
      password,
      handleToRegister,
      show,
      toastMessage,
      iconstate,showIcon
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    width: 1.56rem;
    height: 1.56rem;
    margin: 0 auto 0.8rem;
    img {
      width: 100%;
    }
  }
  &__input {
  
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.12rem;
    height: 0.96rem;
    margin: 0 0.8rem 0.42rem;
    &__content {
      width: 100%;
      height: 100%;
      background: none;
      padding: 0 0.3rem;
      font-size: 0.32rem;
    }
    &__content::-webkit-input-placeholder {
      color: $searchbox-color;
    }
    &__content:-moz-placeholder {
      color: $searchbox-color;
    }
    &__content::-moz-placeholder {
      color: $searchbox-color;
    }
    &__content:-ms-input-placeholder {
      color: $searchbox-color;
    }
  }
  &__login-button {
    background: #e30b0b;
    box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.32);
    border-radius: 4px;
    color: #fff;
    font-size: 0.32rem;
    height: 0.96rem;
    margin: 0.64rem 0.8rem 0.1rem;
    line-height: 0.96rem;
    text-align: center;
  }
  &__login-link {
    font-size: 0.28rem;
    height: 0.96rem;
    margin: 0 0.8rem 0;
    line-height: 0.96rem;
    text-align: center;
    color: $content-notice-fontColor;
  }
}
</style>
