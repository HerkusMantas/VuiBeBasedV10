import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import FilesPage from '../pages/FilesPage.vue'
import MainPage from '../pages/MainPage.vue'
import { getCurrentUser } from '../firebase'

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/files', component: FilesPage, meta: { requiresAuth: true } },
  { path: '/', component: MainPage, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const user = await getCurrentUser()
  if (requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router