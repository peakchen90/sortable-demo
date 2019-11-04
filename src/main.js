import Vue from 'vue';
import App from './App';
import router from './router';
import Draggable from '@/components/draggable';

Vue.use(Draggable);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
