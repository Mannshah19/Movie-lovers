import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { searchMovies, clearSearch } from '../../redux/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import './MovieSearch.css'

export default function MovieSearch() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const { searchResults, searchStatus, error } = useSelector((s) => s.movies)

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearSearch())
      return
    }
    const timer = setTimeout(() => {
      dispatch(searchMovies(query))
    }, 500)
    return () => clearTimeout(timer)
  }, [query, dispatch])

  const handleClear = () => {
    setQuery('')
    dispatch(clearSearch())
  }

  return (
    <section className="search-section py-5">
      <div className="glow-blob search-blob-1" />
      <div className="glow-blob search-blob-2" />

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>

        <div className="text-center mb-5">
          <span className="section-tag">FIND YOUR MOVIE</span>
          <h2 className="display-5 fw-bold text-white mt-3 mb-3">
            Search <span className="gradient-text">Movies</span>
          </h2>
          <p style={{ color: 'var(--text-muted-custom)', maxWidth: '480px', margin: '0 auto' }}>
            Search from thousands of movies. Type anything to get started.
          </p>
        </div>

        <div className="search-box mx-auto mb-5">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="search"
            className="search-input"
            placeholder="Search by title, genre, actor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="clear-btn" onClick={handleClear} aria-label="Clear search">
              <XCircleIcon className="clear-icon" />
            </button>
          )}
        </div>

        {searchStatus === 'loading' && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-ring" />
          </div>
        )}

        {searchStatus === 'failed' && (
          <div className="alert-box text-center py-4">
            <p className="mb-0" style={{ color: '#f87171' }}>Something went wrong: {error}</p>
          </div>
        )}

        {searchStatus === 'succeeded' && searchResults.length === 0 && (
          <div className="text-center py-5">
            <MagnifyingGlassIcon className="empty-icon" />
            <p className="mt-3" style={{ color: 'var(--text-muted-custom)' }}>No results found for "{query}"</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <>
            <p className="mb-4 small" style={{ color: 'var(--text-muted-custom)' }}>
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="row g-4">
              {searchResults.map((movie) => (
                <div key={movie.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  )
}
