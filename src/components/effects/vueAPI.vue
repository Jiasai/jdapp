<template>
   <div>Hello,world</div>
    <p>This is Vue</p>
   <router-link :to ="`/user/${username}`"  v-if="isUser">           <!--链接跳转-->
        去主页链接
   </router-link>                                                                    <!--dom中的文本是变量的话，放在 {{ }} 中-->
   <h1 :class="{active: isActive?true:false}">{{ pageTitle }}</h1>  <!--js语法和使用变量写在“ ”中,同时加 ： 或 v-bind: 指令-->
   <input v-model="username">                                     <!--通过v-module双向绑定指令，input实时value值-->
   <span v-if="isUser">用户名正确</span>                      <!--通过v-if指令，展示或隐藏Dom节点-->
   <span v-if="!isUser">用户名不正确，重新输入</span>
   <button @click="getIsUser">验证</button>                  <!--通过@事件名，绑定事件-->
   <ul>
     <li v-for="(item,index) in ListData" :key="index">       <!--通过v-for指令，循环数据，“ ”中要写js变量或语句，要加 ：-->
       {{ item.title }}  
     </li>
   </ul>
   <tab-bar :username = "username" />                          <!--通过属性绑定 ：或 v-bind: 向子组件传递数据--> 
</template>

<script>
   import { ref,reactive,toRefs,watchEffect} from "vue";        //引入vue 内置的 API方法
   import { useRouter } from "vue-router";  
   import tabBar from '../tabBar/tabBar.vue';                                 //引入组件

   const UserEffect = () =>{                                             //封装“模块化”函数
       const router = useRouter();                                      //使用 路由
       const user = reactive({username:""})                         //定义响应式变量 引用类型
       const isUser = ref(true)                                           //定义响应式变量 基本类型
       //发送请求，确认isUer
       const getIsUser =async()=>{
         const res = await axios.get(`/api/user/${user.username}`);  //axios发送get请求
         if(res?.errno === 0){
           isUser.value = res.data.isUser;                             //修改 响应式变量的值
           setTimeout(()=>{ router.push(`/api/user/${user.username}`) },2000)   //push 主动路由跳转
         }
       }
       
       const username = toRefs(user)      //通过toRefs可以对响应式对象，做解构赋值，同时保持其响应式
       return { isUser,username,getIsUser }  //导出
   }   

   export default {
  components: { tabBar },
       name:'Hello',
       props:[ "pageTitle" ],     //props接收组件传值，可直接在dom结构中使用
       setup(props){
            const isActive = ref(true);
            const { isUser,username,getIsUser } =UserEffect();  //执行函数，解构得到数据
            watchEffect(()=>{
                //首次渲染展示就执行内部所有代码，自动侦听到外部依赖变化，也执行
                console.log("username输入发生变化，watchEffect执行了")
                console.log(username.value , props.pageTitle) 
             })
            return { isActive,isUser,username,getIsUser }   //只有在setup函数中 ，return出去，dom结构中才能使用
       }
   }

</script>

<style lang="scss" scoped>   
   /*  编辑Dom结构的css样式 */
   .active{ color:blue }

</style>



