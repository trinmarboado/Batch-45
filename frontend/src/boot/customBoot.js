import { boot } from 'quasar/wrappers'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

import printElement from 'ink-html'

import wings from 'wings4'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do

  app.use(VueChartkick)

  app.provide('pdfMake', pdfMake)

  const wingsApp = wings('http://localhost:3030')
  app.provide('wingsApp', wingsApp)

  app.provide('todosService', wingsApp.wingsService('todos'))

  app.provide('printElement', printElement)
})
