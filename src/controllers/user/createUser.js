import { EmailAlreadyInUseError } from '../../errors/users.js';
import {
  checkIfEmailIsValid,
  checkIsPasswordIsValid,
  EmailAlreadyInUseResponse,
  InvalidPasswordResponse,
  badRequest,
  created,
  serverError,
  validateRequiredFields,
} from '../helpers/index.js';

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ['first_name', 'last_name', 'email', 'password'];

      const { ok: requiredFieldWereProvided, missingField } = validateRequiredFields(
        params,
        requiredFields
      );

      if (!requiredFieldWereProvided) {
        return badRequest({
          message: `The field *${missingField}* is required`,
        });
      }

      if (!checkIsPasswordIsValid(params.password)) {
        return InvalidPasswordResponse();
      }

      if (!checkIfEmailIsValid(params.email)) {
        return EmailAlreadyInUseResponse();
      }

      const createdUser = await this.createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.log(error);
      return serverError();
    }
  }
}
