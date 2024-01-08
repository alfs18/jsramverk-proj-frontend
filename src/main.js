import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'


const app = createApp(App)
app
    .use(router)
    .mount('#app')

// funktion för att spara token
app.config.globalProperties.setGlobalToken = function (value) {
    app.config.globalProperties.token = value;
}

app.config.globalProperties.setGlobalUserId = function (value) {
    app.config.globalProperties.user_id = value;
}
