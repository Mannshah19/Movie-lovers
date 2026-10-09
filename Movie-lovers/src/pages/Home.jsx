import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FireIcon, ArrowRightIcon, StarIcon, PlayIcon } from '@heroicons/react/24/outline'
import { fetchPopularMovies } from '../redux/movieSlice'
import MovieCard from '../components/MovieCard/MovieCard'
import { TMDB_BACKDROP_BASE, TMDB_IMAGE_BASE } from '../data/constants'
import './Home.css'

export default function Home() {
  const dispatch = useDispatch()
  const { popular, status, error } = useSelector((s) => s.movies)
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPopularMovies())
  }, [dispatch, status])

  // cycle hero every 5s once movies load
  useEffect(() => {
    if (popular.length === 0) return
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % Math.min(popular.length, 5)), 5000)
    return () => clearInterval(t)
  }, [popular])

  const hero = popular[heroIndex]

  return (
    <>
      {/* ── Cinematic Hero ── */}
      <section className="home-hero">
        <div
          key={heroIndex}
          className="hero-backdrop"
          style={{ backgroundImage: hero?.backdrop_path ? `url(${TMDB_BACKDROP_BASE}${hero.backdrop_path})` : 'none' }}
        />
        <div className="hero-gradient" />
        <div className="hero-noise" />

        <div className="container hero-content">
          <div className="row align-items-end" style={{ minHeight: '88vh' }}>
            <div className="col-lg-7 pb-5">

              <span className="section-tag mb-4 d-inline-flex align-items-center gap-2">
                <FireIcon style={{ width: 14, height: 14 }} /> Trending Now
              </span>

              {hero && (
                <div className="hero-info">
                  <h1 className="hero-title text-white fw-black mb-3">{hero.title}</h1>

                  <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                    <div className="d-flex align-items-center gap-1">
                      <StarIcon style={{ width: 16, height: 16, color: '#f59e0b' }} />
                      <span className="fw-bold" style={{ color: '#f59e0b' }}>{hero.vote_average?.toFixed(1)}</span>
                    </div>
                    <span style={{ color: 'var(--text-muted-custom)' }}>•</span>
                    <span style={{ color: 'var(--text-muted-custom)', fontSize: '0.9rem' }}>{hero.release_date?.slice(0, 4)}</span>
                  </div>

                  <p className="hero-overview mb-4">{hero.overview?.slice(0, 180)}...</p>

                  <div className="d-flex gap-3 flex-wrap">
                    <Link to={`/movies/${hero.id}`} className="btn btn-gradient btn-lg px-5 py-3 d-inline-flex align-items-center gap-2">
                      <PlayIcon style={{ width: 18, height: 18 }} />
                      View Details
                    </Link>
                    <Link to="/movies" className="btn btn-outline-glow btn-lg px-4 py-3 d-inline-flex align-items-center gap-2">
                      Browse All
                      <ArrowRightIcon style={{ width: 18, height: 18 }} />
                    </Link>
                  </div>
                </div>
              )}

              {/* hero dots */}
              {popular.length > 0 && (
                <div className="hero-dots d-flex gap-2 mt-4">
                  {Array.from({ length: Math.min(popular.length, 5) }).map((_, i) => (
                    <button key={i} className={`hero-dot${i === heroIndex ? ' active' : ''}`} onClick={() => setHeroIndex(i)} />
                  ))}
                </div>
              )}
            </div>

            {/* side poster */}
            {hero?.poster_path && (
              <div className="col-lg-3 offset-lg-2 d-none d-lg-flex justify-content-end pb-5">
                <Link to={`/movies/${hero.id}`} className="hero-side-poster">
                  <img src={`${TMDB_IMAGE_BASE}${hero.poster_path}`} alt={hero.title} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Popular Movies ── */}
      <section className="popular-section py-5">
        <div className="container py-4">

          <div className="d-flex align-items-end justify-content-between mb-5">
            <div>
              <span className="section-tag mb-2 d-inline-block">POPULAR</span>
              <h2 className="display-6 fw-bold text-white mb-0 mt-2">
                Popular <span className="gradient-text">Movies</span>
              </h2>
            </div>
            <Link to="/movies" className="btn btn-outline-glow px-4 py-2 d-flex align-items-center gap-2">
              View All <ArrowRightIcon style={{ width: 16, height: 16 }} />
            </Link>
          </div>

          {status === 'loading' && (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-ring" />
            </div>
          )}

          {status === 'failed' && (
            <div className="error-box text-center py-4">
              <p className="mb-0" style={{ color: '#f87171' }}>
                Could not load movies. Check your internet connection.
                <br /><small style={{ opacity: 0.6 }}>{error}</small>
              </p>
            </div>
          )}

          {status === 'succeeded' && (
            <div className="row g-4">
              {popular.slice(0, 18).map((movie, i) => (
                <div
                  key={movie.id}
                  className="col-6 col-md-4 col-lg-3 col-xl-2 fade-in-card"
                  style={{ animationDelay: `${(i % 6) * 60}ms` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  )
}
