import { defineStore } from 'pinia'

export const useCardsStore = defineStore('cards', {
  state: () => ({
    solvedAnimeCards: [], // Stocke les noms des cartes anime résolues
    solvedEnigmeCards: [], // Stocke les noms des cartes énigmes résolues
    stats: {
      animeCards: {
        total: 0,
        solved: 0,
        byManga: {} // Pour les statistiques par manga
      },
      enigmeCards: {
        total: 0,
        solved: 0
      },
      streak: 0, // Série de jours consécutifs
      lastSolved: null, // Date de la dernière carte résolue
    }
  }),

  getters: {
    // Pourcentage global de progression
    globalProgress: (state) => {
      const total = state.stats.animeCards.total + state.stats.enigmeCards.total
      const solved = state.stats.animeCards.solved + state.stats.enigmeCards.solved
      return total ? Math.round((solved / total) * 100) : 0
    },

    // Pourcentage de progression par type
    animeProgress: (state) => {
      const { total, solved } = state.stats.animeCards
      return total ? Math.round((solved / total) * 100) : 0
    },

    enigmeProgress: (state) => {
      const { total, solved } = state.stats.enigmeCards
      return total ? Math.round((solved / total) * 100) : 0
    },

    // Statistiques par manga
    mangaStats: (state) => {
      return state.stats.animeCards.byManga
    },

    // Cartes non résolues
    unsolvedAnimeCards: (state) => (allCards) => {
      return allCards.filter(card => !state.solvedAnimeCards.includes(card.name))
    },

    unsolvedEnigmeCards: (state) => (allCards) => {
      return allCards.filter(card => !state.solvedEnigmeCards.includes(card.name))
    },

    playerLevel: (state) => {
      return Math.max(1, Math.floor(state.globalProgress / 5));
    },
  },

  actions: {
    // Initialiser les statistiques
    initializeStats(allAnimeCards, allEnigmeCards) {
      // Réinitialiser les compteurs
      this.stats.animeCards.total = 0;
      this.stats.animeCards.solved = 0;
      this.stats.animeCards.byManga = {};
      this.stats.enigmeCards.total = 0;
      this.stats.enigmeCards.solved = 0;

      // Recalculer le total et les stats par manga
      this.stats.animeCards.total = allAnimeCards.length;
      allAnimeCards.forEach(card => {
        if (!this.stats.animeCards.byManga[card.mangaName]) {
          this.stats.animeCards.byManga[card.mangaName] = { total: 0, solved: 0 };
        }
        this.stats.animeCards.byManga[card.mangaName].total++;
      });

      // Recalculer les cartes résolues
      this.solvedAnimeCards.forEach(cardName => {
        const card = allAnimeCards.find(c => c.name === cardName);
        if (card && this.stats.animeCards.byManga[card.mangaName]) {
          this.stats.animeCards.byManga[card.mangaName].solved++;
          this.stats.animeCards.solved++;
        }
      });

      this.stats.enigmeCards.total = allEnigmeCards.length;
      this.stats.enigmeCards.solved = this.solvedEnigmeCards.length;
    },

    // Marquer une carte anime comme résolue
    markAnimeCardAsSolved(cardName, card) {
      if (!this.solvedAnimeCards.includes(cardName)) {
        this.solvedAnimeCards.push(cardName)
        this.stats.animeCards.solved++
        this.stats.animeCards.byManga[card.mangaName].solved++
        this.updateLastSolved()
        this.saveToLocalStorage()
      }
    },

    // Marquer une énigme comme résolue
    markEnigmeCardAsSolved(cardName) {
      if (!this.solvedEnigmeCards.includes(cardName)) {
        this.solvedEnigmeCards.push(cardName)
        this.stats.enigmeCards.solved++
        this.updateLastSolved()
        this.saveToLocalStorage()
      }
    },

    // Vérifier si une carte anime est résolue
    isAnimeCardSolved(cardName) {
      return this.solvedAnimeCards.includes(cardName)
    },

    // Vérifier si une carte énigme est résolue
    isEnigmeCardSolved(cardName) {
      return this.solvedEnigmeCards.includes(cardName)
    },

    // Mettre à jour la date de dernière résolution et la série
    updateLastSolved() {
      const today = new Date().toDateString()
      const lastSolved = this.stats.lastSolved ? new Date(this.stats.lastSolved) : null
      
      if (!lastSolved || lastSolved.toDateString() === new Date(today).toDateString()) {
        // Même jour, on ne change pas la série
      } else if (lastSolved && new Date(lastSolved.setDate(lastSolved.getDate() + 1)).toDateString() === today) {
        // Jour suivant, on incrémente la série
        this.stats.streak++
      } else {
        // Plus d'un jour d'écart, on réinitialise la série
        this.stats.streak = 1
      }
      
      this.stats.lastSolved = today
    },

    // Sauvegarder dans le localStorage
    saveToLocalStorage() {
      localStorage.setItem('solvedAnimeCards', JSON.stringify(this.solvedAnimeCards))
      localStorage.setItem('solvedEnigmeCards', JSON.stringify(this.solvedEnigmeCards))
      localStorage.setItem('cardsStats', JSON.stringify(this.stats))
    },

    // Charger depuis le localStorage
    loadFromLocalStorage() {
      const savedAnimeCards = localStorage.getItem('solvedAnimeCards')
      const savedEnigmeCards = localStorage.getItem('solvedEnigmeCards')
      const savedStats = localStorage.getItem('cardsStats')

      if (savedAnimeCards) this.solvedAnimeCards = JSON.parse(savedAnimeCards)
      if (savedEnigmeCards) this.solvedEnigmeCards = JSON.parse(savedEnigmeCards)
      if (savedStats) this.stats = JSON.parse(savedStats)
    },

    // Réinitialiser les cartes résolues (optionnel, pour le debug)
    resetSolvedCards() {
      this.solvedAnimeCards = []
      this.solvedEnigmeCards = []
      this.saveToLocalStorage()
    }
  }
}) 