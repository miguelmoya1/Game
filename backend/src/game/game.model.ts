import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from '../shared/tools/model';
import { IGame } from '../../../global';

export class Game extends BaseModel<IGame> implements IGame {
  public private!: boolean;
  public password!: string;

  public userID!: string;
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
