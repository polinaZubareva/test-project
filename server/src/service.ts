import db from '../db';
import { TCompany } from './company.type';

class Service {
  async getInBase(inn: number): Promise<TCompany> {
    const company = await db.query('SELECT name FROM company WHERE inn=$1', [
      inn,
    ]);

    return company.rows[0];
  }

  async addCompany(inn: number, name: string[]) {
    const company = await db.query(
      'INSERT INTO company(inn, name) SELECT $1,$2 WHERE NOT EXISTS (SELECT inn, name FROM company WHERE inn=$3) RETURNING *',
      [inn, name, inn]
    );
    return company.rows[0];
  }
}

export default new Service();
