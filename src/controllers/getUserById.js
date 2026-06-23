import {
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from './helpers/index.js';

export class GetUserByIdController {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(httpRequest) {
    try {
      if (!checkIfIdIsValid(httpRequest.params.userId)) {
        return InvalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(httpRequest.params.userId);

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
