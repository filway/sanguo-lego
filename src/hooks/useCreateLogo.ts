/**
 * @description: 循环生成svg logo
 * @author: filway
 */

import { svgToBase64 } from "@/helper";
import store from "@/store";
import { TemplateProps } from "@/store/templates";
import { SVG } from "@svgdotjs/svg.js";
import {
  randomFamily,
  randomI1,
  randomI2,
  randomIx,
  randomIy,
} from "../constants/random.constant";

// 直接给定属性生成
type givenSvgProps = Pick<
  Required<TemplateProps>,
  "randomIndex" | "randomTitleFamily" | "randomSubTitleFamily"
>;

const useCreateLogo = async (
  data: TemplateProps[],
  isRandom = true,
  givenProps: givenSvgProps = {
    randomIndex: 0,
    randomTitleFamily: "",
    randomSubTitleFamily: "",
  }
): Promise<void> => {
  data.forEach((item, key) => {
    const rgb = `#${item.rgb}`;
    let randonI, titleFamily, subTitleFamily;
    let trueMaterialPath = item.materialPath;
    trueMaterialPath = svgToBase64(item.svg);
    const trueNameColor = rgb;
    const trueSloganColor = rgb;
    if (isRandom) {
      //需要随机生成
      randonI = Math.floor(Math.random() * Math.floor(3)); //2//
      if (item.name.length > 5) {
        randonI = 2;
      }
      titleFamily = randomFamily[Math.floor(Math.random() * Math.floor(7))];
      subTitleFamily = randomFamily[Math.floor(Math.random() * Math.floor(7))];
      if (givenProps.randomSubTitleFamily.length > 0) {
        randonI = givenProps.randomIndex;
        titleFamily = givenProps.randomTitleFamily;
        subTitleFamily = givenProps.randomSubTitleFamily;
      }
      store.commit("setRandomProps", {
        materialId: item.materialId,
        randomIndex: randonI,
        randomTitleFamily: titleFamily,
        randomSubTitleFamily: subTitleFamily,
      });
    } else {
      //直接取对应属性
      console.log(item);
      randonI = item.randomIndex || 0;
      titleFamily = item.randomTitleFamily || "";
      subTitleFamily = item.randomSubTitleFamily || "";
    }

    const draw = SVG();
    draw.addTo(`.svg${key}`);
    const groupImage = draw
      .group()
      .fill("dodgerblue")
      .attr({
        transform:
          "matrix(1,0,0,1," +
          randomI1[randonI] +
          "," +
          randomI2[randonI] +
          ") ",
        class: `svg-logo${key}`,
      });
    const group = draw.group().fill("dodgerblue").attr({
      transform: "matrix(1,0,0,1,160,40) ",
    });
    const img = draw.image(trueMaterialPath);
    //debugger
    const title = draw
      .plain(item.name)
      .font({
        size: 75,
        family: titleFamily,
        weight: "bolder",
      })
      .attr({
        fill: trueNameColor,
        dx: randomIx[randonI],
        dy: randomIy[randonI],
        "text-anchor": "middle",
        class: `svg-name${key}`,
      });
    const subTitle = draw
      .plain(item.name_en)
      .font({
        size: 25,
        family: subTitleFamily,
        weight: "bolder",
      })
      .attr({
        fill: trueSloganColor,
        dx: randomIx[randonI],
        dy: randomIy[randonI] + 40,
        "text-anchor": "middle",
        class: `svg-slogan${key}`,
      });
    groupImage.add(img);
    group.add(title);
    group.add(subTitle);
    if (randonI === 2) {
      img.size(160, 160);
    } else {
      img.size(110, 110);
    }
  });
};
export default useCreateLogo;
