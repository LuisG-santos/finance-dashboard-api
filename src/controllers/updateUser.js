import { EmailAlreadyInUseError } from '../errors/users.js';
import { UpdateUseruseCase } from '../use-cases/updateUser.js';
import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIsPasswordIsValid,
  EmailAlreadyInUseResponse,
  InvalidIdResponse,
  InvalidPasswordResponse,
  badRequest,
  serverError,
  ok,
} from './helpers/index.js';
export class UpdateUserController {
  async excute(httpRequest) {
    try {
      const userId = httpRequest.params.userdId;
      if (!checkIfIdIsValid(userId)) {
        return InvalidIdResponse();
      }
      const params = httpRequest.body;

      const allowedFields = ['first_name', 'last_name', 'email', 'password'];
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldIsNotAllowed) {
        return badRequest({ message: 'Some provided field is not allowed' });
      }

      if (params.password) {
        if (!checkIsPasswordIsValid(params.password)) {
          return InvalidPasswordResponse();
        }
      }

      if (params.email) {
        if (!checkIfEmailIsValid(params.email)) {
          return EmailAlreadyInUseResponse();
        }
      }

      const updateUserUseCase = new UpdateUseruseCase();
      const updateUser = await updateUserUseCase.execute(userId, params);
      return ok(updateUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.log(error);
      return serverError();
    }
  }
}
