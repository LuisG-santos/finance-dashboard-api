import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './src/controllers/createUser.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController();
  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
