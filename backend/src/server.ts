import { app } from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';

const PORT = env.PORT;

async function startServer() {
  console.log('🚀 Starting SYTU Portfolio & Content Service...');

  // Connect to DB and Cache
  await connectDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`📡 Server listening on: http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error during server startup:', err);
  process.exit(1);
});
