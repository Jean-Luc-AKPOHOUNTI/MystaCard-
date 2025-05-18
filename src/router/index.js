import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/components/Home.vue'
import Facile from '../components/Facile.vue'
import Moyen from '../components/Moyen.vue'
import Difficile from '../components/Difficile.vue'
import Interface from '../components/Interface.vue';
import Login from '../components/Login.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/app',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { 
        path: 'home',
        component: Home,
        name: 'home',
        meta: { requiresAuth: true }
      },
      { 
        path: 'facile',
        component: Facile,
        name: 'facile',
        meta: { requiresAuth: true }
      },
      { 
        path: 'moyen',
        component: Moyen,
        name: 'moyen',
        meta: { requiresAuth: true }
      },
      { 
        path: 'difficile',
        component: Difficile,
        name: 'difficile',
        meta: { requiresAuth: true }
      },
      { 
        path: 'profil',
        component: () => import('../components/Profil.vue'),
        name: 'profil',
        meta: { requiresAuth: true }
      }
    ]
  },
  
  {
    path: '/interface',
    component: AuthLayout,
    children: [
      { 
        path: '',
        component: Interface,
        name: 'interface'
      }
    ]
  },

  {
    path: '/login',
    component: AuthLayout,
    meta: { requiresAuth: false },
    children: [
      { 
        path: '',
        component: Login,
        name: 'login'
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

// Guard de navigation
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Vérifie l'état d'authentification au chargement
  authStore.checkAuth()
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = authStore.isLoggedIn

  if (requiresAuth && !isAuthenticated) {
    // Redirection vers login si la route nécessite une authentification
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // Redirection vers home si déjà authentifié
    next('/app/home')
  } else {
    next()
  }
})

export default router