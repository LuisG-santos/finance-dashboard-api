import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      if (!checkIfIdIsValid(httpRequest.params.userId)) {
        return InvalidIdResponse();
      }
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);

      if (!user) {
        return userNotFoundResponse();
      }
      return ok(user);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
