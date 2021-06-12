import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export const useCommonCartEffect = () => {
    const store = useStore();
    const shopId = useRoute().params.id;
    const router = useRouter();
    const cartList = store.state.cartList;
    //计算属性：购物车商品数量、总价、全选状态
    const calculations = computed(() => {
        const result = { total: 0, price: 0, selectAll: true, isPush:false };
        const shop = cartList[shopId];
        const productList = shop?.productList;
        if (!shop?.checkedAll) {
            result.selectAll = false;
        }
        if (productList) {
            for (let i in productList) {
                const product = productList[i];
                if (product.count&&product.checked) {             
                    //如果count存在的话
                    result.total += product.count;
                    result.price += product.price * product.count;
                    result.isPush=true;                   
                }
            }
        }
        result.price = result.price.toFixed(2);
        if(result.price===0){result.isPush=false};
        return result;
    });


    //计算属性：单个店铺购物车列表
    const productList = computed(() => {
        const productList = cartList[shopId]?.productList || [];
        return productList;
    });


    //购物车显示隐藏
    const cartShow = ref(false);
    const totalChecked = computed(() => {
        let totalChecked = false;
        const productList = cartList[shopId]?.productList;
        if (productList) {
            for (let i in productList) {
                const product = productList[i];
                if (product.count) {
                    //如果count存在的话
                    totalChecked = true;
                }
            }
            if (!totalChecked) {
                //如果购物车没数据了
                cartShow.value = !cartShow.value;
            }
        }
        return totalChecked;
    });

    const changCartShow = () => {
        if (totalChecked.value) {
            cartShow.value = !cartShow.value;
        }
    };


    //增加商品
    const addCartItemInfo = (shopId, productId, productInfo) => {
        store.dispatch("addCartItemInfo", { shopId, productId, productInfo});
    };

    //删除商品
    const reduceCartItemInfo = (shopId, productId, productInfo) => {
        store.dispatch("reduceCartItemInfo", { shopId, productId, productInfo });
    };

    //点击购物车选中状态
    const CartItemChecked = (shopId, productId) => {
        store.dispatch("CartItemChecked", { shopId, productId });
    };
    //点击购物车取消选中
    const CartItemUnCheck = (shopId, productId) => {
        store.dispatch("CartItemUnCheck", { shopId, productId });
    };
    //清空购物车
    const clearCart = shopId => {
        store.dispatch("clearCart", { shopId });
    };
    //全选状态
    const SelecAllCart = shopId => {
        store.dispatch("SelecAllCart", { shopId });
    };
    //取消全选
    const unSelecAllCart = shopId => {
        store.dispatch("unSelecAllCart", { shopId });
    };

    //结算订单
    const handleOrderCreation = (shopId) => {
        localStorage.removeItem('shopNull'); //删除本地存储shopNull，页面顺利跳转
        store.dispatch("setCartListlocal", { shopId }); //先存下本地存储
        setTimeout(() => {
            // 跳转
            router.push(`/orderCreation/${shopId}`);
            // 带查询参数，变成 /register?plan=private
            //router.push({ path: 'register', query: { plan: 'private' }})
        }, 50);

    }

    return {
        cartList,
        productList,
        shopId,
        cartShow,
        changCartShow,
        totalChecked,
        calculations,       
        addCartItemInfo,
        reduceCartItemInfo,
        CartItemChecked,
        CartItemUnCheck,
        clearCart,
        SelecAllCart,
        unSelecAllCart,
        handleOrderCreation
    };
}

//提交订单：shopCart组件 

export const useShopCartEffect = (shopId, cartList) => {
    //计算属性，店铺信息
    const ShopInfos = computed(() => {
      const shopinfo = { shopName: "", shopImg: "" };
      const shop = cartList[shopId];
      shopinfo.shopName = shop.shopName;
      shopinfo.shopImg = shop.shopImg;
      return shopinfo;
    });
    //计算属性：提交订单购物车列表（选中结算）
    const cartProductList = computed(() => {
      const resultList = [];
      const productList = cartList[shopId]?.productList;
      for (let i in productList) {
        if (productList[i].checked) {
          resultList.push(productList[i]);
        }
      }
      return resultList;
    });

    //计算属性：购物车商品数量、总价、全选状态
    const cartCalc = computed(() => {
        const result = { total: 0, price: 0};
        const productList =cartProductList.value; 
        if (productList) {
            for (let i in productList) {
                const product = productList[i];
                if (product.count) {
                    //如果count存在的话
                    result.total += product.count;
                    result.price += product.price * product.count;                    
                }
            }
        }
        result.price = result.price.toFixed(2);
        return result;
    });

  
    return { ShopInfos, cartProductList,cartCalc };
  }
  


//从本地存储获取购物车数据
export const useLocalStorageEffect = () => {
    const store = useStore();
    //从本地获取数据及时间戳
    const { cartList } = localStorage;
    const { cartListTime } = localStorage;
    if (!cartList) return;
    //当前的时间戳
    const newTime = new Date().getTime();
    //时间戳差值
    const timeDiff = newTime - cartListTime;
    //换算小时
    let hour = parseInt(timeDiff / (1000 * 60 * 60));
    if (hour <= 240000) {
        //10000天之内，可以用本地数据
        const keyName = 'cartList';
        const data = cartList;
        store.commit("setStateData", { keyName, data });
    }
}

//设置本地存储
export const setLocalStorageEffect=(key,data)=>{
    localStorage[key] = JSON.stringify(data);
}
//读取本地存储
export const getLocalStorageEffect=(key)=>{
   return JSON.parse(localStorage[key]);   
}






