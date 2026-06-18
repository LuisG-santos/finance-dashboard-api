import { EmailAlreadyInUseError } from '../errors/users.js';
import { GetUserByEmailRepository, UpdateUserRepository } from '../repository/postgres/index.js';
import bcrypt from 'bcrypt';

export class UpdateUseruseCase {
  async execute(userId, upadateUserParams) {
    if (upadateUserParams.email) {
      const getUserByEmail = new GetUserByEmailRepository();

      const userWithProvidedEmail = await getUserByEmail.execute(upadateUserParams.email);

      if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(upadateUserParams.email);
      }
    }
    const user = {
      ...upadateUserParams,
    };

    if (upadateUserParams.password) {
      const hashedPassword = await bcrypt.hash(upadateUserParams.password, 10);
      user.password = hashedPassword;
    }

    const updateUserRepository = new UpdateUserRepository();
    const updatedUser = await updateUserRepository.execute(userId, user);

    return updatedUser;
  }
}
