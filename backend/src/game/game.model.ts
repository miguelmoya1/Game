import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Sequelize,
} from 'sequelize';
import { BaseModel } from '../shared/tools/model';
import { IGame } from '../../../global';
import { User } from '../user/user.model';

export class Game extends BaseModel<IGame> implements IGame {
  public private!: boolean;
  public password!: string;

  public userID!: string;

  public setUser!: BelongsToSetAssociationMixin<User, string>;

  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public addUser!: BelongsToManyAddAssociationMixin<User, string>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
}

export const initGame = (sequelize: Sequelize) => {
  Game.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      private: { type: DataTypes.BOOLEAN, defaultValue: false },
      password: { type: DataTypes.STRING },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
    }
  );
};
