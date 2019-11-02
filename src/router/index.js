import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/demo1',
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: () => import('../views/Demo1'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
