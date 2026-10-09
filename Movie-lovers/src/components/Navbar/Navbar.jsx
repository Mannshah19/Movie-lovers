import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Bars3Icon, XMarkIcon, FilmIcon, MagnifyingGlassIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { logout } from '../../redux/authSlice'
import { NAV_LINKS } from '../../data/constants'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setOpen(false)
  }

  return (
    <nav className={`movie-nav navbar navbar-expand-lg fixed-top${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="container">

        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" onClick={() => setOpen(false)}>
          <FilmIcon className="nav-logo-icon" />
          <span className="fw-bold fs-4 text-white">
            Movie<span className="gradient-text">Lovers</span>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0 text-white"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="toggler-icon" /> : <Bars3Icon className="toggler-icon" />}
        </button>

        <div className={`collapse navbar-collapse${open ? ' show' : ''}`}>
          <ul className="navbar-nav mx-auto gap-1 mb-2 mb-lg-0">
            {NAV_LINKS.map((link) => (
              <li className="nav-item" key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) => `nav-link nav-pill-link px-3 py-2 rounded-pill fw-medium${isActive ? ' active-link' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/search" className="nav-icon-btn d-flex align-items-center justify-content-center rounded-circle" onClick={() => setOpen(false)}>
              <MagnifyingGlassIcon className="nav-hero-icon" />
            </Link>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/profile" className="d-flex align-items-center gap-2 text-white text-decoration-none" onClick={() => setOpen(false)}>
                  <UserCircleIcon className="nav-hero-icon" />
                  <span className="small fw-semibold d-none d-lg-inline">{user.name}</span>
                </Link>
                <button className="btn btn-gradient px-3 py-2 d-flex align-items-center gap-1" onClick={handleLogout}>
                  <ArrowRightOnRectangleIcon className="nav-hero-icon" />
                  <span className="d-none d-lg-inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-gradient px-4 py-2" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
