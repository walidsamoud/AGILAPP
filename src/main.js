import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// import { i18n } from './i18n/i18n'
import VueQrcodeReader from "vue-qrcode-reader";
import VueGoogleMaps from '@fawmi/vue-google-maps'
import QrReader from 'vue3-qr-reader';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueQrcodeReader)
  .use(QrReader)
  .use(VueGoogleMaps, {
      load: {
          key: 'AIzaSyCCu5z_wOjyw1iBONIykXU8dms7RfOKwCQ',
      },
  });
  // .use(i18n);
  
router.isReady().then(() => {
  app.mount('#app')
  // app.mount('#app');
});