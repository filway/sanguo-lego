import wx from "weixin-js-sdk";
import type { App } from "vue";

const plugin = {
  install(Vue: App): void {
    Vue.config.globalProperties.$wechat = wx;
    Vue.config.globalProperties.wechat = wx;
  },
};

export default plugin;
export const install = plugin.install;
