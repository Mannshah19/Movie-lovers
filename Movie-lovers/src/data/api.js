import axios from 'axios'

const API_KEY = '84ad84f22704fac25fc69fdf03b51adf'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

export default tmdb
