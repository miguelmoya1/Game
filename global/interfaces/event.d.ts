import { IBase } from './base';

export interface IEvent extends IBase {
  start?: Date;
  end?: Date;
}
