import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import api from './api'

const app = createApp(App)

//在案例上綁定屬性
app.config.globalProperties.$api = api


//路由掛載
app.use(router)
app.mount('#app')
