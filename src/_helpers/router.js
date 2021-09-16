import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/splash'
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        component: () => import('@/views/Splash/Index.vue')
      },
      {
        path: 'splash',
        component: () => import('@/views/Splash/Index.vue')
      },
      {
        path: '/qr',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        component: () => import('../views/qr/Index.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 1,
        component: () => import('../views/authentication/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 2,
        component: () => import('../views/home/Index.vue')
    },
    {
        path: '/vendor/:id',
        name: 'Vendor',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 3,
        component: () => import('../views/vendor/Index.vue')
    },
    {
        path: '/vendor/:id/ticket',
        name: 'Ticket',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 4,
        component: () => import('../views/vendor/Ticket.vue')
    },
    {
        path: '/ticket_request/:id',
        name: 'Ticket',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 5,
        component: () => import('../views/plans/SignleTicketRequest.vue')
    },
    {
        path: '/ticket/:hashedid',
        name: 'Ticket',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 5,
        component: () => import('../views/plans/SingleTicket.vue')
    },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)

// export const router = new Router({
//     mode: 'history',
//     scrollBehavior() {
//         return {
//             x: 0,
//             y: 0
//         }
//     },
//     base: process.env.BASE_URL,
//     routes: [
//         {
//             path: '/',
//             // ======================
//             // Theme routes / pages
//             // ======================
//             children: [
//             { path: '/', redirect: '/home' },
//             {
//                 path: '/splash',
//                 meta:{
//                     authRequired: false,
//                     authorize: ['*']
//                 },
//                 component: () => import('../views/Splash/Index.vue')
//             },
//             {
//                 path: '/qr',
//                 meta:{
//                     authRequired: false,
//                     authorize: ['*']
//                 },
//                 component: () => import('../views/Splash/qr.vue')
//             },
//             {
//                 path: '/login',
//                 name: 'Login',
//                 meta:{
//                     authRequired: false,
//                     authorize: ['*']
//                 },
//                 index: 1000,
//                 component: () => import('../views/authentication/Login.vue')
//             },
//             {
//                 path: '/home',
//                 name: 'Home',
//                 meta:{
//                     authRequired: false,
//                     authorize: ['*']
//                 },
//                 index: 1000,
//                 component: () => import('../views/home/Index.vue')
//             },
//             {
//                 path: '/vendor/:id',
//                 name: 'Vendor',
//                 meta:{
//                     authRequired: false,
//                     authorize: ['*']
//                 },
//                 index: 1000,
//                 component: () => import('../views/vendor/Index.vue')
//             },
//             {
//                 path: '/vendor/:id/ticket',
//                 name: 'Ticket',
//                 meta:{
//                     authRequired: false,
//                     authorize: ['*']
//                 },
//                 index: 1000,
//                 component: () => import('../views/vendor/Ticket.vue')
//             },
//           ]
//         },
       


//         // Redirect to 404 page, if no match found
//         {
//             path: '*',
//             redirect: '/Error404'
//         }
//     ]
// })


// import NProgress from 'nprogress';

// router.beforeEach((to, from, next) => {

//     const kioskLoggedIn = JSON.parse(localStorage.getItem('kiosk'));
//     if (to.meta.authRequired && !kioskLoggedIn) {
//         localStorage.setItem('kiosk', null);
//         return next('/login');
//     }

//     next();
// })

// router.beforeResolve((to, from, next) => {
//     // If this isn't an initial page load.
//     if (to.name) {
//         // Start the route progress bar.
//         NProgress.start()
//     }
//     next()
// })

// router.afterEach(() => {
//     // Complete the animation of the route progress bar.
//     NProgress.done()
// })

// export default router