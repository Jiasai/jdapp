<template>
    <div :class="{button__right:true,noneClick:okClick?false:true}" @click="handlePushTo(okClick)">{{text}}</div>
</template>
<script>

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {post,patch} from "../../utils/request"

const useButtonEffect =(text,pageTitle)=>{
    const router =  useRouter();
    const store = useStore();
	
	//获取路由传来的路径id
	//const id = router.params.id;
    const handlePushTo=async(okClick)=>{
   
        if(text === '新建'){
            router.push(`/address/new`)
        }
        if(text === '保存'){      
        
            if(!okClick) return;

            if(pageTitle === "编辑收货地址"){
				
                //从store中解构出数据
                const {city,department,houseNumber,name,phone,defaultAddress,addressId} = store.state.bodyData;

                const url = `/api/user/address/${addressId}`;
				const result = await patch(url,{city,department,houseNumber,name,phone,defaultAddress},{withCredentials:true});
                if(result?.errno === 0){
                   setTimeout(()=>{
                     router.back();
                   },400); 
                }
            }
            if(pageTitle === "新建收货地址"){
                //从store中解构出数据
                const {city,department,houseNumber,name,phone,defaultAddress} = store.state.bodyData;
                const url = "/api/user/address";
                const result = await post(url,{city,department,houseNumber,name,phone,defaultAddress},{withCredentials:true});
                if(result?.errno === 0){
                   setTimeout(()=>{
                     router.back();
                   },400); 
                }               
            }
        }
    }
    return {handlePushTo}
}

export default {
    name:"ButtonRight",
    props:["text","pageTitle","okClick"],
    setup(props){
        const {handlePushTo} = useButtonEffect(props.text,props.pageTitle,props.okClick);
        return {handlePushTo}
    }
}
</script>
<style lang="scss" scoped>
.button__right{
    padding: 0rem 0.4rem 0rem 0.36rem;
}
.noneClick{
    opacity: .2;
}
</style>