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
        path: '/splash',
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
        path: '/vendor/:id/queues',
        name: 'Queues',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 4,
        component: () => import('../views/vendor/Ticket.vue')
    },
    {
        path: '/plans',
        name: 'Plans',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 5,
        component: () => import('../views/plans/Index.vue')
    },
    {
        path: '/ticket_request/:id',
        name: 'TicketRequest',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 5,
        component: () => import('../views/plans/SignleTicketRequest.vue')
    },
    {
        path: '/ticket/:uid',
        name: 'Ticket',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 6,
        component: () => import('../views/plans/SingleTicket.vue')
    },
    {
        path: '/vendor/:id/book',
        name: 'Book',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 7,
        component: () => import('../views/vendor/Book.vue')
    },
    {
        path: '/booking_request/:uid',
        name: 'BookingRequest',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 8,
        component: () => import('../views/plans/SingleBookingRequest.vue')
    },
    {
        path: '/booking/:id',
        name: 'Booking',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 9,
        component: () => import('../views/plans/SingleBooking.vue')
    },
    {
        path: '/stations',
        name: 'Stations',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 10,
        component: () => import('../views/stations/Index.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        meta:{
            authRequired: false,
            authorize: ['*']
        },
        index: 11,
        component: () => import('../views/profile/Index.vue')
    }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
