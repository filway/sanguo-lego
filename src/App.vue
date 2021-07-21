<template>
  <div class="app-container">
    <van-loading v-if="showLoading" style="text-align: center" size="24px"
      >加载中...</van-loading
    >
    <router-view />
  </div>
</template>

<script lang="ts">
import { Notify } from "vant";
import { computed, defineComponent, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps } from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore<GlobalDataProps>();
    const isLoading = computed(() => store.getters.isLoading);
    const route = useRoute();
    const showLoading = computed(
      () => isLoading.value && !route.meta.disableLoading
    );
    const error = computed(() => store.state.global.error);
    watch(
      () => error.value.status,
      (errorValue) => {
        if (errorValue) {
          Notify({
            type: "danger",
            message: error.value.message || "未知错误",
          });
        }
      }
    );
    //数据持久化
    const saveState = () => {
      sessionStorage.setItem("state", JSON.stringify(store.state));
    };
    onMounted(() => {
      window.addEventListener("unload", saveState);
    });
    return {
      showLoading,
    };
  },
});
</script>

<style>
.app-container .global-spinner {
  position: fixed;
  top: 10px;
  right: 50%;
}
</style>
