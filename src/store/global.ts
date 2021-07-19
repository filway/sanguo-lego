import { Module } from "vuex";
import { GlobalDataProps } from ".";

export interface GlobalStatus {
  opNames: { [key: string]: boolean };
  requestNumber: number;
  jpgDownloadUrl: string;
  pngDownloadUrl: string;
  error: {
    status: boolean;
    message?: string;
  };
}

const global: Module<GlobalStatus, GlobalDataProps> = {
  state: {
    requestNumber: 0,
    opNames: {},
    jpgDownloadUrl: "",
    pngDownloadUrl: "",
    error: {
      status: false,
    },
  },
  mutations: {
    startLoading(state, { opName }) {
      state.requestNumber += 1;
      if (opName) {
        state.opNames[opName] = true;
      }
    },
    finishLoading(state, { opName }) {
      setTimeout(() => {
        state.requestNumber -= 1;
        delete state.opNames[opName];
      }, 1000);
    },
    setError(state, e) {
      state.error = e;
    },
    setjpgDownloadUrl(state, url) {
      state.jpgDownloadUrl = url;
    },
    setpngDownloadUrl(state, url) {
      state.pngDownloadUrl = url;
    },
  },
  getters: {
    isLoading: (state) => state.requestNumber > 0,
    isOpLoading: (state) => (opName: string) => state.opNames[opName],
    getjpgDownloadUrl: (state) => state.jpgDownloadUrl,
    getpngDownloadUrl: (state) => state.pngDownloadUrl,
  },
};

export default global;
