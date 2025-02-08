import { createPinia } from 'pinia'

export default ({ app }) => {
  const pinia = createPinia()
  // Add local storage plugin if using VueUse (optional)
  app.use(pinia)
}
