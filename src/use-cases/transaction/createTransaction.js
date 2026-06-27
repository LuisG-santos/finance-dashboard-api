import { UserNotFoundError } from '../../errors/users';
import { v4 as uuidv4 } from 'uuid';
export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(createTransactionParams) {
    const userId = createTransactionParams.userId;
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactioId = uuidv4();

    const transaction = await this.createTransactionRepository.execute({
      ...createTransactionParams,
      id: transactioId,
    });

    return transaction;
  }
}
