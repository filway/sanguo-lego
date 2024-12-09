<template>
  <div class="listpage-container">
    <van-loading
      class="loadingBox"
      v-if="isLoading"
      style="text-align: center"
      size="24px"
      vertical
      color="#fff"
      >加载中...</van-loading
    >

    <div v-show="!isLoading" class="header-tips" v-html="tips"></div>

    <div v-show="!isLoading">
      <router-link :to="{path: `/design/${logo.materialId}`}"  v-for="(logo, key) in logoList"
                   :key="key">
        <div
            class="card-box"
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
          <div class="text-box animate__animated animate__bounce">点击查看详情</div>
        </div>
      </router-link>
    </div>

    <div class="pageBox" v-show="!isLoading">
      <div class="pagenation-big" v-show="currentPage === 1 && totalPage > 1" @click="nextPage()">下一款方案</div>
      <div class="pagenation-small-box">
        <div
            class="pagenation-small"
            v-show="currentPage > 1 && currentPage < totalPage"
            @click="prevPage()"
        >
          上一款方案
        </div>
        <div
            class="pagenation-small"
            v-show="currentPage > 1 && currentPage < totalPage"
            @click="nextPage()"
        >
          下一款方案
        </div>
      </div>
      <div class="pagenation-big" v-show="currentPage === totalPage && currentPage !== 1" @click="prevPage()">
        上一款方案
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, computed, ref, watch} from "vue";
import { useRoute } from "vue-router";
import { GlobalDataProps } from '../store/index'
import { useStore } from 'vuex'
import useCreateLogo from '@/hooks/useCreateLogo'


export default defineComponent({
  name: 'List',
  setup() {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()

    const isLoading = computed(() => store.getters.isLoading)

    const logoList = computed(() => store.state.list.list)
    console.log(logoList.value)

    const totalPage = computed(() => store.state.list.total_page)

    // 声明一个代表当前页数的变量
    const currentPage = computed(() => store.state.list.now_page)

    const tips = computed(() => store.state.list.tips)

    const nextPage = () => {
      if (currentPage.value === logoList.value.length) {
        return
      }
      store.commit('setNowPage', currentPage.value + 1)
    }
    const prevPage = () => {
      if (currentPage.value === 1) {
        return
      }
      store.commit('setNowPage', currentPage.value - 1)
    }

    onMounted(async () => {
      let { sn } = route.query
      console.log(sn)
      localStorage.setItem('sn', sn as string)
      //获取logo list
      await store.dispatch('fetchList', { searchParams: {
        sn: sn || '',
        page: currentPage.value,
      } })
      await useCreateLogo(logoList.value, false)
    })

    watch(
        () => currentPage.value,
        async (newValue) => {
          store.commit('setNowPage', newValue)
          await store.dispatch('fetchList', { searchParams: {
            sn: localStorage.getItem('sn') || '',
            page: newValue,
          }})
          // 清空现有的 SVG 容器
          logoList.value.forEach((_, key) => {
            const svgContainer = document.querySelector(`.svg${key}`);
            if (svgContainer) {
              svgContainer.innerHTML = '';
            }
          });
          await useCreateLogo(logoList.value, false)
        }
    );

    return {
      isLoading,
      logoList,
      currentPage,
      nextPage,
      prevPage,
      totalPage,
      tips
    };
  },
});
</script>
<style scoped lang="scss">
.listpage-container {
  position: relative;
  background: #f8f8f8;
  padding-bottom: 0.5rem;
  .header-tips {
    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-size: 14px;
    height: 3rem;
    border-bottom: 1px solid #d9d9d9;
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
  .card-box {
    margin: 0 auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width: calc(100vw - 2rem);
    height: 14rem;
    background: #fff;
    border: 3px solid #9d9d9d;
    border-radius: 8px;
    animation: zoomIn; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s; /* don't forget to set a duration! */
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

  .pageBox {
    text-align: center;
    display: flex;
    color: #000;
    border-radius: 8px;
    flex-direction: column;
    align-items: center;
    padding: 0 1.8rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    .pagenation-big {
      background-color: #0201fd;
      color: #fff;
      padding: 3px 6px;
      width: 100px;
      height: 35px;
      line-height: 35px;
      border-radius: 5px;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }
    .pagenation-small-box {
      width: 300px;
      display: flex;
      justify-content: space-evenly;
      .pagenation-small {
        background-color: #0201fd;
        color: #fff;
        padding: 3px 6px;
        width: 100px;
        height: 35px;
        line-height: 35px;
        border-radius: 5px;
        margin-bottom: 0.5rem;
        cursor: pointer;
      }
    }
    // background: url("../assets/img/img_banner.jpg");
  }
}
</style>
