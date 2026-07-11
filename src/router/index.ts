import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue"
import About from "../views/About.vue"
import ScrapeSite from "../views/ScrapeSite.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/scrape-site', component: ScrapeSite },
  ],
})

export default router
