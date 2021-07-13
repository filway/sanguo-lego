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
          <van-loading
            class="logoLoading"
            v-show="createLogoLoading"
            type="spinner"
            color="#1989fa"
          />
          <svg
            ref="svgRef"
            baseProfile="full"
            version="1.1"
            :class="'svg' + key"
            viewBox="0 0 500 400"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
      </van-col>
    </van-row>
    <van-tabs background="#eee" class="tabsWrapper" v-model:active="active">
      <van-tab>
        <template #title> <van-icon name="photo" /></template>
        <van-row class="tab1Box">
          <van-col class="imageBox" span="9">
            <van-image
              width="2rem"
              height="2rem"
              fit="contain"
              :class="{ activeImage: imageActive === 1 }"
              @click="selectPostionImage(1)"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
            <van-image
              width="2rem"
              height="2rem"
              fit="contain"
              :class="{ activeImage: imageActive === 2 }"
              @click="selectPostionImage(2)"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
            <van-image
              width="2rem"
              height="2rem"
              fit="contain"
              :class="{ activeImage: imageActive === 3 }"
              @click="selectPostionImage(3)"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
          </van-col>
          <van-col span="3"><van-icon name="setting" /></van-col>
          <van-col span="3">
            <van-popover v-model:show="showImgPopover" placement="top">
              <div class="sliderBox">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrImgValue }}</h5>
                  <van-slider
                    v-model="lrImgValue"
                    :min="-200"
                    :max="400"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 1)"
                  />
                </div>
                <div>
                  <h5>上下: {{ udImgValue }}</h5>
                  <van-slider
                    v-model="udImgValue"
                    :min="-200"
                    :max="200"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 2)"
                  />
                </div>
                <div>
                  <h5>大小: {{ lsImgValue }}</h5>
                  <van-slider
                    v-model="lsImgValue"
                    :min="0"
                    :max="200"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 3)"
                  />
                </div>
              </div>
              <template #reference>
                <van-icon name="setting" />
              </template>
            </van-popover>
          </van-col>
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
import { SVG } from "@svgdotjs/svg.js";

export default defineComponent({
  name: "Editor",
  setup() {
    const route = useRoute();
    const svgRef = ref<SVGElement | null>(null);
    let logoList = ref<TemplateProps[]>([]);
    const currentId = route.params.id as string;
    const template = computed<TemplateProps>(() =>
      store.getters.getTemplateById(parseInt(currentId, 0))
    );
    const createLogoLoading = ref(false);
    const active = ref(0);
    const imageActive = ref(0);
    const showImgPopover = ref(false);
    const selectPostionImage = (index: number) => {
      imageActive.value = index;
      const svgChild = svgRef.value?.childNodes[0];
      svgRef.value?.removeChild(svgChild as Node);
      createLogoLoading.value = true;

      setTimeout(() => {
        useCreateLogo(logoList.value, true, {
          randomIndex: index - 1,
          randomTitleFamily: template.value.randomTitleFamily || "",
          randomSubTitleFamily: template.value.randomSubTitleFamily || "",
        });
        createLogoLoading.value = false;
      }, 500);
    };
    logoList.value.push(template.value);
    onMounted(async () => {
      await useCreateLogo(logoList.value, false);
    });
    // image slider滑动
    const lrImgValue = ref(0);
    const udImgValue = ref(0);
    const lsImgValue = ref(0);
    const onSliderChange = (value: number, type: number) => {
      const draw = SVG(".logoImage0");
      switch (type) {
        case 1:
          draw.move(value, udImgValue.value);
          break;
        case 2:
          draw.move(lrImgValue.value, value);
          break;
        case 3:
          draw.size(value, value);
          break;
      }

      console.log(value, type);
    };
    return {
      logoList,
      active,
      selectPostionImage,
      imageActive,
      createLogoLoading,
      svgRef,
      showImgPopover,
      lrImgValue,
      udImgValue,
      lsImgValue,
      onSliderChange,
    };
  },
});
</script>

<style scoped lang="scss">
.activeImage {
  border: 1px solid red !important;
}
.sliderBox {
  padding: 0.5rem 1rem;
  h5 {
    margin-bottom: 0.2rem;
  }
  height: 8rem;
  width: 8rem;
}
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
    .logoLoading {
      left: calc(50vw - 1rem - 20px);
      top: 50%;
    }
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
    .tab1Box {
      display: flex;
      align-items: center;
      padding-bottom: 0.8rem;
      justify-content: space-around;
      .imageBox {
        display: flex;
        align-items: center;
        .van-image {
          margin-left: 0.1rem;
          border: 1px solid #ccc;
          box-sizing: border-box;
          background: #fff;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
