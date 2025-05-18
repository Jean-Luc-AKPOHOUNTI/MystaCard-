import { defineStore } from 'pinia'
import { useCardsStore } from './cards'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    getError: (state) => state.error
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        // Simulation d'un appel API
        // Dans un vrai projet, vous feriez :
        // const response = await api.post('/login', credentials)
        
        // Simulation d'une réponse réussie
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simule un délai réseau
        
        const response = {
          user: {
            id: 1,
            username: credentials.username,
            role: 'user'
          },
          token: 'fake-jwt-token-' + Date.now()
        }

        // Stockage des données
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        
        // Sauvegarde dans le localStorage
        localStorage.setItem('user-token', response.token)
        localStorage.setItem('user-data', JSON.stringify(response.user))
        
        return true
      } catch (error) {
        this.error = 'Erreur de connexion'
        console.error('Erreur de connexion:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      this.error = null
      
      // Nettoyage du localStorage sauf les cartes résolues
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-data')
      // Les cartes résolues restent dans le localStorage
    },

    checkAuth() {
      const token = localStorage.getItem('user-token')
      const userData = localStorage.getItem('user-data')
      
      if (token && userData) {
        this.token = token
        this.user = JSON.parse(userData)
        this.isAuthenticated = true
      } else {
        this.logout()
      }
    },

    // Pour la démo, on peut ajouter une action pour simuler une erreur
    simulateError() {
      this.error = 'Erreur de connexion simulée'
      setTimeout(() => {
        this.error = null
      }, 3000)
    }
  }
}) 