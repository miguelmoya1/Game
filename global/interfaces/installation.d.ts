import { IBase } from './base';
import { ISchedule } from './schedule';

export interface IInstallation extends IBase {
  name?: string;
  image?: string;
  icon?: string;

  Schedules?: ISchedule;
}
