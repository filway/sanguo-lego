import { familyExts } from '@/defaultProps'

/**
 * @description 随机常量
 * @author filway
 */
export const allFamily: Required<familyExts> = {
  hyfx: '.TTF',
  hyhz: '.TTF',
  mnjz: '.OTF',
  zzgf: '.TTF',
  zktzbqxs: '.TTF',
  jhwz: '.TTC',
  df: '.TTF',
  career: '.ttf',
  clubtype: '.ttf',
  crimson: '.ttf',
  frizon: '.ttf',
  intreb: '.ttf',
  magiera: '.ttf',
  playlist: '.otf',
  'SourceHanSerif-B': 'otf',
  rzgf: '.OTF',
  hkht: '.ttf',
  kls: '.ttf',
  douyuf: '.otf',
  hwks: '.TTF',
}

export const randomFamily = ['hkht', 'douyuf']
export const randomFamilyText = ['黑体', '斗鱼追光体']

export const fontFamilyArr = [
  {
    text: '黑体',
    value: 'hkht',
  },
  {
    text: '宋体',
    value: 'kls',
  },
  {
    text: '字酷堂郑板桥行书',
    value: 'zktzbqxs',
  },
  {
    text: '斗鱼追光体',
    value: 'douyuf',
  },
  {
    text: '华文隶书',
    value: 'hwks',
  },
]

export const englishFontFamilyArr = [
  {
    text: 'Career',
    value: 'career',
  },
  {
    text: 'ClubTypeMercurius',
    value: 'clubtype',
  },
  {
    text: 'CrimosonText',
    value: 'crimson',
  },
  {
    text: 'Frizon',
    value: 'frizon',
  },
  {
    text: 'intreb',
    value: 'intreb',
  },
  {
    text: 'Magiera-Script',
    value: 'magiera',
  },
  {
    text: 'Playlist-Script',
    value: 'playlist',
  },
]

export const randomI1 = [135, 288, 263]
export const randomI2 = [175.39, 120, 144]
export const randomIx = [250, 190, 190]
export const randomIy = [210, 285, 200]
export const randomNameFontSize = 75
export const randomNameEnFontSize = 25

/**
 * 布局方案，根据左右/上下以及字体的个数，给出合理的图标文字坐标以及合理的文字大小
 * 最大兼容到15个字
 * 注：以中文字体长度为判断标准
 */
interface layoutPropsType {
  randomI1: number[]
  randomI2: number[]
  randomIx: number[]
  randomIy: number[]
  randomNameFontSize: number
  randomNameEnFontSize: number
}
const layoutProps: layoutPropsType[] = []
layoutProps[0] = {
  randomI1: [268, 264, 263],
  randomI2: [145, 146, 144],
  randomIx: [260, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 75,
  randomNameEnFontSize: 25,
}
layoutProps[1] = {
  randomI1: [220, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [230, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 75,
  randomNameEnFontSize: 25,
}
layoutProps[2] = {
  randomI1: [185, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [230, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 70,
  randomNameEnFontSize: 30,
}
layoutProps[3] = {
  randomI1: [180, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [260, 190, 190],
  randomIy: [210, 285, 200],
  randomNameFontSize: 75,
  randomNameEnFontSize: 25,
}
layoutProps[5] = {
  randomI1: [115, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [255, 190, 190],
  randomIy: [205, 270, 200],
  randomNameFontSize: 70,
  randomNameEnFontSize: 25,
}
layoutProps[6] = {
  randomI1: [85, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [250, 190, 190],
  randomIy: [205, 270, 200],
  randomNameFontSize: 65,
  randomNameEnFontSize: 24,
}
layoutProps[7] = {
  randomI1: [70, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [195, 255, 200],
  randomNameFontSize: 58,
  randomNameEnFontSize: 22,
}
layoutProps[8] = {
  randomI1: [32, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [195, 265, 200],
  randomNameFontSize: 58,
  randomNameEnFontSize: 21,
}
layoutProps[9] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [190, 265, 200],
  randomNameFontSize: 54,
  randomNameEnFontSize: 20,
}
layoutProps[10] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [195, 255, 200],
  randomNameFontSize: 45,
  randomNameEnFontSize: 20,
}
layoutProps[11] = {
  randomI1: [25, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 42,
  randomNameEnFontSize: 22,
}
layoutProps[12] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 37,
  randomNameEnFontSize: 20,
}
layoutProps[13] = {
  randomI1: [35, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 35,
  randomNameEnFontSize: 20,
}
layoutProps[14] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 34,
  randomNameEnFontSize: 20,
}
layoutProps[15] = {
  randomI1: [30, 288, 263],
  randomI2: [175.39, 120, 144],
  randomIx: [245, 190, 190],
  randomIy: [185, 255, 200],
  randomNameFontSize: 32,
  randomNameEnFontSize: 20,
}
export default layoutProps
