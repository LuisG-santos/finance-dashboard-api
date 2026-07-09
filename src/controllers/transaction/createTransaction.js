import {
  checkIfIdIsValid,
  created,
  InvalidIdResponse,
  requiredFieldIsMissingResponse,
  serverError,
  validateRequiredFields,
} from '../helpers/index.js';
import {
  checkIfAmountIsValid,
  checkIfTypeIsValid,
  invalidTypeResponse,
} from '../helpers/transaction.js';
export class CreateTrasacitonController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ['user_id', 'name', 'date', 'amount', 'type'];

      const { ok: requiredFieldWereProvided, missingField } = validateRequiredFields(
        params,
        requiredFields
      );

      if (!requiredFieldWereProvided) {
        return requiredFieldIsMissingResponse(missingField);
      }

      if (!checkIfIdIsValid(params.user_id)) {
        return InvalidIdResponse();
      }

      const amountIsValid = checkIfAmountIsValid(params.amount);

      if (!amountIsValid) {
        return checkIfAmountIsValid();
      }

      const type = params.type.trim().toUpperCase();

      const typeIsValid = checkIfTypeIsValid(type);

      if (!typeIsValid) {
        return invalidTypeResponse();
      }

      const transaction = await this.createTransactionUseCase.execute({ ...params, type });

      return created(transaction);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
