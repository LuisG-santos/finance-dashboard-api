import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PostgresCreateUserRepository } from '../repository/postgres/createUser.js';
import { GetUserByEmail } from '../repository/postgres/getUserByEmail.js';
import { EmailAlreadyInUseError } from '../errors/users.js';

export class CreateUserUseCase {
  async execute(createUserParams) {
    const getUserByEmailRepository = new GetUserByEmail();
    const userWithProvidedEmail = await getUserByEmailRepository.execute(createUserParams.email);

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError();
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);
    return createdUser;
  }
}
