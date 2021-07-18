<template>
  <div class="editor-container">
    <van-nav-bar title="logo在线编辑" @click-left="$router.back(-1)">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#333" />
      </template>
    </van-nav-bar>

    <preview-dialog
      @close="closePreviewDialog"
      :show="showPreview"
      :parentView="'editor'"
    ></preview-dialog>
    <van-row>
      <van-col span="24" class="editorTips"> 编辑好后点击下载即可 </van-col>
    </van-row>
    <van-row class="iconsWrapper">
      <van-col span="6" class="icon-left">
        <van-icon
          @click="showPreview = true"
          name="browsing-history-o"
          size="1.2rem"
        />
      </van-col>
      <van-col span="12" class="icon-center">
        <van-icon name="replay" @click="resetSvg" size="1.2rem" />
      </van-col>
      <van-col span="6" class="icon-right">
        <van-icon @click="download" name="down" size="1.2rem" />
      </van-col>
      <download-dialog
        @close="showDownload = false"
        :show="showDownload"
        :parentView="'editor'"
      ></download-dialog>
    </van-row>
    <van-row class="content" :style="{ backgroundColor: currentBackColor }">
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
            viewBox="0 0 686 448"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
      </van-col>
    </van-row>
    <van-tabs background="#eee" class="tabsWrapper" v-model:active="active">
      <van-tab>
        <template #title>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="tubiao"
            size="1.2rem"
        /></template>
        <van-row class="tab1Box">
          <van-col class="imageBox" span="9">
            <van-image
              width="2rem"
              height="2rem"
              fit="contain"
              :class="{ activeImage: imageActive === 3 }"
              @click="selectPostionImage(3)"
              src="http://sj.songshuqf.com/dist/img/4.64f529e3.svg"
            />
            <van-image
              width="2rem"
              height="2rem"
              fit="contain"
              :class="{ activeImage: imageActive === 4 }"
              @click="selectPostionImage(4)"
              src="http://sj.songshuqf.com/dist/img/4.64f529e3.svg"
            />
            <van-image
              width="2rem"
              height="2rem"
              fit="contain"
              :class="{ activeImage: imageActive === 5 }"
              @click="selectPostionImage(5)"
              src="http://sj.songshuqf.com/dist/img/1.c4ac3a80.svg"
            />
          </van-col>
          <van-col span="3"
            ><van-icon class="iconfont" class-prefix="icon" name="sucai"
          /></van-col>
          <van-col span="3">
            <van-popover v-model:show="showImgPopover" placement="top">
              <div class="sliderBox">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrImgValue }}</h5>
                  <van-slider
                    v-model="lrImgValue"
                    :min="-375"
                    :max="375"
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
                    :min="10"
                    :max="420"
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
      <van-tab class="tab2">
        <template #title>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="hengxiangwenben"
            size="1.2rem"
        /></template>
        <div class="titleBox">
          <span
            :class="[
              tab2ContentTitleActive == 0
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab2Title(0)"
            >名称</span
          >
          <van-dialog
            v-model:show="isShowNameInput"
            show-cancel-button
            title="请输入"
            width="300"
            :before-close="onCloseNameDialog"
          >
            <van-field
              clearable
              label=""
              placeholder="请输入姓名"
              v-model="template.name"
              v-show="tab2ContentTitleActive === 0"
            />
            <van-field
              clearable
              label=""
              placeholder="请输入姓名"
              v-model="template.name_en"
              v-show="tab2ContentTitleActive === 1"
            />
          </van-dialog>
          <span
            :class="[
              tab2ContentTitleActive == 1
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab2Title(1)"
            >口号</span
          >
        </div>
        <div class="settingBox">
          <span @click="isShowNameInput = true">{{
            tab2ContentTitleActive ? template.name_en : template.name
          }}</span>
          <span>
            <van-popover v-model:show="showFamilyPopover" placement="top-end">
              <div
                v-for="(item, index) in familyOptions"
                :key="index"
                role="menuitem"
                class="van-popover__action"
                style="height: 1.6rem; width: 10rem"
                @click="selectFontFamily(item.text, item.value)"
              >
                <div
                  :style="{ fontFamily: item.value }"
                  class="van-popover__action-text van-hairline--bottom"
                >
                  {{ item.text }}
                </div>
              </div>
              <template #reference>
                <span v-show="tab2ContentTitleActive === 0">{{
                  currentNameFamily
                }}</span>
                <span v-show="tab2ContentTitleActive === 1">{{
                  currentSloganFamily
                }}</span>

                <span><van-icon name="arrow-up" /></span>
              </template>
            </van-popover>
          </span>
          <span>
            <van-popover v-model:show="showImgPopover" placement="top-end">
              <div class="sliderBox2" v-show="tab2ContentTitleActive === 0">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrLogoValue }}</h5>
                  <van-slider
                    v-model="lrLogoValue"
                    :min="-375"
                    :max="375"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 4)"
                  />
                </div>
                <div>
                  <h5>上下: {{ udLogoValue }}</h5>
                  <van-slider
                    v-model="udLogoValue"
                    :min="-200"
                    :max="200"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 5)"
                  />
                </div>
              </div>
              <div class="sliderBox2" v-show="tab2ContentTitleActive === 1">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrSloganValue }}</h5>
                  <van-slider
                    v-model="lrSloganValue"
                    :min="-375"
                    :max="375"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 6)"
                  />
                </div>
                <div>
                  <h5>上下: {{ udSloganValue }}</h5>
                  <van-slider
                    v-model="udSloganValue"
                    :min="-200"
                    :max="200"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 7)"
                  />
                </div>
              </div>
              <template #reference>
                <van-icon name="setting" />
              </template>
            </van-popover>
          </span>
        </div>
      </van-tab>
      <van-tab class="tab2" style="margin-bottom: 1rem">
        <template #title>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="yanse"
            size="1.2rem"
        /></template>
        <div class="titleBox">
          <span
            :class="[
              tab3ContentTitleActive == 0
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab3Title(0)"
            >名称</span
          >
          <span
            :class="[
              tab3ContentTitleActive == 1
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab3Title(1)"
            >口号</span
          >
          <span
            :class="[
              tab3ContentTitleActive == 2
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab3Title(2)"
            >背景</span
          >
        </div>
        <color-picker
          v-show="tab3ContentTitleActive === 0"
          :value="currentNameColor"
          @change="changeNameColor"
        />
        <color-picker
          v-show="tab3ContentTitleActive === 1"
          :value="currentSloganColor"
          @change="changeSloganColor"
        />
        <color-picker
          v-show="tab3ContentTitleActive === 2"
          :value="currentBackColor"
          @change="changeBackColor"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import useCreateLogo from "@/hooks/useCreateLogo";
import store from "@/store";
import { TemplateProps } from "@/store/templates";
import { computed, defineComponent, onMounted, provide, ref } from "vue";
import { useRoute } from "vue-router";
import { SVG } from "@svgdotjs/svg.js";
import { fontFamilyArr } from "../constants/random.constant";
import ColorPicker from "@/components/ColorPicker.vue";
import PreviewDialog from "@/components/PreviewDialog.vue";
import DownloadDialog from "@/components/DownloadDialog.vue";

export default defineComponent({
  name: "Editor",
  components: {
    ColorPicker,
    PreviewDialog,
    DownloadDialog,
  },
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
    const tab2ContentTitleActive = ref(0);
    const showImgPopover = ref(false);
    const showFamilyPopover = ref(false);
    const isShowNameInput = ref(false);
    const initValues = () => {
      lrImgValue.value = 0;
      udImgValue.value = 0;
      lsImgValue.value = 220;
    };
    const selectPostionImage = (index: number) => {
      imageActive.value = index;
      const svgChild = svgRef.value?.childNodes[0];
      svgRef.value?.removeChild(svgChild as Node);
      createLogoLoading.value = true;
      initValues();

      setTimeout(() => {
        useCreateLogo(logoList.value, true, {
          randomIndex: index,
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
    const lsImgValue = ref(220);
    // logo slogan slider滑动
    const lrLogoValue = ref(0);
    const lrSloganValue = ref(0);
    const udLogoValue = ref(0);
    const udSloganValue = ref(0);
    const onSliderChange = (value: number, type: number) => {
      const draw = SVG(".svg-logo0");
      const drawName = SVG(".svg-name0");
      const drawSlogan = SVG(".svg-slogan0");
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
        case 4:
          drawName.move(value, udLogoValue.value);
          break;
        case 5:
          drawName.move(lrLogoValue.value, value);
          break;
        case 6:
          drawSlogan.move(value, udSloganValue.value);
          break;
        case 7:
          drawSlogan.move(lrSloganValue.value, value);
          break;
      }
    };
    // tab2的逻辑
    const toggleTab2Title = (value: number) => {
      tab2ContentTitleActive.value = value;
    };
    const resetSvg = () => {
      initValues();
      onSliderChange(0, 1);
      onSliderChange(0, 2);
      onSliderChange(220, 3);
    };
    // tab2弹窗输入的name
    const onCloseNameDialog = (action: string) =>
      new Promise((resolve) => {
        if (action === "cancel") {
          resolve(true);
        }
        setTimeout(() => {
          //判断是名称还是口号的修改
          let drawText;
          if (tab2ContentTitleActive.value === 0) {
            drawText = SVG(".svg-name0");
            drawText.node.textContent = template.value.name;
            // 翻译
            store
              .dispatch("translate", {
                searchParams: { keyword: template.value.name },
              })
              .then(() => {
                drawText = SVG(".svg-slogan0");
                const cNameEn = store.getters.getCurrentNameEn;
                drawText.node.textContent = cNameEn;
                template.value.name_en = cNameEn;
              });
          } else {
            drawText = SVG(".svg-slogan0");
            drawText.node.textContent = template.value.name_en;
          }
          resolve(true);
        }, 1000);
      });
    const familyOptions = ref(fontFamilyArr);
    const selectedFamily = ref("");
    const selectFontFamily = (text: string, family: string) => {
      showFamilyPopover.value = false;
      console.log(family);
      if (tab2ContentTitleActive.value === 0) {
        SVG(".svg-name0").attr("font-family", family);
        currentNameFamily.value = text;
      } else {
        SVG(".svg-slogan0").attr("font-family", family);
        currentSloganFamily.value = text;
      }
    };
    const currentNameFamily = ref("无");
    const currentSloganFamily = ref("无");

    //tab3 颜色
    const toggleTab3Title = (value: number) => {
      tab3ContentTitleActive.value = value;
    };
    const tab3ContentTitleActive = ref(0);
    const currentNameColor = ref("");
    const changeNameColor = (color: string) => {
      if (color === "") {
        color = "#000000";
      }
      currentNameColor.value = color;
      SVG(".svg-name0").attr("fill", color);
    };

    const currentSloganColor = ref("");
    const changeSloganColor = (color: string) => {
      if (color === "") {
        color = "#000000";
      }
      currentSloganColor.value = color;
      SVG(".svg-slogan0").attr("fill", color);
    };

    //背景色
    const currentBackColor = ref("#ffffff");
    const changeBackColor = (color: string) => {
      if (color === "") {
        color = "#ffffff";
      }
      currentBackColor.value = color;
    };

    // 预览
    const showPreview = ref(false);
    const closePreviewDialog = () => {
      showPreview.value = false;
    };

    //下载
    const download = () => {
      showDownload.value = true;
    };
    const showDownload = ref(false);
    provide("key", 0);

    return {
      logoList,
      active,
      selectPostionImage,
      imageActive,
      createLogoLoading,
      svgRef,
      showImgPopover,
      showFamilyPopover,
      lrImgValue,
      udImgValue,
      lsImgValue,
      onSliderChange,
      resetSvg,
      template,
      tab2ContentTitleActive,
      toggleTab2Title,
      lrLogoValue,
      lrSloganValue,
      udLogoValue,
      udSloganValue,
      isShowNameInput,
      onCloseNameDialog,
      familyOptions,
      selectedFamily,
      selectFontFamily,
      currentNameFamily,
      currentSloganFamily,
      currentNameColor,
      changeNameColor,
      currentSloganColor,
      changeSloganColor,
      currentBackColor,
      changeBackColor,
      tab3ContentTitleActive,
      toggleTab3Title,
      closePreviewDialog,
      showPreview,
      download,
      showDownload,
    };
  },
});
</script>

<style scoped lang="scss">
.lego-color-picker {
  height: 4rem;
}
.activeImage {
  border: 1px solid red !important;
}
.activeTitle {
  background: #3286fe;
  color: #fff;
}
.noActiveTitle {
  background: #fff;
}
.sliderBox {
  padding: 0.5rem 1rem;
  h5 {
    margin-bottom: 0.2rem;
  }
  height: 8rem;
  width: 8rem;
}
.sliderBox2 {
  padding: 0.5rem 1rem;
  h5 {
    margin-bottom: 0.2rem;
  }
  height: 5rem;
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
    // background: url("~@/assets/img/background-transparent.png");
    border-radius: 5px;
    .logoLoading {
      left: calc(50vw - 1rem - 20px);
      top: 50%;
    }
    .logo-box {
      height: 100%;
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
    .tabContentTitle {
      border-radius: 8px;
      padding: 0.1rem 0.5rem;
      font-size: 14px;
      margin-right: 1rem;
      display: inline-flex;
    }
    .tab2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      .titleBox {
        margin-bottom: 1rem;
      }
      .settingBox {
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        width: 100%;
        > span:first-child {
          border: 1px solid #ccc;
          background: #fff;
          width: 32%;
          padding: 0.4rem 1.5rem;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > span:nth-child(2) {
          border: 1px solid #ccc;
          background: #eee;
          flex: 1;
          font-size: 14px;
          margin-right: 1rem;
          display: flex;
          justify-content: space-around;
          /deep/ .van-popover__wrapper {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 0.4rem 0.8rem;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 5rem;
            }
          }
        }
      }
    }
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
          /deep/ img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
