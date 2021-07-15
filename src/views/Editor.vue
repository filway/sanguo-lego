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
        <van-icon name="browsing-history-o" size="1.2rem" />
      </van-col>
      <van-col span="12" class="icon-center">
        <van-icon name="replay" @click="resetSvg" size="1.2rem" />
      </van-col>
      <van-col span="6" class="icon-right">
        <van-icon name="down" size="1.2rem" />
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
            viewBox="0 0 686 448"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
      </van-col>
    </van-row>
    <van-tabs background="#eee" class="tabsWrapper" v-model:active="active">
      <van-tab>
        <template #title> <van-icon name="photo" size="1.5rem" /></template>
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
          <van-col span="3"><van-icon name="setting" /></van-col>
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
        <template #title> <van-icon name="chat" size="1.5rem" /></template>
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
              v-model="editName"
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
            <span>宋体</span>
            <span><van-icon name="arrow-up" /></span>
          </span>
          <span>
            <van-popover v-model:show="showImgPopover" placement="left">
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
      <van-tab>
        <template #title> <van-icon name="setting" size="1.5rem" /></template>
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
    const tab2ContentTitleActive = ref(0);
    const showImgPopover = ref(false);
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
          drawName.dmove(1, 0);
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
      if (value === 0) {
        editName.value = template.value.name;
      } else {
        editName.value = template.value.name_en;
      }
    };
    const resetSvg = () => {
      initValues();
      onSliderChange(0, 1);
      onSliderChange(0, 2);
      onSliderChange(220, 3);
    };
    // tab2弹窗输入的name
    const editName = ref(template.value.name);
    const onCloseNameDialog = (action: string) =>
      new Promise((resolve) => {
        setTimeout(() => {
          if (action === "confirm") {
            //判断是名称还是口号的修改
            if (tab2ContentTitleActive.value === 0) {
              store.commit("setCurrentTemplateProp", {
                materialId: template.value.materialId,
                name: editName,
              });
            } else {
              store.commit("setCurrentTemplateProp", {
                materialId: template.value.materialId,
                name_en: editName,
              });
            }
            resolve(true);
          }
        }, 1000);
      });

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
      resetSvg,
      template,
      tab2ContentTitleActive,
      toggleTab2Title,
      lrLogoValue,
      lrSloganValue,
      udLogoValue,
      udSloganValue,
      isShowNameInput,
      editName,
      onCloseNameDialog,
    };
  },
});
</script>

<style scoped lang="scss">
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
    background: url("~@/assets/img/background-transparent.png");
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
          padding: 0.4rem 0.8rem;
          display: flex;
          justify-content: space-around;
          > span:first-child {
            width: 80%;
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
        }
      }
    }
  }
}
</style>
