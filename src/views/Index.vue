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
      @click="openPreviewDialog(logo.materialId, key)"
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide, ref } from "vue";
import { GlobalDataProps } from "../store/index";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useCreateLogo from "@/hooks/useCreateLogo";
import PreviewDialog from "@/components/PreviewDialog.vue";
import { draw, svgToBase64 } from "@/helper";
import { SVG } from "@svgdotjs/svg.js";
import { previewPropsArr } from "../constants/preview.constant";

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
    provide("key", currentIndex);

    const previewData = ref<string[]>([]);

    const openPreviewDialog = (id: number, key: number) => {
      currentId.value = id;
      currentIndex.value = key;
      const svgBase64 = svgToBase64(SVG(`.svg${key}`).node.innerHTML);
      previewData.value = [];
      previewPropsArr.forEach((item) => {
        draw(
          (b: string) => {
            previewData.value.push(b);
          },
          [item.url, svgBase64],
          item
        );
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
      //获取logo list
      await store.dispatch("fetchTemplates", {
        searchParams: { sn: sn || "" },
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
  min-height: 100vh;
  padding: 0.5rem 1rem;
  .card-box {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 2rem);
    height: 14rem;
    background: #fff;
    border-radius: 5px;
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
