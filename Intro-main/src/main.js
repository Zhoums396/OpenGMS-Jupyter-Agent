import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { consumeRedirectPath, redirectDocsRequestFromMainApp } from './redirect'
import './style.css'

if (!redirectDocsRequestFromMainApp()) {
  const app = createApp(App)
  const redirectPath = consumeRedirectPath()

  app.use(router)

  if (redirectPath && !redirectPath.startsWith('/docs')) {
    router.replace(redirectPath)
  }

  app.mount('#app')
}
