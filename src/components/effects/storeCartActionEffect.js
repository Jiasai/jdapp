//购物车增加
export const addCartItemInfoEffect=(store, payload)=>{
    const { shopId, productId, productInfo} = payload;
    //取shop数据，(第一次)取不到，设置{}
    let shopInfo = store.state.cartList?.[shopId];

    //设置 shop 的数据
    shopInfo.checkedAll = true;

    //取商品数据
    let product = shopInfo.productList?.[productId];
    //商品赋给数据
    product = productInfo;

    if (!product?.count) {
      //如果取不到(第一次)
      product.count = 0;
    }

    //对取到的数据操作
    product.count += 1;
    //选中状态
    product.checked = true;

    //操作完成，把数据 ，赋值回去
    shopInfo.productList[productId]=product;
    store.commit("setCartListLocalstorage", { shopId, shopInfo });

}

//购物车删除
export const reduceCartItemInfoEffect=(store, payload)=>{
     const { shopId, productId } = payload;
      //取数据
      let shopInfo = store.state.cartList[shopId];
      let product = shopInfo.productList[productId];
      //对取到的数据操作
      product.count -= 1;
      if (product.count === 0) {
        product = {};
      }
      //操作完成，把数据 ，赋值回去
      shopInfo.productList[productId] = product;
      store.commit("setCartListLocalstorage", { shopId, shopInfo });
}

//购物车商品选中
export const CartItemCheckedEffect=(store, payload)=>{
    const { shopId, productId } = payload;
      //取数据操作
      let shopInfo = store.state.cartList[shopId];
      let product = shopInfo.productList[productId];
      //选中
      product.checked = true;

      let bool = true;
      //遍历shopInfo.productList
      for (let i in shopInfo.productList) {
        if (!shopInfo.productList[i].checked) {
          bool = false;
        }
      }
      if (bool) {
        shopInfo.checkedAll = true;
      } else {
        shopInfo.checkedAll = false;
      }

      //操作完成，把数据 ，赋值回去
      shopInfo.productList[productId] = product;
      store.commit("setCartListLocalstorage", { shopId, shopInfo });
}

//购物车取消选中
export const CartItemUnCheckEffect=(store, payload)=>{
    const { shopId, productId } = payload;
      //取数据操作
      let shopInfo = store.state.cartList[shopId];
      let product = shopInfo.productList[productId];

      //取消全选
      shopInfo.checkedAll = false;

      product.checked = false;

      //操作完成，把数据 ，赋值回去
      shopInfo.productList[productId] = product;
      store.commit("setCartListLocalstorage", { shopId, shopInfo });
}


//购物车全选
export const SelecAllCartEffect=(store, payload)=>{
    const { shopId } = payload;
      //取数据操作
      let shopInfo = store.state.cartList[shopId];

      //全选
      shopInfo.checkedAll = true;

      //遍历shopInfo.productList
      for (let i in shopInfo.productList) {
        shopInfo.productList[i].checked = true;
      }

      //操作完成，把数据 ，赋值回去
      store.commit("setCartListLocalstorage", { shopId, shopInfo });
}

//购物车取消全选
export const unSelecAllCartEffect=(store, payload)=>{
    const { shopId } = payload;
      //取数据操作
      let shopInfo = store.state.cartList[shopId];

      //取消全选
      shopInfo.checkedAll = false;

      //遍历shopInfo.productList
      for (let i in shopInfo.productList) {
        shopInfo.productList[i].checked = false;
      }

      //操作完成，把数据 ，赋值回去
      store.commit("setCartListLocalstorage", { shopId, shopInfo });
}

//购物车清空
export const clearCartEffect=(store, payload)=>{
    const { shopId } = payload;
      //取数据操作
      let shopInfo = store.state.cartList[shopId];

      //遍历shopInfo.productList
      for (let i in shopInfo.productList) {
        shopInfo.productList[i].count = 0;
      }

      shopInfo.productList = {};
      //取消全选
      shopInfo.checkedAll = false;

      //操作完成，把数据 ，赋值回去
      store.commit("setCartListLocalstorage", { shopId, shopInfo });
}

//购物车存储本地
export const setCartListlocalEffect=(store, payload)=>{
    const { shopId } = payload;
    //取数据操作
    let shopInfo = store.state.cartList[shopId];
    //操作完成，把数据 ，赋值回去
    store.commit("setCartListLocalstorage", { shopId, shopInfo });
}

//存储店铺信息
export const setShopInfoEffect=(store, payload)=>{
  const { shopId,shopName,shopImg } = payload;
  //取shop数据，(第一次)取不到，设置{}
  let shopInfo = store.state.cartList?.[shopId];
  if (!shopInfo) {
       shopInfo = {};
       shopInfo.productList = {};
     }
  shopInfo.shopName = shopName;
  shopInfo.shopImg = shopImg;
   //操作完成，把数据 ，赋值回去
  store.commit("setCartListLocalstorage", { shopId, shopInfo });
}
