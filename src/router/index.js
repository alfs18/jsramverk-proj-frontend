import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'CreateAccount',
        component: ()=>import('../components/CreateAccount.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: ()=>import('../components/Login.vue')
    },
    {
        path: '/logged-in',
        name: 'LoggedIn',
        component: ()=>import('../components/LoggedIn.vue')
    },
    {
        path: '/logout',
        name: 'LoggedIn',
        component: ()=>import('../components/LoggedIn.vue')
    },
    {
        path: '/trade',
        name: 'Trade',
        component: ()=>import('../components/Trade.vue')
    },
    {
        path: '/trade/buy/:obj',
        name: 'Buy',
        component: ()=>import('../components/Buy.vue')
    },
    {
        path: '/trade/sell/:obj',
        name: 'Sell',
        component: ()=>import('../components/Sell.vue')
    },
    {
        path: '/trade/add-money',
        name: 'AddMoney',
        component: ()=>import('../components/AddMoney.vue')
    },
    {
        path: '/trade/show-all',
        name: 'ShowAllObjects',
        component: ()=>import('../components/ShowAllObjects.vue')
    },
    {
        path: '/trade/show-one/:obj',
        name: 'ShowOneObject',
        component: ()=>import('../components/ShowOneObject.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
