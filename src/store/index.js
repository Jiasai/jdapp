import { createStore } from "vuex";

import {
  addCartItemInfoEffect,
  reduceCartItemInfoEffect,
  CartItemCheckedEffect,
  CartItemUnCheckEffect,
  SelecAllCartEffect,
  unSelecAllCartEffect,
  clearCartEffect,
  setCartListlocalEffect,
  setShopInfoEffect
} from '../components/effects/storeCartActionEffect';

export default createStore({
  state: {
    cartList: {
      //购物车定义好数据结构：
      //第一层级是商铺的id
      // "1": {
      //   //第二层级是shop信息：商品、name、img、全选状态
      //   "productList": {
      //     //第三层级是商品的id
      //     //第三层内容是商品内容及count数量、是否选中
      //     "1": {
      //       "_id": "1",
      //       "name": "番茄 250g / 份",
      //       "imgUrl": "http://www.dell-lee.com/imgs/vue3/tomato.png",
      //       "sales": 10,
      //       "price": 33.6,
      //       "oldPrice": 39.6,
      //       "count": 1,
      //       "checked": true
      //     },
      //   },
      //   "checkedAll": false,
      //   "shopName": "沃尔玛",
      //   "shopImg": "http://www.dell-lee.com/imgs/vue3/near.png"
      // }
    }
  },
  mutations: {
    setCartListLocalstorage(state, payload) {//修改购物车数据并本地存储
      const { shopId, shopInfo } = payload;
      state.cartList[shopId] = shopInfo;
      
      const cartListTime = new Date().getTime(); //得到时间戳
      //cartList和时间戳存本地
      localStorage.cartList = JSON.stringify(state.cartList);
      localStorage.cartListTime = cartListTime;
    },
    setStateData(state, payload) {//从本地获得数据修改
      const {keyName,data} = payload;
      state[keyName] = JSON.parse(data);
    }
  },
  actions: {
    //增加
    addCartItemInfo(store, payload) {      
      addCartItemInfoEffect(store, payload);
    },
    //删除
    reduceCartItemInfo(store, payload) {
      reduceCartItemInfoEffect(store, payload);
    },
    //选中
    CartItemChecked(store, payload) {
      CartItemCheckedEffect(store, payload);
    },
    //取消选中
    CartItemUnCheck(store, payload) {
      CartItemUnCheckEffect(store, payload);
    },
    //全选
    SelecAllCart(store, payload) {
      SelecAllCartEffect(store, payload);
    },
    //取消全选
    unSelecAllCart(store, payload) {
      unSelecAllCartEffect(store, payload);
    },
    //清空
    clearCart(store, payload) {
      clearCartEffect(store, payload);
    },
    //存储本地
    setCartListlocal(store, payload){
      setCartListlocalEffect(store, payload);
    },
    //存储店铺信息
    setShopInfo(store, payload){
      setShopInfoEffect(store, payload);
    }

  },
  modules: {}
});
