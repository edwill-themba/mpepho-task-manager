import './bootstrap';
import {
    createApp
} from 'vue'
import App from './components/App.vue'
import router from './router/index'
import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    fas
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import store from './store/index'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

library.add(fas)
createApp(App)
    .use(router)
    .use(store)
    .use(FloatingVue)
    .component('FontAwesomeIcon', FontAwesomeIcon)
    .mount('#app')