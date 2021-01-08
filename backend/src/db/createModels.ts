import { Sequelize } from 'sequelize/types';
import { initUser } from '../user/user.model';

export const createModels = (sequelize: Sequelize) => {
  initUser(sequelize);
};
