import { createRouter, createWebHistory } from 'vue-router'
import DownloadPage from './pages/DownloadPage.vue'
import FeaturesPage from './pages/FeaturesPage.vue'
import HomePage from './pages/HomePage.vue'
import VideoPage from './pages/VideoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/features', name: 'features', component: FeaturesPage },
    { path: '/download', name: 'download', component: DownloadPage },
    { path: '/video', name: 'video', component: VideoPage }
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
