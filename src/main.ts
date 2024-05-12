import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes/index";
import "./assets/font_2680766_7ww2ddluvm/iconfont.css";
import "vant/es/button/style";
import "vant/es/row/style";
import "vant/es/col/style";
import "vant/es/tab/style";
import "vant/es/tabs/style";
import "vant/es/nav-bar/style";
import "vant/es/popover/style";
import "vant/es/slider/style";
import "vant/es/notify/style";
import "vant/es/dialog/style";
import "vant/es/field/style";
import "vant/es/icon/style";
import "vant/es/dropdown-item/style";
import "vant/es/dropdown-menu/style";
import "vant/es/swipe/style";
import "vant/es/swipe-item/style";
import "vant/es/skeleton/style";
import "vant/es/toast/style";
import "vant/es/sticky/style";
import Vant from "./configVant";
import "default-passive-events";
import "animate.css";
import "./assets/fonts/font.scss";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RespData } from "./store/respTypes";

export type ICustomAxiosConfig = AxiosRequestConfig & {
  opName?: string;
};

const app = createApp(App);

const baseApiURL = "https://lgg.qiyuan3.cn";

axios.defaults.baseURL = `${baseApiURL}/api/vipapi`;
axios.interceptors.request.use((config) => {
  const newConfig = config as ICustomAxiosConfig;
  store.commit("setError", { status: false, message: "" });
  store.commit("startLoading", { opName: newConfig.opName });
  return config;
});
axios.interceptors.response.use(
  (resp: AxiosResponse<RespData>) => {
    const { config, data } = resp;
    const newConfig = config as ICustomAxiosConfig;
    store.commit("finishLoading", { opName: newConfig.opName });
    const { code, message } = data;
    if (code !== 0) {
      store.commit("setError", { status: true, message });
      return Promise.reject(data);
    }
    return resp;
  },
  (e: AxiosError) => {
    const newConfig = e.config as ICustomAxiosConfig;
    store.commit("setError", { status: true, message: "服务器错误" });
    store.commit("finishLoading", { opName: newConfig.opName });
    return Promise.reject(e);
  }
);

app.use(Vant).use(router).use(store);
app.mount("#app");
