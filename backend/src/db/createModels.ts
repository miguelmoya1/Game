import { Sequelize } from 'sequelize/types';
import { initGame } from '../game/game.model';
import { initUser } from '../user/user.model';

export const createModels = (sequelize: Sequelize) => {
  initUser(sequelize);
  initGame(sequelize);
};
