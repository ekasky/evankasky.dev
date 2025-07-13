import dotenv from 'dotenv';
import express from 'express';
import { createLogger } from './config/logger';
import { EnvType, validateEnvironmentVariables } from './config/config';

// ======= Bootstrap the application =======

// ===== Load the envrionment variables =====
dotenv.config();

// ===== Create a logger for the application =====
export const logger = createLogger(true);

// Pass the critcal (required) environment variables through a validation schema to ensure they are set and correct
export const cfg: EnvType = validateEnvironmentVariables();

// ===== Start the HTTP server and listen for requests =====
export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

export const server = app.listen(cfg.PORT, () => {
  logger.info(`Server is running at http://localhost:${cfg.PORT}`);
});
