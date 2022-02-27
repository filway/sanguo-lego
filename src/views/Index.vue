<template>
  <div class="homepage-container" :style="{ background: '#f8f8f8' }">
    <preview-dialog
      @close="closePreviewDialog"
      :show="showPreview"
      :logoId="currentId"
      :previewData="previewData"
      @clickDownload="openDownloadDialog"
    ></preview-dialog>
    <van-row class="logoTips">
      <van-col span="24">Logo结果选择</van-col>
    </van-row>
    <van-loading
      class="loadingBox"
      v-if="isLoading"
      style="text-align: center"
      size="24px"
      vertical
      color="#fff"
      >Logo生成中...</van-loading
    >
    <div
      @click="openPreviewDialog(logo.materialId, logo.randomIndex, key)"
      v-for="(logo, key) in logoList"
      :key="key"
      class="card-box"
      v-show="!isLoading"
    >
      <div class="logo-box">
        <svg
          baseProfile="full"
          version="1.1"
          :class="'svg' + key"
          viewBox="0 0 686 380.78"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
      <div class="text-box animate__animated animate__bounce">
        点击选择此方案
      </div>
    </div>
    <div class="tipsBox" v-show="!isLoading">
      <h4>TIPS:</h4>
      <p>如果您对智能生成的LOGO不是100%满意可以选择付费升级，设计师人工修改</p>
    </div>
    <span v-html="cp"></span>
    <!-- <img :src="imgBase64" alt="" width="340" /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide, ref } from "vue";
import { GlobalDataProps } from "../store/index";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useCreateLogo from "@/hooks/useCreateLogo";
import PreviewDialog from "@/components/PreviewDialog.vue";
import { SVG } from "@svgdotjs/svg.js";
import { previewPropsArr } from "../constants/preview.constant";
import cheerio from "cheerio";

export default defineComponent({
  name: "Index",
  components: {
    PreviewDialog,
  },
  setup() {
    const showPreview = ref(false);
    const isLoading = computed(() => store.getters.isLoading);
    const route = useRoute();
    const currentId = ref(0);
    const currentIndex = ref(0);
    const store = useStore<GlobalDataProps>();

    const logoList = computed(() => store.state.templates.data);
    const cp = computed(() => store.state.templates.cp);
    provide("key", currentIndex);

    const previewData = ref<any[]>([]);

    const imgBase64 = ref("");
    const openPreviewDialog = (id: number, index: number, key: number) => {
      currentId.value = id;
      currentIndex.value = key;
      let svgObj = SVG(`.svg${key}`);
      svgObj.node.removeAttribute("xmlns:svgjs");
      svgObj.node.removeAttribute("svgjs:data");
      const svg1 = svgObj.svg();
      //替换掉svgjs:data，否则图片加载不出
      const p2 = /svgjs:data\s*?=\s*?([‘"])[\s\S]*?\1/g;
      const svg = svg1.replace(p2, "");
      previewData.value = [];
      previewPropsArr.forEach((item) => {
        const img_w = item.w;
        const img_h = item.h;
        const $ = cheerio.load(svg, { xml: true });
        const left = item.x;
        const top = item.y;
        const rotate = `rotate(${item.r}deg)`;
        $("svg").css("position", "absolute");
        $("svg").css("width", img_w.toString() + "px");
        $("svg").css("height", img_h.toString() + "px");
        $("svg").css("left", left.toString() + "px");
        $("svg").css("top", top.toString() + "px");
        $("svg").css("transform", rotate);
        previewData.value.push({
          url: item.url,
          svg: $.html(),
        });
      });

      showPreview.value = true;
    };
    const closePreviewDialog = () => {
      showPreview.value = false;
    };
    const openDownloadDialog = () => {
      console.log("跳转下载");
    };
    onMounted(async () => {
      let { sn } = route.query;
      localStorage.setItem("sn", sn as string);
      //获取logo list
      await store.dispatch("fetchTemplates", {
        data: { sn: sn || "" },
      });
      await useCreateLogo(logoList.value);
    });

    return {
      logoList,
      showPreview,
      openPreviewDialog,
      closePreviewDialog,
      currentId,
      currentIndex,
      openDownloadDialog,
      isLoading,
      previewData,
      imgBase64,
      cp,
    };
  },
});
</script>

<style scoped lang="scss">
.homepage-container {
  .logoTips {
    margin-bottom: 1.5rem;
    font-weight: 300;
    font-size: 14px;
  }
  .loadingBox {
    text-align: center;
    height: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    opacity: 0.7;
    color: #fff;
    border-radius: 5px;
  }
  .tipsBox {
    text-align: center;
    height: 11rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
    opacity: 0.7;
    color: #fff;
    border-radius: 8px;
    flex-direction: column;
    padding: 0 1.8rem;
    h4 {
      margin: 0;
    }
    p {
      font-size: 15px;
      line-height: 1.8;
      font-weight: 300;
    }
    // background: url("../assets/img/img_banner.jpg");
  }

  min-height: 100vh;
  padding: 0.5rem 1rem;
  .card-box {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 2rem);
    height: 14rem;
    background: #fff;
    border-radius: 8px;
    animation: zoomIn; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s; /* don't forget to set a duration! */
    margin: 1rem 0;
    .logo-box {
      height: 85%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .text-box {
      text-align: center;
      color: #d9d9d9;
      font-size: 14px;
    }
  }
}
</style>
