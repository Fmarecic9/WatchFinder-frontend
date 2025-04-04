import {createRouter, createWebHistory} from 'vue-router'
import registerUser from './components/registerUser.vue'
import loginUser from './components/loginUser.vue'
import watchInfo from './components/watchInfo.vue'
import home from './components/home.vue'
import addWatchForm from './components/addWatchForm.vue'
import editWatchForm from './components/editWatchForm.vue'


const routes = [
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: home},
    {path: '/register', name: 'registerUser', component: registerUser},
    {path: '/login', name: 'loginUser', component: loginUser},
    {path: '/watch/:id', name: 'watchInfo', component: watchInfo},
    {path: '/addWatch', name: 'addWatch', component: addWatchForm},
    {path: '/editWatch/:id', name: 'editWatch', component: editWatchForm}

]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router