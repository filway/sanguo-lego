<template>
  <div class="header-nav-container">
    <van-nav-bar :title="title" @click-left="back">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderNav",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["back"],
  setup(props, context) {
    const back = () => {
      context.emit("back");
    };
    return {
      back,
    };
  },
});
</script>
