export type enableDownloadType = "svg" | "png" | "jpg";
export type enableImageDownloadType = "png" | "jpg";
export type previewPropsType = {
  url: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
export interface familyExts {
  hyfx: string;
  hyhz: string;
  mnjz: string;
  rzgf: string;
  zzgf: string;
  df: string;
  zktzbqxs: string;
  jhwz: string;
  career: string;
  clubtype: string;
  crimson: string;
  frizon: string;
  intreb: string;
  magiera: string;
  playlist: string;
}
export type familyKeys = keyof familyExts;
