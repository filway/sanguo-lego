import { computed } from "vue";
import { Module } from "vuex";
import store, { actionWrapper, GlobalDataProps } from "./index";
import { RespListData } from "./respTypes";

type editRandom = Pick<
  Required<TemplateProps>,
  "materialId" | "randomIndex" | "randomTitleFamily" | "randomSubTitleFamily"
>;

export interface TemplateProps {
  materialId: number;
  fileName: string;
  materialName: string;
  materialPath: string;
  name: string;
  name_en: string;
  rgb: string;
  randomIndex?: number;
  randomTitleFamily?: string;
  randomSubTitleFamily?: string;
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
    setRandomProps(state, random: editRandom) {
      const {
        materialId,
        randomIndex,
        randomTitleFamily,
        randomSubTitleFamily,
      } = random;
      const currentTemplate = computed<TemplateProps>(() =>
        store.getters.getTemplateById(materialId)
      );
      currentTemplate.value.randomIndex = randomIndex;
      currentTemplate.value.randomTitleFamily = randomTitleFamily;
      currentTemplate.value.randomSubTitleFamily = randomSubTitleFamily;
    },
  },
  actions: {
    fetchTemplates: actionWrapper("/webapi/match", "fetchTemplates"),
  },
  getters: {
    getTemplateById: (state) => (id: number) =>
      state.data.find((t) => t.materialId === id),
  },
};

export default templates;
