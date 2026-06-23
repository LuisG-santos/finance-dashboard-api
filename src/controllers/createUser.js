import { EmailAlreadyInUseError } from '../errors/users.js';
import {
  checkIfEmailIsValid,
  checkIsPasswordIsValid,
  EmailAlreadyInUseResponse,
  InvalidPasswordResponse,
  badRequest,
  created,
  serverError,
} from './helpers/index.js';

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ['first_name', 'last_name', 'email', 'password'];

      for (const field of requiredFields) {
        if (!params[field] || params[field.trim().length === 0]) {
          return badRequest({ message: `Missing param ${field}` });
        }
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
