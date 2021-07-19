<template>
  <div class="download-dialog">
    <van-dialog
      width="340"
      v-model:show="dialogVisible"
      :show-cancel-button="false"
      title="请选择下载格式"
      confirm-button-text="关闭"
      @confirm="close"
    >
      <div class="buttonBox">
        <van-button type="primary" @click="downloadSVG(index)" round plain>
          SVG下载
        </van-button>
        <van-button type="primary" round plain>
          <a :href="pngurl">PNG下载</a>
        </van-button>
        <van-button type="primary" round plain>
          <a :href="pngurl">JPG下载</a>
        </van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch } from "vue";
import { downloadSVG, downloadImage } from "@/hooks/useDownloadMaterial";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    parentView: {
      type: String,
      default: "index",
    },
    logoId: {
      type: Number,
      default: 0,
    },
  },
  emits: ["close"],
  setup(props, context) {
    const dialogVisible = ref(props.show);
    const fromPage = ref(props.parentView);
    const materialId = ref(props.logoId);
    const index = inject("key");
    const pngurl = inject("pngurl");
    console.log(pngurl);
    const close = () => {
      context.emit("close");
    };
    watch(
      () => props.show,
      (newValue) => {
        dialogVisible.value = newValue;
      }
    );
    watch(
      () => props.logoId,
      (newValue) => {
        materialId.value = newValue;
      }
    );
    return {
      dialogVisible,
      fromPage,
      materialId,
      close,
      index,
      downloadSVG,
      downloadImage,
      pngurl,
    };
  },
});
</script>

<style lang="scss" scoped>
.buttonBox {
  padding: 1.5rem 1.5rem 0;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
</style>
