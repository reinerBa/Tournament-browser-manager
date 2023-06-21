import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import { resolve } from 'path'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const packageJson = fs.readFileSync('./package.json')
  const version: string = JSON.parse(packageJson).version || ''
  const buildDate: string = new Date().toLocaleString()
  
return {
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        board: resolve(__dirname, 'board/index.html'),
        listmanager: resolve(__dirname, 'Listmanager/index.html'),
        signage: resolve(__dirname, 'signage/index.html'),
      },
    },
  },
  base: './',
  plugins: [vue()],
  define: {
    __VERSION__: '"' + version + '"',
    __BUILDDATE__: '"' + buildDate + '"',
  }
  }
}
