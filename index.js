import 'dotenv/config.js';
import express from 'express';
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './src/controllers/index.js';
import { GetUserByIdUseCase } from './src/use-cases/getUserById.js';
import { GetUserByIdRepsitory } from './src/repository/postgres/getUserById.js';
import { CreateUserUseCase } from './src/use-cases/createUser.js';
import { GetUserByEmailRepository } from './src/repository/postgres/getUserByEmail.js';
import { PostgresCreateUserRepository } from './src/repository/postgres/createUser.js';
import { DeleteUserRepository } from './src/repository/postgres/deleteUser.js';
import { UpdateUseruseCase } from './src/use-cases/updateUser.js';
import { UpdateUserRepository } from './src/repository/postgres/updateUser.js';

const app = express();
app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = new GetUserByIdController(
    new GetUserByIdUseCase(new GetUserByIdRepsitory())
  );
  const { statusCode, body } = await getUserByIdController.execute(req);
  res.status(statusCode).json(body);
});

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController(
    new CreateUserUseCase(new GetUserByEmailRepository(), new PostgresCreateUserRepository())
  );
  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (req, res) => {
  const updateUserController = new UpdateUserController(
    new UpdateUseruseCase(new GetUserByEmailRepository(), new UpdateUserRepository())
  );
  const { statusCode, body } = await updateUserController.excute(req);
  res.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (req, res) => {
  const deleteUserController = new DeleteUserController(new DeleteUserRepository());
  const { statusCode, body } = await deleteUserController.execute(req);

  res.status(statusCode).json(body);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
