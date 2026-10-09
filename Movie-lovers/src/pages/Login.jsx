import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { UserCircleIcon, LockClosedIcon, FilmIcon } from '@heroicons/react/24/outline'
import { login } from '../redux/authSlice'
import './Login.css'

export default function Login() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth)

  if (user) {
    navigate('/profile')
    return null
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('All fields are required.')
      return
    }
    dispatch(login({ name: form.name, email: form.email }))
    navigate('/profile')
  }

  return (
    <section className="login-section d-flex align-items-center justify-content-center">
      <div className="glow-blob login-blob-1" />
      <div className="glow-blob login-blob-2" />

      <div className="login-card glass-card p-5 position-relative" style={{ zIndex: 1 }}>

        <div className="text-center mb-4">
          <FilmIcon className="login-logo-icon mb-3" />
          <h2 className="fw-bold text-white mb-1">Welcome Back</h2>
          <p style={{ color: 'var(--text-muted-custom)' }}>Sign in to save your favorite movies</p>
        </div>

        {error && (
          <div className="alert-box mb-3 text-center">
            <p className="mb-0 small" style={{ color: '#f87171' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label-custom">Name</label>
            <div className="input-wrap">
              <UserCircleIcon className="input-icon" />
              <input
                type="text"
                name="name"
                className="custom-input"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label-custom">Email</label>
            <div className="input-wrap">
              <UserCircleIcon className="input-icon" />
              <input
                type="email"
                name="email"
                className="custom-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label-custom">Password</label>
            <div className="input-wrap">
              <LockClosedIcon className="input-icon" />
              <input
                type="password"
                name="password"
                className="custom-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-gradient w-100 py-3 fw-semibold">
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 small" style={{ color: 'var(--text-muted-custom)' }}>
          Just browsing?{' '}
          <Link to="/movies" className="text-decoration-none" style={{ color: 'var(--primary-light)' }}>
            Explore movies
          </Link>
        </p>

      </div>
    </section>
  )
}
