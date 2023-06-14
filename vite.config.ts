import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const packageJson = fs.readFileSync('./package.json')
  const version: string = JSON.parse(packageJson).version || ''
  const buildDate: string = new Date().toLocaleString()
  
return {
  build: {
    minify: false,
  },
  base: './',
  plugins: [vue()],
  define: {
    __VERSION__: '"' + version + '"',
    __BUILDDATE__: '"' + buildDate + '"',
  }
  }
}
