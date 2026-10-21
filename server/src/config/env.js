import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'stockpulse-development-secret-change-me',
  mongoUri: process.env.MONGODB_URI || '',
  twelveDataApiKey: process.env.TWELVE_DATA_API_KEY || '',
  newsApiUrl: process.env.NEWS_API_URL || '',
  newsApiKey: process.env.NEWS_API_KEY || ''
};
