import { EmailAlreadyInUseError } from '../errors/users.js';
import { GetUserByEmail } from '../repository/postgres/getUserByEmail.js';
import bcrypt from 'bcrypt';
import { PostgresUpdateUserRepository } from '../repository/postgres/updateUser.js';
export class UpdateUseruseCase {
  async execute(userId, upadateUserParams) {
    if (upadateUserParams.email) {
      const getUserByEmail = new GetUserByEmail();

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

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updatedUser = await postgresUpdateUserRepository.execute(userId, user);

    return updatedUser;
  }
}
