import 'milligram/dist/milligram.css'
import { App, createApp } from 'vue'
import MyApp from './Pages/Overview.vue'
import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'
import 'material-icons/iconfont/material-icons.css'
import './style.styl'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// @ts-expect-error
const version = __VERSION__
// @ts-expect-error
window.version = version
const app = createApp(MyApp)
addPlugins(app)
void start()

async function start (): Promise<void> {
  try {
    app.mount('#app')
  } catch (ex) {
    console.error(ex)
    alert(`Fehler bei Seitenaufruf \n${ex}`)
  }
}

function addPlugins (app: App<Element>): void {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  pinia.use(PiniaSharedState({
    type: 'localstorage'
  }))
  app.use(pinia)

  app.provide<string>('app-version', version)
}
