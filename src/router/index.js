import VueRouter from 'vue-router';
// import Home from '../views/Home';
import About from '../views/About';
import Latest from '../views/Latest';
import Chart from "@/views/Chart";

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Latest
        }
        , {
            path: '/chart',
            name: 'Chart',
            component: Chart
        }, {
            path: '/about',
            name: 'About',
            component: About
        }
        ,
    ]
});