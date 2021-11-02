import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './styles/styles.scss'
import GoogleAuth from '@/config/google_oAuth.js'
const gAuthOptions = {
	clientId: '707231563844-e5cpkqrlt62gncmj6b84of5sml9lp8g9.apps.googleusercontent.com',
	scope: 'profile email',
	prompt: 'select_account',
}

Vue.config.productionTip = false
Vue.use(GoogleAuth, gAuthOptions)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
