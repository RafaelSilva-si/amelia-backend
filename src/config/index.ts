import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, BASE_URL, PORT, DB_HOST, DB_URL, DB_PORT, DB_DATABASE, SECRET_KEY, ORIGIN, EMAIL_HOST, EMAIL_USER, EMAIL_PASS } =
  process.env;

let globalSubscriberId: string | null = null;

export const setGlobalSubscriberId = (subscriberId: string) => {
  globalSubscriberId = subscriberId;
};

export const getGlobalSubscriberId = () => {
  return globalSubscriberId;
};
