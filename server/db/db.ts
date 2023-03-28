import { config } from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

config();

const dbName: string = process.env.DB_NAME!;
const dbUser: string = process.env.DB_USER!;
const dbPassword: string = process.env.DB_PASSWORD!;
const dbPort: number = +process.env.DB_PORT!;
const dbHost: string = process.env.DB_HOST!;

const db = new Pool({
  user: dbUser,
  password: dbPassword,
  host: dbHost,
  port: dbPort,
  database: dbName,
});

export { db };
