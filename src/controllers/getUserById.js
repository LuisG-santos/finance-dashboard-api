import { GetUserByIdUseCase } from '../use-cases/getUserById.js';
import { notFound, ok, serverError } from './helpers/http.js';
import { checkIfIdIsValid, InvalidIdResponse } from './helpers/user.js';

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
