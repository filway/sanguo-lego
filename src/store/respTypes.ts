import { ActionPayload } from "./index";

interface AttrProps {
  wx: string;
  complain: string;
  title: string;
  tips: string;
}

export interface RespData<T = []> {
  code: number;
  data: T;
  message?: string;
  attr?: AttrProps;
  payload?: ActionPayload;
  len: number;
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
export interface base64Data {
  logo: string;
  slogan: string;
}
export interface downloadUrlData {
  png: string;
  jpg: string;
  svg: string;
}
export type RespListData<T> = RespData<T>;
export type RespUploadData = RespData<UploadData>;
