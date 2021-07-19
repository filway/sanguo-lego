import {
  enableDownloadType,
  enableImageDownloadType,
  previewPropsType,
} from "./defaultProps";

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
