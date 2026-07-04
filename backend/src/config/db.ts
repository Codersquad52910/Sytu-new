import mongoose from 'mongoose';
import { env } from './env';

export async function connectDB(): Promise<void> {
  const connString = env.MONGODB_URI;

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(connString);
    console.log('🔌 Connected to MongoDB successfully.');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error after initial connection:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection was disconnected. Attempting reconnect...');
});
