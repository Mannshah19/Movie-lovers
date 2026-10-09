import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  StarIcon,
  CalendarIcon,
  LanguageIcon,
  FilmIcon,
  HeartIcon,
  ArrowLeftIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { fetchMovieDetails, clearSelectedMovie } from '../redux/movieSlice'
import { toggleFavorite } from '../redux/authSlice'
import { TMDB_IMAGE_BASE, TMDB_BACKDROP_BASE } from '../data/constants'
import './MovieDetails.css'

export default function MovieDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedMovie, detailStatus, error } = useSelector((s) => s.movies)
  const { user, favorites } = useSelector((s) => s.auth)
  const isFav = favorites.some((f) => f.id === selectedMovie?.id)

  useEffect(() => {
    dispatch(fetchMovieDetails(id))
    return () => dispatch(clearSelectedMovie())
  }, [id, dispatch])

  if (detailStatus === 'loading') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'var(--dark)' }}>
        <div className="spinner-ring" />
      </div>
    )
  }

  if (detailStatus === 'failed') {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{ minHeight: '100vh', background: 'var(--dark)' }}>
        <p style={{ color: '#f87171' }}>Failed to load movie details. {error}</p>
        <Link to="/movies" className="btn btn-gradient px-4 py-2">Back to Movies</Link>
      </div>
    )
  }

  if (!selectedMovie) return null

  const movie = selectedMovie
  const poster = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'
  const backdrop = movie.backdrop_path ? `${TMDB_BACKDROP_BASE}${movie.backdrop_path}` : null

  return (
    <div className="detail-page" style={{ background: 'var(--dark)' }}>

      {/* Backdrop */}
      {backdrop && (
        <div className="detail-backdrop" style={{ backgroundImage: `url(${backdrop})` }} />
      )}
      <div className="detail-backdrop-overlay" />

      <div className="container position-relative py-5" style={{ zIndex: 2 }}>

        <Link to="/movies" className="back-link d-inline-flex align-items-center gap-2 mb-4">
          <ArrowLeftIcon className="back-icon" />
          Back to Movies
        </Link>

        <div className="row g-5 align-items-start">

          {/* Poster */}
          <div className="col-md-4 col-lg-3">
            <div className="detail-poster-wrap">
              <img src={poster} alt={movie.title} className="detail-poster" />
              {user && (
                <button
                  className={`fav-full-btn btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2${isFav ? ' fav-full-active' : ''}`}
                  onClick={() => dispatch(toggleFavorite({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average }))}
                >
                  {isFav ? <HeartSolid className="fav-btn-icon" /> : <HeartIcon className="fav-btn-icon" />}
                  {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="col-md-8 col-lg-9">
            <h1 className="display-5 fw-bold text-white mb-2">{movie.title}</h1>

            {movie.tagline && (
              <p className="fst-italic mb-3" style={{ color: 'var(--primary-light)' }}>"{movie.tagline}"</p>
            )}

            {/* Meta badges */}
            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="meta-badge d-flex align-items-center gap-2">
                <StarIcon className="meta-icon star" />
                <span>{movie.vote_average?.toFixed(1)} / 10</span>
              </div>
              <div className="meta-badge d-flex align-items-center gap-2">
                <CalendarIcon className="meta-icon" />
                <span>{movie.release_date}</span>
              </div>
              <div className="meta-badge d-flex align-items-center gap-2">
                <ClockIcon className="meta-icon" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="meta-badge d-flex align-items-center gap-2">
                <LanguageIcon className="meta-icon" />
                <span>{movie.original_language?.toUpperCase()}</span>
              </div>
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mb-4">
                {movie.genres.map((g) => (
                  <span key={g.id} className="genre-badge">{g.name}</span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="glass-card p-4 mb-4">
              <h5 className="text-white fw-semibold mb-2 d-flex align-items-center gap-2">
                <FilmIcon className="section-icon" /> Overview
              </h5>
              <p style={{ color: 'var(--text-muted-custom)', lineHeight: 1.85 }}>{movie.overview}</p>
            </div>

            {/* Cast */}
            {movie.cast?.length > 0 && (
              <div>
                <h5 className="text-white fw-semibold mb-3">Top Cast</h5>
                <div className="row g-3">
                  {movie.cast.map((person) => (
                    <div key={person.id} className="col-6 col-sm-4 col-md-3">
                      <div className="cast-card glass-card p-3 text-center">
                        <img
                          src={person.profile_path ? `${TMDB_IMAGE_BASE}${person.profile_path}` : 'https://via.placeholder.com/100x100?text=?'}
                          alt={person.name}
                          className="cast-avatar mb-2"
                        />
                        <p className="text-white small fw-semibold mb-0">{person.name}</p>
                        <p className="mb-0" style={{ color: 'var(--text-muted-custom)', fontSize: '0.75rem' }}>{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
