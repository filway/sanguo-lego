/**
 * @description: 下载素材，支持svg,png,jpg
 * @author: filway
 */
import { materialDownLoad, svgToBase64 } from "@/helper";
import { downloadUrlData } from "@/store/respTypes";
import { SVG } from "@svgdotjs/svg.js";
import axios, { AxiosResponse } from "axios";

export const downloadSVG = (index: number): void => {
  const svg = SVG(`.svg${index}`);
  const blob = new Blob([svg.svg()], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = window.URL.createObjectURL(blob);

  materialDownLoad(url, "svg");
};
export const downloadImage = (index: number) => {
  console.log(index);
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
    axios
      .post("/downsvg", { base64: fstrImage })
      .then((resp: AxiosResponse<downloadUrlData>) => {
        return resp.data;
      })
      .catch((e: any) => {
        console.error(e);
      });
    //materialDownLoad(fstrImage, type);
  };
};
