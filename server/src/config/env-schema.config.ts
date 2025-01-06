import * as Joi from 'joi';

export const envSchema = Joi.object({
  API_KEY: Joi.string().when('NODE_ENV', {
    is: 'production',
    then: Joi.required(),
  }),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  DB_TYPE: Joi.string().valid('postgres', 'sqlite').required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
