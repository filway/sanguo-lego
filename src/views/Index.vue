<template>
  <div
    class="homepage-container"
    :style="{ background: logoList.length ? '#eee' : '#fff' }"
  >
    <div v-for="(logo, key) in logoList" :key="key">
      <router-link :to="{ name: 'editor', params: { id: logo.materialId } }">
        <div class="card-box">
          <div class="logo-box">
            <svg
              baseProfile="full"
              version="1.1"
              :class="'svg' + key"
              viewBox="0 0 500 400"
              xmlns="http://www.w3.org/2000/svg"
            />
          </div>
          <div class="text-box">点击选择此方案</div>
        </div>
      </router-link>
    </div>
    <van-row v-if="!logoList.length">
      <van-col span="24" style="text-align: center">
        <van-empty description="暂时未找到搜索结果" />
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { GlobalDataProps } from "../store/index";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import useCreateLogo from "@/hooks/useCreateLogo";

export default defineComponent({
  name: "Index",
  setup() {
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const logoList = computed(() => store.state.templates.data);
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
  }
}
</style>
