<template>
  <top-title pageTitle="新建收货地址" buttonText="保存" :okClick="okClick" />
  <div class="main">
    <div class="addNew">
      <div class="addNew__item">
        <span class="title">所在城市：</span>
        <input
          class="addNew__item__input"
          type="text"
          placeholder="如北京市"
          v-model="city"
          @blur="inputBlurSetValue"
        />
      </div>
      <div class="addNew__item">
        <span class="title">小区/大厦/学校：</span>
        <input
          class="addNew__item__input"
          type="text"
          placeholder="如理工大学国防科技园"
          v-model="department"
          @blur="inputBlurSetValue"
        />
      </div>
      <div class="addNew__item">
        <span class="title">楼号-门牌号：</span>
        <input
          class="addNew__item__input"
          type="text"
          placeholder="A号楼12层"
          v-model="houseNumber"
          @blur="inputBlurSetValue"
        />
      </div>
      <div class="addNew__item">
        <span class="title">收货人：</span>
        <input
          class="addNew__item__input"
          type="text"
          placeholder="请填写收货人的姓名"
          v-model="name"
          @blur="inputBlurSetValue"
        />
      </div>
      <div class="addNew__item">
        <span class="title">联系电话：</span>
        <input
          class="addNew__item__input"
          type="text"
          placeholder="请填写收货手机号"
          v-model="phone"
          @blur="inputBlurSetValue"
        />
      </div>
    </div>
    <div class="defaultAddress" @click="switchDefault">
      <div class="defaultAddress_icon">
        <span
          class="iconfont icon-xuanzhongduigou"
          v-if="defaultAddress"
        ></span>
        <span class="iconfont icon-unchecked" v-if="!defaultAddress"></span>
      </div>
      <p>默认地址</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { useStore } from "vuex";
import TopTitle from "../../components/topTitle/TopTitle.vue";

const useAddressEditEffect = () => {
  const store = useStore();
  //是否可点击
  const okClick = ref(false);
  //定义bodyData响应数据
  const bodyData = reactive({
    city: "",
    department: "",
    houseNumber: "",
    name: "",
    phone: "",
    defaultAddress: false
  });
  //实时修改store数据
  const inputBlurSetValue = () => {
    //一旦直接解构赋值，变量就会失去数据响应性
    const {
      city,
      department,
      houseNumber,
      name,
      phone
    } = bodyData;
    if (
      city !== "" &&
      department !== "" &&
      houseNumber !== "" &&
      name !== "" &&
      phone !== ""
    ) {
      okClick.value = true;
    } else {
      okClick.value = false;
    }
    store.dispatch("setAddressData",bodyData); //修改store，button要用
  };

  //切换默认地址
  const switchDefault = () => {   
    bodyData.defaultAddress = !bodyData.defaultAddress;
    store.dispatch("setAddressData", bodyData);//修改store，button要用
  };

  const { city, department, houseNumber, name, phone, defaultAddress } = toRefs(
    bodyData
  );
  return {
    city,
    department,
    houseNumber,
    name,
    phone,
    defaultAddress,
    inputBlurSetValue,
    switchDefault,
    okClick
  };
};

export default {
  name: "AddressNew",
  components: { TopTitle },
  setup() {
    const {
      city,
      department,
      houseNumber,
      name,
      phone,
      defaultAddress,
      inputBlurSetValue,
      switchDefault,
      okClick
    } = useAddressEditEffect();
    return {
      city,
      department,
      houseNumber,
      name,
      phone,
      defaultAddress,
      inputBlurSetValue,
      switchDefault,
      okClick
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/variables.scss";
.main {
  position: absolute;
  left: 0;
  right: 0;
  top: 1.1rem;
  padding-top: 0.24rem;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  background: #f8f8f8;
  .addNew {
    background: #fff;
    padding: 0rem 0.4rem;
    &__item {
      border-bottom: 0.02rem solid $border-color;
      height: 0.9rem;
      line-height: 0.9rem;
      font-size: 0.28rem;
      color: $content-notice-fontColor;
      display: flex;
      &__input {
        height: 100%;
        flex: 1;
        padding: 0rem 0.1rem 0rem 0.16rem;
      }
      &__input::-webkit-input-placeholder {
        color: $searchbox-color;
      }
      &__input:-moz-placeholder {
        color: $searchbox-color;
      }
      &__input::-moz-placeholder {
        color: $searchbox-color;
      }
      &__input:-ms-input-placeholder {
        color: $searchbox-color;
      }
    }
  }
  .defaultAddress{
     display: flex;
    align-items: center;
    float: right;
    margin: .24rem .4rem;
    color: $content-notice-fontColor;
    .iconfont{
     margin-right: 0.08rem;
    font-size: .38rem;}
    .icon-xuanzhongduigou{color:$blueColor;}
  }
}
</style>
