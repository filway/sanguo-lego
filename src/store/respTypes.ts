import { ActionPayload } from "./index";

export interface RespData<T = []> {
  code: number;
  data: T;
  message?: string;
  payload?: ActionPayload;
}
export interface ListData<T> {
  list: T[];
  count?: number;
}
export interface UploadData {
  url: string;
}
export interface getSvgData {
  path: string;
  svg: string;
}
export interface downloadUrlData {
  png: string;
  jpg: string;
  svg: string;
}
export type RespListData<T> = RespData<T>;
export type RespUploadData = RespData<UploadData>;
