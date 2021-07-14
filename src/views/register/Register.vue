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
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请再次确认密码"
        v-model="ensurement"
      />
    </div>
    <div @click="handleRegister" class="wrapper__register-button">注册</div>
    <div class="wrapper__register-link" @click="handleToLogin">
      已有账号去登陆
    </div>
    <Toast v-if="show" :message="toastMessage" :iconstate='iconstate' :showIcon='showIcon' />
  </div>
</template>

<script>
//主动跳转，用useRouter的 push方法
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import axios from 'axios';
import Toast, { useToastEffect } from "../../components/toast/Toast";

//判断是否发送请求
const isPost=(data,showToast)=>{
  /*--这里可以做一系列验证方法，比如不能是空格，密码格式等等---*/
  if(data.username.length<3||data.password.length<3){
    showToast("输入字符长度不足");
    return false;
  }else if(data.password !== data.ensurement){
    showToast("密码2次输入不一致");
    return false;
  }else{return true}
  
}

//注册相关逻辑
const useRegisterEffect = showToast => {
  const router = useRouter();
  const data = reactive({ 
    username: "", 
    password: "", 
    ensurement: "" });
  const handleRegister = async () => {
    try { 

      //验证输入
      if(!isPost(data,showToast)) return;
	  
	  
     /* const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
        ensurement: data.ensurement
      }); */
			
	//本地nodejs自建服务端 localhost:3000
	const url = 'http://localhost:3000/api/user/register';
	const {username,password} = data;
	const result = await post(url,{username,password},{withCredentials:true});
			
			
      if (result?.errno === 0) {      
        showToast("注册成功",'success');
        setTimeout(()=>{
          router.push({name:'Login'});
        },2000);       
      } else {
        showToast("注册失败",'defeat');
      }
    } catch (err) {
      showToast("请求失败",'defeat');
    }
  };
  const {username,password,ensurement}=toRefs(data);
  return { handleRegister, username, password,ensurement};
};
//路由跳转登录页
const useToLoginEffect = () => {
  const router = useRouter();
  const handleToLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleToLogin };
};

export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast,iconstate,showIcon} = useToastEffect();
    const { handleRegister, username, password,ensurement} = useRegisterEffect(showToast);
    const { handleToLogin } = useToLoginEffect();
    return {
      handleRegister,
      username,
      password,
      ensurement,
      show,
      toastMessage,
      iconstate,showIcon,
      handleToLogin
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
    margin: 0 0.8rem 0.32rem;
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
  &__register-button {
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
  &__register-link {
    font-size: 0.28rem;
    height: 0.96rem;
    margin: 0 0.8rem 0;
    line-height: 0.96rem;
    text-align: center;
    color: $content-notice-fontColor;
  }
}
</style>
