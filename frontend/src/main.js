import { createApp } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { IoCloseCircleOutline, BiStarFill, CoStar } from 'oh-vue-icons/icons'

import App from './App.vue'
import router from './router'
import store from './store'
import shortText from './directives/shortText'

addIcons(IoCloseCircleOutline, BiStarFill, CoStar)

createApp(App)
  .use(router)
  .use(store)
  .component('v-icon', OhVueIcon)
  .directive('shortText', shortText)
  .mount('#app')
