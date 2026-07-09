import { CreateTransactionRepository } from '../../repository/postgres/transaction/createTransaction.js';
import { CreateTransactionUseCase } from '../../use-cases/transaction/createTransaction.js';
import { GetUserByIdRepsitory } from '../../repository/postgres/user/getUserById.js';
import { CreateTrasacitonController } from '../../controllers/transaction/createTransaction.js';
import { GetTransactionsByUserIdRepository } from '../../repository/postgres/index.js';
import { GetTransactionsByUserIdUseCase } from '../../use-cases/index.js';
import { GetTransactionsByUserIdController } from '../../controllers/index.js';

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new CreateTransactionRepository();
  const getUserByIdRepository = new GetUserByIdRepsitory();
  const createTransictionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository
  );
  const createTransactionController = new CreateTrasacitonController(createTransictionUseCase);

  return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
  const getTransactionsByUserIdRepository = new GetTransactionsByUserIdRepository();
  const getUserByIdRepository = new GetUserByIdRepsitory();
  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    getTransactionsByUserIdRepository,
    getUserByIdRepository
  );
  const getTransactionsByUserIdController = new GetTransactionsByUserIdController(
    getTransactionsByUserIdUseCase
  );

  return getTransactionsByUserIdController;
};
