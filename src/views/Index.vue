<template>
  <div class="homepage-container" :style="{ background: (logoList.length ? '#eee' : '#fff')}">
    <div v-for="(logo,key) in logoList" :key="key">
       <router-link :to="{ name: 'editor', params: { id: logo.materialId }}">
         <div class="card-box">
          <div class="logo-box">
             <svg
              baseProfile="full"
              version="1.1"
              :class="'svg'+key"
              viewBox="0 0 500 400"
              xmlns="http://www.w3.org/2000/svg"
            />
          </div>
          <div class="text-box">
            点击选择此方案
          </div>
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
import { SVG } from "@svgdotjs/svg.js";
import { computed, defineComponent, onMounted } from 'vue';
import { GlobalDataProps } from '../store/index';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { TemplateProps } from '@/store/templates';

export default defineComponent({
  name: 'Index',
  setup() {
    const route = useRoute();  
    const store = useStore<GlobalDataProps>();
    const logoList = computed(() => store.state.templates.data);
    const initData = async(data: TemplateProps[]) => {
        const randomFamily = [
          "huakangbiaotisong",
          "huakangsong",
          "huakangbuding",
          "benmojianzi",
          'benmochenmo',
          'jingdianyuan',
          'jingdianzhong'
        ];
        const randomI1 = [0,0,160]
        const randomI2 = [120,120,80]
        const randomIx = [200,200,110]
        const randomIy = [200,200,320]
        data.forEach((item, key) => {
          let rgb = `#${item.rgb}`;
          let randonI = Math.floor(Math.random()*Math.floor(3)) //2//
          if(item.name.length > 5){
            randonI = 2;
          }
          let draw = SVG();
          draw.addTo(`.svg${key}`)
          var groupImage = draw.group().fill("dodgerblue").attr({
            transform: "matrix(1,0,0,1,"+randomI1[randonI]+","+randomI2[randonI]+") ",
          });
          var group = draw.group().fill("dodgerblue").attr({
            transform: "matrix(1,0,0,1,160,40) ",
          });
          let img = draw.image(item.materialPath);
          //debugger
          var title = draw
            .plain(item.name)
            .font({ size: 48, family: randomFamily[Math.floor(Math.random()*Math.floor(7))], weight: "bolder" })
            .attr({
              fill: rgb,//mapColor[item.colorSystemId],
              //fill: "#000",
              //dx: "110",
              // dy: "320",
              dx: randomIx[randonI],
              dy: randomIy[randonI],
              "text-anchor": "middle",
            });
          var subTitle = draw.plain(item.name_en).font({ size: 24, family: randomFamily[Math.floor(Math.random()*Math.floor(7))], weight: "bolder" })
          .attr({
            fill: rgb,//mapColor[item.colorSystemId], //"#888",
            //dx: "110",
            //dy: "360",
            dx: randomIx[randonI],
            dy: randomIy[randonI]+40,
            "text-anchor": "middle",
          });
          groupImage.add(img);
          group.add(title);
          group.add(subTitle);
          img.size(220, 220);
        })
    }
    onMounted( async() => {
      let { sn } = route.query;
      //获取logo list
      await store.dispatch('fetchTemplates', { searchParams: { sn: sn || '' }});
      await initData(logoList.value);
    })
    return {
      logoList,
    }
  }
});
</script>

<style scoped lang="scss">
.homepage-container {
  min-height: 100vh;
  padding: .5rem 1rem;
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
      padding: .8rem;
      text-align: center;
      color: #ccc;
      font-size: 14px;
    }
  }
}
</style>
