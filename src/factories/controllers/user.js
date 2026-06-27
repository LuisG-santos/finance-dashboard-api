import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from '../../controllers/index.js';

import {
  UpdateUserRepository,
  GetUserByIdRepsitory,
  GetUserByEmailRepository,
  DeleteUserRepository,
  CreateUserRepository,
} from '../../repository/postgres/index.js';
import { CreateUserUseCase } from '../../use-cases/createUser.js';
import { DeleteUserUseCase } from '../../use-cases/deleteUser.js';
import { GetUserByIdUseCase } from '../../use-cases/getUserById.js';
import { UpdateUserUseCase } from '../../use-cases/updateUser.js';

export const makeGetUserByIdController = () => {
  const getUserByIdRepsitory = new GetUserByIdRepsitory();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepsitory);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const createUserRepository = new CreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(getUserByEmailRepository, createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

export const makeUpdateUserController = () => {
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const updateUserRepository = new UpdateUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(getUserByEmailRepository, updateUserRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new DeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};
