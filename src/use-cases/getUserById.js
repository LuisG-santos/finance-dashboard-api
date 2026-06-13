import { PostgresGetUserById } from '../repository/postgres/getUserById';

export class GetUserByIdUseCase {
  async execute(userId) {
    const getUserByIdRepository = new PostgresGetUserById();
    const user = getUserByIdRepository.execute(userId);
    return user;
  }
}
