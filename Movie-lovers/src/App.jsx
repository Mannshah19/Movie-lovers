import { Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import MovieList from './pages/MovieList'
import MovieDetails from './pages/MovieDetails'
import Search from './pages/Search'
import Login from './pages/Login'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: '76px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh', color: 'var(--text-muted-custom)' }}>
              <h2 className="text-white">404</h2>
              <p>Page not found.</p>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
