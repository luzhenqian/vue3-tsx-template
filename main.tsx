import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './src/app'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faMinus } from '@fortawesome/free-solid-svg-icons'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

library.add(faPlus)
library.add(faTrash)
library.add(faMinus)

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://e48ad874fbc046fcba0b1becf0ed47bc@o1145987.ingest.sentry.io/6214266",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(createPinia())
app.component('fa-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
