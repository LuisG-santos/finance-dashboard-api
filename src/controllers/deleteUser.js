import { DeleteUserUseCase } from '../use-cases/deleteUser.js';
import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      if (!checkIfIdIsValid(userId)) {
        return InvalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const deletedUser = await deleteUserUseCase.execute(userId);

      if (deletedUser.length === 0) {
        return userNotFoundResponse();
      }

      return ok(deletedUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
