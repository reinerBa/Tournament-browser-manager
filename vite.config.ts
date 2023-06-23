import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import { resolve } from 'path'
import { viteSingleFile } from "vite-plugin-singlefile"

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const packageJson = fs.readFileSync('./package.json')
  const version: string = JSON.parse(packageJson).version || ''
  const buildDate: string = new Date().toLocaleString()
  
let input = {}
const plugins = [vue()]
if(mode !== 'production') plugins.push(viteSingleFile())
console.log(mode)

if(mode === 'listmanager'){
  input = { listmanager: resolve(__dirname, 'Listmanager/index.html') }
}
else if (mode === 'board'){
  input = { board: resolve(__dirname, 'board/index.html') }
}
else
  input = {
    main: resolve(__dirname, 'index.html'),
    admin: resolve(__dirname, 'admin/index.html'),
    board: resolve(__dirname, 'board/index.html'),
    listmanager: resolve(__dirname, 'Listmanager/index.html'),
    signage: resolve(__dirname, 'signage/index.html'),
  }

return {
  build: {
    minify: false,
    rollupOptions: {
      input
    },
  },
  base: './',
  plugins,
  define: {
    __VERSION__: '"' + version + '"',
    __BUILDDATE__: '"' + buildDate + '"',
  }
  }
}
