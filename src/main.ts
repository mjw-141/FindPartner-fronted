import { createApp } from 'vue'
import App from './App.vue'
import { Button ,NavBar ,Icon } from 'vant';
import * as VueRouter from 'vue-router'
//底下四个必须手动引入，像这些Button ,NavBar ,Icon...都可以自动引入
// Toast
import { Toast } from 'vant';
import 'vant/es/toast/style';
// Dialog
import { Dialog } from 'vant';
import 'vant/es/dialog/style';
// Notify
import { Notify } from 'vant';
import 'vant/es/notify/style';
// ImagePreview
import { ImagePreview } from 'vant';
import 'vant/es/image-preview/style';
import routes from "./config/route.ts";
import { Form, Field, CellGroup } from 'vant';

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})


const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Toast);
app.use(router);
app.mount('#app');
