import { createSlice } from '@reduxjs/toolkit'

const saved = JSON.parse(localStorage.getItem('ml_user') || 'null')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: saved,
    favorites: JSON.parse(localStorage.getItem('ml_favorites') || '[]'),
  },
  reducers: {
    login(state, action) {
      state.user = action.payload
      localStorage.setItem('ml_user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('ml_user')
    },
    toggleFavorite(state, action) {
      const movie = action.payload
      const exists = state.favorites.find((f) => f.id === movie.id)
      if (exists) {
        state.favorites = state.favorites.filter((f) => f.id !== movie.id)
      } else {
        state.favorites.push(movie)
      }
      localStorage.setItem('ml_favorites', JSON.stringify(state.favorites))
    },
  },
})

export const { login, logout, toggleFavorite } = authSlice.actions
export default authSlice.reducer
