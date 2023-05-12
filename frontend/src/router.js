import { createRouter, createWebHashHistory } from 'vue-router'

import EditProductView from './views/EditProductView.vue'
import HomeView from './views/HomeView.vue'
import HomeViewUser from './views/HomeViewUser.vue'
import GreetingCheckoutView from './views/GreetingCheckoutView.vue'
import RsvpView from './views/RsvpView.vue'
import UserSignupView from './views/UserSignupView.vue'
import UserSigninView from './views/UserSigninView.vue'
import UserHomeView from './views/UserHomeView.vue'
import UserListView from './views/UserListView.vue'
import UserListsOverView from './views/UserListsOverView.vue'
import UserGuestOverView from './views/UserGuestOverView.vue'
import UserGuestFoodView from './views/UserGuestFoodView.vue'
import UserListAddView from './views/UserListAddView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: EditProductView,
      path: '/editProduct/:listId/:productId',
    },
    {
      component: HomeView,
      path: '/:id',
    },
    {
      component: GreetingCheckoutView,
      path: '/checkout',
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
      component: UserHomeView,
      path: '/userhome',
    },
    {
      component: UserListsOverView,
      path: '/userlistsoverview',
    },
    {
      component: UserListView,
      path: '/userlist/:id',
    },
    {
      component: UserGuestOverView,
      path: '/userguestoverview',
    },
    {
      component: UserGuestFoodView,
      
      path: '/userguestfoodview',
    },
    {
      component: UserListAddView,
      path: '/userlistadd',
    },
  ],
})
