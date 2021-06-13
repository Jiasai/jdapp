import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component:()=>import(/* webpackChunkName: "home" */'../views/home/Home'),
    beforeEnter(to,from,next){
      localStorage.pathName=to.name;next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import(/* webpackChunkName: "login" */'../views/login/Login'),
    beforeEnter(to,from,next){
      //只有访问Login页面之前执行
      //next意思是只有调用我，逻辑才往下执行
      const {isLogin} = localStorage;
      isLogin?next({name:'Home'}):next()     
    }
  },
  {
    path: '/register',
    name: 'Register',
    component:()=>import(/* webpackChunkName: "register" */'../views/register/Register'),
    beforeEnter(to,from,next){
      const {isLogin} = localStorage;
      isLogin?next({name:'Home'}):next()    
    }
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component:()=>import(/* webpackChunkName: "shop" */'../views/shop/Shop')
  },
  {
    path: '/cart',
    name: 'Cart',
    component:()=>import(/* webpackChunkName: "cart" */'../views/cart/Cart'),
    beforeEnter(to,from,next){
      localStorage.pathName=to.name;next();
    }
  },
  {
    path: '/order',
    name: 'Order',
    component:()=>import(/* webpackChunkName: "order" */'../views/order/Order'),
    beforeEnter(to,from,next){
      localStorage.pathName=to.name;next();
    }
  },
  {
    path: '/ordercreation/:id',
    name: 'orderCreation',
    component:()=>import(/* webpackChunkName: "orderCreation" */'../views/order/OrderCreation'),
    beforeEnter(to,from,next){
          const {shopNull} = localStorage; 
          if(shopNull){
            next({name:'Home'});           
          }else{           
            next();
          }
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component:()=>import(/* webpackChunkName: "personal" */'../views/personal/Personal'),
    beforeEnter(to,from,next){
      localStorage.pathName=to.name;next();
    }
  },
  {
    path: '/address',
    name: 'Address',
    component:()=>import(/* webpackChunkName: "address" */'../views/address/Address')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//任何路由跳转前，都会执行 beforeEach()
router.beforeEach((to,from,next)=>{
  const {isLogin}=localStorage;
  
  //如果你是登录状态，想访问哪个都可以，直接next()
  //如果你不是登录状态，并且，不是去直接访问"Login"页面 （是直接访问，就直接 next()正常，并且也不是直接访问 "Register"，我就让你 跳转访问 Login ）
  if(!isLogin&&to.name!=='Login'&&to.name!=='Register'){
    next({name:'Login'});
  }else{
    next();
  }
});




export default router
