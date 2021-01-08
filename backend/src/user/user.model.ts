import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel } from '../shared/tools/model';
import { IUser } from '../../../global';

export class User extends BaseModel<IUser> implements IUser {
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;

  public root!: boolean;
  public isLogged!: Date;

  public location?: { type: string; coordinates: [number, number] };

  public appVersion!: string;
  public appBuild!: string;
  public operatingSystem!: string;
  public osVersion!: string;
  public platform!: string;
  public model!: string;
  public manufacturer!: string;
  public uuid!: string;
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },

      isLogged: { type: DataTypes.DATE },
      root: { type: DataTypes.BOOLEAN, defaultValue: false },

      location: { type: DataTypes.GEOGRAPHY },

      appVersion: { type: DataTypes.STRING },
      appBuild: { type: DataTypes.STRING },
      operatingSystem: { type: DataTypes.STRING },
      osVersion: { type: DataTypes.STRING },
      platform: { type: DataTypes.STRING },
      model: { type: DataTypes.STRING },
      manufacturer: { type: DataTypes.STRING },
      uuid: { type: DataTypes.STRING },
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
    }
  );
};
