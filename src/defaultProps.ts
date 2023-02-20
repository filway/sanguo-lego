export type enableDownloadType = 'svg' | 'png' | 'jpg'
export type enableImageDownloadType = 'png' | 'jpg'
export type previewPropsType = {
  url?: string
  x: number
  y: number
  w: number
  h: number
  r: number
}
export type imagePropsType = {
  w: string
  h: string
  r: string
  mt: string
  mr: string
}
export interface familyExts {
  hyfx: string
  hyhz: string
  mnjz?: string
  zzgf: string
  df?: string
  zktzbqxs: string
  jhwz?: string
  career: string
  clubtype: string
  crimson: string
  frizon: string
  intreb: string
  magiera: string
  playlist: string
  'SourceHanSerif-B'?: string
  rzgf: string
  hkht: string
  kls: string
  douyuf: string
  hwks: string
}
export type familyKeys = keyof familyExts
//布局属性
export type logoLayoutPropsType = {
  imageX: number //图标的x坐标
  imageY: number //图标的y坐标
  imageSize?: number //图标的大小
  nameDX: number //logo名称相对x坐标
  nameDY: number //log名称的相对y坐标
  nameEnDX: number //口号的相对x坐标
  nameEnDY: number //口号的相对y坐标, 一般默认设置在logo名称下方40的位置
  nameFontSize: number //logo名称字体大小
  nameEnFontSize: number //口号字体大小
}
