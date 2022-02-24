import faker from '@faker-js/faker';

import { User } from './user.model';

export const generateOneUser = (): User => {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    role: 'customer'
  };
}

export const generateManyUser = (size = 10): User[] => {
  const users: User[] = [];
  for (let index = 0; index < size; index++) {
    users.push(generateOneUser());
  }
  return [...users];
}
