import axios, { AxiosRequestConfig } from "axios";
import { compile } from "path-to-regexp";
import { createStore, ActionContext } from "vuex";
import { forEach } from "lodash-es";
import templates, { TemplatesProps } from "./templates";
import global, { GlobalStatus } from "./global";
import list, { ListResProps } from "./list"

export interface GlobalDataProps {
  list: ListResProps;
  templates: TemplatesProps;
  global: GlobalStatus;
}
export interface ActionPayload {
  urlParams?: { [key: string]: any };
  data?: any;
  searchParams?: { [key: string]: any };
}
// 第二步，确定参数
export function actionWrapper(
  url: string,
  commitName: string,
  config: AxiosRequestConfig = { method: "get" }
) {
  // 第一步 不管三七二十一，先返回一个函数和原来的函数处理一摸一样
  return async (
    context: ActionContext<any, any>,
    payload: ActionPayload = {}
  ): Promise<void> => {
    // 第三部 写内部重复的逻辑
    const { urlParams, data, searchParams } = payload;
    const newConfig = { ...config, data, opName: commitName };
    let newURL = url;
    if (urlParams) {
      const toPath = compile(url, { encode: encodeURIComponent });
      newURL = toPath(urlParams);
      console.log(newURL);
    }
    if (searchParams) {
      const search = new URLSearchParams();
      forEach(searchParams, (value, key) => {
        search.append(key, value);
      });
      // newURL += `?${objToQueryString(searchParams)}`;
      newURL += `?${search.toString()}`;
    }
    const resp = await axios(newURL, newConfig);
    context.commit(commitName, { payload, ...resp.data });
    return resp.data;
  };
}
const store = createStore({
  modules: {
    list,
    templates,
    global,
  },
});

export default store;
