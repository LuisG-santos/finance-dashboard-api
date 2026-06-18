import { GetUserByIdUseCase } from '../use-cases/index.js';
import { checkIfIdIsValid, InvalidIdResponse, notFound, ok, serverError } from './helpers/index.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      if (!checkIfIdIsValid(httpRequest.params.id)) {
        return InvalidIdResponse();
      }
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

      if (!user) {
        return notFound({ message: 'User not found' });
      }
      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
