import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home';

Vue.use(Router);

const route = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        }
    ]
});

export default route;