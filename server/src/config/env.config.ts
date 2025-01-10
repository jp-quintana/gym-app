import { obtainCookieTtl } from 'src/common/utils';

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
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  accessCookieTtl: obtainCookieTtl(process.env.ACCESS_TOKEN_TTL),
  refreshCookieTtl: obtainCookieTtl(process.env.REFRESH_TOKEN_TTL),
});
