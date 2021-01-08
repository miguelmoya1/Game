import { DataTypes, Sequelize } from 'sequelize';
import { User } from '../../user/user.model';

export const up = async (sequelize: Sequelize) => {
  const user = (await sequelize.models.User.describe()) as User;
  if (!user.location) {
    await sequelize.getQueryInterface().addColumn('Users', 'location', {
      type: DataTypes.GEOGRAPHY,
    });
  }
};
