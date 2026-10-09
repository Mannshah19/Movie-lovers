import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline, PlayIcon } from '@heroicons/react/24/outline'
import { toggleFavorite } from '../../redux/authSlice'
import { TMDB_IMAGE_BASE } from '../../data/constants'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  const dispatch = useDispatch()
  const { user, favorites } = useSelector((s) => s.auth)
  const [imgLoaded, setImgLoaded] = useState(false)
  const isFav = favorites.some((f) => f.id === movie.id)

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : null

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) return
    dispatch(toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    }))
  }

  const rating = movie.vote_average?.toFixed(1)
  const ratingPercent = ((movie.vote_average || 0) / 10) * 100

  return (
    <div className="movie-card glass-card h-100">
      <Link to={`/movies/${movie.id}`} className="movie-card-poster d-block position-relative">

        {/* skeleton shown until image loads */}
        {!imgLoaded && <div className="poster-skeleton" />}

        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0 }}
          />
        ) : (
          <div className="poster-fallback d-flex align-items-center justify-content-center">
            <PlayIcon className="fallback-icon" />
          </div>
        )}

        <div className="movie-card-overlay">
          <div className="overlay-play d-flex align-items-center justify-content-center rounded-circle">
            <PlayIcon className="play-icon" />
          </div>
        </div>

        {user && (
          <button className={`fav-btn${isFav ? ' fav-active' : ''}`} onClick={handleFav} aria-label="Toggle favorite">
            {isFav ? <HeartIcon className="fav-icon" /> : <HeartOutline className="fav-icon" />}
          </button>
        )}

        <div className="rating-chip d-flex align-items-center gap-1">
          <StarIcon className="star-icon" />
          <span>{rating}</span>
        </div>
      </Link>

      <div className="card-body-inner p-3">
        <h6 className="text-white fw-semibold mb-2 movie-title">{movie.title}</h6>
        <div className="rating-bar-wrap mb-1">
          <div className="rating-bar" style={{ width: `${ratingPercent}%` }} />
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <span className="small" style={{ color: 'var(--text-muted-custom)' }}>
            {movie.release_date?.slice(0, 4) || '—'}
          </span>
          <span className="small fw-semibold" style={{ color: 'var(--primary-light)' }}>
            {rating} / 10
          </span>
        </div>
      </div>
    </div>
  )
}
