import { computed } from "vue";
import { Module } from "vuex";
import store, { actionWrapper, GlobalDataProps } from "./index";
import { RespData, RespListData } from "./respTypes";

type editRandom = Pick<
  Required<TemplateProps>,
  "materialId" | "randomIndex" | "randomTitleFamily" | "randomSubTitleFamily"
>;
type templateProp = Partial<TemplateProps>;

export interface TemplateProps {
  materialId: number;
  fileName: string;
  materialName: string;
  materialPath: string;
  name: string;
  name_en: string;
  rgb: string;
  svg: string;
  randomIndex: number;
  randomTitleFamily?: string;
  randomSubTitleFamily?: string;
}

export interface TemplatesProps {
  data: TemplateProps[];
  totalTemplates?: number;
  currentNameEn?: string;
}

const stateStroage = sessionStorage.getItem("state");
let sData = [];
if (stateStroage != null) {
  sData = JSON.parse(stateStroage).templates.data;
}
const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: sData,
    totalTemplates: 0,
  },
  mutations: {
    fetchTemplates(state, rawData: RespListData<TemplateProps[]>) {
      state.data = rawData.data;
      sessionStorage.setItem("wx", rawData.attr ? rawData.attr.wx : "");
    },
    translate(state, rawData: RespData<string>) {
      state.currentNameEn = rawData.data;
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
    setCurrentTemplateProp(state, prop: templateProp) {
      if (prop.materialId) {
        const currentTemplate = computed<TemplateProps>(() =>
          store.getters.getTemplateById(prop.materialId)
        );
        if (prop.name) {
          currentTemplate.value.name = prop.name;
        }
        if (prop.name_en) {
          currentTemplate.value.name_en = prop.name_en;
        }
      }
    },
  },
  actions: {
    fetchTemplates: actionWrapper("/match", "fetchTemplates", {
      method: "post",
    }),
    translate: actionWrapper("/translate", "translate", { method: "post" }),
  },
  getters: {
    getTemplateById: (state) => (id: number) =>
      state.data.find((t) => t.materialId === id),
    getCurrentNameEn: (state) => state.currentNameEn,
  },
};

export default templates;
