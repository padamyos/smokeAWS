import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import * as THREE from 'three';



import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


createApp(App).use(router , VueSweetalert2 ).mount('#app')
