import { familyExts } from "@/defaultProps";

/**
 * @description 随机常量
 * @author filway
 */
export const allFamily: Required<familyExts> = {
  hyfx: ".TTF",
  hyhz: ".TTF",
  mnjz: ".OTF",
  zzgf: ".TTF",
  zktzbqxs: ".TTF",
  jhwz: ".TTC",
  df: ".TTF",
  career: ".ttf",
  clubtype: ".ttf",
  crimson: ".ttf",
  frizon: ".ttf",
  intreb: ".ttf",
  magiera: ".ttf",
  playlist: ".otf",
};

export const randomFamily = ["HiraginoGBW3", "SourceHanSerif-B"];
export const randomFamilyText = ["台北黑体", "思源宋体"];

export const fontFamilyArr = [
  {
    text: "思源宋体",
    value: "SourceHanSerif-B",
  },
  {
    text: "台北黑体",
    value: "HiraginoGBW3",
  },
  {
    text: "站酷小薇LOGO体",
    value: "xiaowei",
  },
  {
    text: "汉仪范笑歌隶书",
    value: "hyfx",
  },
  {
    text: "汉仪黑仔体",
    value: "hyhz",
  },
  {
    text: "ＤＦ宗楷書W7",
    value: "df",
  },
  {
    text: "蒙纳简粗俏皮",
    value: "mnjz",
  },
  {
    text: "造字工房悦圆常规",
    value: "zzgf",
  },
  {
    text: "字酷堂郑板桥行书",
    value: "zktzbqxs",
  },
  {
    text: "JTC江户文字",
    value: "jhwz",
  },
];

export const englishFontFamilyArr = [
  {
    text: "Career",
    value: "career",
  },
  {
    text: "ClubTypeMercurius",
    value: "clubtype",
  },
  {
    text: "CrimosonText",
    value: "crimson",
  },
  {
    text: "Frizon",
    value: "frizon",
  },
  {
    text: "intreb",
    value: "intreb",
  },
  {
    text: "Magiera-Script",
    value: "magiera",
  },
  {
    text: "Playlist-Script",
    value: "playlist",
  },
];

export const randomI1 = [135, 288, 263];
export const randomI2 = [175.39, 120, 144];
export const randomIx = [250, 190, 190];
export const randomIy = [210, 285, 200];
export const randomNameFontSize = 75;
export const randomNameEnFontSize = 25;

/**
 * 布局方案，根据左右/上下以及字体的个数，给出合理的图标文字坐标以及合理的文字大小
 * 最大兼容到14个字
 */
interface layoutPropsType {
  randomI1: number[];
  randomI2: number[];
  randomIx: number[];
  randomIy: number[];
  randomNameFontSize: number;
  randomNameEnFontSize: number;
}
const layoutProps: layoutPropsType[] = [];
layoutProps[1] = {
  randomI1: [220, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [230, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 75,
  randomNameEnFontSize: 25,
};
layoutProps[2] = {
  randomI1: [185, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [230, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 70,
  randomNameEnFontSize: 30,
};
layoutProps[3] = {
  randomI1: [180, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [260, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 75,
  randomNameEnFontSize: 25,
};
layoutProps[5] = {
  randomI1: [115, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [255, 190, 190],
  randomIy: [205, 270, 200],
  randomNameFontSize: 70,
  randomNameEnFontSize: 25,
};
layoutProps[6] = {
  randomI1: [85, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [250, 190, 190],
  randomIy: [205, 270, 200],
  randomNameFontSize: 65,
  randomNameEnFontSize: 25,
};
layoutProps[7] = {
  randomI1: [70, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [195, 255, 200],
  randomNameFontSize: 58,
  randomNameEnFontSize: 23,
};
layoutProps[8] = {
  randomI1: [35, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [195, 265, 200],
  randomNameFontSize: 62,
  randomNameEnFontSize: 23,
};
layoutProps[9] = {
  randomI1: [35, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [190, 265, 200],
  randomNameFontSize: 54,
  randomNameEnFontSize: 22,
};
layoutProps[10] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [195, 255, 200],
  randomNameFontSize: 50,
  randomNameEnFontSize: 22,
};
layoutProps[11] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 46,
  randomNameEnFontSize: 22,
};
layoutProps[12] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 42,
  randomNameEnFontSize: 25,
};
layoutProps[13] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 38,
  randomNameEnFontSize: 25,
};
layoutProps[14] = {
  randomI1: [15, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 38,
  randomNameEnFontSize: 25,
};
export default layoutProps;
