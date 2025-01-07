export const envConfig = () => ({
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  dbType: process.env.DB_TYPE,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
});
