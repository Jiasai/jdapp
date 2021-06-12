<template>  
  <div class="toast">
  <span v-if='showIcon' :class="iconstate">
  </span>
  <span class="toast-text"> {{ message }}</span>
      </div>
</template>

<script>
import { reactive, toRefs } from "vue";

const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: "",
    icon:{
        success:'iconfont icon-chenggong2',
        defeat:'iconfont icon-shibai1'
    },
    iconstate:'',
    showIcon:false
  });
  const showToast = (message,state='') => {
      
    if(!state){toastData.showIcon=false};
    if(toastData.icon[state]!==undefined){
        toastData.showIcon=true;
        toastData.iconstate=toastData.icon[state];
    }
    toastData.show = true;
    toastData.toastMessage = message;
    setTimeout(() => {
    toastData.show = false;
    toastData.showIcon=false;
    toastData.toastMessage = "";
    }, 1800);
  };
  const { show, toastMessage,iconstate,showIcon} = toRefs(toastData);
  return { show, toastMessage, showToast,iconstate,showIcon};
};
export default {
  name: "Toast",
  props:['message','iconstate','showIcon'],
};
export {useToastEffect}
</script>

<style lang="scss" scoped>

.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.2rem .4rem .3rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.1rem;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  color:#fff;
  z-index: 100;
  span{
      padding:.04rem 0rem;
  }
  .iconfont{
    font-size: 0.64rem;
  }

}
</style>
