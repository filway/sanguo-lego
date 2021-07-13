<template>
  <div class="editor-container">
    <van-nav-bar title="logo在线编辑" @click-left="$router.back(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" />
      </template>
    </van-nav-bar>

    <van-row>
      <van-col span="24" class="editorTips"> 编辑好后点击下载即可 </van-col>
    </van-row>
    <van-row class="iconsWrapper">
      <van-col span="6" class="icon-left">
        <van-icon name="browsing-history-o" />
      </van-col>
      <van-col span="12" class="icon-center">
        <van-icon name="replay" />
      </van-col>
      <van-col span="6" class="icon-right">
        <van-icon name="down" />
      </van-col>
    </van-row>
    <van-row class="content">
      <van-col span="24">
        <div class="logo-box" v-for="(logo, key) in logoList" :key="key">
          <svg
            baseProfile="full"
            version="1.1"
            :class="'svg' + key"
            viewBox="0 0 500 400"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
      </van-col>
    </van-row>
    <van-tabs class="tabsWrapper" v-model:active="active">
      <van-tab>
        <template #title> <van-icon name="photo" /></template>
        <van-row>
          <van-col span="16">
            <van-image
              width="3rem"
              height="3rem"
              fit="contain"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
            <van-image
              width="3rem"
              height="3rem"
              fit="contain"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
            <van-image
              width="3rem"
              height="3rem"
              fit="contain"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
          </van-col>
          <van-col span="4"></van-col>
          <van-col span="4"><van-icon name="setting" /></van-col>
        </van-row>
      </van-tab>
      <van-tab>
        <template #title> <van-icon name="chat" /></template>
        内容 2
      </van-tab>
      <van-tab>
        <template #title> <van-icon name="setting" /></template>
        内容 3
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import useCreateLogo from "@/hooks/useCreateLogo";
import store from "@/store";
import { TemplateProps } from "@/store/templates";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Editor",
  setup() {
    const route = useRoute();
    let logoList = ref<TemplateProps[]>([]);
    const currentId = route.params.id as string;
    console.log(currentId);
    const template = computed<TemplateProps>(() =>
      store.getters.getTemplateById(parseInt(currentId, 0))
    );
    const active = ref(0);
    logoList.value.push(template.value);
    onMounted(async () => {
      await useCreateLogo(logoList.value, false);
    });
    return {
      logoList,
      active,
    };
  },
});
</script>

<style scoped lang="scss">
.editor-container {
  background: #eee;
  min-height: 100vh;
  position: relative;
  .editorTips {
    text-align: center;
    background: lightskyblue;
    color: #fff;
    padding: 0.55rem 1rem;
    font-size: 12px;
    font-weight: 350;
  }
  .iconsWrapper {
    padding: 2rem;
    .icon-left {
      text-align: right;
    }
    .icon-center {
      text-align: center;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    height: 14rem;
    width: calc(100vw - 2rem);
    margin-left: 1rem;
    background: url("~@/assets/img/background-transparent.png");
    border-radius: 5px;
    .logo-box {
      height: 80%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .tabsWrapper {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 4rem);
    flex-flow: column-reverse;
    margin-left: 2rem;
    position: absolute;
    bottom: 0.8rem;
  }
}
</style>
