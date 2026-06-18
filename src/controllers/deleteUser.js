import { DeleteUserUseCase } from '../use-cases/deleteUser';
import { checkIfIdIsValid, InvalidIdResponse, ok, serverError } from './helpers';

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      if (!checkIfIdIsValid(userId)) {
        return InvalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const deletedUser = await deleteUserUseCase.execute(userId);

      return ok(deletedUser);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
