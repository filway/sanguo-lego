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
          <div
            :style="{ backgroundImage: 'url(' + item.url + ')' }"
            :class="`bgimg bgimg_${index}`"
            v-html="item.svg"
          ></div>
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
          :to="{
            name: 'download',
            params: { id: materialId, bgColor: bgColor },
          }"
        >
          直接下载
        </van-button>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

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
      type: Number || String,
      default: 0,
    },
    previewData: {
      type: Array,
      default: () => [],
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
  },
  emits: ["close"],
  setup(props, context) {
    const dialogVisible = ref(props.show);
    const fromPage = ref(props.parentView);
    const materialId = ref(props.logoId);

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
.my-swipe {
  width: 100%;
  height: 14rem;
}
.bgimg {
  width: 340px;
  height: 224px;
  position: relative;
  background-size: 100% 100%;
}
</style>
