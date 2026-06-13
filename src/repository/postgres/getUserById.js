import { PostgresHelper } from '../../db/postgres/helper';

export class PostgresGetUserById {
  async execute(userId) {
    const user = await PostgresHelper.query('SELECT * FROM user WHERE id = $1', [userId]);
    return user[0];
  }
}
