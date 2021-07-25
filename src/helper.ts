import { SVGTypeMapping } from "@svgdotjs/svg.js";
import layoutProps, {
  allFamily,
  randomI1,
  randomI2,
  randomIx,
  randomIy,
} from "./constants/random.constant";
import {
  enableDownloadType,
  enableImageDownloadType,
  familyExts,
  logoLayoutPropsType,
  previewPropsType,
} from "./defaultProps";
import mock from "mockjs";

export const materialDownLoad = (
  src: string,
  ext: enableDownloadType | enableImageDownloadType
): void => {
  const aLink = document.createElement("a");
  aLink.href = src;
  aLink.download = "test." + ext;
  if (ext === "svg") {
    aLink.dataset.downloadurl = [
      "image/svg+xml;charset=utf-8",
      aLink.download,
      aLink.href,
    ].join(":");
  }
  aLink.style.display = "none";
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
  setTimeout(function () {
    URL.revokeObjectURL(aLink.href);
  }, 1500);
};
// svg节点转base64
export const svgToBase64 = (svg: string): string => {
  const div = document.createElement("div");
  div.innerHTML = svg;
  const s = new XMLSerializer().serializeToString(
    div.firstElementChild as HTMLElement
  );
  const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(s))
  )}`;
  return ImgBase64;
};

//这儿使用base64图片也是可以合成的，但用get_file_content返回的svg demo无法合成，使用在线的svg地址也无法合成
export const draw = (
  fn: CallableFunction,
  data: string[],
  props: previewPropsType
): void => {
  const c = document.createElement("canvas"),
    ctx = c.getContext("2d"),
    len = data.length;
  c.width = 800;
  c.height = 800 / 1.5; //除1.5是由于背景图长和宽的比例是1.5
  if (ctx) {
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.fill();

    const drawing = (n: number) => {
      if (n < len) {
        const img = new Image();
        img.crossOrigin = "Anonymous"; //解决跨域

        img.src = data[n];
        img.onload = function () {
          if (n == 1) {
            const { x, y, w, h } = props;
            ctx.drawImage(img, x, y, w, h); //参数表示：第一个参数绘制的img图片  第二个参数和第三个参数分别表示绘制的图片距离背景图片左上角的X轴，Y轴，第四个参数和第五个参数表示绘制的图片的大小
          } else {
            ctx.drawImage(img, 0, 0, c.width, c.height);
          }

          drawing(n + 1); //递归
        };
      } else {
        //保存生成作品图片
        c.toDataURL();
        fn(c.toDataURL());
        c.remove();
      }
    };
    drawing(0);
  }
};

export const copyToClipboard = (text: string) => {
  // 创建文本元素，赋值
  const textarea = document.createElement("textarea");
  textarea.value = text;
  // 添加样式，隐藏
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  // 添加到body 选中文本
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch (e) {
    console.warn("copy failed", e);
  } finally {
    document.body.removeChild(textarea);
  }
};

/**
 * const style = draw.style();
    style.font('"hyfx"', 'url("https://oss.filway.cn/hyfx.TTF")');
    style.remove();
    draw.style().font('"hyfx2"', 'url("https://oss.filway.cn/hyfx.TTF")');
 */
export const findFontExt = (family: string): string => {
  return allFamily[family as keyof familyExts];
};
type SvgType = SVGTypeMapping<SVGSVGElement>;
export const addSvgFont = (family: string, draw: SvgType): SvgType => {
  console.log(draw.svg());

  const style = draw.style();
  const ext = findFontExt(family);
  style.font(family, `url("https://oss.filway.cn/fonts/${family}${ext}")`);
  console.log(draw.svg());
  return draw;
};

//根据logo名称的长度，获取合理的布局属性
export const getLayoutPropsByNameLength = (
  length: number,
  index: number
): logoLayoutPropsType => {
  const returnProps: logoLayoutPropsType = {
    imageX: randomI1[index],
    imageY: randomI2[index],
    nameDX: randomIx[index],
    nameDY: randomIy[index],
    nameEnDX: randomIx[index],
    nameEnDY: randomIy[index] + 40,
    nameEnFontSize: 25,
    nameFontSize: 75,
  };
  if (length !== 4) {
    if (length > 14) {
      length = 14;
    }
    returnProps.imageX = layoutProps[length].randomI1[index];
    returnProps.imageY = layoutProps[length].randomI2[index];
    returnProps.nameDX = layoutProps[length].randomIx[index];
    returnProps.nameDY = layoutProps[length].randomIy[index];
    returnProps.nameEnDX = layoutProps[length].randomIx[index];
    returnProps.nameEnDY = layoutProps[length].randomIy[index] + 40;
    returnProps.nameFontSize = layoutProps[length].randomNameFontSize;
    returnProps.nameEnFontSize = layoutProps[length].randomNameEnFontSize;
  }

  return returnProps;
};

export const getRandomName = (length: number): string => {
  const random = mock.Random;
  return random.ctitle(length, length);
};
export const getRandomTitle = (): string => {
  return mock.Random.title(1, 2);
};
