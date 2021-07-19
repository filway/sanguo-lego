<template>
  <div class="preview-dialog">
    <van-dialog
      width="340"
      v-model:show="dialogVisible"
      :show-cancel-button="false"
      :show-confirm-button="false"
    >
      <div class="closeBox">
        <van-icon @click="close" size="1.5rem" name="clear" />
      </div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in previewData" :key="index">
          <img :src="item" alt="" width="340" />
        </van-swipe-item>
      </van-swipe>
      <div class="buttonBox">
        <van-button
          size="large"
          icon-prefix="icon"
          icon="bianji iconfont"
          type="primary"
          v-show="fromPage === 'index'"
          :to="{ name: 'editor', params: { id: materialId } }"
        >
          进入编辑
        </van-button>
        <van-button
          size="large"
          icon-prefix="icon"
          icon="bianji iconfont"
          type="primary"
          @click="close"
          v-show="fromPage === 'editor'"
        >
          继续编辑
        </van-button>
        <van-button
          size="large"
          icon-prefix="icon"
          icon="download iconfont"
          type="primary"
          plain
          @click="clickDownload"
        >
          直接下载
        </van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { Array } from "@svgdotjs/svg.js";
import { defineComponent, PropType, ref, watch } from "vue";

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
    previewData: {
      type: Array as PropType<string[]>,
    },
  },
  emits: ["close", "clickDownload"],
  setup(props, context) {
    const dialogVisible = ref(props.show);
    const fromPage = ref(props.parentView);
    const materialId = ref(props.logoId);

    const close = () => {
      context.emit("close");
    };
    const clickDownload = () => {
      console.log("跳转到下载页面");
      context.emit("clickDownload");
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
      clickDownload,
    };
  },
});
</script>

<style lang="scss" scoped>
.closeBox {
  height: 2.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.6rem;
}

.buttonBox {
  padding: 1.5rem 1.5rem 0;
  .van-button {
    margin-bottom: 2rem;
    border-radius: 5px;
  }
}
</style>
