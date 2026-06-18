import { GetUserByIdRepsitory } from '../repository/postgres/index.js';

export class GetUserByIdUseCase {
  async execute(userId) {
    const getUserByIdRepository = new GetUserByIdRepsitory();
    const user = getUserByIdRepository.execute(userId);
    return user;
  }
}
