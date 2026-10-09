import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tmdb from '../data/api'

export const fetchPopularMovies = createAsyncThunk('movies/fetchPopular', async () => {
  const [p1, p2, p3] = await Promise.all([
    tmdb.get('/movie/popular', { params: { page: 1 } }),
    tmdb.get('/movie/popular', { params: { page: 2 } }),
    tmdb.get('/movie/popular', { params: { page: 3 } }),
  ])
  return [...p1.data.results, ...p2.data.results, ...p3.data.results]
})

export const fetchMovieDetails = createAsyncThunk('movies/fetchDetails', async (id) => {
  const [details, credits] = await Promise.all([
    tmdb.get(`/movie/${id}`),
    tmdb.get(`/movie/${id}/credits`),
  ])
  return { ...details.data, cast: credits.data.cast.slice(0, 8) }
})

export const searchMovies = createAsyncThunk('movies/search', async (query) => {
  const res = await tmdb.get('/search/movie', { params: { query } })
  return res.data.results
})

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    searchResults: [],
    selectedMovie: null,
    status: 'idle',
    searchStatus: 'idle',
    detailStatus: 'idle',
    error: null,
  },
  reducers: {
    clearSearch(state) {
      state.searchResults = []
      state.searchStatus = 'idle'
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null
      state.detailStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => { state.status = 'succeeded'; state.popular = action.payload })
      .addCase(fetchPopularMovies.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })

      .addCase(fetchMovieDetails.pending, (state) => { state.detailStatus = 'loading' })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => { state.detailStatus = 'succeeded'; state.selectedMovie = action.payload })
      .addCase(fetchMovieDetails.rejected, (state, action) => { state.detailStatus = 'failed'; state.error = action.error.message })

      .addCase(searchMovies.pending, (state) => { state.searchStatus = 'loading' })
      .addCase(searchMovies.fulfilled, (state, action) => { state.searchStatus = 'succeeded'; state.searchResults = action.payload })
      .addCase(searchMovies.rejected, (state, action) => { state.searchStatus = 'failed'; state.error = action.error.message })
  },
})

export const { clearSearch, clearSelectedMovie } = movieSlice.actions
export default movieSlice.reducer
