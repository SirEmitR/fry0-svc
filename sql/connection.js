import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js";
import pkg from 'pg';
const { Pool } = pkg;

const poolConfig = {
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT
}

const pool = new Pool(poolConfig);

export default pool;

