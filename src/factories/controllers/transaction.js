import { CreateTransactionRepository } from '../../repository/postgres/transaction/createTransaction';
import { CreateTransactionUseCase } from '../../use-cases/transaction/createTransaction';
import { GetUserByIdRepsitory } from '../../repository/postgres/user/getUserById';
import { CreateTrasacitonController } from '../../controllers/transaction/createTransaction';

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
