process.loadEnvFile();
export const PORT = process.env.PORT || 3300;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
export const JWT_SECRET = process.env.JWT_SECRET
export const COOKIE_NAME = process.env.COOKIE_NAME