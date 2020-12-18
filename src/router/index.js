import VueRouter from 'vue-router';
import Home from '../views/Home';
import About from '../views/About';

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },

    ]
});