import { createApp } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiStarFill,
  CoStar,
  IoCloseCircleOutline,
  IoAddCircleOutline,
} from 'oh-vue-icons/icons'
addIcons(BiStarFill, CoStar, IoCloseCircleOutline, IoAddCircleOutline)

import App from './App.vue'
import router from './router'
import store from './store'
import shortText from './directives/shortText'

createApp(App)
  .use(router)
  .use(store)
  .directive('shortText', shortText)
  .component('v-icon', OhVueIcon)
  .mount('#app')
