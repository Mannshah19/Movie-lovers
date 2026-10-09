import { Link } from 'react-router-dom'
import { FilmIcon } from '@heroicons/react/24/outline'
import { NAV_LINKS } from '../../data/constants'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="glow-blob footer-blob" />

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row g-5 mb-4">

          <div className="col-lg-4">
            <Link to="/" className="d-flex align-items-center gap-2 mb-3 text-decoration-none">
              <FilmIcon className="footer-logo-icon" />
              <span className="fw-bold fs-4 text-white">
                Movie<span className="gradient-text">Lovers</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted-custom)', lineHeight: 1.8 }}>
              Your go-to place for discovering popular movies, searching titles, and saving your favorites.
            </p>
          </div>

          <div className="col-sm-6 col-lg-3 offset-lg-1">
            <h6 className="text-white fw-bold mb-4 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
              Navigation
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer-link">
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-sm-6 col-lg-4">
            <h6 className="text-white fw-bold mb-4 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
              Powered By
            </h6>
            <p style={{ color: 'var(--text-muted-custom)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              Movie data provided by{' '}
              <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="footer-link">
                The Movie Database (TMDb)
              </a>
              . This product uses the TMDb API but is not endorsed or certified by TMDb.
            </p>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 pt-3">
          <p className="mb-0 small" style={{ color: 'var(--text-muted-custom)' }}>
            © {new Date().getFullYear()} MovieLovers. All rights reserved.
          </p>
          <p className="mb-0 small" style={{ color: 'var(--text-muted-custom)' }}>
            Built with React & Bootstrap
          </p>
        </div>
      </div>
    </footer>
  )
}
