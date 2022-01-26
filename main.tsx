import { createApp } from 'vue'
import router from './router'
import App from './pages/app'

const app = createApp(App)
app.use(router)
app.mount('#app')
