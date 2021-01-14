import { Game } from '../game/game.model';
import { User } from '../user/user.model';

export const setAssociations = () => {
  User.hasMany(Game, { foreignKey: 'userID' });
  Game.belongsTo(User, { foreignKey: 'userID' });

  User.belongsToMany(Game, { through: 'UserGame' });
  Game.belongsToMany(User, { through: 'UserGame' });
};
