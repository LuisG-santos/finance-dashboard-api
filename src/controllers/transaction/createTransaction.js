import { badRequest, checkIfIdIsValid, created, InvalidIdResponse, serverError } from '../helpers';
import validator from 'validator';
export class CreateTrasacitonController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ['id', 'user_id', 'name', 'date', 'amount', 'type'];
      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missinf param: ${field}` });
        }
      }

      if (!checkIfIdIsValid(params.user_id)) {
        return InvalidIdResponse();
      }

      if (params.amount <= 0) {
        return badRequest({ message: 'The amount must be greater than 0' });
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

      const transaction = await this.createTransactionUseCase({ ...params, type });

      return created(transaction);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
