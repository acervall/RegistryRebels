import { createRouter, createWebHashHistory } from 'vue-router'

import EditProductView from './views/EditProductView.vue'
import HomeView from './views/HomeView.vue'
import GreetingCheckoutView from './views/GreetingCheckoutView.vue'
import GuestViewBought from './views/GuestViewBought.vue'
import RsvpView from './views/RsvpView.vue'
import UserSignupView from './views/UserSignupView.vue'
import UserSigninView from './views/UserSigninView.vue'
import UserHomeView from './views/UserHomeView.vue'
import UserListView from './views/UserListView.vue'
import UserListsOverView from './views/UserListsOverView.vue'
import UserGuestOverView from './views/UserGuestOverView.vue'
import UserGuestFoodView from './views/UserGuestFoodView.vue'
import UserListAddView from './views/UserListAddView.vue'

function isSignedIn() {
  return localStorage.getItem('user_Id') ? true : false // amazing
}

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      beforeEnter(to, from, next) {
        if (isSignedIn()) {
          next()
        } else {
          next('/')
        }
      },
      component: EditProductView,
      path: '/editProduct/:listId/:productId',
    },
    {
      component: HomeView,
      path: '/:url',
    },
    {
      component: GreetingCheckoutView,
      path: '/checkout',
    },
    {
      component: GuestViewBought,
      path: '/guest',
    },
    {
      component: RsvpView,
      path: '/rsvp',
    },
    {
      component: UserSignupView,
      path: '/signup',
    },
    {
      component: UserSigninView,
      path: '/',
    },
    {
      beforeEnter(to, from, next) {
        if (isSignedIn()) {
          next()
        } else {
          next('/')
        }
      },
      component: UserHomeView,
      path: '/userhome',
    },
    {
      beforeEnter(to, from, next) {
        if (isSignedIn()) {
          next()
        } else {
          next('/')
        }
      },
      component: UserListsOverView,
      path: '/userlistsoverview',
    },
    {
      beforeEnter(to, from, next) {
        if (isSignedIn()) {
          next()
        } else {
          next('/')
        }
      },
      component: UserListView,
      path: '/userlist/:id',
    },
    {
      beforeEnter(to, from, next) {
        if (isSignedIn()) {
          next()
        } else {
          next('/')
        }
      },
      component: UserGuestOverView,
      path: '/userguestoverview',
    },
    {
      component: UserGuestFoodView,

      path: '/userguestfoodview',
    },
    {
      beforeEnter(to, from, next) {
        if (isSignedIn()) {
          next()
        } else {
          next('/')
        }
      },
      component: UserListAddView,
      path: '/userlistadd',
    },
  ],
})
