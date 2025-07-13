import { z } from 'zod';
import { logger } from '..';

const envSchema = z.object({
  PORT: z.string().transform(Number)
});

export type EnvType = z.infer<typeof envSchema>;

export const validateEnvironmentVariables = (): EnvType => {
  // Pass the environment variables through the schema
  const result = envSchema.safeParse(process.env);

  // Throw a error if validation fails
  if (!result.success) {
    result.error.issues.map((issue) => {
      logger.error(`Environment variable "${issue.path}" not loaded: ${issue.message}`);
    });

    // Fail application early if environment is not proper
    process.exit(1);
  }

  return result.data;
};
