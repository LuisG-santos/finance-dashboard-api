import { EmailAlreadyInUseError } from '../../errors/users.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
  constructor(getUserByEmailRepository, updateUserRepository) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.updateUserRepository = updateUserRepository;
  }
  async execute(userId, upadateUserParams) {
    if (upadateUserParams.email) {
      const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
        upadateUserParams.email
      );

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

    const updatedUser = await this.updateUserRepository.execute(userId, user);

    return updatedUser;
  }
}
