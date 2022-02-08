import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './src/app'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)
library.add(faTrash)
library.add(faMinus)

const app = createApp(App)
app.use(createPinia())
app.component('fa-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
