import dotenv from 'dotenv';

dotenv.config();

const requiredVars = ['PORT', 'MONGODB_URI', 'NODE_ENV'];

// TODO 1: quedate solo con las variables de requiredVars que no tengan valor en process.env
const missingVars = requiredVars.filter((variable) => !process.env[variable]);

// TODO 2: si falta alguna, lanzá un Error que diga cuáles faltan
if (missingVars.length > 0) {
  throw new Error(`Faltan variables de entorno: ${missingVars.join(', ')}`);
}
export const config = Object.freeze({
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV,
});