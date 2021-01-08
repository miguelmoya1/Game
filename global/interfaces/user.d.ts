import { IBase } from './base';

export interface IUser extends IBase {
  password?: string;
  email?: string;
  root?: boolean;
  firstName?: string;
  lastName?: string;
  isLogged?: Date | null;
  /** COORDINTES: [LNG, LAT] */
  location?: { type: string; coordinates: [number, number] };
  appVersion?: string;
  appBuild?: string;
  operatingSystem?: string;
  osVersion?: string;
  platform?: string;
  model?: string;
  manufacturer?: string;
  uuid?: string;
}
