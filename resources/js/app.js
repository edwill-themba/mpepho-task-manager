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
import tooltip from 'primevue/tooltip';


library.add(fas)
createApp(App)
    .use(router)
    .use(store)
    .directive('tooltip', tooltip)
    .component('FontAwesomeIcon', FontAwesomeIcon)
    .mount('#app')