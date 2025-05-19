# MystaCard (ミステリカード) – Guide de Style

## 🔵 1. Identité visuelle
- **Nom du site** : MystaCard (ミステリカード)
- **Slogan** : *Retourne la carte, révèle le mystère.*
- **Thème principal** : Quiz interactif sur les mangas avec retournement de cartes.
- **Vibe** : Moderne, manga, mystérieuse, fun, immersive.
- **Logo** : Carte à jouer stylisée avec un kanji 謎 (nazo = mystère)

---

## 🎨 2. Palette de couleurs

| Couleur        | Code HEX   | Usage                        |
|----------------|------------|------------------------------|
| 🌌 Violet mystique | `#6C5CE7` | Couleur principale (boutons, titres, accents) |
| ⚪ Blanc pur     | `#FFFFFF` | Fond clair, texte sur fond sombre |
| ⚫ Gris nuit     | `#1E1E2F` | Fond sombre, header, footer, cartes |
| 🔮 Rose flash    | `#FF6B81` | Accents, hover, animations, badges |
| 💙 Bleu clair    | `#74B9FF` | Bordures, second plan, cartes |
| 🌟 Jaune doré    | `#FFD700` | Points, récompenses, étoiles |
| 🎯 Rouge vif     | `#FF4757` | Erreurs, avertissements |

---

## 🔤 3. Polices

- **Titre / Logo** : `Orbitron` (pour un look futuriste)
- **Sous-titres** : `Poppins` (Medium, 600)
- **Texte courant** : `Roboto` (Regular, 400)
- **Texte japonais** : `Noto Sans JP` (Regular, 400)
- **Tailles de police** :
  - Titres principaux : 2.5rem (40px)
  - Sous-titres : 1.75rem (28px)
  - Texte normal : 1rem (16px)
  - Petits textes : 0.875rem (14px)

---

## 🧩 4. Composants UI

### Cartes
- Bords arrondis : `border-radius: 16px`
- Ombre : `box-shadow: 0 5px 15px rgba(0,0,0,0.2)`
- Animation de flip : `transform-style: preserve-3d`
- Durée de transition : `transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`
- Dimensions : 300px × 400px (desktop), 250px × 350px (mobile)

### Boutons
- Style principal : 
  - `background-color: #6C5CE7`
  - `color: #FFFFFF`
  - `padding: 12px 24px`
  - `border-radius: 8px`
  - `transition: all 0.3s ease`
- Hover : 
  - `transform: translateY(-2px)`
  - `box-shadow: 0 4px 12px rgba(108, 92, 231, 0.3)`

### Navigation
- Hauteur : 70px
- Fond : `#1E1E2F` avec `opacity: 0.95`
- Logo : 40px de hauteur
- Menu items : `Poppins Medium`, espacement de 24px

### Background
- Dégradé principal : `linear-gradient(135deg, #1E1E2F 0%, #2D2D44 100%)`
- Motif manga en filigrane : `opacity: 0.05`
- Animation : particules flottantes subtiles

---

## 📱 5. Responsive Design

### Breakpoints
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

### Layout
- **Mobile** :
  - Navigation : menu burger
  - Cartes : 1 colonne
  - Padding : 16px
- **Tablette** :
  - Navigation : menu horizontal
  - Cartes : 2 colonnes
  - Padding : 24px
- **Desktop** :
  - Navigation : menu complet
  - Cartes : 3 colonnes
  - Padding : 32px

---

## 🎧 6. Effets audio

- **Sons de base** :
  - Flip de carte : `flip-card.mp3` (0.3s)
  - Réponse correcte : `success.mp3` (0.5s)
  - Réponse incorrecte : `error.mp3` (0.4s)
  - Niveau complété : `level-complete.mp3` (1s)

- **Volume** : 30% par défaut, option de mute

---

## 🧠 7. Ambiance visuelle

### Animations
- Flip de carte : rotation 3D avec effet de profondeur
- Particules : points lumineux flottants en arrière-plan
- Transitions : douces avec `cubic-bezier`

### Illustrations
- Style : manga vectoriel moderne
- Thèmes : personnages mystérieux, cartes, symboles japonais
- Format : SVG pour la scalabilité

### Effets spéciaux
- Hover sur les cartes : légère élévation
- Réponses correctes : explosion de particules
- Niveau complété : animation de confetti
