<template>
  <div class="editor-container">
    <van-row class="backWrapper">
      <van-col span="2">
        <router-link to>
          <van-icon @click="$router.back(-1)" name="arrow-left" size="1.3rem"/>
        </router-link>
      </van-col>
      <van-col span="20" class="editorTitle">logo在线编辑</van-col>
    </van-row>
    <van-row>
      <van-col span="24" class="editorTips">
        编辑好后点击下载即可
      </van-col>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Editor',
});
</script>

<style>
.editor-container {
  background: #eee;
  min-height: 100vh;
}
.backWrapper {
  align-items: center;
  padding: .8rem 1rem;
  background: #fff;
}
.editorTitle {
  text-align: center;
  font-weight: 300;
}
.editorTips {
  text-align: center;
  background: lightskyblue;
  color: #fff;
  padding: .55rem 1rem;
  font-size: 12px;
  font-weight: 350;
}
.iconsWrapper{
  padding: 2rem;
}
.iconsWrapper .icon-left {
  text-align: right;
}
.iconsWrapper .icon-center {
  text-align: center;
}
</style>
