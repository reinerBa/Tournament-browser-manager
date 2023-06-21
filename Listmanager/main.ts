import { App, createApp, h } from 'vue'
// @ts-expect-error
import MyApp from '../src/Pages/ListManager.vue'
import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'
import 'material-icons/iconfont/material-icons.css'
import './style.styl'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

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
    alert('Fehler bei Seitenaufruf, bitte probieren sie es später wieder \n' + ex)
  }
}

function addPlugins (app: App<Element>): void {
  app.component('EasyDataTable', Vue3EasyDataTable)
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  pinia.use(PiniaSharedState({
    type: 'localstorage'
  }))
  app.use(pinia)
}
