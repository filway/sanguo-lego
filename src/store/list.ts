import { Module } from "vuex";
import { actionWrapper, GlobalDataProps } from "./index";
import { TemplateProps } from "./templates";


export interface ListResProps {
  list: TemplateProps[];
  code: number;
  now_page: number;
  page_size: number;
  total_page: number;
  tips: string;
}

// const stateStroage = sessionStorage.getItem("state");
// let now_page = 1;
// if (stateStroage != null) {
//   now_page = JSON.parse(stateStroage).list.now_page || 1;
// }
const list: Module<ListResProps, GlobalDataProps> = {
  state: {
    code: 0,
    list: [],
    now_page: 1,
    page_size: 10,
    total_page: 1,
    tips: "",
  },
  mutations: {
    fetchList(state, rawData: ListResProps) {
      console.log(rawData);
      state.code = rawData.code;
      state.list = rawData.list
      state.now_page = rawData.now_page
      state.page_size = rawData.page_size
      state.total_page = rawData.total_page
      state.tips = rawData.tips
    },
    setNowPage(state, page: number) {
      state.now_page = page
    }
  },
  actions: {
    // /get_list/sn/G510521107477636/page/1
    fetchList: actionWrapper("/get_list", "fetchList"),
  },
  getters: {
    now_page: (state) => state.now_page,
  },
}

export default list;
