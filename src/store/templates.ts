import { Module } from 'vuex';
import { actionWrapper, GlobalDataProps } from './index';
import { RespListData } from './respTypes';

export interface TemplateProps {
  materialId: number,
  fileName: string,
  materialName: string,
  materialPath: string,
  name: string,
  name_en: string,
  rgb: string
}

export interface TemplatesProps {
  data: TemplateProps[];
  totalTemplates?: number;
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: [],
    totalTemplates: 0,
  },
  mutations: {
    fetchTemplates(state, rawData: RespListData<TemplateProps[]>) {
      state.data = rawData.data;
    },
  },
  actions: {
    fetchTemplates: actionWrapper('/webapi/match', 'fetchTemplates'),
  },
  getters: {
    getTemplateById: (
      state,
    ) => (id: number) => state.data.find((t) => t.materialId === id),
  },
};

export default templates;
