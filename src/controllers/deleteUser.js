import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      if (!checkIfIdIsValid(userId)) {
        return InvalidIdResponse();
      }

      const deletedUser = await this.deleteUserUseCase.execute(userId);

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
