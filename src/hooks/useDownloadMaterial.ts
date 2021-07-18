/**
 * @description: 下载素材，支持svg,png,jpg
 * @author: filway
 */
import { enableImageDownloadType } from "@/defaultProps";
import { materialDownLoad, svgToBase64 } from "@/helper";
import { SVG } from "@svgdotjs/svg.js";

export const downloadSVG = (index: number): void => {
  const svg = SVG(`.svg${index}`);
  const blob = new Blob([svg.svg()], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = window.URL.createObjectURL(blob);

  materialDownLoad(url, "svg");
};
export const downloadImage = (
  index: number,
  type: enableImageDownloadType
): void => {
  console.log(index, type);
  const img = new Image();
  img.src = svgToBase64(SVG(`.svg${index}`).node.innerHTML);
  img.crossOrigin = "anonymous";

  let fstrImage;
  img.onload = function () {
    console.log(3333);
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    fstrImage = canvas.toDataURL();
    materialDownLoad(fstrImage, type);
  };
};
