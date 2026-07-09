import { UserNotFoundError } from '../../errors/users.js';
import {
  userNotFoundResponse,
  serverError,
  requiredFieldIsMissingResponse,
  checkIfIdIsValid,
  InvalidIdResponse,
  ok,
} from '../helpers/index.js';

export class GetTransactionsByUserIdController {
  constructor(getTransactionByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionByUserIdUseCase;
  }

  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;

      if (!userId) {
        return requiredFieldIsMissingResponse('userId');
      }

      if (!checkIfIdIsValid(userId)) {
        return InvalidIdResponse();
      }

      const transactions = await this.getTransactionsByUserIdUseCase.execute({ userId });

      return ok(transactions);
    } catch (error) {
      console.log(error);

      if (error instanceof UserNotFoundError) {
        return userNotFoundResponse();
      }

      return serverError();
    }
  }
}
