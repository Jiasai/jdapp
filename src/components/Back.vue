<template>
    <div 
    :class="{'back':true,
    'backWhite':whiteColor?true:false,
    'backposition':position?true:false}"
    @click="handleBackClick"
    >
    <span class="iconfont icon-fanhui"></span>
    </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
    name:'BackButton',
    props:['whiteColor','position'],
    setup(){
        const router = useRouter();
        const handleBackClick=()=>{
            router.back();
        }
        return{handleBackClick}
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';
.back{
    color:$searchbox-color;
    margin-bottom: $layout-margin-bottom;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: .1rem;
    .iconfont{
        font-size: .64rem;
    }
}
.backWhite{
    color:#fff;   
}
.backposition{
    position: absolute;
    left:.25rem;
    margin:0rem;
    z-index: 10;
}
</style>