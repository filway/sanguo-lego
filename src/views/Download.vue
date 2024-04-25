<template>
  <div class="download-container">
    <header-nav :title="'logo下载'" @back="$router.back(-1)" />
    <van-row class="content" :style="{ backgroundColor: bgColor }">
      <van-col span="24" v-if="!isSvgCode">
        <div class="logo-box" v-for="(logo, key) in logoList" :key="key">
          <svg
            :style="{ backgroundColor: '#ffffff' }"
            baseProfile="full"
            version="1.1"
            :class="'svg' + key"
            viewBox="0 0 686 448"
            xmlns="http://www.w3.org/2000/svg"
          />
        </div>
      </van-col>
      <van-col span="24" v-else>
        <div class="logo-box" ref="logoRef" id="logoBox"></div>
      </van-col>
    </van-row>
    <div class="buttonBox">
      <van-button
        color="linear-gradient(to right, rgb(118,178,234) , rgb(64,148,225))"
        size="large"
        type="primary"
        @click="alertTips"
      >
        立即下载
      </van-button>
    </div>
    <div class="imageBox">
      <img src="../assets/img/bg2.jpeg" alt="" />
      <div class="textBox">
        <h2>想获得专有LOGO来商用？</h2>
        <h2>交给我们为您量身定制LOGO</h2>
      </div>
      <button @click="isShowWxDialog = true">开始定制</button>
    </div>
    <div class="qaBox">
      <h5>FQA常见问题</h5>
      <div>
        <p class="qustion">问：什么是源文件</p>
        <p class="anwser">
          答：矢量图/源文件，用于编辑修改、印刷户外大型广告招聘等用途可无限高清放大
        </p>
      </div>
      <div>
        <p class="qustion">问：我生成的LOGO能申请商标注册吗？</p>
        <p class="anwser">
          答：文字部分可以申请商标注册，按文字商标进行文本核准，图形部分，无论是否标注【可商用】都不能申请商标，因为不符合图形商标的独有性原则，要申请商标需要进行定制化设计
        </p>
      </div>
      <div>
        <p class="qustion">问：我生成的LOGO怎么调整图片尺寸？</p>
        <p class="anwser">答：需要下载源文件，源文件可以任意调整图片的尺寸，获得高清的图片</p>
      </div>
      <div>
        <p class="qustion">问：为什么下载的源文件打不开？</p>
        <p class="anwser">答：源文件需要使用专业的设计软件才可以打开，如PS、AI、CDR等</p>
      </div>
    </div>
    <van-dialog
      v-model:show="isShowInfoInput"
      class="infoDialog"
      show-cancel-button
      width="95%"
      title="信息填写"
      :before-close="onCloseInfoDialog"
      @open="openInfoDialog"
    >
      <!-- <p>
        因源文件较大，我们将通过邮箱的方式发送给您，如邮箱接收不便，留下联系方式后可联系您的专属客服获取源文件
      </p> -->
      <van-field clearable label="" placeholder="请输入您的手机" v-model="info.phone" type="tel" />
      <!-- <van-field
        clearable
        label=""
        placeholder="请输入您的邮箱"
        v-model="info.email"
        type="email"
      /> -->
    </van-dialog>
    <van-dialog
      v-model:show="isShowWxDialog"
      class="wxDialog"
      show-cancel-button
      cancel-button-text="点击关闭"
      confirm-button-text="复制微信号"
      :before-close="copyWx"
      width="90%"
    >
      <div class="image">
        <img src="../assets/img/cs.png" alt="" />
      </div>
      <div class="text">
        <h4>添加客服微信号，联系您的专属客服可定制、升级logo</h4>
        <div>微信号: {{ wx }}</div>
      </div>
    </van-dialog>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import HeaderNav from '@/components/HeaderNav.vue'
import { TemplateProps } from '@/store/templates'
import { useRoute } from 'vue-router'
import useCreateLogo from '@/hooks/useCreateLogo'
import { useStore } from 'vuex'
import { Dialog, Toast } from 'vant'
import axios, { AxiosResponse } from 'axios'
import { copyToClipboard, svgToBase64, findFontExt } from '@/helper'
import { SVG } from '@svgdotjs/svg.js'
import { base64Data, RespData } from '@/store/respTypes'

type infoType = {
  phone: string
  email: string
}

export default defineComponent({
  name: 'Download',
  components: {
    HeaderNav,
  },
  setup() {
    const svgCode = localStorage.getItem('downloadsvg') as string
    const isSvgCode = svgCode?.length > 1
    const logoRef = ref<HTMLElement>()
    const route = useRoute()
    const store = useStore()
    let logoList = ref<TemplateProps[]>([])
    const currentId = route.params.id as string
    const bgColor = route.params.bgColor as string
    const template = computed<TemplateProps>(() =>
      store.getters.getTemplateById(parseInt(currentId, 0))
    )
    logoList.value.push(template.value)
    const isShowInfoInput = ref(false)
    const info = ref<infoType>({ phone: '', email: '' })
    const alertTips = () => {
      Dialog.confirm({
        title: '小Ku提示',
        message: '确定选择此方案后，Logo将不可编辑，不可修改，确定要下载当前Logo吗?',
      })
        .then(() => {
          isShowInfoInput.value = true
        })
        .catch(() => {
          console.log('cancel')
        })
    }

    // tab2弹窗输入的name
    const onCloseInfoDialog = (action: string) =>
      new Promise(resolve => {
        if (action === 'cancel' || !action) {
          resolve(true)
        } else {
          // 校验phone
          const phonePattern = /^1[3456789]\d{9}$/
          if (!phonePattern.test(info.value.phone)) {
            Toast.fail('请输入正确的手机号码')
            resolve(false)
          } else {
            setTimeout(() => {
              /**var p2 = /svgjs:data\s*?=\s*?([‘"])[\s\S]*?\1/g
               * 参数：mater_id（必填）  sn（必填） email(必填)  mobile(必填)  base64（必填） svg（必填）
               */
              let svgObj = SVG('.svg0')
              svgObj.node.removeAttribute('xmlns:svgjs')
              svgObj.node.removeAttribute('svgjs:data')
              const nameFamily = SVG('.svg-name0').attr('font-family')
              const sloganFamily = SVG('.svg-slogan0').attr('font-family')
              const ext = findFontExt(nameFamily)
              const ext2 = findFontExt(sloganFamily)
              if (ext && ext2) {
                axios
                  .post('/getFontBase64', {
                    logoFont: `${nameFamily}${ext}`,
                    sloganFont: `${sloganFamily}${ext2}`,
                    logo: template.value.name,
                    slogan: template.value.name_en,
                  })
                  .then((resp: AxiosResponse<RespData<base64Data>>) => {
                    const respData = resp.data.data

                    const logoBase64 = respData.logo
                    const sloganBase64 = respData.slogan
                    //data:application/octet-stream
                    svgObj
                      .defs()
                      .style()
                      .font(
                        nameFamily,
                        `url(data:application/octet-stream;charset=utf-8;base64,${logoBase64})`
                      )
                      .font(
                        sloganFamily,
                        `url(data:application/octet-stream;charset=utf-8;base64,${sloganBase64})`
                      )

                    const svg1 = svgObj.svg()
                    //替换掉svgjs:data，否则图片加载不出
                    const p2 = /svgjs:data\s*?=\s*?([‘"])[\s\S]*?\1/g
                    const svg = svg1.replace(p2, '')
                    const base64 = svgToBase64(svg)
                    const img = new Image()
                    img.src = base64
                    img.crossOrigin = 'anonymous'

                    let fstrImage
                    img.onerror = e => {
                      console.error(e)
                    }
                    img.onload = function () {
                      const canvas = document.createElement('canvas')
                      canvas.width = 1024
                      canvas.height = 1024
                      const ctx = canvas.getContext('2d')
                      const trueImgHeight = (1024 * img.height) / img.width
                      ctx?.drawImage(img, 0, (1024 - trueImgHeight) / 2, 1024, trueImgHeight)
                      fstrImage = canvas.toDataURL()
                      //console.log(fstrImage);

                      axios
                        .post('/downsvg', {
                          mater_id: currentId,
                          sn: localStorage.getItem('sn'),
                          mobile: info.value.phone,
                          email: info.value.email,
                          base64: fstrImage,
                          svg: svg,
                        })
                        .then(resp => {
                          //console.log(resp);
                          resolve(true)
                          Dialog.confirm({
                            title: '小Ku提示',
                            message:
                              '您的源文件已成功生成，请直接联系客服领取',
                          })
                            .then(() => {
                              console.log('confirm2')
                            })
                            .catch(() => {
                              console.log('cancel2')
                            })
                        })
                        .catch(e => {
                          console.log(e)
                          resolve(false)
                        })
                    }
                  })
                  .catch(e => {
                    console.log(e)
                    Toast.fail('未知错误')
                    resolve(false)
                  })
              } else {
                Toast.fail('字体文件找不到')
                resolve(false)
              }
            }, 1000)
          }
        }
      })
    const openInfoDialog = () => {
      info.value.phone = ''
      info.value.email = ''
    }
    // wx弹窗
    const isShowWxDialog = ref(false)
    const wx = sessionStorage.getItem('wx') || ''
    onMounted(async () => {
      if (isSvgCode) {
        const logoBoxDom = document.getElementById('logoBox')
        if (logoBoxDom) {
          logoBoxDom.innerHTML = svgCode
          //给svg元素添加背景颜色
          SVG('.svg0').css('background', bgColor)
        }
      } else {
        await useCreateLogo(logoList.value, false)
      }
    })
    const copyWx = (action: string) => {
      if (action === 'confirm') {
        copyToClipboard(wx)
        Toast.success('微信号已复制')
        return false
      } else {
        return true
      }
    }
    return {
      logoList,
      bgColor,
      alertTips,
      isShowInfoInput,
      onCloseInfoDialog,
      info,
      openInfoDialog,
      isSvgCode,
      svgCode,
      logoRef,
      isShowWxDialog,
      wx,
      copyWx,
    }
  },
})
</script>
<style lang="scss" scoped>
.download-container {
  background: #eee;
  min-height: 100vh;
  .content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    height: 14rem;
    width: calc(100vw - 2rem);
    margin-left: 1rem;
    border-radius: 5px;
    .logo-box {
      height: 100%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .buttonBox {
    padding: 1rem 1rem;
    .van-button {
      border-radius: 5px;
      height: 40px;
    }
  }
  .infoDialog {
    p {
      font-weight: 350;
      font-size: 13px;
      padding: 1rem 0.5rem;
    }
  }
  .wxDialog {
    .image {
      width: 100%;
      height: 13rem;
      background: pink;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 1rem;
      h4 {
        letter-spacing: 2px;
        font-size: 16px;
        margin: 0 0 0.5rem;
      }
      div {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.719);
      }
    }
  }
  .imageBox {
    position: relative;
    height: 200px;
    img {
      height: 200px;
      width: 100vw;
    }
    .textBox {
      position: absolute;
      top: 2rem;
      left: 1rem;
      h2 {
        margin: 0;
        color: #ffffff;
      }
    }
    button {
      position: absolute;
      bottom: 1.5rem;
      width: 10rem;
      left: calc((100vw - 10rem) / 2);
      border-radius: 20px;
      padding: 0.4rem 0;
      color: #ffffff;
      background: #6c7d8d;
      border: none;
      font-size: 14px;
    }
  }
  .qaBox {
    background: #ffffff;
    padding: 1rem;
    h5 {
      margin: 0;
    }
    p {
      margin: 0.8rem 0;
      font-weight: 350;
      color: #333;
    }
    .qustion {
      font-size: 14px;
    }
    .anwser {
      font-size: 10px;
    }
  }
}
</style>
