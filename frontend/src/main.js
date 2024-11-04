import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { firebaseApp } from './firebase/init'
import { VueFire, VueFireAuth } from 'vuefire'



createApp(App).use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  }).use(router)

.mount('#app')
