import { Model } from 'sequelize';

export class BaseModel<T> extends Model<T> {
  public id!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}
