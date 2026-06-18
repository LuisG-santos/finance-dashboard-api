import { DeleteUserRepository } from '../repository/postgres/index.js';

export class DeleteUserUseCase {
  async execute(userId) {
    const deleteUserRepository = new DeleteUserRepository();
    const deletedUser = await deleteUserRepository.execute(userId);

    return deletedUser;
  }
}
