import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import dialogService from './utils/dialogs.service'

Vue.config.productionTip = false

Vue.prototype.$formatLongCurrency = function (val) {
  if (val == null) return 'R$0,00'
  const str = val.toString()
  const decimals = str.substr(str.length - 2)
  const fulls = str.substr(0, str.length - 2)
  return 'R$' + fulls + ',' + decimals
}

Vue.prototype.$dialogs = dialogService

const app = new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

export default app
