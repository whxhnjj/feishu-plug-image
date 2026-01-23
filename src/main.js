import { createApp } from 'vue'
import App from './App.vue'
import components from './components'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@assets/css/global.scss';

import router from '@/router'

import '@assets/css/style.scss'

// Arco Design
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import allFunInstall from '@util/util.js';

import Toast, { useToast } from 'vue-toastification';
import "vue-toastification/dist/index.css";
const toastOptions = {
  position: "top-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__fade",
  maxToasts: 2,
  newestOnTop: false,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      return false;
    }
    return toast;
  }
};
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';


const app = createApp(App);

app.config.globalProperties.$dayjs = dayjs;

// 注册每个组件
for (const [name, component] of Object.entries(components)) {
  app.component(name, component)
}
// 创建 Pinia 实例并安装插件
const pinia = createPinia()
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

const toast = useToast();
app.config.globalProperties.$toast = toast;
app.use(Toast,toastOptions);
app.use(allFunInstall);

app.use(ArcoVue);
app.use(ArcoVueIcon);


app.use(router)
app.mount('#app');
