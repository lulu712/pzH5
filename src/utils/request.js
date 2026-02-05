import axios from 'axios'


const http = axios.create({
  baseURL: 'https://v3pz.itndedu.com/v3pz',
  timeout: 10000,
  // 設置H5終端標識
  headers: { "terminal": "H5" }

})

// ===== 請求攔截 =====
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('h5_token')

    // 不需要 token 的 API
    const whiteUrl = ['/login']

    if (token && !whiteUrl.some(url => config.url.includes(url))) {
      config.headers['h-token'] = token
    }

    return config
  },
  error => Promise.reject(error)
)

// ===== 回應攔截（🔥重點在這）=====
http.interceptors.response.use(
  response => {
    console.log('Response data:', response.data)
    const { code, message } = response.data || {}

    if (code !== 10000) {
      // 可以統一處理非 10000 的錯誤
      console.warn('API Error:', message)
    }

    if (code === -2) {
      // 🔥 斷根
      localStorage.removeItem('h5_token')
      localStorage.removeItem('h5_userInfo')

      // 🔥 強制回登入頁
      window.location.href = '/Login'
    }

    return response
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

export default http
