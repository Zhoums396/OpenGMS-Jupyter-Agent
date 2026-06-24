import { createRouter, createWebHistory } from 'vue-router'
import DocArticlePage from './docs/DocArticlePage.vue'
import { docsPages } from './content/docs'

const routes = docsPages.map(page => ({
  path: page.slug ? `/${page.slug}/` : '/',
  name: page.slug || 'docs-home',
  component: DocArticlePage,
  props: {
    slug: page.slug
  }
}))

const docsBase = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/docs/`

const router = createRouter({
  history: createWebHistory(docsBase),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 42,
        behavior: 'smooth'
      }
    }

    return { top: 0, behavior: 'smooth' }
  }
})

export default router
