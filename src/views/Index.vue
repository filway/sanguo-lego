<template>
  <div
    class="homepage-container"
    :style="{ background: logoList.length ? '#eee' : '#fff' }"
  >
    <preview-dialog
      @close="closePreviewDialog"
      :show="showPreview"
      :logoId="currentId"
      @clickDownload="openDownloadDialog"
    ></preview-dialog>
    <download-dialog
      @close="showDownload = false"
      :logoId="currentId"
      :show="showDownload"
    ></download-dialog>
    <div
      @click="openPreviewDialog(logo.materialId, key)"
      v-for="(logo, key) in logoList"
      :key="key"
      class="card-box"
    >
      <van-skeleton class="skeletonBox" :row="2" :loading="showLoading">
      </van-skeleton>
      <div class="logo-box" v-show="!showLoading">
        <svg
          baseProfile="full"
          version="1.1"
          :class="'svg' + key"
          viewBox="0 0 500 400"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
      <div v-show="!showLoading" class="text-box">点击选择此方案</div>
    </div>
    <van-row v-if="!logoList.length">
      <van-col span="24" style="text-align: center">
        <van-empty description="暂时未找到搜索结果" />
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide, ref } from "vue";
import { GlobalDataProps } from "../store/index";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useCreateLogo from "@/hooks/useCreateLogo";
import PreviewDialog from "@/components/PreviewDialog.vue";
import DownloadDialog from "@/components/DownloadDialog.vue";

export default defineComponent({
  name: "Index",
  components: {
    PreviewDialog,
    DownloadDialog,
  },
  setup() {
    const showPreview = ref(false);
    const showDownload = ref(false);
    const isLoading = computed(() => store.getters.isLoading);
    const showLoading = computed(
      () => isLoading.value && !route.meta.disableLoading
    );
    const currentId = ref(0);
    const currentIndex = ref(0);
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const logoList = computed(() => store.state.templates.data);
    provide("key", currentIndex);
    const openPreviewDialog = (id: number, key: number) => {
      currentId.value = id;
      currentIndex.value = key;
      showPreview.value = true;
    };
    const closePreviewDialog = () => {
      showPreview.value = false;
    };
    const openDownloadDialog = () => {
      showPreview.value = false;
      showDownload.value = true;
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
      showDownload,
      openPreviewDialog,
      closePreviewDialog,
      currentId,
      currentIndex,
      openDownloadDialog,
      showLoading,
    };
  },
});
</script>

<style scoped lang="scss">
.homepage-container {
  min-height: 100vh;
  padding: 0.5rem 1rem;
  .card-box {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 2rem);
    height: 14rem;
    background: #fff;
    border-radius: 4px;
    margin: 1rem 0;
    .logo-box {
      height: 80%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .text-box {
      padding: 0.8rem;
      text-align: center;
      color: #ccc;
      font-size: 14px;
    }
    .skeletonBox {
      padding-top: 1rem;
      /deep/ .van-skeleton__row:first-child {
        height: 10.2rem;
      }
      /deep/ .van-skeleton__row:nth-child(2) {
        margin-left: 20%;
      }
    }
  }
}
</style>
