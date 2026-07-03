import { CreateTransactionRepository } from '../../repository/postgres/transaction/createTransaction.js';
import { CreateTransactionUseCase } from '../../use-cases/transaction/createTransaction.js';
import { GetUserByIdRepsitory } from '../../repository/postgres/user/getUserById.js';
import { CreateTrasacitonController } from '../../controllers/transaction/createTransaction.js';

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
