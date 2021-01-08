import { IBase } from './base';
import { IInstallation } from './installation';

export interface IBusiness extends IBase {
  name?: string;
  image?: string;
  active?: boolean;

  Installations?: IInstallation[];
}
