import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes/index";
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
import Vant from "./configVant";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RespData } from "./store/respTypes";

export type ICustomAxiosConfig = AxiosRequestConfig & {
  opName?: string;
};

const app = createApp(App);

const baseApiURL = "http://logo.yuangu06.cn";

axios.defaults.baseURL = `${baseApiURL}/api/`;
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
