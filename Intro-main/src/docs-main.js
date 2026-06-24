import { createApp } from 'vue'
import DocsApp from './docs/DocsApp.vue'
import docsRouter from './docs-router'
import { consumeRedirectPath } from './redirect'
import './docs-style.css'

const app = createApp(DocsApp)
const redirectPath = consumeRedirectPath()

app.use(docsRouter)

if (redirectPath.startsWith('/docs')) {
  docsRouter.replace(redirectPath.replace(/^\/docs/, '') || '/')
}

app.mount('#docs-app')
