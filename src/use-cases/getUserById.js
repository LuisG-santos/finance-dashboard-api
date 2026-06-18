import { PostgresGetUserById } from '../repository/postgres/index.js';

export class GetUserByIdUseCase {
  async execute(userId) {
    const getUserByIdRepository = new PostgresGetUserById();
    const user = getUserByIdRepository.execute(userId);
    return user;
  }
}
