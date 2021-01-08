import { IBase } from './base';

export interface IFIle extends IBase {
  name?: string;
  path?: string;
  size?: string;
  small?: string;
  normal?: string;
  big?: string;
}
