import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/components/Home.vue'
import Facile from '../components/Facile.vue'
import Moyen from '../components/Moyen.vue'
import Difficile from '../components/Difficile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/facile', component: Facile},
  { path: '/moyen', component: Moyen },
  { path: '/difficile', component: Difficile },
  { path: '/profil', component: () => import('../components/Profil.vue') },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router