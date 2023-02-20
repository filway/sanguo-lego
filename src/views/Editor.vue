<template>
  <div class="editor-container">
    <header-nav :title="'logo在线编辑'" @back="$router.back(-1)" />

    <preview-dialog
      @close="closePreviewDialog"
      :show="showPreview"
      :previewData="previewData"
      :parentView="'editor'"
      :bgColor="currentBackColor"
      :logoId="marteralId"
    ></preview-dialog>
    <van-row>
      <van-col span="24" class="editorTips"> 编辑好后点击下载即可 </van-col>
    </van-row>
    <van-row class="iconsWrapper">
      <van-col span="6" class="icon-left">
        <div class="circleBox">
          <van-icon @click="openPreviewDialog" name="browsing-history-o" size="1.2rem" />
        </div>
      </van-col>
      <van-col span="12" class="icon-center">
        <div class="circleBox">
          <van-icon name="replay" @click="selectPostionImage(template.randomIndex)" size="1.2rem" />
        </div>
      </van-col>
      <van-col span="6" class="icon-right">
        <router-link
          :to="{
            name: 'download',
            params: { id: marteralId, bgColor: currentBackColor },
          }"
        >
          <div class="circleBox">
            <van-icon style="color: #000" name="down" size="1.2rem" />
          </div>
        </router-link>
      </van-col>
    </van-row>
    <van-row class="content" :style="{ backgroundColor: currentBackColor }">
      <van-col span="24">
        <div class="logo-box" v-for="(logo, key) in logoList" :key="key">
          <!-- <van-loading
            class="logoLoading"
            v-show="createLogoLoading"
            type="spinner"
            color="#1989fa"
          /> -->
          <div v-show="createLogoLoading" class="logoLoading"></div>
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
    <van-tabs @click="onClickTab" background="#f8f8f8" class="tabsWrapper" v-model:active="active">
      <van-tab title="title1" class="tab2">
        <template #title>
          <van-icon class="iconfont" class-prefix="icon" name="tubiao" size="1.2rem"
        /></template>
        <div class="titleBox">
          <span class="tabContentTitle activeTitle">图标</span>
        </div>
        <van-row class="tab1Box">
          <van-col class="imageBox" span="9">
            <van-image
              height="1.8rem"
              fit="contain"
              @click="selectPostionImage(0)"
              class="leftImage"
              v-show="imageActive === 0"
              :src="require('../assets/img/left_active.png')"
            />
            <van-image
              height="1.8rem"
              fit="contain"
              class="leftImage"
              @click="selectPostionImage(0)"
              v-show="imageActive !== 0"
              :src="require('../assets/img/left.png')"
            />
            <van-image
              height="1.8rem"
              fit="contain"
              class="centerImage"
              v-show="imageActive === 1"
              @click="selectPostionImage(1)"
              :src="require('../assets/img/vertical_active.jpg')"
            />
            <van-image
              height="1.8rem"
              fit="contain"
              class="centerImage"
              v-show="imageActive !== 1"
              @click="selectPostionImage(1)"
              :src="require('../assets/img/vertical.png')"
            />
            <!-- <van-image
              height="1.8rem"
              fit="contain"
              class="rightImage"
              v-show="imageActive === 2"
              @click="selectPostionImage(2)"
              :src="require('../assets/img/center_active.png')"
            /> -->
            <!-- <van-image
              height="1.8rem"
              fit="contain"
              class="rightImage"
              v-show="imageActive !== 2"
              @click="selectPostionImage(2)"
              :src="require('../assets/img/center.png')"
            /> -->
          </van-col>
          <van-col span="3"><div @click="resetSvg" class="smallImg"></div></van-col>
          <van-col span="3">
            <van-popover v-model:show="showImgPopover" placement="top">
              <div class="sliderBox">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrImgValue }}</h5>
                  <van-slider
                    v-model="lrImgValue"
                    :min="-800"
                    :max="800"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 1)"
                  />
                </div>
                <div>
                  <h5>上下: {{ udImgValue }}</h5>
                  <van-slider
                    v-model="udImgValue"
                    :min="-800"
                    :max="800"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 2)"
                  />
                </div>
                <div>
                  <h5>大小: {{ lsImgValue }}</h5>
                  <van-slider
                    v-model="lsImgValue"
                    :min="10"
                    :max="initLsValue * 2"
                    :button-size="18"
                    @update:model-value="onSliderChange($event, 3)"
                  />
                </div>
              </div>
              <template #reference>
                <div class="smallImg">
                  <van-icon name="setting" size="16px" />
                </div>
              </template>
            </van-popover>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="title2" class="tab2">
        <template #title>
          <van-icon class="iconfont" class-prefix="icon" name="hengxiangwenben" size="1.2rem"
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
            @open="onOpenNameDialog"
            :before-close="onCloseNameDialog"
          >
            <van-field
              clearable
              label=""
              placeholder="请输入姓名"
              v-model="inputName"
              v-show="tab2ContentTitleActive === 0"
            />
            <van-field
              clearable
              label=""
              placeholder="请输入口号"
              v-model="inputNameEn"
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
        <div class="sloganEffectBox" v-show="tab2ContentTitleActive === 1">
          <div
            :class="[sloganEffectItemActive == 1 ? 'sloganEffectActive1' : '']"
            @click="toggleSloganEffectItemActive(1)"
          ></div>
          <div
            :class="[sloganEffectItemActive == 2 ? 'sloganEffectActive2' : '']"
            @click="toggleSloganEffectItemActive(2)"
          ></div>
          <!-- <div
            :class="[sloganEffectItemActive == 3 ? 'sloganEffectActive3' : '']"
            @click="toggleSloganEffectItemActive(3)"
          ></div> -->
        </div>
        <div class="settingBox">
          <span @click="isShowNameInput = true">{{
            tab2ContentTitleActive ? template.name_en : template.name
          }}</span>
          <span>
            <van-popover
              :close-on-click-overlay="false"
              :close-on-click-action="false"
              v-model:show="showFamilyPopover"
              placement="top-end"
              class="familyPopover"
            >
              <van-tabs v-model:active="activeFont" color="#3286fe">
                <van-tab title="字体" title-class="familyTitle"
                  ><div
                    v-for="(item, index) in familyOptions"
                    :key="index"
                    role="menuitem"
                    class="van-popover__action"
                    style="height: 1.6rem; width: 10rem"
                    @click.stop="selectFontFamily(item.text, item.value)"
                  >
                    <div
                      :style="{ fontFamily: item.value }"
                      class="van-popover__action-text van-hairline--bottom"
                    >
                      {{ item.text }}
                    </div>
                  </div></van-tab
                >
                <!-- <van-tab title="英文" title-class="familyTitle"
                  ><div
                    v-for="(item, index) in englishFamilyOptions"
                    :key="index"
                    role="menuitem"
                    class="van-popover__action"
                    style="height: 1.6rem; width: 10rem"
                    @click.stop="selectFontFamily(item.text, item.value)"
                  >
                    <div
                      :style="{ fontFamily: item.value }"
                      class="van-popover__action-text van-hairline--bottom"
                    >
                      {{ item.text }}
                    </div>
                  </div></van-tab
                > -->
              </van-tabs>

              <template #reference>
                <span v-show="tab2ContentTitleActive === 0">{{ currentNameFamily }}</span>
                <span v-show="tab2ContentTitleActive === 1">{{ currentSloganFamily }}</span>

                <span><van-icon name="arrow-up" /></span>
              </template>
            </van-popover>
          </span>
          <span>
            <van-popover v-model:show="showImgPopover" placement="top-end">
              <div class="sliderBox2" v-show="tab2ContentTitleActive === 0">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrLogoValue }}</h5>
                  <van-slider v-model="lrLogoValue" :min="-375" :max="375" :button-size="18" />
                </div>
                <div>
                  <h5>上下: {{ udLogoValue }}</h5>
                  <van-slider v-model="udLogoValue" :min="-400" :max="400" :button-size="18" />
                </div>
              </div>
              <div class="sliderBox2" v-show="tab2ContentTitleActive === 1">
                <div>
                  <h5 style="margin-top: 0">左右: {{ lrSloganValue }}</h5>
                  <van-slider v-model="lrSloganValue" :min="-375" :max="375" :button-size="18" />
                </div>
                <div>
                  <h5>上下: {{ udSloganValue }}</h5>
                  <van-slider v-model="udSloganValue" :min="-400" :max="400" :button-size="18" />
                </div>
              </div>
              <template #reference>
                <van-icon name="setting" />
              </template>
            </van-popover>
          </span>
        </div>
      </van-tab>
      <van-tab title="title3" class="tab2" style="margin-bottom: 1rem">
        <template #title>
          <van-icon class="iconfont" class-prefix="icon" name="yanse" size="1.2rem"
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
              tab3ContentTitleActive == 3
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab3Title(3)"
            >图标</span
          >
          <!-- <span
            :class="[
              tab3ContentTitleActive == 2
                ? 'tabContentTitle activeTitle'
                : 'tabContentTitle noActiveTitle',
            ]"
            @click="toggleTab3Title(2)"
            >背景</span
          > -->
        </div>
        <div class="colorBox" v-show="tab3ContentTitleActive === 3">
          <div
            :class="[colorItemActive == key ? 'colorActive' : '']"
            @click="toggleColorItem(key)"
            v-for="(color, key) in colors"
            :key="key"
            :data-color="color"
            :style="{ background: color }"
          ></div>
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
        <color-picker
          v-show="tab3ContentTitleActive === 3"
          :value="currentImageColor"
          @change="changeImageColor"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import useCreateLogo from '@/hooks/useCreateLogo'
import store from '@/store'
import { TemplateProps } from '@/store/templates'
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { SVG } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.filter.js'
import { englishFontFamilyArr, fontFamilyArr, randomFamilyText } from '../constants/random.constant'
import ColorPicker from '@/components/ColorPicker.vue'
import PreviewDialog from '@/components/PreviewDialog.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import { getColor, getLayoutPropsByNameLength } from '@/helper'
import { previewPropsArr } from '@/constants/preview.constant'
import { Toast } from 'vant'
import cheerio from 'cheerio'
import useDriver from '@/hooks/useDriver'

export default defineComponent({
  name: 'Editor',
  components: {
    ColorPicker,
    PreviewDialog,
    HeaderNav,
  },
  setup() {
    const route = useRoute()
    const svgRef = ref<SVGElement | null>(null)
    let logoList = ref<TemplateProps[]>([])
    const currentId = route.params.id as string
    const marteralId = ref(parseInt(currentId, 0))
    const template = computed<TemplateProps>(() =>
      store.getters.getTemplateById(parseInt(currentId, 0))
    )

    //替换svg元素
    const replaceSvgArea = (newXml: string) => {
      const div = document.createElement('div')
      newXml = newXml.replace(/<!--\s*(.*)\s*-->/, '')
      newXml = newXml.replace(/<\?xml.*\?>/, '')
      newXml = newXml.trim()
      div.innerHTML = newXml
      const svgNode = svgRef.value?.childNodes[0]
      svgNode?.lastChild?.remove()
      svgNode?.appendChild(div.childNodes[0])
    }

    //吸取图标的颜色
    const colors = ref(getColor(template.value.svg))
    const isMove = ref(true) //是否需要移动logo和slogan
    const colorItemActive = ref(-1)
    const getActiveItemColor = () => {
      const activeColorItemEls = document.getElementsByClassName('colorActive')
      if (activeColorItemEls.length > 0) {
        return activeColorItemEls[0].getAttribute('data-color')
      }
    }
    const toggleColorItem = (key: number) => {
      colorItemActive.value = key
      nextTick(() => {
        currentImageColor.value = getActiveItemColor() || '#ffffff'
      })
    }
    const currentImageColor = ref('')
    const changeImageColor = (color: string) => {
      if (color === '') {
        color = '#ffffff'
      }
      currentImageColor.value = color
      const activeColorItemEls = document.getElementsByClassName('colorActive')
      if (activeColorItemEls.length > 0) {
        const activeItemColor = getActiveItemColor() || '#ffffff'
        const activeColorItemEl = activeColorItemEls[0] as HTMLElement
        activeColorItemEl.setAttribute('data-color', color)
        nextTick(() => {
          colors.value[colorItemActive.value] = color
          var regex = new RegExp(activeItemColor, 'g')
          const logoElement = document.getElementsByClassName('svg-logo0')
          const html = logoElement[0].outerHTML
          const newHtml = html.replace(regex, color)
          replaceSvgArea(newHtml)
          //logoElement[0].outerHTML = newHtml;
        })
      }
    }

    const createLogoLoading = ref(false)
    const active = ref(0)
    const activeFont = ref(0)
    const imageActive = ref(template.value.randomIndex)
    const tab2ContentTitleActive = ref(0)
    const showImgPopover = ref(false)
    const showFamilyPopover = ref(false)
    const isShowNameInput = ref(false)
    const initKeyValueArr = [110, 110, 160]
    const initLsValue = computed(() => initKeyValueArr[template.value.randomIndex || 0])
    const onClickTab = (index: number) => {
      if (index === 1) {
        isMove.value = true
      } else if (index === 0) {
        isMove.value = false
      }
    }
    const initValues = () => {
      lrImgValue.value = 0
      udImgValue.value = 0
      lsImgValue.value = initLsValue.value
      lrLogoValue.value = 0
      udLogoValue.value = 0
      lrSloganValue.value = 0
      udSloganValue.value = 0
    }
    const selectPostionImage = (index: number) => {
      imageActive.value = index
      template.value.randomIndex = index
      const svgChild = svgRef.value?.childNodes[0]
      svgRef.value?.removeChild(svgChild as Node)
      createLogoLoading.value = true
      initValues()

      setTimeout(() => {
        useCreateLogo(logoList.value, true, {
          randomIndex: index,
          randomTitleFamily: template.value.randomTitleFamily || '',
          randomSubTitleFamily: template.value.randomSubTitleFamily || '',
        })
        createLogoLoading.value = false
        replaceWhenLayoutChange()
        colorItemActive.value = -1
        colors.value = getColor(template.value.svg)
      }, 500)
    }
    logoList.value.push(template.value)
    const replaceWhenLayoutChange = () => {
      const $ = cheerio.load(template.value.svg, {
        xml: true,
      })
      const logoElement = document.getElementsByClassName('svg-logo0')
      const transformAttr = logoElement[0].getAttribute('transform')
      const { imageX, imageY } = getLayoutPropsByNameLength(
        template.value.len,
        template.value.randomIndex
      )
      // 169
      $('svg')
        .attr('width', initLsValue.value.toString())
        .attr('height', initLsValue.value.toString())
        .addClass('svg-logo0')
        .attr('transform', transformAttr)
        .attr('x', imageX.toString())
        .attr('y', imageY.toString())

      lrImgValue.value = imageX
      udImgValue.value = imageY

      replaceSvgArea($.html())
      //logoElement[0].outerHTML = $.html();
    }

    onMounted(async () => {
      nextTick(() => {
        var drawImg = SVG().addTo('.smallImg').size(20, 20)
        drawImg.image(template.value.materialPath).size(20, 20)
      })

      await useCreateLogo(logoList.value, false)
      replaceWhenLayoutChange()
      //replaceText(".svg-name0", "hyfx");
      const visted = sessionStorage.getItem('visted')
      if (!visted) {
        sessionStorage.setItem('visted', '1')
        //首次进入编辑页面，引导教学
        useDriver()
      }
    })
    // image slider滑动
    const lrImgValue = ref(0)
    const udImgValue = ref(0)
    const lsImgValue = ref(initLsValue.value)
    // logo slogan slider滑动
    const lrLogoValue = ref(0)
    const lrSloganValue = ref(0)
    const udLogoValue = ref(0)
    const udSloganValue = ref(0)
    const onSliderChange = (value: number, type: number) => {
      const draw = SVG('.svg-logo0')
      switch (type) {
        case 1:
          draw.move(value, udImgValue.value)
          break
        case 2:
          draw.move(lrImgValue.value, value)
          break
        case 3:
          draw.size(value, value)
          break
      }
    }
    watch(
      () => lrLogoValue.value,
      (newValue, oldValue) => {
        if (isMove.value) {
          const drawName = SVG('.svg-name0')
          drawName.dmove(newValue - oldValue, 0)
        }
      }
    )
    watch(
      () => udLogoValue.value,
      (newValue, oldValue) => {
        if (isMove.value) {
          const drawName = SVG('.svg-name0')
          drawName.dmove(0, newValue - oldValue)
        }
      }
    )
    watch(
      () => lrSloganValue.value,
      (newValue, oldValue) => {
        if (isMove.value) {
          const drawName = SVG('.svg-slogan0')
          drawName.dmove(newValue - oldValue, 0)
        }
      }
    )
    watch(
      () => udSloganValue.value,
      (newValue, oldValue) => {
        if (isMove.value) {
          const drawName = SVG('.svg-slogan0')
          drawName.dmove(0, newValue - oldValue)
        }
      }
    )
    // tab2的逻辑
    const toggleTab2Title = (value: number) => {
      tab2ContentTitleActive.value = value
    }
    const resetSvg = () => {
      initValues()
      const { imageX, imageY } = getLayoutPropsByNameLength(
        template.value.len,
        template.value.randomIndex
      )
      lrImgValue.value = imageX
      udImgValue.value = imageY
      onSliderChange(imageX, 1)
      onSliderChange(imageY, 2)
      onSliderChange(initLsValue.value, 3)
    }
    // tab2弹窗输入的name
    const inputName = ref(template.value.name)
    const inputNameEn = ref(template.value.name_en)
    const onOpenNameDialog = () => {
      inputName.value = template.value.name
      inputNameEn.value = template.value.name_en
    }
    const onCloseNameDialog = (action: string) =>
      new Promise(resolve => {
        if (action === 'cancel' || !action) {
          resolve(true)
          return true
        }
        if (inputName.value.length === 0 || inputNameEn.value.length === 0) {
          Toast.fail('不能为空')
          resolve(false)
          return false
        }
        setTimeout(() => {
          //判断是名称还是口号的修改
          let drawText
          if (tab2ContentTitleActive.value === 0) {
            drawText = SVG('.svg-name0')
            drawText.node.textContent = inputName.value
            template.value.name = inputName.value
            // 翻译
            store
              .dispatch('translate', {
                data: { keyword: inputName.value },
              })
              .then(() => {
                drawText = SVG('.svg-slogan0')
                const cNameEn = store.getters.getCurrentNameEn
                drawText.node.textContent = cNameEn
                template.value.name_en = cNameEn
              })
          } else {
            drawText = SVG('.svg-slogan0')
            drawText.node.textContent = inputNameEn.value
            template.value.name_en = inputNameEn.value
          }
          resolve(true)
        }, 1000)
      })
    const familyOptions = ref(fontFamilyArr)
    const englishFamilyOptions = ref(englishFontFamilyArr)
    const selectedFamily = ref('')
    const selectFontFamily = (text: string, family: string) => {
      showFamilyPopover.value = false
      if (tab2ContentTitleActive.value === 0) {
        SVG('.svg-name0').attr('font-family', family)
        currentNameFamily.value = text
        //replaceText(".svg-name0", family);
      } else {
        SVG('.svg-slogan0').attr('font-family', family)
        currentSloganFamily.value = text
        //replaceText(".svg-slogan0", family);
      }
    }
    const currentNameFamily = ref(randomFamilyText[template.value.randomIndex])
    const currentSloganFamily = ref(randomFamilyText[template.value.randomIndex])

    //tab3 颜色
    const toggleTab3Title = (value: number) => {
      tab3ContentTitleActive.value = value
    }
    const tab3ContentTitleActive = ref(0)
    const currentNameColor = ref('')
    const changeNameColor = (color: string) => {
      if (color === '') {
        color = '#000000'
      }
      currentNameColor.value = color
      SVG('.svg-name0').attr('fill', color)
    }

    const currentSloganColor = ref('')
    const changeSloganColor = (color: string) => {
      if (color === '') {
        color = '#000000'
      }
      currentSloganColor.value = color
      SVG('.svg-slogan0').attr('fill', color)
    }
    //背景色
    const currentBackColor = ref('#ffffff')
    const changeBackColor = (color: string) => {
      if (color === '') {
        color = '#ffffff'
      }
      currentBackColor.value = color
    }

    // 预览
    const showPreview = ref(false)
    const previewData = ref<any[]>([])

    const openPreviewDialog = () => {
      let svgObj = SVG('.svg0')
      const svg = svgObj.node.outerHTML
      //替换掉svgjs:data，否则图片加载不出
      previewData.value = []
      previewPropsArr.forEach(item => {
        const $ = cheerio.load(svg, { xml: true })
        const img_w = item.w
        const img_h = item.h
        $('svg').removeClass('svg0')
        $('svg svg svg').removeClass('svg-logo0')
        $('svg svg g .svg-name0').removeClass('svg-name0')
        $('svg svg g .svg-slogan0').removeClass('svg-slogan0')
        const left = item.x
        const top = item.y
        const rotate = `rotate(${item.r}deg)`

        $('svg').css('position', 'absolute')
        $('svg').css('width', img_w.toString() + 'px')
        $('svg').css('height', img_h.toString() + 'px')
        $('svg').css('left', left.toString() + 'px')
        $('svg').css('top', top.toString() + 'px')
        $('svg').css('transform', rotate)

        previewData.value.push({
          url: item.url,
          svg: $.html(),
        })
      })
      showPreview.value = true
    }
    const closePreviewDialog = () => {
      showPreview.value = false
    }

    //slogan 滤镜效果
    const sloganEffectItemActive = ref(0)

    const toggleSloganEffectItemActive = (key: number) => {
      sloganEffectItemActive.value = key
      if (key === 3) {
        SVG('.svg-slogan0').unfilter()
        SVG('.svg-slogan0').filterWith(add => {
          if (currentSloganColor.value === '#ffffff') {
            add.flood('#000000', 1)
          } else {
            add.flood(SVG('.svg-slogan0').attr('fill'), 1)
          }
          add.composite('SourceGraphic', '', 'over')
          add.attr('width', 1).attr('height', 1).attr('x', 0).attr('y', 0)
        })
        changeSloganColor('#ffffff')
      } else if (key === 1) {
        SVG('.svg-slogan0').unfilter()
        changeSloganColor('#000000')
      } else if (key === 2) {
        // 字体下面加个下划线
        SVG('.svg-slogan0').unfilter()
        SVG('.svg-slogan0').filterWith(add => {
          if (currentSloganColor.value === '#ffffff') {
            add.flood('#000000', 1)
          } else {
            add.flood(SVG('.svg-slogan0').attr('fill'), 1)
          }
          add.composite('SourceGraphic', '', 'over')
          add.attr('width', 1).attr('height', 1).attr('x', 0).attr('y', 0)
        })
        changeSloganColor('#ffffff')
      }
    }

    return {
      logoList,
      active,
      activeFont,
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
      onOpenNameDialog,
      onCloseNameDialog,
      familyOptions,
      englishFamilyOptions,
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
      openPreviewDialog,
      previewData,
      initLsValue,
      marteralId,
      onClickTab,
      inputName,
      inputNameEn,
      colors,
      toggleColorItem,
      colorItemActive,
      changeImageColor,
      currentImageColor,
      sloganEffectItemActive,
      toggleSloganEffectItemActive,
    }
  },
})
</script>

<style scoped lang="scss">
.colorBox {
  display: flex;
  margin-bottom: 0.8rem;
  align-items: center;
  div {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    margin: 0 2px;
  }
  .colorActive {
    border: 1px solid red;
  }
}
.sloganEffectBox {
  display: flex;
  margin-bottom: 0.8rem;
  align-items: center;
  > div:first-child {
    background-image: url('../assets/img/slogan1.png');
    background-size: 100% 100%;
  }
  > div:nth-child(2) {
    background-image: url('../assets/img/slogan2.png');
    background-size: 100% 100%;
  }
  > div:nth-child(3) {
    background-image: url('../assets/img/slogan3.png');
    background-size: 100% 100%;
  }
  div {
    width: 40px;
    height: 30px;
    border-radius: 5px;
    margin: 0 5px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .sloganEffectActive1 {
    background-image: url('../assets/img/slogan1_active.jpg') !important;
    background-size: 100% 100%;
  }
  .sloganEffectActive2 {
    background-image: url('../assets/img/slogan2_active.jpg') !important;
    background-size: 100% 100%;
  }
  .sloganEffectActive3 {
    background-image: url('../assets/img/slogan3_active.png') !important;
    background-size: 100% 100%;
  }
}
.lego-color-picker {
  height: 4rem;
}
.smallImg {
  background: #ffffff;
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  padding: 0.1rem;
}
.circleBox {
  background: #ffffff;
  width: 1.6rem;
  height: 1.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0.1rem;
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
  width: 7rem;
}
.sliderBox2 {
  padding: 1rem 1rem;
  h5 {
    margin-bottom: 0.2rem;
  }
  // height: 5rem;
  width: 8rem;
}
.familyPopover {
  .van-tabs {
    /deep/ .van-tabs__content {
      height: 100px !important;
      overflow: auto;
    }
    /deep/ .van-tabs__wrap {
      margin-bottom: 0.5rem;
    }
  }
}
@keyframes fade {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  25% {
    opacity: 0.25;
    transform: scale(0.25);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  75% {
    opacity: 0.25;
    transform: scale(1);
  }
  100% {
    opacity: 0;
  }
}
.editor-container {
  background: #f8f8f8;
  min-height: 100vh;
  position: relative;
  .editorTips {
    text-align: center;
    background: #3286fe;
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
      // left: calc(50vw - 1rem - 20px);
      // top: 50%;
      margin: 0 auto;
      margin-top: 30%;
      width: 25px;
      height: 25px;
      background: radial-gradient(#afe8ff, #3286fe);
      border-radius: 100%;
      animation: fade ease-in 0.75s infinite;
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
      border-radius: 3px;
      .imageBox {
        display: flex;
        align-items: center;
        box-shadow: 0 2px 12px #3232331f;
        .van-image {
          background: #fff;
          width: 50%;
          /deep/ img {
            width: 100%;
            height: 100%;
          }
        }
        .leftImage {
          border-right: 1px solid #d9d9d9;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
        .centerImage {
          border-right: 1px solid #d9d9d9;
        }
        > .van-image:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
      }
    }
  }
}
</style>
