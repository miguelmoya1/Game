import { IBase } from './base';
import { IUser } from './user';

export interface IGame extends IBase {
  password?: string;
  private?: boolean;

  Users?: IUser[];
}
