<template>
  <canvas
    width="600"
    height="600"
    id="canvas"
    style="border: 1px solid #ccc"
  ></canvas>
  <van-button type="primary" size="small" @click="addText">Add Text</van-button>
  <van-button type="danger" size="small" @click="toSVG">To SVG</van-button>
  <van-button type="warning" size="small" @click="toImage('png')"
    >To PNG</van-button
  >
  <van-button type="success" size="small" @click="toImage('jpg')"
    >To JPG</van-button
  >
  <van-button type="primary" size="small" @click="setFontSize">Test</van-button>
  <van-field
    v-model="result"
    is-link
    readonly
    label="字体"
    placeholder="切换字体"
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      :columns="columns"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { fabric } from "fabric";
import { TemplateProps } from "@/store/templates";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/store";
import { enableDownloadType } from "@/defaultProps";
import FontFaceObserver from "fontfaceobserver";
import { fontFamilyArr } from "@/constants/random.constant";
export default defineComponent({
  name: "Test-Editor",
  setup() {
    const store = useStore<GlobalDataProps>();
    const logoList = computed(() => store.state.templates.data);
    const { svg, name, name_en, rgb } = logoList.value[7];
    const familyOptions = ref(fontFamilyArr);
    console.log(familyOptions);

    const columns = ["hkht", "kls", "hyfx", "hyhz", "zzgf", "zktzbqxs", "rzgf"];
    const result = ref("");
    const showPicker = ref(false);

    const onConfirm = (value: string) => {
      result.value = value;
      showPicker.value = false;
      loadAndUse(value);
    };

    let canvas: fabric.Canvas;

    var deleteIcon =
      "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

    var img = document.createElement("img");
    img.src = deleteIcon;

    const init = () => {
      canvas = new fabric.Canvas("canvas"); // 实例化fabric，并绑定到canvas元素上

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = "blue";
      fabric.Object.prototype.cornerStyle = "circle";

      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
      });

      function deleteObject(eventData: any, transform: any) {
        var target = transform.target;
        var canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();
        return true;
      }

      function renderIcon(
        ctx: any,
        left: any,
        top: any,
        styleOverride: any,
        fabricObject: any
      ) {
        var size = 12;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      fabric.loadSVGFromString(svg, function (objects: any, options: any) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
      });
    };

    const addText = () => {
      let text = new fabric.Text("万州烤鱼", {
        fill: `#ff9900`,
        fontFamily: "zzgf",
        fontSize: 30,
      });
      canvas.add(text);
      canvas.renderAll();
    };

    const toSVG = () => {
      const svg = canvas.toSVG();
      const a = document.createElement("a");
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const blobURL = URL.createObjectURL(blob);
      a.href = blobURL;
      a.download = "eraser_example.svg";
      a.click();
      URL.revokeObjectURL(blobURL);
    };

    const toImage = (ext: enableDownloadType) => {
      const base64 = canvas.toDataURL({
        format: ext,
        enableRetinaScaling: true,
      });
      const link = document.createElement("a");
      link.href = base64;
      link.download = `eraser_example.${ext}`;
      link.click();
    };

    const loadAndUse = (font: string) => {
      var myfont = new FontFaceObserver(font);
      myfont
        .load()
        .then(function () {
          // when font is loaded, use it.
          let textObj = canvas.getActiveObject() as fabric.Text;
          textObj.set("fontFamily", font);
          canvas.requestRenderAll();
        })
        .catch(function (e: any) {
          console.log(e);
          alert("font loading failed " + font);
        });
    };

    const setFontSize = () => {
      let textObj = canvas.getActiveObject() as fabric.Text;
      console.log(textObj);
    };

    onMounted(() => {
      init();
    });

    return {
      addText,
      toSVG,
      toImage,
      result,
      columns,
      onConfirm,
      showPicker,
      setFontSize,
    };
  },
});
</script>
