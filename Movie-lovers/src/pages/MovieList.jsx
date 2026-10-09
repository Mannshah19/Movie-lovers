import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilmIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { fetchPopularMovies } from '../redux/movieSlice'
import MovieCard from '../components/MovieCard/MovieCard'
import './MovieList.css'

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 18: 'Drama', 14: 'Fantasy', 27: 'Horror',
  10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller', 10752: 'War',
}

const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Rating',     value: 'rating' },
  { label: 'Newest',     value: 'newest' },
]

export default function MovieList() {
  const dispatch = useDispatch()
  const { popular, status, error } = useSelector((s) => s.movies)
  const [activeGenre, setActiveGenre] = useState('All')
  const [sort, setSort] = useState('popularity')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPopularMovies())
  }, [dispatch, status])

  // collect genres that actually appear in the results
  const genres = useMemo(() => {
    const ids = new Set(popular.flatMap((m) => m.genre_ids || []))
    return ['All', ...Object.entries(GENRE_MAP).filter(([id]) => ids.has(Number(id))).map(([, name]) => name)]
  }, [popular])

  const filtered = useMemo(() => {
    let list = activeGenre === 'All'
      ? [...popular]
      : popular.filter((m) => (m.genre_ids || []).some((id) => GENRE_MAP[id] === activeGenre))

    if (sort === 'rating')     list.sort((a, b) => b.vote_average - a.vote_average)
    if (sort === 'newest')     list.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    return list
  }, [popular, activeGenre, sort])

  return (
    <section className="movielist-section py-5">
      <div className="glow-blob ml-blob-1" />
      <div className="glow-blob ml-blob-2" />

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>

        <div className="text-center mb-5">
          <span className="section-tag">DISCOVER</span>
          <h2 className="display-5 fw-bold text-white mt-3 mb-3">
            Popular <span className="gradient-text">Movies</span>
          </h2>
          <p style={{ color: 'var(--text-muted-custom)', maxWidth: '480px', margin: '0 auto' }}>
            Browse the most popular movies right now, updated daily from TMDb.
          </p>
        </div>

        {/* filters row */}
        {status === 'succeeded' && (
          <div className="filters-row mb-5">
            <div className="genre-pills d-flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGenre(g)}
                  className={`genre-pill${activeGenre === g ? ' active' : ''}`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="sort-wrap d-flex align-items-center gap-2 mt-3 mt-md-0">
              <AdjustmentsHorizontalIcon style={{ width: 18, height: 18, color: 'var(--text-muted-custom)' }} />
              <div className="d-flex gap-2">
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setSort(o.value)}
                    className={`sort-btn${sort === o.value ? ' active' : ''}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-ring" />
          </div>
        )}

        {status === 'failed' && (
          <div className="error-box text-center py-4">
            <p style={{ color: '#f87171' }} className="mb-0">
              Failed to load movies.<br />
              <small style={{ opacity: 0.6 }}>{error}</small>
            </p>
          </div>
        )}

        {status === 'succeeded' && filtered.length === 0 && (
          <div className="text-center py-5">
            <FilmIcon style={{ width: 52, height: 52, color: 'var(--text-muted-custom)' }} />
            <p className="mt-3" style={{ color: 'var(--text-muted-custom)' }}>No movies in this genre.</p>
          </div>
        )}

        {status === 'succeeded' && filtered.length > 0 && (
          <>
            <p className="mb-4 small" style={{ color: 'var(--text-muted-custom)' }}>
              {filtered.length} movie{filtered.length !== 1 ? 's' : ''}
              {activeGenre !== 'All' ? ` in ${activeGenre}` : ''}
            </p>
            <div className="row g-4">
              {filtered.map((movie, i) => (
                <div
                  key={movie.id}
                  className="col-6 col-md-4 col-lg-3 col-xl-2 fade-in-card"
                  style={{ animationDelay: `${(i % 12) * 40}ms` }}
                >
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
