import { IBase } from './base';

export interface ISchedule extends IBase {
  day?: string;
  start?: Date;
  end?: Date;
}
