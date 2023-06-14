import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./scss/index.scss";
import store from "./store/index";
import Item from "./components/Item.vue";

const pinia = createPinia();
const app = createApp(App);
app.component("Item", Item);
app.use(pinia);
app.use(store);
app.mount("#app");
