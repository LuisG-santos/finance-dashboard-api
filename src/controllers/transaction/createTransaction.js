import {
  badRequest,
  checkIfIdIsValid,
  created,
  InvalidIdResponse,
  requiredFieldIsMissingResponse,
  serverError,
  validateRequiredFields,
} from '../helpers/index.js';
import validator from 'validator';
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

      const amountIsValid = validator.isCurrency(params.amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
      });

      if (!amountIsValid) {
        return badRequest('The amount must be a valid currency');
      }

      const type = params.type.trim().toUpperCase();

      const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type);

      if (!typeIsValid) {
        return badRequest({ message: 'The type must be EARNING, EXPENSE or INVESTMENT' });
      }

      const transaction = await this.createTransactionUseCase.execute({ ...params, type });

      return created(transaction);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
