import type { AxiosInstance } from 'axios'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const apiService: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json'
  }
})

export default {
  get(endpoint: string, params?: {}) {
    return apiService.get(endpoint, { params })
  }
}
