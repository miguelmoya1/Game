import { IUser } from '../../../global';
import { User } from '../user/user.model';
import { PROD } from '../app.constants';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import * as faker from 'faker';

export const setDefaultValues = async () => {
  if (!PROD) {
    await createUsers();
  }
};

const createUsers = async () => {
  const create = await User.findOrCreate({
    where: {
      firstName: 'Miguel',
      lastName: 'Moya Ortega',
      email: 'miguel@finald.app',
      root: true,
    },
  });

  if (create[1]) {
    await create[0].update({ password: bcrypt.hashSync('1234') });
  }
  const miguel = create[0];

  const createdSecond = await User.findOrCreate({
    where: {
      firstName: 'Javi',
      lastName: 'Cases Sempere',
      email: 'javi@finald.app',
      root: true,
    },
  });
  if (createdSecond[1]) {
    await createdSecond[0].update({ password: bcrypt.hashSync('1234') });
  }
  const javi = createdSecond[0];

  let users: User[];

  if ((await User.count()) === 2) {
    const usersToCreate: IUser[] = [];
    for (let i = 0; i < 20; i++) {
      usersToCreate.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLocaleLowerCase(),
        password: bcrypt.hashSync('1234'),
      });
    }

    users = await User.bulkCreate(usersToCreate);
  } else {
    users = await User.findAll({
      where: {
        email: { [Op.notIn]: ['miguel@finald.app', 'javi@finald.app'] },
      },
    });
  }

  return [miguel, javi, ...users];
};
