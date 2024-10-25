import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTippy from 'vue-tippy'
import App from './App.vue'
import router from './router'
import 'tippy.js/dist/tippy.css'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', //
    component: 'tippy', //
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'top',
      allowHTML: true,
      animation: 'fade',
      delay: [100, null],
    },
  },
)
app.use(ElementPlus)
app.mount('#app')
