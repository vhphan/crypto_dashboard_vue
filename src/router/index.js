import VueRouter from 'vue-router';
// import Home from '../views/Home';
import About from '../views/About';
import Latest from '../views/Latest';
import Chart from "@/views/Chart";
import Candles from "@/components/Candles";

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Candles
        },
        {
            path: '/latest',
            name: 'Latest',
            component: Latest
        },{
            path: '/about',
            name: 'About',
            component: About
        },{
            path: '/chart',
            name: 'Chart',
            component: Chart
        },

    ]
});