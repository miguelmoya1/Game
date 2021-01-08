import { IBase } from './base';

export interface ICategory extends IBase {
  name?: string;
  icon?: string;
  active?: boolean;
}
