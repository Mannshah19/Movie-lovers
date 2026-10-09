import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { UserCircleIcon, HeartIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { logout } from '../redux/authSlice'
import MovieCard from '../components/MovieCard/MovieCard'
import './Profile.css'

export default function Profile() {
  const { user, favorites } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <section className="profile-section py-5">
      <div className="glow-blob profile-blob-1" />
      <div className="glow-blob profile-blob-2" />

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>

        {/* User card */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <div className="glass-card p-4 d-flex align-items-center gap-4">
              <div className="profile-avatar d-flex align-items-center justify-content-center">
                <UserCircleIcon className="profile-avatar-icon" />
              </div>
              <div className="flex-grow-1">
                <h3 className="text-white fw-bold mb-1">{user.name}</h3>
                <p className="mb-2" style={{ color: 'var(--text-muted-custom)' }}>{user.email}</p>
                <div className="d-flex align-items-center gap-2">
                  <HeartIcon className="fav-count-icon" />
                  <span className="small" style={{ color: 'var(--primary-light)' }}>
                    {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <button
                className="btn btn-outline-glow d-flex align-items-center gap-2 px-3 py-2"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="logout-icon" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Favorites */}
        <div className="text-center mb-5">
          <span className="section-tag">MY LIST</span>
          <h2 className="display-6 fw-bold text-white mt-3 mb-0">
            Favorite <span className="gradient-text">Movies</span>
          </h2>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-5">
            <HeartIcon className="empty-heart-icon" />
            <p className="mt-3" style={{ color: 'var(--text-muted-custom)' }}>
              No favorites yet. Browse movies and hit the heart icon!
            </p>
            <Link to="/movies" className="btn btn-gradient px-5 py-2 mt-2">Browse Movies</Link>
          </div>
        ) : (
          <div className="row g-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
