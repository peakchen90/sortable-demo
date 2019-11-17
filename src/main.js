import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import Draggable from '@/components/draggable';

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(Draggable);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
